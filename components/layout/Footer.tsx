"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/shared/BrandMark";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FOOTER_COLUMNS, SITE_CONFIG } from "@/content/site";
import { INDUSTRIES } from "@/content/industries";

export function Footer() {
  return (
    <footer className="surface-pine border-t border-pine-border pt-16 pb-10 md:pt-20">
      <div className="pa-container flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <BrandMark tone="ivory" showLogoMark href="/" />
            <p className="max-w-xs font-sans text-sm leading-relaxed text-sand/85">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-5 pt-1">
              {SITE_CONFIG.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.08em] text-sand uppercase transition-colors duration-200 hover:text-brass"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight strokeWidth={1.25} className="size-3" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <div className="flex flex-col gap-3.5">
              <p className="font-mono text-[11px] tracking-[0.08em] text-brass uppercase">
                Services
              </p>
              <ul className="flex flex-col gap-2">
                {FOOTER_COLUMNS.expertise.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-sm text-sand/90 transition-colors duration-200 hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <p className="font-mono text-[11px] tracking-[0.08em] text-brass uppercase">
                Industries
              </p>
              <ul className="flex flex-col gap-2">
                {INDUSTRIES.map((industry) => (
                  <li key={industry.id}>
                    <Link
                      href="/#industries"
                      className="font-sans text-sm text-sand/90 transition-colors duration-200 hover:text-ivory"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <p className="font-mono text-[11px] tracking-[0.08em] text-brass uppercase">
                Company
              </p>
              <ul className="flex flex-col gap-2">
                {FOOTER_COLUMNS.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-sm text-sand/90 transition-colors duration-200 hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <p className="font-mono text-[11px] tracking-[0.08em] text-brass uppercase">
                  Contact
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="font-sans text-sm text-sand/90 transition-colors duration-200 hover:text-ivory"
                >
                  {SITE_CONFIG.email}
                </a>
                <p className="font-sans text-sm text-sand/85">{SITE_CONFIG.phone}</p>
                <p className="font-sans text-xs text-sand/70">Bengaluru &amp; London</p>
              </div>

              <Button asChild variant="brass" size="sm" className="w-fit">
                <Link href="/contact">
                  <span>Start a Project</span>
                  <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-pine-border" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-[0.08em] text-sand/75 uppercase">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Dialog>
              <DialogTrigger className="cursor-pointer font-mono text-[11px] tracking-[0.08em] text-sand/75 uppercase transition-colors hover:text-ivory">
                Privacy Policy
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                  <DialogDescription>
                    How {SITE_CONFIG.name} handles project enquiries and contact data.
                  </DialogDescription>
                </DialogHeader>
                <p className="font-sans text-sm leading-relaxed text-muted-ink">
                  Information submitted through our consultation form is used solely to review your
                  enquiry and schedule project discussions. We do not sell, rent, or distribute
                  client contact details to third parties.
                </p>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="cursor-pointer font-mono text-[11px] tracking-[0.08em] text-sand/75 uppercase transition-colors hover:text-ivory">
                Terms of Use
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Terms of Use</DialogTitle>
                  <DialogDescription>
                    General terms governing the use of {SITE_CONFIG.name} digital properties.
                  </DialogDescription>
                </DialogHeader>
                <p className="font-sans text-sm leading-relaxed text-muted-ink">
                  Case study benchmarks and materials published on this site are provided for
                  informational purposes. Formal engagements are governed by executed master
                  services agreements.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}
