"use client";

import { businessVerticals } from "@/constants/verticals";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { StackedVerticalCards } from "@/components/animations/StackedVerticalCards";

export function BusinessVerticals() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotionPreference();
  const enableStackedMotion = isDesktop && !prefersReducedMotion;

  return (
    <section id="businesses" className="relative w-full bg-background-dark">
      <StackedVerticalCards
        verticals={businessVerticals}
        enableStackedMotion={enableStackedMotion}
      />
    </section>
  );
}
