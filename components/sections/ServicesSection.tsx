"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeSlug, setActiveSlug] = React.useState(SERVICES[0].slug);
  const activeService = SERVICES.find((s) => s.slug === activeSlug) ?? SERVICES[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="surface-pine border-b border-pine-border py-20 md:py-28"
    >
      <div className="pa-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10"
        >
          {/* Left intro column */}
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
                Our Expertise
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>

            <h2
              id="services-heading"
              className="font-serif text-[clamp(2.15rem,3.6vw,3.35rem)] leading-[1.06] font-light tracking-[-0.02em] text-ivory"
            >
              Five disciplines. One business{" "}
              <em className="font-light text-brass italic">objective.</em>
            </h2>

            <p className="max-w-sm font-sans text-base leading-relaxed text-sand/85">
              From your first digital product to the enterprise systems supporting your next stage
              of scale, we bring the right discipline together.
            </p>

            <Button
              asChild
              variant="outline"
              size="default"
              className="mt-2 border-brass/70 text-ivory hover:border-brass hover:bg-brass hover:text-pine"
            >
              <Link href="/services/software-development">
                <span>Explore All Services</span>
                <ArrowUpRight strokeWidth={1.25} className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Center numbered editorial list (desktop) */}
          <div className="hidden flex-col border-t border-pine-border md:flex lg:col-span-5">
            {SERVICES.map((service) => {
              const isActive = service.slug === activeSlug;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  onFocus={() => setActiveSlug(service.slug)}
                  className={cn(
                    "group grid grid-cols-12 items-center gap-3 border-b border-pine-border py-5 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-brass",
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <span className="col-span-2 font-mono text-xs tracking-[0.08em] text-brass">
                    {service.index}
                  </span>

                  <div className="col-span-9 flex flex-col gap-1">
                    <h3 className="font-serif text-2xl font-light text-ivory transition-transform duration-200 group-hover:translate-x-1">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-sand/80">
                      {service.shortDescription}
                    </p>
                  </div>

                  <span className="col-span-1 flex justify-end text-brass">
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right architectural supporting visual (desktop) */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] border border-pine-border bg-pine">
              <Image
                key={activeService.slug}
                src={activeService.image}
                alt={activeService.imageAlt}
                fill
                sizes="(max-width: 1024px) 0vw, 24vw"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-sand/80 uppercase">
              {activeService.index} — {activeService.title}
            </p>
          </div>

          {/* Mobile shadcn Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="border-t border-pine-border">
              {SERVICES.map((service) => (
                <AccordionItem
                  key={service.slug}
                  value={service.slug}
                  className="border-pine-border"
                >
                  <AccordionTrigger className="py-5 text-xl text-ivory">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-brass">{service.index}</span>
                      <span>{service.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sand/85">
                    <p className="mb-4 text-sm leading-relaxed">{service.shortDescription}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-brass uppercase"
                    >
                      <span>View Discipline</span>
                      <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

