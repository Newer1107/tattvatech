"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroLabel } from "@/components/ui/HeroLabel";
import { PageContainer } from "@/components/layout/PageContainer";
import { HeroVisualFrame } from "@/components/hero/HeroVisualFrame";
import type { MutableRefObject } from "react";

type HeroRefs = {
  heroRootRef: MutableRefObject<HTMLElement | null>;
  heroVisualRef: MutableRefObject<HTMLDivElement | null>;
  heroContentPanelRef: MutableRefObject<HTMLDivElement | null>;
  heroLabelRef: MutableRefObject<HTMLDivElement | null>;
  heroHeadingRef: MutableRefObject<HTMLHeadingElement | null>;
  heroBodyRef: MutableRefObject<HTMLParagraphElement | null>;
  heroActionsRef: MutableRefObject<HTMLDivElement | null>;
};

type HeroProps = {
  refs: HeroRefs;
  navbar?: ReactNode;
};

export function Hero({ refs, navbar }: HeroProps) {
  const {
    heroRootRef,
    heroVisualRef,
    heroContentPanelRef,
    heroLabelRef,
    heroHeadingRef,
    heroBodyRef,
    heroActionsRef,
  } = refs;

  return (
    <section
      id="home"
      ref={heroRootRef}
      className="hero-root relative w-full min-h-[100svh] overflow-hidden bg-background px-0 py-0"
    >
      <div className="hero-grid relative grid min-h-[100svh] grid-rows-[minmax(45svh,52svh)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.85fr)] md:grid-rows-1">
        <div className="relative min-h-[45svh] bg-[#0d1117] md:min-h-[100svh]">
          <div
            ref={heroVisualRef}
            className="absolute inset-0 z-[1] overflow-hidden bg-[#0d1117]"
          >
            <HeroVisualFrame />
          </div>
        </div>

        <div
          ref={heroContentPanelRef}
          className="relative z-[3] flex min-h-[48svh] bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf9_100%)] md:min-h-[100svh]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.75)_55%,rgba(255,255,255,0)_100%)]"
          />

          <div className="hero-content-wrapper relative z-[10] flex min-h-full w-full items-center px-6 pt-[clamp(120px,16vh,220px)] pb-[clamp(48px,8vh,96px)] md:px-10 lg:px-14">
            <PageContainer className="flex max-w-[520px] justify-start px-0">
              <div className="max-w-[460px] text-left">
                <div ref={heroLabelRef}>
                  <HeroLabel>Parent technology brand</HeroLabel>
                </div>

                <h1
                  ref={heroHeadingRef}
                  className="mt-8 max-w-[8ch] font-heading text-[clamp(3rem,6.5vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-text-primary"
                >
                  Technology built with purpose.
                </h1>

                <p
                  ref={heroBodyRef}
                  className="mt-7 max-w-[38ch] text-[clamp(1rem,1.45vw,1.18rem)] leading-8 text-text-secondary"
                >
                  TattvaTech builds digital services, software products, drone
                  solutions, and industry-focused training experiences.
                </p>

                <div
                  ref={heroActionsRef}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <ButtonLink href="#summary">Explore TattvaTech</ButtonLink>
                  <ButtonLink href="#contact" variant="secondary">
                    Start a Project
                  </ButtonLink>
                </div>
              </div>
            </PageContainer>
          </div>
        </div>
      </div>

      {navbar}
    </section>
  );
}
