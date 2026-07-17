"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Ellipsis } from "lucide-react";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  gsap,
  motionMedia,
  motionScroll,
  useGSAP,
} from "@/animations/config";
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

const heroMenuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#summary" },
  { label: "Principles", href: "#businesses" },
  { label: "Services", href: "#tattvatech-services" },
  { label: "Products", href: "#tattvatech-products" },
  { label: "Drones", href: "#tattvatech-drones" },
  { label: "Training", href: "#tattvatech-training" },
  { label: "Contact", href: "#contact" },
] as const;

const heroVerticals = [
  {
    id: "services",
    number: "01",
    label: "Services",
    href: "#tattvatech-services",
    phrase: "Systems built for delivery.",
  },
  {
    id: "products",
    number: "02",
    label: "Products",
    href: "#tattvatech-products",
    phrase: "Reusable software at scale.",
  },
  {
    id: "drones",
    number: "03",
    label: "Drones",
    href: "#tattvatech-drones",
    phrase: "Technology applied in the field.",
  },
  {
    id: "training",
    number: "04",
    label: "Training",
    href: "#tattvatech-training",
    phrase: "Capability built through practice.",
  },
] as const;

const controlBaseClasses =
  "inline-flex h-[52px] items-center justify-center rounded-full transition-[transform,background-color,color,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F1]";

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
  const [activeVertical, setActiveVertical] = useState(0);

  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const orbButtonRef = useRef<HTMLAnchorElement | null>(null);
  const orbWrapRef = useRef<HTMLSpanElement | null>(null);
  const orbPathRef = useRef<SVGPathElement | null>(null);
  const systemGroupRef = useRef<SVGGElement | null>(null);
  const connectorRef = useRef<SVGPathElement | null>(null);
  const railRefs = useRef<Array<SVGPathElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const nodeTweensRef = useRef<Array<gsap.core.Tween | null>>([]);

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
      const heading = heroHeadingRef.current;
      const body = heroBodyRef.current;
      const visual = heroVisualRef.current;
      const actions = heroActionsRef.current;
      const orbButton = orbButtonRef.current;
      const orbWrap = orbWrapRef.current;
      const orbPath = orbPathRef.current;
      const connector = connectorRef.current;
      const marker = markerRef.current;
      const arrow = arrowRef.current;
      const rails = railRefs.current.filter(
        (rail): rail is SVGPathElement => rail instanceof SVGPathElement,
      );
      const nodes = nodeRefs.current.filter(
        (node): node is HTMLSpanElement => node instanceof HTMLSpanElement,
      );
      const labels = labelRefs.current.filter(
        (label): label is HTMLAnchorElement => label instanceof HTMLAnchorElement,
      );

      if (
        !root ||
        !chrome ||
        !controls ||
        !content ||
        !heading ||
        !body ||
        !visual ||
        !actions ||
        !orbButton ||
        !orbWrap ||
        !orbPath ||
        !connector ||
        !marker ||
        !arrow ||
        !rails.length ||
        !nodes.length
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
            gsap.set([chrome, controls, heading, body, visual, actions], {
              clearProps: "all",
            });
            gsap.set([connector, ...rails], {
              clearProps: "all",
              strokeDashoffset: 0,
            });
            gsap.set(nodes, { clearProps: "all" });
            return;
          }

          const connectorLength = connector.getTotalLength();
          const railLengths = rails.map((rail) => rail.getTotalLength());

          if (introHidden) {
            gsap.set(connector, {
              strokeDasharray: connectorLength,
              strokeDashoffset: connectorLength,
            });
            gsap.set(rails, {
              strokeDasharray: (index: number) => railLengths[index] ?? 0,
              strokeDashoffset: (index: number) => railLengths[index] ?? 0,
            });
            gsap.set(nodes, {
              autoAlpha: 0,
              scale: 0.82,
            });
            gsap.set(labels, {
              autoAlpha: 0,
              y: 14,
            });
            return;
          }

          gsap.set(connector, {
            strokeDasharray: connectorLength,
            strokeDashoffset: connectorLength,
          });
          gsap.set(rails, {
            strokeDasharray: (index: number) => railLengths[index] ?? 0,
            strokeDashoffset: (index: number) => railLengths[index] ?? 0,
          });
          gsap.set(nodes, {
            autoAlpha: 0,
            scale: 0.82,
          });
          gsap.set(labels, {
            autoAlpha: 0,
            y: 14,
          });

          const introTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

          introTimeline
            .to(
              connector,
              {
                strokeDashoffset: 0,
                duration: 0.42,
              },
              0,
            )
            .to(
              rails,
              {
                strokeDashoffset: 0,
                duration: 0.54,
                stagger: 0.07,
              },
              0.08,
            )
            .to(
              nodes,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.24,
                stagger: 0.06,
              },
              0.34,
            )
            .to(
              labels,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.28,
                stagger: 0.05,
              },
              0.42,
            );

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "bottom top+=10%" : "bottom top+=6%",
              scrub: motionScroll.scrub,
            },
          });

          scrollTimeline
            .to(
              chrome,
              {
                autoAlpha: 0.26,
                y: -8,
                ease: "none",
              },
              0,
            )
            .to(
              content,
              {
                y: desktop ? -16 : -8,
                ease: "none",
              },
              0,
            )
            .to(
              heading,
              {
                y: desktop ? -18 : -8,
                scale: desktop ? 0.982 : 0.99,
                ease: "none",
              },
              0,
            )
            .to(
              visual,
              {
                y: desktop ? -22 : -10,
                ease: "none",
              },
              0,
            )
            .to(
              actions,
              {
                autoAlpha: 0.42,
                y: desktop ? -18 : -8,
                ease: "none",
              },
              0,
            )
            .to(
              arrow,
              {
                x: desktop ? 14 : 8,
                y: desktop ? 22 : 12,
                ease: "none",
              },
              0,
            );

          const dashTween = gsap.to(orbPath, {
            strokeDashoffset: -92,
            duration: 2.6,
            ease: "none",
            repeat: -1,
          });

          const rotateTween = gsap.to(orbWrap, {
            rotate: 360,
            duration: 12,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });

          gsap.to(arrow, {
            x: 8,
            y: 8,
            duration: 1.9,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          nodeTweensRef.current = nodes.map((node, index) => {
            const offsets = [
              {
                x: [0, 32, 32, 0],
                y: [0, 0, 162, 312],
                duration: 7.6,
              },
              {
                x: [0, 28, 28, 0],
                y: [0, 0, 118, 264],
                duration: 8.4,
              },
              {
                x: [0, 18, 18, 0],
                y: [0, -30, 96, 236],
                duration: 7.9,
              },
              {
                x: [0, 10, 10, 0],
                y: [0, -14, 124, 286],
                duration: 8.9,
              },
            ][index];

            return gsap.to(node, {
              keyframes: [
                { x: offsets.x[0], y: offsets.y[0], duration: offsets.duration * 0.12 },
                { x: offsets.x[1], y: offsets.y[1], duration: offsets.duration * 0.18 },
                { x: offsets.x[2], y: offsets.y[2], duration: offsets.duration * 0.34 },
                { x: offsets.x[3], y: offsets.y[3], duration: offsets.duration * 0.36 },
              ],
              ease: "none",
              repeat: -1,
            });
          });

          if (finePointer) {
            const quickHeadingX = gsap.quickTo(heading, "x", {
              duration: 0.48,
              ease: "power3.out",
            });
            const quickSystemX = gsap.quickTo(visual, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickSystemY = gsap.quickTo(visual, "y", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickMarkerX = gsap.quickTo(marker, "x", {
              duration: 0.48,
              ease: "power3.out",
            });

            const onPointerMove = (event: PointerEvent) => {
              const bounds = root.getBoundingClientRect();
              const progressX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const progressY = (event.clientY - bounds.top) / bounds.height - 0.5;

              quickHeadingX(progressX * 10);
              quickSystemX(progressX * 16);
              quickSystemY(progressY * 12);
              quickMarkerX(progressX * 8);
            };

            const onPointerLeave = () => {
              quickHeadingX(0);
              quickSystemX(0);
              quickSystemY(0);
              quickMarkerX(0);
            };

            const orbHoverTimeline = gsap.timeline({ paused: true });
            orbHoverTimeline
              .to(
                orbButton,
                {
                  scale: 1.08,
                  backgroundColor: "#F55A0A",
                  duration: 0.24,
                  ease: "power2.out",
                },
                0,
              )
              .to(
                orbPath,
                {
                  stroke: "#ffffff",
                  duration: 0.24,
                  ease: "power2.out",
                },
                0,
              );

            const onOrbEnter = () => {
              dashTween.timeScale(1.7);
              rotateTween.timeScale(1.12);
              orbHoverTimeline.play();
            };

            const onOrbLeave = () => {
              dashTween.timeScale(1);
              rotateTween.timeScale(1);
              orbHoverTimeline.reverse();
            };

            root.addEventListener("pointermove", onPointerMove);
            root.addEventListener("pointerleave", onPointerLeave);
            orbButton.addEventListener("mouseenter", onOrbEnter);
            orbButton.addEventListener("mouseleave", onOrbLeave);
            orbButton.addEventListener("focus", onOrbEnter);
            orbButton.addEventListener("blur", onOrbLeave);

            cleanups.push(() => {
              root.removeEventListener("pointermove", onPointerMove);
              root.removeEventListener("pointerleave", onPointerLeave);
              orbButton.removeEventListener("mouseenter", onOrbEnter);
              orbButton.removeEventListener("mouseleave", onOrbLeave);
              orbButton.removeEventListener("focus", onOrbEnter);
              orbButton.removeEventListener("blur", onOrbLeave);
            });
          }

          cleanups.push(() => {
            dashTween.kill();
            rotateTween.kill();
            nodeTweensRef.current.forEach((tween) => tween?.kill());
            nodeTweensRef.current = [];
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
      const system = systemGroupRef.current;
      const rails = railRefs.current.filter(
        (rail): rail is SVGPathElement => rail instanceof SVGPathElement,
      );
      const labels = labelRefs.current.filter(
        (label): label is HTMLAnchorElement => label instanceof HTMLAnchorElement,
      );

      if (!system || !rails.length || !labels.length) {
        return;
      }

      const offsets = [-16, -4, 8, 18];

      rails.forEach((rail, index) => {
        gsap.to(rail, {
          stroke: index === activeVertical ? "#F55A0A" : "rgba(16,24,40,0.2)",
          opacity: index === activeVertical ? 1 : 0.5,
          strokeWidth: index === activeVertical ? 3.2 : 2.2,
          duration: 0.28,
          ease: "power2.out",
        });
      });

      labels.forEach((label, index) => {
        gsap.to(label, {
          opacity: index === activeVertical ? 1 : 0.62,
          y: index === activeVertical ? -2 : 0,
          duration: 0.24,
          ease: "power2.out",
        });
      });

      gsap.to(system, {
        x: offsets[activeVertical] ?? 0,
        duration: 0.52,
        ease: "power3.out",
      });

      nodeTweensRef.current.forEach((tween, index) => {
        tween?.timeScale(index === activeVertical ? 1.35 : 1);
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
        "hero-root relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#F7F6F1] px-0 py-0 text-text-primary [isolation:isolate]",
        "max-md:h-auto max-md:min-h-[100dvh]",
        introHidden && "invisible pointer-events-none opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fcfbf9_0%,#f7f6f1_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(255,168,0,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(245,90,10,0.1),transparent_18%),radial-gradient(circle_at_48%_68%,rgba(16,24,40,0.04),transparent_24%)]" />

      <div
        ref={heroVisualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="absolute inset-y-[8%] left-[6%] right-[8%] hidden lg:block">
          <svg viewBox="0 0 1200 820" className="h-full w-full overflow-visible">
            <g ref={systemGroupRef}>
              <path
                ref={connectorRef}
                d="M120 180H1020"
                fill="none"
                stroke="rgba(16,24,40,0.12)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {[280, 470, 670, 870].map((x, index) => (
                <path
                  key={x}
                  ref={(node) => {
                    railRefs.current[index] = node;
                  }}
                  d={`M${x} 180C${x} 220 ${x + 18} 248 ${x + 18} 308V700`}
                  fill="none"
                  stroke="rgba(16,24,40,0.2)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ))}

              {[280, 470, 670, 870].map((x, index) => (
                <text
                  key={`marker-${x}`}
                  x={x - 22}
                  y={130}
                  fill="rgba(16,24,40,0.2)"
                  fontSize="26"
                  letterSpacing="4"
                >
                  {`0${index + 1}`}
                </text>
              ))}

              <path
                d="M214 94L686 94"
                fill="none"
                stroke="rgba(245,90,10,0.08)"
                strokeWidth="120"
                strokeLinecap="square"
              />
              <path
                d="M520 94V430"
                fill="none"
                stroke="rgba(245,90,10,0.07)"
                strokeWidth="120"
                strokeLinecap="square"
              />
            </g>
          </svg>
        </div>

        <div className="absolute inset-0 lg:hidden">
          <svg viewBox="0 0 420 720" className="h-full w-full">
            <path d="M54 190H360" fill="none" stroke="rgba(16,24,40,0.12)" strokeWidth="2" />
            {[88, 168, 248, 328].map((x, index) => (
              <path
                key={x}
                d={`M${x} 190C${x} 220 ${x + 10} 248 ${x + 10} 286V596`}
                fill="none"
                stroke={index === activeVertical ? "#F55A0A" : "rgba(16,24,40,0.18)"}
                strokeWidth={index === activeVertical ? 2.6 : 2}
                strokeLinecap="round"
              />
            ))}
            <path
              d="M72 108H244"
              fill="none"
              stroke="rgba(245,90,10,0.06)"
              strokeWidth="64"
            />
            <path d="M160 108V268" fill="none" stroke="rgba(245,90,10,0.05)" strokeWidth="64" />
          </svg>
        </div>

        {[
          "left-[26%] top-[22%]",
          "left-[42%] top-[19%]",
          "left-[58%] top-[16%]",
          "left-[74%] top-[21%]",
        ].map((position, index) => (
          <span
            key={`node-${index}`}
            ref={(node) => {
              nodeRefs.current[index] = node;
            }}
            className={cn(
              "absolute hidden h-3 w-3 rounded-full bg-orange-primary shadow-[0_0_0_10px_rgba(245,90,10,0.08)] lg:block",
              position,
            )}
          />
        ))}
      </div>

      <div className="relative z-[3] flex h-full flex-col px-[clamp(28px,5vw,80px)] pt-[clamp(28px,4vw,56px)] pb-[clamp(28px,4vw,48px)] max-md:min-h-[100dvh] max-md:px-6 max-md:pt-6 max-md:pb-8">
        <div
          ref={heroChromeRef}
          className="relative z-[20] flex items-start justify-between gap-4"
        >
          <Link
            ref={heroLogoRef}
            href="#home"
            className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F1]"
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
              ref={orbButtonRef}
              href="#summary"
              aria-label="Explore TattvaTech"
              className={cn(
                controlBaseClasses,
                "w-[52px] shrink-0 bg-[rgba(16,24,40,0.05)] text-text-primary",
              )}
            >
              <span ref={orbWrapRef} aria-hidden="true" className="inline-flex">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="9.1"
                    stroke="rgba(245,90,10,0.24)"
                    strokeWidth="1"
                  />
                  <path
                    ref={orbPathRef}
                    d="M2 11C4.2 11 4.6 6.5 6.9 6.5C9.3 6.5 9.4 15.5 11.4 15.5C13.6 15.5 14.1 8.2 16.2 8.2C17.8 8.2 18.4 11 20 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="18 10"
                  />
                </svg>
              </span>
            </Link>

            <Link
              href="#contact"
              className={cn(
                controlBaseClasses,
                "hidden shrink-0 bg-[#101828] px-7 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(16,24,40,0.14)] hover:bg-orange-primary sm:inline-flex",
              )}
            >
              Start a Project
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
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#101828] px-6 text-sm font-semibold text-white transition-colors hover:bg-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={heroContentPanelRef}
          className="relative z-[10] grid h-full flex-1 grid-rows-[auto_auto_1fr_auto] pt-8 max-md:grid-rows-[auto_auto_auto_1fr_auto] lg:grid-cols-[minmax(0,1fr)_220px] lg:grid-rows-[auto_1fr_auto] lg:items-end lg:pt-12"
        >
          <div className="lg:col-span-2">
            <div ref={heroLabelRef}>
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-orange-primary">
                Technology • Products • Drones • Training
              </p>
            </div>
          </div>

          <div className="relative mt-4 overflow-visible lg:row-start-2 lg:self-center">
            <div className="overflow-hidden">
              <h1
                ref={heroHeadingRef}
                className="font-heading text-[clamp(6rem,16vw,17rem)] leading-[0.78] tracking-[-0.075em] text-text-primary max-md:text-[clamp(4.8rem,23vw,7.1rem)]"
              >
                <span className="block sm:hidden">TATTVA</span>
                <span className="block sm:hidden">TECH</span>
                <span className="hidden sm:block">TATTVATECH</span>
              </h1>
            </div>

            <div
              ref={heroBodyRef}
              className="mt-6 grid gap-7 lg:mt-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end"
            >
              <div className="max-w-[36ch]">
                <p className="text-[clamp(1rem,1.22vw,1.12rem)] leading-7 text-text-secondary">
                  Four connected verticals built around practical systems, applied technology, and long-term capability.
                </p>
              </div>

              <div
                ref={markerRef}
                className="flex items-end justify-between gap-5 lg:flex-col lg:items-start lg:justify-start"
              >
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                    Connected verticals
                  </p>
                  <p className="mt-2 font-heading text-[clamp(2rem,4vw,4.5rem)] leading-none tracking-[-0.05em] text-text-primary">
                    04
                  </p>
                </div>

                <Link
                  href="#summary"
                  aria-label="Scroll to summary"
                  className="inline-flex rounded-full p-1 text-text-primary transition-colors hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  <span ref={arrowRef} aria-hidden="true" className="inline-flex">
                    <ArrowDownRight className="size-12 stroke-[1.6] lg:size-16" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden lg:block" />

          <div className="lg:col-span-2 lg:self-end">
            <div
              ref={heroActionsRef}
              className="grid grid-cols-2 gap-3 pt-10 md:max-w-[620px] lg:max-w-[760px] lg:grid-cols-4 lg:gap-4 lg:pt-0"
            >
              {heroVerticals.map((item, index) => (
                <Link
                  key={item.id}
                  ref={(node) => {
                    labelRefs.current[index] = node;
                  }}
                  href={item.href}
                  data-vertical-label
                  onMouseEnter={() => setActiveVertical(index)}
                  onFocus={() => setActiveVertical(index)}
                  className={cn(
                    "group rounded-[18px] border border-[rgba(16,24,40,0.08)] bg-white/58 px-4 py-3 text-left backdrop-blur-[10px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary",
                    activeVertical === index
                      ? "border-orange-primary/30 bg-white/78"
                      : "hover:bg-white/72",
                  )}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-muted">
                    {item.number}
                  </p>
                  <p className="mt-2 font-heading text-[1.02rem] tracking-[-0.03em] text-text-primary">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[0.8rem] leading-5 text-text-secondary">
                    {item.phrase}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
