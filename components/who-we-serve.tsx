"use client";

import React, { useState } from "react";

const TABS = [
  {
    id: "drone",
    label: "Drone Companies",
    tag: "API",
    headline: "Turn every RGB flight into a crop health flight.",
    bullets: [
      "No hardware changes — works with your existing fleet",
      "One REST API call returns NDVI map in < 2 seconds",
      "Add crop health to your service offering, no sensor cost",
      "Batch processing for full-flight image sets",
    ],
    stat: "1,400+ DGCA operators",
  },
  {
    id: "saas",
    label: "Farm SaaS",
    tag: "SDK",
    headline: "Embed NDVI intelligence into your platform in a day.",
    bullets: [
      "API or SDK integration — JSON + PNG output",
      "White-label crop health analytics for your customers",
      "Field-level stress zone coordinates in the response",
      "Scale across thousands of farms with batch endpoints",
    ],
    stat: "50+ agtech platforms",
  },
  {
    id: "insurer",
    label: "Insurers",
    tag: "Batch",
    headline: "Audit-ready field scoring at PMFBY scale.",
    bullets: [
      "Every score tied to held-out ground-truth imagery",
      "Exportable as JSON for PMFBY-claims documentation",
      "Field-level risk map: HEALTHY / MODERATE / STRESS",
      "₹25,000 Cr PMFBY claim pool — reduce manual assessment",
    ],
    stat: "₹25,000 Cr PMFBY claims",
  },
];

export default function WhoWeServe() {
  const [active, setActive] = useState("drone");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section id="applications" className="w-full max-w-6xl mx-auto px-6 py-16 relative z-10">

      {/* Header */}
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#6f6d66] block mb-1">
        Integration Paths
      </span>
      <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mb-8">
        Who Uses <span className="text-[#1B6B3A]">Nabhya</span>
      </h2>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 rounded font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
              active === t.id
                ? "bg-[#1B6B3A] text-white"
                : "border border-black/10 text-[#6f6d66] hover:border-[#1B6B3A]/30 hover:text-[#1B6B3A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content: 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

        {/* Left — text */}
        <div className="border border-black/[0.08] rounded-xl p-7 bg-white/50">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white bg-[#1B6B3A] px-2 py-0.5 rounded">
              {tab.tag}
            </span>
            <span className="font-mono text-[9px] text-[#6f6d66] uppercase tracking-wider">
              {tab.stat}
            </span>
          </div>

          <h3 className="text-[18px] font-black text-[#1a1a1a] leading-snug mb-5">
            {tab.headline}
          </h3>

          <ul className="space-y-3">
            {tab.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: "#1B6B3A" }}
                />
                <span className="text-[#6f6d66] text-[13px] leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — product screenshot panel (dark) */}
        <div
          className="rounded-xl overflow-hidden relative flex flex-col"
          style={{ background: "#12281a", minHeight: 240 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ndvi-output-real.png"
            alt="NDVI crop health output — segment-specific field mapping"
            width={1200}
            height={900}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#12281a]/60 via-transparent to-[#12281a]/80" />

          {/* Overlay metadata */}
          <div className="relative z-10 p-5 flex flex-col h-full justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8CC63F]">
              Segment-specific output
            </span>
            <div>
              <div className="flex gap-2 flex-wrap">
                {["HEALTHY", "MODERATE", "STRESS"].map((z, i) => (
                  <span
                    key={z}
                    className="font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                    style={{
                      background: ["#1B6B3A22","#8a610022","#c0392b22"][i],
                      color: ["#8CC63F","#F7C51E","#E03A2F"][i],
                      border: `1px solid ${["#8CC63F33","#F7C51E33","#E03A2F33"][i]}`,
                    }}
                  >
                    {z}
                  </span>
                ))}
              </div>
              <p className="font-mono text-[9px] text-[#9db8a5] mt-2 uppercase tracking-wider">
                Actual model output — unedited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
