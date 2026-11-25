import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SERVICES, getServiceBySlug } from "@/content/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="surface-ivory border-b border-sand py-16 md:py-24">
        <div className="pa-container">
          <Link
            href="/#services"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-muted-ink uppercase transition-colors hover:text-pine"
          >
            <ArrowLeft strokeWidth={1.25} className="size-3.5" />
            <span>All Services</span>
          </Link>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs tracking-[0.08em] text-brass">
                  {service.index}
                </span>
                <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
                  Practice Area
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-brass" />
              </div>

              <RevealText
                as="h1"
                trigger="load"
                className="font-serif text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] font-light tracking-[-0.025em] text-pine"
              >
                {service.title}
              </RevealText>

              <p className="font-serif text-2xl leading-snug font-light text-pine/90">
                {service.headline}
              </p>

              <p className="max-w-2xl font-sans text-base leading-relaxed text-muted-ink md:text-lg">
                {service.overview}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button asChild variant="primary" size="lg">
                  <Link href={`/contact?service=${service.slug}`}>
                    <span>Discuss {service.title}</span>
                    <ArrowUpRight strokeWidth={1.25} className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-sand p-2.5">
                <RevealImage
                  src={service.image}
                  alt={service.imageAlt}
                  width={960}
                  height={720}
                  priority
                  trigger="load"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  containerClassName="aspect-[4/3.5] w-full"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 border border-sand p-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                    Typical Timeline
                  </p>
                  <p className="mt-1.5 font-sans text-sm text-pine">{service.timeline}</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                    Designed For
                  </p>
                  <p className="mt-1.5 font-sans text-sm text-pine">{service.idealFor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Commercial Outcomes */}
      <section className="surface-pine border-b border-pine-border py-20 md:py-28">
        <div className="pa-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
              Scope &amp; Deliverables
            </p>
            <h2 className="mt-3 font-serif text-3xl font-light text-ivory md:text-4xl">
              What we architect and deliver.
            </h2>

            <ul className="mt-8 divide-y divide-pine-border border-y border-pine-border">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 py-4 font-sans text-base text-sand"
                >
                  <Check strokeWidth={1.25} className="size-4 shrink-0 text-brass" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <p className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
              Measurable Impact
            </p>
            <h2 className="mt-3 font-serif text-3xl font-light text-ivory md:text-4xl">
              How success is governed.
            </h2>

            <ul className="mt-8 divide-y divide-pine-border border-y border-pine-border">
              {service.outcomes.map((item, idx) => (
                <li key={item} className="flex items-baseline gap-4 py-4">
                  <span className="font-mono text-xs text-brass">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-base text-ivory">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Other disciplines */}
      <section className="surface-ivory border-b border-sand py-20">
        <div className="pa-container">
          <p className="mb-8 font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
            Explore Other Disciplines
          </p>
          <div className="grid grid-cols-1 divide-y divide-sand border-y border-sand md:grid-cols-2 md:divide-x md:divide-y-0">
            {otherServices.map((item, idx) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className={`group flex items-center justify-between py-6 md:px-6 ${
                  idx >= 2 ? "md:border-t md:border-sand" : ""
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-brass">{item.index}</span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-pine transition-transform duration-300 group-hover:translate-x-1.5">
                    {item.title}
                  </h3>
                </div>
                <ArrowUpRight
                  strokeWidth={1.25}
                  className="size-4 text-pine group-hover:text-brass"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
