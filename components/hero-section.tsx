"use client";

import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full">
      {/* ── 50/50 Hero Split ── */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[480px]">

          {/* Left — story side (light) */}
          <div className="flex flex-col justify-center py-8 pr-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1B6B3A] mb-4 block">
              NDVI without the ₹12L camera
            </span>

            <h1 className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight text-[#1a1a1a] uppercase mb-5">
              NDVI Crop Health Maps<br />
              <span className="text-[#1B6B3A]">From Your Standard Drone.</span>
            </h1>

            <p className="text-[#6f6d66] text-[15px] leading-relaxed max-w-md mb-8">
              Nabhya reconstructs near-NDVI crop health maps from standard RGB drone footage — no multispectral sensor, no hardware changes.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://www.nabhya.tech/demo.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1B6B3A] hover:bg-[#154f2c] text-white text-[12px] font-mono font-bold uppercase tracking-wider rounded transition-colors"
              >
                Try Free Demo
              </a>
              <a
                href="#how-it-works"
                className="px-6 py-3 border border-black/10 hover:border-[#1B6B3A]/40 text-[#6f6d66] hover:text-[#1B6B3A] text-[12px] font-mono font-bold uppercase tracking-wider rounded transition-colors"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Right — data panel (dark) */}
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "#12281a", minHeight: 340 }}
          >
            {/* Real NDVI output */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ndvi-output-real.png"
              alt="Real NDVI crop health map generated from standard RGB drone imagery — Nabhya model output"
              width={1200}
              height={900}
              className="w-full h-full object-cover absolute inset-0 opacity-80"
            />

            {/* Dark overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12281a]/80 via-transparent to-[#12281a]/30" />

            {/* Top label */}
            <div className="relative z-10 p-4">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8CC63F]">
                Live Output Panel
              </span>
            </div>

            {/* Bottom metadata */}
            <div className="relative z-10 mt-auto p-4 flex items-center justify-between">
              <span className="font-mono text-[9px] text-[#9db8a5] uppercase tracking-wider">
                Actual model output — unedited.
              </span>
              <span className="font-mono text-[10px] font-bold text-[#8CC63F] uppercase tracking-wider">
                SSIM 0.8060
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── NDVI gradient bar — the brand signature ── */}
      <div
        className="w-full h-[6px] mt-10"
        style={{ background: "linear-gradient(90deg, #E03A2F, #F7C51E, #8CC63F, #1B6B3A)" }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-6 flex justify-between mt-1.5">
        <span className="font-mono text-[9px] text-[#6f6d66] uppercase tracking-wider">stressed</span>
        <span className="font-mono text-[9px] text-[#6f6d66] uppercase tracking-wider">healthy</span>
      </div>

      {/* ── Ticker strip — credentials + stats ── */}
      <div className="w-full border-y border-black/[0.06] bg-white/60 mt-4 py-3 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center gap-x-6 gap-y-1">
          {[
            "1,400+ DGCA drone operators",
            "SSIM 0.8060 · 440 held-out images",
            "92.6% visual similarity",
            "16.8% above benchmark",
            "IEEE Hackathon Winner 2026",
            "AgriTech Yuva 2026 · 1st Prize",
          ].map((item, i, arr) => (
            <React.Fragment key={item}>
              <span className="font-mono text-[10px] font-medium text-[#6f6d66] uppercase tracking-wider whitespace-nowrap">
                {item}
              </span>
              {i < arr.length - 1 && (
                <span className="text-black/20 font-mono text-[10px]">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
