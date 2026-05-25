"use client";

import React from "react";

export default function BarrierSection() {
  return (
    <section id="impact" className="w-full bg-[#070709] border-y border-white/5 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#15803d_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-6">
          <span className="text-[11px] font-black uppercase text-red-500 tracking-widest block mb-4">The Barrier</span>
          <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tight mb-6">
            ₹12,00,000
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug max-w-md">
            The cost of the camera required to generate NDVI crop health data from a drone.
          </h3>
          <div className="space-y-4 max-w-lg">
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-1 shrink-0">
                <span className="text-red-500 font-bold text-[10px]">✕</span>
              </div>
              <p className="text-white/50 text-[14px]">
                <strong>1,400+ drone companies</strong> in India fly every day.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-1 shrink-0">
                <span className="text-red-500 font-bold text-[10px]">✕</span>
              </div>
              <p className="text-white/50 text-[14px]">
                <strong>Most never buy it.</strong>
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-1 shrink-0">
                <span className="text-red-500 font-bold text-[10px]">✕</span>
              </div>
              <p className="text-white/50 text-[14px]">
                <strong>Most farms never get monitored.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00DC82]/20 to-transparent" />
          
          <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-6">Benchmarks</span>
          <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Validated Performance</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 border-b border-white/5 pb-8">
            <div>
              <div className="text-4xl font-black text-white tracking-tight mb-1">0.8060</div>
              <span className="text-[11px] text-white/40 uppercase font-bold tracking-wider">SSIM Score</span>
            </div>
            <div>
              <div className="text-4xl font-black text-white tracking-tight mb-1">92.6%</div>
              <span className="text-[11px] text-white/40 uppercase font-bold tracking-wider">Visual Similarity</span>
            </div>
            <div>
              <div className="text-4xl font-black text-[#00DC82] tracking-tight mb-1">+16.8%</div>
              <span className="text-[11px] text-[#00DC82]/50 uppercase font-bold tracking-wider">Above Benchmark</span>
            </div>
          </div>

          <p className="text-white/50 text-[13px] leading-relaxed">
            💡 <strong>Nabhya breaks this hardware barrier.</strong> By processing standard high-resolution RGB images through our proprietary deep learning network, we reconstruct premium, near-multispectral crop health maps. The pipeline achieves <strong>92.6% spatial and index accuracy</strong> compared to physical multi-lakh sensors, outperforming traditional computer vision benchmarks by <strong>16.8%</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
