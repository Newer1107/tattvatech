"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { StackedVerticalCards } from "@/components/animations/StackedVerticalCards";
import { gsap, motionMedia, ScrollTrigger, useGSAP } from "@/animations/config";
import {
  businessPrinciples,
  businessVerticals,
  businessVerticalsIntro,
} from "@/constants/verticals";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const principleToneClassNames = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  accent: "text-orange-primary",
  inverse: "text-white/[0.94]",
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
      const labels = gsap.utils.toArray<HTMLElement>("[data-principle-label]", root);
      const words = gsap.utils.toArray<HTMLElement>("[data-principle-word]", root);
      const lines = gsap.utils.toArray<HTMLElement>("[data-principle-line]", root);
      const dots = gsap.utils.toArray<HTMLElement>("[data-principle-dot]", root);
      const chars = gsap.utils.toArray<HTMLElement>("[data-support-char]", root);

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

          setHoverReady(Boolean(desktop && !reduceMotion));

          if (reduceMotion) {
            gsap.set([background, ...labels, ...words, ...lines, ...dots, ...chars], {
              clearProps: "all",
            });
            return;
          }

          if (background) {
            gsap.set(background, { scale: 1.04, y: -8, transformOrigin: "center center" });

            gsap.to(background, {
              y: 10,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
              },
            });
          }

          gsap.set(labels, { autoAlpha: 0, y: 10 });
          gsap.set(lines, { scaleX: 0, transformOrigin: "left center", autoAlpha: 0.6 });
          gsap.set(dots, { autoAlpha: 0.4, scale: 0.68, transformOrigin: "center center" });
          gsap.set(chars, { autoAlpha: 0, yPercent: 60 });

          words.forEach((word, index) => {
            const inset = index % 2 === 0 ? "0 100% 0 0" : "0 0 0 100%";
            gsap.set(word, { clipPath: `inset(${inset})` });
          });

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: root,
              start: desktop ? "top 62%" : "top 78%",
              once: true,
            },
            onComplete: () => setHoverReady(Boolean(desktop)),
          });

          timeline
            .to(
              words,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.78,
                stagger: 0.08,
              },
              0,
            )
            .to(
              chars,
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.42,
                stagger: 0.014,
                ease: "power2.out",
              },
              0.18,
            )
            .to(
              lines,
              {
                scaleX: 1,
                autoAlpha: 0.85,
                duration: 0.46,
                stagger: 0.04,
                ease: "power2.out",
              },
              0.26,
            )
            .to(
              labels,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.34,
            )
            .to(
              dots,
              {
                autoAlpha: 0.72,
                scale: 1,
                duration: 0.4,
                stagger: 0.04,
                ease: "power2.out",
              },
              0.4,
            );

          if (desktop) {
            ScrollTrigger.refresh();
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const supportCharacters = Array.from(businessVerticalsIntro.description);

  return (
    <div
      ref={rootRef}
      className="relative flex w-full items-stretch overflow-hidden bg-background-warm lg:h-full lg:min-h-[95svh] xl:min-h-[100svh]"
    >
      <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(16,24,40,0.18))]" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {businessPrinciples.map((principle, index) => {
          const isActive = activeIndex === index;
          const isNearby =
            activeIndex !== null &&
            businessPrinciples[activeIndex]?.relatedIndexes?.includes(index);

          return (
            <div key={`${principle.word}-decoration`}>
              <span
                data-principle-line
                className={cn(
                  "absolute h-px bg-[linear-gradient(90deg,rgba(245,90,10,0.12),rgba(245,90,10,0.88),rgba(245,90,10,0))] transition-opacity duration-300",
                  principle.lineClassName,
                  activeIndex === null
                    ? "opacity-45"
                    : isActive || isNearby
                      ? "opacity-100"
                      : "opacity-18",
                )}
              />
              <span
                data-principle-dot
                className={cn(
                  "absolute h-2.5 w-2.5 rounded-full bg-orange-primary/90 shadow-[0_0_0_1px_rgba(245,90,10,0.12)] transition-all duration-300",
                  principle.markerClassName,
                  activeIndex === null
                    ? "opacity-70"
                    : isActive || isNearby
                      ? "opacity-100"
                      : "opacity-25",
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col px-6 py-14 sm:px-8 md:px-10 md:py-16 lg:h-full lg:px-[clamp(32px,5vw,84px)] lg:py-[clamp(28px,4vw,48px)]">
        <div className="flex flex-col gap-4 lg:hidden">
          <p
            data-principle-label
            className="text-[13px] font-medium uppercase tracking-[0.18em] text-[rgba(16,24,40,0.65)]"
          >
            {businessVerticalsIntro.label}
          </p>
          <p className="max-w-[20ch] text-[clamp(18px,5vw,24px)] leading-[1.45] text-text-secondary">
            {businessVerticalsIntro.description}
          </p>
        </div>

        <div className="relative mt-12 flex flex-col gap-8 lg:mt-0 lg:h-full lg:gap-0">
          <div className="relative hidden lg:block lg:h-full">
            <div className="absolute left-[8%] top-[8%] max-w-[18rem]">
              <p
                data-principle-label
                className="text-[13px] font-medium uppercase tracking-[0.18em] text-[rgba(16,24,40,0.65)]"
              >
                {businessVerticalsIntro.label}
              </p>
            </div>

            <div className="absolute right-[10%] top-[12%] max-w-[24rem] text-right">
              <p
                data-principle-label
                className="text-[13px] font-medium uppercase tracking-[0.18em] text-[rgba(16,24,40,0.65)]"
              >
                TattvaTech philosophy
              </p>
              <p className="mt-5 max-w-[22ch] justify-self-end text-[clamp(18px,1.3vw,24px)] leading-[1.35] text-text-secondary">
                {supportCharacters.map((character, index) => (
                  <span
                    key={`${character}-${index}`}
                    data-support-char
                    className="inline-block whitespace-pre"
                  >
                    {character}
                  </span>
                ))}
              </p>
            </div>

            {businessPrinciples.map((principle, index) => {
              const isActive = activeIndex === index;
              const isNearby =
                activeIndex !== null &&
                businessPrinciples[activeIndex]?.relatedIndexes?.includes(index);
              const isDimmed = activeIndex !== null && !isActive && !isNearby;

              return (
                <div
                  key={principle.word}
                  className={cn(
                    "absolute z-[3]",
                    principle.desktopClassName,
                    isDimmed && "opacity-35",
                    (isActive || isNearby) && "opacity-100",
                    activeIndex === null && "opacity-100",
                  )}
                >
                  <button
                    type="button"
                    data-principle-word
                    data-principle-hover
                    className={cn(
                      "cursor-default text-balance font-heading text-[clamp(42px,5vw,82px)] leading-[0.9] tracking-[-0.07em] transition-[color,opacity,filter] duration-300 focus:outline-none",
                      principleToneClassNames[principle.tone],
                      hoverReady && isActive && "text-orange-primary",
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
              );
            })}
          </div>

          <div className="flex flex-col gap-6 pt-2 lg:hidden">
            {businessPrinciples.map((principle, index) => (
              <div
                key={principle.word}
                className={cn(
                  "border-b border-[rgba(16,24,40,0.08)] pb-5 last:border-b-0 last:pb-0",
                  principle.mobileClassName,
                )}
              >
                <p
                  data-principle-word
                  className={cn(
                    "font-heading text-[clamp(42px,14vw,64px)] leading-[0.92] tracking-[-0.07em]",
                    principleToneClassNames[principle.tone === "inverse" ? "primary" : principle.tone],
                  )}
                >
                  {principle.word}
                </p>
                <div
                  data-principle-line
                  className="mt-4 h-px w-16 bg-[linear-gradient(90deg,rgba(245,90,10,0.92),rgba(245,90,10,0))]"
                />
                {index === businessPrinciples.length - 1 ? (
                  <p className="mt-5 max-w-[18ch] text-[clamp(18px,5vw,22px)] leading-[1.4] text-text-secondary">
                    {supportCharacters.map((character, charIndex) => (
                      <span
                        key={`${character}-${charIndex}`}
                        data-support-char
                        className="inline-block whitespace-pre"
                      >
                        {character}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
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
