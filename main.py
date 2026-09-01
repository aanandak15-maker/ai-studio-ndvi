"""
Nabhya near-NDVI — PRODUCTION SERVICE

# Deployed at https://nabhya-api-5mpnb7wq4q-el.a.run.app (custom domain pending DNS)

    POST /v1/ndvi        analyse one image        (API key required)
    GET  /health         liveness + limits        (open)
    GET  /               service card             (open)

Differs from `demo/server.py`, which is a localhost tool with no auth. This is
the public surface: keys enforced, burst-limited, CORS locked, no panels.

WHAT IS DELIBERATELY ABSENT
---------------------------
    * monthly quota / metering   — needs durable storage
    * result persistence         — nothing is written anywhere
    * batch endpoint             — one image per request

Demo tier. `--max-instances=5` is the spend fuse, not the quota. Saying otherwise
to a customer would be a lie about what protects them and us.

WHAT THIS SERVICE WILL NOT DO
-----------------------------
Return a number it cannot support. Every refusal path in `app.core` surfaces as a
4xx with the reason named. There is no code path that substitutes a plausible
value for a failed measurement.
"""
import base64
import io
import json
import logging
import os
import time
import traceback

import numpy as np
from fastapi import FastAPI, File, Form, Header, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from PIL import Image

import geotiff_export

from app import panels
from app.core import analyze, masks
from app.deps import get_model
from app.security.apikey import (AuthError, BurstLimiter, RateLimited,
                                 keyring_from_env)

logging.basicConfig(
    level=os.environ.get("LOG_LEVEL", "info").upper(),
    format='{"ts":"%(asctime)s","level":"%(levelname)s","msg":%(message)s}')
log = logging.getLogger("nabhya")

Image.MAX_IMAGE_PIXELS = 200_000_000

ENVIRONMENT = os.environ.get("ENVIRONMENT", "production")
MAX_IMAGE_MB = float(os.environ.get("MAX_IMAGE_MB", "25"))
# Serve the browser demo from this service. OFF unless explicitly enabled.
#
# The page is public; /v1/ndvi still requires a key, so an unauthenticated
# visitor sees an upload form that cannot do anything. That is the intended
# posture for a demo you hand out with a key — not a substitute for auth.
SERVE_UI = os.environ.get("SERVE_DEMO_UI", "0").lower() in ("1", "true", "yes")

# Free, keyless demo. The visitor should not have to obtain anything to try it.
#
# A demo that requires the visitor to email us for a key is not a demo — it is a
# lead form with extra steps. So /v1/demo/ndvi takes no key and the limits sit on
# OUR side instead: a low per-IP hourly cap, on top of --max-instances=5 and the
# budget alert. A visitor who wants more moves to a key.
#
# This is genuine, bounded cost exposure and it is accepted deliberately. At
# DEMO_PER_IP_PER_HOUR=8 and ~4 s of compute per call, one abusive IP costs
# pennies before it is cut off, and max-instances caps the aggregate regardless.
DEMO_PER_IP_PER_HOUR = int(os.environ.get("DEMO_PER_IP_PER_HOUR", "8"))

ALLOWED_ORIGINS = [o for o in
                   os.environ.get("ALLOWED_ORIGINS", "https://nabhya.tech").split(",")
                   if o.strip()]

app = FastAPI(
    title="Nabhya near-NDVI",
    version="1.0.0",
    docs_url="/docs" if ENVIRONMENT != "production" else None,
    redoc_url=None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["X-API-Key", "Content-Type"],
)

STATE: dict = {}


@app.on_event("startup")
def startup():
    """Fail fast and loudly. A half-configured instance must not accept traffic."""
    STATE["keyring"] = keyring_from_env()          # raises if unconfigured
    STATE["limiter"] = BurstLimiter(
        max_requests=int(os.environ.get("RATE_LIMIT_PER_MIN", "20")),
        window_seconds=60)
    STATE["demo_limiter"] = BurstLimiter(
        max_requests=DEMO_PER_IP_PER_HOUR, window_seconds=3600)
    # Loads the ONNX release. Raises StubInProductionError if MODEL_BACKEND=stub
    # while ENVIRONMENT=production — the stub returns plausible non-predictions
    # and must never reach a customer.
    STATE["model"] = get_model()
    log.info(json.dumps({
        "event": "startup", "environment": ENVIRONMENT,
        "model": getattr(STATE["model"], "version", "?"),
        "inference_mode": analyze.INFERENCE_MODE,
        "keys_loaded": len(STATE["keyring"].hashes),
    }))


