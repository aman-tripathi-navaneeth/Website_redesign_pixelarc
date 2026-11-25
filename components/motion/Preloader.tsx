"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";
import { SITE_CONFIG } from "@/content/site";

const SESSION_KEY = "pa_preloader_seen";

export function Preloader() {
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const reducedMotion = useReducedMotion();
  const { stop, start } = useLenis();

  const dismiss = React.useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Ignore storage access restrictions
    }
    setVisible(false);
    start();
  }, [start]);

  React.useEffect(() => {
    if (reducedMotion) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) return;

    setVisible(true);
    stop();

    const durationMs = MOTION_DURATION.preloader * 1000;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // Smooth ease-out curve for the 0 -> 100 counter
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          dismiss();
        }, 160);
      }
    };

    rafId = requestAnimationFrame(tick);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      start();
    };
  }, [reducedMotion, stop, start, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Loading Pixel Arc"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.9,
              ease: MOTION_EASE.inOutQuart,
            },
          }}
          className="surface-pine fixed inset-0 z-[100] flex flex-col justify-between px-6 py-8 md:px-14 md:py-12"
        >
          {/* Top hairline bar */}
          <div className="flex items-center justify-between border-b border-pine-border pb-4">
            <span className="font-mono text-xs tracking-[0.08em] text-sand uppercase">
              {SITE_CONFIG.descriptor}
            </span>
            <button
              type="button"
              onClick={dismiss}
              className="cursor-pointer font-mono text-xs tracking-[0.08em] text-brass uppercase transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-brass"
            >
              Skip intro
            </button>
          </div>

          {/* Center wordmark + emblem */}
          <div className="my-auto flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: MOTION_EASE.outExpo }}
              className="inline-flex items-center gap-4 rounded-[2px] border border-pine-border bg-ivory px-3.5 py-2"
            >
              <Image
                src="/images/company-logo.png"
                alt={`${SITE_CONFIG.name} emblem`}
                width={104}
                height={28}
                className="h-5 w-auto object-contain"
                priority
              />
            </motion.div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95, ease: MOTION_EASE.outExpo, delay: 0.12 }}
                className="font-serif text-5xl font-light tracking-[-0.025em] text-ivory sm:text-7xl md:text-8xl"
              >
                {SITE_CONFIG.name}
              </motion.p>
            </div>
          </div>

          {/* Bottom Brass counter and hairline progress */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="font-mono text-xs tracking-[0.08em] text-sand/80 uppercase">
                Establishing foundation
              </span>
              <span className="font-serif text-5xl leading-none font-light text-brass tabular-nums md:text-6xl">
                {String(progress).padStart(3, "0")}
              </span>
            </div>

            <div className="h-px w-full bg-pine-border">
              <div
                className="h-full bg-brass transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

