import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WorkArchive } from "@/components/sections/WorkArchive";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Case studies demonstrating measurable software, automation, brand, and operational outcomes across B2B industries.",
};

export default function WorkPage() {
  return (
    <>
      <section className="surface-ivory border-b border-sand py-16 md:py-24">
        <div className="pa-container">
          <SectionHeading
            index="01"
            eyebrow="Case Archive"
            tone="ivory"
            title={
              <>
                Systems shipped with <em className="text-brass italic">measurable return.</em>
              </>
            }
            description="Illustrative client engagements showing how software architecture, automation, and demand strategy resolve operational friction. All entries below are clearly marked placeholders ready for live client data."
          />

          <div className="mt-14">
            <WorkArchive />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

