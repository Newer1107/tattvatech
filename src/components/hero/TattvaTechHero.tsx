"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, motionMedia, motionScroll, useGSAP } from "@/animations/config";
import { SummaryPanel } from "@/components/sections/Summary";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroThreeFallback } from "./HeroThreeFallback";
import type { HeroRefs, HeroVertical } from "./hero.types";

const HeroThreeScene = dynamic(
  () => import("./HeroThreeScene").then((mod) => mod.HeroThreeScene),
  {
    ssr: false,
    loading: () => <HeroThreeFallback activeVertical={null} exploded={false} />,
  },
);

type HeroProps = {
  refs: HeroRefs;
  introHidden?: boolean;
};

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#summary" },
  { label: "Verticals", href: "#businesses" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

const heroVerticals: HeroVertical[] = [
  {
    id: "services",
    number: "01",
    label: "Services",
    href: "#tattvatech-services",
    description: "Delivery systems for practical execution.",
  },
  {
    id: "products",
    number: "02",
    label: "Products",
    href: "#tattvatech-products",
    description: "Reusable software shaped for scale.",
  },
  {
    id: "drones",
    number: "03",
    label: "Drones",
    href: "#tattvatech-drones",
    description: "Field technology connected to data.",
  },
  {
    id: "training",
    number: "04",
    label: "Training",
    href: "#tattvatech-training",
    description: "Capability built through real practice.",
  },
] as const;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function TattvaTechHero({ refs, introHidden = false }: HeroProps) {
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

  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneShellRef = useRef<HTMLDivElement | null>(null);
  const summaryPreviewRef = useRef<HTMLDivElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVertical, setActiveVertical] = useState<number | null>(null);
  const [exploded, setExploded] = useState(false);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [canRender3D, setCanRender3D] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [interactionStrength, setInteractionStrength] = useState(0);
  const [sceneVisible, setSceneVisible] = useState(true);

  const prefersReducedMotion = useReducedMotionPreference();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const mobileScene = !isDesktop;
  const enableHeroPin = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    setCanRender3D(supportsWebGL());
  }, []);

  useEffect(() => {
    if (!exploded) {
      return;
    }

    setLabelsVisible(true);
    const timer = window.setTimeout(() => {
      setExploded(false);
      setLabelsVisible(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [exploded]);

  useEffect(() => {
    const root = heroRootRef.current;
    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [heroRootRef]);

  useGSAP(
    () => {
      const root = heroRootRef.current;
      const stage = stageRef.current;
      const sceneShell = sceneShellRef.current;
      const summaryPreview = summaryPreviewRef.current;
      const heading = heroHeadingRef.current;
      const label = heroLabelRef.current;
      const body = heroBodyRef.current;
      const actions = heroActionsRef.current;
      const chrome = heroChromeRef.current;
      const visual = heroVisualRef.current;
      const content = heroContentPanelRef.current;
      const lineElements = gsap.utils.toArray<HTMLElement>("[data-hero-line]", root);
      const ctas = gsap.utils.toArray<HTMLElement>("[data-hero-cta]", root);
      const strip = root.querySelector<HTMLElement>("[data-hero-strip]");
      const utility = root.querySelector<HTMLElement>("[data-hero-utility]");

      if (
        !root ||
        !stage ||
        !sceneShell ||
        !summaryPreview ||
        !heading ||
        !label ||
        !body ||
        !actions ||
        !chrome ||
        !visual ||
        !content ||
        !strip ||
        !utility
      ) {
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
            gsap.set(
              [sceneShell, summaryPreview, strip, utility, ...lineElements, ...ctas],
              { clearProps: "all" },
            );
            return;
          }

          if (!introHidden) {
            gsap.set(lineElements, {
              clipPath: (index: number) =>
                index === 0 ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)",
              yPercent: 30,
            });
            gsap.set(sceneShell, {
              autoAlpha: 0,
              scale: 1.08,
              rotate: 3,
            });
            gsap.set(strip, { autoAlpha: 0, y: 18 });
            gsap.set(utility, { autoAlpha: 0, x: 10 });
            gsap.set(ctas, { autoAlpha: 0, scaleX: 0.94, transformOrigin: "left center" });

            const introTimeline = gsap.timeline({
              delay: 0.12,
              defaults: { ease: "power3.out" },
            });

            introTimeline
              .to(
                lineElements,
                {
                  clipPath: "inset(0 0 0 0)",
                  yPercent: 0,
                  stagger: 0.08,
                  duration: 0.48,
                },
                0,
              )
              .to(
                ctas,
                {
                  autoAlpha: 1,
                  scaleX: 1,
                  stagger: 0.07,
                  duration: 0.34,
                },
                0.12,
              )
              .to(
                sceneShell,
                {
                  autoAlpha: 1,
                  scale: 1,
                  rotate: 0,
                  duration: 0.68,
                },
                0.04,
              )
              .to(
                strip,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.34,
                },
                0.2,
              )
              .to(
                utility,
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.24,
                },
                0.24,
              );
          }

          if (!desktop || !enableHeroPin) {
            gsap.set(summaryPreview, { yPercent: 100 });
            return;
          }

          gsap.set(summaryPreview, { yPercent: 100 });

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=120%",
              pin: stage,
              pinSpacing: true,
              scrub: motionScroll.scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          scrollTimeline
            .to(
              [heading, label, body, actions],
              {
                y: -50,
                scale: 0.96,
                autoAlpha: 0.25,
                stagger: 0.02,
                ease: "none",
              },
              0,
            )
            .to(
              chrome,
              {
                autoAlpha: 0.18,
                y: -14,
                ease: "none",
              },
              0,
            )
            .to(
              sceneShell,
              {
                scale: 0.82,
                autoAlpha: 0.45,
                y: 26,
                ease: "none",
              },
              0,
            )
            .to(
              visual,
              {
                y: 10,
                ease: "none",
              },
              0,
            )
            .to(
              strip,
              {
                y: -26,
                autoAlpha: 0.42,
                ease: "none",
              },
              0.1,
            )
            .to(
              summaryPreview,
              {
                yPercent: 0,
                ease: "none",
              },
              0.22,
            );
        },
      );

      return () => mm.revert();
    },
    { dependencies: [introHidden, enableHeroPin], scope: heroRootRef },
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

      if (prefersReducedMotion) {
        gsap.set(panel, {
          display: menuOpen ? "block" : "none",
          autoAlpha: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        });
        return;
      }

      if (menuOpen) {
        gsap.set(panel, { display: "block", pointerEvents: "auto", transformOrigin: "top right" });
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: -10, clipPath: "inset(0 0 100% 0 round 20px)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0 0 round 20px)", duration: 0.28, ease: "power3.out" },
        );
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.04, ease: "power2.out", delay: 0.06 },
        );
        return;
      }

      gsap.to(panel, {
        autoAlpha: 0,
        y: -8,
        clipPath: "inset(0 0 100% 0 round 20px)",
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(panel, { display: "none", pointerEvents: "none" });
        },
      });
    },
    { dependencies: [menuOpen, prefersReducedMotion], scope: heroRootRef },
  );

  const sceneToneActive = activeVertical !== null || interactionStrength > 0.1 || labelsVisible;
  const previewSummary = useMemo(
    () => (
      <SummaryPanel
        animated={false}
        className="h-full rounded-none border-none bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(252,251,249,0.99)_100%)] shadow-none"
      />
    ),
    [],
  );

  return (
    <section
      id="home"
      ref={heroRootRef}
      className={cn(
        "relative min-h-[100svh] w-full overflow-hidden bg-[#08111f] text-white [--hero-mouse-x:72%] [--hero-mouse-y:42%]",
        introHidden && "invisible pointer-events-none opacity-0",
      )}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        event.currentTarget.style.setProperty("--hero-mouse-x", `${x}%`);
        event.currentTarget.style.setProperty("--hero-mouse-y", `${y}%`);
      }}
    >
      <div ref={stageRef} className="relative min-h-[100svh] overflow-hidden">
        <HeroBackground sceneActive={sceneToneActive} />

        <div
          ref={summaryPreviewRef}
          className="pointer-events-none absolute inset-0 z-[30] will-change-transform"
        >
          {previewSummary}
        </div>

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 gap-10 px-6 pb-8 pt-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-[clamp(28px,4vw,72px)] lg:pb-10 lg:pt-8">
          <div className="flex min-w-0 flex-col">
            <div
              ref={heroChromeRef}
              className="relative z-[20] flex items-center justify-between gap-4"
            >
              <Link
                ref={heroLogoRef}
                href="#home"
                className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
              >
                <Image
                  src="/brand/tattvatech-logo.png"
                  alt="TattvaTech logo"
                  width={144}
                  height={42}
                  priority
                  className="h-auto w-[118px] object-contain sm:w-[136px]"
                />
              </Link>

              <div
                ref={heroControlsRef}
                className="relative flex items-center gap-3"
              >
                <nav className="hidden items-center gap-5 lg:flex">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[0.82rem] font-medium text-white/68 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="hero-menu-panel"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary lg:hidden"
                >
                  {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>

                <div
                  id="hero-menu-panel"
                  ref={menuPanelRef}
                  className="absolute right-0 top-[calc(100%+12px)] hidden w-[min(300px,calc(100vw-40px))] overflow-hidden rounded-[20px] border border-white/10 bg-[#0F1A2B]/96 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-1 p-4">
                    {menuItems.map((item, index) => (
                      <Link
                        key={item.label}
                        ref={(node) => {
                          menuItemRefs.current[index] = node;
                        }}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-[14px] px-4 py-3 text-[0.96rem] font-medium text-white/84 transition-colors duration-300 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div ref={heroContentPanelRef} className="flex flex-1 flex-col">
              <HeroContent
                labelRef={heroLabelRef}
                headingRef={heroHeadingRef}
                bodyRef={heroBodyRef}
                actionsRef={heroActionsRef}
                activeVertical={activeVertical}
                verticals={heroVerticals}
                onHoverVertical={(index) => {
                  if (hasFinePointer) {
                    setActiveVertical(index);
                  }
                }}
                onSelectVertical={(index) => {
                  setActiveVertical(index);
                }}
                onRevealStructure={() => {
                  setExploded(true);
                  setLabelsVisible(true);
                }}
              />
            </div>
          </div>

          <div
            ref={heroVisualRef}
            className="relative flex min-h-[360px] items-center justify-center lg:min-h-0"
          >
            <div className="absolute inset-[8%] rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
            <div className="absolute inset-x-[16%] top-[14%] h-px bg-white/8" />
            <div className="absolute inset-y-[16%] right-[22%] w-px bg-white/6 max-lg:hidden" />

            <div
              ref={sceneShellRef}
              data-hero-scene-shell
              className="relative z-[2] flex h-full min-h-[360px] w-full items-center justify-center px-4 py-8 lg:px-8 lg:py-12"
              onPointerEnter={() => {
                if (hasFinePointer && !prefersReducedMotion) {
                  setInteractionStrength(1);
                }
              }}
              onPointerLeave={() => {
                setPointer({ x: 0, y: 0 });
                setInteractionStrength(0);
                if (hasFinePointer) {
                  setActiveVertical(null);
                }
              }}
              onPointerMove={(event) => {
                if (!hasFinePointer || prefersReducedMotion) {
                  return;
                }

                const bounds = event.currentTarget.getBoundingClientRect();
                const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
                const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
                setPointer({
                  x: Math.max(-0.5, Math.min(0.5, nx)),
                  y: Math.max(-0.5, Math.min(0.5, ny)),
                });
              }}
              onClick={() => {
                setExploded(true);
                setLabelsVisible(true);
              }}
            >
              {canRender3D ? (
                <HeroThreeScene
                  activeVertical={activeVertical}
                  exploded={exploded}
                  pointer={pointer}
                  interactionStrength={interactionStrength}
                  reducedMotion={prefersReducedMotion}
                  visible={sceneVisible}
                  mobile={mobileScene}
                  labelsVisible={labelsVisible}
                  verticals={heroVerticals}
                />
              ) : (
                <HeroThreeFallback
                  activeVertical={activeVertical}
                  exploded={exploded}
                  className="w-full max-w-[640px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
