"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/shared/BrandMark";
import { MOTION_EASE } from "@/lib/motion";
import { NAV_LINKS, SITE_CONFIG } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open navigation menu"
          className="border-sand md:hidden"
        >
          <Menu strokeWidth={1.25} className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="surface-pine flex flex-col justify-between p-0">
        <SheetHeader className="px-6 py-5">
          <SheetTitle className="sr-only">{SITE_CONFIG.name} Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Primary navigation links and studio contact details
          </SheetDescription>
          <BrandMark tone="ivory" showLogoMark href="/" />
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center px-6">
          <ul className="divide-y divide-pine-border border-y border-pine-border">
            {NAV_LINKS.map((item, idx) => (
              <li key={item.href} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={open ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: MOTION_EASE.outExpo,
                    delay: 0.08 + idx * 0.05,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between py-5 focus-visible:outline-2 focus-visible:outline-brass"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-sm tracking-[0.08em] text-brass">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-3xl font-light tracking-[-0.02em] text-ivory transition-transform duration-200 group-hover:translate-x-2">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="size-5 text-sand/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
                    />
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 border-t border-pine-border px-6 py-6">
          <Button asChild variant="brass" size="lg" className="w-full justify-between">
            <Link href="/contact" onClick={() => setOpen(false)}>
              <span>Start a Project</span>
              <ArrowUpRight strokeWidth={1.25} className="size-4" />
            </Link>
          </Button>
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.08em] text-sand/80 uppercase">
            <span>{SITE_CONFIG.email}</span>
            <span>Bengaluru / London</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
