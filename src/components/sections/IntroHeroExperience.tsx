"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
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

function getClipPath(previewRect: DOMRect, targetRect: DOMRect, radius: number) {
  const top = Math.max(previewRect.top - targetRect.top, 0);
  const left = Math.max(previewRect.left - targetRect.left, 0);
  const right = Math.max(targetRect.right - previewRect.right, 0);
  const bottom = Math.max(targetRect.bottom - previewRect.bottom, 0);

  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
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
      const heroRect = heroVisual.getBoundingClientRect();
      const logoRect = centerLogo.getBoundingClientRect();
      const navbarRect = navbarLogoTarget.getBoundingClientRect();
      const logoScale = navbarRect.width / logoRect.width;
      const logoMoveX =
        navbarRect.left + navbarRect.width / 2 - (logoRect.left + logoRect.width / 2);
      const logoMoveY =
        navbarRect.top + navbarRect.height / 2 - (logoRect.top + logoRect.height / 2);
      const previewClipPath = getClipPath(previewRect, heroRect, 24);

      gsap.set(introComposition, { autoAlpha: 1 });
      gsap.set([leftT, centerLogo, rightT], { autoAlpha: 0, y: 30 });
      gsap.set(navbarRoot, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(navbarReveal, { autoAlpha: 0, y: -10 });
      gsap.set(navbarContent, { autoAlpha: 0, y: -8, pointerEvents: "none" });
      gsap.set(navbarSymbol, {
        autoAlpha: 0,
        transformOrigin: "center center",
      });
      gsap.set(heroRoot, { autoAlpha: 1, visibility: "visible" });
      gsap.set(heroVisual, {
        autoAlpha: 0,
        clipPath: previewClipPath,
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
          duration: introTimings.compositionEnter,
          stagger: 0.05,
        })
        .to({}, { duration: introTimings.compositionHold })
        .to(leftT, {
          x: () => -Math.max(window.innerWidth * 0.36, 160),
          autoAlpha: 0.82,
          duration: introTimings.split,
        })
        .to(
          rightT,
          {
            x: () => Math.max(window.innerWidth * 0.36, 160),
            autoAlpha: 0.82,
            duration: introTimings.split,
          },
          "<",
        )
        .to(
          heroVisual,
          {
            autoAlpha: 1,
            duration: 0.26,
          },
          "-=0.18",
        )
        .to(
          introComposition,
          {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power1.out",
          },
          "<",
        )
        .to(
          heroVisual,
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            duration: 1.5,
            ease: introEase.expand,
          },
          "-=0.02",
        )
        .to(
          centerLogo,
          {
            x: logoMoveX,
            y: logoMoveY,
            scale: logoScale,
            duration: 1.02,
            ease: introEase.expand,
          },
          "-=1.18",
        )
        .to(
          navbarRoot,
          {
            autoAlpha: 1,
            duration: 0.01,
          },
          "-=0.64",
        )
        .to(
          navbarReveal,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
          },
          "-=0.64",
        )
        .to(
          navbarSymbol,
          {
            autoAlpha: 1,
            duration: 0.24,
            ease: "power1.out",
          },
          "-=0.34",
        )
        .to(
          centerLogo,
          {
            autoAlpha: 0,
            duration: 0.24,
            ease: "power1.in",
          },
          "<",
        )
        .to(
          [leftT, rightT],
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.32,
          },
          "-=0.52",
        )
        .to(
          navbarContent,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            pointerEvents: "auto",
          },
          "-=0.28",
        )
        .call(() => {
          setNavbarReady(true);
        })
        .set(navbarRoot, {
          autoAlpha: 1,
          pointerEvents: "auto",
          clearProps: "transform",
        })
        .set([navbarReveal, navbarSymbol, navbarContent], {
          autoAlpha: 1,
          clearProps: "transform",
        })
        .to(
          heroLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
          },
          "-=0.18",
        )
        .to(
          heroHeading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
          },
          "-=0.12",
        )
        .to(
          heroBody,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
          },
          "-=0.18",
        )
        .to(
          heroActions,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
          },
          "-=0.14",
        )
        .to(
          introOverlay,
          {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: introTimings.overlayFade,
          },
          "-=0.02",
        )
        .set(heroVisual, { clearProps: "clipPath" })
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
    navbarRootRef,
    heroRootRef,
    heroVisualRef,
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
      <Navbar navbarReady={effectiveNavbarReady} refs={sharedRefs} />
      <PageContainer>
        <Hero refs={sharedRefs} />
      </PageContainer>

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
