"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const total = TESTIMONIALS.length;
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="surface-ivory border-b border-sand py-24 md:py-32"
    >
      <div className="pa-container">
        <div className="mb-10 flex items-center justify-between border-b border-sand pb-6">
          <div className="flex items-center gap-3.5">
            <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
              07 / Client Perspectives
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brass" />
          </div>

          <span className="font-mono text-xs tracking-[0.08em] text-pine uppercase tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <h2 id="testimonials-heading" className="sr-only">
          Client Testimonials
        </h2>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
          <div data-cursor="Drag" className="cursor-grab active:cursor-grabbing">
            <CarouselContent>
              {TESTIMONIALS.map((item) => (
                <CarouselItem key={item.index}>
                  <blockquote className="grid grid-cols-1 gap-8 py-4 lg:grid-cols-12">
                    <div className="lg:col-span-2">
                      <span
                        aria-hidden="true"
                        className="font-serif text-7xl leading-none font-light text-brass select-none"
                      >
                        “
                      </span>
                    </div>

                    <div className="flex flex-col gap-10 lg:col-span-10">
                      <p className="font-serif text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.2] font-light tracking-[-0.02em] text-pine">
                        “{item.quote}”
                      </p>

                      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-6">
                        <div>
                          <p className="font-sans text-base font-medium text-pine">{item.author}</p>
                          <p className="font-sans text-sm text-muted-ink">
                            {item.role}, {item.company}
                          </p>
                        </div>
                        <span className="rounded-[2px] border border-sand px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                          {item.industry}
                        </span>
                      </footer>
                    </div>
                  </blockquote>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          {/* Controls and Brass progress bar */}
          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="relative h-px flex-1 bg-sand">
              <div
                className="h-[1.5px] bg-brass transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center gap-2.5">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
