export type IntroPhase = "intro" | "transitioning" | "complete";

export const introTimings = {
  whiteScreenHold: 0.4,
  compositionEnter: 0.8,
  compositionHold: 0.72,
  split: 1.02,
  previewReveal: 0.58,
  previewExpand: 1.42,
  logoToNavbar: 1.12,
  navbarReveal: 0.48,
  heroStagger: 0.1,
  overlayFade: 0.15,
} as const;

export const introEase = {
  reveal: "power3.out",
  expand: "power3.inOut",
} as const;

export const introAssets = {
  logo: "/brand/tattvatech-logo.png",
  hero: "/placeholders/hero-placeholder.jpg",
} as const;
