"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMousePosition() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 150, damping: 15 });
  const y = useSpring(rawY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    let rafId: number;
    const onMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        rawX.set(e.clientX / window.innerWidth);
        rawY.set(e.clientY / window.innerHeight);
      });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [rawX, rawY]);

  return { x, y };
}
