"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SERVICES, type ServicePillar } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServicesIndex() {
  const [hovered, setHovered] = React.useState<ServicePillar | null>(null);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const xToRef = React.useRef<gsap.QuickToFunc | null>(null);
  const yToRef = React.useRef<gsap.QuickToFunc | null>(null);
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const el = previewRef.current;
    if (!el || isTouch || reducedMotion) return;

    xToRef.current = gsap.quickTo(el, "x", { duration: 0.48, ease: "expo.out" });
    yToRef.current = gsap.quickTo(el, "y", { duration: 0.48, ease: "expo.out" });
  }, [isTouch, reducedMotion]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion) return;
    xToRef.current?.(event.clientX + 28);
    yToRef.current?.(event.clientY - 120);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="surface-pine relative border-b border-pine-border py-24 md:py-32"
    >
      <div className="pa-container grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left editorial sticky summary */}
        <div className="flex flex-col items-start justify-between gap-8 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading
            index="02"
            eyebrow="Our Expertise"
            tone="pine"
            title={
              <span id="services-heading">
                Five disciplines. One business <em className="text-brass italic">objective.</em>
              </span>
            }
            description="From your foundational software platform to revenue operations and brand authority, every engagement is engineered around commercial impact."
          />

          <Button asChild variant="brass" size="default">
            <Link href="/work">
              <span>Explore Case Studies</span>
              <ArrowUpRight strokeWidth={1.25} className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Right desktop interactive index */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="hidden flex-col border-t border-pine-border md:flex lg:col-span-8"
        >
          {SERVICES.map((service) => {
            const isDimmed = hovered !== null && hovered.slug !== service.slug;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-cursor="View"
                onMouseEnter={() => setHovered(service)}
                onFocus={() => setHovered(service)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "group relative grid grid-cols-12 items-center gap-6 border-b border-pine-border py-8 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-brass",
                  isDimmed ? "opacity-40" : "opacity-100"
                )}
              >
                <span className="col-span-1 font-mono text-xs tracking-[0.08em] text-brass">
                  {service.index}
                </span>

                <h3 className="col-span-5 font-serif text-2xl font-light tracking-[-0.02em] text-ivory transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 lg:text-[28px]">
                  {service.title}
                </h3>

                <p className="col-span-5 font-sans text-sm leading-relaxed text-sand/85">
                  {service.shortDescription}
                </p>

                <span className="col-span-1 flex justify-end text-brass">
                  <span className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-[2px] border border-pine-border transition-colors duration-300 group-hover:border-brass">
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile shadcn Accordion fallback */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="border-t border-pine-border">
            {SERVICES.map((service) => (
              <AccordionItem key={service.slug} value={service.slug} className="border-pine-border">
                <AccordionTrigger className="py-5 text-xl text-ivory">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs tracking-[0.08em] text-brass">
                      {service.index}
                    </span>
                    <span>{service.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sand/90">
                  <p className="mb-4 text-sm leading-relaxed">{service.shortDescription}</p>
                  <ul className="mb-5 space-y-1.5 border-l border-brass/50 pl-3 font-mono text-[11px] tracking-[0.05em] text-sand/80 uppercase">
                    {service.deliverables.slice(0, 3).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-brass uppercase"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Cursor-following art-directed preview image (desktop only) */}
      {!isTouch && !reducedMotion && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed top-0 left-0 z-40 hidden h-64 w-80 overflow-hidden rounded-[2px] border border-brass/60 bg-pine transition-[opacity,clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:block",
            hovered
              ? "opacity-100 [clip-path:inset(0%_0%_0%_0%)]"
              : "opacity-0 [clip-path:inset(100%_0%_0%_0%)]"
          )}
        >
          {hovered && (
            <div className="relative h-full w-full">
              <Image
                src={hovered.image}
                alt={hovered.imageAlt}
                fill
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute right-0 bottom-0 left-0 border-t border-pine-border bg-pine/95 px-3 py-2">
                <p className="font-mono text-[10px] tracking-[0.08em] text-brass uppercase">
                  {hovered.index} / {hovered.title}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
