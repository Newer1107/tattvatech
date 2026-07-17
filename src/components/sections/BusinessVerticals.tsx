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
      className="principles-section relative flex w-full items-center overflow-hidden bg-background-dark lg:h-[100svh] lg:min-h-[100svh] lg:max-h-[100svh]"
    >
      <div className="principles-inner relative z-[2] mx-auto grid h-full w-full max-w-[1440px] items-center gap-10 px-7 py-12 md:px-10 md:py-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:gap-[clamp(48px,7vw,110px)] lg:px-[clamp(28px,6vw,88px)] lg:py-[clamp(28px,4vw,52px)]">
        <div className="relative flex h-full min-h-0 items-center">
          <div className="principles-content relative z-[2] flex h-full min-h-0 w-full flex-col justify-center overflow-hidden">
            <div
              data-principles-letter
              aria-hidden="true"
              className="principles-giant-t pointer-events-none absolute left-[-0.08em] top-1/2 z-[0] flex -translate-y-1/2 items-start font-heading text-[clamp(28rem,52vw,76rem)] leading-[0.7] tracking-[-0.08em] text-orange-primary opacity-[0.11] md:text-[clamp(36rem,58vw,82rem)] lg:text-[clamp(48rem,72vw,88rem)]"
            >
              T
            </div>

            <div
              data-principles-mask
              className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(16,24,40,0.16)_0%,rgba(16,24,40,0)_52%)]"
            />

            <div className="relative z-[2] flex h-full min-h-0 flex-col justify-center">
              <SectionLabel>{businessVerticalsIntro.label}</SectionLabel>

              <div data-principles-heading className="mt-4 lg:mt-5">
                <h2 className="font-heading text-[clamp(3rem,9vw,4.8rem)] leading-[0.9] tracking-[-0.055em] text-white lg:text-[clamp(3.8rem,5.8vw,6.8rem)] lg:leading-[0.88]">
                  <span className="block">Purpose before</span>
                  <span className="block">technology.</span>
                  <span className="mt-1 block lg:mt-1.5">Clarity before</span>
                  <span className="block">complexity.</span>
                </h2>
              </div>

              <div
                data-principles-divider
                className="mt-5 h-px w-full max-w-[220px] bg-[linear-gradient(90deg,rgba(255,168,0,0.95)_0%,rgba(245,90,10,0.4)_100%)] lg:mt-6"
              />

              <div className="principles-grid mt-5 grid grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2 lg:mt-[22px] lg:gap-x-3 lg:gap-y-2.5">
                {businessPrinciples.map((principle) => (
                  <div
                    key={principle.title}
                    data-principles-item
                    className="principle-item min-h-0 rounded-[14px] border border-white/10 bg-white/6 px-4 py-[14px]"
                  >
                    <p className="text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.14em] text-amber-primary">
                      {principle.title}
                    </p>
                    <p className="mt-2 text-[clamp(0.82rem,1vw,0.95rem)] leading-[1.4] text-white/72">
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
          className="max-w-[32ch] justify-self-end self-center text-white"
        >
          <p className="text-[0.84rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
            Why this matters
          </p>
          <p className="mt-4 text-[clamp(1rem,1.15vw,1.08rem)] leading-7 text-[#D0D5DD]">
            {businessVerticalsIntro.description}
          </p>
          <p className="mt-4 text-sm leading-6 text-white/46">
            These principles guide every service, product, training initiative, and applied technology solution.
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
