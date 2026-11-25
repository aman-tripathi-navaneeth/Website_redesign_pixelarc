export interface IndustryItem {
  id: string;
  name: string;
  summary: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    summary: "Patient intake portals, clinical scheduling, and compliant operational systems.",
  },
  {
    id: "education",
    name: "Education",
    summary: "Digital learning infrastructure, admissions workflows, and institutional platforms.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    summary: "Connected floor telemetry, supplier portals, and dealer ordering automation.",
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    summary: "Unified omnichannel storefronts, inventory intelligence, and retention engines.",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    summary: "Portfolio analytics, broker CRMs, and high-conversion property flagships.",
  },
  {
    id: "logistics",
    name: "Logistics",
    summary: "Dispatch coordination, fleet visibility, and automated freight billing pipelines.",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    summary: "Client onboarding, advisory portals, and audit-ready compliance workflows.",
  },
];
