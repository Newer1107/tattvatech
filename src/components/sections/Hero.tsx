"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MutableRefObject } from "react";
import { heroActions, heroContent, heroMenuItems } from "@/constants/hero";
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

  return (
    <section
      id="home"
      ref={heroRootRef}
      className={cn(
        "relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden bg-[#FAF8F5] text-[#101828]",
        "max-lg:h-auto max-lg:min-h-[100dvh]",
        introHidden && "invisible pointer-events-none opacity-0",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-1 flex-col px-[clamp(16px,2.8vw,34px)] pt-[clamp(20px,3vw,26px)] pb-[clamp(24px,3vw,32px)] max-lg:px-5 max-lg:pt-5 max-lg:pb-8">
        <div
          ref={heroChromeRef}
          className="flex items-start justify-between gap-6 max-lg:flex-col max-lg:items-start max-lg:gap-4"
        >
          <Link
            ref={heroLogoRef}
            href="#home"
            className="inline-flex rounded-sm text-[12px] uppercase tracking-[0.5em] text-[#101828] focus-visible:outline-none"
          >
            {heroContent.label}
          </Link>

          <nav
            ref={heroControlsRef}
            aria-label="Primary"
            className="flex items-center gap-1 rounded-full border border-[rgba(16,24,40,0.08)] bg-white px-3 py-2 shadow-[0_10px_30px_rgba(16,24,40,0.08)] max-sm:w-full max-sm:flex-wrap max-sm:justify-center"
          >
            {heroMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-[11px] font-medium text-[#101828] transition-colors duration-200 hover:bg-[rgba(16,24,40,0.04)] focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          ref={heroContentPanelRef}
          className="hero flex flex-1 min-h-0 items-center max-lg:block"
        >
          <div className="hero-inner grid h-full w-full grid-cols-[minmax(0,44%)_minmax(0,56%)] items-center gap-[clamp(20px,2.6vw,40px)] max-lg:grid-cols-1 max-lg:gap-10">
            <div className="hero-copy min-w-0 overflow-visible pr-[clamp(24px,2.5vw,48px)] pl-[clamp(64px,5vw,96px)] max-lg:px-0">
              <div ref={heroLabelRef} aria-hidden="true" className="sr-only">
                TattvaTech Hero
              </div>

              <h1
                ref={heroHeadingRef}
                className={cn(
                  "hero-title flex w-full max-w-none flex-col overflow-visible whitespace-nowrap font-heading font-normal leading-[0.9] tracking-[-0.055em] text-[#101828]",
                  "text-[clamp(4rem,5.3vw,6.6rem)]",
                  "[@media(max-height:820px)_and_(min-width:1024px)]:text-[clamp(3.5rem,4.8vw,5.6rem)]",
                  "[@media(max-height:740px)_and_(min-width:1024px)]:text-[clamp(3.1rem,4.4vw,5rem)]",
                  "[@media(max-height:740px)_and_(min-width:1024px)]:leading-[0.92]",
                  "max-md:text-[clamp(3rem,13vw,4.6rem)] max-md:whitespace-normal",
                )}
              >
                {heroContent.headingLines.map((line) => (
                  <span key={line} className="block overflow-visible">
                    {line}
                  </span>
                ))}
              </h1>

              <div
                ref={heroBodyRef}
                className="mt-6 max-w-[32ch] text-[16px] leading-[1.35] text-[#475467] max-lg:mt-5"
              >
                <p>
                  {heroContent.bodyLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div
                ref={heroActionsRef}
                className="mt-9 flex items-center gap-7 text-sm text-[#101828] max-lg:mt-7 max-sm:flex-wrap max-sm:gap-4"
              >
                <Link
                  href={heroActions.primary.href}
                  className="inline-flex items-center text-[11px] font-medium text-[#101828] transition-opacity duration-200 hover:opacity-65 focus-visible:outline-none"
                >
                  {heroActions.primary.label}
                </Link>

                <Link
                  href={heroActions.secondary.href}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[rgba(16,24,40,0.7)] px-5 text-[13px] font-medium text-[#101828] transition-colors duration-200 hover:bg-[rgba(16,24,40,0.03)] focus-visible:outline-none"
                >
                  <span>{heroActions.secondary.label}</span>
                  <ArrowUpRight className="size-3.5 stroke-[1.8]" />
                </Link>
              </div>
            </div>

            <div
              ref={heroVisualRef}
              className="hero-visual relative flex min-h-[360px] w-full items-center justify-center self-stretch max-lg:min-h-[320px]"
            >
              <div className="relative flex w-full items-center justify-center border-none outline-none shadow-none">
                <div
                  className="hero-browser relative aspect-[537/377] w-[min(92%,760px)] max-w-none overflow-visible border-none outline-none shadow-none max-lg:w-full"
                >
                  <div className="absolute left-[3%] top-[17%] z-[1] h-[68%] w-[92%] rounded-[14px] border border-[rgba(15,23,42,0.45)] bg-white" />

                  <div className="absolute left-[3%] top-[17%] z-[2] flex h-[10.5%] w-[92%] items-center rounded-t-[14px] border border-b-0 border-[rgba(15,23,42,0.45)] bg-[#FAF8F5] px-[4.5%]">
                    <span className="size-[10px] rounded-full border border-[rgba(16,24,40,0.75)]" />
                    <span className="ml-2 size-[10px] rounded-full border border-[rgba(16,24,40,0.75)]" />
                    <span className="ml-2 size-[10px] rounded-full border border-[rgba(16,24,40,0.75)]" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-[3] h-[96%]">
                    <Image
                      src="/images/hero/Hero-Section.svg"
                      alt="Hand artwork inside the hero browser frame"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
