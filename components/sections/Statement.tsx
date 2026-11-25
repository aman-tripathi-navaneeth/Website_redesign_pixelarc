"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Compass, Layers3, TrendingUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATEMENT_TEXT =
  "Technology is only valuable when it moves your business forward. A website should attract qualified buyers, software should simplify daily execution, and automation should return focused hours to your best operators.";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Think commercially",
    body: "Start with unit economics and commercial bottlenecks, never transient technology trends.",
  },
  {
    icon: Layers3,
    title: "Build deliberately",
    body: "Architect durable systems your internal teams can own, extend, and rely on for years.",
  },
  {
    icon: TrendingUp,
    title: "Measure outcomes",
    body: "Tie every sprint directly to pipeline velocity, margin preservation, or customer retention.",
  },
];

export function Statement() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const words = React.useMemo(() => STATEMENT_TEXT.split(" "), []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const wordEls = gsap.utils.toArray<HTMLElement>("[data-scrub-word]");
      if (!wordEls.length) return;

      gsap.fromTo(
        wordEls,
        { color: "#6f6a5e" },
        {
          color: "#0f2a24",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-statement-wrap]",
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.4,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="statement-heading"
      className="surface-ivory border-b border-sand py-24 md:py-36"
    >
      <div className="pa-container flex flex-col gap-16 md:gap-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
              03 / Point of View
            </span>
          </div>

          <div data-statement-wrap className="lg:col-span-9">
            <h2 id="statement-heading" className="sr-only">
              Our Operating Philosophy
            </h2>
            <p className="font-serif text-[clamp(1.85rem,3.6vw,3.35rem)] leading-[1.18] font-light tracking-[-0.02em] text-pine">
              {words.map((word, idx) => (
                <React.Fragment key={`${word}-${idx}`}>
                  <span data-scrub-word className={reducedMotion ? "text-pine" : "text-muted-ink"}>
                    {word}
                  </span>{" "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* 3 commercial principles */}
        <div className="grid grid-cols-1 gap-10 border-t border-sand pt-12 md:grid-cols-3 md:gap-8">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col gap-3.5 md:pr-6">
                <Icon strokeWidth={1.25} className="size-5 text-brass" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-light text-pine">{item.title}</h3>
                <p className="font-sans text-base leading-relaxed text-muted-ink">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
