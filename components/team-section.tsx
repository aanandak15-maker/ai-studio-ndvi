"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

const TEAM = [
  {
    initials: "AK",
    name: "Anand",
    role: "Founder & AI Engineer",
    detail: "Built model, API, and frontend",
    color: "#1B6B3A",
    textColor: "#fff",
  },
  {
    initials: "HI",
    name: "Himanshi",
    role: "Co-Founder",
    detail: "Operations",
    color: "#8CC63F",
    textColor: "#12281a",
  },
  {
    initials: "VP",
    name: "Varshita",
    role: "Co-Founder",
    detail: "Communications",
    color: "#e8f0dd",
    textColor: "#1B6B3A",
  },
  {
    initials: "RG",
    name: "Rajan",
    role: "Co-Founder",
    detail: "Marketing",
    color: "#e8f0dd",
    textColor: "#1B6B3A",
  },
];

export default function TeamSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16 relative z-10">

      {/* Pricing teaser — "Working with Nabhya" */}
      <div className="mb-16 border border-black/[0.08] rounded-2xl px-8 py-6 bg-white/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1B6B3A] block mb-1">
            Working with Nabhya
          </span>
          <p className="text-[#6f6d66] text-[14px] leading-relaxed">
            Pilots run on your <strong className="text-[#1a1a1a]">existing flight imagery</strong> — no hardware changes, no fleet disruption.
            One REST API call returns JSON + PNG output.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <span className="px-4 py-2 rounded border border-black/10 text-[11px] font-mono font-bold text-[#6f6d66] uppercase tracking-wider whitespace-nowrap">
            Pricing — Coming Soon
          </span>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 rounded bg-[#1B6B3A] hover:bg-[#154f2c] text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
          >
            Request Pilot
          </button>
        </div>
      </div>

      {/* Team block */}
      <div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#6f6d66] block mb-1">
          Team
        </span>
        <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mb-8">
          Who Built <span className="text-[#1B6B3A]">This</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="border border-black/[0.08] rounded-xl p-5 flex flex-col gap-3 bg-white/50 hover:border-[#1B6B3A]/20 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-black"
                style={{ backgroundColor: member.color, color: member.textColor }}
              >
                {member.initials}
              </div>
              <div>
                <div className="text-[#1a1a1a] font-bold text-[14px] leading-snug">{member.name}</div>
                <div className="font-mono text-[10px] font-bold text-[#1B6B3A] uppercase tracking-wider leading-snug mt-0.5">
                  {member.role}
                </div>
                <div className="font-mono text-[11px] text-[#6f6d66] leading-snug mt-1">{member.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Credential footnote */}
        <p className="mt-5 font-mono text-[11px] text-[#6f6d66] leading-relaxed">
          Galgotias University, Greater Noida ·{" "}
          <a
            href="https://youragristory.in/agritech-yuva-competition-2026-successfully-concluded-cultivating-innovation-announcing-the-future-innovators-of-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8a6100] hover:text-[#5a3e00] transition-colors inline-flex items-center gap-0.5"
          >
            AgriTech Yuva 2026, 1st Prize <ExternalLink className="w-2.5 h-2.5" />
          </a>{" "}
          · IEEE Hackathon Winner 2026
        </p>
      </div>
    </section>
  );
}
