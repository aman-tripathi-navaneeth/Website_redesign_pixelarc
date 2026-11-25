"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/shared/BrandMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const HEADER_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/#philosophy" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-sand transition-colors duration-200",
        scrolled ? "bg-ivory/95 backdrop-blur-[2px]" : "bg-ivory"
      )}
    >
      <div className="pa-container flex h-20 items-center justify-between gap-6">
        <BrandMark tone="pine" showDescriptor showLogoMark href="/" />

        <div className="hidden items-center gap-8 md:flex">
          <NavigationMenu aria-label="Primary navigation">
            <NavigationMenuList className="gap-7">
              {HEADER_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild variant="primary" size="sm" className="group h-10 px-5">
            <Link href="/contact">
              <span>Start a Project</span>
              <ArrowUpRight
                strokeWidth={1.25}
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