def _auth(x_api_key: str | None) -> str:
    try:
        label = STATE["keyring"].verify(x_api_key)
    except AuthError as e:
        # 401 with no detail about WHICH check failed — distinguishing "unknown
        # key" from "malformed key" is a free oracle for an attacker.
        raise HTTPException(401, detail={"error": "unauthorized",
                                         "message": "Valid X-API-Key required."})
    try:
        STATE["limiter"].check(label)
    except RateLimited as e:
        raise HTTPException(429, detail={"error": "rate_limited",
                                         "message": str(e)},
                            headers={"Retry-After": str(e.retry_after)})
    return label


@app.get("/", response_class=HTMLResponse)
def root_page():
    """The demo page when SERVE_DEMO_UI is on, otherwise the service card."""
    if SERVE_UI:
        f = os.path.join(os.path.dirname(__file__), "static", "index.html")
        if os.path.exists(f):
            with open(f) as fh:
                return HTMLResponse(fh.read())
    return JSONResponse(_service_card())


@app.get("/samples/{name}")
def sample(name: str):
    """Bundled example frames for the demo. Path-traversal safe by construction."""
    from fastapi.responses import FileResponse
    if not SERVE_UI or not name.replace("-", "").replace(".", "").isalnum():
        raise HTTPException(404, detail={"error": "not_found"})
    f = os.path.join(os.path.dirname(__file__), "static", "samples", name)
    if not os.path.exists(f):
        raise HTTPException(404, detail={"error": "not_found"})
    return FileResponse(f, media_type="image/jpeg",
                        headers={"Cache-Control": "public, max-age=86400"})


@app.get("/api")
def service_card():
    """Always JSON, whether or not the UI is served."""
    return _service_card()


def _service_card():
    return {
        "service": "Nabhya near-NDVI",
        "version": "1.0.0",
        "endpoints": {"analyse": "POST /v1/ndvi", "health": "GET /health"},
        "auth": "X-API-Key header",
        "what_this_measures": (
            "near-NDVI: an NDVI-like index estimated from RGB. NOT a calibrated "
            "physical NDVI measurement. Ordinal — compare within an image or "
            "across flights of the same field, never against published NDVI "
            "thresholds."),
        "validated_for": "rice, 12-20 m AGL, DJI-class sensor, alluvial soil",
        "not_validated_for": (
            "any other crop. Cotton at boll stage returns 0% canopy (bolls are "
            "excluded as bright non-vegetation) and is out of scope. "
            "Post-flowering stress screening is out of scope for all cereals."),
        "accuracy": {
            "near_ndvi_map_r": analyze.REFERENCE_R_ALL,
            "stress_zone_r": analyze.STRESS_R_ZONE,
            "basis": "paired NIR ground truth, n=40, leave-one-date-out",
        },
    }


@app.get("/health")
def health():
    m = STATE.get("model")
    return {
        "status": "ok" if m is not None else "starting",
        "model_version": getattr(m, "version", None),
        "inference_mode": analyze.INFERENCE_MODE,
        "limits": {
            "max_megapixels": analyze.MAX_MEGAPIXELS,
            "max_image_mb": MAX_IMAGE_MB,
            "validated_gsd_m_per_px": list(analyze.VALIDATED_GSD_RANGE),
            "rate_limit_per_min_per_instance": STATE["limiter"].max,
        },
    }


def _client_ip(request: Request) -> str:
    """Cloud Run puts the real client first in X-Forwarded-For."""
    xff = request.headers.get("X-Forwarded-For", "")
    return (xff.split(",")[0].strip() if xff
            else (request.client.host if request.client else "unknown"))


