"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PROCESS_STEPS } from "@/content/process";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Process() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const progressLineRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: "[data-process-pin]",
          start: "top top",
          end: `+=${PROCESS_STEPS.length * 650}`,
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            const idx = Math.min(
              PROCESS_STEPS.length - 1,
              Math.floor(self.progress * PROCESS_STEPS.length)
            );
            setActiveIndex(idx);

            if (progressLineRef.current) {
              gsap.set(progressLineRef.current, {
                scaleX: self.progress,
                transformOrigin: "left center",
              });
            }
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const currentStep = PROCESS_STEPS[activeIndex] ?? PROCESS_STEPS[0];

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="surface-pine border-b border-pine-border"
    >
      {/* Desktop pinned choreography */}
      <div data-process-pin className="hidden min-h-screen flex-col justify-between py-24 lg:flex">
        <div className="pa-container flex flex-col gap-12">
          <div className="flex items-end justify-between gap-8 border-b border-pine-border pb-10">
            <SectionHeading
              index="04"
              eyebrow="Our Approach"
              tone="pine"
              title={
                <span id="process-heading">
                  Good outcomes begin with the{" "}
                  <em className="text-brass italic">right questions.</em>
                </span>
              }
            />

            {/* Side rail step indicator */}
            <div className="flex items-center gap-3">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className={cn(
                    "flex items-center gap-2 border px-3 py-1.5 font-mono text-xs tracking-[0.08em] transition-colors duration-300",
                    idx === activeIndex
                      ? "border-brass bg-brass text-pine"
                      : "border-pine-border text-sand/70"
                  )}
                >
                  <span>{step.number}</span>
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brass scroll progress line */}
          <div className="relative h-px w-full bg-pine-border">
            <div ref={progressLineRef} className="h-full w-full origin-left scale-x-0 bg-brass" />
          </div>

          {/* Cross-fading active step */}
          <div className="grid grid-cols-12 items-start gap-12 pt-6">
            <div className="col-span-4 flex flex-col gap-4">
              <span className="font-serif text-[8rem] leading-none font-light text-brass tabular-nums">
                {currentStep.number}
              </span>
              <span className="font-mono text-xs tracking-[0.08em] text-sand/75 uppercase">
                Deliverable — {currentStep.deliverable}
              </span>
            </div>

            <div className="col-span-8 flex flex-col gap-6 pt-4">
              <div className="flex items-center gap-4">
                <h3 className="font-serif text-5xl font-light text-ivory">{currentStep.title}</h3>
                <span className="h-px w-10 bg-brass" aria-hidden="true" />
                <span className="font-mono text-xs tracking-[0.08em] text-sand uppercase">
                  {currentStep.subtitle}
                </span>
              </div>

              <p className="max-w-2xl font-sans text-xl leading-relaxed text-sand/90">
                {currentStep.description}
              </p>

              {/* Overview rail of all 4 steps */}
              <div className="mt-8 grid grid-cols-4 gap-6 border-t border-pine-border pt-8">
                {PROCESS_STEPS.map((step, idx) => (
                  <div
                    key={step.number}
                    className={cn(
                      "transition-opacity duration-300",
                      idx === activeIndex ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <p className="font-mono text-xs tracking-[0.08em] text-brass">{step.number}</p>
                    <p className="mt-1.5 font-serif text-xl text-ivory">{step.title}</p>
                    <p className="mt-1 font-sans text-xs text-sand/80">{step.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet clean stacked layout */}
      <div className="pa-container py-20 lg:hidden">
        <SectionHeading
          index="04"
          eyebrow="Our Approach"
          tone="pine"
          title="Good outcomes begin with the right questions."
        />

        <div className="mt-12 divide-y divide-pine-border border-y border-pine-border">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-4 py-8">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-4xl font-light text-brass">{step.number}</span>
                <span className="font-mono text-[11px] tracking-[0.08em] text-sand/80 uppercase">
                  {step.subtitle}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-light text-ivory">{step.title}</h3>
              <p className="font-sans text-base leading-relaxed text-sand/90">{step.description}</p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-brass uppercase">
                Deliverable — {step.deliverable}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
