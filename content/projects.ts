export interface CaseStudy {
  index: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  approach: string;
  resultHeadline: string;
  metrics: { value: string; label: string }[];
  servicesUsed: string[];
  year: string;
  isPlaceholder: boolean;
  image: string;
  imageAlt: string;
  unsplashSuggestion: string;
  narrative: {
    context: string;
    architecture: string;
    impact: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    slug: "meridian-health-network",
    client: "Meridian Care Hospitals [Placeholder]",
    industry: "Healthcare",
    title: "Unifying patient intake and multi-clinic scheduling across fourteen centres.",
    challenge:
      "Regional clinics operated on disconnected booking tools and manual referral sheets, causing delayed confirmations and high call-centre load.",
    approach:
      "Designed a unified patient portal, integrated scheduling engine, and automated triage routing directly into the hospital ERP.",
    resultHeadline: "-38% intake turnaround",
    metrics: [
      { value: "-38%", label: "Patient intake turnaround" },
      { value: "+42%", label: "Completed digital bookings" },
      { value: "14", label: "Clinics unified on one core" },
    ],
    servicesUsed: ["Software Development", "Business Transformation"],
    year: "2026",
    isPlaceholder: true,
    image: "/images/placeholders/arch-software.jpg",
    imageAlt: "Architectural stone hospital facade in warm sunlight",
    unsplashSuggestion: "minimalist stone modern medical building facade daylight",
    narrative: {
      context:
        "Across fourteen outpatient centres, appointment confirmations took up to 19 hours because front-desk coordinators reconciled availability manually across three legacy databases.",
      architecture:
        "Pixel Arc consolidated scheduling into a single Next.js clinical operations portal backed by real-time slot locking, automated WhatsApp/SMS verification, and role-based audit logging.",
      impact:
        "Within ninety days of rollout, average patient intake turnaround fell by 38% while inbound call-centre volume dropped enough to reassign staff to high-touch patient care.",
    },
  },
  {
    index: "02",
    slug: "kestrel-precision-manufacturing",
    client: "Kestrel Industrial Systems [Placeholder]",
    industry: "Manufacturing",
    title: "Replacing manual dealer quoting with an automated B2B specification engine.",
    challenge:
      "Distributors waited up to five days for custom engineering quotes, stalling mid-market orders and tying up senior engineers.",
    approach:
      "Built a rules-driven configuration portal paired with AI-assisted tender document extraction synced directly to SAP.",
    resultHeadline: "3.4x faster quote velocity",
    metrics: [
      { value: "3.4x", label: "Quote-to-order velocity" },
      { value: "+42%", label: "Qualified dealer pipeline" },
      { value: "18 hrs", label: "Saved weekly per engineer" },
    ],
    servicesUsed: ["AI & Automation", "Software Development"],
    year: "2026",
    isPlaceholder: true,
    image: "/images/placeholders/arch-automation.jpg",
    imageAlt: "Precision architectural steel and concrete geometry",
    unsplashSuggestion: "minimalist architectural concrete steel industrial facade",
    narrative: {
      context:
        "Every custom industrial assembly required engineers to manually cross-reference tolerance tables against PDF specifications before issuing pricing.",
      architecture:
        "We deployed a deterministic configurator and document ingestion workflow that parses incoming RFQs, validates engineering tolerances, and generates accurate dealer proposals in minutes.",
      impact:
        "Quote turnaround compressed from five business days to under two hours, driving a 42% lift in qualified dealer pipeline.",
    },
  },
  {
    index: "03",
    slug: "alder-wealth-advisory",
    client: "Alder Private Partners [Placeholder]",
    industry: "Financial Services",
    title: "Repositioning a regional advisory firm with an editorial flagship and CRM core.",
    challenge:
      "An outdated brochure website and scattered spreadsheets failed to reflect the calibre of institutional mandates the firm managed.",
    approach:
      "Crafted a quiet-luxury brand system, bespoke client reporting portal, and automated HubSpot-to-compliance onboarding workflow.",
    resultHeadline: "+56% enterprise mandate inquiries",
    metrics: [
      { value: "+56%", label: "Qualified institutional inquiries" },
      { value: "62%", label: "Faster client KYC onboarding" },
      { value: "99.9%", label: "Portal uptime SLA" },
    ],
    servicesUsed: ["Branding & Creative", "Digital Marketing & Growth"],
    year: "2025",
    isPlaceholder: true,
    image: "/images/placeholders/arch-transformation.jpg",
    imageAlt: "Warm oak and travertine private advisory boardroom",
    unsplashSuggestion: "luxury minimalist architectural office interior warm wood stone",
    narrative: {
      context:
        "Prospective family offices and corporate treasuries experienced friction between first contact and onboarding due to outdated digital touchpoints.",
      architecture:
        "Pixel Arc rebuilt the firm's visual architecture from typography to client portal, pairing editorial clarity with automated compliance checklists.",
      impact:
        "Institutional inquiry quality rose by 56% over two quarters while onboarding document cycles dropped by more than half.",
    },
  },
  {
    index: "04",
    slug: "verve-urban-retail",
    client: "Solvay Home & Objects [Placeholder]",
    industry: "Retail & Commerce",
    title: "Composable commerce architecture and demand growth across four regions.",
    challenge:
      "Slow storefront pages and siloed regional inventory capped paid media return during seasonal trade launches.",
    approach:
      "Re-platformed onto a headless storefront with live warehouse inventory sync, technical SEO restructuring, and full-funnel attribution.",
    resultHeadline: "+47% revenue per visitor",
    metrics: [
      { value: "+47%", label: "Revenue per organic visitor" },
      { value: "0.7s", label: "Median storefront LCP" },
      { value: "4", label: "Regional warehouses synced" },
    ],
    servicesUsed: ["Digital Marketing & Growth", "Software Development"],
    year: "2025",
    isPlaceholder: true,
    image: "/images/placeholders/arch-growth.jpg",
    imageAlt: "Minimalist architectural retail gallery with travertine display plinths",
    unsplashSuggestion: "minimalist luxury retail showroom architecture travertine stone",
    narrative: {
      context:
        "Trade architects and retail buyers abandoned slow category pages whenever high-resolution lookbooks loaded alongside multi-currency pricing.",
      architecture:
        "We engineered an edge-cached commerce architecture with real-time regional stock routing and disciplined technical SEO foundations.",
      impact:
        "Median Largest Contentful Paint dropped to 0.7s and revenue per visitor climbed 47% in the first quarter post-launch.",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
