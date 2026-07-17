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
  principlesPanel: ReactNode;
  verticals: BusinessVertical[];
  enableStackedMotion: boolean;
};

export function StackedVerticalCards({
  principlesPanel,
  verticals,
  enableStackedMotion,
}: StackedVerticalCardsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const principlesRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      if (!enableStackedMotion) {
        return;
      }

      const section = sectionRef.current;
      const stage = stageRef.current;
      const principles = principlesRef.current;
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card instanceof HTMLElement,
      );

      if (!section || !stage || !principles || !cards.length) {
        return;
      }

      const layers = [principles, ...cards];

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
            yPercent: 0,
            zIndex: 10,
            pointerEvents: "auto",
          });

          cards.forEach((card, index) => {
            gsap.set(card, {
              yPercent: 100,
              zIndex: (index + 1) * 10,
            });
          });

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
