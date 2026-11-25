"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ScrollProgress() {
  const barRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar || reducedMotion) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress });
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [reducedMotion] }
  );

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" className="h-[1.5px] w-full bg-transparent">
      <div ref={barRef} className="h-full w-full origin-left bg-brass" />
    </div>
  );
}