@app.post("/v1/demo/ndvi")
async def demo_ndvi(request: Request,
                    image: UploadFile = File(...),
                    gsd_m_per_px: str = Form(""),
                    crop: str = Form(""),
                    aoi_polygon: str = Form(""),
                    formats: str = Form("")):
    """Keyless, free, rate limited per IP. Powers the browser demo."""
    if not SERVE_UI:
        raise HTTPException(404, detail={"error": "not_found",
                                         "message": "Demo endpoint is disabled."})
    ip = _client_ip(request)
    try:
        STATE["demo_limiter"].check(ip)
    except RateLimited as e:
        raise HTTPException(429, detail={
            "error": "demo_limit_reached",
            "message": f"Free demo allows {DEMO_PER_IP_PER_HOUR} analyses per hour "
                       f"from one network. Try again in "
                       f"{max(1, e.retry_after // 60)} minutes, or contact us for "
                       f"an API key with a higher limit."},
            headers={"Retry-After": str(e.retry_after)})
    return await _analyse_request(image, gsd_m_per_px, crop, aoi_polygon, formats,
                                  label=f"demo:{ip[:12]}", with_panels=True)


@app.post("/v1/ndvi")
async def ndvi(request: Request,
               image: UploadFile = File(...),
               gsd_m_per_px: str = Form(""),
               crop: str = Form(""),
               aoi_polygon: str = Form(""),
               formats: str = Form(""),
               x_api_key: str | None = Header(None, alias="X-API-Key")):
    label = _auth(x_api_key)
    return await _analyse_request(image, gsd_m_per_px, crop, aoi_polygon, formats,
                                  label=label, with_panels=SERVE_UI)


