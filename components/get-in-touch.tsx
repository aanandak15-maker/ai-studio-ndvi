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

    // Google Form Entry Mappings
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScUUKWuYF4PUUxOzjF7IVUSVu8hj7uKip4HnyN9CNZVBeCBSA/formResponse";
    
    const body = new URLSearchParams();
    body.append("entry.758191935", formData.name);
    body.append("entry.1455196632", formData.organization);
    body.append("entry.1259180267", formData.email);
    body.append("entry.598305617", formData.region);
    body.append("entry.1391305515", formData.useCase);

    try {
      // mode: 'no-cors' is required to post cross-origin to Google Forms
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      setStatus("success");
      setFormData({
        name: "",
        organization: "",
        email: "",
        region: "",
        useCase: "",
      });
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-6 py-24 relative z-10">
      <div className="bg-white/[0.01] border border-white/5 rounded-[36px] p-8 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00DC82]/20 to-transparent" />

        <div className="text-center mb-10">
          <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-3">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">Partnership & Demos</h2>
          <p className="text-white/50 text-[14px] font-medium max-w-lg mx-auto leading-relaxed">
            Interested in partnerships, pilots, or demos? Let&apos;s talk about your farm network and monitoring needs.
          </p>
        </div>

        {status === "success" ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/30 flex items-center justify-center text-[#00DC82] shadow-[0_0_30px_rgba(0,220,130,0.15)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Form Submitted Successfully!</h3>
            <p className="text-white/50 text-[13.5px] max-w-md leading-relaxed">
              Thank you for reaching out. Our precision agriculture team will review your farm network details and get back to you shortly.
            </p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-4 px-6 py-2 rounded-full border border-white/10 hover:bg-white/[0.02] text-[12px] font-bold text-white transition-all duration-200"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-name" className="text-[11px] font-bold text-white/40 uppercase tracking-wider pl-1">Name *</label>
                <input 
                  id="form-name"
                  type="text" 
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 focus:border-[#00DC82]/30 focus:bg-white/[0.04] text-[13.5px] text-white placeholder-white/20 transition-all duration-300 outline-none"
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-org" className="text-[11px] font-bold text-white/40 uppercase tracking-wider pl-1">Organization *</label>
                <input 
                  id="form-org"
                  type="text" 
                  required
                  placeholder="Company or institution"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 focus:border-[#00DC82]/30 focus:bg-white/[0.04] text-[13.5px] text-white placeholder-white/20 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-email" className="text-[11px] font-bold text-white/40 uppercase tracking-wider pl-1">Email *</label>
                <input 
                  id="form-email"
                  type="email" 
                  required
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 focus:border-[#00DC82]/30 focus:bg-white/[0.04] text-[13.5px] text-white placeholder-white/20 transition-all duration-300 outline-none"
                />
              </div>

              {/* Region */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-region" className="text-[11px] font-bold text-white/40 uppercase tracking-wider pl-1">Region *</label>
                <input 
                  id="form-region"
                  type="text" 
                  required
                  placeholder="e.g., Southeast Asia, India"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 focus:border-[#00DC82]/30 focus:bg-white/[0.04] text-[13.5px] text-white placeholder-white/20 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            {/* Use Case */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-usecase" className="text-[11px] font-bold text-white/40 uppercase tracking-wider pl-1">Use Case *</label>
              <textarea 
                id="form-usecase"
                required
                rows={4}
                placeholder="Tell us about your farm network and monitoring needs"
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 focus:border-[#00DC82]/30 focus:bg-white/[0.04] text-[13.5px] text-white placeholder-white/20 transition-all duration-300 outline-none resize-none"
              />
            </div>

            {/* Error Message */}
            {status === "error" && (
              <div className="px-5 py-3 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-[12.5px] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                There was an issue submitting your request. Please try again or contact us directly.
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-4 rounded-full bg-[#00DC82] hover:bg-[#00DC82]/90 text-black font-black text-[14px] shadow-[0_0_25px_rgba(0,220,130,0.15)] hover:shadow-[0_0_35px_rgba(0,220,130,0.25)] transition-all duration-300 flex items-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    Submitting...
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Request
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
