"use client";

import * as React from "react";
import { BarChart2, Compass, Layers } from "lucide-react";
import { motion } from "motion/react";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Think commercially.",
    description: "Start with business objectives, not technology trends.",
  },
  {
    icon: Layers,
    title: "Build deliberately.",
    description: "Choose solutions that solve the actual problem.",
  },
  {
    icon: BarChart2,
    title: "Measure outcomes.",
    description: "Connect delivery to meaningful business results.",
  },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="surface-ivory border-b border-sand py-20 md:py-28"
    >
      <div className="pa-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left: Eyebrow + large Fraunces headline */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                Our Belief
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brass" />
            </div>

            <h2
              id="philosophy-heading"
              className="font-serif text-[clamp(2.15rem,3.6vw,3.35rem)] leading-[1.08] font-light tracking-[-0.02em] text-pine"
            >
              Technology is only valuable when it moves your business forward.
            </h2>
          </div>

          {/* Right: Supporting copy + 3 horizontal principles */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-7">
            <p className="max-w-2xl font-sans text-lg leading-[1.68] text-muted-ink">
              A website should create customers. Software should make work easier. Automation should
              give people their time back. Every technology investment should have a clear purpose
              and a measurable contribution to the business.
            </p>

            <div className="grid grid-cols-1 divide-y divide-sand border-t border-sand pt-8 md:grid-cols-3 md:divide-x md:divide-y-0">
              {PRINCIPLES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`flex flex-col gap-2.5 py-5 md:py-0 ${
                      idx === 0 ? "md:pr-6" : idx === 1 ? "md:px-6" : "md:pl-6"
                    }`}
                  >
                    <Icon strokeWidth={1.25} className="size-4.5 text-brass" aria-hidden="true" />
                    <h3 className="font-serif text-xl font-normal text-pine">{item.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-muted-ink">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
