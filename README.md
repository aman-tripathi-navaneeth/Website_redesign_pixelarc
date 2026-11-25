# Pixel Arc — Digital Transformation & Technology Consulting

Editorial corporate flagship for **Pixel Arc**, built with Next.js 15 (App Router), React 19, Tailwind CSS v4, restyled `shadcn/ui` primitives, Framer Motion (`motion/react`), GSAP (`ScrollTrigger` + `SplitText`), React Hook Form + Zod, and Resend.

## Project Structure

```text
├── app/                     # App Router pages, layout, SEO endpoints, contact API
├── components/
│   ├── layout/              # Navbar, MobileMenu (Sheet), Footer
│   ├── motion/              # Magnetic, RevealImage, RevealText
│   ├── sections/            # Hero, MetricsStrip, Philosophy, ServicesSection, IndustriesSection, ProcessSection, CaseStudiesSection, TestimonialSection, ContactCTA, WorkArchive, ContactForm
│   ├── shared/              # BrandMark, SectionHeading, JsonLd
│   └── ui/                  # Restyled shadcn/ui primitives
├── content/                 # Typed copy & data (site, services, industries, projects, testimonials)
├── docs/references/         # Original visual references & logo assets
├── hooks/                   # useIsTouch, useReducedMotion
├── lib/                     # fonts, motion tokens, utils, Zod contact schema
└── public/images/           # Runtime brand & architectural photography
```

## Local Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build & Checks

```bash
pnpm exec tsc --noEmit
pnpm run lint
pnpm run build
pnpm start
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel (framework preset: **Next.js**).
3. Add environment variables from `.env.example`:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy.

## Editing Content

All copy and structured data live outside UI components in `/content`:

- `/content/site.ts` — Brand metadata, navigation links, footer columns, offices, email & phone
- `/content/services.ts` — The 5 service pillars, deliverables, outcomes, and detail pages
- `/content/industries.ts` — The 7 B2B industry verticals
- `/content/projects.ts` — Case studies (`[Placeholder]` entries ready for verified client metrics)
- `/content/testimonials.ts` — Client quotes (`01`–`05`)

## Pre-Launch Replacement Checklist

1. **Email & Env**: Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and `NEXT_PUBLIC_SITE_URL` in `.env.local` / Vercel.
2. **Case Studies & Metrics**: Replace `[Placeholder]` client names, metrics, and quotes in `/content/projects.ts`, `/content/testimonials.ts`, and `components/sections/MetricsStrip.tsx`.
3. **Contact Info & Socials**: Update `email`, `phone`, `offices`, and `socials` in `/content/site.ts`.
4. **Photography**: Replace `/public/images/placeholders/*.jpg` if swapping service/project plates (keep `/public/images/pixel-arc-building.png` and `/public/images/industries/*.jpg`).
