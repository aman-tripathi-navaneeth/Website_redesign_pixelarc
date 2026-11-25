"use client";

import * as React from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionConfig } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LENIS_CONFIG } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
}

export const SmoothScrollContext = React.createContext<SmoothScrollContextValue>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);
  const lenisRef = React.useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      lerp: LENIS_CONFIG.lerp,
      smoothWheel: LENIS_CONFIG.smoothWheel,
      wheelMultiplier: LENIS_CONFIG.wheelMultiplier,
      touchMultiplier: LENIS_CONFIG.touchMultiplier,
    });

    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        ScrollTrigger.refresh();
      }
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", handleLoad);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  const stop = React.useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = React.useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const scrollTo = React.useCallback((target: string | number | HTMLElement, offset = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "auto" });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: "auto" });
      }
    } else {
      target.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({ lenis, stop, start, scrollTo }),
    [lenis, stop, start, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={120}>{children}</TooltipProvider>
      </MotionConfig>
    </SmoothScrollContext.Provider>
  );
}
