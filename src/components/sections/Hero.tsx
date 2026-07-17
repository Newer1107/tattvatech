"use client";

import { TattvaTechHero } from "@/components/hero/TattvaTechHero";
import type { HeroRefs } from "@/components/hero/hero.types";

type HeroProps = {
  refs: HeroRefs;
  introHidden?: boolean;
};

export function Hero(props: HeroProps) {
  return <TattvaTechHero {...props} />;
}
