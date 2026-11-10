"use client";

import { useRef, type PointerEvent } from "react";

// Attach only to non-scrolling surfaces; content keeps native touch scrolling.
export function useSwipeAction(action: () => void) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (!event.isPrimary || event.button !== 0) return;
      start.current = {
        x: event.clientX,
        y: event.clientY,
        id: event.pointerId,
      };
      if (event.target instanceof Element) {
        event.target.setPointerCapture(event.pointerId);
      }
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const origin = start.current;
      start.current = null;
      if (!origin || origin.id !== event.pointerId) return;
      const dy = origin.y - event.clientY;
      if (dy > 65 && dy > Math.abs(origin.x - event.clientX) * 1.5) action();
    },
    onPointerCancel() {
      start.current = null;
    },
  };
}
