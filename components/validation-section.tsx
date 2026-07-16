"use client";

import React from "react";
import { ShieldCheck, Zap, Layers, FileCheck, CheckCircle2, Trophy } from "lucide-react";

const AGRITECH_SOURCE =
  "https://youragristory.in/agritech-yuva-competition-2026-successfully-concluded-cultivating-innovation-announcing-the-future-innovators-of-india/";

export default function ValidationSection() {
  return (
    <section id="validation" className="w-full max-w-6xl mx-auto px-6 py-16 relative z-10">

      {/* NDVI gradient divider */}
      <div
        className="w-full h-[4px] rounded-full mb-12"
        style={{ background: "linear-gradient(90deg, #E03A2F, #F7C51E, #8CC63F, #1B6B3A)" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-start">

        {/* Left */}
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#6f6d66] block mb-2">
            Validation
          </span>
          <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mb-5">
            Built on <span className="text-[#1B6B3A]">Real Science.</span>
          </h2>

          {/* Award badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <a
              href="https://ieee-ndvi-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1B6B3A]/20 bg-[#1B6B3A]/5 text-[10px] font-mono font-bold uppercase text-[#1B6B3A] tracking-wider hover:bg-[#1B6B3A]/10 transition-colors"
            >
              IEEE Hackathon Winner 2026
            </a>
            <a
              href={AGRITECH_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#8a6100]/20 bg-[#F7C51E]/5 text-[10px] font-mono font-bold uppercase text-[#8a6100] tracking-wider hover:bg-[#F7C51E]/10 transition-colors"
            >
              🏆 AgriTech Yuva 2026 · 1st Prize
            </a>
          </div>

          <p className="text-[#6f6d66] text-[14px] leading-relaxed">
            Developed to make satellite-level crop analytics affordable to all growers in developing ecosystems — bypassing multi-lakh camera hardware.
          </p>
        </div>

        {/* Right — cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: ShieldCheck,
              title: "Verified model accuracy",
              body: "SSIM 0.8060 on 440 held-out Sentinel-2 images — a reproducible, auditable methodology. 16.8% above the published benchmark.",
              accent: "#1B6B3A",
            },
            {
              icon: Zap,
              title: "Fast at scale",
              body: "Under 2 seconds per image. Designed for batch processing — submit a full flight's worth of frames in one API call.",
              accent: "#1B6B3A",
            },
            {
              icon: Layers,
              title: "India-focused",
              body: "Built for the Indian agri-drone ecosystem. Trained on Indian field imagery.",
              accent: "#1B6B3A",
            },
            {
              icon: FileCheck,
              title: "Audit-ready output",
              body: "Every score tied to ground-truth imagery. Exportable JSON/PNG — designed for PMFBY-claims documentation.",
              accent: "#1B6B3A",
            },
            {
              icon: CheckCircle2,
              title: "Honest about stage",
              body: "MVP — field trials in progress. Early partners get direct access to the founding team.",
              accent: "#1B6B3A",
            },
          ].map(({ icon: Icon, title, body, accent }) => (
            <div
              key={title}
              className="border border-black/[0.08] rounded-xl p-5 bg-white/50"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${accent}15` }}
              >
                <Icon className="w-4 h-4" style={{ color: accent }} />
              </div>
              <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-1">{title}</h4>
              <p className="text-[#6f6d66] text-[12px] leading-relaxed">{body}</p>
            </div>
          ))}

          {/* Nationally Recognized — full width, amber */}
          <a
            href={AGRITECH_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#8a6100]/15 rounded-xl p-5 bg-[#F7C51E]/[0.04] hover:bg-[#F7C51E]/[0.08] transition-colors group sm:col-span-2"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#F7C51E22" }}>
                <Trophy className="w-4 h-4 text-[#8a6100]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="text-[14px] font-bold text-[#1a1a1a]">Nationally Recognized</h4>
                  <span className="font-mono text-[9px] font-bold uppercase text-[#8a6100]/60 tracking-widest border border-[#8a6100]/20 px-2 py-0.5 rounded-full group-hover:border-[#8a6100]/40 transition-colors">
                    Verify ↗
                  </span>
                </div>
                <p className="text-[#6f6d66] text-[12px] leading-relaxed">
                  1st Prize, AgriTech Yuva Competition 2026 — selected among 11 national finalist teams.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
