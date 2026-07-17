"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRef, useState, type MutableRefObject } from "react";
import {
  gsap,
  motionMedia,
  motionScroll,
  useGSAP,
} from "@/animations/config";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { PageContainer } from "./PageContainer";

type NavbarRefs = {
  navbarRootRef: MutableRefObject<HTMLElement | null>;
  navbarRevealRef: MutableRefObject<HTMLDivElement | null>;
  navbarLogoTargetRef: MutableRefObject<HTMLDivElement | null>;
  navbarSymbolRef: MutableRefObject<HTMLDivElement | null>;
  navbarContentRef: MutableRefObject<HTMLDivElement | null>;
};

type NavbarProps = {
  navbarReady: boolean;
  refs: NavbarRefs;
};

export function Navbar({ navbarReady, refs }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const {
    navbarRootRef,
    navbarRevealRef,
    navbarLogoTargetRef,
    navbarSymbolRef,
    navbarContentRef,
  } = refs;

  useGSAP(
    () => {
      const root = navbarRootRef.current;
      const indicator = indicatorRef.current;
      const nav = navRef.current;

      if (!root || !indicator || !nav) {
        return;
      }

      const hero = root.closest(".hero-root");
      const items = Array.from(
        nav.querySelectorAll<HTMLElement>("[data-nav-item]"),
      );

      const setIndicator = (element: HTMLElement | null) => {
        if (!element) {
          gsap.to(indicator, {
            autoAlpha: 0,
            duration: 0.18,
            ease: "power2.out",
          });
          return;
        }

        const navBox = nav.getBoundingClientRect();
        const box = element.getBoundingClientRect();

        gsap.to(indicator, {
          autoAlpha: 1,
          x: box.left - navBox.left,
          width: box.width,
          duration: 0.28,
          ease: "power2.out",
        });
      };

      const activeItem = items[0] ?? null;
      setIndicator(activeItem);

      const mm = gsap.matchMedia();
      mm.add(
        {
          finePointer: motionMedia.pointerFine,
          reduceMotion: motionMedia.reduceMotion,
        },
        (context) => {
          const { finePointer, reduceMotion } = context.conditions as {
            finePointer?: boolean;
            reduceMotion?: boolean;
          };

          const cleanups: Array<() => void> = [];

          if (hero && !reduceMotion) {
            gsap.fromTo(
              root,
              { autoAlpha: 1, y: 0 },
              {
                autoAlpha: 0,
                y: -14,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "bottom 18%",
                  end: "bottom top",
                  scrub: motionScroll.scrub,
                },
              },
            );
          }

          if (finePointer) {
            items.forEach((item) => {
              const onEnter = () => setIndicator(item);
              const onLeave = () => setIndicator(activeItem);

              item.addEventListener("mouseenter", onEnter);
              item.addEventListener("mouseleave", onLeave);

              cleanups.push(() => {
                item.removeEventListener("mouseenter", onEnter);
                item.removeEventListener("mouseleave", onLeave);
              });
            });
          }

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        },
      );

      return () => mm.revert();
    },
    { dependencies: [navbarReady], scope: navbarRootRef },
  );

  return (
    <header
      ref={navbarRootRef}
      className={cn(
        "navbar-root absolute inset-x-0 top-0 z-[50]",
        navbarReady
          ? "visible opacity-100 pointer-events-auto"
          : "invisible opacity-0 pointer-events-none",
      )}
    >
      <PageContainer className="px-5 md:px-8 xl:px-12">
        <div
          ref={navbarRevealRef}
          className="mx-auto mt-5 w-full max-w-[1220px] rounded-[26px] border border-white/8 bg-[rgba(16,24,40,0.88)] px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-[18px] md:mt-7 md:px-5 md:py-4"
        >
          <div className="flex items-center justify-between gap-6 md:hidden">
            <Link
              href="#home"
              className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <div className="relative h-[52px] w-[184px]">
                <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
                <div ref={navbarSymbolRef} className="absolute inset-0">
                  <Image
                    src="/brand/tattvatech-logo.png"
                    alt="TattvaTech logo"
                    width={184}
                    height={52}
                    priority
                    fetchPriority="high"
                    className="h-auto w-full object-contain object-left"
                  />
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            ref={navbarContentRef}
            className="hidden grid-cols-[auto_1fr_auto] items-center gap-6 md:grid"
          >
            <Link
              href="#home"
              className="flex items-center rounded-md pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <div className="relative h-[58px] w-[220px] shrink-0">
                <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
                <div ref={navbarSymbolRef} className="absolute inset-0">
                  <Image
                    src="/brand/tattvatech-logo.png"
                    alt="TattvaTech logo"
                    width={220}
                    height={58}
                    priority
                    fetchPriority="high"
                    className="h-auto w-full object-contain object-left"
                  />
                </div>
              </div>
            </Link>

            <div className="flex justify-center">
              <nav
                ref={navRef}
                aria-label="Primary"
                className="relative flex items-center gap-7 lg:gap-9"
              >
                <span
                  ref={indicatorRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-0.55rem] left-0 h-px w-12 bg-[image:var(--brand-gradient)] opacity-0"
                />
                {navigationItems.slice(1).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href ?? "#home"}
                    data-nav-item
                    className="relative pb-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-white/72 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex justify-end">
              <ButtonLink href="#contact">Start a Project</ButtonLink>
            </div>
          </div>

          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </PageContainer>
    </header>
  );
}
