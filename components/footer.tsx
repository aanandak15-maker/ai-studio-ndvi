"use client";

import React from "react";

function NabhyaLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{
          width: 18,
          height: 18,
          background: "conic-gradient(#1B6B3A 0 25%, #F7C51E 25% 50%, #E03A2F 50% 75%, #8CC63F 75%)",
          borderRadius: 3,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span className="text-[14px] font-black text-[#1a1a1a] tracking-tight uppercase">Nabhya</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white/60 border-t border-black/[0.06] pt-14 pb-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Brand */}
        <div className="max-w-xs">
          <NabhyaLogo />
          <p className="font-mono text-[11px] text-[#6f6d66] leading-relaxed mt-4 uppercase tracking-wider">
            AI Crop Health Intelligence.<br />
            Near-NDVI from standard RGB.<br />
            Built in India.
          </p>
          {/* NDVI gradient bar */}
          <div
            className="w-24 h-[3px] rounded-full mt-4"
            style={{ background: "linear-gradient(90deg, #E03A2F, #F7C51E, #8CC63F, #1B6B3A)" }}
            aria-hidden="true"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-10">
          <div>
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-3">Product</h5>
            <ul className="space-y-2 font-mono text-[11px] text-[#6f6d66] uppercase tracking-wider">
              <li>
                <a href="https://www.nabhya.tech/demo.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B6B3A] transition-colors">
                  Try Demo
                </a>
              </li>
              <li>
                <a href="https://www.nabhya.tech/demo.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B6B3A] transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-3">Company</h5>
            <ul className="space-y-2 font-mono text-[11px] text-[#6f6d66] uppercase tracking-wider">
              <li><a href="#contact" className="hover:text-[#1B6B3A] transition-colors">Contact</a></li>
              <li>
                <a href="mailto:nabhya.tech26@gmail.com" className="hover:text-[#1B6B3A] transition-colors">
                  nabhya.tech26@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://youragristory.in/agritech-yuva-competition-2026-successfully-concluded-cultivating-innovation-announcing-the-future-innovators-of-india/"
                  target="_blank" rel="noopener noreferrer"
                  className="hover:text-[#8a6100] transition-colors"
                >
                  AgriTech Yuva 2026 ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 border-t border-black/[0.06] mt-10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="font-mono text-[10px] text-[#6f6d66] uppercase tracking-wider">
          © 2026 Nabhya · SSIM 0.8060 · India-focused · MVP
        </span>
        <span className="font-mono text-[10px] text-[#6f6d66] uppercase tracking-wider">
          IEEE Hackathon Winner 2026 · AgriTech Yuva 2026, 1st Prize
        </span>
      </div>
    </footer>
  );
}
