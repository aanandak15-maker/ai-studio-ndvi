"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import BarrierSection from "@/components/barrier-section";
import WhoWeServe from "@/components/who-we-serve";
import HowItWorks from "@/components/how-it-works";
import ValidationSection from "@/components/validation-section";
import FaqSection from "@/components/faq-section";
import TeamSection from "@/components/team-section";
import GetInTouch from "@/components/get-in-touch";
import Footer from "@/components/footer";
import AssetModals from "@/components/asset-modals";

export default function Page() {
  const [activeModal, setActiveModal] = useState<"rgb" | "ndvi" | "report" | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#F8F7F3] text-[#1a1a1a] font-sans selection:bg-[#1B6B3A]/20 flex flex-col items-center overflow-x-hidden relative">

      {/* Modular Layout — 1c Split Field-Map */}
      <Header />
      <HeroSection />
      <BarrierSection />
      <WhoWeServe />
      <HowItWorks setActiveModal={setActiveModal} />
      <ValidationSection />
      <FaqSection />
      <TeamSection />
      <GetInTouch />
      <Footer />

      {/* Asset Explorer Zoom Modals */}
      <AssetModals activeModal={activeModal} setActiveModal={setActiveModal} />

    </div>
  );
}
