"use client";

import { useContext } from "react";
import {
  SmoothScrollContext,
  type SmoothScrollContextValue,
} from "@/components/motion/SmoothScrollProvider";

/**
 * Accesses the shared Lenis smooth-scroll instance and pause/resume controls.
 */
export function useLenis(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}
