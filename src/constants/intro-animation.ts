export type IntroPhase = "intro" | "transitioning" | "complete";

export const introTimings = {
  whiteScreenHold: 0.4,
  compositionEnter: 0.82,
  compositionHold: 1.4,
  split: 0.78,
  previewReveal: 0.42,
  previewExpand: 1.24,
  logoToNavbar: 0.94,
  navbarReveal: 0.46,
  heroStagger: 0.1,
  overlayFade: 0.14,
} as const;

export const introEase = {
  reveal: "power3.out",
  expand: "power3.inOut",
} as const;

export const introAssets = {
  logo: "/brand/animation-logo.png",
  hero: "/placeholders/hero-placeholder.jpg",
} as const;
