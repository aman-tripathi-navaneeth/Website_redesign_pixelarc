"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-6 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit flex-wrap items-center gap-1 border-b border-sand bg-transparent p-0 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "gap-6 border-b border-sand bg-transparent",
        line: "gap-6 border-b border-sand bg-transparent",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
);

function TabsList({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center rounded-none border-0 bg-transparent px-0.5 py-3 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase transition-colors outline-none hover:text-pine focus-visible:ring-2 focus-visible:ring-brass disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-pine",
        "after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=active]:after:scale-x-100",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
