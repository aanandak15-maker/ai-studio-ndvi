"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    region: "",
    useCase: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScUUKWuYF4PUUxOzjF7IVUSVu8hj7uKip4HnyN9CNZVBeCBSA/formResponse";

    const body = new URLSearchParams();
    body.append("entry.758191935", formData.name);
    body.append("entry.1455196632", formData.organization);
    body.append("entry.1259180267", formData.email);
    body.append("entry.598305617", formData.region);
    body.append("entry.1391305515", formData.useCase);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setStatus("success");
      setFormData({ name: "", organization: "", email: "", region: "", useCase: "" });
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full">

      {/* ── Dark demo CTA band (per 1c wireframe) ── */}
      <div className="w-full" style={{ background: "#12281a" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8CC63F] block mb-3">
            Try the product
          </span>
          <h2 className="text-[24px] font-black text-white uppercase tracking-tight mb-4">
            Drop an image here — get its NDVI map
          </h2>
          <p className="font-mono text-[12px] text-[#9db8a5] mb-6 uppercase tracking-wider">
            No signup required · under 2 seconds · actual model output
          </p>
          <a
            href="https://www.nabhya.tech/demo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded border-2 border-[#8CC63F]/50 hover:border-[#8CC63F] text-[#8CC63F] hover:text-white font-mono font-bold text-[12px] uppercase tracking-wider transition-all hover:bg-[#8CC63F]/10"
          >
            Open Live Demo →
          </a>
        </div>
      </div>

      {/* ── Contact form (light) ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="border border-black/[0.08] rounded-2xl p-8 md:p-12 bg-white/60">

          <div className="text-center mb-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1B6B3A] block mb-2">
              Get In Touch
            </span>
            <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mb-3">
              Partnership & Demos
            </h2>
            <p className="text-[#6f6d66] text-[14px] max-w-lg mx-auto leading-relaxed">
              Interested in partnerships, pilots, or demos? Let's talk about your farm network and monitoring needs.
            </p>
          </div>

          {status === "success" ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1B6B3A]/10 border border-[#1B6B3A]/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-[#1B6B3A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] uppercase tracking-tight">Form Submitted!</h3>
              <p className="text-[#6f6d66] text-[13px] max-w-md leading-relaxed">
                Thank you. Our team will review your details and get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 px-5 py-2 rounded border border-black/10 hover:border-[#1B6B3A]/30 text-[11px] font-mono font-bold text-[#6f6d66] uppercase tracking-wider transition-all"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="font-mono text-[10px] font-bold text-[#6f6d66] uppercase tracking-wider">Name *</label>
                  <input
                    id="form-name" type="text" required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:border-[#1B6B3A]/40 bg-white text-[13px] text-[#1a1a1a] placeholder-[#6f6d66]/50 transition-colors outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-org" className="font-mono text-[10px] font-bold text-[#6f6d66] uppercase tracking-wider">Organization *</label>
                  <input
                    id="form-org" type="text" required
                    placeholder="Company or institution"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:border-[#1B6B3A]/40 bg-white text-[13px] text-[#1a1a1a] placeholder-[#6f6d66]/50 transition-colors outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="font-mono text-[10px] font-bold text-[#6f6d66] uppercase tracking-wider">Email *</label>
                  <input
                    id="form-email" type="email" required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:border-[#1B6B3A]/40 bg-white text-[13px] text-[#1a1a1a] placeholder-[#6f6d66]/50 transition-colors outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-region" className="font-mono text-[10px] font-bold text-[#6f6d66] uppercase tracking-wider">Region *</label>
                  <input
                    id="form-region" type="text" required
                    placeholder="e.g., Southeast Asia, India"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:border-[#1B6B3A]/40 bg-white text-[13px] text-[#1a1a1a] placeholder-[#6f6d66]/50 transition-colors outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-usecase" className="font-mono text-[10px] font-bold text-[#6f6d66] uppercase tracking-wider">Use Case *</label>
                <textarea
                  id="form-usecase" required rows={4}
                  placeholder="Tell us about your farm network and monitoring needs"
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:border-[#1B6B3A]/40 bg-white text-[13px] text-[#1a1a1a] placeholder-[#6f6d66]/50 transition-colors outline-none resize-none"
                />
              </div>

              {status === "error" && (
                <div className="px-4 py-3 rounded-xl border border-[#E03A2F]/20 bg-[#E03A2F]/5 text-[#E03A2F] text-[12px] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  There was an issue submitting. Please try again or email nabhya.tech26@gmail.com directly.
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-7 py-3.5 rounded bg-[#1B6B3A] hover:bg-[#154f2c] text-white font-mono font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Request <Send className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
