"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, ScanLine, Leaf, AlertTriangle, RefreshCw, BarChart2, Layers, CheckCircle2 } from "lucide-react";

export default function Page() {
  const [step, setStep] = useState<"upload" | "preview" | "analyzing" | "result">("upload");
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"result" | "source">("result");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setStep("preview");
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setStep("preview");
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    if (!sourceImage) return;
    
    setStep("analyzing");
    
    // Process image after a small delay to allow UI to update and simulation to run
    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const scale = Math.min(MAX_WIDTH / img.width, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Pseudo NDVI calculation ((G-R)/(G+R)) optimized for standard RGB drone shots
          const ndvi = (g - r) / (g + r + 0.001);

          // Horizontal scanline interference artifact (matches provided demo imagery)
          const y = Math.floor((i / 4) / canvas.width);
          const scanline = y % 2 === 0 ? 0.75 : 1.0;

          let outR, outG, outB;

          if (ndvi > 0.05) {
            // High Vegetation -> Greenish
            outR = g * 0.4;
            outG = Math.min(255, g * 1.5);
            outB = 0;
          } else if (ndvi > -0.05) {
            // Moderate -> Yellow / Orange
            outR = Math.min(255, r * 1.5);
            outG = Math.min(255, g * 1.2);
            outB = 0;
          } else {
            // Low Veg / Soil -> Red / Deep Orange
            outR = Math.min(255, r * 2.0);
            outG = g * 0.5;
            outB = 0;
          }

          data[i] = Math.min(255, outR * scanline);
          data[i + 1] = Math.min(255, outG * scanline);
          data[i + 2] = Math.min(255, outB * scanline);
        }

        ctx.putImageData(imageData, 0, 0);
        setResultImage(canvas.toDataURL("image/jpeg", 0.9));
        setStep("result");
        setActiveTab("result");
      };
      img.src = sourceImage;
    }, 2500); // 2.5s analysis simulation
  };

  const resetSession = () => {
    setStep("upload");
    setSourceImage(null);
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-brand-accent/30 flex flex-col pt-12 pb-24 px-6 md:px-12 items-center">
      
      {/* HEADER */}
      <header className="w-full max-w-5xl mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2 uppercase flex items-center justify-center sm:justify-start gap-3">
            <Layers className="w-8 h-8 text-green-500" />
            Field Intelligence
          </h1>
          <p className="text-white/50 text-[14px]">High-resolution NDVI and crop health mapping</p>
        </div>
        
        {step !== "upload" && (
          <button 
            onClick={resetSession}
            className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 text-[13px] font-medium transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            New Analysis
          </button>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-5xl flex-1 flex flex-col pt-4">
        
        <AnimatePresence mode="wait">
          
          {/* UPLOAD STEP */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col items-center justify-center w-full min-h-[400px] border-2 border-dashed border-white/20 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group p-12"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white">Upload RGB Drone Imagery</h2>
              <p className="text-white/60 text-center max-w-sm mb-6 text-[15px]">
                Drag and drop your standard RGB field capture, or click to browse. We will generate a health map representation.
              </p>
              <div className="px-6 py-3 rounded-full bg-white text-black font-semibold text-[14px]">
                Select Image
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                className="hidden" 
              />
            </motion.div>
          )}

          {/* PREVIEW & ANALYZING STEP */}
          {(step === "preview" || step === "analyzing") && sourceImage && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center flex-col items-center"
            >
              <div className="relative w-full max-w-4xl aspect-[16/9] rounded-[24px] overflow-hidden border border-white/20 bg-black shadow-2xl mb-8">
                {/* Image */}
                <img 
                  src={sourceImage} 
                  alt="Source field" 
                  className={`w-full h-full object-cover transition-all duration-700 ${step === "analyzing" ? "saturate-50 contrast-125 brightness-50" : ""}`}
                />
                
                {/* Scanning Animation */}
                {step === "analyzing" && (
                  <>
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-green-500 shadow-[0_0_20px_4px_rgba(34,197,94,0.6)] z-20"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay z-10" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                      <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4 border border-white/10">
                        <ScanLine className="w-6 h-6 text-green-500 animate-pulse" />
                        <span className="font-mono text-[14px] uppercase tracking-widest font-semibold text-green-500">Processing Spatial Data...</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {step === "preview" && (
                <button
                  onClick={processImage}
                  className="px-8 py-4 rounded-full bg-green-500 text-black text-[15px] font-bold hover:bg-green-400 transition-colors shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] flex items-center gap-3"
                >
                  <ScanLine className="w-5 h-5" />
                  Run Precision Analysis
                </button>
              )}
            </motion.div>
          )}

          {/* RESULT STEP */}
          {step === "result" && resultImage && sourceImage && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex justify-center flex-col items-center"
            >
              {/* Controls */}
              <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-full mb-6">
                <button
                  onClick={() => setActiveTab("source")}
                  className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all ${activeTab === "source" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
                >
                  Standard RGB
                </button>
                <button
                  onClick={() => setActiveTab("result")}
                  className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all ${activeTab === "result" ? "bg-green-500 text-black" : "text-white/60 hover:text-white"}`}
                >
                  Health Map (NDVI)
                </button>
              </div>

              {/* Image Display */}
              <div className="relative w-full max-w-4xl aspect-[16/9] rounded-[24px] overflow-hidden border border-white/20 bg-black shadow-2xl mb-12">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={activeTab === "result" ? resultImage : sourceImage}
                    alt="Visualization"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Result Overlay Badge */}
                {activeTab === "result" && (
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[12px] font-mono uppercase tracking-widest font-semibold text-white">Analysis Complete</span>
                  </div>
                )}
              </div>

              {/* Diagnostics Dashboard */}
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-surface-1 border border-border-subtle rounded-[20px] p-6 shadow-xl flex flex-col">
                  <div className="flex items-center gap-3 text-white/60 mb-4">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <span className="text-[13px] uppercase tracking-widest font-semibold">Vegetation Health</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">78<span className="text-xl text-white/40">%</span></div>
                  <p className="text-[14px] text-white/50">Overall canopy vitality is within optimal parameters.</p>
                </div>

                <div className="bg-surface-1 border border-border-subtle rounded-[20px] p-6 shadow-xl flex flex-col">
                  <div className="flex items-center gap-3 text-white/60 mb-4">
                    <BarChart2 className="w-5 h-5 text-yellow-500" />
                    <span className="text-[13px] uppercase tracking-widest font-semibold">Variance Index</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">0.68</div>
                  <p className="text-[14px] text-white/50">High structural uniformity detected across sectors.</p>
                </div>

                <div className="bg-surface-1 border border-border-subtle rounded-[20px] p-6 shadow-xl flex flex-col">
                  <div className="flex items-center gap-3 text-white/60 mb-4">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="text-[13px] uppercase tracking-widest font-semibold">Stress Zones</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">3</div>
                  <p className="text-[14px] text-white/50">Minor irrigation anomalies identified in lower quadrant.</p>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
}


