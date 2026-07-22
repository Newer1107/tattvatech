import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const durations = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.9,
} as const;

export const easings = {
  enter: "power3.out",
  exit: "power2.in",
  smooth: "power3.inOut",
  spring: "back.out(1.5)",
} as const;

export const scrollConfig = {
  reveal: "top 82%",
  scrub: 0.8,
} as const;

export { gsap, ScrollTrigger };
