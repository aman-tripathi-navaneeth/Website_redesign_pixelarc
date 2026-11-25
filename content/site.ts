export interface NavLink {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: "Pixel Arc",
  descriptor: "Digital Transformation & Technology Consulting",
  tagline: "We build the systems your growth runs on.",
  description:
    "Pixel Arc is a digital transformation and technology consulting firm partnering with ambitious businesses to design software, automate operations, and build durable commercial foundations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pixelarc.example",
  email: "hello@pixelarc.example",
  phone: "+91 80 4120 7390",
  offices: [
    {
      city: "Bengaluru",
      address: "42 Lavelle Road, Shanthala Nagar, Bengaluru 560001",
      region: "APAC & Middle East",
    },
    {
      city: "London",
      address: "18 Clerkenwell Green, London EC1R 0DP",
      region: "UK & Europe",
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X / Twitter", href: "https://x.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS = {
  expertise: [
    { label: "Software Development", href: "/services/software-development" },
    { label: "AI & Automation", href: "/services/ai-automation" },
    { label: "Digital Marketing & Growth", href: "/services/digital-marketing-growth" },
    { label: "Branding & Creative", href: "/services/branding-creative" },
    { label: "Business Transformation", href: "/services/business-transformation" },
  ],
  company: [
    { label: "About Pixel Arc", href: "/about" },
    { label: "Selected Work", href: "/work" },
    { label: "Our Process", href: "/#process" },
    { label: "Start a Project", href: "/contact" },
  ],
} as const;
