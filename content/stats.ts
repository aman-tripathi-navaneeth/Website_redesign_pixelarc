export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  caption: string;
}

export const HERO_STATS = [
  { value: "120+", label: "Systems Delivered" },
  { value: "7", label: "Core Industries" },
  { value: "12", label: "Countries Served" },
] as const;

export const IMPACT_STATS: StatItem[] = [
  {
    value: 120,
    suffix: "+",
    label: "Systems Delivered",
    caption: "Platforms, portals & automation cores shipped to production",
  },
  {
    value: 42,
    prefix: "+",
    suffix: "%",
    label: "Median Pipeline Lift",
    caption: "Average qualified demand gain across growth engagements",
  },
  {
    value: 94,
    suffix: "%",
    label: "Client Retention",
    caption: "Multi-year advisory and engineering partnerships",
  },
  {
    value: 12,
    suffix: "",
    label: "Countries",
    caption: "Cross-border deployments across APAC, UK, Europe & North America",
  },
];

