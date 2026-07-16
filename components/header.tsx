"use client";

import React from "react";

/* NDVI diamond logo — conic-gradient per 1c wireframe */
function NabhyaLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{
          width: 20,
          height: 20,
          background: "conic-gradient(#1B6B3A 0 25%, #F7C51E 25% 50%, #E03A2F 50% 75%, #8CC63F 75%)",
          borderRadius: 4,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span className="text-[15px] font-black text-[#1a1a1a] tracking-tight uppercase">Nabhya</span>
    </div>
  );
}

export default function Header() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#F8F7F3]/95 backdrop-blur-sm border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <NabhyaLogo />

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Validation", href: "#validation" },
            { label: "Applications", href: "#applications" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[12px] font-mono font-medium text-[#6f6d66] hover:text-[#1B6B3A] uppercase tracking-wider transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Demo CTA */}
        <a
          href="/demo.html"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#1B6B3A] hover:bg-[#154f2c] text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded transition-colors"
        >
          Try Demo
        </a>
      </div>
    </header>
  );
}
