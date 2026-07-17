import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motionDurations } from "./durations";
import { motionEasings } from "./easings";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const motionMedia = {
  desktop: "(min-width: 1024px)",
  tabletUp: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  pointerFine: "(hover: hover) and (pointer: fine)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export const motionScroll = {
  revealStart: "top 84%",
  narrativeStart: "top top",
  scrub: 0.85,
  sectionDistance: 1,
} as const;

export { gsap, ScrollTrigger, useGSAP, motionDurations, motionEasings };
