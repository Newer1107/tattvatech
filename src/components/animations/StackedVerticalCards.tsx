"use client";

import { useRef } from "react";
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
};

export function StackedVerticalCards({
  verticals,
  enableStackedMotion,
}: StackedVerticalCardsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      if (!enableStackedMotion) {
        return;
      }

      const section = sectionRef.current;
      const stage = stageRef.current;
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card instanceof HTMLElement,
      );

      if (!section || !stage || !cards.length) {
        return;
      }

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
            gsap.set(cards, { clearProps: "all" });
            return;
          }

          const transitionCount = cards.length - 1;
          const transitionDistance = window.innerHeight * transitionCount;
          const finalHoldDistance = window.innerHeight * 0.45;
          const totalDistance = transitionDistance + finalHoldDistance;

          gsap.set(section, { position: "relative" });
          gsap.set(stage, {
            overflow: "hidden",
            isolation: "isolate",
          });
          gsap.set(cards, {
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

          cards.forEach((card, index) => {
            gsap.set(card, {
              yPercent: index === 0 ? 0 : 100,
              zIndex: (index + 1) * 10,
            });
          });

          gsap.set(cards[0], { pointerEvents: "auto" });

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

          cards.slice(1).forEach((incomingCard, index) => {
            const outgoingCard = cards[index];
            const label = `card-transition-${index}`;

            timeline.addLabel(label);
            timeline.set(incomingCard, { pointerEvents: "auto" }, label);
            timeline.to(
              incomingCard,
              {
                yPercent: 0,
                duration: 1,
              },
              label,
            );
            timeline.to(
              outgoingCard,
              {
                scale: 0.95,
                y: -16,
                filter: "brightness(0.8)",
                duration: 1,
              },
              label,
            );
            timeline.set(outgoingCard, { pointerEvents: "none" }, `${label}+=1`);
          });

          timeline.to({}, { duration: 0.45 });

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
        className="relative h-[100svh] w-full overflow-hidden [isolation:isolate]"
      >
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
