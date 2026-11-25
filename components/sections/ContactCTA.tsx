"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="surface-pine overflow-hidden border-b border-pine-border py-20 md:py-24"
    >
      <div className="pa-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
                Next Step
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>

            <h2
              id="cta-heading"
              className="font-serif text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.06] font-light tracking-[-0.02em] text-ivory"
            >
              Your next stage of growth deserves a better foundation.
            </h2>

            <p className="max-w-xl font-sans text-base leading-relaxed text-sand/85 md:text-lg">
              Tell us where your business is headed. We&apos;ll help you identify the technology,
              strategy, and expertise needed to get there.
            </p>

            <div className="pt-2">
              <Button asChild variant="brass" size="lg" className="group h-12 px-7">
                <Link href="/contact">
                  <span>Start a Project</span>
                  <ArrowUpRight
                    strokeWidth={1.25}
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-pine-border">
              <Image
                src="/images/placeholders/arch-transformation.jpg"
                alt="Pixel Arc architectural consulting interior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

