"use client";

import * as React from "react";
import gsap from "gsap";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Cursor() {
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [label, setLabel] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isTouch || reducedMotion || !cursorRef.current) return;

    const el = cursorRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      if (!visible) setVisible(true);
      xTo(event.clientX);
      yTo(event.clientY);

      const target = event.target as HTMLElement | null;
      const cursorHost = target?.closest<HTMLElement>("[data-cursor]");
      const nextLabel = cursorHost?.dataset.cursor || null;
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isTouch, reducedMotion, visible]);

  if (isTouch || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={
          label
            ? "flex h-9 items-center justify-center rounded-[2px] border border-brass bg-pine px-3.5 font-mono text-[11px] tracking-[0.08em] text-ivory uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "size-2.5 rounded-full bg-brass transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        }
      >
        {label}
      </div>
    </div>
  );
}

