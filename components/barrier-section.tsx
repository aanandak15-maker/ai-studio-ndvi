"use client";

import React from "react";

export default function BarrierSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16 relative z-10">

      {/* ── Split: light problem stat + dark "what farms miss" panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 items-stretch">

        {/* Left — the barrier (light) */}
        <div className="border border-black/[0.08] rounded-2xl p-8 bg-white/50">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E03A2F] block mb-3">
            The Barrier
          </span>
          <div className="text-[56px] font-black leading-none tracking-tight text-[#1a1a1a] mb-4">
            ₹12L
          </div>
          <p className="text-[#6f6d66] text-[14px] leading-relaxed max-w-sm">
            A multispectral camera costs ₹8–12 lakh. Most Indian drone operators — 1,400+ DGCA-certified — fly standard RGB sensors and generate zero crop health data per flight.
          </p>
        </div>

        {/* Right — what farms miss (dark panel) */}
        <div
          className="rounded-2xl p-8 flex flex-col justify-between"
          style={{ background: "#12281a" }}
        >
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#9db8a5] block mb-3">
            What farms miss on every flight
          </span>

          <div className="space-y-3 flex-1">
            {[
              { label: "Stress detection", colour: "#E03A2F" },
              { label: "Disease early warning", colour: "#F7C51E" },
              { label: "Irrigation mapping", colour: "#8CC63F" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.colour }}
                />
                <span className="font-mono text-[11px] text-[#cfe0d4] uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[28px] font-black text-[#F7C51E] leading-none">
              0
            </div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#9db8a5]">
              NDVI maps generated per flight without Nabhya
            </span>
          </div>
        </div>
      </div>

      {/* ── Solution stat row ── */}
      <div className="mt-5 grid grid-cols-3 gap-5">
        {[
          { stat: "0.8060", label: "SSIM Score", sub: "440 validation images", accent: "#1B6B3A" },
          { stat: "92.6%", label: "Visual Similarity", sub: "vs. multispectral sensor", accent: "#1B6B3A" },
          { stat: "+16.8%", label: "Above Benchmark", sub: "vs. published baseline", accent: "#8CC63F" },
        ].map((s) => (
          <div key={s.label} className="border border-black/[0.08] rounded-xl p-5 bg-white/50">
            <div className="text-[28px] font-black leading-none" style={{ color: s.accent }}>
              {s.stat}
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] mt-1">
              {s.label}
            </div>
            <div className="font-mono text-[9px] text-[#6f6d66] mt-0.5 uppercase tracking-wider">
              {s.sub}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
