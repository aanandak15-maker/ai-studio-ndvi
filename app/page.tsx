"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-[#F3F2EB] flex flex-col items-center justify-center p-8 text-center">
      <motion.div 
        className="flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Image src="/assets/logo.jpeg" alt="Nabhya Logo" width={64} height={64} className="mb-8 mix-blend-multiply opacity-90" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-6xl md:text-[5.5rem] font-medium text-[#222222] tracking-tight mb-4">
          Nabhya
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl md:text-[1.65rem] text-[#555555] font-normal tracking-wide mb-14">
          Rebuilding in silence. Watch this space.
        </motion.p>

        <motion.div variants={itemVariants} className="w-20 border-t border-[#C0C0C0] mb-14" />

        <motion.div variants={itemVariants} className="text-lg md:text-xl font-medium text-[#777777] flex items-center justify-center gap-2">
          Contact — 
          <a 
            href="https://forms.gle/YoJsCSxtYzJA7dAS9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#3A7513] border-b border-[#3A7513] pb-0.5 hover:text-[#2A550E] hover:border-[#2A550E] transition-colors"
          >
            get in touch
          </a>
        </motion.div>
        
        {/* Keeping the email accessible but unobtrusive as requested previously */}
        <motion.div variants={itemVariants} className="mt-4 text-sm text-[#999999]">
          <a href="mailto:aanand.ak15@gmail.com" className="hover:text-[#777777] transition-colors">
            aanand.ak15@gmail.com
          </a>
        </motion.div>

      </motion.div>
    </main>
  );
}
