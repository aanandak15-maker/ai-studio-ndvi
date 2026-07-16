"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How accurate is the NDVI output?",
      a: "Our model achieves SSIM 0.8060 across 440 held-out validation images — 16.8% above the published benchmark for this task."
    },
    {
      q: "How was the model validated, and has it been independently recognised?",
      a: "We validated on 440 real Sentinel-2 field pairs held out from training. The work received recognition from MSME (Ministry of Micro, Small & Medium Enterprises) and was presented at an IEEE student-branch symposium. SSIM and Pearson r metrics are logged per inference run for auditability."
    },
    {
      q: "Do I need a multispectral drone?",
      a: "No. Nabhya works with any standard RGB drone or satellite image. No special hardware required."
    },
    {
      q: "What image types are supported?",
      a: "PNG, JPG, JPEG, and TIFF. Maximum file size 10MB."
    },
    {
      q: "How long does analysis take?",
      a: "Typically under 2 seconds. Tested on images up to 10MB."
    },
    {
      q: "Can I integrate this into my existing software?",
      a: "Yes. Nabhya is a REST API — one POST request returns a full NDVI heatmap and JSON statistics. Most integrations take under a day."
    },
    {
      q: "What happens after my 50 free analyses?",
      a: "You will receive an email before you run out. Upgrade to a paid plan to continue. No automatic charges."
    },
    {
      q: "Is Nabhya's SSIM validation methodology auditable?",
      a: "Yes. Every inference run logs SSIM and Pearson r scores against ground-truth. On Enterprise plans we can share the full validation dataset provenance and model card on request."
    }
  ];

  return (
    <section className="w-full bg-[#F8F7F3] border-y border-black/[0.06] py-20 relative overflow-hidden">

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#6f6d66] block mb-2">Knowledge Base</span>
          <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight">Common <span className="text-[#1B6B3A]">Questions</span></h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-black/[0.08] rounded-xl overflow-hidden bg-white/60 transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1B6B3A]/[0.03] transition-colors"
              >
                <h4 className="text-[14px] font-bold text-[#1a1a1a] flex items-center gap-3">
                  <span className="text-[#1B6B3A] font-mono text-[11px] font-bold">Q{idx + 1}.</span> {faq.q}
                </h4>
                <span className={`text-[#1B6B3A] font-black text-base transition-transform duration-300 shrink-0 ml-4 ${openFaq === idx ? 'rotate-45' : ''}`}>
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
                    <div className="px-6 pb-5 pt-2 border-t border-black/[0.06] text-[13px] text-[#6f6d66] leading-relaxed pl-14">
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
