"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AssetModalsProps {
  activeModal: "rgb" | "ndvi" | "report" | null;
  setActiveModal: (type: "rgb" | "ndvi" | "report" | null) => void;
}

/* ─── Expanded field zone SVG for modal — no stock photo, no floating alert card ─── */
function FieldReportModalSVG() {
  const zones = [
    { x: 10,  y: 10,  w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.84", label: "Zone A1" },
    { x: 70,  y: 10,  w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.91", label: "Zone A2" },
    { x: 130, y: 10,  w: 52, h: 38, health: "MODERATE", color: "#EAB308", score: "0.47", label: "Zone A3" },
    { x: 190, y: 10,  w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.88", label: "Zone A4" },
    { x: 250, y: 10,  w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.79", label: "Zone A5" },
    { x: 10,  y: 56,  w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.76", label: "Zone B1" },
    { x: 70,  y: 56,  w: 52, h: 38, health: "STRESS",   color: "#DC2626", score: "0.11", label: "Zone B2" },
    { x: 130, y: 56,  w: 52, h: 38, health: "STRESS",   color: "#DC2626", score: "0.08", label: "Zone B3" },
    { x: 190, y: 56,  w: 52, h: 38, health: "MODERATE", color: "#EAB308", score: "0.32", label: "Zone B4" },
    { x: 250, y: 56,  w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.82", label: "Zone B5" },
    { x: 10,  y: 102, w: 52, h: 38, health: "MODERATE", color: "#EAB308", score: "0.41", label: "Zone C1" },
    { x: 70,  y: 102, w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.80", label: "Zone C2" },
    { x: 130, y: 102, w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.85", label: "Zone C3" },
    { x: 190, y: 102, w: 52, h: 38, health: "HEALTHY",  color: "#22C55E", score: "0.88", label: "Zone C4" },
    { x: 250, y: 102, w: 52, h: 38, health: "MODERATE", color: "#EAB308", score: "0.38", label: "Zone C5" },
  ];

  return (
    <svg viewBox="0 0 312 150" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {zones.map((z, i) => (
        <g key={i}>
          <rect
            x={z.x} y={z.y} width={z.w} height={z.h}
            rx={5}
            fill={z.color} fillOpacity={0.13}
            stroke={z.color} strokeWidth={0.9} strokeOpacity={0.55}
          />
          <text x={z.x + z.w / 2} y={z.y + 12} fontSize={5} fill={z.color} fillOpacity={0.5} textAnchor="middle" fontFamily="monospace">{z.label}</text>
          <text x={z.x + z.w / 2} y={z.y + 23} fontSize={10} fill={z.color} textAnchor="middle" fontFamily="monospace" fontWeight="bold">{z.score}</text>
          <text x={z.x + z.w / 2} y={z.y + 33} fontSize={5.5} fill={z.color} fillOpacity={0.6} textAnchor="middle" fontFamily="monospace">{z.health}</text>
        </g>
      ))}
      {/* Legend */}
      <rect x={10}  y={144} width={7} height={4} rx={1} fill="#22C55E" />
      <text x={20} y={148} fontSize={5.5} fill="#ffffff" fillOpacity={0.4} fontFamily="monospace">HEALTHY (≥0.50)</text>
      <rect x={110} y={144} width={7} height={4} rx={1} fill="#EAB308" />
      <text x={120} y={148} fontSize={5.5} fill="#ffffff" fillOpacity={0.4} fontFamily="monospace">MODERATE (0.30–0.50)</text>
      <rect x={220} y={144} width={7} height={4} rx={1} fill="#DC2626" />
      <text x={230} y={148} fontSize={5.5} fill="#ffffff" fillOpacity={0.4} fontFamily="monospace">STRESS (&lt;0.30)</text>
    </svg>
  );
}

/* ─── RGB Capture SVG ─── */
function RgbCaptureSVG() {
  const patches = [
    { x: 8,   y: 12,  w: 56, h: 42, r: 62,  g: 120, b: 47  },
    { x: 72,  y: 12,  w: 56, h: 42, r: 78,  g: 138, b: 52  },
    { x: 136, y: 12,  w: 56, h: 42, r: 148, g: 148, b: 62  },
    { x: 200, y: 12,  w: 56, h: 42, r: 55,  g: 112, b: 44  },
    { x: 264, y: 12,  w: 56, h: 42, r: 90,  g: 142, b: 55  },
    { x: 8,   y: 62,  w: 56, h: 42, r: 70,  g: 130, b: 50  },
    { x: 72,  y: 62,  w: 56, h: 42, r: 160, g: 130, b: 60  },
    { x: 136, y: 62,  w: 56, h: 42, r: 160, g: 110, b: 58  },
    { x: 200, y: 62,  w: 56, h: 42, r: 155, g: 130, b: 55  },
    { x: 264, y: 62,  w: 56, h: 42, r: 68,  g: 128, b: 48  },
    { x: 8,   y: 112, w: 56, h: 42, r: 50,  g: 105, b: 40  },
    { x: 72,  y: 112, w: 56, h: 42, r: 62,  g: 118, b: 45  },
    { x: 136, y: 112, w: 56, h: 42, r: 140, g: 140, b: 60  },
    { x: 200, y: 112, w: 56, h: 42, r: 58,  g: 115, b: 43  },
    { x: 264, y: 112, w: 56, h: 42, r: 80,  g: 135, b: 52  },
  ];
  return (
    <svg viewBox="0 0 328 170" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {patches.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx={4}
          fill={`rgb(${p.r},${p.g},${p.b})`} opacity={0.85} />
      ))}
      <line x1={8} y1={58} x2={320} y2={58} stroke="#000" strokeWidth={2} strokeOpacity={0.3} />
      <line x1={8} y1={108} x2={320} y2={108} stroke="#000" strokeWidth={2} strokeOpacity={0.3} />
      <line x1={68} y1={12} x2={68} y2={154} stroke="#000" strokeWidth={1.5} strokeOpacity={0.25} />
      <line x1={132} y1={12} x2={132} y2={154} stroke="#000" strokeWidth={1.5} strokeOpacity={0.25} />
      <line x1={196} y1={12} x2={196} y2={154} stroke="#000" strokeWidth={1.5} strokeOpacity={0.25} />
      <line x1={260} y1={12} x2={260} y2={154} stroke="#000" strokeWidth={1.5} strokeOpacity={0.25} />
      {/* Crosshair */}
      <line x1={148} y1={72} x2={172} y2={72} stroke="#fff" strokeWidth={1} strokeOpacity={0.7} />
      <line x1={160} y1={60} x2={160} y2={84} stroke="#fff" strokeWidth={1} strokeOpacity={0.7} />
      <circle cx={160} cy={72} r={12} fill="none" stroke="#fff" strokeWidth={1} strokeOpacity={0.45} />
      {/* HUD badges */}
      <rect x={8} y={6} width={76} height={11} rx={2} fill="#000" fillOpacity={0.65} />
      <text x={12} y={14} fontSize={7} fill="#00DC82" fontFamily="monospace" fontWeight="bold">ALT 120m · RGB · 3CH</text>
      <rect x={244} y={6} width={76} height={11} rx={2} fill="#000" fillOpacity={0.65} />
      <text x={248} y={14} fontSize={7} fill="#fff" fillOpacity={0.6} fontFamily="monospace">18.52°N 73.86°E</text>
      {/* Channel legend */}
      <rect x={8} y={158} width={90} height={11} rx={2} fill="#000" fillOpacity={0.55} />
      <circle cx={18} cy={163.5} r={3.5} fill="#EF4444" />
      <text x={25} y={167} fontSize={7} fill="#EF4444" fontFamily="monospace" fontWeight="bold">R</text>
      <circle cx={38} cy={163.5} r={3.5} fill="#22C55E" />
      <text x={45} y={167} fontSize={7} fill="#22C55E" fontFamily="monospace" fontWeight="bold">G</text>
      <circle cx={58} cy={163.5} r={3.5} fill="#3B82F6" />
      <text x={65} y={167} fontSize={7} fill="#3B82F6" fontFamily="monospace" fontWeight="bold">B</text>
      <rect x={222} y={158} width={98} height={11} rx={2} fill="#000" fillOpacity={0.55} />
      <text x={226} y={167} fontSize={7} fill="#fff" fillOpacity={0.45} fontFamily="monospace">4096 × 3072 px</text>
    </svg>
  );
}

/* ─── Pixel transition SVG for NDVI modal (expanded) ─── */
function PixelTransitionModalSVG() {
  // 14 cols × 8 rows of pixels, left half = RGB tones, right half = NDVI colours
  const cols = 14;
  const rows = 8;
  const cw = 20;
  const ch = 16;
  const gap = 2;

  // NDVI value grid (drives right-side colour)
  const ndviVals = [
    [0.82, 0.85, 0.70, 0.91, 0.88, 0.78, 0.30, 0.22, 0.75, 0.82, 0.90, 0.88, 0.85, 0.80],
    [0.60, 0.90, 0.92, 0.88, 0.40, 0.15, 0.10, 0.65, 0.88, 0.85, 0.78, 0.84, 0.86, 0.79],
    [0.50, 0.70, 0.95, 0.90, 0.22, 0.08, 0.18, 0.70, 0.92, 0.80, 0.88, 0.76, 0.82, 0.84],
    [0.45, 0.55, 0.88, 0.78, 0.35, 0.12, 0.30, 0.60, 0.85, 0.70, 0.80, 0.90, 0.74, 0.86],
    [0.60, 0.65, 0.70, 0.55, 0.60, 0.40, 0.55, 0.50, 0.70, 0.60, 0.82, 0.78, 0.88, 0.72],
    [0.75, 0.80, 0.60, 0.65, 0.72, 0.68, 0.70, 0.62, 0.60, 0.55, 0.70, 0.80, 0.85, 0.78],
    [0.80, 0.75, 0.85, 0.78, 0.80, 0.74, 0.76, 0.70, 0.65, 0.72, 0.78, 0.82, 0.80, 0.76],
    [0.88, 0.82, 0.80, 0.85, 0.84, 0.80, 0.82, 0.76, 0.78, 0.80, 0.84, 0.86, 0.82, 0.80],
  ];

  function rgbFill(v: number) {
    // Simulate RGB field patch colour (green/olive/earthy)
    const g = Math.round(100 + v * 50);
    const r = Math.round(60 + (1 - v) * 80);
    const b = Math.round(30 + v * 30);
    return `rgb(${r},${g},${b})`;
  }

  function ndviColor(v: number) {
    if (v >= 0.6) return "#22C55E";
    if (v >= 0.3) return "#EAB308";
    return "#DC2626";
  }

  const totalW = cols * (cw + gap) - gap;
  const totalH = rows * (ch + gap) - gap;
  const splitX = 7; // left 7 cols = RGB, right 7 = NDVI

  return (
    <svg viewBox={`-4 -4 ${totalW + 8} ${totalH + 28}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {ndviVals.map((row, r) =>
        row.map((v, c) => {
          const x = c * (cw + gap);
          const y = r * (ch + gap);
          const isNdvi = c >= splitX;
          return (
            <rect
              key={`${r}-${c}`}
              x={x} y={y} width={cw} height={ch}
              rx={2}
              fill={isNdvi ? ndviColor(v) : rgbFill(v)}
              opacity={isNdvi ? 0.75 + v * 0.22 : 0.80}
            />
          );
        })
      )}

      {/* Divider arrow */}
      <line
        x1={splitX * (cw + gap) - 2} y1={0}
        x2={splitX * (cw + gap) - 2} y2={totalH}
        stroke="#00DC82" strokeWidth={1.5} strokeOpacity={0.6}
        strokeDasharray="3 2"
      />

      {/* Scan-line animation */}
      <rect x={0} y={0} width={totalW} height={2} fill="#00DC82" opacity={0.3}>
        <animateTransform attributeName="transform" type="translate"
          values={`0 0; 0 ${totalH}; 0 0`} dur="3s" repeatCount="indefinite" />
      </rect>

      {/* Column labels */}
      <text x={splitX * (cw + gap) / 2} y={totalH + 10} fontSize={7}
        fill="#ffffff" fillOpacity={0.4} textAnchor="middle" fontFamily="monospace">RGB INPUT</text>
      <text x={splitX * (cw + gap) + (cols - splitX) * (cw + gap) / 2} y={totalH + 10} fontSize={7}
        fill="#00DC82" fillOpacity={0.7} textAnchor="middle" fontFamily="monospace">NDVI OUTPUT</text>

      {/* NDVI legend */}
      <circle cx={splitX * (cw + gap) + 4} cy={totalH + 20} r={3} fill="#22C55E" />
      <text x={splitX * (cw + gap) + 10} y={totalH + 23} fontSize={6} fill="#22C55E" fontFamily="monospace">&gt;0.60</text>
      <circle cx={splitX * (cw + gap) + 44} cy={totalH + 20} r={3} fill="#EAB308" />
      <text x={splitX * (cw + gap) + 50} y={totalH + 23} fontSize={6} fill="#EAB308" fontFamily="monospace">0.30-0.60</text>
      <circle cx={splitX * (cw + gap) + 96} cy={totalH + 20} r={3} fill="#DC2626" />
      <text x={splitX * (cw + gap) + 102} y={totalH + 23} fontSize={6} fill="#DC2626" fontFamily="monospace">&lt;0.30</text>
    </svg>
  );
}

export default function AssetModals({ activeModal, setActiveModal }: AssetModalsProps) {
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});

  const handleClose = () => {
    setActiveModal(null);
    setImgErrors({});
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div 
          key={activeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-[#0A0A0F] border border-white/10 w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#8CC63F] tracking-widest block mb-1">Nabhya Asset Probe</span>
                <h4 className="text-lg font-bold text-white uppercase">
                  {activeModal === "rgb" ? "RGB Drone Image View" :
                   activeModal === "ndvi" ? "NDVI Heatmap View" :
                   "Field Report — Zone Diagnostics"}
                </h4>
              </div>
              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center justify-center min-h-[350px]">
              {activeModal === "rgb" && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] shadow-2xl">
                  {/* Real before→after: RGB input left, NDVI output right */}
                  <div className="flex h-full">
                    <div className="relative w-1/2 h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/rgb-input-real.png" alt="RGB drone input" className="w-full h-full object-cover" />
                      <span className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono font-bold text-white/80 bg-black/60 backdrop-blur-sm py-1">
                        RGB INPUT
                      </span>
                    </div>
                    {/* Divider + arrow */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#00DC82] flex items-center justify-center shadow-lg shadow-emerald-500/40">
                      <span className="text-black font-black text-sm">→</span>
                    </div>
                    <div className="relative w-1/2 h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/ndvi-output-real.png" alt="NDVI model output" className="w-full h-full object-cover" />
                      <span className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono font-bold text-[#00DC82] bg-black/60 backdrop-blur-sm py-1">
                        NDVI OUTPUT — unedited.
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[9px] text-[#00DC82]">
                    RGB CAPTURE · STANDARD DRONE
                  </div>
                </div>
              )}

              {activeModal === "ndvi" && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] shadow-2xl">
                  {/* Real NDVI model output — same field as RGB card */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ndvi-output-real.png"
                    alt="Actual NDVI model output"
                    className="w-full h-full object-cover"
                  />
                  {/* SSIM validated badge */}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-white/80">SSIM 0.8060 VALIDATED</span>
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg">
                    <span className="text-[9px] font-mono font-bold text-[#00DC82]">Actual model output — unedited.</span>
                  </div>
                  {/* NDVI legend */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-[10px] flex flex-col gap-1.5">
                    <div className="font-bold text-white/40 uppercase tracking-wider text-[8px]">NDVI Index</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#22C55E]" />
                      <span className="text-white/70 font-mono font-bold">0.50+ (Healthy)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#EAB308]" />
                      <span className="text-white/70 font-mono font-bold">0.30–0.50</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#DC2626]" />
                      <span className="text-white/70 font-mono font-bold">&lt; 0.30 (Stress)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === "report" && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] shadow-2xl flex items-center justify-center p-6">
                  {/* Code-rendered field zone diagnostic grid — no stock photo */}
                  <FieldReportModalSVG />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#00DC82]">FIELD ZONE REPORT</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-[10px] font-mono text-white/70 flex flex-col gap-1">
                    <div className="font-bold text-[#00DC82] uppercase tracking-wider text-[8px]">Diagnostics</div>
                    <div>SSIM: 0.8060 Verified</div>
                    <div>Stress Zones: 2 of 12</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
