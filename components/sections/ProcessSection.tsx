"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const APPROACH_STAGES = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand your business, customers, operational bottlenecks, and commercial objectives.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Establish the right strategy, technical scope, architecture, and implementation roadmap.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "Design, engineer, integrate, and test production systems with disciplined weekly sprints.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Measure real performance, refine workflows, and support long-term operational growth.",
  },
] as const;

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="surface-pine border-b border-pine-border py-20 md:py-28"
    >
      <div className="pa-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10"
        >
          {/* Left editorial intro */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
                Our Approach
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>

            <h2
              id="process-heading"
              className="font-serif text-[clamp(2.1rem,3.4vw,3.15rem)] leading-[1.08] font-light tracking-[-0.02em] text-ivory"
            >
              Good outcomes begin with the right questions.
            </h2>

            <p className="font-sans text-base leading-relaxed text-sand/85">
              We don&apos;t begin by selling a solution. We begin by understanding what needs to
              change, why it matters, and how success will be measured.
            </p>
          </div>

          {/* Right horizontal timeline (desktop) / vertical timeline (mobile) */}
          <div className="lg:col-span-8">
            {/* Desktop horizontal timeline */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-6">
              {APPROACH_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={stage.number}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="group flex cursor-pointer flex-col text-left focus-visible:outline-2 focus-visible:outline-brass"
                  >
                    <span className="font-serif text-4xl font-light text-brass tabular-nums">
                      {stage.number}
                    </span>

                    {/* Connecting horizontal line + node */}
                    <div className="relative my-5 flex items-center">
                      <span
                        className={cn(
                          "size-2.5 shrink-0 rounded-full border transition-colors duration-200",
                          isActive
                            ? "border-brass bg-brass"
                            : "border-brass/70 bg-pine group-hover:bg-brass/50"
                        )}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px w-full transition-colors duration-200",
                          isActive ? "bg-brass" : "bg-pine-border"
                        )}
                      />
                    </div>

                    <h3
                      className={cn(
                        "font-serif text-2xl font-light transition-colors duration-200",
                        isActive ? "text-ivory" : "text-ivory/80 group-hover:text-ivory"
                      )}
                    >
                      {stage.title}
                    </h3>

                    <p className="mt-2.5 font-sans text-sm leading-relaxed text-sand/80">
                      {stage.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Mobile vertical timeline */}
            <div className="flex flex-col border-l border-pine-border pl-6 md:hidden">
              {APPROACH_STAGES.map((stage) => (
                <div key={stage.number} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[29px] size-2.5 rounded-full border border-brass bg-pine"
                  />
                  <span className="font-mono text-xs tracking-[0.08em] text-brass">
                    {stage.number}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-ivory">{stage.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-sand/85">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

