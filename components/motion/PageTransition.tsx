"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{
            duration: MOTION_DURATION.pageTransition,
            ease: MOTION_EASE.inOutQuart,
          }}
          onAnimationComplete={() => {
            ScrollTrigger.refresh();
          }}
          className="pointer-events-none fixed inset-0 z-[80] bg-pine"
        />
      )}
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0.25 : 0.85,
          ease: MOTION_EASE.outExpo,
          delay: reducedMotion ? 0 : 0.18,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

