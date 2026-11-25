"use client";

import * as React from "react";
import gsap from "gsap";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MAGNETIC_CONFIG } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  radius = MAGNETIC_CONFIG.radius,
  strength = MAGNETIC_CONFIG.strength,
}: MagneticProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const node = wrapperRef.current;
    if (!node || isTouch || reducedMotion) return;

    const xTo = gsap.quickTo(node, "x", {
      duration: MAGNETIC_CONFIG.duration,
      ease: "expo.out",
    });
    const yTo = gsap.quickTo(node, "y", {
      duration: MAGNETIC_CONFIG.duration,
      ease: "expo.out",
    });

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      gsap.set(node, { clearProps: "x,y" });
    };
  }, [isTouch, reducedMotion, radius, strength]);

  return (
    <div ref={wrapperRef} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}

