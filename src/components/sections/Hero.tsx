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
  { label: "Services", href: "#tattvatech-services" },
  { label: "Products", href: "#tattvatech-products" },
  { label: "Drones", href: "#tattvatech-drones" },
  { label: "Training", href: "#tattvatech-training" },
  { label: "Contact", href: "#contact" },
] as const;

const heroPreviewCards = [
  {
    id: "services-preview",
    title: "Technology Services",
    description: "Delivery systems, AI, cloud, analytics, and product design.",
    href: "#tattvatech-services",
    image: "/placeholders/hero-placeholder.jpg",
    accent: "from-[rgba(245,90,10,0.24)] via-transparent to-[rgba(16,24,40,0.18)]",
  },
  {
    id: "products-preview",
    title: "Software Products",
    description: "Reusable systems shaped from repeated operational needs.",
    href: "#tattvatech-products",
    image: "/placeholders/summary-placeholder.jpg",
    accent: "from-[rgba(16,24,40,0.14)] via-transparent to-[rgba(255,168,0,0.18)]",
  },
] as const;

const controlBaseClasses =
  "inline-flex h-[52px] items-center justify-center rounded-full transition-[transform,background-color,color,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F2]";

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
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const orbButtonRef = useRef<HTMLAnchorElement | null>(null);
  const orbWrapRef = useRef<HTMLSpanElement | null>(null);
  const orbPathRef = useRef<SVGPathElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const previewCardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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
      const arrow = arrowRef.current;
      const marker = markerRef.current;

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
        !arrow ||
        !marker
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
            return;
          }

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "bottom top+=12%" : "bottom top+=8%",
              scrub: motionScroll.scrub,
            },
          });

          scrollTimeline
            .to(
              chrome,
              {
                autoAlpha: 0.24,
                y: -8,
                ease: "none",
              },
              0,
            )
            .to(
              content,
              {
                scale: desktop ? 0.975 : 0.985,
                y: desktop ? -18 : -10,
                ease: "none",
              },
              0,
            )
            .to(
              heading,
              {
                scale: desktop ? 0.978 : 0.986,
                x: desktop ? -12 : -4,
                ease: "none",
              },
              0,
            )
            .to(
              visual,
              {
                y: desktop ? -30 : -16,
                ease: "none",
              },
              0,
            )
            .to(
              actions,
              {
                y: desktop ? -22 : -10,
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
            x: 10,
            y: 10,
            duration: 1.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          if (finePointer) {
            const quickHeadingX = gsap.quickTo(heading, "x", {
              duration: 0.45,
              ease: "power3.out",
            });
            const quickMarkerX = gsap.quickTo(marker, "x", {
              duration: 0.45,
              ease: "power3.out",
            });

            const onPointerMove = (event: PointerEvent) => {
              const bounds = root.getBoundingClientRect();
              const progressX = (event.clientX - bounds.left) / bounds.width - 0.5;

              quickHeadingX(progressX * 12);
              quickMarkerX(progressX * 8);
            };

            const onPointerLeave = () => {
              quickHeadingX(0);
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
              rotateTween.timeScale(1.15);
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
          });

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        },
      );

      return () => mm.revert();
    },
    { scope: heroRootRef },
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
        "hero-root relative w-full overflow-hidden bg-[#F7F7F2] px-0 py-0 text-text-primary",
        "min-h-[100dvh] lg:min-h-[100svh]",
        introHidden && "invisible pointer-events-none opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(255,168,0,0.1),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(245,90,10,0.1),transparent_20%),linear-gradient(180deg,#fcfbf9_0%,#f7f7f2_100%)]" />
      <div className="absolute inset-y-0 right-[22%] hidden w-px bg-[linear-gradient(180deg,rgba(16,24,40,0)_0%,rgba(16,24,40,0.08)_18%,rgba(16,24,40,0.04)_82%,rgba(16,24,40,0)_100%)] lg:block" />

      <div className="relative z-[2] flex min-h-[100dvh] flex-col px-[clamp(22px,4vw,56px)] pt-[clamp(24px,4vw,52px)] pb-0 lg:min-h-[100svh] lg:px-[clamp(28px,5vw,80px)] lg:pt-[clamp(28px,4vw,56px)]">
        <div
          ref={heroChromeRef}
          className="relative z-[20] flex items-start justify-between gap-4"
        >
          <Link
            ref={heroLogoRef}
            href="#home"
            className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F2]"
          >
            <Image
              src="/brand/tattvatech-logo.png"
              alt="TattvaTech logo"
              width={150}
              height={42}
              priority
              className="h-auto w-[clamp(108px,9vw,150px)] object-contain"
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
          className="relative z-[10] flex flex-1 flex-col justify-between pt-10 lg:pt-14"
        >
          <div className="pt-8 lg:pt-14">
            <div ref={heroLabelRef}>
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-orange-primary">
                Parent technology brand
              </p>
            </div>

            <div className="relative mt-4 overflow-visible">
              <div className="overflow-hidden">
                <h1
                  ref={heroHeadingRef}
                  className="font-heading text-[clamp(4.9rem,17vw,18rem)] leading-[0.78] tracking-[-0.075em] text-text-primary"
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
                <p className="max-w-[34ch] text-[clamp(1rem,1.3vw,1.16rem)] leading-7 text-text-secondary">
                  Four connected verticals, one clear operating system for services, products, drones, and training.
                </p>

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
          </div>

          <div
            ref={heroVisualRef}
            className="relative mt-10 lg:mt-14"
          >
            <div
              ref={heroActionsRef}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7"
            >
              {heroPreviewCards.map((card, index) => (
                <Link
                  key={card.id}
                  ref={(node) => {
                    previewCardRefs.current[index] = node;
                  }}
                  href={card.href}
                  className="group relative isolate aspect-[16/9] overflow-hidden rounded-t-[22px] border border-[rgba(16,24,40,0.08)] bg-white/86 shadow-[0_24px_54px_rgba(16,24,40,0.08)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover object-center opacity-[0.9] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,40,0.05)_0%,rgba(16,24,40,0.12)_38%,rgba(16,24,40,0.72)_100%)]" />
                  <div className={cn("absolute inset-0 bg-gradient-to-br", card.accent)} />

                  <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.34)_1px,transparent_1px)] [background-size:32px_32px]" />

                  <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-4 px-5 py-5 md:px-6">
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                        Preview {index + 1}
                      </p>
                      <h2 className="mt-2 font-heading text-[clamp(1.5rem,2.3vw,2.5rem)] leading-[0.98] tracking-[-0.04em] text-white">
                        {card.title}
                      </h2>
                      <p className="mt-2 max-w-[28ch] text-sm leading-6 text-white/76">
                        {card.description}
                      </p>
                    </div>

                    <span className="inline-flex rounded-full border border-white/12 bg-white/8 p-3 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                      <ArrowDownRight aria-hidden="true" className="size-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
