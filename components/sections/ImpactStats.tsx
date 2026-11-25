import { Counter } from "@/components/motion/Counter";
import { IMPACT_STATS } from "@/content/stats";

export function ImpactStats() {
  return (
    <section
      aria-label="Key impact metrics"
      className="surface-ivory border-b border-sand py-20 md:py-24"
    >
      <div className="pa-container">
        <div className="mb-10 flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
            06 / Commercial Proof
          </span>
          <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
            Placeholder Benchmarks
          </span>
        </div>

        <div className="grid grid-cols-1 divide-y divide-sand border-y border-sand sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {IMPACT_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between gap-6 py-8 sm:px-8 lg:py-10 ${
                idx === 0 ? "sm:pl-0" : ""
              } ${idx === IMPACT_STATS.length - 1 ? "lg:pr-0" : ""}`}
            >
              <p className="font-serif text-5xl leading-none font-light tracking-[-0.03em] text-pine tabular-nums md:text-6xl">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>

              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-xs tracking-[0.08em] text-pine uppercase">
                  {stat.label}
                </p>
                <p className="font-sans text-sm leading-relaxed text-muted-ink">{stat.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

