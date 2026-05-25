"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AssetModalsProps {
  activeModal: "rgb" | "ndvi" | "report" | null;
  setActiveModal: (type: "rgb" | "ndvi" | "report" | null) => void;
}

export default function AssetModals({ activeModal, setActiveModal }: AssetModalsProps) {
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});

  const handleClose = () => {
    setActiveModal(null);
    setImgErrors({});
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div 
          key={activeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-[#0A0A0F] border border-white/10 w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#00DC82] tracking-widest block mb-1">Nabhya Asset Probe</span>
                <h4 className="text-lg font-bold text-white uppercase">
                  {activeModal === "rgb" ? "RGB Drone Image View" :
                   activeModal === "ndvi" ? "NDVI Heatmap View" :
                   "Health Score Report"}
                </h4>
              </div>
              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center justify-center min-h-[350px]">
              {activeModal === "rgb" && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] shadow-2xl flex items-center justify-center">
                  {!imgErrors.rgb ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1600&q=80" 
                      alt="RGB View" 
                      className="w-full h-full object-cover"
                      onError={() => setImgErrors(prev => ({ ...prev, rgb: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0C0C0F] bg-[radial-gradient(#00DC82_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-10 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-4xl mb-4">📷</span>
                      <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-2">RGB Capture Offline</h5>
                      <p className="text-white/40 text-[11px] max-w-sm leading-relaxed">
                        Asset missing or not cached. Please ensure the file is at <code className="text-[#00DC82] bg-white/5 px-1.5 py-0.5 rounded font-mono">public/rgb-capture.jpg</code> and restart the development server.
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 border-[2px] border-[#00DC82]/20 pointer-events-none" />
                  
                  {/* Drone HUD HUD overlay elements */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-[#00DC82] bg-black/70 px-2.5 py-1 rounded">
                    ALT: 120m | ALTITUDE OPTIMAL
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/50 bg-black/70 px-2.5 py-1 rounded">
                    Standard RGB Drone Capture
                  </div>
                </div>
              )}

              {activeModal === "ndvi" && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] shadow-2xl flex items-center justify-center">
                  {!imgErrors.ndvi ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1600&q=80" 
                      alt="NDVI Heatmap View" 
                      className="w-full h-full object-cover"
                      onError={() => setImgErrors(prev => ({ ...prev, ndvi: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0C0C0F] bg-[radial-gradient(#00DC82_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-10 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-4xl mb-4">🟢</span>
                      <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-2">NDVI Heatmap Offline</h5>
                      <p className="text-white/40 text-[11px] max-w-sm leading-relaxed">
                        Asset missing or not cached. Please ensure the file is at <code className="text-[#00DC82] bg-white/5 px-1.5 py-0.5 rounded font-mono">public/ai-pipeline.png</code> and restart the development server.
                      </p>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-white/80">SSIM 0.8060 VALIDATED</span>
                  </div>
                  {/* Color bar legend stops */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-[10px] flex flex-col gap-1.5">
                    <div className="font-bold text-white/40 uppercase tracking-wider text-[8px]">NDVI Index</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#22C55E]" />
                      <span className="text-white/70 font-mono font-bold">0.50+ (Healthy)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#EAB308]" />
                      <span className="text-white/70 font-mono font-bold">0.15 - 0.30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#DC2626]" />
                      <span className="text-white/70 font-mono font-bold">&lt; 0.05 (Soil/Stress)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === "report" && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0C0C0F] shadow-2xl flex items-center justify-center">
                  {!imgErrors.report ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" 
                      alt="Crop Intel View" 
                      className="w-full h-full object-cover"
                      onError={() => setImgErrors(prev => ({ ...prev, report: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0C0C0F] bg-[radial-gradient(#00DC82_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-10 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-4xl mb-4">📊</span>
                      <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-2">Crop Intel Offline</h5>
                      <p className="text-white/40 text-[11px] max-w-sm leading-relaxed">
                        Asset missing or not cached. Please ensure the file is at <code className="text-[#00DC82] bg-white/5 px-1.5 py-0.5 rounded font-mono">public/crop-intel.png</code> and restart the development server.
                      </p>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#00DC82]">PRECISION CROP AUDIT</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-[10px] font-mono text-white/70 flex flex-col gap-1">
                    <div className="font-bold text-[#00DC82] uppercase tracking-wider text-[8px]">Diagnostics</div>
                    <div>SSIM: 0.8060 Verified</div>
                    <div>Status: 8 Stress Zones</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
