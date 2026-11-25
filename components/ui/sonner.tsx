"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon strokeWidth={1.25} className="size-4 text-brass" />,
        info: <InfoIcon strokeWidth={1.25} className="size-4 text-brass" />,
        warning: <TriangleAlertIcon strokeWidth={1.25} className="size-4 text-brass" />,
        error: <OctagonXIcon strokeWidth={1.25} className="size-4 text-destructive" />,
        loading: <Loader2Icon strokeWidth={1.25} className="size-4 animate-spin text-brass" />,
      }}
      toastOptions={{
        classNames: {
          toast: "rounded-[2px] border border-pine-border bg-pine text-ivory font-sans shadow-none",
          title: "font-serif text-base text-ivory",
          description: "font-sans text-sm text-sand",
          actionButton: "rounded-[2px] bg-brass text-pine font-mono text-xs uppercase",
          cancelButton: "rounded-[2px] border border-sand/30 bg-transparent text-ivory",
        },
      }}
      style={
        {
          "--normal-bg": "var(--pine)",
          "--normal-text": "var(--ivory)",
          "--normal-border": "var(--pine-border)",
          "--border-radius": "2px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
