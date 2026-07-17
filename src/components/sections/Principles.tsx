"use client";

import { useRef } from "react";
import { gsap, motionMedia, useGSAP } from "@/animations/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  businessPrinciples,
  businessVerticalsIntro,
} from "@/constants/verticals";

export function Principles() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const mask = root.querySelector<HTMLElement>("[data-principles-mask]");
      const letter = root.querySelector<HTMLElement>("[data-principles-letter]");
      const heading = root.querySelector<HTMLElement>("[data-principles-heading]");
      const support = root.querySelector<HTMLElement>("[data-principles-support]");
      const items = gsap.utils.toArray<HTMLElement>("[data-principles-item]", root);

      if (!mask || !letter || !heading || !support) {
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: motionMedia.reduceMotion,
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion?: boolean;
          };

          if (reduceMotion) {
            gsap.set([mask, letter, heading, support, ...items], {
              clearProps: "all",
              autoAlpha: 1,
              y: 0,
            });
            return;
          }

          gsap.set(mask, { clipPath: "inset(0 0 100% 0)" });
          gsap.set(letter, { y: 36, autoAlpha: 0.12 });
          gsap.set(heading, { y: 24, autoAlpha: 0 });
          gsap.set(support, { y: 18, autoAlpha: 0 });
          gsap.set(items, { y: 14, autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          });

          tl.to(mask, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.45,
            ease: "power2.out",
          })
            .to(
              letter,
              {
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              0.06,
            )
            .to(
              heading,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.42,
                ease: "power3.out",
              },
              0.12,
            )
            .to(
              support,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.36,
                ease: "power2.out",
              },
              0.18,
            )
            .to(
              items,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.28,
                stagger: 0.04,
                ease: "power2.out",
              },
              0.24,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="principles"
      className="relative min-h-[100svh] overflow-hidden bg-background-dark"
    >
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1440px] items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.7fr)] lg:gap-16 xl:px-16">
        <div className="relative">
          <div
            data-principles-mask
            className="absolute inset-0 rounded-[32px] bg-background-dark"
            aria-hidden="true"
          />
          <div className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-background-dark px-6 py-8 text-white shadow-[0_28px_70px_rgba(16,24,40,0.22)] md:px-8 md:py-10 lg:px-10 lg:py-12">
            <div
              data-principles-letter
              aria-hidden="true"
              className="pointer-events-none absolute left-[-1.1rem] top-[-2.6rem] z-[0] font-heading text-[clamp(13rem,28vw,21rem)] leading-none tracking-[-0.08em] text-orange-primary opacity-[0.12]"
            >
              T
            </div>

            <div className="relative z-[2]">
              <SectionLabel>{businessVerticalsIntro.label}</SectionLabel>
              <div data-principles-heading className="mt-7">
                <h2 className="max-w-[9ch] whitespace-pre-line font-heading text-[clamp(3rem,6vw,6.2rem)] leading-[0.92] tracking-[-0.05em]">
                  {businessVerticalsIntro.heading}
                </h2>
              </div>

              <div className="mt-8 h-px w-full max-w-[240px] bg-[linear-gradient(90deg,rgba(255,168,0,0.95)_0%,rgba(245,90,10,0.4)_100%)]" />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {businessPrinciples.map((principle) => (
                  <div
                    key={principle.title}
                    data-principles-item
                    className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-primary">
                      {principle.title}
                    </p>
                    <p className="mt-3 max-w-[24ch] text-sm leading-7 text-white/72">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-principles-support className="max-w-[36ch] justify-self-end text-white">
          <p className="text-[0.84rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
            Why this matters
          </p>
          <p className="mt-5 text-[clamp(1.02rem,1.35vw,1.22rem)] leading-8 text-[#D0D5DD]">
            {businessVerticalsIntro.description}
          </p>
          <p className="mt-6 text-sm leading-7 text-white/46">
            The principles section introduces the operating mindset before the business verticals take over with the pinned card sequence.
          </p>
        </div>
      </div>
    </section>
  );
}
