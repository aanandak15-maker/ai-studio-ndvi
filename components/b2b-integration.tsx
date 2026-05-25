"use client";

import React from "react";
import { Cpu, Layers, ShieldCheck } from "lucide-react";

export default function B2bIntegration() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="text-center mb-16">
        <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-3">B2B Integration</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Who Uses Nabhya</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Card 1 */}
        <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-8 shadow-xl flex flex-col transition-all duration-300 group hover:translate-y-[-4px]">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-[#00DC82]/10 transition-colors">
            <Cpu className="w-6 h-6 text-[#00DC82]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Drone Service Companies</h3>
          <span className="text-[12px] font-black text-[#00DC82] uppercase tracking-wider block mb-4">1,400+ DGCA Operators</span>
          <p className="text-white/50 text-[13.5px] leading-relaxed">
            Deliver crop health on every existing flight. No new hardware required.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-8 shadow-xl flex flex-col transition-all duration-300 group hover:translate-y-[-4px]">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-[#00DC82]/10 transition-colors">
            <Layers className="w-6 h-6 text-[#00DC82]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Farm Management Platforms</h3>
          <span className="text-[12px] font-black text-[#00DC82] uppercase tracking-wider block mb-4">50+ Active SaaS Platforms</span>
          <p className="text-white/50 text-[13.5px] leading-relaxed">
            Add NDVI intelligence via one API integration.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-8 shadow-xl flex flex-col transition-all duration-300 group hover:translate-y-[-4px]">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-[#00DC82]/10 transition-colors">
            <ShieldCheck className="w-6 h-6 text-[#00DC82]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Crop Insurance Providers</h3>
          <span className="text-[12px] font-black text-[#00DC82] uppercase tracking-wider block mb-4">₹25,000 Cr PMFBY claims</span>
          <p className="text-white/50 text-[13.5px] leading-relaxed">
            Automated field-level risk scoring at scale.
          </p>
        </div>
      </div>
    </section>
  );
}
