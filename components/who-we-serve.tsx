"use client";

import React from "react";
import { Leaf, Cpu, Check } from "lucide-react";

export default function WhoWeServe() {
  return (
    <section id="applications" className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10 border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Header */}
        <div className="lg:col-span-4 flex flex-col items-start text-left lg:pr-6">
          <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-3">Applications</span>
          <h2 className="text-4xl font-black text-white leading-[1.1] uppercase tracking-tight mb-4">
            Who We <br />
            <span className="text-white/40">Serve</span>
          </h2>
          <p className="text-white/50 text-[14px] leading-relaxed max-w-sm">
            Nabhya bridges the hardware gap to deliver precision agriculture capabilities directly to the field or embedded into agtech platforms.
          </p>
        </div>

        {/* Right Side: Dual Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Direct to Farms */}
          <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-8 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:translate-y-[-4px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00DC82]/10 to-transparent" />
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-[#00DC82]/10 transition-colors">
                <Leaf className="w-6 h-6 text-[#00DC82]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">Direct to Farms</h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span className="text-white/60 text-[13.5px] leading-snug">
                    Near-NDVI quality crop health monitoring from standard cameras
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span className="text-white/60 text-[13.5px] leading-snug">
                    Real-time alerts for stress, disease risk, and irrigation needs
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span className="text-white/60 text-[13.5px] leading-snug">
                    Affordable precision agriculture without expensive hardware
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Agtech Platform Partners */}
          <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-8 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:translate-y-[-4px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00DC82]/10 to-transparent" />
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-[#00DC82]/10 transition-colors">
                <Cpu className="w-6 h-6 text-[#00DC82]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">Platform Partners</h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span className="text-white/60 text-[13.5px] leading-snug">
                    API integration to embed our ML models in your platform
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span className="text-white/60 text-[13.5px] leading-snug">
                    White-label crop health analytics for your customers
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span className="text-white/60 text-[13.5px] leading-snug">
                    Scale precision agriculture across thousands of farms
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
