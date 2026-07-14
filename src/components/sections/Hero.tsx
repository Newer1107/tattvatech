"use client";

import { ButtonLink } from "@/components/ui/Button";
import { HeroLabel } from "@/components/ui/HeroLabel";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { HeroVisualFrame } from "@/components/hero/HeroVisualFrame";
import type { MutableRefObject } from "react";

type HeroRefs = {
  heroRootRef: MutableRefObject<HTMLElement | null>;
  heroVisualRef: MutableRefObject<HTMLDivElement | null>;
  heroLabelRef: MutableRefObject<HTMLDivElement | null>;
  heroHeadingRef: MutableRefObject<HTMLHeadingElement | null>;
  heroBodyRef: MutableRefObject<HTMLParagraphElement | null>;
  heroActionsRef: MutableRefObject<HTMLDivElement | null>;
};

type HeroProps = {
  refs: HeroRefs;
};

export function Hero({ refs }: HeroProps) {
  const {
    heroRootRef,
    heroVisualRef,
    heroLabelRef,
    heroHeadingRef,
    heroBodyRef,
    heroActionsRef,
  } = refs;

  return (
    <SectionContainer
      id="home"
      ref={heroRootRef}
      className="hero-root relative min-h-[100svh] max-w-none px-0 py-0"
    >
      <div
        ref={heroVisualRef}
        className="absolute inset-0 z-[1] overflow-hidden bg-background"
      >
        <HeroVisualFrame />
      </div>

      <div className="relative z-[10] mx-auto flex min-h-[100svh] w-full max-w-[var(--content-max)] items-center justify-center px-6 pt-28 pb-14 text-center md:px-10 lg:px-16 lg:pt-32">
        <div className="max-w-[720px]">
          <div ref={heroLabelRef}>
            <HeroLabel>Parent technology brand</HeroLabel>
          </div>

          <h1
            ref={heroHeadingRef}
            className="mt-8 font-heading text-[clamp(2.5rem,12vw,7rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-text-primary"
          >
            Technology built with purpose.
          </h1>

          <p
            ref={heroBodyRef}
            className="mx-auto mt-7 max-w-[720px] text-[clamp(1rem,1.6vw,1.25rem)] leading-8 text-text-secondary"
          >
            TattvaTech builds digital services, software products, drone
            solutions, and industry-focused training experiences.
          </p>

          <div
            ref={heroActionsRef}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <ButtonLink href="#summary">Explore TattvaTech</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Start a Project
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
