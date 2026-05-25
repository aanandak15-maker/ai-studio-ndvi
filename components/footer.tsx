"use client";

import React from "react";
import { Layers } from "lucide-react";

export default function Footer() {
  const scrollToDemo = () => {
    window.open("https://demo.nabhya.tech", "_blank");
  };

  return (
    <footer className="w-full bg-[#030304] border-t border-white/5 pt-16 pb-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00DC82] to-emerald-400 flex items-center justify-center">
              <Layers className="w-4.5 h-4.5 text-black" />
            </div>
            <span className="text-lg font-black text-white tracking-tight uppercase">Nabhya</span>
          </div>
          <p className="text-[13px] text-white/40 leading-relaxed text-center md:text-left max-w-sm">
            AI Crop Health Intelligence. Reconstructing high-precision crop indices without multispectral hardware. Built in India · IEEE Validated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-12">
          <div className="text-center sm:text-left">
            <h5 className="text-[11px] font-black uppercase text-white tracking-widest mb-3">Product</h5>
            <ul className="space-y-2 text-[13px] text-white/50 font-semibold uppercase tracking-wider">
              <li><button onClick={scrollToDemo} className="hover:text-white transition-colors">Try Demo</button></li>
              <li><button onClick={scrollToDemo} className="hover:text-white transition-colors">API Docs</button></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h5 className="text-[11px] font-black uppercase text-white tracking-widest mb-3">Company</h5>
            <ul className="space-y-2 text-[13px] text-white/50 font-mono">
              <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span></li>
              <li><a href="mailto:anand.ak15@gmail.com" className="hover:text-white transition-colors">anand.ak15@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-white/30 font-semibold uppercase tracking-wider">
        <span>© 2026 Nabhya · SSIM 0.8060</span>
        <span>India-focused · MVP</span>
      </div>
    </footer>
  );
}
