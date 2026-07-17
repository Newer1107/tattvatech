"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { businessVerticals } from "@/constants/verticals";
import {
  businessPrinciples,
  businessVerticalsIntro,
} from "@/constants/verticals";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { StackedVerticalCards } from "@/components/animations/StackedVerticalCards";

function PrinciplesLayer() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[100svh] max-h-[100svh] w-full items-center overflow-hidden bg-background-dark"
    >
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] items-center gap-10 px-[clamp(24px,6vw,96px)] py-[clamp(32px,4vw,64px)]">
        <div className="relative h-full max-h-full">
          <div className="relative isolate flex h-full max-h-[calc(100svh-2*clamp(32px,4vw,64px))] min-h-0 overflow-hidden rounded-[32px] border border-white/10 bg-background-dark px-6 py-7 shadow-[0_28px_70px_rgba(16,24,40,0.22)] md:px-8 md:py-8 lg:px-10 lg:py-9">
            <div
              data-principles-letter
              aria-hidden="true"
              className="pointer-events-none absolute left-[-0.08em] top-[-0.08em] z-[0] flex h-[110%] items-start font-heading text-[clamp(32rem,56vw,58rem)] leading-[0.72] tracking-[-0.08em] text-orange-primary opacity-[0.11]"
            >
              T
            </div>

            <div data-principles-mask className="absolute inset-0 z-[1] bg-background-dark" />

            <div className="relative z-[2] flex h-full min-h-0 flex-col">
              <SectionLabel>{businessVerticalsIntro.label}</SectionLabel>

              <div data-principles-heading className="mt-6">
                <h2 className="font-heading text-[clamp(3.75rem,6.2vw,7.25rem)] leading-[0.88] tracking-[-0.055em] text-white">
                  <span className="block">Purpose before</span>
                  <span className="block">technology.</span>
                  <span className="mt-2 block">Clarity before</span>
                  <span className="block">complexity.</span>
                </h2>
              </div>

              <div
                data-principles-divider
                className="mt-7 h-px w-full max-w-[220px] bg-[linear-gradient(90deg,rgba(255,168,0,0.95)_0%,rgba(245,90,10,0.4)_100%)]"
              />

              <div className="mt-6 grid grid-cols-2 gap-3">
                {businessPrinciples.map((principle) => (
                  <div
                    key={principle.title}
                    data-principles-item
                    className="rounded-[16px] border border-white/10 bg-white/6 px-[18px] py-4"
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-amber-primary">
                      {principle.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.5] text-white/72 lg:text-[15px]">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          data-principles-support
          className="max-w-[34ch] justify-self-end text-white"
        >
          <p className="text-[0.84rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
            Why this matters
          </p>
          <p className="mt-5 text-[clamp(1rem,1.25vw,1.12rem)] leading-7 text-[#D0D5DD]">
            {businessVerticalsIntro.description}
          </p>
          <p className="mt-5 text-sm leading-6 text-white/46">
            The principles layer sets the engineering mindset first, then hands off directly into the Services card using the same cover motion as the rest of the sequence.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BusinessVerticals() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotionPreference();
  const enableStackedMotion = isDesktop && !prefersReducedMotion;

  return (
    <section id="businesses" className="relative w-full bg-background-dark">
      <StackedVerticalCards
        principlesPanel={<PrinciplesLayer />}
        verticals={businessVerticals}
        enableStackedMotion={enableStackedMotion}
      />
    </section>
  );
}
