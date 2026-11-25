import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealImage } from "@/components/motion/RevealImage";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SITE_CONFIG } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Pixel Arc partners with leadership teams across software engineering, AI automation, brand, and business transformation.",
};

const TENETS = [
  {
    number: "01",
    title: "Principal-led delivery",
    copy: "Senior architects and design engineers stay directly accountable from commercial discovery through production deployment.",
  },
  {
    number: "02",
    title: "Zero vendor lock-in",
    copy: "Every platform, repository, and automated workflow we ship is cleanly documented and owned outright by your organisation.",
  },
  {
    number: "03",
    title: "Calm commercial rigour",
    copy: "We measure success by qualified pipeline, faster cycle times, and operating margin—not vanity feature counts.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="surface-ivory border-b border-sand py-16 md:py-24">
        <div className="pa-container">
          <SectionHeading
            index="01"
            eyebrow="About Pixel Arc"
            tone="ivory"
            title={
              <>
                An engineering &amp; transformation studio built for{" "}
                <em className="text-brass italic">lasting commercial value.</em>
              </>
            }
            description="We operate at the intersection of software architecture, applied automation, and brand authority—helping ambitious businesses build the infrastructure their next decade depends on."
          />

          <div className="mt-14 border border-sand p-2.5 sm:p-3">
            <RevealImage
              src="/images/pixel-arc-building.png"
              alt="Pixel Arc travertine architectural studio entrance"
              width={1408}
              height={768}
              priority
              trigger="load"
              sizes="100vw"
              containerClassName="aspect-[16/8.5] w-full"
            />
          </div>
        </div>
      </section>

      <section className="surface-pine border-b border-pine-border py-20 md:py-28">
        <div className="pa-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
                02 / Operating Principles
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light text-ivory md:text-4xl">
                How we work with leadership teams.
              </h2>
            </div>

            <div className="divide-y divide-pine-border border-y border-pine-border lg:col-span-8">
              {TENETS.map((tenet) => (
                <div key={tenet.number} className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-12">
                  <span className="font-mono text-xs text-brass sm:col-span-2">{tenet.number}</span>
                  <h3 className="font-serif text-2xl font-light text-ivory sm:col-span-4">
                    {tenet.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-sand/85 sm:col-span-6">
                    {tenet.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Offices */}
          <div className="mt-20 grid grid-cols-1 gap-8 border-t border-pine-border pt-14 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
                03 / Studios
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light text-ivory">
                Global delivery, close collaboration.
              </h2>
            </div>

            {SITE_CONFIG.offices.map((office) => (
              <div key={office.city} className="border border-pine-border p-6">
                <p className="font-mono text-xs tracking-[0.08em] text-brass uppercase">
                  {office.region}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-light text-ivory">{office.city}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-sand/80">
                  {office.address}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button asChild variant="brass" size="lg">
              <Link href="/contact">
                <span>Arrange an Executive Briefing</span>
                <ArrowUpRight strokeWidth={1.25} className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
