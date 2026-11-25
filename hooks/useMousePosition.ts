"use client";

import { useEffect, useRef } from "react";

export interface MouseCoordinates {
  x: number;
  y: number;
}

/**
 * Tracks live viewport pointer coordinates in a mutable ref (zero React re-renders).
 */
export function useMousePosition(
  onMove?: (coords: MouseCoordinates) => void,
  enabled = true
): React.MutableRefObject<MouseCoordinates> {
  const coordsRef = useRef<MouseCoordinates>({ x: -100, y: -100 });
  const callbackRef = useRef(onMove);
  callbackRef.current = onMove;

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event: PointerEvent) => {
      const next = { x: event.clientX, y: event.clientY };
      coordsRef.current = next;
      callbackRef.current?.(next);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled]);

  return coordsRef;
}

