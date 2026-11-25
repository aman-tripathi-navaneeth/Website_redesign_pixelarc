"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { RevealImage } from "@/components/motion/RevealImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CASE_STUDIES } from "@/content/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function CaseStudies() {
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
            opacity: 0.62,
            ease: "none",
            scrollTrigger: {
              trigger: cards[idx + 1],
              start: "top 80%",
              end: "top 20%",
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
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="surface-ivory border-b border-sand py-24 md:py-32"
    >
      <div className="pa-container">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 border-b border-sand pb-10 md:flex-row md:items-end">
          <SectionHeading
            index="05"
            eyebrow="Featured Work"
            tone="ivory"
            title={
              <span id="work-heading">
                The work should <em className="text-brass italic">speak for itself.</em>
              </span>
            }
            description="Selected client transformations across regulated, industrial, and high-consideration commercial markets."
          />

          <Button asChild variant="outline" size="default">
            <Link href="/work">
              <span>View All Case Studies</span>
              <ArrowUpRight strokeWidth={1.25} className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Stacked sticky case cards */}
        <div className="flex flex-col gap-10 lg:gap-16">
          {CASE_STUDIES.map((study, idx) => (
            <article
              key={study.slug}
              data-case-card
              style={{ zIndex: idx + 1 }}
              className="rounded-[2px] border border-sand bg-ivory p-6 sm:p-8 lg:sticky lg:top-24 lg:p-10"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                  <Link href={`/work/${study.slug}`} data-cursor="View" className="block">
                    <RevealImage
                      src={study.image}
                      alt={study.imageAlt}
                      width={960}
                      height={720}
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      containerClassName="aspect-[16/11] w-full border border-sand"
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
                      <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                        Challenge
                      </p>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-pine/85">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                        Approach
                      </p>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-pine/85">
                        {study.approach}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                        Measured Outcome
                      </p>
                      <p className="mt-1 font-serif text-2xl font-normal text-pine">
                        {study.resultHeadline}
                      </p>
                    </div>

                    <Button
                      asChild
                      variant="link"
                      className="font-mono text-xs tracking-[0.08em] uppercase"
                    >
                      <Link href={`/work/${study.slug}`}>
                        <span>Read Case Study</span>
                        <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
                      </Link>
                    </Button>
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
