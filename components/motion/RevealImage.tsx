"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface RevealImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  parallax?: boolean;
  trigger?: "load" | "scroll";
  delay?: number;
}

export function RevealImage({
  containerClassName,
  imageClassName,
  parallax = true,
  trigger = "scroll",
  delay = 0,
  alt,
  ...imageProps
}: RevealImageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mediaRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      const media = mediaRef.current;
      if (!container || !media) return;

      if (reducedMotion) {
        gsap.fromTo(
          container,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.45,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: container, start: "top 86%", once: true }
                : undefined,
          }
        );
        return;
      }

      gsap.set(container, {
        clipPath: "inset(100% 0% 0% 0%)",
        willChange: "clip-path",
      });
      gsap.set(media, {
        scale: 1.15,
        willChange: "transform",
      });

      const tl = gsap.timeline({
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: container,
                start: "top 86%",
                once: true,
              }
            : undefined,
        onComplete: () => {
          gsap.set(container, { clearProps: "willChange" });
          gsap.set(media, { clearProps: "willChange" });
        },
      });

      tl.to(container, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: MOTION_DURATION.heroReveal,
        ease: MOTION_EASE.gsapInOutQuart,
      }).to(
        media,
        {
          scale: 1,
          duration: MOTION_DURATION.heroReveal + 0.15,
          ease: MOTION_EASE.gsapOutExpo,
        },
        0
      );

      if (parallax) {
        gsap.to(media, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [reducedMotion, parallax, trigger, delay] }
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-sand/40", containerClassName)}
    >
      <div ref={mediaRef} className="relative h-full w-full">
        <Image
          alt={alt}
          className={cn("h-full w-full object-cover", imageClassName)}
          {...imageProps}
        />
      </div>
    </div>
  );
}

