"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToDemo = () => {
    window.open("https://demo.nabhya.tech", "_blank");
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-24 pb-24 text-center flex flex-col items-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[11px] font-bold tracking-widest text-[#00DC82] uppercase mb-8 shadow-inner shadow-black">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse" />
        Precision Agriculture Infrastructure
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-white max-w-4xl uppercase mb-6">
        YOUR DRONE ALREADY <br className="hidden md:inline" />
        <span className="bg-gradient-to-r from-emerald-400 via-[#00DC82] to-green-500 bg-clip-text text-transparent">SEES EVERYTHING.</span>
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed mb-12">
        Now it can understand what it sees.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={scrollToDemo}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00DC82] hover:bg-[#00DC82]/90 text-black font-black text-[15px] shadow-[0_0_35px_rgba(0,220,130,0.25)] hover:shadow-[0_0_45px_rgba(0,220,130,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Try Free Demo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={scrollToDemo}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 text-white font-bold text-[15px] transition-all duration-200 flex items-center justify-center gap-2"
        >
          View API Docs
        </button>
      </div>
    </section>
  );
}
