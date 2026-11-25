"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
}

export function Marquee({ children, className, durationSeconds = 36 }: MarqueeProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const track = trackRef.current;
      const root = rootRef.current;
      if (!track || !root || reducedMotion) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: durationSeconds,
        ease: "none",
      });
      tweenRef.current = tween;

      let direction = 1;
      const velocityTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const vel = self.getVelocity();
          if (Math.abs(vel) < 10) return;
          direction = vel >= 0 ? 1 : -1;
          const speedBoost = Math.min(2.4, 1 + Math.abs(vel) / 1400);
          gsap.to(tween, {
            timeScale: direction * speedBoost,
            duration: 0.3,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, {
                timeScale: direction,
                duration: 0.8,
                ease: "power2.out",
              });
            },
          });
        },
      });

      return () => {
        velocityTrigger.kill();
        tween.kill();
        tweenRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [reducedMotion, durationSeconds] }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: "power2.out" });
    }
  };

  if (reducedMotion) {
    return (
      <div className={cn("pa-container flex flex-wrap items-center gap-x-10 gap-y-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full overflow-hidden select-none", className)}
    >
      <div ref={trackRef} className="flex w-max items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

