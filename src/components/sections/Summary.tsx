"use client";

import { useRef } from "react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { businessVerticals } from "@/constants/verticals";
import {
  summaryIntro,
  summaryNarrative,
  summarySignals,
} from "@/constants/home";
import {
  gsap,
  motionEasings,
  motionMedia,
  motionScroll,
  useGSAP,
} from "@/animations/config";
import { cn } from "@/lib/utils";

type SummaryPanelProps = {
  animated?: boolean;
  className?: string;
};

export function SummaryPanel({
  animated = true,
  className,
}: SummaryPanelProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!animated) {
        return;
      }

      const root = rootRef.current;
      const line = lineRef.current;

      if (!root || !line) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-summary-card]", root);
      const panels = gsap.utils.toArray<HTMLElement>("[data-summary-panel]", root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: motionMedia.desktop,
          reduceMotion: motionMedia.reduceMotion,
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop?: boolean;
            reduceMotion?: boolean;
          };

          if (reduceMotion) {
            gsap.set([line, ...cards, ...panels], { clearProps: "all", opacity: 1, x: 0, y: 0 });
            return;
          }

          gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top top" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 70%",
                end: "bottom 70%",
                scrub: motionScroll.scrub,
              },
            },
          );

          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                x: index % 2 === 0 ? -28 : 28,
              },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.7,
                ease: motionEasings.enter,
                scrollTrigger: {
                  trigger: card,
                  start: motionScroll.revealStart,
                  once: true,
                },
              },
            );
          });

          if (desktop) {
            panels.forEach((panel, index) => {
              gsap.fromTo(
                panel,
                { y: 28, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.75,
                  ease: motionEasings.enter,
                  scrollTrigger: {
                    trigger: panel,
                    start: `top ${78 - index * 4}%`,
                    once: true,
                  },
                },
              );
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [animated] },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "h-full overflow-hidden rounded-[32px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(252,251,249,0.98)_100%)] shadow-[0_30px_80px_rgba(16,24,40,0.08)]",
        className,
      )}
    >
      <div className="summary-inner relative h-full px-6 py-8 md:px-10 md:py-10 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] lg:items-center lg:gap-[clamp(40px,5vw,72px)] lg:px-[clamp(28px,6vw,88px)] lg:py-[clamp(24px,3.5vw,48px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_20%_0%,rgba(255,168,0,0.14),transparent_42%),radial-gradient(circle_at_78%_0%,rgba(245,90,10,0.12),transparent_30%)]"
        />

        <div className="min-w-0">
          <SectionLabel>{summaryIntro.label}</SectionLabel>
          <SectionHeading className="mt-4 max-w-[11ch] text-[clamp(3.25rem,5vw,6.2rem)] leading-[0.92] tracking-[-0.05em]">
            {summaryIntro.heading}
          </SectionHeading>

          <div className="mt-5 space-y-4">
            {summaryIntro.body.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[34ch] text-[0.96rem] leading-6 text-text-secondary lg:text-[1rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:max-w-[38rem] md:grid-cols-3">
            {summarySignals.map((signal) => (
              <div
                key={signal}
                data-summary-panel
                className="rounded-[18px] border border-[rgba(16,24,40,0.08)] bg-white/72 px-4 py-3"
              >
                <p className="text-[0.88rem] leading-5 text-text-primary">{signal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 lg:mt-0">
          <div className="pointer-events-none absolute left-[1.05rem] top-3 bottom-3 w-px bg-[rgba(16,24,40,0.08)]" />
          <span
            ref={lineRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-[1.05rem] top-3 bottom-3 w-px origin-top bg-[image:var(--brand-gradient)]"
          />

          <div className="space-y-3">
            {summaryNarrative.map((item, index) => {
              const vertical = businessVerticals[index];

              return (
                <article
                  key={item.title}
                  data-summary-card
                  className="relative rounded-[20px] border border-[rgba(16,24,40,0.08)] bg-white/88 px-5 py-[18px] shadow-[0_18px_48px_rgba(16,24,40,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative z-[1] mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-[rgba(16,24,40,0.12)] bg-white text-[0.76rem] font-semibold text-text-primary">
                      {vertical.number}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
                        {vertical.titleTop} {vertical.titleBottom}
                      </p>
                      <h3 className="mt-2 font-heading text-[1.22rem] leading-[1.05] tracking-[-0.04em] text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[0.88rem] leading-5 text-text-secondary">
                        {item.copy}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {vertical.capabilities.slice(0, 3).map((capability) => (
                          <li
                            key={capability}
                            className="rounded-full border border-[rgba(16,24,40,0.08)] bg-background-warm px-3 py-1 text-[0.74rem] font-medium text-text-primary"
                          >
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Summary() {
  return (
    <SectionContainer
      id="summary"
      className="summary-section relative z-[2] px-0 py-0 md:py-0 lg:h-[100svh] lg:min-h-[100svh] lg:max-h-[100svh] lg:overflow-hidden lg:py-0"
    >
      <SummaryPanel />
    </SectionContainer>
  );
}
