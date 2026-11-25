export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Commercial & technical audit",
    description:
      "We do not begin by pitching a stack. We interview leadership and operators, inspect where revenue or margin leaks, and define clear success metrics before writing a line of code.",
    deliverable: "Systems blueprint & ROI model",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Architecture & editorial craft",
    description:
      "Information architecture, data schemas, and quiet-luxury visual systems are designed together so customer perception and back-office reliability reinforce one another.",
    deliverable: "Interactive prototype & technical spec",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Disciplined engineering sprints",
    description:
      "Senior engineers ship modular, type-safe software, AI workflows, and CRM/ERP integrations in transparent weekly increments with automated testing and performance budgets.",
    deliverable: "Production platform & documentation",
  },
  {
    number: "04",
    title: "Scale",
    subtitle: "Growth, telemetry & refinement",
    description:
      "Launch is the starting line. We instrument real conversion telemetry, refine search and acquisition loops, and expand automation as your organisation enters new markets.",
    deliverable: "Ongoing growth & reliability stewardship",
  },
];

