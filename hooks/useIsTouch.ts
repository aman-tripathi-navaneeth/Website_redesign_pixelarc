"use client";

import { useEffect, useState } from "react";

/**
 * Detects primary coarse-pointer / touch devices to disable custom cursor & magnetic pull.
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => {
      setIsTouch(coarse.matches || navigator.maxTouchPoints > 0);
    };

    update();
    coarse.addEventListener("change", update);
    return () => coarse.removeEventListener("change", update);
  }, []);

  return isTouch;
}
