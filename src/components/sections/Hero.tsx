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
    labelShort: "SERVICES",
    href: "#tattvatech-services",
    phrase: "Systems built for delivery.",
  },
  {
    id: "products",
    number: "02",
    label: "Products",
    labelShort: "PRODUCTS",
    href: "#tattvatech-products",
    phrase: "Reusable software at scale.",
  },
  {
    id: "drones",
    number: "03",
    label: "Drones",
    labelShort: "DRONES",
    href: "#tattvatech-drones",
    phrase: "Technology applied in the field.",
  },
  {
    id: "training",
    number: "04",
    label: "Training",
    labelShort: "TRAINING",
    href: "#tattvatech-training",
    phrase: "Capability built through practice.",
  },
] as const;

const controlBaseClasses =
  "inline-flex h-[52px] items-center justify-center rounded-full transition-[transform,background-color,color,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5EF]";

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
  const activeVertical = hoveredVertical ?? selectedVertical;

  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const orbButtonRef = useRef<HTMLAnchorElement | null>(null);
  const orbWrapRef = useRef<HTMLSpanElement | null>(null);
  const orbSegmentRefs = useRef<Array<SVGPathElement | null>>([]);
  const orbPulseWrapRef = useRef<SVGGElement | null>(null);
  const orbPulseDotRef = useRef<SVGCircleElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaFillRef = useRef<HTMLSpanElement | null>(null);
  const ctaLabelRef = useRef<HTMLSpanElement | null>(null);
  const ctaIconRef = useRef<HTMLSpanElement | null>(null);
  const systemGroupRef = useRef<SVGGElement | null>(null);
  const systemGlowRef = useRef<HTMLDivElement | null>(null);
  const connectorRefs = useRef<Array<SVGPathElement | null>>([]);
  const railRefs = useRef<Array<SVGPathElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const selectorRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const selectorLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const selectorNumberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const selectorCopyRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const titleSegmentRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const signalRef = useRef<HTMLSpanElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const markerValueRef = useRef<HTMLParagraphElement | null>(null);
  const markerLabelRef = useRef<HTMLParagraphElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const nodeTweensRef = useRef<Array<gsap.core.Tween | null>>([]);
  const signalTweenRef = useRef<gsap.core.Tween | null>(null);

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
      const actions = heroActionsRef.current;
      const visual = heroVisualRef.current;
      const glow = systemGlowRef.current;
      const orbButton = orbButtonRef.current;
      const orbWrap = orbWrapRef.current;
      const orbSegments = orbSegmentRefs.current.filter(
        (segment): segment is SVGPathElement => segment instanceof SVGPathElement,
      );
      const orbPulseWrap = orbPulseWrapRef.current;
      const orbPulseDot = orbPulseDotRef.current;
      const cta = ctaRef.current;
      const ctaFill = ctaFillRef.current;
      const ctaLabel = ctaLabelRef.current;
      const ctaIcon = ctaIconRef.current;
      const systemGroup = systemGroupRef.current;
      const connectors = connectorRefs.current.filter(
        (path): path is SVGPathElement => path instanceof SVGPathElement,
      );
      const rails = railRefs.current.filter(
        (path): path is SVGPathElement => path instanceof SVGPathElement,
      );
      const nodes = nodeRefs.current.filter(
        (node): node is HTMLSpanElement => node instanceof HTMLSpanElement,
      );
      const selectors = selectorRefs.current.filter(
        (selector): selector is HTMLAnchorElement => selector instanceof HTMLAnchorElement,
      );
      const signal = signalRef.current;
      const marker = markerRef.current;
      const arrow = arrowRef.current;

      if (
        !root ||
        !chrome ||
        !controls ||
        !content ||
        !heading ||
        !body ||
        !actions ||
        !visual ||
        !glow ||
        !orbButton ||
        !orbWrap ||
        !orbSegments.length ||
        !orbPulseWrap ||
        !orbPulseDot ||
        !cta ||
        !ctaFill ||
        !ctaLabel ||
        !ctaIcon ||
        !systemGroup ||
        !connectors.length ||
        !rails.length ||
        !nodes.length ||
        !selectors.length ||
        !signal ||
        !marker ||
        !arrow
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
              [chrome, controls, heading, body, actions, visual, glow, systemGroup, signal],
              { clearProps: "all" },
            );
            gsap.set([...connectors, ...rails], {
              clearProps: "all",
              strokeDashoffset: 0,
            });
            gsap.set(nodes, { clearProps: "all" });
            return;
          }

          const connectorLengths = connectors.map((path) => path.getTotalLength());
          const railLengths = rails.map((path) => path.getTotalLength());

          if (introHidden) {
            gsap.set(connectors, {
              strokeDasharray: (index: number) => connectorLengths[index] ?? 0,
              strokeDashoffset: (index: number) => connectorLengths[index] ?? 0,
            });
            gsap.set(rails, {
              strokeDasharray: (index: number) => railLengths[index] ?? 0,
              strokeDashoffset: (index: number) => railLengths[index] ?? 0,
            });
            gsap.set(nodes, {
              autoAlpha: 0,
              scale: 0.8,
            });
            gsap.set([signal, ...selectors], {
              autoAlpha: 0,
            });
            return;
          }

          gsap.set(connectors, {
            strokeDasharray: (index: number) => connectorLengths[index] ?? 0,
            strokeDashoffset: (index: number) => connectorLengths[index] ?? 0,
          });
          gsap.set(rails, {
            strokeDasharray: (index: number) => railLengths[index] ?? 0,
            strokeDashoffset: (index: number) => railLengths[index] ?? 0,
          });
          gsap.set(nodes, {
            autoAlpha: 0,
            scale: 0.8,
          });
          gsap.set(signal, {
            autoAlpha: 0,
            scale: 0.82,
          });
          gsap.set(selectors, {
            autoAlpha: 0,
            y: 14,
          });

          const introTimeline = gsap.timeline({
            defaults: {
              ease: "power2.out",
            },
          });

          introTimeline
            .to(
              connectors,
              {
                strokeDashoffset: 0,
                duration: 0.4,
                stagger: 0.04,
              },
              0,
            )
            .to(
              rails,
              {
                strokeDashoffset: 0,
                duration: 0.6,
                stagger: 0.06,
              },
              0.08,
            )
            .to(
              nodes,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.22,
                stagger: 0.05,
              },
              0.28,
            )
            .to(
              signal,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.22,
              },
              0.36,
            )
            .to(
              selectors,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.28,
                stagger: 0.05,
              },
              0.44,
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
                autoAlpha: 0.3,
                y: -8,
                ease: "none",
              },
              0,
            )
            .to(
              heading,
              {
                y: desktop ? -16 : -8,
                ease: "none",
              },
              0,
            )
            .to(
              body,
              {
                y: desktop ? -18 : -10,
                ease: "none",
              },
              0,
            )
            .to(
              visual,
              {
                y: desktop ? -18 : -8,
                ease: "none",
              },
              0,
            )
            .to(
              glow,
              {
                scale: desktop ? 1.08 : 1.03,
                y: desktop ? 20 : 10,
                ease: "none",
              },
              0,
            )
            .to(
              actions,
              {
                autoAlpha: 0.46,
                y: desktop ? -16 : -8,
                ease: "none",
              },
              0,
            )
            .to(
              arrow,
              {
                x: desktop ? 12 : 7,
                y: desktop ? 18 : 10,
                ease: "none",
              },
              0,
            )
            .to(
              signal,
              {
                y: desktop ? 36 : 18,
                ease: "none",
              },
              0,
            );

          const orbSegmentTweens = orbSegments.map((segment, index) =>
            gsap.to(segment, {
              strokeDashoffset: -24,
              duration: 4.4 + index * 0.4,
              ease: "none",
              repeat: -1,
            }),
          );

          const orbPulseTween = gsap.to(orbPulseWrap, {
            rotate: 360,
            duration: 6.2,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });

          const orbPulseDotTween = gsap.to(orbPulseDot, {
            scale: 1.18,
            opacity: 1,
            duration: 0.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 50%",
          });

          const arrowTween = gsap.to(arrow, {
            x: 7,
            y: 7,
            duration: 1.9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          const ctaHoverTimeline = gsap.timeline({ paused: true });
          ctaHoverTimeline
            .to(
              ctaFill,
              {
                scaleX: 1,
                transformOrigin: "left center",
                duration: 0.45,
                ease: "power3.out",
              },
              0,
            )
            .to(
              ctaLabel,
              {
                x: -2,
                duration: 0.32,
                ease: "power3.out",
              },
              0,
            )
            .to(
              ctaIcon,
              {
                x: 3,
                y: -3,
                rotate: 8,
                duration: 0.35,
                ease: "power3.out",
              },
              0,
            );

          const onCtaEnter = () => ctaHoverTimeline.play();
          const onCtaLeave = () => ctaHoverTimeline.reverse();

          cta.addEventListener("mouseenter", onCtaEnter);
          cta.addEventListener("mouseleave", onCtaLeave);
          cta.addEventListener("focus", onCtaEnter);
          cta.addEventListener("blur", onCtaLeave);

          nodeTweensRef.current = nodes.map((node, index) => {
            const desktopOffsets = [
              {
                x: [0, 0, 12, 12, 0],
                y: [0, 70, 160, 256, 334],
                duration: 8.2,
              },
              {
                x: [0, 0, 10, 10, 0],
                y: [0, 54, 142, 222, 306],
                duration: 8.7,
              },
              {
                x: [0, 0, 9, 9, 0],
                y: [0, 46, 136, 228, 320],
                duration: 8.4,
              },
              {
                x: [0, 0, 8, 8, 0],
                y: [0, 60, 154, 246, 332],
                duration: 9,
              },
            ][index];

            return gsap.to(node, {
              keyframes: [
                {
                  x: desktopOffsets.x[0],
                  y: desktopOffsets.y[0],
                  duration: desktopOffsets.duration * 0.1,
                },
                {
                  x: desktopOffsets.x[1],
                  y: desktopOffsets.y[1],
                  duration: desktopOffsets.duration * 0.22,
                },
                {
                  x: desktopOffsets.x[2],
                  y: desktopOffsets.y[2],
                  duration: desktopOffsets.duration * 0.22,
                },
                {
                  x: desktopOffsets.x[3],
                  y: desktopOffsets.y[3],
                  duration: desktopOffsets.duration * 0.23,
                },
                {
                  x: desktopOffsets.x[4],
                  y: desktopOffsets.y[4],
                  duration: desktopOffsets.duration * 0.23,
                },
              ],
              ease: "none",
              repeat: -1,
            });
          });

          signalTweenRef.current = gsap.to(signal, {
            keyframes: [
              { x: 0, y: 0, duration: 0.8 },
              { x: 160, y: 18, duration: 1.5 },
              { x: 330, y: 48, duration: 1.7 },
              { x: 498, y: 96, duration: 1.7 },
              { x: 664, y: 138, duration: 1.6 },
              { x: 352, y: 8, duration: 1.2 },
            ],
            ease: "none",
            repeat: -1,
          });

          if (finePointer) {
            const quickRailsX = gsap.quickTo(systemGroup, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickRailsY = gsap.quickTo(systemGroup, "y", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickGlowX = gsap.quickTo(glow, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const quickGlowY = gsap.quickTo(glow, "y", {
              duration: 0.8,
              ease: "power3.out",
            });

            const onPointerMove = (event: PointerEvent) => {
              const bounds = root.getBoundingClientRect();
              const progressX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const progressY = (event.clientY - bounds.top) / bounds.height - 0.5;

              quickRailsX(progressX * 8);
              quickRailsY(progressY * 4);
              quickGlowX(progressX * 12);
              quickGlowY(progressY * 8);
            };

            const onPointerLeave = () => {
              quickRailsX(0);
              quickRailsY(0);
              quickGlowX(0);
              quickGlowY(0);
            };

            const orbHoverTimeline = gsap.timeline({ paused: true });
            orbHoverTimeline
              .to(
                orbButton,
                {
                  scale: 1.08,
                  backgroundColor: "#101828",
                  duration: 0.24,
                  ease: "power2.out",
                },
                0,
              )
              .to(
                orbSegments,
                {
                  stroke: "#ffffff",
                  duration: 0.24,
                  ease: "power2.out",
                },
                0,
              )
              .to(
                orbPulseDot,
                {
                  fill: "#FF7A00",
                  duration: 0.24,
                  ease: "power2.out",
                },
                0,
              );

            const onOrbEnter = () => {
              orbSegmentTweens.forEach((tween) => tween.timeScale(1.55));
              orbPulseTween.timeScale(1.35);
              orbHoverTimeline.play();
            };

            const onOrbLeave = () => {
              orbSegmentTweens.forEach((tween) => tween.timeScale(1));
              orbPulseTween.timeScale(1);
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
            cta.removeEventListener("mouseenter", onCtaEnter);
            cta.removeEventListener("mouseleave", onCtaLeave);
            cta.removeEventListener("focus", onCtaEnter);
            cta.removeEventListener("blur", onCtaLeave);
            ctaHoverTimeline.kill();
            orbSegmentTweens.forEach((tween) => tween.kill());
            orbPulseTween.kill();
            orbPulseDotTween.kill();
            arrowTween.kill();
            signalTweenRef.current?.kill();
            signalTweenRef.current = null;
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
      const systemGroup = systemGroupRef.current;
      const markerValue = markerValueRef.current;
      const markerLabel = markerLabelRef.current;
      const rails = railRefs.current.filter(
        (path): path is SVGPathElement => path instanceof SVGPathElement,
      );
      const connectors = connectorRefs.current.filter(
        (path): path is SVGPathElement => path instanceof SVGPathElement,
      );
      const nodes = nodeRefs.current.filter(
        (node): node is HTMLSpanElement => node instanceof HTMLSpanElement,
      );
      const selectorLines = selectorLineRefs.current.filter(
        (line): line is HTMLSpanElement => line instanceof HTMLSpanElement,
      );
      const selectorNumbers = selectorNumberRefs.current.filter(
        (number): number is HTMLSpanElement => number instanceof HTMLSpanElement,
      );
      const selectorCopy = selectorCopyRefs.current.filter(
        (copy): copy is HTMLSpanElement => copy instanceof HTMLSpanElement,
      );
      const titleSegments = titleSegmentRefs.current.filter(
        (segment): segment is HTMLSpanElement => segment instanceof HTMLSpanElement,
      );

      if (
        !systemGroup ||
        !markerValue ||
        !markerLabel ||
        !rails.length ||
        !connectors.length ||
        !selectorLines.length ||
        !selectorNumbers.length ||
        !selectorCopy.length ||
        !titleSegments.length
      ) {
        return;
      }

      const offsets = [-8, -2, 4, 10];

      if (activeVertical === null) {
        markerValue.textContent = "04";
        markerLabel.textContent = "CONNECTED VERTICALS";
      } else {
        markerValue.textContent = heroVerticals[activeVertical].number;
        markerLabel.textContent = heroVerticals[activeVertical].labelShort;
      }

      rails.forEach((rail, index) => {
        gsap.to(rail, {
          stroke:
            activeVertical === index ? "#F55A0A" : "rgba(16,24,40,0.18)",
          opacity: activeVertical === null ? 0.76 : activeVertical === index ? 1 : 0.42,
          strokeWidth: activeVertical === index ? 3 : 2.1,
          duration: 0.28,
          ease: "power2.out",
        });
      });

      connectors.forEach((connector, index) => {
        gsap.to(connector, {
          stroke:
            activeVertical === null
              ? "rgba(16,24,40,0.12)"
              : index <= activeVertical
                ? "rgba(245,90,10,0.42)"
                : "rgba(16,24,40,0.12)",
          opacity: activeVertical === null ? 1 : index <= activeVertical ? 1 : 0.56,
          duration: 0.28,
          ease: "power2.out",
        });
      });

      selectorLines.forEach((line, index) => {
        gsap.to(line, {
          scaleX: activeVertical === index ? 1 : 0,
          transformOrigin: "left center",
          duration: 0.32,
          ease: "power3.out",
        });
      });

      selectorNumbers.forEach((number, index) => {
        gsap.to(number, {
          y: activeVertical === index ? -4 : 0,
          color: activeVertical === index ? "#F55A0A" : "rgba(71,84,103,1)",
          duration: 0.24,
          ease: "power2.out",
        });
      });

      selectorCopy.forEach((copy, index) => {
        gsap.to(copy, {
          autoAlpha: activeVertical === null ? 0.74 : activeVertical === index ? 1 : 0.52,
          duration: 0.24,
          ease: "power2.out",
        });
      });

      titleSegments.forEach((segment, index) => {
        gsap.to(segment, {
          x: activeVertical === index ? 2 : 0,
          y: activeVertical === index ? -3 : 0,
          opacity: activeVertical === null ? 1 : activeVertical === index ? 1 : 0.84,
          duration: 0.32,
          ease: "power2.out",
        });
      });

      nodes.forEach((node, index) => {
        gsap.to(node, {
          scale: activeVertical === index ? 1.22 : 1,
          opacity: activeVertical === null ? 1 : activeVertical === index ? 1 : 0.6,
          duration: 0.28,
          ease: "power2.out",
        });
      });

      gsap.to(systemGroup, {
        x: activeVertical === null ? 0 : offsets[activeVertical] ?? 0,
        duration: 0.48,
        ease: "power3.out",
      });

      nodeTweensRef.current.forEach((tween, index) => {
        tween?.timeScale(activeVertical === index ? 1.35 : 1);
      });

      signalTweenRef.current?.timeScale(activeVertical === null ? 1 : 1.26);
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,168,0,0.1),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(245,90,10,0.08),transparent_20%)]" />
      <div
        ref={systemGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[14%] top-[20%] z-[1] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(245,90,10,0.08)_0%,rgba(245,90,10,0)_68%)] blur-[8px]"
      />

      <div
        ref={heroVisualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <div className="absolute inset-y-[9%] left-[5%] right-[6%] hidden lg:block">
          <svg viewBox="0 0 1320 820" className="h-full w-full overflow-visible">
            <g ref={systemGroupRef}>
              {[250, 468, 686, 904].map((x, index) => (
                <path
                  key={`connector-${x}`}
                  ref={(node) => {
                    connectorRefs.current[index] = node;
                  }}
                  d={`M${x} 118C${x} 170 ${x} 194 ${x + 2} 230H608`}
                  fill="none"
                  stroke="rgba(16,24,40,0.12)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}

              {[250, 468, 686, 904].map((x, index) => (
                <path
                  key={`rail-${x}`}
                  ref={(node) => {
                    railRefs.current[index] = node;
                  }}
                  d={`M${x} 118V300C${x} 356 ${x + 16} 392 ${x + 16} 454V710`}
                  fill="none"
                  stroke="rgba(16,24,40,0.18)"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
              ))}

              {[250, 468, 686, 904].map((x, index) => (
                <text
                  key={`marker-${x}`}
                  x={x - 24}
                  y={88}
                  fill="rgba(16,24,40,0.22)"
                  fontSize="23"
                  letterSpacing="4"
                >
                  {`0${index + 1}`}
                </text>
              ))}

              <path
                d="M342 236H866"
                fill="none"
                stroke="rgba(245,90,10,0.06)"
                strokeWidth="104"
                strokeLinecap="square"
              />
              <path
                d="M610 236V444"
                fill="none"
                stroke="rgba(245,90,10,0.055)"
                strokeWidth="104"
                strokeLinecap="square"
              />
            </g>
          </svg>
        </div>

        <div className="absolute inset-0 lg:hidden">
          <svg viewBox="0 0 420 720" className="h-full w-full">
            {[86, 164, 242, 320].map((x, index) => (
              <path
                key={`m-connector-${x}`}
                d={`M${x} 144V198H206`}
                fill="none"
                stroke={
                  activeVertical === null
                    ? "rgba(16,24,40,0.12)"
                    : index <= activeVertical
                      ? "rgba(245,90,10,0.38)"
                      : "rgba(16,24,40,0.12)"
                }
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
            {[86, 164, 242, 320].map((x, index) => (
              <path
                key={`m-rail-${x}`}
                d={`M${x} 144V260C${x} 298 ${x + 8} 332 ${x + 8} 372V610`}
                fill="none"
                stroke={
                  activeVertical === index ? "#F55A0A" : "rgba(16,24,40,0.18)"
                }
                strokeWidth={activeVertical === index ? 2.8 : 2}
                strokeLinecap="round"
              />
            ))}
            <path
              d="M100 198H300"
              fill="none"
              stroke="rgba(245,90,10,0.05)"
              strokeWidth="60"
            />
            <path
              d="M198 198V318"
              fill="none"
              stroke="rgba(245,90,10,0.04)"
              strokeWidth="60"
            />
          </svg>
        </div>

        {[
          "left-[17%] top-[14%]",
          "left-[34.5%] top-[15.2%]",
          "left-[52%] top-[16.8%]",
          "left-[69.5%] top-[18.2%]",
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

        <span
          ref={signalRef}
          className="absolute left-[17%] top-[14%] hidden h-3.5 w-3.5 rounded-full bg-[#FF7A00] shadow-[0_0_0_10px_rgba(255,122,0,0.12)] lg:block"
        />
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
              ref={orbButtonRef}
              href="#summary"
              aria-label="Explore TattvaTech"
              className={cn(
                controlBaseClasses,
                "w-[52px] shrink-0 bg-[rgba(16,24,40,0.05)] text-text-primary",
              )}
            >
              <span ref={orbWrapRef} aria-hidden="true" className="inline-flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(16,24,40,0.12)"
                    strokeWidth="1"
                  />
                  {[
                    "M6.4 9.2C7.4 8.4 8.6 8.1 9.8 8.1",
                    "M9.8 8.1H14.2",
                    "M12 8.1V15.6",
                    "M9.4 15.6C10.2 16.2 11.1 16.5 12 16.5",
                  ].map((path, index) => (
                    <path
                      key={path}
                      ref={(node) => {
                        orbSegmentRefs.current[index] = node;
                      }}
                      d={path}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="12 12"
                    />
                  ))}
                  <g ref={orbPulseWrapRef}>
                    <circle
                      ref={orbPulseDotRef}
                      cx="17.6"
                      cy="6.6"
                      r="1.5"
                      fill="#F55A0A"
                    />
                  </g>
                </svg>
              </span>
            </Link>

            <Link
              ref={ctaRef}
              href="#contact"
              className={cn(
                "hero-cta relative hidden min-w-[164px] items-center justify-between gap-[18px] overflow-hidden rounded-full bg-[#101828] px-[24px] pr-[18px] text-white shadow-[0_18px_40px_rgba(16,24,40,0.14)] sm:inline-flex",
                controlBaseClasses,
              )}
            >
              <span
                ref={ctaFillRef}
                aria-hidden="true"
                className="absolute inset-0 z-[0] scale-x-0 bg-orange-primary"
              />
              <span
                ref={ctaLabelRef}
                className="hero-cta__label relative z-[1] whitespace-nowrap text-sm font-semibold text-white opacity-100"
              >
                Start a Project
              </span>
              <span
                ref={ctaIconRef}
                aria-hidden="true"
                className="hero-cta__icon relative z-[1] inline-flex text-white"
              >
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
          className="relative z-[10] flex flex-1 flex-col justify-between pt-8 max-md:pt-10 lg:pt-12"
        >
          <div className="flex flex-col gap-5">
            <div ref={heroLabelRef}>
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-orange-primary">
                Technology / Products / Drones / Training
              </p>
            </div>

            <div className="hero__heading-row w-full overflow-visible pr-[clamp(16px,2vw,36px)]">
              <div className="hero__title-mask overflow-hidden">
                <h1
                  ref={heroHeadingRef}
                  className="hero__title flex w-full whitespace-nowrap font-heading text-[min(14.2vw,15.5rem)] leading-[0.78] tracking-[-0.072em] text-text-primary max-md:text-[clamp(4.6rem,20vw,7rem)]"
                >
                  {["TAT", "TVA", "TEC", "H"].map((segment, index) => (
                    <span
                      key={segment}
                      ref={(node) => {
                        titleSegmentRefs.current[index] = node;
                      }}
                      className="inline-block"
                    >
                      {segment}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>

          <div
            ref={heroBodyRef}
            className="grid gap-10 pt-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(340px,1fr)_190px] lg:items-end"
          >
            <div className="max-w-[36ch]">
              <p className="text-[clamp(1rem,1.18vw,1.08rem)] leading-7 text-text-secondary">
                Four connected verticals built around practical systems, applied technology, and long-term capability.
              </p>
            </div>

            <div
              ref={heroActionsRef}
              className="grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4 lg:gap-x-6"
            >
              {heroVerticals.map((item, index) => (
                <Link
                  key={item.id}
                  ref={(node) => {
                    selectorRefs.current[index] = node;
                  }}
                  href={item.href}
                  onMouseEnter={() => setHoveredVertical(index)}
                  onMouseLeave={() => setHoveredVertical(null)}
                  onFocus={() => setHoveredVertical(index)}
                  onBlur={() => setHoveredVertical(null)}
                  onClick={() => setSelectedVertical(index)}
                  className="group relative border-t border-[rgba(16,24,40,0.14)] pt-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                >
                  <span
                    ref={(node) => {
                      selectorLineRefs.current[index] = node;
                    }}
                    aria-hidden="true"
                    className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-orange-primary"
                  />
                  <span
                    ref={(node) => {
                      selectorNumberRefs.current[index] = node;
                    }}
                    className="block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-secondary"
                  >
                    {item.number}
                  </span>
                  <span className="mt-2 block font-heading text-[1rem] tracking-[-0.03em] text-text-primary">
                    {item.label}
                  </span>
                  <span
                    ref={(node) => {
                      selectorCopyRefs.current[index] = node;
                    }}
                    className="mt-1.5 block text-[0.82rem] leading-5 text-text-secondary"
                  >
                    {item.phrase}
                  </span>
                </Link>
              ))}
            </div>

            <div
              ref={markerRef}
              className="flex items-end justify-between gap-5 lg:flex-col lg:items-start lg:justify-start"
            >
              <div>
                <p
                  ref={markerLabelRef}
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-muted"
                >
                  CONNECTED VERTICALS
                </p>
                <p
                  ref={markerValueRef}
                  className="mt-2 font-heading text-[clamp(2rem,4vw,4.5rem)] leading-none tracking-[-0.05em] text-text-primary"
                >
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
    </section>
  );
}
