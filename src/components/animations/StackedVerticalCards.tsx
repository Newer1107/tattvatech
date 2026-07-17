"use client";

import { useRef, type ReactNode } from "react";
import type { BusinessVertical } from "@/types";
import { BusinessVerticalCard } from "@/components/cards/BusinessVerticalCard";
import {
  gsap,
  motionMedia,
  motionScroll,
  ScrollTrigger,
  useGSAP,
} from "@/animations/config";

type StackedVerticalCardsProps = {
  summaryPanel?: ReactNode;
  principlesPanel: ReactNode;
  verticals: BusinessVertical[];
  enableStackedMotion: boolean;
};

export function StackedVerticalCards({
  summaryPanel,
  principlesPanel,
  verticals,
  enableStackedMotion,
}: StackedVerticalCardsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const principlesRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      if (!enableStackedMotion) {
        return;
      }

      const section = sectionRef.current;
      const stage = stageRef.current;
      const summary = summaryRef.current;
      const principles = principlesRef.current;
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card instanceof HTMLElement,
      );

      if (!section || !stage || !principles || !cards.length) {
        return;
      }

      const layers = summary ? [summary, principles, ...cards] : [principles, ...cards];
      const principleWords = gsap.utils.toArray<HTMLElement>("[data-principle-word]", principles);
      const principleLabel = principles.querySelector<HTMLElement>("[data-principles-label]");
      const principleSupport = principles.querySelector<HTMLElement>("[data-principles-support]");
      const principleLines = gsap.utils.toArray<HTMLElement>("[data-principle-line]", principles);
      const principleDots = gsap.utils.toArray<HTMLElement>("[data-principle-dot]", principles);
      const principleBackplates = gsap.utils.toArray<HTMLElement>("[data-principles-backplate]", principles);

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

          if (!desktop || reduceMotion) {
            gsap.set(layers, { clearProps: "all" });
            return;
          }

          const transitionCount = layers.length - 1;
          const transitionDistance = window.innerHeight * transitionCount;
          const finalHoldDistance = window.innerHeight * 0.4;
          const totalDistance = transitionDistance + finalHoldDistance;

          gsap.set(section, { position: "relative" });
          gsap.set(stage, {
            overflow: "hidden",
            isolation: "isolate",
          });
          gsap.set(layers, {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            willChange: "transform",
            scale: 1,
            y: 0,
            filter: "brightness(1)",
            autoAlpha: 1,
            transformOrigin: "center top",
            pointerEvents: "none",
          });

          gsap.set(principles, {
            yPercent: summary ? 100 : 0,
            zIndex: summary ? 20 : 10,
            pointerEvents: "auto",
          });

          if (summary) {
            gsap.set(summary, {
              yPercent: 0,
              zIndex: 10,
              pointerEvents: "auto",
            });
          }

          cards.forEach((card, index) => {
            gsap.set(card, {
              yPercent: 100,
              zIndex: (index + 3) * 10,
            });
          });

          gsap.set(principleBackplates, { autoAlpha: 0 });
          gsap.set(principleLines, { scaleX: 0, transformOrigin: "left center", autoAlpha: 0.28 });
          gsap.set(principleDots, { autoAlpha: 0.26, scale: 0.82, transformOrigin: "center center" });

          principleWords.forEach((word, index) => {
            const inset = index % 2 === 0 ? "100% 0 0 0" : "0 0 100% 0";
            gsap.set(word, { clipPath: `inset(${inset})`, y: 24 });
          });

          if (principleLabel) {
            gsap.set(principleLabel, { autoAlpha: 0 });
          }

          if (principleSupport) {
            gsap.set(principleSupport, { autoAlpha: 0, y: 14, clipPath: "inset(0 100% 0 0)" });
          }

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalDistance}`,
              pin: stage,
              pinSpacing: true,
              scrub: motionScroll.scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: false,
            },
          });

          if (summary) {
            timeline.addLabel("summary-transition", 0);
            timeline.to(
              summary,
              {
                scale: 0.94,
                yPercent: -6,
                autoAlpha: 0.45,
                filter: "brightness(0.82)",
                duration: 1,
              },
              "summary-transition",
            );
            timeline.to(
              principles,
              {
                yPercent: 0,
                duration: 1,
              },
              "summary-transition",
            );
            timeline.to(
              principleWords,
              {
                clipPath: "inset(0 0 0 0)",
                y: 0,
                stagger: 0.08,
                duration: 0.45,
                ease: "power3.out",
              },
              "summary-transition+=0.72",
            );
            timeline.to(
              principleBackplates,
              {
                autoAlpha: 1,
                duration: 0.24,
                stagger: 0.04,
                ease: "power2.out",
              },
              "summary-transition+=0.78",
            );
            timeline.to(
              principleLabel,
              {
                autoAlpha: 1,
                duration: 0.26,
                ease: "power2.out",
              },
              "summary-transition+=0.84",
            );
            timeline.to(
              principleSupport,
              {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0 0 0 0)",
                duration: 0.32,
                ease: "power2.out",
              },
              "summary-transition+=0.88",
            );
            timeline.to(
              principleLines,
              {
                scaleX: 1,
                autoAlpha: 0.82,
                duration: 0.32,
                stagger: 0.04,
                ease: "power2.out",
              },
              "summary-transition+=0.9",
            );
            timeline.to(
              principleDots,
              {
                autoAlpha: 0.92,
                scale: 1,
                duration: 0.24,
                stagger: 0.04,
                ease: "power2.out",
              },
              "summary-transition+=0.94",
            );
          } else {
            timeline.addLabel("principles-reveal", 0);
            timeline.to(
              principleWords,
              {
                clipPath: "inset(0 0 0 0)",
                y: 0,
                stagger: 0.08,
                duration: 0.45,
                ease: "power3.out",
              },
              "principles-reveal+=0.08",
            );
            timeline.to(
              principleBackplates,
              {
                autoAlpha: 1,
                duration: 0.24,
                stagger: 0.04,
                ease: "power2.out",
              },
              "principles-reveal+=0.14",
            );
            timeline.to(
              principleLabel,
              {
                autoAlpha: 1,
                duration: 0.24,
              },
              "principles-reveal+=0.2",
            );
            timeline.to(
              principleSupport,
              {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0 0 0 0)",
                duration: 0.28,
                ease: "power2.out",
              },
              "principles-reveal+=0.24",
            );
            timeline.to(
              principleLines,
              {
                scaleX: 1,
                autoAlpha: 0.82,
                duration: 0.3,
                stagger: 0.04,
                ease: "power2.out",
              },
              "principles-reveal+=0.28",
            );
            timeline.to(
              principleDots,
              {
                autoAlpha: 0.92,
                scale: 1,
                duration: 0.2,
                stagger: 0.04,
                ease: "power2.out",
              },
              "principles-reveal+=0.32",
            );
          }

          layers.slice(1).forEach((incomingLayer, index) => {
            const outgoingLayer = layers[index];
            const label = `card-transition-${index}`;

            timeline.addLabel(label);
            timeline.set(incomingLayer, { pointerEvents: "auto" }, label);
            timeline.to(
              incomingLayer,
              {
                yPercent: 0,
                duration: 1,
              },
              label,
            );
            timeline.to(
              outgoingLayer,
              {
                scale: 0.95,
                y: -16,
                filter: "brightness(0.8)",
                duration: 1,
              },
              label,
            );
            timeline.set(outgoingLayer, { pointerEvents: "none" }, `${label}+=1`);
          });

          timeline.to({}, { duration: 0.4 });

          void document.fonts.ready.then(() => ScrollTrigger.refresh());
        },
      );

      return () => mm.revert();
    },
    { dependencies: [enableStackedMotion], scope: sectionRef },
  );

  if (!enableStackedMotion) {
    return (
      <section ref={sectionRef} className="relative z-[2]">
        {summaryPanel ? <div id="summary" className="pb-4">{summaryPanel}</div> : null}
        <div className="overflow-hidden bg-background-dark">{principlesPanel}</div>
        {verticals.map((vertical, index) => (
          <div key={vertical.id} className="pt-4 first:pt-0">
            <BusinessVerticalCard
              vertical={vertical}
              index={index}
              priority={index === 0}
            />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative z-[2]">
      <div
        ref={stageRef}
        className="relative h-[95svh] w-full overflow-hidden [isolation:isolate] xl:h-[100svh]"
      >
        {summaryPanel ? (
          <div id="summary" ref={summaryRef} className="absolute inset-0 will-change-transform">
            {summaryPanel}
          </div>
        ) : null}
        <div ref={principlesRef} className="absolute inset-0 will-change-transform">
          {principlesPanel}
        </div>
        {verticals.map((vertical, index) => (
          <div
            key={vertical.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="absolute inset-0 will-change-transform"
          >
            <BusinessVerticalCard
              vertical={vertical}
              index={index}
              priority={index === 0}
              stacked
              className="h-full w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
