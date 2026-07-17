"use client";

import Image from "next/image";
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

export function Summary() {
  const rootRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
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
    { scope: rootRef },
  );

  return (
    <SectionContainer
      ref={rootRef}
      id="summary"
      className="relative z-[2] -mt-16 px-0 md:-mt-20 lg:-mt-24"
    >
      <div className="overflow-hidden rounded-[32px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(252,251,249,0.98)_100%)] shadow-[0_30px_80px_rgba(16,24,40,0.08)]">
        <div className="relative px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_20%_0%,rgba(255,168,0,0.14),transparent_42%),radial-gradient(circle_at_78%_0%,rgba(245,90,10,0.12),transparent_30%)]"
          />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.88fr)] lg:gap-16">
            <div>
              <SectionLabel>{summaryIntro.label}</SectionLabel>
              <SectionHeading className="mt-5 max-w-[14ch]">
                {summaryIntro.heading}
              </SectionHeading>

              <div className="mt-7 space-y-5">
                {summaryIntro.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[58ch] text-[1.02rem] leading-8 text-text-secondary lg:text-[1.08rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid gap-3 md:max-w-[40rem] md:grid-cols-3">
                {summarySignals.map((signal) => (
                  <div
                    key={signal}
                    data-summary-panel
                    className="rounded-[22px] border border-[rgba(16,24,40,0.08)] bg-white/72 px-4 py-4"
                  >
                    <p className="text-sm leading-6 text-text-primary">{signal}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-[28px] border border-[rgba(16,24,40,0.08)] bg-background-dark">
                <div className="relative min-h-[260px]">
                  <Image
                    src="/placeholders/summary-placeholder.jpg"
                    alt="TattvaTech summary visual placeholder"
                    fill
                    sizes="(max-width: 767px) 100vw, 38vw"
                    className="object-cover opacity-72"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,40,0.06)_0%,rgba(16,24,40,0.72)_100%)]" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-[1.05rem] top-3 bottom-3 w-px bg-[rgba(16,24,40,0.08)]" />
              <span
                ref={lineRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-[1.05rem] top-3 bottom-3 w-px origin-top bg-[image:var(--brand-gradient)]"
              />

              <div className="space-y-5">
                {summaryNarrative.map((item, index) => {
                  const vertical = businessVerticals[index];

                  return (
                    <article
                      key={item.title}
                      data-summary-card
                      className="relative rounded-[26px] border border-[rgba(16,24,40,0.08)] bg-white/88 p-6 shadow-[0_18px_48px_rgba(16,24,40,0.06)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative z-[1] mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-[rgba(16,24,40,0.12)] bg-white text-[0.76rem] font-semibold text-text-primary">
                          {vertical.number}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
                            {vertical.titleTop} {vertical.titleBottom}
                          </p>
                          <h3 className="mt-3 font-heading text-[1.65rem] leading-[1.02] tracking-[-0.04em] text-text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-4 text-[0.98rem] leading-7 text-text-secondary">
                            {item.copy}
                          </p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {vertical.capabilities.slice(0, 3).map((capability) => (
                              <li
                                key={capability}
                                className="rounded-full border border-[rgba(16,24,40,0.08)] bg-background-warm px-3 py-2 text-[0.82rem] font-medium text-text-primary"
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
      </div>
    </SectionContainer>
  );
}
