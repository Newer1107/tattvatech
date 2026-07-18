"use client";
import { useRef, useState } from "react";
import { StackedVerticalCards } from "@/components/animations/StackedVerticalCards";
import { gsap, motionMedia, useGSAP } from "@/animations/config";
import {
  businessVerticals,
  businessVerticalsIntro,
} from "@/constants/verticals";
import { SummaryPanel } from "@/components/sections/Summary";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type PrinciplesDesktopItem = {
  id: string;
  number: string;
  word: string;
  lines?: [string, string];
  placement: string;
  accentOrigin: string;
  hoverShift: {
    x: number;
    y: number;
  };
  isLong?: boolean;
};

const principlesDesktopItems: PrinciplesDesktopItem[] = [
  {
    id: "observe",
    number: "01",
    word: "Observe.",
    placement:
      "justify-self-start self-start text-left lg:pt-[clamp(8px,1vh,18px)]",
    accentOrigin: "origin-left",
    hoverShift: { x: -4, y: -4 },
  },
  {
    id: "build",
    number: "02",
    word: "Build.",
    placement:
      "justify-self-end self-start text-right lg:pt-[clamp(8px,1vh,18px)]",
    accentOrigin: "origin-right ml-auto",
    hoverShift: { x: 4, y: -4 },
  },
  {
    id: "scale",
    number: "03",
    word: "Scale.",
    placement:
      "justify-self-start self-end text-left lg:pb-[clamp(4px,1vh,16px)]",
    accentOrigin: "origin-left",
    hoverShift: { x: -4, y: 4 },
  },
  {
    id: "evolve",
    number: "04",
    word: "Evolve responsibly.",
    lines: ["Evolve", "responsibly."],
    placement:
      "justify-self-end self-end text-right lg:pb-[clamp(4px,1vh,16px)]",
    accentOrigin: "origin-right ml-auto",
    isLong: true,
    hoverShift: { x: 4, y: 4 },
  },
] as const;

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
      const overlay = root.querySelector<HTMLElement>("[data-principles-overlay]");
      const header = root.querySelector<HTMLElement>("[data-principles-header]");
      const items = gsap.utils.toArray<HTMLElement>("[data-principle-item]", root);
      const accents = gsap.utils.toArray<HTMLElement>("[data-principle-accent]", root);
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
            gsap.set([background, overlay, header, ...items, ...accents], {
              clearProps: "all",
            });
            return;
          }

          if (background) {
            gsap.set(background, {
              scale: desktop ? 1.08 : 1.03,
              transformOrigin: "center center",
            });
          }

          if (overlay) {
            gsap.set(overlay, { opacity: desktop ? 0.92 : 1 });
          }

          if (header) {
            gsap.set(header, {
              autoAlpha: 0,
              y: 30,
            });
          }

          items.forEach((item, index) => {
            const fromValues = [
              { x: 80, y: 40 },
              { x: -80, y: 40 },
              { x: 80, y: -40 },
              { x: -80, y: -40 },
            ][index] ?? { x: 0, y: 24 };

            gsap.set(item, {
              autoAlpha: 0,
              x: fromValues.x,
              y: fromValues.y,
            });
          });

          gsap.set(accents, {
            scaleX: 0,
            transformOrigin: "left center",
            autoAlpha: 0.8,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: desktop ? "top 75%" : "top 82%",
              end: desktop ? "center center" : "center 60%",
              scrub: 1,
            },
          });

          if (background) {
            timeline.fromTo(
              background,
              { scale: desktop ? 1.08 : 1.03, y: 0 },
              { scale: 1, y: desktop ? -8 : -4, ease: "none" },
              0,
            );
          }

          if (header) {
            timeline.to(
              header,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
              },
              0,
            );
          }

          items.forEach((item, index) => {
            timeline.to(
              item,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.34,
              },
              0.1 + index * 0.06,
            );
          });

          accents.forEach((accent, index) => {
            timeline.to(
              accent,
              {
                scaleX: 1,
                autoAlpha: 1,
                duration: 0.24,
              },
              0.22 + index * 0.05,
            );
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="principles-section relative flex min-h-[100svh] w-full items-stretch overflow-hidden bg-background-warm"
    >
      <div className="absolute inset-0 z-0">
        <div
          data-principles-bg
          className="principles-background absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/principal-section.jpeg?v=20260717b')",
          }}
        />
        <div
          data-principles-overlay
          className="principles-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,29,0.52)_0%,rgba(8,17,29,0.20)_40%,rgba(8,17,29,0.58)_100%)]"
        />
      </div>

      <div className="relative z-[2] flex w-full flex-col">
        <div
          data-principles-header
          className="principles-header relative z-[2] grid grid-cols-1 gap-6 px-6 pt-[clamp(48px,7vh,88px)] sm:px-8 md:px-10 lg:grid-cols-[1fr_minmax(320px,500px)] lg:gap-12 lg:px-[clamp(48px,6vw,108px)]"
        >
          <div>
            <p
              data-principles-label
              className="principles-eyebrow text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#ff5a0a]"
            >
              {businessVerticalsIntro.label}
            </p>
          </div>

          <p
            data-principles-support
            className="principles-description max-w-[30ch] text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.45] text-white/82 lg:justify-self-end lg:text-left"
          >
            {businessVerticalsIntro.description}
          </p>
        </div>

        <div className="px-6 pb-10 pt-10 sm:px-8 md:px-10 lg:hidden">
          <ol className="flex flex-col gap-5">
            {principlesDesktopItems.map((item) => (
              <li
                key={item.id}
                data-principle-item
                className="list-none border-b border-white/12 pb-5"
              >
                <p className="principle-number mb-2 text-[0.75rem] tracking-[0.18em] text-[#ff5a0a]">
                  {item.number}
                </p>
                <div
                  data-principle-word
                  className={cn(
                    "font-heading leading-[0.92] tracking-[-0.055em] text-white",
                    item.isLong
                      ? "text-[clamp(2.4rem,9vw,3.8rem)]"
                      : "text-[clamp(2.8rem,11vw,4.5rem)]",
                  )}
                >
                  {item.lines ? (
                    <>
                      <span className="block">{item.lines[0]}</span>
                      <span className="block">{item.lines[1]}</span>
                    </>
                  ) : (
                    item.word
                  )}
                </div>
                <span
                  data-principle-accent
                  className="mt-3 block h-[2px] w-11 bg-[#ff5a0a]"
                />
              </li>
            ))}
          </ol>
        </div>

        <div
          className="principles-grid absolute inset-x-[clamp(48px,6vw,108px)] bottom-[clamp(54px,7vh,88px)] top-[clamp(180px,24vh,250px)] z-[2] hidden grid-cols-2 grid-rows-2 items-center lg:grid"
        >
          {principlesDesktopItems.map((item, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <div
                key={item.id}
                data-principle-item
                className={cn(
                  "transition-opacity duration-300",
                  item.placement,
                  isDimmed && "opacity-65",
                )}
              >
                <button
                  type="button"
                  data-principle-word
                  className={cn(
                    "group cursor-default focus:outline-none",
                    hoverReady && isActive && "text-white",
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
                  <p className="principle-number mb-[10px] text-[0.75rem] tracking-[0.18em] text-[#ff5a0a]">
                    {item.number}
                  </p>
                  <span
                    className={cn(
                      "principle-title block whitespace-nowrap font-heading font-medium leading-[0.9] tracking-[-0.055em] text-white transition-[opacity,transform] duration-300",
                      item.isLong
                        ? "text-[clamp(2.9rem,5.4vw,6.2rem)]"
                        : "text-[clamp(3.5rem,6.6vw,7.5rem)]",
                      hoverReady && isActive && "translate-y-[-2px] scale-[1.02]",
                    )}
                  >
                    {item.lines ? (
                      <>
                        <span className="block">{item.lines[0]}</span>
                        <span className="block">{item.lines[1]}</span>
                      </>
                    ) : (
                      item.word
                    )}
                  </span>
                  <span
                    data-principle-accent
                    className={cn(
                      "principle-accent mt-[14px] block h-[2px] w-11 bg-[#ff5a0a] transition-transform duration-300",
                      item.accentOrigin,
                      hoverReady && isActive && "scale-x-125",
                    )}
                  />
                </button>
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
