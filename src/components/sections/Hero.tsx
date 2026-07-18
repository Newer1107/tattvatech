"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Ellipsis } from "lucide-react";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  gsap,
  motionMedia,
  motionScroll,
  ScrollTrigger,
  useGSAP,
} from "@/animations/config";
import {
  heroActions,
  heroContent,
  heroMenuItems,
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
  "inline-flex h-[52px] items-center justify-center rounded-full transition-[transform,background-color,color,opacity,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5EF]";

const floatingPanels = [
  {
    id: "panel-primary",
    title: "AI Automation",
    value: "Process efficiency",
    note: "+28%",
    className: "right-[18%] top-[23%]",
  },
  {
    id: "panel-secondary",
    title: "Drone Operations",
    value: "Field coverage",
    note: "4x faster",
    className: "right-[1%] top-[39%]",
  },
] as const;

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
  const [activeAction, setActiveAction] = useState<HeroSceneMode>(null);
  const [activePanel, setActivePanel] = useState(0);

  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const featuredShellRef = useRef<HTMLDivElement | null>(null);
  const featuredMotionRef = useRef<HTMLDivElement | null>(null);
  const featuredImageRef = useRef<HTMLDivElement | null>(null);
  const featuredFrameRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const floatingPanelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const actionButtonRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const imageLoopRef = useRef<gsap.core.Timeline | null>(null);

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
      const visual = heroVisualRef.current;
      const featuredShell = featuredShellRef.current;
      const featuredMotion = featuredMotionRef.current;
      const featuredImage = featuredImageRef.current;
      const featuredFrame = featuredFrameRef.current;
      const rail = railRef.current;
      const arrow = arrowRef.current;
      const note = noteRef.current;
      const actionButtons = actionButtonRefs.current.filter(
        (button): button is HTMLAnchorElement => button instanceof HTMLAnchorElement,
      );
      const floatingPanelsNodes = floatingPanelRefs.current.filter(
        (panel): panel is HTMLDivElement => panel instanceof HTMLDivElement,
      );

      if (
        !root ||
        !chrome ||
        !controls ||
        !content ||
        !visual ||
        !featuredShell ||
        !featuredMotion ||
        !featuredImage ||
        !featuredFrame ||
        !rail ||
        !arrow ||
        !note ||
        !actionButtons.length ||
        !floatingPanelsNodes.length
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

          imageLoopRef.current?.kill();
          imageLoopRef.current = null;

          if (reduceMotion) {
            gsap.set(
              [
                content,
                visual,
                featuredShell,
                featuredMotion,
                featuredImage,
                featuredFrame,
                note,
                rail,
                arrow,
                ...actionButtons,
                ...floatingPanelsNodes,
              ],
              { clearProps: "all" },
            );
            return;
          }

          if (introHidden) {
            gsap.set([featuredShell, note, rail, ...floatingPanelsNodes], {
              autoAlpha: 0,
            });
            return;
          }

          gsap.set(featuredShell, {
            autoAlpha: 0,
            x: 30,
            y: 16,
            scale: 0.985,
          });
          gsap.set(featuredFrame, {
            autoAlpha: 0,
            scale: 0.96,
          });
          gsap.set(floatingPanelsNodes, {
            autoAlpha: 0,
            y: 16,
          });
          gsap.set(note, {
            autoAlpha: 0,
            y: 14,
          });
          gsap.set(rail, {
            scaleX: 0,
            transformOrigin: "left center",
            autoAlpha: 0,
          });

          const revealTimeline = gsap.timeline({
            defaults: { ease: "power2.out" },
          });

          revealTimeline
            .to(
              featuredShell,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.72,
                ease: "power3.out",
              },
              0,
            )
            .to(
              featuredFrame,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.54,
              },
              0.12,
            )
            .to(
              floatingPanelsNodes,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.08,
              },
              0.26,
            )
            .to(
              note,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.34,
              },
              0.38,
            )
            .to(
              rail,
              {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.42,
              },
              0.42,
            );

          const imageLoop = gsap.timeline({
            paused: true,
            repeat: -1,
            defaults: {
              ease: "sine.inOut",
            },
          });

          imageLoop
            .to(featuredImage, {
              yPercent: -1.5,
              xPercent: 1.2,
              scale: 1.018,
              rotate: -0.45,
              duration: 8,
            })
            .to(featuredImage, {
              yPercent: 1,
              xPercent: -0.8,
              scale: 1.008,
              rotate: 0.3,
              duration: 10,
            })
            .to(featuredImage, {
              yPercent: -0.5,
              xPercent: 0.4,
              scale: 1.014,
              rotate: 0.15,
              duration: 9,
            });

          imageLoopRef.current = imageLoop;

          const viewportTrigger = ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => imageLoop.play(),
            onEnterBack: () => imageLoop.play(),
            onLeave: () => imageLoop.pause(),
            onLeaveBack: () => imageLoop.pause(),
          });

          cleanups.push(() => viewportTrigger.kill());

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "bottom top+=24%" : "bottom top+=16%",
              scrub: motionScroll.scrub,
            },
          });

          scrollTimeline
            .to(
              chrome,
              {
                autoAlpha: 0.36,
                y: -8,
                ease: "none",
              },
              0,
            )
            .to(
              content,
              {
                y: desktop ? -28 : -14,
                ease: "none",
              },
              0,
            )
            .to(
              visual,
              {
                y: desktop ? -24 : -12,
                ease: "none",
              },
              0,
            )
            .to(
              featuredShell,
              {
                x: desktop ? -10 : 0,
                y: desktop ? -24 : -12,
                scale: desktop ? 0.97 : 0.985,
                ease: "none",
              },
              0,
            )
            .to(
              featuredImage,
              {
                yPercent: -1.2,
                scale: desktop ? 1.02 : 1.01,
                ease: "none",
              },
              0,
            )
            .to(
              heroHeadingRef.current,
              {
                y: desktop ? -10 : -6,
                scale: desktop ? 0.965 : 0.985,
                autoAlpha: 0.92,
                ease: "none",
              },
              0,
            )
            .to(
              heroBodyRef.current,
              {
                y: desktop ? -14 : -8,
                autoAlpha: 0.62,
                ease: "none",
              },
              0,
            )
            .to(
              heroActionsRef.current,
              {
                y: desktop ? -18 : -8,
                autoAlpha: 0.74,
                ease: "none",
              },
              0,
            )
            .to(
              arrow,
              {
                x: desktop ? 14 : 8,
                y: desktop ? 10 : 6,
                ease: "none",
              },
              0,
            );

          const arrowTween = gsap.to(arrow, {
            x: 8,
            y: 5,
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          cleanups.push(() => arrowTween.kill());

          if (finePointer) {
            const quickShellX = gsap.quickTo(featuredMotion, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickShellY = gsap.quickTo(featuredMotion, "y", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickImageRotateX = gsap.quickTo(featuredImage, "rotationX", {
              duration: 0.9,
              ease: "power3.out",
            });
            const quickImageRotateY = gsap.quickTo(featuredImage, "rotationY", {
              duration: 0.9,
              ease: "power3.out",
            });

            const onPointerMove = (event: PointerEvent) => {
              const bounds = featuredShell.getBoundingClientRect();
              const progressX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const progressY = (event.clientY - bounds.top) / bounds.height - 0.5;

              quickShellX(progressX * 14);
              quickShellY(progressY * 10);
              quickImageRotateY(progressX * 1.2);
              quickImageRotateX(progressY * -0.8);
            };

            const onPointerLeave = () => {
              quickShellX(0);
              quickShellY(0);
              quickImageRotateX(0);
              quickImageRotateY(0);
            };

            featuredShell.addEventListener("pointermove", onPointerMove);
            featuredShell.addEventListener("pointerleave", onPointerLeave);

            cleanups.push(() => {
              featuredShell.removeEventListener("pointermove", onPointerMove);
              featuredShell.removeEventListener("pointerleave", onPointerLeave);
            });

            actionButtons.forEach((button) => {
              const quickX = gsap.quickTo(button, "x", {
                duration: 0.28,
                ease: "power3.out",
              });
              const quickY = gsap.quickTo(button, "y", {
                duration: 0.28,
                ease: "power3.out",
              });

              const onMove = (event: PointerEvent) => {
                const bounds = button.getBoundingClientRect();
                const progressX = (event.clientX - bounds.left) / bounds.width - 0.5;
                const progressY = (event.clientY - bounds.top) / bounds.height - 0.5;
                quickX(progressX * 8);
                quickY(progressY * 5);
              };

              const onLeave = () => {
                quickX(0);
                quickY(0);
              };

              button.addEventListener("pointermove", onMove);
              button.addEventListener("pointerleave", onLeave);

              cleanups.push(() => {
                button.removeEventListener("pointermove", onMove);
                button.removeEventListener("pointerleave", onLeave);
              });
            });
          }

          cleanups.push(() => {
            imageLoop.kill();
            imageLoopRef.current = null;
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
      const panels = floatingPanelRefs.current.filter(
        (panel): panel is HTMLDivElement => panel instanceof HTMLDivElement,
      );

      if (!panels.length) {
        return;
      }

      panels.forEach((panel, index) => {
        gsap.to(panel, {
          opacity: activePanel === index ? 1 : 0.78,
          y: activePanel === index ? -4 : 0,
          scale: activePanel === index ? 1.02 : 1,
          duration: 0.32,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [activePanel], scope: heroRootRef },
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(245,90,10,0.08),transparent_20%),radial-gradient(circle_at_72%_40%,rgba(255,168,0,0.08),transparent_20%)]" />

      <div
        ref={heroVisualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="absolute left-[4%] top-[14%] h-[1px] w-[42%] bg-[linear-gradient(90deg,rgba(16,24,40,0),rgba(16,24,40,0.1),rgba(16,24,40,0))]" />
        <div className="absolute right-[5%] top-[14%] h-[1px] w-[36%] bg-[linear-gradient(90deg,rgba(16,24,40,0),rgba(16,24,40,0.08),rgba(16,24,40,0))]" />
        <div className="absolute inset-y-[14%] right-[38%] hidden w-[1px] bg-[linear-gradient(180deg,rgba(16,24,40,0),rgba(16,24,40,0.08),rgba(16,24,40,0))] lg:block" />
      </div>

      <div className="relative z-[4] flex h-full flex-col px-[clamp(28px,5vw,80px)] pt-[clamp(28px,4vw,56px)] pb-[clamp(24px,4vw,44px)] max-md:min-h-[100dvh] max-md:px-6 max-md:pt-6 max-md:pb-8">
        <div
          ref={heroChromeRef}
          className="relative z-[20] flex -translate-y-[10px] items-start justify-between gap-4 [@media(max-height:800px)_and_(min-width:1024px)]:-translate-y-[8px]"
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
          className="relative z-[10] flex flex-1 min-h-0 flex-col justify-center pt-4 max-md:pt-8 lg:pt-5"
        >
          <div className="grid flex-1 min-h-0 gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-center lg:gap-[clamp(24px,4vw,72px)]">
            <div className="flex min-w-0 flex-col justify-center pt-1 lg:pt-0">
              <div ref={heroLabelRef}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-orange-primary">
                  {heroContent.label}
                </p>
              </div>

              <div className="mt-3 overflow-hidden lg:mt-4">
                <h1
                  ref={heroHeadingRef}
                  className={cn(
                    "hero-title max-w-[10.5ch] font-heading text-[clamp(4rem,6.4vw,7.6rem)] leading-[0.88] tracking-[-0.06em] text-text-primary",
                    "[@media(max-height:820px)_and_(min-width:1024px)]:text-[clamp(3.7rem,5.8vw,6.2rem)]",
                    "[@media(max-height:720px)_and_(min-width:1024px)]:text-[clamp(3.2rem,5.2vw,5.4rem)]",
                    "[@media(max-height:720px)_and_(min-width:1024px)]:leading-[0.9]",
                  )}
                >
                  {heroContent.headingLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </div>

              <div
                ref={heroBodyRef}
                className="hero-description mt-[clamp(22px,3vh,38px)] max-w-[36rem] [@media(max-height:720px)_and_(min-width:1024px)]:mt-[18px]"
              >
                <p className="text-[clamp(1rem,1.2vw,1.12rem)] leading-7 text-text-secondary">
                  {heroContent.body}
                </p>
              </div>

              <div
                ref={heroActionsRef}
                className="hero-actions mt-[clamp(22px,3vh,34px)] flex flex-col items-start gap-5 [@media(max-height:720px)_and_(min-width:1024px)]:mt-[20px]"
              >
                <div className="flex flex-wrap gap-3">
                  {[heroActions.primary, heroActions.secondary].map((action, index) => {
                    const actionMode: HeroSceneMode = index === 0 ? "explore" : "contact";

                    return (
                      <Link
                        key={action.label}
                        ref={(node) => {
                          actionButtonRefs.current[index] = node;
                        }}
                        href={action.href}
                        onMouseEnter={() => setActiveAction(actionMode)}
                        onMouseLeave={() => setActiveAction(null)}
                        onFocus={() => setActiveAction(actionMode)}
                        onBlur={() => setActiveAction(null)}
                        className={cn(
                          "group inline-flex h-[54px] items-center gap-3 rounded-full border px-6 text-sm font-semibold will-change-transform",
                          controlBaseClasses,
                          index === 0
                            ? "border-[#101828] bg-[#101828] text-white shadow-[0_18px_40px_rgba(16,24,40,0.14)] hover:border-orange-primary hover:bg-orange-primary"
                            : "border-[rgba(16,24,40,0.1)] bg-white/82 text-text-primary shadow-[0_12px_32px_rgba(16,24,40,0.06)] hover:border-[rgba(245,90,10,0.32)] hover:text-orange-primary",
                        )}
                      >
                        <span>{action.label}</span>
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    );
                  })}
                </div>

                <div
                  ref={noteRef}
                  className="flex max-w-[33rem] items-start gap-4"
                >
                  <span className="mt-2 h-[6px] w-[6px] rounded-full bg-orange-primary" />
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                      {heroContent.supportingLabel} / {heroContent.supportingValue}
                    </p>
                    <p className="mt-2 text-[0.92rem] leading-6 text-text-secondary">
                      {heroContent.supportingNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[300px] self-stretch pt-1 sm:min-h-[360px] lg:min-h-0">
              <div
                ref={featuredShellRef}
                className="relative flex h-full min-h-[300px] items-center justify-center will-change-transform sm:min-h-[360px] lg:min-h-0"
              >
                <div
                  ref={featuredMotionRef}
                  className="hero-visual-pointer relative flex h-full w-full items-center justify-center will-change-transform [transform-style:preserve-3d]"
                >
                  <div
                    ref={featuredFrameRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[8%] top-[14%] hidden h-[72%] w-[60%] rounded-[32px] border border-[rgba(245,90,10,0.18)] lg:block"
                  />

                  <div className="hero-visual relative flex h-[min(68vh,720px)] w-full max-h-[min(68vh,720px)] items-center justify-center overflow-visible [@media(max-height:800px)_and_(min-width:1024px)]:h-[min(61vh,620px)] [@media(max-height:800px)_and_(min-width:1024px)]:max-h-[min(61vh,620px)] [@media(max-height:740px)_and_(min-width:1024px)]:h-[min(57vh,560px)] [@media(max-height:740px)_and_(min-width:1024px)]:max-h-[min(57vh,560px)]">
                    <div
                      className="absolute right-[clamp(24px,4vw,72px)] top-[47%] h-[100%] w-[min(54vw,880px)] max-w-[96%] -translate-y-[45%] overflow-hidden rounded-[30px] bg-white/70 shadow-[0_34px_90px_rgba(16,24,40,0.16)] ring-1 ring-[rgba(16,24,40,0.06)] [@media(max-height:800px)_and_(min-width:1024px)]:right-[clamp(20px,3vw,52px)] [@media(max-height:800px)_and_(min-width:1024px)]:top-[48%] [@media(max-height:800px)_and_(min-width:1024px)]:w-[min(50vw,760px)] [@media(max-height:740px)_and_(min-width:1024px)]:w-[min(47vw,680px)]"
                    >
                      <div
                        ref={featuredImageRef}
                        className="hero-visual-ambient relative h-full w-full will-change-transform [transform-style:preserve-3d]"
                      >
                        <Image
                          src="/images/tattvatech-hero-artwork.png"
                          alt="Abstract orange artwork for the TattvaTech hero"
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 58vw"
                          className="hero-artwork object-contain object-center"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,245,239,0.04),rgba(16,24,40,0.06))]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_38%,rgba(245,90,10,0.12),transparent_22%),radial-gradient(circle_at_72%_52%,rgba(255,168,0,0.1),transparent_18%)]" />
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 hidden lg:block">
                    {floatingPanels.map((panel, index) => (
                      <div
                        key={panel.id}
                        ref={(node) => {
                          floatingPanelRefs.current[index] = node;
                        }}
                        className={cn(
                          "absolute max-w-[11.2rem] rounded-[18px] border border-[rgba(255,255,255,0.54)] bg-white/88 px-4 py-3 shadow-[0_22px_48px_rgba(16,24,40,0.14)] backdrop-blur-[10px]",
                          index === 0 ? "right-[14%] top-[16%]" : "right-[1%] top-[38%]",
                        )}
                        onMouseEnter={() => setActivePanel(index)}
                      >
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[rgba(16,24,40,0.52)]">
                          {panel.title}
                        </p>
                        <p className="mt-2 font-heading text-[1.08rem] leading-[1.02] tracking-[-0.04em] text-text-primary">
                          {panel.value}
                        </p>
                        <p className="mt-2 text-[0.8rem] leading-5 text-orange-primary">
                          {panel.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 [@media(max-height:720px)_and_(min-width:1024px)]:mt-3">
            <span
              ref={railRef}
              aria-hidden="true"
              className={cn(
                "hidden h-px flex-1 origin-left bg-[linear-gradient(90deg,#F55A0A,rgba(245,90,10,0))] sm:block",
                activeAction === "contact" && "bg-[linear-gradient(90deg,#101828,rgba(16,24,40,0))]",
              )}
            />
            <Link
              href="#summary"
              aria-label="Scroll to summary"
              className="inline-flex items-center gap-3 rounded-full border border-[rgba(16,24,40,0.1)] bg-white/84 px-4 py-3 text-sm font-semibold text-text-primary shadow-[0_12px_28px_rgba(16,24,40,0.06)] transition-colors hover:border-[rgba(245,90,10,0.28)] hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <span>Scroll into the system</span>
              <span ref={arrowRef} aria-hidden="true" className="inline-flex">
                <ArrowDownRight className="size-5 stroke-[1.8]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
