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
  verticals: BusinessVertical[];
  enableStackedMotion: boolean;
  principlesPanel?: ReactNode;
};

export function StackedVerticalCards({
  verticals,
  enableStackedMotion,
  principlesPanel,
}: StackedVerticalCardsProps) {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const principlesRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      if (!enableStackedMotion) {
        return;
      }

      const stage = stageRef.current;
      const principles = principlesRef.current;
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card instanceof HTMLElement,
      );

      if (!stage || !principles || !cards.length) {
        return;
      }

      const sheets = [principles, ...cards];
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
            gsap.set(sheets, { clearProps: "all" });
            return;
          }

          gsap.set(stage, {
            overflow: "hidden",
            transformPerspective: 1600,
            transformStyle: "preserve-3d",
          });
          gsap.set(principles, {
            yPercent: 0,
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            filter: "brightness(1)",
            transformOrigin: "center top",
          });
          gsap.set(cards, {
            yPercent: 100,
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            filter: "brightness(1)",
            transformOrigin: "center top",
          });

          sheets.forEach((sheet, index) => {
            gsap.set(sheet, { zIndex: index + 1 });
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${window.innerHeight * (cards.length + 1.05)}`,
              pin: true,
              scrub: motionScroll.scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, index) => {
            const previousSheet = sheets[index];
            const label = `card-${index + 1}`;

            timeline.addLabel(label);
            timeline.to(
              card,
              {
                yPercent: 0,
                duration: motionScroll.sectionDistance,
                ease: "none",
              },
              label,
            );
            timeline.to(
              previousSheet,
              {
                scale: 0.955,
                y: -24,
                filter: "brightness(0.8)",
                duration: motionScroll.sectionDistance,
                ease: "none",
              },
              label,
            );
          });

          const finalCard = cards[cards.length - 1];
          timeline.addLabel("final-exit");
          timeline.to(
            finalCard,
            {
              scale: 0.82,
              y: () => window.innerHeight * -0.08,
              rotateX: 6,
              rotateZ: -0.75,
              filter: "brightness(0.75)",
              duration: 1.05,
              ease: "none",
            },
            "final-exit",
          );

          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      );

      return () => mm.revert();
    },
    { dependencies: [enableStackedMotion], scope: stackRef },
  );

  if (!enableStackedMotion) {
    return (
      <div ref={stackRef} className="relative z-[2]">
        {verticals.map((vertical, index) => (
          <div key={vertical.id} className="pt-4 first:pt-0">
            <BusinessVerticalCard
              vertical={vertical}
              index={index}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={stackRef} className="relative z-[2]">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden [perspective:1600px]">
        <div ref={principlesRef} className="absolute inset-0">
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
              className="h-[100svh] w-full"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none h-px w-full" />
    </div>
  );
}
