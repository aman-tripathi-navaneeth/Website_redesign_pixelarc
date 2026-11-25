import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/content/projects";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.client} — ${study.industry}`,
    description: study.title,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const currentIdx = CASE_STUDIES.findIndex((c) => c.slug === study.slug);
  const nextStudy = CASE_STUDIES[(currentIdx + 1) % CASE_STUDIES.length];

  return (
    <>
      <section className="surface-ivory border-b border-sand py-16 md:py-24">
        <div className="pa-container">
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-muted-ink uppercase transition-colors hover:text-pine"
          >
            <ArrowLeft strokeWidth={1.25} className="size-3.5" />
            <span>Back to Case Archive</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand pb-6">
            <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
              {study.index} / {study.industry}
            </span>
            <span className="font-mono text-xs tracking-[0.08em] text-pine uppercase">
              {study.client}
            </span>
          </div>

          <RevealText
            as="h1"
            trigger="load"
            className="mt-8 max-w-5xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] font-light tracking-[-0.025em] text-pine"
          >
            {study.title}
          </RevealText>

          <div className="mt-10 grid grid-cols-1 divide-y divide-sand border-y border-sand sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {study.metrics.map((metric, idx) => (
              <div key={metric.label} className={`py-6 sm:px-8 ${idx === 0 ? "sm:pl-0" : ""}`}>
                <p className="font-serif text-4xl font-light text-pine md:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-2 font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-sand p-2.5">
            <RevealImage
              src={study.image}
              alt={study.imageAlt}
              width={960}
              height={720}
              priority
              trigger="load"
              sizes="100vw"
              containerClassName="aspect-[16/8.5] w-full"
            />
          </div>

          {/* Narrative breakdown */}
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <div>
                <p className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                  Disciplines Applied
                </p>
                <ul className="mt-3 flex flex-col gap-1.5 font-sans text-sm text-pine">
                  {study.servicesUsed.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">Year</p>
                <p className="mt-1 font-sans text-sm text-pine">{study.year}</p>
              </div>
            </div>

            <div className="flex flex-col gap-10 lg:col-span-8">
              <div>
                <h2 className="font-serif text-3xl font-light text-pine">
                  01. Operational Context
                </h2>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted-ink md:text-lg">
                  {study.narrative.context}
                </p>
              </div>

              <div className="border-t border-sand pt-8">
                <h2 className="font-serif text-3xl font-light text-pine">
                  02. System Architecture
                </h2>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted-ink md:text-lg">
                  {study.narrative.architecture}
                </p>
              </div>

              <div className="border-t border-sand pt-8">
                <h2 className="font-serif text-3xl font-light text-pine">03. Commercial Impact</h2>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted-ink md:text-lg">
                  {study.narrative.impact}
                </p>
              </div>
            </div>
          </div>

          {/* Next case study */}
          {nextStudy && (
            <div className="mt-20 border-t border-sand pt-10">
              <p className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                Next Case Study
              </p>
              <Link
                href={`/work/${nextStudy.slug}`}
                className="group mt-3 flex items-center justify-between gap-6"
              >
                <span className="font-serif text-2xl font-light text-pine transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
                  {nextStudy.title}
                </span>
                <ArrowUpRight strokeWidth={1.25} className="size-6 shrink-0 text-brass" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
