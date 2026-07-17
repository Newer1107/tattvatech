"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import gsap from "gsap";
import { Hero } from "@/components/sections/Hero";
import {
  introAssets,
  introEase,
  introTimings,
  type IntroPhase,
} from "@/constants/intro-animation";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";

type IntroRefs = {
  heroRootRef: MutableRefObject<HTMLElement | null>;
  heroVisualRef: MutableRefObject<HTMLDivElement | null>;
  heroContentPanelRef: MutableRefObject<HTMLDivElement | null>;
  heroLabelRef: MutableRefObject<HTMLDivElement | null>;
  heroHeadingRef: MutableRefObject<HTMLHeadingElement | null>;
  heroBodyRef: MutableRefObject<HTMLDivElement | null>;
  heroActionsRef: MutableRefObject<HTMLDivElement | null>;
  heroChromeRef: MutableRefObject<HTMLDivElement | null>;
  heroLogoRef: MutableRefObject<HTMLAnchorElement | null>;
  heroControlsRef: MutableRefObject<HTMLDivElement | null>;
};

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.src = src;

    const finish = () => {
      if (typeof img.decode === "function") {
        img.decode().then(() => resolve()).catch(() => resolve());
        return;
      }

      resolve();
    };

    if (img.complete) {
      finish();
      return;
    }

    img.onload = finish;
    img.onerror = () => resolve();
  });
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function IntroHeroExperience() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("intro");
  const [assetsReady, setAssetsReady] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();
  const effectiveIntroPhase: IntroPhase = prefersReducedMotion ? "complete" : introPhase;

  const heroRootRef = useRef<HTMLElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const heroContentPanelRef = useRef<HTMLDivElement | null>(null);
  const heroLabelRef = useRef<HTMLDivElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroBodyRef = useRef<HTMLDivElement | null>(null);
  const heroActionsRef = useRef<HTMLDivElement | null>(null);
  const heroChromeRef = useRef<HTMLDivElement | null>(null);
  const heroLogoRef = useRef<HTMLAnchorElement | null>(null);
  const heroControlsRef = useRef<HTMLDivElement | null>(null);

  const introOverlayRef = useRef<HTMLDivElement | null>(null);
  const introBackdropRef = useRef<HTMLDivElement | null>(null);
  const lockupRef = useRef<HTMLDivElement | null>(null);
  const leftTRef = useRef<HTMLSpanElement | null>(null);
  const centerLogoRef = useRef<HTMLDivElement | null>(null);
  const rightTRef = useRef<HTMLSpanElement | null>(null);
  const previewAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    void Promise.all([loadImage(introAssets.logo)]).then(() => {
      if (!cancelled) {
        setAssetsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !assetsReady) {
      return;
    }

    const introOverlay = introOverlayRef.current;
    const introBackdrop = introBackdropRef.current;
    const lockup = lockupRef.current;
    const leftT = leftTRef.current;
    const centerLogo = centerLogoRef.current;
    const rightT = rightTRef.current;
    const previewAnchor = previewAnchorRef.current;
    const heroRoot = heroRootRef.current;
    const heroVisual = heroVisualRef.current;
    const heroLabel = heroLabelRef.current;
    const heroHeading = heroHeadingRef.current;
    const heroBody = heroBodyRef.current;
    const heroActions = heroActionsRef.current;
    const heroChrome = heroChromeRef.current;
    const heroLogo = heroLogoRef.current;
    const heroControls = heroControlsRef.current;

    if (
      !introOverlay ||
      !introBackdrop ||
      !lockup ||
      !leftT ||
      !centerLogo ||
      !rightT ||
      !previewAnchor ||
      !heroRoot ||
      !heroVisual ||
      !heroLabel ||
      !heroHeading ||
      !heroBody ||
      !heroActions ||
      !heroChrome ||
      !heroLogo ||
      !heroControls
    ) {
      return;
    }

    let timeline: gsap.core.Timeline | undefined;
    const ctx = gsap.context(() => {
      const previewRect = previewAnchor.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const leftTRect = leftT.getBoundingClientRect();
      const centerLogoRect = centerLogo.getBoundingClientRect();
      const rightTRect = rightT.getBoundingClientRect();
      const previewCenterX = previewRect.left + previewRect.width / 2;
      const previewCenterY = previewRect.top + previewRect.height / 2;
      const previewSize = clampValue(
        Math.min(window.innerWidth, window.innerHeight) * 0.26,
        190,
        280,
      );
      const previewWidth = previewSize;
      const previewHeight = previewSize;
      const previewWindowLeft = previewCenterX - previewWidth / 2;
      const previewWindowTop = previewCenterY - previewHeight / 2;
      const bottomMargin = clampValue(viewportWidth * 0.04, 28, 72);
      const leftTargetX = bottomMargin - leftTRect.left;
      const centerTargetX = viewportWidth / 2 - centerLogoRect.width / 2 - centerLogoRect.left;
      const rightTargetX =
        viewportWidth - bottomMargin - rightTRect.width - rightTRect.left;
      const exitDistance = clampValue(viewportHeight * 0.24, 140, 280);

      gsap.set(lockup, { x: 0, y: 0 });
      gsap.set([leftT, centerLogo, rightT], { autoAlpha: 0, y: 28, visibility: "hidden" });
      gsap.set(heroChrome, { autoAlpha: 0, visibility: "hidden", pointerEvents: "none" });
      gsap.set(heroLogo, { autoAlpha: 0, x: -18, visibility: "hidden" });
      gsap.set(heroControls, {
        autoAlpha: 0,
        y: -12,
        visibility: "hidden",
        pointerEvents: "none",
      });
      gsap.set(heroRoot, {
        autoAlpha: 0,
        visibility: "hidden",
        position: "fixed",
        top: previewWindowTop,
        left: previewWindowLeft,
        width: previewWidth,
        height: previewHeight,
        minHeight: "0px",
        overflow: "hidden",
        zIndex: 10000,
        pointerEvents: "none",
      });
      gsap.set(heroVisual, {
        autoAlpha: 1,
      });
      gsap.set(heroLabel, { autoAlpha: 0, y: 14 });
      gsap.set(heroHeading, { autoAlpha: 1, y: 0, clipPath: "inset(0 100% 0 0)" });
      gsap.set(heroBody, { autoAlpha: 0, y: 18 });
      gsap.set(heroActions, { autoAlpha: 0, y: 28 });

      timeline = gsap.timeline({
        defaults: { ease: introEase.reveal },
      });

      timeline
        .to({}, { duration: introTimings.whiteScreenHold })
        .to([leftT, centerLogo, rightT], {
          autoAlpha: 1,
          y: 0,
          visibility: "visible",
          duration: introTimings.compositionEnter,
        })
        .to({}, { duration: introTimings.compositionHold })
        .addLabel("separate")
        .to(
          leftT,
          {
            x: leftTargetX,
            duration: introTimings.split,
            ease: introEase.expand,
          },
          "separate",
        )
        .to(
          centerLogo,
          {
            x: centerTargetX,
            duration: introTimings.split,
            ease: introEase.expand,
          },
          "separate",
        )
        .to(
          rightT,
          {
            x: rightTargetX,
            duration: introTimings.split,
            ease: introEase.expand,
          },
          "separate",
        )
        .addLabel("windowOpen", "separate+=0.8")
        .set(
          heroRoot,
          {
            autoAlpha: 1,
            visibility: "visible",
          },
          "windowOpen",
        )
        .to(
          heroRoot,
          {
            top: previewWindowTop,
            left: previewWindowLeft,
            width: previewWidth,
            height: previewHeight,
            duration: introTimings.previewReveal,
            ease: "power2.out",
          },
          "windowOpen",
        )
        .addLabel("heroExpand", "windowOpen+=0.2")
        .to(
          heroRoot,
          {
            top: 0,
            left: 0,
            width: viewportWidth,
            height: viewportHeight,
            duration: introTimings.previewExpand + 0.12,
            ease: "power2.inOut",
          },
          "heroExpand",
        )
        .to(
          lockup,
          {
            y: exitDistance,
            duration: introTimings.previewExpand * 0.74,
            ease: "power2.in",
          },
          "heroExpand+=0.54",
        )
        .to(
          [leftT, centerLogo, rightT],
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.22,
            ease: "power1.inOut",
          },
          "heroExpand+=0.68",
        )
        .set(
          heroChrome,
          {
            autoAlpha: 1,
            visibility: "visible",
          },
          "heroExpand+=0.86",
        )
        .to(
          heroLogo,
          {
            autoAlpha: 1,
            x: 0,
            visibility: "visible",
            duration: introTimings.navbarReveal * 0.82,
            ease: "power2.out",
          },
          "heroExpand+=0.88",
        )
        .to(
          heroControls,
          {
            autoAlpha: 1,
            y: 0,
            visibility: "visible",
            duration: introTimings.navbarReveal,
            pointerEvents: "auto",
            ease: "power2.out",
          },
          "heroExpand+=0.94",
        )
        .to(
          heroLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
          },
          "heroExpand+=1.02",
        )
        .to(
          heroHeading,
          {
            clipPath: "inset(0 0 0 0)",
            duration: 0.32,
            ease: "power3.out",
          },
          "heroExpand+=1.08",
        )
        .set(heroChrome, {
          autoAlpha: 1,
          visibility: "visible",
          pointerEvents: "auto",
          clearProps: "transform",
        })
        .set([heroLogo, heroControls], {
          autoAlpha: 1,
          visibility: "visible",
          clearProps: "transform",
        })
        .to(
          heroBody,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
          },
          "heroExpand+=1.2",
        )
        .to(
          heroActions,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
          },
          "heroExpand+=1.3",
        )
        .to(
          introBackdrop,
          {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: introTimings.overlayFade,
          },
          "heroExpand+=1.24",
        )
        .to(
          introOverlay,
          {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: introTimings.overlayFade,
          },
          "heroExpand+=1.24",
        )
        .set(heroRoot, {
          clearProps: "top,left,width,height,minHeight,overflow,zIndex,pointerEvents,position",
        })
        .call(() => {
          setIntroPhase("complete");
        });
    }, introOverlay);

    return () => {
      timeline?.kill();
      ctx.revert();
    };
  }, [assetsReady, prefersReducedMotion]);

  const sharedRefs: IntroRefs = {
    heroRootRef,
    heroVisualRef,
    heroContentPanelRef,
    heroLabelRef,
    heroHeadingRef,
    heroBodyRef,
    heroActionsRef,
    heroChromeRef,
    heroLogoRef,
    heroControlsRef,
  };

  return (
    <div className="relative">
      <Hero refs={sharedRefs} introHidden={effectiveIntroPhase !== "complete"} />

      {effectiveIntroPhase !== "complete" ? (
        <>
          <div
            ref={introBackdropRef}
            aria-hidden="true"
            className="fixed inset-0 z-[9990] bg-white pointer-events-none"
          />
          <div
            ref={introOverlayRef}
            aria-hidden="true"
            className="intro-overlay fixed inset-0 z-[10010] overflow-hidden pointer-events-none"
          >
            <div
              ref={lockupRef}
              className="absolute right-[clamp(24px,4vw,72px)] bottom-[clamp(22px,4vh,48px)] z-[2] px-4 sm:px-6"
            >
              <div className="flex items-end justify-center gap-[clamp(1rem,5vw,6rem)]">
                <span
                  ref={leftTRef}
                  className="invisible opacity-0 font-heading text-[clamp(4rem,8vw,8rem)] leading-none tracking-[-0.05em] text-text-primary"
                >
                  T
                </span>

                <div className="relative flex flex-col items-center">
                  <div
                    ref={previewAnchorRef}
                    aria-hidden="true"
                    className="fixed top-1/2 left-1/2 h-[130px] w-[190px] -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-0 pointer-events-none sm:h-[150px] sm:w-[240px] lg:h-[220px] lg:w-[360px]"
                  />
                  <div
                    ref={centerLogoRef}
                    data-intro-logo
                    className="invisible relative w-[clamp(88px,10vw,152px)] bg-transparent opacity-0 will-change-transform"
                  >
                    <Image
                      src={introAssets.logo}
                      alt=""
                      width={140}
                      height={140}
                      priority
                      fetchPriority="high"
                      className="h-auto w-full object-contain object-center"
                    />
                  </div>
                </div>

                <span
                  ref={rightTRef}
                  className="invisible opacity-0 font-heading text-[clamp(4rem,8vw,8rem)] leading-none tracking-[-0.05em] text-text-primary"
                >
                  T
                </span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
