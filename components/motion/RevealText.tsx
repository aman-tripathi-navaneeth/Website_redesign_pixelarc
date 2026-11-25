"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface RevealTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  trigger?: "load" | "scroll";
  splitBy?: "lines" | "words";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function RevealText({
  children,
  as: Tag = "div",
  className,
  trigger = "scroll",
  splitBy = "lines",
  delay = 0,
  duration = MOTION_DURATION.reveal,
  stagger = splitBy === "words" ? MOTION_STAGGER.words : MOTION_STAGGER.lines,
}: RevealTextProps) {
  const elRef = React.useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const target = elRef.current;
      if (!target) return;

      if (reducedMotion) {
        gsap.fromTo(
          target,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.45,
            delay,
            ease: "power2.out",
            scrollTrigger:
              trigger === "scroll"
                ? {
                    trigger: target,
                    start: "top 88%",
                    once: true,
                  }
                : undefined,
          }
        );
        return;
      }

      let splitInstance: SplitText | null = null;
      let cancelled = false;

      const initSplit = () => {
        if (cancelled || !elRef.current) return;
        splitInstance?.revert();

        splitInstance = SplitText.create(elRef.current, {
          type: splitBy === "words" ? "lines,words" : "lines",
          mask: splitBy === "words" ? "words" : "lines",
          autoSplit: true,
          onSplit: (self) => {
            const units = splitBy === "words" ? self.words : self.lines;
            gsap.set(units, { willChange: "transform, opacity" });

            return gsap.from(units, {
              yPercent: 108,
              opacity: 0,
              duration,
              stagger,
              delay,
              ease: MOTION_EASE.gsapOutExpo,
              onComplete: () => {
                gsap.set(units, { clearProps: "willChange" });
              },
              scrollTrigger:
                trigger === "scroll"
                  ? {
                      trigger: elRef.current,
                      start: "top 86%",
                      once: true,
                    }
                  : undefined,
            });
          },
        });
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initSplit);
      } else {
        initSplit();
      }

      return () => {
        cancelled = true;
        splitInstance?.revert();
      };
    },
    { scope: elRef, dependencies: [reducedMotion, trigger, splitBy, delay, duration, stagger] }
  );

  return (
    <Tag ref={elRef as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
