"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { INDUSTRIES } from "@/content/industries";

const PRIMARY_INDUSTRY_CARDS = [
  {
    ...INDUSTRIES[0],
    image: "/images/industries/healthcare.jpg",
    alt: "Modern limestone healthcare facility facade",
  },
  {
    ...INDUSTRIES[1],
    image: "/images/industries/education.jpg",
    alt: "Institutional stone columns campus architecture",
  },
  {
    ...INDUSTRIES[2],
    image: "/images/industries/manufacturing.jpg",
    alt: "Modern architectural industrial manufacturing facility",
  },
  {
    ...INDUSTRIES[3],
    image: "/images/industries/retail.jpg",
    alt: "Warm glass and travertine retail flagship interior",
  },
];

const SECONDARY_INDUSTRY_CARDS = INDUSTRIES.slice(4);
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="surface-ivory border-b border-sand py-20 md:py-28"
    >
      <div className="pa-container">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left editorial intro */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="flex flex-col items-start gap-5 lg:col-span-4"
          >
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                Industries
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>

            <h2
              id="industries-heading"
              className="font-serif text-[clamp(2rem,3.3vw,3rem)] leading-[1.08] font-light tracking-[-0.02em] text-pine"
            >
              Different industries. Different challenges. A shared ambition to grow.
            </h2>

            <p className="font-sans text-base leading-relaxed text-muted-ink">
              We understand that technology must work differently depending on the business, its
              customers, and the regulatory environment it operates inside.
            </p>

            <Link
              href="/work"
              className="group inline-flex items-center gap-2 border-b border-sand pb-1 font-mono text-xs tracking-[0.08em] text-pine uppercase transition-colors hover:border-brass"
            >
              <span>View All Industries</span>
              <ArrowRight
                strokeWidth={1.25}
                className="size-3.5 text-brass transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Right: Staggered animated architectural cards */}
          <div className="flex flex-col gap-5 lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {PRIMARY_INDUSTRY_CARDS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.65,
                    ease: EASE_OUT,
                    delay: idx * 0.08,
                  }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href="/work"
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2px] border border-sand bg-ivory p-3 transition-colors duration-300 hover:border-pine/55"
                  >
                    {/* Animated Brass top hairline on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />

                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-sand bg-sand/25">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 18vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        />
                      </div>

                      <div className="mt-3.5 flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-normal text-pine transition-colors duration-200 group-hover:text-brass">
                          {item.name}
                        </h3>
                        <span className="font-mono text-[10px] tracking-[0.08em] text-muted-ink">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-ink">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-sand/70 pt-2.5">
                      <span className="font-mono text-[10px] tracking-[0.08em] text-muted-ink uppercase transition-colors group-hover:text-pine">
                        Explore
                      </span>
                      <ArrowRight
                        strokeWidth={1.25}
                        className="size-3.5 text-brass transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom 3 animated industry cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SECONDARY_INDUSTRY_CARDS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT,
                    delay: 0.2 + idx * 0.08,
                  }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    href="/work"
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2px] border border-sand bg-ivory px-4 py-4 transition-colors duration-300 hover:border-pine/55"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-lg font-normal text-pine transition-colors duration-200 group-hover:text-brass">
                          {item.name}
                        </h3>
                        <ArrowRight
                          strokeWidth={1.25}
                          className="size-3.5 shrink-0 text-brass transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-ink">
                        {item.summary}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
