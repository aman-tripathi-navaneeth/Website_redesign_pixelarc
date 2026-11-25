export interface Testimonial {
  index: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    index: "01",
    quote:
      "We needed more than a software vendor. We needed a partner who understood unit economics and could translate board-level goals into systems our clinical teams actually enjoy using.",
    author: "Rohit Mehra",
    role: "Chief Operating Officer",
    company: "Meridian Care Hospitals [Placeholder]",
    industry: "Healthcare",
  },
  {
    index: "02",
    quote:
      "Pixel Arc replaced four fragmented quoting spreadsheets with one disciplined portal. Our distributors now receive accurate technical pricing in minutes rather than days.",
    author: "Ananya Deshmukh",
    role: "VP of Commercial Operations",
    company: "Kestrel Industrial Systems [Placeholder]",
    industry: "Manufacturing",
  },
  {
    index: "03",
    quote:
      "Every decision—from information architecture to CRM automation—was anchored in commercial outcomes. Within two quarters our inbound institutional pipeline looked completely different.",
    author: "David Thornton",
    role: "Managing Partner",
    company: "Alder Private Partners [Placeholder]",
    industry: "Financial Services",
  },
  {
    index: "04",
    quote:
      "Rarely do you find a firm that treats visual restraint and engineering rigour with equal seriousness. Our flagship site finally matches the calibre of our physical showrooms.",
    author: "Clara Lindqvist",
    role: "Head of Digital Commerce",
    company: "Solvay Home & Objects [Placeholder]",
    industry: "Retail & Commerce",
  },
  {
    index: "05",
    quote:
      "They did not pitch us AI hype. They audited our dispatch bottlenecks, automated freight reconciliation, and delivered measurable margin improvement inside eight weeks.",
    author: "Vikramaditya Rao",
    role: "Director of Logistics",
    company: "Northstar Freight Corridors [Placeholder]",
    industry: "Logistics",
  },
];

