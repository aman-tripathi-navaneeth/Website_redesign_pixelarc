export interface ServicePillar {
  index: string;
  slug: string;
  title: string;
  shortDescription: string;
  headline: string;
  overview: string;
  deliverables: string[];
  outcomes: string[];
  idealFor: string;
  timeline: string;
  /** Local architectural placeholder — see Stage 7 replacement guide for Unsplash search terms */
  image: string;
  imageAlt: string;
  unsplashSuggestion: string;
}

export const SERVICES: ServicePillar[] = [
  {
    index: "01",
    slug: "software-development",
    title: "Software Development",
    shortDescription:
      "Websites, mobile applications, enterprise software, and custom digital platforms.",
    headline: "Resilient digital architecture engineered for longevity and scale.",
    overview:
      "Off-the-shelf software forces growing organisations to bend their workflows around generic constraints. We architect and ship bespoke web platforms, client portals, native mobile applications, and core enterprise systems built around your exact commercial logic.",
    deliverables: [
      "Custom web platforms & executive portals",
      "iOS and Android mobile applications",
      "Enterprise internal tooling & ERP extensions",
      "API architecture & legacy system modernisation",
    ],
    outcomes: [
      "Sub-second page transitions and predictable uptime",
      "Clean, documented codebases owned outright by your team",
      "Unified data flow across customer and back-office surfaces",
    ],
    idealFor:
      "Mid-market and enterprise teams outgrowing fragmented spreadsheets or legacy monoliths.",
    timeline: "8–18 weeks for initial production release",
    image: "/images/placeholders/arch-software.jpg",
    imageAlt: "Minimalist travertine architectural colonnade in warm daylight",
    unsplashSuggestion: "minimalist travertine concrete architecture sunlight shadow",
  },
  {
    index: "02",
    slug: "ai-automation",
    title: "AI & Automation",
    shortDescription:
      "Applied AI systems, intelligent workflows, assistants, and process automation.",
    headline: "Practical automation that returns high-value hours to your operators.",
    overview:
      "We deploy grounded AI workflows where accuracy, auditability, and speed matter—connecting document ingestion, qualification routing, internal knowledge retrieval, and multi-system orchestration with strict human-in-the-loop guardrails.",
    deliverables: [
      "Custom AI retrieval & internal knowledge assistants",
      "Automated lead qualification & intake triage",
      "Document parsing, reconciliation & ERP sync pipelines",
      "Customer-facing conversational service agents",
    ],
    outcomes: [
      "Measurable reduction in manual administrative handling",
      "Consistent SLA response times across sales and operations",
      "Auditable logs and strict enterprise data boundaries",
    ],
    idealFor:
      "Operations-heavy firms processing high volumes of requests, quotes, or compliance records.",
    timeline: "4–10 weeks from discovery to live deployment",
    image: "/images/placeholders/arch-automation.jpg",
    imageAlt: "Precision brushed brass and limestone interior architectural detail",
    unsplashSuggestion: "minimalist brass steel architectural detail warm light",
  },
  {
    index: "03",
    slug: "digital-marketing-growth",
    title: "Digital Marketing & Growth",
    shortDescription:
      "Technical SEO, paid acquisition, content systems, and qualified lead generation.",
    headline: "Demand architecture built to convert high-intent B2B buyers.",
    overview:
      "Traffic without qualification inflates acquisition cost. We combine technical search engineering, authoritative editorial positioning, paid media discipline, and conversion instrumentation so marketing spend maps directly to pipeline revenue.",
    deliverables: [
      "Technical SEO architecture & search authority programmes",
      "Paid search & LinkedIn account-based acquisition",
      "Conversion rate engineering & attribution analytics",
      "Executive thought-leadership & sales enablement assets",
    ],
    outcomes: [
      "Higher qualified demo and RFP volume at lower blended CAC",
      "Full-funnel visibility from first impression to closed contract",
      "Compounding organic search equity in core commercial categories",
    ],
    idealFor: "B2B organisations entering new geographies or repositioning upmarket.",
    timeline: "90-day acquisition sprint with ongoing optimisation",
    image: "/images/placeholders/arch-growth.jpg",
    imageAlt: "Architectural glass atrium with warm natural stone columns",
    unsplashSuggestion: "modern warm stone glass atrium architectural photography",
  },
  {
    index: "04",
    slug: "branding-creative",
    title: "Branding & Creative",
    shortDescription: "Brand identity, editorial UI/UX design systems, and digital flagships.",
    headline: "Visual authority that signals trust before a word is spoken.",
    overview:
      "In high-consideration B2B markets, buyers judge operational competence within seconds of landing on your flagship site. We craft cohesive brand identities, typographic design systems, and bespoke digital experiences that command category credibility.",
    deliverables: [
      "Brand positioning, verbal identity & visual systems",
      "Design systems & accessible component libraries",
      "High-craft flagship websites & interactive product narratives",
      "Motion direction & executive presentation frameworks",
    ],
    outcomes: [
      "Cohesive visual standard across web, product, and boardrooms",
      "Elevated perceived value supporting enterprise pricing power",
      "Reusable design tokens that accelerate future product launches",
    ],
    idealFor: "Category leaders preparing for Series B+, M&A integration, or market expansion.",
    timeline: "6–12 weeks for identity and flagship design",
    image: "/images/pixel-arc-building.png",
    imageAlt: "Pixel Arc limestone and glass architectural studio entrance",
    unsplashSuggestion: "luxury minimalist travertine office building facade warm sun",
  },
  {
    index: "05",
    slug: "business-transformation",
    title: "Business Transformation",
    shortDescription: "CRM, ERP, sales automation, operational optimisation, and advisory.",
    headline: "Aligned systems connecting leadership visibility with frontline execution.",
    overview:
      "Technology investments fail when tools are bolted onto broken incentives or disconnected departments. We partner with executive leadership to map core commercial workflows, unify CRM and ERP platforms, and build reporting clarity across the business.",
    deliverables: [
      "CRM & ERP architecture, migration & unification",
      "Revenue operations & pipeline automation",
      "Executive KPI dashboards & operational governance",
      "Fractional technology & transformation advisory",
    ],
    outcomes: [
      "Single source of truth across sales, finance, and delivery",
      "Shorter sales cycles with automated handoffs to delivery",
      "Clear capital allocation roadmaps tied to EBITDA impact",
    ],
    idealFor: "Founder-led SMEs and multi-unit enterprises scaling past operational bottlenecks.",
    timeline: "6–16 weeks per transformation phase",
    image: "/images/placeholders/arch-transformation.jpg",
    imageAlt: "Sculptural concrete and warm oak architectural conference interior",
    unsplashSuggestion: "minimalist oak travertine boardroom architecture interior",
  },
];

export function getServiceBySlug(slug: string): ServicePillar | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
