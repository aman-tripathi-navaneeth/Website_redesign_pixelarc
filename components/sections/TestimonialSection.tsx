"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { TESTIMONIALS } from "@/content/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const items = TESTIMONIALS.slice(0, 3);
  const current = items[activeIndex] ?? items[0];

  return (
    <section
      aria-labelledby="testimonial-heading"
      className="surface-ivory border-b border-sand py-20 md:py-28"
    >
      <div className="pa-container">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-sand pb-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                Client Perspectives
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>
            <h2
              id="testimonial-heading"
              className="font-serif text-3xl font-light tracking-[-0.02em] text-pine md:text-4xl"
            >
              Trusted partnerships are built through results.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {items.map((item, idx) => (
              <button
                key={item.index}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show testimonial ${item.index}`}
                className={cn(
                  "cursor-pointer border px-3 py-1.5 font-mono text-xs tracking-[0.08em] transition-colors duration-200",
                  idx === activeIndex
                    ? "border-pine bg-pine text-ivory"
                    : "border-sand bg-ivory text-muted-ink hover:border-pine/50 hover:text-pine"
                )}
              >
                {item.index}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12"
          >
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="font-serif text-7xl leading-none font-light text-brass select-none"
              >
                “
              </span>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-10">
              <p className="font-serif text-[clamp(1.5rem,2.7vw,2.4rem)] leading-[1.24] font-light tracking-[-0.02em] text-pine">
                “{current.quote}”
              </p>

              <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-5">
                <div>
                  <p className="font-sans text-base font-medium text-pine">{current.author}</p>
                  <p className="font-sans text-sm text-muted-ink">
                    {current.role}, {current.company}
                  </p>
                </div>
                <span className="border border-sand px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                  {current.industry}
                </span>
              </footer>
            </div>
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </section>
  );
}
