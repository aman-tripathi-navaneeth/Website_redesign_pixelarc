# Pixel Arc — Digital Transformation & Technology Consulting

Editorial flagship website for **Pixel Arc**, built with Next.js 15 (App Router), strict TypeScript, Tailwind CSS v4, heavily restyled `shadcn/ui` primitives, GSAP (`ScrollTrigger` + `SplitText`), Lenis smooth scroll, Motion (`motion/react`), React Hook Form + Zod, and Resend.

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

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in Vercel (framework preset: **Next.js**).
3. Add environment variables from `.env.example`:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy. All static pages (`/`, `/about`, `/work`, `/work/[slug]`, `/services/[slug]`) and API routes (`/api/contact`) deploy with zero extra configuration.

## Editing Content

All copy and structured data live outside layout/UI code in `/content`:

- `/content/site.ts` — Brand metadata, navigation links, footer columns, offices, email & phone
- `/content/services.ts` — The 5 service pillars, deliverables, outcomes, and detail pages
- `/content/industries.ts` — The 7 B2B verticals in the industries marquee
- `/content/projects.ts` — Case studies (`[Placeholder]` entries ready for client specifics)
- `/content/testimonials.ts` — Client quotes (`01 / 05`)
- `/content/stats.ts` — Hero stat strip & Impact numbers
- `/content/process.ts` — The 4-step pinned process (`Discover`, `Design`, `Build`, `Scale`)

## Replacement Checklist Before Launch

1. **Logo & Favicon**: Replace `/public/images/company-logo.png` and `/app/icon.svg` with your final vector/retina brand assets if updating the mark.
2. **Placeholder Photography**: Replace `/public/images/placeholders/*.jpg` using the suggested Unsplash architectural search terms documented in `/content/services.ts` and `/content/projects.ts` (keep `/public/images/pixel-arc-building.png` for the studio hero).
3. **Case Studies & Testimonials**: Replace all `[Placeholder]` client names, quotes, and metrics in `/content/projects.ts`, `/content/testimonials.ts`, and `/content/stats.ts` with verified client engagements.
4. **Contact Details & Email Delivery**: Update `email`, `phone`, and `offices` in `/content/site.ts`, and configure a verified Resend domain in `.env.local` / Vercel.
5. **Social Links**: Update the LinkedIn, X/Twitter, and GitHub URLs in `/content/site.ts`.
