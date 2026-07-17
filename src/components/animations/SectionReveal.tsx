"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  gsap,
  motionDurations,
  motionEasings,
  motionMedia,
  motionScroll,
  useGSAP,
} from "@/animations/config";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  selector?: string;
  amount?: number;
};

export function SectionReveal({
  children,
  className,
  selector = "[data-reveal]",
  amount = 20,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const elements = gsap.utils.toArray<HTMLElement>(selector, root);

      if (!elements.length) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: motionMedia.reduceMotion,
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion?: boolean;
          };

          if (reduceMotion) {
            gsap.set(elements, { clearProps: "all", opacity: 1, y: 0 });
            return;
          }

          elements.forEach((element, index) => {
            const direction = element.dataset.revealDirection === "right" ? 1 : -1;
            const distance = element.dataset.revealAxis === "x" ? amount * direction : amount;

            gsap.fromTo(
              element,
              {
                autoAlpha: 0,
                x: element.dataset.revealAxis === "x" ? distance : 0,
                y: element.dataset.revealAxis === "x" ? 0 : amount,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: motionDurations.medium,
                ease: motionEasings.enter,
                delay: index * 0.04,
                scrollTrigger: {
                  trigger: element,
                  start: motionScroll.revealStart,
                  once: true,
                },
              },
            );
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cn(className)}>
      {children}
    </div>
  );
}
