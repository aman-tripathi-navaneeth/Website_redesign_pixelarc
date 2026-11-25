"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_EASE } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({ value, prefix = "", suffix = "", className }: CounterProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = spanRef.current;
      if (!el) return;

      if (reducedMotion) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.4,
        ease: MOTION_EASE.gsapOutExpo,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    },
    { scope: spanRef, dependencies: [value, prefix, suffix, reducedMotion] }
  );

  return (
    <span ref={spanRef} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

