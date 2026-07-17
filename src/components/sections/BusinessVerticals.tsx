"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { StackedVerticalCards } from "@/components/animations/StackedVerticalCards";
import { gsap, motionMedia, useGSAP } from "@/animations/config";
import {
  businessPrinciples,
  businessVerticals,
  businessVerticalsIntro,
} from "@/constants/verticals";
import { SummaryPanel } from "@/components/sections/Summary";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const principleToneClassNames = {
  primary:
    "text-[#101828] [text-shadow:0_1px_8px_rgba(255,255,255,0.45)]",
  secondary:
    "text-[#344054] [text-shadow:0_1px_8px_rgba(255,255,255,0.4)]",
  accent:
    "text-orange-primary [text-shadow:0_1px_6px_rgba(255,255,255,0.38)]",
  inverse:
    "text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45),0_1px_2px_rgba(0,0,0,0.35)]",
} as const;

const backplateClassNames = {
  light:
    "bg-[linear-gradient(90deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.42)_65%,rgba(255,255,255,0)_100%)]",
  dark:
    "bg-[linear-gradient(90deg,rgba(16,24,40,0.7)_0%,rgba(16,24,40,0.35)_65%,rgba(16,24,40,0)_100%)]",
  darkReverse:
    "bg-[linear-gradient(270deg,rgba(16,24,40,0.7)_0%,rgba(16,24,40,0.35)_65%,rgba(16,24,40,0)_100%)]",
  lightReverse:
    "bg-[linear-gradient(270deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.42)_65%,rgba(255,255,255,0)_100%)]",
} as const;

