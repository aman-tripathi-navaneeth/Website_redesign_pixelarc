"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevealImage } from "@/components/motion/RevealImage";
import { CASE_STUDIES } from "@/content/projects";

const CATEGORIES = [
  "All",
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Retail & Commerce",
] as const;

export function WorkArchive() {
  const [selected, setSelected] = React.useState<string>("All");

  return (
    <Tabs value={selected} onValueChange={setSelected} className="w-full">
      <TabsList className="mb-12 w-full justify-start overflow-x-auto">
        {CATEGORIES.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {CATEGORIES.map((category) => {
        const filtered =
          category === "All"
            ? CASE_STUDIES
            : CASE_STUDIES.filter((study) => study.industry === category);

        return (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {filtered.map((study) => (
                <article
                  key={study.slug}
                  className="group flex flex-col justify-between border border-sand bg-ivory p-6 transition-colors duration-300 hover:border-pine/40"
                >
                  <div>
                    <Link href={`/work/${study.slug}`} data-cursor="View" className="block">
                      <RevealImage
                        src={study.image}
                        alt={study.imageAlt}
                        width={960}
                        height={720}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        containerClassName="aspect-[16/10] w-full border border-sand"
                      />
                    </Link>

                    <div className="mt-6 flex items-center justify-between border-b border-sand pb-3">
                      <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                        {study.index} / {study.industry}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                        {study.year}
                      </span>
                    </div>

                    <h2 className="mt-5 font-serif text-2xl leading-snug font-light text-pine sm:text-3xl">
                      <Link href={`/work/${study.slug}`} className="hover:text-brass">
                        {study.title}
                      </Link>
                    </h2>

                    <p className="mt-3 font-sans text-sm leading-relaxed text-muted-ink">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-sand pt-4">
                    <span className="font-serif text-xl text-pine">{study.resultHeadline}</span>
                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] text-pine uppercase transition-colors hover:text-brass"
                    >
                      <span>View Case</span>
                      <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
