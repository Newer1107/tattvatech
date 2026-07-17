"use client";

import {
  businessPrinciples,
  businessVerticals,
  businessVerticalsClosing,
  businessVerticalsIntro,
} from "@/constants/verticals";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StackedVerticalCards } from "@/components/animations/StackedVerticalCards";

export function BusinessVerticals() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotionPreference();
  const enableStackedMotion = isDesktop && !prefersReducedMotion;

  const principlesPanel = (
    <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-between px-6 py-12 text-white md:px-10 md:py-14 xl:px-16 xl:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-auto h-[48%] bg-[radial-gradient(circle_at_72%_100%,rgba(255,168,0,0.18),transparent_44%),radial-gradient(circle_at_30%_94%,rgba(245,90,10,0.22),transparent_36%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-6%] right-[-8%] h-[54svh] w-[54svh] rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-[8%] h-[18svh] w-[34svh] rounded-full border border-orange-primary/24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] right-[18%] h-[24svh] w-[24svh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),rgba(255,255,255,0)_68%)]"
      />

      <div className="relative z-[2] grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:gap-16">
        <div>
          <SectionLabel>{businessVerticalsIntro.label}</SectionLabel>
          <h2 className="mt-6 max-w-[10ch] whitespace-pre-line font-heading text-[clamp(3rem,6.2vw,7rem)] leading-[0.92] tracking-[-0.05em]">
            {businessVerticalsIntro.heading}
          </h2>
        </div>

        <p className="max-w-[36ch] self-start pt-1 text-[clamp(1.05rem,1.4vw,1.3rem)] leading-8 text-white/72 lg:justify-self-end">
          {businessVerticalsIntro.description}
        </p>
      </div>

      <div className="relative z-[2] mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {businessPrinciples.map((principle) => (
          <div
            key={principle.title}
            className="border-t border-white/12 pt-4"
          >
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-amber-primary">
              {principle.title}
            </p>
            <p className="mt-3 max-w-[24ch] text-sm leading-7 text-white/72">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="businesses" className="relative w-full bg-[#101828]">
      {enableStackedMotion ? (
        <StackedVerticalCards
          verticals={businessVerticals}
          enableStackedMotion={enableStackedMotion}
          principlesPanel={principlesPanel}
        />
      ) : (
        <>
          <div className="overflow-hidden bg-[#101828]">
            {principlesPanel}
          </div>
          <StackedVerticalCards
            verticals={businessVerticals}
            enableStackedMotion={enableStackedMotion}
          />
        </>
      )}

      <div className="border-t border-white/10 bg-[#101828]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-white md:px-10 lg:py-24 xl:px-16">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
            TattvaTech Ecosystem
          </p>
          <h2 className="mt-5 max-w-[10ch] font-heading text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.94] tracking-[-0.05em]">
            {businessVerticalsClosing.heading}
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg leading-8 text-white/72">
            {businessVerticalsClosing.description}
          </p>
        </div>
      </div>
    </section>
  );
}
