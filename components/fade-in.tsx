"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: {},
        animate: { transition: { staggerChildren: 0.15 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInChild({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
