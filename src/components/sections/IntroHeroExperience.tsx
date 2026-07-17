"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar";
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
  navbarRootRef: MutableRefObject<HTMLElement | null>;
  heroRootRef: MutableRefObject<HTMLElement | null>;
  heroVisualRef: MutableRefObject<HTMLDivElement | null>;
  heroContentPanelRef: MutableRefObject<HTMLDivElement | null>;
  heroLabelRef: MutableRefObject<HTMLDivElement | null>;
  heroHeadingRef: MutableRefObject<HTMLHeadingElement | null>;
  heroBodyRef: MutableRefObject<HTMLParagraphElement | null>;
  heroActionsRef: MutableRefObject<HTMLDivElement | null>;
  navbarRevealRef: MutableRefObject<HTMLDivElement | null>;
  navbarLogoTargetRef: MutableRefObject<HTMLDivElement | null>;
  navbarSymbolRef: MutableRefObject<HTMLDivElement | null>;
  navbarContentRef: MutableRefObject<HTMLDivElement | null>;
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
  const [navbarReady, setNavbarReady] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();
  const effectiveIntroPhase: IntroPhase = prefersReducedMotion ? "complete" : introPhase;
  const effectiveNavbarReady = prefersReducedMotion || navbarReady;

  const navbarRootRef = useRef<HTMLElement | null>(null);
  const heroRootRef = useRef<HTMLElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const heroContentPanelRef = useRef<HTMLDivElement | null>(null);
  const heroLabelRef = useRef<HTMLDivElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroBodyRef = useRef<HTMLParagraphElement | null>(null);
  const heroActionsRef = useRef<HTMLDivElement | null>(null);
  const navbarRevealRef = useRef<HTMLDivElement | null>(null);
  const navbarLogoTargetRef = useRef<HTMLDivElement | null>(null);
  const navbarSymbolRef = useRef<HTMLDivElement | null>(null);
  const navbarContentRef = useRef<HTMLDivElement | null>(null);

  const introOverlayRef = useRef<HTMLDivElement | null>(null);
  const introCompositionRef = useRef<HTMLDivElement | null>(null);
  const leftTRef = useRef<HTMLSpanElement | null>(null);
  const centerLogoRef = useRef<HTMLDivElement | null>(null);
  const rightTRef = useRef<HTMLSpanElement | null>(null);
  const previewAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    void Promise.all([
      loadImage(introAssets.logo),
      loadImage("/brand/tattvatech-symbol.png"),
      loadImage(introAssets.hero),
    ]).then(() => {
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

    const navbarRoot = navbarRootRef.current;
    const introOverlay = introOverlayRef.current;
    const introComposition = introCompositionRef.current;
    const leftT = leftTRef.current;
    const centerLogo = centerLogoRef.current;
    const rightT = rightTRef.current;
    const previewAnchor = previewAnchorRef.current;
    const heroRoot = heroRootRef.current;
    const heroVisual = heroVisualRef.current;
    const heroContentPanel = heroContentPanelRef.current;
    const heroLabel = heroLabelRef.current;
    const heroHeading = heroHeadingRef.current;
    const heroBody = heroBodyRef.current;
    const heroActions = heroActionsRef.current;
    const navbarReveal = navbarRevealRef.current;
    const navbarLogoTarget = navbarLogoTargetRef.current;
    const navbarSymbol = navbarSymbolRef.current;
    const navbarContent = navbarContentRef.current;

    if (
      !introOverlay ||
      !introComposition ||
      !navbarRoot ||
      !leftT ||
      !centerLogo ||
      !rightT ||
      !previewAnchor ||
      !heroRoot ||
      !heroVisual ||
      !heroContentPanel ||
      !heroLabel ||
      !heroHeading ||
      !heroBody ||
      !heroActions ||
      !navbarReveal ||
      !navbarLogoTarget ||
      !navbarSymbol ||
      !navbarContent
    ) {
      return;
    }

    let timeline: gsap.core.Timeline | undefined;
    const ctx = gsap.context(() => {
      const previewRect = previewAnchor.getBoundingClientRect();
      const visualRect = heroVisual.getBoundingClientRect();
      const logoRect = centerLogo.getBoundingClientRect();
      const navbarRect = navbarLogoTarget.getBoundingClientRect();
      const logoScale = navbarRect.width / logoRect.width;
      const logoMoveX =
        navbarRect.left + navbarRect.width / 2 - (logoRect.left + logoRect.width / 2);
      const logoMoveY =
        navbarRect.top + navbarRect.height / 2 - (logoRect.top + logoRect.height / 2);
      const previewCenterX = previewRect.left + previewRect.width / 2;
      const previewCenterY = previewRect.top + previewRect.height / 2;
      const tinyPreviewWidth = clampValue(window.innerWidth * 0.1, 120, 150);
      const tinyPreviewHeight = clampValue(window.innerHeight * 0.11, 90, 120);
      const previewWidth = clampValue(window.innerWidth * 0.28, 340, 420);
      const previewHeight = clampValue(window.innerHeight * 0.24, 220, 260);
      const tinyPreviewLeft = previewCenterX - tinyPreviewWidth / 2;
      const tinyPreviewTop = previewCenterY - tinyPreviewHeight / 2;
      const previewLeft = previewCenterX - previewWidth / 2;
      const previewTop = previewCenterY - previewHeight / 2;
      const tinyScaleX = tinyPreviewWidth / visualRect.width;
      const tinyScaleY = tinyPreviewHeight / visualRect.height;
      const previewScaleX = previewWidth / visualRect.width;
      const previewScaleY = previewHeight / visualRect.height;
      const tinyX = tinyPreviewLeft - visualRect.left;
      const tinyY = tinyPreviewTop - visualRect.top;
      const previewX = previewLeft - visualRect.left;
      const previewY = previewTop - visualRect.top;
      const leftSplitDistance = -Math.max(window.innerWidth * 0.32, 180);
      const rightSplitDistance = Math.max(window.innerWidth * 0.32, 180);

      gsap.set(introComposition, { autoAlpha: 1 });
      gsap.set([leftT, centerLogo, rightT], { autoAlpha: 0, y: 28, visibility: "hidden" });
      gsap.set(navbarRoot, { autoAlpha: 0, visibility: "hidden", pointerEvents: "none" });
      gsap.set(navbarReveal, { autoAlpha: 0, y: -10 });
      gsap.set(navbarContent, { autoAlpha: 0, y: -8, visibility: "hidden", pointerEvents: "none" });
      gsap.set(navbarSymbol, {
        autoAlpha: 0,
        visibility: "hidden",
        transformOrigin: "center center",
      });
      gsap.set(heroRoot, { autoAlpha: 1, visibility: "visible" });
      gsap.set(heroVisual, {
        autoAlpha: 0,
        x: tinyX,
        y: tinyY,
        scaleX: tinyScaleX,
        scaleY: tinyScaleY,
        transformOrigin: "top left",
      });
      gsap.set(heroContentPanel, {
        autoAlpha: 0,
        x: 40,
        clipPath: "inset(0 0 0 100%)",
      });
      gsap.set([heroLabel, heroHeading, heroBody, heroActions], { autoAlpha: 0, y: 24 });

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
            x: leftSplitDistance,
            duration: introTimings.split,
            ease: introEase.expand,
          },
          "separate",
        )
        .to(
          rightT,
          {
            x: rightSplitDistance,
            duration: introTimings.split,
            ease: introEase.expand,
          },
          "separate",
        )
        .to(
          heroVisual,
          {
            autoAlpha: 1,
            x: previewX,
            y: previewY,
            scaleX: previewScaleX,
            scaleY: previewScaleY,
            duration: introTimings.previewReveal,
            ease: "power2.out",
          },
          "separate+=0.34",
        )
        .to(
          introComposition,
          {
            autoAlpha: 0,
            duration: 0.18,
            ease: "power1.out",
          },
          "separate+=0.34",
        )
        .addLabel("heroExpand", "separate+=0.56")
        .to(
          heroVisual,
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: introTimings.previewExpand,
            ease: introEase.expand,
          },
          "heroExpand",
        )
        .to(
          centerLogo,
          {
            x: logoMoveX,
            y: logoMoveY,
            scale: logoScale,
            duration: introTimings.logoToNavbar,
            ease: introEase.expand,
          },
          "heroExpand+=0.28",
        )
        .to(
          heroContentPanel,
          {
            autoAlpha: 1,
            x: 0,
            clipPath: "inset(0 0 0 0)",
            duration: 0.62,
            ease: introEase.expand,
          },
          "heroExpand+=0.72",
        )
        .to(
          navbarRoot,
          {
            autoAlpha: 1,
            visibility: "visible",
            duration: 0.01,
          },
          "heroExpand+=0.76",
        )
        .to(
          navbarReveal,
          {
            autoAlpha: 1,
            y: 0,
            duration: introTimings.navbarReveal,
          },
          "heroExpand+=0.76",
        )
        .to(
          navbarContent,
          {
            autoAlpha: 1,
            visibility: "visible",
            y: 0,
            duration: 0.42,
            pointerEvents: "auto",
          },
          "heroExpand+=0.82",
        )
        .to(
          heroLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
          },
          "heroExpand+=0.9",
        )
        .to(
          heroHeading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
          },
          "heroExpand+=0.98",
        )
        .set(navbarRoot, {
          autoAlpha: 1,
          visibility: "visible",
          pointerEvents: "auto",
          clearProps: "transform",
        })
        .set([navbarReveal, navbarSymbol, navbarContent], {
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
          "heroExpand+=1.06",
        )
        .to(
          heroActions,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
          },
          "heroExpand+=1.16",
        )
        .to(
          navbarSymbol,
          {
            autoAlpha: 1,
            visibility: "visible",
            duration: 0.22,
            ease: "power1.out",
          },
          "heroExpand+=0.96",
        )
        .to(
          centerLogo,
          {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power1.in",
          },
          "heroExpand+=0.96",
        )
        .to(
          [leftT, rightT],
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.36,
          },
          "heroExpand+=0.88",
        )
        .to(
          introOverlay,
          {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: introTimings.overlayFade,
          },
          "heroExpand+=1.28",
        )
        .set(heroVisual, { clearProps: "transform" })
        .set(heroContentPanel, { clearProps: "transform,clipPath" })
        .call(() => {
          setNavbarReady(true);
          setIntroPhase("complete");
        });
    }, introOverlay);

    return () => {
      timeline?.kill();
      ctx.revert();
    };
  }, [assetsReady, prefersReducedMotion]);

  const sharedRefs: IntroRefs = {
    navbarRootRef,
    heroRootRef,
    heroVisualRef,
    heroContentPanelRef,
    heroLabelRef,
    heroHeadingRef,
    heroBodyRef,
    heroActionsRef,
    navbarRevealRef,
    navbarLogoTargetRef,
    navbarSymbolRef,
    navbarContentRef,
  };

  return (
    <div className="relative">
      <Hero
        refs={sharedRefs}
        navbar={<Navbar navbarReady={effectiveNavbarReady} refs={sharedRefs} />}
      />

      {effectiveIntroPhase !== "complete" ? (
        <div
          ref={introOverlayRef}
          aria-hidden="true"
          className="intro-overlay fixed inset-0 z-[10000] overflow-hidden bg-background pointer-events-none"
        >
          <div
            ref={introCompositionRef}
            className="absolute inset-0 bg-background"
          />
          <div className="absolute left-1/2 bottom-[clamp(28px,5vh,64px)] z-[2] w-full max-w-[980px] -translate-x-1/2 px-4 sm:px-6">
            <div className="mx-auto flex items-end justify-center gap-[clamp(1rem,5vw,6rem)]">
              <span
                ref={leftTRef}
                className="invisible opacity-0 font-heading text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-[-0.05em] text-text-primary"
              >
                T
              </span>

              <div className="relative flex flex-col items-center">
                <div
                  ref={previewAnchorRef}
                  aria-hidden="true"
                  className="absolute bottom-[calc(100%+clamp(2rem,5vh,4rem))] left-1/2 h-[180px] w-[min(78vw,300px)] -translate-x-1/2 rounded-2xl bg-transparent opacity-0 pointer-events-none sm:h-[200px] sm:w-[360px] lg:h-[220px] lg:w-[400px]"
                />
                <div
                  ref={centerLogoRef}
                  data-intro-logo
                  className="invisible relative w-[clamp(72px,9vw,140px)] bg-transparent opacity-0 will-change-transform"
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
                className="invisible opacity-0 font-heading text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-[-0.05em] text-text-primary"
              >
                T
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
