"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[2px] font-sans text-[15px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "border border-pine bg-pine text-ivory hover:border-brass hover:text-pine",
        default: "border border-pine bg-pine text-ivory hover:border-brass hover:text-pine",
        brass: "border border-brass bg-brass text-pine hover:border-ivory hover:text-pine",
        outline:
          "border border-foreground/25 bg-transparent text-foreground hover:border-pine hover:text-ivory",
        secondary: "border border-sand bg-sand text-pine hover:border-pine hover:text-ivory",
        ghost:
          "border border-transparent bg-transparent text-foreground hover:border-border hover:bg-secondary/40",
        link: "h-auto rounded-none border-0 bg-transparent px-0 py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-brass after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:origin-right hover:after:scale-x-0",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-13 px-8 py-3 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [wipeOrigin, setWipeOrigin] = React.useState<"left" | "right">("left");

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isRight = event.clientX - rect.left > rect.width / 2;
    setWipeOrigin(isRight ? "right" : "left");
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isRight = event.clientX - rect.left > rect.width / 2;
    setWipeOrigin(isRight ? "right" : "left");
    onMouseLeave?.(event);
  };

  const hasWipe =
    variant === "primary" ||
    variant === "default" ||
    variant === "brass" ||
    variant === "outline" ||
    variant === "secondary";

  const wipeBg =
    variant === "primary" || variant === "default"
      ? "bg-brass"
      : variant === "brass"
        ? "bg-ivory"
        : "bg-pine";

  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {hasWipe && (
        <span
          aria-hidden="true"
          style={{ transformOrigin: wipeOrigin }}
          className={cn(
            "pointer-events-none absolute inset-0 z-0 scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
            wipeBg
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}

export { Button, buttonVariants };
