"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Ellipsis } from "lucide-react";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  gsap,
  motionMedia,
  motionScroll,
  useGSAP,
} from "@/animations/config";
import { HeroEngineeringScene } from "@/components/hero/HeroEngineeringScene";
import {
  heroActions,
  heroContent,
  heroMenuItems,
  heroVerticals,
  type HeroSceneMode,
} from "@/constants/hero";
import { cn } from "@/lib/utils";

type HeroRefs = {
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

type HeroProps = {
  refs: HeroRefs;
  introHidden?: boolean;
};

const controlBaseClasses =
  "inline-flex h-[52px] items-center justify-center rounded-full transition-[transform,background-color,color,opacity,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5EF]";

export function Hero({ refs, introHidden = false }: HeroProps) {
  const {
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
  } = refs;

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState<number | null>(null);
  const [hoveredVertical, setHoveredVertical] = useState<number | null>(null);
  const [ctaMode, setCtaMode] = useState<HeroSceneMode>(null);
  const activeVertical = hoveredVertical ?? selectedVertical;

  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const sceneShellRef = useRef<HTMLDivElement | null>(null);
  const sceneCopyRef = useRef<HTMLDivElement | null>(null);
  const bridgeRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const focusDotRef = useRef<HTMLSpanElement | null>(null);
  const statRef = useRef<HTMLDivElement | null>(null);
  const selectorRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const selectorLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const sceneMarkerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const actionButtonRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useGSAP(
    () => {
      const root = heroRootRef.current;
      const chrome = heroChromeRef.current;
      const controls = heroControlsRef.current;
      const content = heroContentPanelRef.current;
      const label = heroLabelRef.current;
      const heading = heroHeadingRef.current;
      const body = heroBodyRef.current;
      const actions = heroActionsRef.current;
      const visual = heroVisualRef.current;
      const sceneShell = sceneShellRef.current;
      const sceneCopy = sceneCopyRef.current;
      const bridge = bridgeRef.current;
      const rail = railRef.current;
      const focusDot = focusDotRef.current;
      const stat = statRef.current;
      const arrow = arrowRef.current;
      const actionButtons = actionButtonRefs.current.filter(
        (button): button is HTMLAnchorElement => button instanceof HTMLAnchorElement,
      );
      const selectors = selectorRefs.current.filter(
        (selector): selector is HTMLAnchorElement => selector instanceof HTMLAnchorElement,
      );
      const sceneMarkers = sceneMarkerRefs.current.filter(
        (marker): marker is HTMLDivElement => marker instanceof HTMLDivElement,
      );

      if (
        !root ||
        !chrome ||
        !controls ||
        !content ||
        !label ||
        !heading ||
        !body ||
        !actions ||
        !visual ||
        !sceneShell ||
        !sceneCopy ||
        !bridge ||
        !rail ||
        !focusDot ||
        !stat ||
        !arrow ||
        !actionButtons.length ||
        !selectors.length ||
        !sceneMarkers.length
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: motionMedia.desktop,
          finePointer: motionMedia.pointerFine,
          reduceMotion: motionMedia.reduceMotion,
        },
        (context) => {
          const { desktop, finePointer, reduceMotion } = context.conditions as {
            desktop?: boolean;
            finePointer?: boolean;
            reduceMotion?: boolean;
          };
          const cleanups: Array<() => void> = [];

          if (reduceMotion) {
            gsap.set(
              [
                chrome,
                controls,
                content,
                label,
                heading,
                body,
                actions,
                visual,
                sceneShell,
                sceneCopy,
                bridge,
                rail,
                stat,
                focusDot,
                ...actionButtons,
                ...selectors,
                ...sceneMarkers,
              ],
              { clearProps: "all" },
            );
            return;
          }

          if (introHidden) {
            gsap.set(
              [sceneShell, sceneCopy, bridge, rail, ...actionButtons, ...selectors, ...sceneMarkers],
              {
                autoAlpha: 0,
              },
            );
            return;
          }

          gsap.set(sceneShell, {
            autoAlpha: 0,
            y: 28,
            scale: 0.94,
            rotateX: -8,
            transformPerspective: 1200,
          });
          gsap.set(sceneCopy, {
            autoAlpha: 0,
            y: 22,
          });
          gsap.set(actionButtons, {
            autoAlpha: 0,
            y: 16,
          });
          gsap.set(stat, {
            autoAlpha: 0,
            y: 14,
          });
          gsap.set(selectors, {
            autoAlpha: 0,
            y: 22,
          });
          gsap.set(sceneMarkers, {
            autoAlpha: 0,
            scale: 0.94,
          });
          gsap.set([bridge, rail], {
            autoAlpha: 0,
            scaleX: 0,
            transformOrigin: "left center",
          });
          gsap.set(focusDot, {
            autoAlpha: 0,
            scale: 0.8,
          });

          const introTimeline = gsap.timeline({
            defaults: {
              ease: "power2.out",
            },
          });

          introTimeline
            .to(
              sceneShell,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.56,
                ease: "power3.out",
              },
              0,
            )
            .to(
              sceneCopy,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.32,
              },
              0.12,
            )
            .to(
              actionButtons,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.06,
              },
              0.18,
            )
            .to(
              selectors,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.32,
                stagger: 0.05,
              },
              0.28,
            )
            .to(
              sceneMarkers,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.24,
                stagger: 0.05,
              },
              0.36,
            )
            .to(
              [bridge, rail],
              {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.36,
                stagger: 0.04,
              },
              0.44,
            )
            .to(
              [focusDot, stat],
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.26,
              },
              0.54,
            );

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "bottom top+=28%" : "bottom top+=18%",
              scrub: motionScroll.scrub,
            },
          });

          scrollTimeline
            .to(
              chrome,
              {
                autoAlpha: 0.32,
                y: -8,
                ease: "none",
              },
              0,
            )
            .to(
              content,
              {
                y: desktop ? -34 : -18,
                ease: "none",
              },
              0,
            )
            .to(
              heading,
              {
                y: desktop ? -14 : -8,
                ease: "none",
              },
              0,
            )
            .to(
              visual,
              {
                y: desktop ? -28 : -14,
                scale: desktop ? 0.92 : 0.97,
                ease: "none",
              },
              0,
            )
            .to(
              sceneShell,
              {
                y: desktop ? -48 : -20,
                rotateY: desktop ? 6 : 3,
                scale: desktop ? 1.04 : 1,
                ease: "none",
              },
              0,
            )
            .to(
              body,
              {
                autoAlpha: 0.36,
                y: desktop ? -20 : -10,
                ease: "none",
              },
              0,
            )
            .to(
              actions,
              {
                autoAlpha: 0.48,
                y: desktop ? -26 : -12,
                ease: "none",
              },
              0,
            )
            .to(
              bridge,
              {
                autoAlpha: 0.92,
                scaleX: 1.08,
                ease: "none",
              },
              0.1,
            )
            .to(
              rail,
              {
                scaleX: 1.12,
                ease: "none",
              },
              0.18,
            )
            .to(
              arrow,
              {
                x: desktop ? 16 : 8,
                y: desktop ? 12 : 7,
                ease: "none",
              },
              0,
            );

          const arrowTween = gsap.to(arrow, {
            x: 9,
            y: 6,
            duration: 1.9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          if (finePointer) {
            const quickSceneX = gsap.quickTo(sceneShell, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickSceneY = gsap.quickTo(sceneShell, "y", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickCopyX = gsap.quickTo(sceneCopy, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickCopyY = gsap.quickTo(sceneCopy, "y", {
              duration: 0.8,
              ease: "power3.out",
            });

            const onPointerMove = (event: PointerEvent) => {
              const bounds = root.getBoundingClientRect();
              const progressX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const progressY = (event.clientY - bounds.top) / bounds.height - 0.5;

              quickSceneX(progressX * 14);
              quickSceneY(progressY * 10);
              quickCopyX(progressX * -10);
              quickCopyY(progressY * -8);
            };

            const onPointerLeave = () => {
              quickSceneX(0);
              quickSceneY(0);
              quickCopyX(0);
              quickCopyY(0);
            };

            root.addEventListener("pointermove", onPointerMove);
            root.addEventListener("pointerleave", onPointerLeave);

            cleanups.push(() => {
              root.removeEventListener("pointermove", onPointerMove);
              root.removeEventListener("pointerleave", onPointerLeave);
            });
          }

          cleanups.push(() => {
            arrowTween.kill();
          });

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        },
      );

      return () => mm.revert();
    },
    { dependencies: [introHidden], scope: heroRootRef },
  );

  useGSAP(
    () => {
      const sceneShell = sceneShellRef.current;
      const focusDot = focusDotRef.current;
      const sceneMarkers = sceneMarkerRefs.current.filter(
        (marker): marker is HTMLDivElement => marker instanceof HTMLDivElement,
      );
      const selectors = selectorRefs.current.filter(
        (selector): selector is HTMLAnchorElement => selector instanceof HTMLAnchorElement,
      );
      const selectorLines = selectorLineRefs.current.filter(
        (line): line is HTMLSpanElement => line instanceof HTMLSpanElement,
      );

      if (!sceneShell || !focusDot || !sceneMarkers.length || !selectors.length || !selectorLines.length) {
        return;
      }

      selectors.forEach((selector, index) => {
        const isActive = activeVertical === index;
        const isMuted = activeVertical !== null && !isActive;

        gsap.to(selector, {
          opacity: isMuted ? 0.42 : 1,
          y: isActive ? -5 : 0,
          scale: isActive ? 1.02 : 1,
          duration: 0.32,
          ease: "power2.out",
        });
      });

      selectorLines.forEach((line, index) => {
        gsap.to(line, {
          scaleX: activeVertical === null || activeVertical === index ? 1 : 0.18,
          opacity: activeVertical === null || activeVertical === index ? 1 : 0.18,
          duration: 0.32,
          ease: "power2.out",
        });
      });

      sceneMarkers.forEach((marker, index) => {
        gsap.to(marker, {
          opacity: activeVertical === null ? 1 : activeVertical === index ? 1 : 0.34,
          scale: activeVertical === index ? 1.06 : 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      gsap.to(sceneShell, {
        x: activeVertical === null ? 0 : [0, 10, -8, 6][activeVertical] ?? 0,
        y: activeVertical === null ? 0 : [-2, 2, -6, 4][activeVertical] ?? 0,
        duration: 0.42,
        ease: "power3.out",
      });

      gsap.to(focusDot, {
        x: activeVertical === null ? 0 : [0, 28, -20, 14][activeVertical] ?? 0,
        y: activeVertical === null ? 0 : [0, 10, 18, 26][activeVertical] ?? 0,
        backgroundColor:
          activeVertical === null
            ? "#F55A0A"
            : heroVerticals[activeVertical]?.sceneTint ?? "#F55A0A",
        duration: 0.42,
        ease: "power3.out",
      });
    },
    { dependencies: [activeVertical], scope: heroRootRef },
  );

  useGSAP(
    () => {
      const panel = menuPanelRef.current;
      const items = menuItemRefs.current.filter(
        (item): item is HTMLAnchorElement => item instanceof HTMLAnchorElement,
      );

      if (!panel) {
        return;
      }

      const reduceMotion = window.matchMedia(motionMedia.reduceMotion).matches;

      if (reduceMotion) {
        gsap.set(panel, {
          display: menuOpen ? "block" : "none",
          autoAlpha: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        });
        return;
      }

      if (menuOpen) {
        gsap.killTweensOf(panel);
        gsap.set(panel, {
          display: "block",
          pointerEvents: "auto",
          transformOrigin: "top right",
        });
        gsap.fromTo(
          panel,
          {
            autoAlpha: 0,
            scale: 0.96,
            clipPath: "inset(0 0 100% 0 round 20px)",
          },
          {
            autoAlpha: 1,
            scale: 1,
            clipPath: "inset(0 0 0 0 round 20px)",
            duration: 0.34,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          items,
          {
            y: 16,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.28,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.08,
          },
        );
        return;
      }

      gsap.killTweensOf(panel);
      gsap.to(panel, {
        autoAlpha: 0,
        scale: 0.98,
        clipPath: "inset(0 0 100% 0 round 20px)",
        duration: 0.22,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(panel, {
            display: "none",
            pointerEvents: "none",
          });
        },
      });
    },
    { dependencies: [menuOpen], scope: heroRootRef },
  );

  return (
    <section
      id="home"
      ref={heroRootRef}
      className={cn(
        "hero-root relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#F7F5EF] text-text-primary [isolation:isolate]",
        "max-md:h-auto max-md:min-h-[100dvh]",
        introHidden && "invisible pointer-events-none opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fcfbf9_0%,#f7f5ef_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,168,0,0.12),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(245,90,10,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(16,24,40,0.03)_100%)]" />
      <div className="pointer-events-none absolute inset-x-[4.5%] top-[12.5%] h-px bg-[linear-gradient(90deg,rgba(16,24,40,0),rgba(16,24,40,0.1),rgba(16,24,40,0))]" />
      <div className="pointer-events-none absolute inset-y-[10%] left-[52%] hidden w-px bg-[linear-gradient(180deg,rgba(16,24,40,0),rgba(16,24,40,0.08),rgba(16,24,40,0))] lg:block" />

      <div
        ref={heroVisualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="absolute inset-x-[5%] top-[16%] bottom-[12%] rounded-[42px] border border-[rgba(16,24,40,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06))]" />
      </div>

      <div className="relative z-[4] flex h-full flex-col px-[clamp(28px,5vw,80px)] pt-[clamp(28px,4vw,56px)] pb-[clamp(24px,4vw,44px)] max-md:min-h-[100dvh] max-md:px-6 max-md:pt-6 max-md:pb-8">
        <div
          ref={heroChromeRef}
          className="relative z-[20] flex items-start justify-between gap-4"
        >
          <Link
            ref={heroLogoRef}
            href="#home"
            className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5EF]"
          >
            <Image
              src="/brand/tattvatech-logo.png"
              alt="TattvaTech logo"
              width={138}
              height={40}
              priority
              className="h-auto w-[clamp(100px,8vw,138px)] object-contain"
            />
          </Link>

          <div
            ref={heroControlsRef}
            className="relative flex items-center gap-2.5 sm:gap-3"
          >
            <Link
              href={heroActions.secondary.href}
              className={cn(
                "hidden min-w-[164px] items-center justify-between gap-[18px] rounded-full bg-[#101828] px-[24px] pr-[18px] text-white shadow-[0_18px_40px_rgba(16,24,40,0.14)] sm:inline-flex",
                controlBaseClasses,
              )}
              onMouseEnter={() => setCtaMode("contact")}
              onMouseLeave={() => setCtaMode(null)}
              onFocus={() => setCtaMode("contact")}
              onBlur={() => setCtaMode(null)}
            >
              <span className="whitespace-nowrap text-sm font-semibold text-white">
                {heroActions.secondary.label}
              </span>
              <span aria-hidden="true" className="inline-flex text-white">
                <ArrowUpRight className="size-4 stroke-[2]" />
              </span>
            </Link>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="hero-menu-panel"
              onClick={() => setMenuOpen((value) => !value)}
              className={cn(
                controlBaseClasses,
                "shrink-0 gap-2.5 bg-[rgba(16,24,40,0.05)] px-5 text-sm font-semibold text-text-primary hover:bg-[rgba(16,24,40,0.08)]",
              )}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <Ellipsis aria-hidden="true" className="size-4" />
            </button>

            <div
              id="hero-menu-panel"
              ref={menuPanelRef}
              className="absolute right-0 top-[calc(100%+14px)] hidden w-[min(320px,calc(100vw-44px))] overflow-hidden rounded-[20px] border border-[rgba(16,24,40,0.08)] bg-white shadow-[0_30px_70px_rgba(16,24,40,0.12)]"
            >
              <div className="flex flex-col gap-1 px-5 py-5">
                {heroMenuItems.map((item, index) => (
                  <Link
                    key={item.label}
                    ref={(node) => {
                      menuItemRefs.current[index] = node;
                    }}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[14px] px-4 py-3 text-[1rem] font-medium text-text-primary transition-colors hover:bg-background-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-[rgba(16,24,40,0.08)] px-5 py-5 sm:hidden">
                <Link
                  href={heroActions.secondary.href}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#101828] px-6 text-sm font-semibold text-white transition-colors hover:bg-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  {heroActions.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={heroContentPanelRef}
          className="relative z-[10] flex flex-1 flex-col justify-between pt-8 max-md:pt-10 lg:pt-12"
        >
          <div className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:items-center lg:gap-[clamp(36px,5vw,78px)]">
            <div className="flex min-w-0 flex-col">
              <div ref={heroLabelRef}>
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-orange-primary">
                  {heroContent.label}
                </p>
              </div>

              <div className="hero__heading-row mt-4 w-full overflow-visible">
                <div className="hero__title-mask overflow-hidden">
                  <h1
                    ref={heroHeadingRef}
                    className="max-w-[11ch] font-heading text-[clamp(3.9rem,8vw,8.2rem)] leading-[0.92] tracking-[-0.065em] text-text-primary md:max-w-[10.5ch]"
                  >
                    {heroContent.heading}
                  </h1>
                </div>
              </div>

              <div
                ref={heroBodyRef}
                className="mt-6 flex max-w-[41rem] flex-col gap-5 lg:mt-8"
              >
                <p className="max-w-[35ch] text-[clamp(1.02rem,1.25vw,1.2rem)] leading-7 text-text-secondary">
                  {heroContent.body}
                </p>

                <div className="flex flex-wrap gap-3">
                  {[heroActions.primary, heroActions.secondary].map((action, index) => {
                    const sceneMode: HeroSceneMode = index === 0 ? "explore" : "contact";

                    return (
                      <Link
                        key={action.label}
                        ref={(node) => {
                          actionButtonRefs.current[index] = node;
                        }}
                        href={action.href}
                        className={cn(
                          "group inline-flex h-[54px] items-center gap-3 rounded-full border px-6 text-sm font-semibold transition-[transform,background-color,border-color,color,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5EF]",
                          index === 0
                            ? "border-[#101828] bg-[#101828] text-white hover:border-orange-primary hover:bg-orange-primary"
                            : "border-[rgba(16,24,40,0.12)] bg-white/72 text-text-primary hover:border-[rgba(245,90,10,0.4)] hover:text-orange-primary",
                        )}
                        onMouseEnter={() => setCtaMode(sceneMode)}
                        onMouseLeave={() => setCtaMode(null)}
                        onFocus={() => setCtaMode(sceneMode)}
                        onBlur={() => setCtaMode(null)}
                      >
                        <span>{action.label}</span>
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    );
                  })}
                </div>

                <div ref={statRef} className="flex items-end gap-5 pt-3">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                      {heroContent.supportingLabel}
                    </p>
                    <p className="mt-2 font-heading text-[clamp(2rem,3vw,3.6rem)] leading-none tracking-[-0.05em] text-text-primary">
                      {heroContent.supportingValue}
                    </p>
                  </div>
                  <span className="h-12 w-px bg-[rgba(16,24,40,0.12)]" />
                  <p className="max-w-[18ch] text-sm leading-6 text-text-secondary">
                    One system, four operational branches, built to move from strategy into delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] lg:min-h-[620px]">
              <div
                ref={sceneShellRef}
                data-hero-scene-shell
                className="relative z-[2] h-full min-h-[420px] overflow-hidden rounded-[34px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.54)_0%,rgba(247,245,239,0.92)_100%)] shadow-[0_34px_90px_rgba(16,24,40,0.14)] lg:min-h-[620px]"
              >
                <HeroEngineeringScene activeVertical={activeVertical} ctaMode={ctaMode} />
              </div>

              <div
                ref={sceneCopyRef}
                className="pointer-events-none absolute inset-0 z-[3] hidden lg:block"
              >
                {heroVerticals.map((item, index) => {
                  const isActive = activeVertical === index;
                  const isMuted = activeVertical !== null && !isActive;

                  return (
                    <div
                      key={item.id}
                      ref={(node) => {
                        sceneMarkerRefs.current[index] = node;
                      }}
                      className={cn(
                        "absolute max-w-[11rem] rounded-[18px] border border-[rgba(255,255,255,0.58)] bg-white/78 px-4 py-3 shadow-[0_16px_40px_rgba(16,24,40,0.1)] backdrop-blur-[6px] transition-opacity duration-300",
                        item.desktopMarkerClassName,
                        isMuted && "opacity-35",
                      )}
                    >
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[rgba(16,24,40,0.52)]">
                        {item.badge}
                      </p>
                      <p className="mt-2 font-heading text-[1.02rem] leading-none tracking-[-0.04em] text-text-primary">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[0.8rem] leading-5 text-text-secondary">
                        {item.metric}
                      </p>
                    </div>
                  );
                })}

                <span
                  ref={focusDotRef}
                  className="absolute left-1/2 top-1/2 z-[4] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-primary shadow-[0_0_0_12px_rgba(245,90,10,0.12)]"
                />
              </div>
            </div>
          </div>

          <div
            ref={heroActionsRef}
            className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(210px,0.24fr)] lg:items-end"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {heroVerticals.map((item, index) => (
                <Link
                  key={item.id}
                  ref={(node) => {
                    selectorRefs.current[index] = node;
                  }}
                  href={item.anchor}
                  onMouseEnter={() => setHoveredVertical(index)}
                  onMouseLeave={() => setHoveredVertical(null)}
                  onFocus={() => setHoveredVertical(index)}
                  onBlur={() => setHoveredVertical(null)}
                  onClick={() => setSelectedVertical(index)}
                  className="group relative overflow-hidden rounded-[24px] border border-[rgba(16,24,40,0.08)] bg-white/72 px-5 py-5 shadow-[0_18px_50px_rgba(16,24,40,0.08)] transition-[transform,border-color,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:border-[rgba(245,90,10,0.28)] hover:shadow-[0_22px_58px_rgba(16,24,40,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  <span
                    ref={(node) => {
                      selectorLineRefs.current[index] = node;
                    }}
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-100 bg-[linear-gradient(90deg,rgba(245,90,10,0),rgba(245,90,10,0.92),rgba(245,90,10,0))]"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
                        {item.number}
                      </p>
                      <h2 className="mt-3 font-heading text-[1.5rem] leading-none tracking-[-0.045em] text-text-primary transition-colors duration-300 group-hover:text-orange-primary">
                        {item.label}
                      </h2>
                    </div>
                    <span className="rounded-full border border-[rgba(16,24,40,0.08)] bg-[rgba(247,245,239,0.9)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[rgba(16,24,40,0.62)]">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-4 text-[0.9rem] leading-6 text-text-secondary">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div
                ref={bridgeRef}
                className="w-full max-w-[220px] rounded-[22px] border border-[rgba(16,24,40,0.08)] bg-white/68 px-4 py-4 shadow-[0_16px_40px_rgba(16,24,40,0.08)]"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Next section
                </p>
                <p className="mt-2 font-heading text-[1.5rem] leading-none tracking-[-0.04em] text-text-primary">
                  Summary
                </p>
                <span
                  ref={railRef}
                  aria-hidden="true"
                  className="mt-4 block h-px w-full origin-left bg-[linear-gradient(90deg,#F55A0A,rgba(245,90,10,0))]"
                />
              </div>

              <Link
                href="#summary"
                aria-label="Scroll to summary"
                className="inline-flex items-center gap-3 rounded-full border border-[rgba(16,24,40,0.12)] bg-white/68 px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-[rgba(245,90,10,0.4)] hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
              >
                <span>Scroll into the system</span>
                <span ref={arrowRef} aria-hidden="true" className="inline-flex">
                  <ArrowDownRight className="size-5 stroke-[1.8]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
