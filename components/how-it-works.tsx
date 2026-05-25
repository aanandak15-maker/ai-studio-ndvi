"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface HowItWorksProps {
  setActiveModal: (type: "rgb" | "ndvi" | "report" | null) => void;
}

export default function HowItWorks({ setActiveModal }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="w-full py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#15803d_0.6px,transparent_0.6px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-2">Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            How It <span className="text-white/40">Works</span>
          </h2>
        </div>

        {/* 3-Column Grid for Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Step 1: Upload */}
          <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-6 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:translate-y-[-4px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-sm font-bold text-[#00DC82] font-mono group-hover:bg-[#00DC82]/10 transition-colors">
                  01
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00DC82]">Upload</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">RGB Capture</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6">
                Upload any standard RGB drone or aerial image. No multispectral sensor or expensive hardware required.
              </p>
            </div>

            <div 
              onClick={() => setActiveModal("rgb")}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] hover:border-[#00DC82]/30 transition-all duration-300 shadow-lg cursor-pointer group/img"
            >
              <div 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80')" }}
                className="absolute inset-0 bg-cover bg-center opacity-85 group-hover/img:scale-102 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white/80 z-10 uppercase tracking-wider">
                RGB Drone Image
              </div>
              <div className="absolute bottom-4 left-4 text-[9px] font-semibold text-white/40 group-hover/img:text-[#00DC82] transition-colors z-10 uppercase tracking-widest flex items-center gap-1">
                Expand <ArrowRight className="w-2.5 h-2.5 group-hover/img:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/img:scale-110 group-hover/img:bg-[#00DC82] group-hover/img:text-black transition-all duration-300">
                  <span className="text-sm">📷</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Analyse */}
          <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-6 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:translate-y-[-4px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-sm font-bold text-[#00DC82] font-mono group-hover:bg-[#00DC82]/10 transition-colors">
                  02
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00DC82]">Analyse</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">AI Pipeline</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6">
                Our custom deep learning model generates high-resolution, near-NDVI vegetation index maps in under 2 seconds.
              </p>
            </div>

            <div 
              onClick={() => setActiveModal("ndvi")}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] hover:border-[#00DC82]/30 transition-all duration-300 shadow-lg cursor-pointer group/img"
            >
              <div 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1000&q=80')" }}
                className="absolute inset-0 bg-cover bg-center opacity-85 group-hover/img:scale-102 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white/80 z-10 uppercase tracking-wider">
                NDVI Heatmap
              </div>
              <div className="absolute bottom-4 left-4 text-[9px] font-semibold text-white/40 group-hover/img:text-[#00DC82] transition-colors z-10 uppercase tracking-widest flex items-center gap-1">
                Expand <ArrowRight className="w-2.5 h-2.5 group-hover/img:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/img:scale-110 group-hover/img:bg-[#00DC82] group-hover/img:text-black transition-all duration-300">
                  <span className="text-sm">🟢</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Act */}
          <div className="bg-white/[0.01] border border-white/5 hover:border-[#00DC82]/20 rounded-[28px] p-6 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:translate-y-[-4px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-sm font-bold text-[#00DC82] font-mono group-hover:bg-[#00DC82]/10 transition-colors">
                  03
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00DC82]">Act</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Crop Intel</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6">
                Get structural health scores, localize crop stress zones, and export data dynamically via JSON or PNG.
              </p>
            </div>

            <div 
              onClick={() => setActiveModal("report")}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] hover:border-[#00DC82]/30 transition-all duration-300 shadow-lg cursor-pointer group/img"
            >
              <div 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80')" }}
                className="absolute inset-0 bg-cover bg-center opacity-85 group-hover/img:scale-102 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white/80 z-10 uppercase tracking-wider">
                Crop Intel View
              </div>
              <div className="absolute bottom-4 left-4 text-[9px] font-semibold text-white/40 group-hover/img:text-[#00DC82] transition-colors z-10 uppercase tracking-widest flex items-center gap-1">
                Expand <ArrowRight className="w-2.5 h-2.5 group-hover/img:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/img:scale-110 group-hover/img:bg-[#00DC82] group-hover/img:text-black transition-all duration-300">
                  <span className="text-sm">📊</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
