"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import BarrierSection from "@/components/barrier-section";
import B2bIntegration from "@/components/b2b-integration";
import HowItWorks from "@/components/how-it-works";
import ValidationSection from "@/components/validation-section";
import FaqSection from "@/components/faq-section";
import GetInTouch from "@/components/get-in-touch";
import WhoWeServe from "@/components/who-we-serve";
import Footer from "@/components/footer";
import AssetModals from "@/components/asset-modals";

export default function Page() {
  const [activeModal, setActiveModal] = useState<"rgb" | "ndvi" | "report" | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#030304] text-[#E5E5E9] font-sans selection:bg-[#00DC82]/30 flex flex-col items-center overflow-x-hidden relative">
      
      {/* Decorative Glow Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-emerald-950/10 blur-[130px]" />
        <div className="absolute top-[25%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-green-950/10 blur-[130px]" />
        <div className="absolute top-[55%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-emerald-900/10 blur-[160px]" />
      </div>

      {/* Modular Layout Hierarchy */}
      <Header />
      <HeroSection />
      <BarrierSection />
      <B2bIntegration />
      <WhoWeServe />
      <HowItWorks setActiveModal={setActiveModal} />
      <ValidationSection />
      <FaqSection />
      <GetInTouch />
      <Footer />

      {/* Asset Explorer Zoom Modals */}
      <AssetModals activeModal={activeModal} setActiveModal={setActiveModal} />

    </div>
  );
}
