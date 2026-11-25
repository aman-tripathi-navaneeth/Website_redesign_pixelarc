import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="surface-ivory flex min-h-[calc(100dvh-5rem)] items-center border-b border-sand py-20">
      <div className="pa-container flex flex-col items-start gap-8">
        <div className="flex items-center gap-3.5">
          <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
            Error 404
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-brass" />
        </div>

        <h1 className="font-serif text-[clamp(3.25rem,8vw,7rem)] leading-[0.98] font-light tracking-[-0.03em] text-pine">
          Page not <em className="text-brass italic">found.</em>
        </h1>

        <p className="max-w-md font-sans text-base leading-relaxed text-muted-ink md:text-lg">
          The page you requested has moved or no longer exists. Return to the studio overview or
          browse our selected work.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button asChild variant="primary" size="lg">
            <Link href="/">
              <ArrowLeft strokeWidth={1.25} className="size-4" />
              <span>Return Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/work">View Selected Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

