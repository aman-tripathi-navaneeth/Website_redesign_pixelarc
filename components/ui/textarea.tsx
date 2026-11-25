import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  floatingLabel?: string;
}

function Textarea({ className, floatingLabel, id, placeholder, ...props }: TextareaProps) {
  if (floatingLabel) {
    return (
      <div className="group/field relative pt-5">
        <textarea
          id={id}
          data-slot="textarea"
          placeholder={placeholder ?? " "}
          className={cn(
            "peer block min-h-28 w-full resize-y rounded-none border-0 border-b border-sand bg-transparent px-0 pt-2 pb-2.5 font-sans text-base text-foreground placeholder-transparent transition-colors outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-0 origin-left font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-placeholder-shown:top-7 peer-placeholder-shown:text-xs peer-placeholder-shown:tracking-[0.06em] peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.08em] peer-focus:text-pine"
        >
          {floatingLabel}
        </label>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1.5px] origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <textarea
        id={id}
        data-slot="textarea"
        placeholder={placeholder}
        className={cn(
          "peer flex min-h-28 w-full resize-y rounded-none border-0 border-b border-sand bg-transparent px-0 py-2.5 font-sans text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1.5px] origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
      />
    </div>
  );
}

export { Textarea };