async def _analyse_request(image, gsd_m_per_px, crop, aoi_polygon, formats,
                           label, with_panels):
    """One implementation. Both doors run identical analysis and identical
    refusals — the only difference is how the caller was admitted."""
    wants_geotiff = "geotiff" in (formats or "").split(",")
    t0 = time.time()

    raw = await image.read()
    if not raw:
        raise HTTPException(400, detail={"error": "empty_upload",
                                         "message": "No file content received."})
    if len(raw) > MAX_IMAGE_MB * 1024 * 1024:
        raise HTTPException(413, detail={
            "error": "file_too_large",
            "message": f"File is {len(raw)/1048576:.1f} MB; limit is "
                       f"{MAX_IMAGE_MB:.0f} MB. Note there is ALSO a "
                       f"{analyze.MAX_MEGAPIXELS:.0f} megapixel limit — a small "
                       f"file from a high-resolution sensor can pass this check "
                       f"and fail that one."})

    has_drone_exif = False
    try:
        im = Image.open(io.BytesIO(raw))
        im.load()
        gps = geotiff_export.extract_gps(im)
        exif = im.getexif()
        if exif:
            make = str(exif.get(271) or "").strip()
            model_name = str(exif.get(272) or "").strip()
            if gps is not None or make or model_name:
                has_drone_exif = True
    except Exception:
        raise HTTPException(400, detail={
            "error": "undecodable_image",
            "message": "Could not decode as an image. Supported: JPEG, PNG, "
                       "TIFF, WebP."})

    alpha = None
    if im.mode in ("RGBA", "LA", "PA"):
        alpha = np.asarray(im.convert("RGBA"))[..., 3]
    rgb = np.asarray(im.convert("RGB"), dtype=np.uint8)
    del im, raw

    gsd = None
    if gsd_m_per_px.strip():
        try:
            gsd = float(gsd_m_per_px)
            if gsd <= 0:
                raise ValueError
        except ValueError:
            raise HTTPException(400, detail={
                "error": "bad_gsd",
                "message": "gsd_m_per_px must be a positive number."})

    aoi = None
    if aoi_polygon.strip():
        try:
            pts = json.loads(aoi_polygon)
        except Exception:
            raise HTTPException(400, detail={
                "error": "bad_aoi",
                "message": "aoi_polygon must be JSON [[x,y],...] with x,y in 0..1."})
        if not isinstance(pts, list) or len(pts) < 3:
            raise HTTPException(400, detail={
                "error": "bad_aoi",
                "message": "A boundary needs at least 3 points. Refusing rather "
                           "than silently analysing the whole frame."})
        from PIL import ImageDraw
        mask_img = Image.new("L", (rgb.shape[1], rgb.shape[0]), 0)
        ImageDraw.Draw(mask_img).polygon(
            [(float(x) * rgb.shape[1], float(y) * rgb.shape[0]) for x, y in pts],
            outline=1, fill=1)
        aoi = np.asarray(mask_img, dtype=bool)
        if not aoi.any():
            raise HTTPException(422, detail={
                "error": "empty_aoi",
                "message": "The boundary encloses no pixels."})

    capture = {} if (with_panels or wants_geotiff) else None
    try:
        result = analyze.analyse(rgb, STATE["model"], alpha=alpha, aoi_mask=aoi,
                                 crop=crop.strip() or None, gsd_m_per_px=gsd,
                                 capture=capture)
    except analyze.ImageTooLargeError as e:
        raise HTTPException(413, detail={
            "error": "image_too_large", "message": str(e),
            "megapixels": round(e.megapixels, 1),
            "limit_megapixels": analyze.MAX_MEGAPIXELS})
    except masks.InsufficientCoverageError as e:
        raise HTTPException(422, detail={
            "error": "insufficient_coverage", "message": str(e),
            "analysed_pct": round(e.analysed_pct, 1),
            "dominant_exclusion": {"reason": e.dominant[0],
                                   "pct": round(e.dominant[1], 1)}})
    except ValueError as e:
        raise HTTPException(422, detail={"error": "cannot_analyse",
                                         "message": str(e)})
    except Exception as e:
        # Never fabricate. Log the trace server-side; tell the caller it failed.
        traceback.print_exc()
        log.error(json.dumps({"event": "inference_failed", "key": label,
                              "error": type(e).__name__}))
        raise HTTPException(500, detail={
            "error": "inference_failed",
            "message": "Analysis failed. No partial or substituted result is "
                       "returned."})

    payload = result.as_dict()
    elapsed = time.time() - t0
    payload["processing"]["elapsed_seconds"] = round(elapsed, 2)
    payload["processing"]["megapixels"] = round(rgb.shape[0] * rgb.shape[1] / 1e6, 1)
    payload["model"] = {"version": getattr(STATE["model"], "version", None),
                        "inference_mode": analyze.INFERENCE_MODE}
    payload["provenance"] = {
        "drone_metadata_found": has_drone_exif,
        "label": "confirmed" if has_drone_exif else "unconfirmed (no drone metadata detected)"
    }
    if not has_drone_exif:
        payload.setdefault("warnings", []).append("unconfirmed_provenance")

    if wants_geotiff:
        if gps is None:
            payload.setdefault("warnings", []).append("geotiff_unavailable_no_gps_exif")
        elif not gsd:
            payload.setdefault("warnings", []).append("geotiff_unavailable_no_gsd")
        else:
            try:
                geotiff_bytes = geotiff_export.export_geotiff(
                    capture["model_ndvi"], capture["canopy"], capture["valid"],
                    gsd_m_per_px=gsd,
                    gps=gps,
                )
                payload["geotiff"] = "data:image/tiff;base64," + base64.b64encode(geotiff_bytes).decode()
            except Exception as e:
                payload.setdefault("warnings", []).append("geotiff_generation_failed")
                log.error(json.dumps({"event": "geotiff_failed", "error": str(e)}))

    # Panels are for the browser only. They roughly double the response size, so
    # an API client that never renders them should not pay for them.
    if with_panels and capture:
        payload["panels"] = panels.build_panels(
            rgb, capture["model_ndvi"], capture["canopy"], capture["valid"])
        zp = panels.build_zone_panel(capture.get("stress_source"),
                                     capture["canopy"],
                                     payload["within_field_stress"].get("zones"))
        if zp:
            payload["panels"]["zones"] = zp
        payload["aoi_applied"] = aoi is not None

    # Structured log. Key LABEL only — never the key, never the image.
    log.info(json.dumps({
        "event": "analysed", "key": label,
        "mp": payload["processing"]["megapixels"],
        "seconds": round(elapsed, 2),
        "coverage_pct": payload["coverage"]["coverage_pct"],
        "confidence": payload["confidence"]["level"],
        "aoi": aoi is not None,
    }))
    return JSONResponse(payload)
