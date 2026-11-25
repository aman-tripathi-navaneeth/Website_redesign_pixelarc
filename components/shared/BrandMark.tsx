import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/content/site";

interface BrandMarkProps {
  tone?: "pine" | "ivory";
  showDescriptor?: boolean;
  showLogoMark?: boolean;
  href?: string;
  className?: string;
}

export function BrandMark({
  tone = "pine",
  showDescriptor = false,
  showLogoMark = false,
  href = "/",
  className,
}: BrandMarkProps) {
  const isIvory = tone === "ivory";

  const content = (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      {showLogoMark && (
        <span
          className={cn(
            "relative flex h-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]",
            isIvory ? "bg-ivory px-2 py-0.5" : "bg-transparent"
          )}
        >
          <Image
            src="/images/company-logo.png"
            alt={`${SITE_CONFIG.name} emblem`}
            width={120}
            height={30}
            className={cn("h-6 w-auto object-contain", !isIvory && "mix-blend-multiply")}
            priority
          />
        </span>
      )}

      <span className="inline-flex items-center gap-4">
        <span
          className={cn(
            "font-serif text-[25px] leading-none font-normal tracking-[-0.025em] whitespace-nowrap",
            isIvory ? "text-ivory" : "text-pine"
          )}
        >
          {SITE_CONFIG.name}
        </span>

        {showDescriptor && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "hidden h-6 w-px lg:inline-block",
                isIvory ? "bg-brass/70" : "bg-brass/75"
              )}
            />
            <span
              className={cn(
                "hidden max-w-[205px] font-mono text-[10px] leading-[1.35] tracking-[0.09em] uppercase lg:inline-block",
                isIvory ? "text-sand/85" : "text-muted-ink"
              )}
            >
              {SITE_CONFIG.descriptor}
            </span>
          </>
        )}
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label={`${SITE_CONFIG.name} — Home`}
      className="inline-flex items-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
    >
      {content}
    </Link>
  );
}
