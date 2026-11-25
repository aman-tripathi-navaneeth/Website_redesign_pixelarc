import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { dmMono, fraunces, instrumentSans } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE_CONFIG } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.descriptor}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/pixel-arc-building.png",
        width: 1408,
        height: 768,
        alt: `${SITE_CONFIG.name} Architectural Headquarters`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/images/pixel-arc-building.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-ivory text-pine antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-[2px] focus:bg-pine focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-[0.08em] focus:text-ivory focus:uppercase"
        >
          Skip to main content
        </a>

        <JsonLd />

        <MotionConfig reducedMotion="user">
          <TooltipProvider delayDuration={120}>
            <Navbar />
            <main id="main-content" className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
