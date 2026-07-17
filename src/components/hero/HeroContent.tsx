import type { RefObject } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { HeroVertical } from "./hero.types";
import { HeroVerticalNavigation } from "./HeroVerticalNavigation";

type HeroContentProps = {
  labelRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  actionsRef: RefObject<HTMLDivElement | null>;
  activeVertical: number | null;
  verticals: HeroVertical[];
  onHoverVertical: (index: number | null) => void;
  onSelectVertical: (index: number) => void;
  onRevealStructure: () => void;
};

export function HeroContent({
  labelRef,
  headingRef,
  bodyRef,
  actionsRef,
  activeVertical,
  verticals,
  onHoverVertical,
  onSelectVertical,
  onRevealStructure,
}: HeroContentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-10 pb-8 pt-8 lg:pt-14">
      <div className="flex max-w-[40rem] flex-col gap-6">
        <div ref={labelRef} className="flex items-center gap-3">
          <span className="h-px w-10 bg-orange-primary" />
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/72">
            TattvaTech
          </p>
        </div>

        <h1
          ref={headingRef}
          className="font-heading text-[clamp(3.4rem,6.5vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white"
        >
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              Engineering
            </span>
          </span>
          <span className="mt-1 block overflow-hidden pl-[0.02em]">
            <span data-hero-line data-hero-line-secondary className="block">
              what moves next.
            </span>
          </span>
        </h1>

        <div ref={bodyRef} className="max-w-[34rem]">
          <p
            data-hero-support
            className="text-[clamp(1rem,1.15vw,1.25rem)] leading-[1.55] text-white/72"
          >
            Technology, products, drones, and training built around real-world needs.
          </p>
        </div>

        <div ref={actionsRef} className="flex flex-wrap items-center gap-4">
          <Link
            href="#businesses"
            data-hero-cta
            className="group inline-flex h-[54px] items-center gap-3 rounded-full border border-[#F7DDC8] bg-[#FCFBF9] px-6 text-[0.95rem] font-semibold text-[#101828] transition-colors duration-300 hover:border-orange-primary hover:bg-[#F6E6D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
          >
            <span>Explore TattvaTech</span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-[20deg]" />
          </Link>
          <Link
            href="#contact"
            data-hero-cta
            className="group inline-flex h-[54px] items-center gap-3 rounded-full border border-white/12 px-1 text-[0.95rem] font-medium text-white transition-colors duration-300 hover:text-[#FFC56B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
          >
            <span className="px-5">Start a conversation</span>
            <span className="relative mr-4 h-px w-12 overflow-hidden bg-white/18">
              <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-orange-primary transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>
        </div>
      </div>

      <div data-hero-strip className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/42">
              Connected verticals
            </p>
            <button
              type="button"
              data-hero-utility
              onClick={onRevealStructure}
              className="inline-flex items-center gap-2 text-[0.84rem] font-medium text-white/76 transition-colors duration-300 hover:text-[#FFC56B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <span>Reveal structure</span>
              <ArrowRight className="size-4" />
            </button>
        </div>

        <HeroVerticalNavigation
          items={verticals}
          activeIndex={activeVertical}
          onHover={onHoverVertical}
          onSelect={onSelectVertical}
        />
      </div>
    </div>
  );
}
