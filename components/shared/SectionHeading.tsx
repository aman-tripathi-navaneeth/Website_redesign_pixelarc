import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  tone?: "ivory" | "pine";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = "ivory",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isPine = tone === "pine";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-3.5">
        {index && (
          <span
            className={cn(
              "font-mono text-xs tracking-[0.08em]",
              isPine ? "text-brass" : "text-muted-ink"
            )}
          >
            {index}
          </span>
        )}
        <span
          className={cn(
            "font-mono text-xs tracking-[0.08em] uppercase",
            isPine ? "text-brass" : "text-muted-ink"
          )}
        >
          {eyebrow}
        </span>
        <span aria-hidden="true" className="h-px w-10 bg-brass" />
      </div>

      <h2 className={cn("text-display max-w-3xl", isPine ? "text-ivory" : "text-pine")}>{title}</h2>

      {description && (
        <p
          className={cn(
            "max-w-xl font-sans text-base leading-relaxed md:text-[17px]",
            isPine ? "text-sand/90" : "text-muted-ink"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
