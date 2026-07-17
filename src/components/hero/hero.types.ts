import type { MutableRefObject } from "react";

export type HeroRefs = {
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

export type HeroVertical = {
  id: string;
  number: string;
  label: string;
  href: string;
  description: string;
};
