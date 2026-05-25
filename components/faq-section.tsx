"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do I need a multispectral drone?",
      a: "No. Nabhya works with any standard RGB drone or satellite image. No special hardware required."
    },
    {
      q: "How long does analysis take?",
      a: "Typically under 2 seconds. Tested on images up to 10MB."
    },
    {
      q: "Do you store my uploaded images?",
      a: "No. Images are processed in memory and deleted immediately after analysis. Nothing is stored on our servers."
    },
    {
      q: "How accurate is the NDVI output?",
      a: "Our model achieves SSIM 0.8060 across 440 held-out validation images — 16.8% above the published Pix2Pix benchmark for this task."
    },
    {
      q: "Can I integrate this into my existing software?",
      a: "Yes. Nabhya is a REST API — one POST request returns a full NDVI heatmap and JSON statistics. Most integrations take under a day."
    },
    {
      q: "Can I white-label the output for my clients?",
      a: "White-label is available on Enterprise plans. Contact us to discuss."
    },
    {
      q: "What happens after my 50 free analyses?",
      a: "You will receive an email before you run out. Upgrade to a paid plan to continue. No automatic charges."
    },
    {
      q: "What image types are supported?",
      a: "PNG, JPG, JPEG, and TIFF. Maximum file size 10MB."
    }
  ];

  return (
    <section className="w-full bg-[#070709] border-y border-white/5 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#15803d_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[11px] font-black uppercase text-[#00DC82] tracking-widest block mb-3">Knowledge Base</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Common Questions</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/[0.01] transition-colors"
              >
                <h4 className="text-[15px] font-bold text-white flex items-center gap-3">
                  <span className="text-[#00DC82] font-mono">Q{idx + 1}.</span> {faq.q}
                </h4>
                <span className={`text-[#00DC82] font-black text-base transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}>
                  ＋
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-white/5 text-[14px] text-white/50 leading-relaxed pl-12">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
