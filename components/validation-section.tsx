"use client";

import React from "react";
import { ShieldCheck, TrendingUp, Layers, CheckCircle2 } from "lucide-react";

export default function ValidationSection() {
  return (
    <section id="validation" className="w-full max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-3">Validation</span>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-6">BUILT ON REAL SCIENCE.</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 text-[10px] font-black uppercase text-[#00DC82] tracking-wider mb-6">
            IEEE Hackathon Winner 2026
          </div>
          <p className="text-white/50 text-[15px] leading-relaxed mb-8">
            We developed Nabhya to make satellite-level and high-precision drone agricultural analytics affordable to all growers in developing ecosystems, bypassing multi-lakh camera hardware.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-[24px]">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#00DC82]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Independently validated accuracy</h4>
            <p className="text-white/40 text-[13px] leading-relaxed">
              IEEE Hackathon Winner 2026. Independently validated accuracy.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-[24px]">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-[#00DC82]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Benchmark-beating performance</h4>
            <p className="text-white/40 text-[13px] leading-relaxed">
              SSIM 0.8060 — verified on held-out test data.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-[24px]">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-[#00DC82]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">India-focused</h4>
            <p className="text-white/40 text-[13px] leading-relaxed">
              Built for the Indian agri-drone ecosystem.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-[24px]">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#00DC82]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Honest about stage</h4>
            <p className="text-white/40 text-[13px] leading-relaxed">
              MVP — field trials in progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
