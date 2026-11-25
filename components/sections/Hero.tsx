"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="surface-ivory relative overflow-hidden">
      {/* Hidden SVG clipPath defining the sweeping architectural curve on desktop */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <clipPath id="hero-arch-curve" clipPathUnits="objectBoundingBox">
            <path d="M 0.14,0 L 1,0 L 1,1 L 0.01,1 C 0.07,0.72 0.02,0.34 0.14,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 items-start lg:h-[calc(100dvh-5rem)] lg:max-h-[740px] lg:min-h-[520px] lg:grid-cols-12">
          {/* Left area (~44%): Eyebrow, Fraunces headline, copy, CTAs, positioning strip */}
          <div className="relative z-10 flex flex-col items-start gap-3.5 px-5 pt-6 pb-5 sm:px-8 lg:col-span-5 lg:gap-3.5 lg:pt-7 lg:pr-4 lg:pb-5 lg:pl-14 xl:gap-4 xl:pt-9 xl:pl-[4.5rem]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="flex items-center gap-3.5"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-muted-ink uppercase">
                Technology Consulting for Growth
              </span>
              <span aria-hidden="true" className="h-px w-9 bg-brass" />
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.06 }}
              className="font-serif text-[clamp(2.45rem,4.15vw,4.65rem)] leading-[1.01] font-light tracking-[-0.025em] text-pine"
            >
              <span className="block">We build the systems</span>
              <span className="block text-brass italic">your growth runs on.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.14 }}
              className="max-w-[44ch] font-sans text-[15.5px] leading-[1.6] text-muted-ink xl:text-[17px]"
            >
              Pixel Arc partners with ambitious organisations to architect bespoke software, deploy
              grounded AI automation, and align brand and operations for measurable commercial
              scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.22 }}
              className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:items-center"
            >
              <Button asChild variant="primary" size="default" className="group h-11 px-6">
                <Link href="/contact">
                  <span>Start a Project</span>
                  <ArrowUpRight
                    strokeWidth={1.25}
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="default"
                className="h-11 border-sand bg-ivory px-6 text-pine hover:border-pine"
              >
                <Link href="/work">
                  <span>Explore Our Work</span>
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
              className="pt-1 font-mono text-[10px] tracking-[0.14em] text-muted-ink uppercase xl:text-[11px]"
            >
              Technology &nbsp;/&nbsp; Strategy &nbsp;/&nbsp; Operations &nbsp;/&nbsp; Growth
            </motion.p>
          </div>

          {/* Right area (~56%): Sweeping curved architectural photograph extending to right edge */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: EASE_OUT, delay: 0.1 }}
            className="relative lg:col-span-7 lg:h-full"
          >
            {/* Desktop clipped sweeping architectural curve */}
            <div
              className="relative hidden h-full w-full overflow-hidden lg:block"
              style={{ clipPath: "url(#hero-arch-curve)" }}
            >
              <Image
                src="/images/pixel-arc-building.png"
                alt="Pixel Arc travertine architectural consulting headquarters"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[24%_center] transition-transform duration-700"
              />
            </div>

            {/* Subtle curved Brass hairline accent along the architectural arc (desktop) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            >
              <path
                d="M 14,0 C 2,34 7,72 1,100"
                fill="none"
                stroke="#B8893B"
                strokeWidth="0.22"
                strokeOpacity="0.65"
              />
            </svg>

            {/* Mobile / tablet wide architectural frame */}
            <div className="relative mx-5 mb-8 aspect-[16/10] overflow-hidden rounded-[2px] border border-sand sm:mx-8 lg:hidden">
              <Image
                src="/images/pixel-arc-building.png"
                alt="Pixel Arc travertine architectural consulting headquarters"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[25%_center]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
