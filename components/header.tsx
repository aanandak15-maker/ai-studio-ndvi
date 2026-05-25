"use client";

import React from "react";
import { Layers, ChevronRight } from "lucide-react";

export default function Header() {
  const scrollToDemo = () => {
    window.open("https://demo.nabhya.tech", "_blank");
  };

  return (
    <header className="w-full sticky top-0 bg-[#030304]/80 backdrop-blur-md border-b border-white/5 z-40 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00DC82] to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Layers className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-black text-white tracking-tight uppercase">Nabhya</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#impact" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">Impact</a>
          <a href="#applications" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">Applications</a>
          <a href="#how-it-works" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">How It Works</a>
          <a href="#validation" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">Validation</a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/20 text-[11px] font-black uppercase text-[#00DC82] tracking-wider">
            IEEE Hackathon Winner 2026
          </span>
          <button 
            onClick={scrollToDemo}
            className="px-5 py-2 rounded-full bg-white hover:bg-white/90 text-black text-[13px] font-bold transition-all duration-200 shadow-md shadow-white/5 flex items-center gap-1.5"
          >
            Get Early Access
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
