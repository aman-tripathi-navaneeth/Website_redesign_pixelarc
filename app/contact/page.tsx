import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE_CONFIG } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project or executive briefing with Pixel Arc across software development, AI automation, growth, brand, and transformation.",
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;

  return (
    <section className="surface-ivory border-b border-sand py-16 md:py-24">
      <div className="pa-container grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <SectionHeading
            index="01"
            eyebrow="Start a Project"
            tone="ivory"
            title={
              <>
                Begin with a focused <em className="text-brass italic">conversation.</em>
              </>
            }
            description="Share the system challenge, timeline, and commercial outcome you are targeting. You will speak directly with a principal architect—never a scripted sales desk."
          />

          <div className="flex flex-col gap-6 border-t border-sand pt-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                Direct Email
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-1 inline-block font-serif text-2xl font-light text-pine transition-colors hover:text-brass"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                Telephone
              </p>
              <p className="mt-1 font-sans text-base text-pine">{SITE_CONFIG.phone}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              {SITE_CONFIG.offices.map((office) => (
                <div key={office.city} className="border-l border-sand pl-4">
                  <p className="font-mono text-[11px] tracking-[0.08em] text-pine uppercase">
                    {office.city}
                  </p>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-muted-ink">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm defaultService={service} />
        </div>
      </div>
    </section>
  );
}

