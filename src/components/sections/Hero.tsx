"use client";

import type { MutableRefObject, ReactNode } from "react";
import { useRef } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HeroVisualFrame } from "@/components/hero/HeroVisualFrame";
import { ButtonLink } from "@/components/ui/Button";
import { HeroLabel } from "@/components/ui/HeroLabel";
import {
  motionEasings,
  motionMedia,
  motionScroll,
  useGSAP,
  gsap,
} from "@/animations/config";

type HeroRefs = {
  heroRootRef: MutableRefObject<HTMLElement | null>;
  heroVisualRef: MutableRefObject<HTMLDivElement | null>;
  heroContentPanelRef: MutableRefObject<HTMLDivElement | null>;
  heroLabelRef: MutableRefObject<HTMLDivElement | null>;
  heroHeadingRef: MutableRefObject<HTMLHeadingElement | null>;
  heroBodyRef: MutableRefObject<HTMLParagraphElement | null>;
  heroActionsRef: MutableRefObject<HTMLDivElement | null>;
};

type HeroProps = {
  refs: HeroRefs;
  navbar?: ReactNode;
  introHidden?: boolean;
};

export function Hero({ refs, navbar, introHidden = false }: HeroProps) {
  const {
    heroRootRef,
    heroVisualRef,
    heroContentPanelRef,
    heroLabelRef,
    heroHeadingRef,
    heroBodyRef,
    heroActionsRef,
  } = refs;
  const bridgeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = heroRootRef.current;
      const visual = heroVisualRef.current;
      const panel = heroContentPanelRef.current;
      const bridge = bridgeRef.current;

      if (!root || !visual || !panel || !bridge) {
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

          if (reduceMotion) {
            gsap.set([visual, panel, bridge], { clearProps: "all" });
            return;
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "bottom top+=18%" : "bottom top+=8%",
              scrub: motionScroll.scrub,
            },
          });

          timeline
            .to(
              visual,
              {
                scale: desktop ? 1.06 : 1.02,
                yPercent: desktop ? -6 : -2,
                ease: "none",
              },
              0,
            )
            .to(
              panel,
              {
                y: desktop ? -48 : -20,
                ease: "none",
              },
              0,
            )
            .to(
              bridge,
              {
                yPercent: desktop ? -38 : -12,
                scaleX: desktop ? 1.04 : 1.01,
                ease: motionEasings.precise,
              },
              0,
            );
        },
      );

      return () => mm.revert();
    },
    { dependencies: [introHidden], scope: heroRootRef },
  );

  return (
    <section
      id="home"
      ref={heroRootRef}
      className={[
        "hero-root relative w-full min-h-[100svh] overflow-hidden bg-background px-0 py-0",
        introHidden ? "invisible opacity-0 pointer-events-none" : "",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(255,168,0,0.16),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(245,90,10,0.12),transparent_18%),linear-gradient(180deg,#ffffff_0%,#fcfbf9_100%)]" />

      <div className="hero-grid relative grid min-h-[100svh] grid-rows-[minmax(42svh,48svh)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.12fr)_minmax(380px,0.88fr)] lg:grid-rows-1">
        <div className="relative min-h-[42svh] px-4 pt-[96px] pb-4 md:px-6 md:pt-[112px] lg:min-h-[100svh] lg:px-8 lg:pt-[118px] lg:pb-8">
          <div
            ref={heroVisualRef}
            className="relative h-full min-h-[40svh] overflow-hidden rounded-[28px] border border-[rgba(16,24,40,0.08)] bg-background-dark shadow-[0_30px_90px_rgba(16,24,40,0.18)] will-change-transform lg:min-h-[calc(100svh-156px)] lg:rounded-[34px]"
          >
            <HeroVisualFrame />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 px-5 py-5 md:px-6">
              {["Services", "Products", "Drones", "Training"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/14 bg-white/8 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/72 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={heroContentPanelRef}
          className="relative z-[3] flex min-h-[52svh] lg:min-h-[100svh]"
        >
          <div className="hero-content-wrapper relative z-[10] flex min-h-full w-full items-center px-6 pt-10 pb-16 md:px-8 lg:px-10 lg:pt-[132px] lg:pb-20">
            <PageContainer className="flex max-w-[560px] justify-start px-0">
              <div className="max-w-[500px] text-left">
                <div ref={heroLabelRef}>
                  <HeroLabel>Parent technology brand</HeroLabel>
                </div>

                <h1
                  ref={heroHeadingRef}
                  className="mt-8 max-w-[8ch] font-heading text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-text-primary"
                >
                  Technology built with purpose.
                </h1>

                <p
                  ref={heroBodyRef}
                  className="mt-7 max-w-[40ch] text-[clamp(1rem,1.4vw,1.18rem)] leading-8 text-text-secondary"
                >
                  TattvaTech brings services, products, drones, and training into one clear operating system for practical technology work.
                </p>

                <div
                  ref={heroActionsRef}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <ButtonLink href="#summary">Explore TattvaTech</ButtonLink>
                  <ButtonLink href="#contact" variant="secondary">
                    Start a Project
                  </ButtonLink>
                </div>
              </div>
            </PageContainer>
          </div>
        </div>
      </div>

      <div
        ref={bridgeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[6%] bottom-[-12%] z-[2] h-[24svh] min-h-[180px] rounded-[32px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(252,251,249,0.98)_100%)] shadow-[0_24px_80px_rgba(16,24,40,0.08)]"
      />

      {navbar}
    </section>
  );
}
