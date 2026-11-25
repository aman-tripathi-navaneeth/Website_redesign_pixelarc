"use client";

import * as React from "react";
import { motion } from "motion/react";

interface MetricItem {
  value: string;
  label: string;
  note: string;
}

const METRICS: MetricItem[] = [
  {
    value: "120+",
    label: "Digital Products & Platforms",
    note: "Placeholder benchmark",
  },
  {
    value: "45+",
    label: "Enterprise & Growth Clients",
    note: "Placeholder benchmark",
  },
  {
    value: "07",
    label: "Core Industries Served",
    note: "Verified service verticals",
  },
  {
    value: "96%",
    label: "Client Retention & Satisfaction",
    note: "Placeholder benchmark",
  },
];

export function MetricsStrip() {
  return (
    <section aria-label="Key practice metrics" className="surface-pine border-y border-pine-border">
      <div className="pa-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 divide-x divide-y divide-pine-border lg:grid-cols-4 lg:divide-y-0"
        >
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col justify-between gap-2.5 px-5 py-8 sm:px-8 md:py-10 ${
                idx === 0 ? "lg:pl-0" : ""
              } ${idx === METRICS.length - 1 ? "lg:pr-0" : ""}`}
            >
              <p className="font-serif text-4xl leading-none font-light text-brass tabular-nums md:text-5xl">
                {metric.value}
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-sans text-sm font-medium text-ivory md:text-[15px]">
                  {metric.label}
                </p>
                <p className="font-mono text-[10px] tracking-[0.08em] text-sand/70 uppercase">
                  {metric.note}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
