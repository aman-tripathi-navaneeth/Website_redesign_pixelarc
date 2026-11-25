import { Marquee } from "@/components/motion/Marquee";
import { INDUSTRIES } from "@/content/industries";

export function IndustriesMarquee() {
  return (
    <section
      id="industries"
      aria-label="Industries we serve"
      className="surface-ivory border-b border-sand py-8 md:py-10"
    >
      <div className="pa-container mb-5 flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
          01 / Sectors We Modernise
        </span>
        <span className="hidden font-mono text-xs tracking-[0.08em] text-muted-ink uppercase sm:inline">
          7 Core B2B Verticals
        </span>
      </div>

      <Marquee durationSeconds={38} className="border-y border-sand/80 py-5">
        {INDUSTRIES.map((industry) => (
          <div key={industry.id} className="flex items-center">
            <span className="px-6 font-serif text-2xl font-light tracking-[-0.02em] text-pine transition-colors duration-300 hover:text-brass md:px-10 md:text-4xl">
              {industry.name}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brass" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}