function PrinciplesLayer() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverReady, setHoverReady] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const background = root.querySelector<HTMLElement>("[data-principles-bg]");
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: motionMedia.desktop,
          pointerFine: motionMedia.pointerFine,
          reduceMotion: motionMedia.reduceMotion,
        },
        (context) => {
          const { desktop, pointerFine, reduceMotion } = context.conditions as {
            desktop?: boolean;
            pointerFine?: boolean;
            reduceMotion?: boolean;
          };

          setHoverReady(Boolean(desktop && pointerFine && !reduceMotion));

          if (reduceMotion) {
            gsap.set(background, { clearProps: "all" });
            return;
          }

          if (background) {
            gsap.set(background, { scale: 1.025, y: -8, transformOrigin: "center center" });

            gsap.to(background, {
              y: 7,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
              },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative flex w-full items-stretch overflow-hidden bg-background-warm lg:h-full lg:min-h-[95svh] xl:min-h-[100svh]"
    >
      <div className="absolute inset-0 z-0">
        <div data-principles-bg className="absolute inset-[-2%]">
          <Image
            src="/images/principal-section.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(16,24,40,0.16))]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[3] hidden lg:block">
        {businessPrinciples.map((principle, index) => {
          const isActive = activeIndex === index;
          const isNearby =
            activeIndex !== null &&
            businessPrinciples[activeIndex]?.relatedIndexes?.includes(index);

          return (
            <div key={`${principle.word}-marker`}>
              <span
                data-principle-line
                className={cn(
                  "absolute h-px bg-[linear-gradient(90deg,rgba(245,90,10,0.18),rgba(245,90,10,0.92),rgba(245,90,10,0))] transition-opacity duration-300",
                  principle.lineClassName,
                  activeIndex === null
                    ? "opacity-45"
                    : isActive || isNearby
                      ? "opacity-100"
                      : "opacity-15",
                )}
              />
              <span
                data-principle-dot
                className={cn(
                  "absolute h-2 w-2 rounded-full bg-orange-primary transition-opacity duration-300",
                  principle.markerClassName,
                  activeIndex === null
                    ? "opacity-70"
                    : isActive || isNearby
                      ? "opacity-100"
                      : "opacity-18",
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col px-6 py-12 sm:px-8 md:px-10 md:py-14 lg:h-full lg:px-[clamp(6vw,7vw,8vw)] lg:py-[clamp(8vh,9vh,10vh)]">
        <div className="flex flex-col gap-8 lg:hidden">
          <div
            data-principles-backplate
            className={cn(
              "inline-flex w-fit max-w-full rounded-[8px] px-4 py-3",
              backplateClassNames.light,
            )}
          >
            <p
              data-principles-label
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[rgba(16,24,40,0.65)]"
            >
              {businessVerticalsIntro.label}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {businessPrinciples.map((principle) => (
              <div
                key={principle.word}
                data-principles-backplate
                className={cn(
                  "w-fit max-w-full rounded-[8px] px-4 py-3",
                  principle.tone === "inverse"
                    ? backplateClassNames.dark
                    : backplateClassNames.light,
                )}
              >
                <p
                  data-principle-word
                  className={cn(
                    "font-heading text-[clamp(3rem,14vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.04em]",
                    principleToneClassNames[
                      principle.tone === "secondary" ? "secondary" : principle.tone
                    ],
                  )}
                >
                  {principle.word}
                </p>
              </div>
            ))}
          </div>

          <div
            data-principles-backplate
            className={cn(
              "max-w-[28rem] rounded-[8px] px-4 py-3",
              backplateClassNames.dark,
            )}
          >
            <p
              data-principles-support
              className="text-[clamp(1rem,5vw,1.2rem)] leading-[1.35] text-white/[0.82] [text-shadow:0_2px_10px_rgba(0,0,0,0.45),0_1px_2px_rgba(0,0,0,0.35)]"
            >
              {businessVerticalsIntro.description}
            </p>
          </div>
        </div>

        <div className="relative hidden h-full lg:block">
          <div className="absolute left-[7%] top-[8%] z-[1]">
            <div
              data-principles-backplate
              className={cn(
                "w-fit rounded-[8px] px-4 py-3",
                backplateClassNames.light,
              )}
            >
              <p
                data-principles-label
                className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[rgba(16,24,40,0.65)]"
              >
                {businessVerticalsIntro.label}
              </p>
            </div>
          </div>

          <div className="absolute right-[8%] top-[12%] z-[1] max-w-[28rem]">
            <div
              data-principles-backplate
              className={cn(
                "rounded-[8px] px-4 py-3",
                backplateClassNames.lightReverse,
              )}
            >
              <p
                data-principles-support
                className="text-right text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.35] text-[#344054] [text-shadow:0_1px_8px_rgba(255,255,255,0.45)]"
              >
                {businessVerticalsIntro.description}
              </p>
            </div>
          </div>

          {businessPrinciples.map((principle, index) => {
            const isActive = activeIndex === index;
            const isNearby =
              activeIndex !== null &&
              businessPrinciples[activeIndex]?.relatedIndexes?.includes(index);
            const isDimmed = activeIndex !== null && !isActive && !isNearby;
            const backplateTone =
              principle.tone === "inverse"
                ? principle.word === "Responsibly."
                  ? backplateClassNames.darkReverse
                  : backplateClassNames.dark
                : principle.word === "Scale."
                  ? backplateClassNames.lightReverse
                  : backplateClassNames.light;

            return (
              <div
                key={principle.word}
                className={cn(
                  "absolute z-[2] transition-opacity duration-300",
                  principle.desktopClassName,
                  isDimmed && "opacity-30",
                )}
              >
                <div
                  data-principles-backplate
                  className={cn(
                    "inline-flex rounded-[8px] px-4 py-3",
                    backplateTone,
                    principle.word === "Scale." || principle.word === "Responsibly."
                      ? "justify-end"
                      : "",
                  )}
                >
                  <button
                    type="button"
                    data-principle-word
                    className={cn(
                      "cursor-default text-balance font-heading text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.04em] transition-colors duration-300 focus:outline-none",
                      principle.word === "Responsibly."
                        ? "text-[clamp(3.5rem,7vw,7.5rem)]"
                        : "",
                      principleToneClassNames[principle.tone],
                      hoverReady && isActive && principle.tone !== "accent" && "text-orange-primary",
                    )}
                    onMouseEnter={() => {
                      if (hoverReady) {
                        setActiveIndex(index);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hoverReady) {
                        setActiveIndex(null);
                      }
                    }}
                    onFocus={() => {
                      if (hoverReady) {
                        setActiveIndex(index);
                      }
                    }}
                    onBlur={() => {
                      if (hoverReady) {
                        setActiveIndex(null);
                      }
                    }}
                  >
                    {principle.word}
                  </button>
                </div>
              </div>
            );
          })}
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
        summaryPanel={<SummaryPanel animated={false} className="h-full" />}
        principlesPanel={<PrinciplesLayer />}
        verticals={businessVerticals}
        enableStackedMotion={enableStackedMotion}
      />
    </section>
  );
}
