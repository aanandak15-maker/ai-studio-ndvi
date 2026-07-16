"use client";

import React from "react";

interface HowItWorksProps {
  setActiveModal: (type: "rgb" | "ndvi" | "report" | null) => void;
}

export default function HowItWorks({ setActiveModal }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="w-full py-0">

      {/* ── Section label ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#6f6d66]">
          Pipeline
        </span>
        <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mt-1">
          How It <span className="text-[#1B6B3A]">Works</span>
        </h2>
      </div>

      {/* ── Dark pipeline band ── */}
      <div className="w-full" style={{ background: "#12281a" }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8CC63F]">
            pipeline — 3 stops
          </span>

          {/* Horizontal 3-stop flow */}
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
            {/* Stop 1 — RGB image */}
            <button
              onClick={() => setActiveModal("rgb")}
              className="group border border-[#3f5c4a] hover:border-[#8CC63F]/60 rounded-xl overflow-hidden transition-colors text-left"
              style={{ background: "#1c3a28" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rgb-input-real.png"
                  alt="Standard RGB drone aerial image used as input for NDVI crop health mapping"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#12281a]/20" />
              </div>
              <div className="p-3">
                <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#9db8a5] mb-0.5">01 — Upload</div>
                <div className="font-mono text-[11px] font-bold text-[#cfe0d4] uppercase">RGB Capture</div>
                <div className="font-mono text-[9px] text-[#9db8a5] mt-1">Real drone input — same field.</div>
              </div>
            </button>

            {/* Arrow */}
            <span className="font-mono text-[#8CC63F] text-lg font-bold">→</span>

            {/* Stop 2 — AI model */}
            <div
              className="border border-[#3f5c4a] rounded-xl p-5 flex flex-col items-center justify-center text-center"
              style={{ background: "#1c3a28", minHeight: 160 }}
            >
              <div className="w-10 h-10 rounded-xl border border-[#8CC63F]/30 flex items-center justify-center mb-3">
                {/* Pixel grid icon */}
                <svg viewBox="0 0 20 20" className="w-5 h-5">
                  {[0,1,2,3].map(r => [0,1,2,3].map(c => (
                    <rect
                      key={`${r}-${c}`}
                      x={c * 5 + 0.5} y={r * 5 + 0.5}
                      width={4} height={4} rx={0.5}
                      fill={["#1B6B3A","#8CC63F","#F7C51E","#E03A2F"][(r + c) % 4]}
                      opacity={0.7}
                    />
                  )))}
                </svg>
              </div>
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#9db8a5] mb-0.5">02 — Process</div>
              <div className="font-mono text-[12px] font-bold text-[#cfe0d4] uppercase">AI Pipeline</div>
              <div className="font-mono text-[9px] text-[#9db8a5] mt-2">Proprietary deep network<br/>pixel-level inference</div>
              <div className="mt-3 px-3 py-1 rounded-full border border-[#8CC63F]/30 font-mono text-[8px] text-[#8CC63F] uppercase tracking-wider">
                &lt; 2 seconds
              </div>
            </div>

            {/* Arrow */}
            <span className="font-mono text-[#8CC63F] text-lg font-bold">→</span>

            {/* Stop 3 — NDVI map */}
            <button
              onClick={() => setActiveModal("ndvi")}
              className="group border border-[#8CC63F]/40 hover:border-[#8CC63F]/80 rounded-xl overflow-hidden transition-colors text-left"
              style={{ background: "#1c3a28" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ndvi-output-real.png"
                  alt="NDVI crop health map output from Nabhya's proprietary model — same field as RGB input"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#12281a]/10" />
                {/* SSIM badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded font-mono text-[8px] font-bold text-[#8CC63F] uppercase tracking-wider">
                  SSIM 0.8060
                </div>
              </div>
              <div className="p-3">
                <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#8CC63F] mb-0.5">03 — Output</div>
                <div className="font-mono text-[11px] font-bold text-[#cfe0d4] uppercase">NDVI Map</div>
                <div className="font-mono text-[9px] text-[#9db8a5] mt-1">Actual model output — unedited.</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Below pipeline: Validate + Report cards (light) ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Validate card */}
          <div className="border border-black/[0.08] rounded-xl p-6 bg-white/50">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1B6B3A] mb-3">04 — Validate</div>
            <h3 className="text-[18px] font-black text-[#1a1a1a] uppercase tracking-tight mb-3">Accuracy Check</h3>
            <p className="text-[#6f6d66] text-[13px] leading-relaxed mb-4">
              Every output cross-checked against held-out Sentinel-2 ground truth. SSIM 0.8060 across 440 validation images.
            </p>

            {/* Qualitative bar chart — no fake decimal labels */}
            <div className="space-y-2">
              {[
                { label: "Field A", w: "82%" },
                { label: "Field B", w: "79%" },
                { label: "Field C", w: "81%" },
                { label: "Field D", w: "83%" },
                { label: "Field E", w: "80%" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-[#6f6d66] w-10 uppercase">{b.label}</span>
                  <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: b.w, background: "#1B6B3A", opacity: 0.7 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 font-mono text-[9px] text-[#6f6d66] uppercase tracking-wider">
              Relative SSIM · 440-image evaluation
            </div>
          </div>

          {/* Report card */}
          <button
            onClick={() => setActiveModal("report")}
            className="border border-black/[0.08] rounded-xl p-6 bg-white/50 text-left hover:border-[#1B6B3A]/30 transition-colors group"
          >
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1B6B3A] mb-3">05 — Report</div>
            <h3 className="text-[18px] font-black text-[#1a1a1a] uppercase tracking-tight mb-3">Field Report</h3>
            <p className="text-[#6f6d66] text-[13px] leading-relaxed mb-4">
              Health scores, stress-zone coordinates, and full statistics exported as JSON or PNG — ready for agronomist or platform.
            </p>

            {/* Zone preview */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Healthy", color: "#1B6B3A", bg: "#eef3e6" },
                { label: "Moderate", color: "#8a6100", bg: "#fef9e5" },
                { label: "Stress", color: "#c0392b", bg: "#fdecea" },
              ].map((z) => (
                <div
                  key={z.label}
                  className="rounded-lg py-3 text-center"
                  style={{ background: z.bg }}
                >
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider" style={{ color: z.color }}>
                    {z.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 font-mono text-[9px] text-[#6f6d66] uppercase tracking-wider group-hover:text-[#1B6B3A] transition-colors">
              Tap to expand →
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
