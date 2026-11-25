"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RevealImage } from "@/components/motion/RevealImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CASE_STUDIES } from "@/content/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function CaseStudiesSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-case-card]");
        cards.forEach((card, idx) => {
          if (idx === cards.length - 1) return;

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: cards[idx + 1],
              start: "top 82%",
              end: "top 22%",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="surface-ivory border-b border-sand py-20 md:py-28"
    >
      <div className="pa-container">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-sand pb-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                Featured Work
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>

            <h2
              id="work-heading"
              className="font-serif text-[clamp(2.1rem,3.6vw,3.35rem)] leading-[1.06] font-light tracking-[-0.02em] text-pine"
            >
              The work should speak for itself.
            </h2>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 border-b border-sand pb-1 font-mono text-xs tracking-[0.08em] text-pine uppercase transition-colors hover:border-brass"
          >
            <span>View All Case Studies</span>
            <ArrowRight
              strokeWidth={1.25}
              className="size-3.5 text-brass transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Stacked sticky animated cards */}
        <div className="flex flex-col gap-10 lg:gap-14">
          {CASE_STUDIES.map((study, idx) => (
            <article
              key={study.slug}
              data-case-card
              style={{ zIndex: idx + 1 }}
              className="group rounded-[2px] border border-sand bg-ivory p-6 transition-colors duration-300 hover:border-pine/45 sm:p-8 lg:sticky lg:top-24 lg:p-10"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                  <Link href={`/work/${study.slug}`} className="block">
                    <RevealImage
                      src={study.image}
                      alt={study.imageAlt}
                      width={960}
                      height={720}
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      containerClassName="aspect-[16/10.5] w-full border border-sand"
                    />
                  </Link>
                </div>

                <div className="flex flex-col justify-between gap-6 lg:col-span-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand pb-4">
                    <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                      {study.index} / {study.industry}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                      {study.client}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl leading-[1.15] font-light tracking-[-0.02em] text-pine sm:text-3xl">
                    <Link
                      href={`/work/${study.slug}`}
                      className="transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-brass"
                    >
                      {study.title}
                    </Link>
                  </h3>

                  <div className="grid grid-cols-1 gap-4 border-y border-sand py-5 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.08em] text-muted-ink uppercase">
                        Business Challenge
                      </p>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-pine/85">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.08em] text-muted-ink uppercase">
                        Solution
                      </p>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-pine/85">
                        {study.approach}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.08em] text-muted-ink uppercase">
                        Illustrative Outcome
                      </p>
                      <p className="mt-1 font-serif text-2xl font-normal text-pine">
                        {study.resultHeadline}
                      </p>
                    </div>

                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center gap-2 border-b border-sand pb-1 font-mono text-xs tracking-[0.08em] text-pine uppercase transition-colors hover:border-brass hover:text-brass"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight
                        strokeWidth={1.25}
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
