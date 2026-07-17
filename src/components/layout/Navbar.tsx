"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type MutableRefObject } from "react";
import { navigationGroups, navigationItems } from "@/constants/navigation";
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
  const {
    navbarRootRef,
    navbarRevealRef,
    navbarLogoTargetRef,
    navbarSymbolRef,
    navbarContentRef,
  } = refs;

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
          className="rounded-b-[28px] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.64)_100%)] px-4 py-4 shadow-[0_18px_42px_rgba(16,24,40,0.08)] backdrop-blur-xl md:px-5"
        >
          <div className="flex items-center justify-between gap-6 md:hidden">
            <Link
              href="#home"
              className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <div className="relative h-11 w-[148px]">
                <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
                <div ref={navbarSymbolRef} className="absolute inset-0">
                  <Image
                    src="/brand/tattvatech-logo.png"
                    alt="TattvaTech logo"
                    width={148}
                    height={44}
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(16,24,40,0.08)] bg-white/72 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            ref={navbarContentRef}
            className="hidden items-center justify-between gap-6 md:flex"
          >
            <div className="flex items-center gap-10">
              <Link
                href="#home"
                className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
              >
                <div className="relative h-12 w-[176px] shrink-0">
                  <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
                  <div ref={navbarSymbolRef} className="absolute inset-0">
                    <Image
                      src="/brand/tattvatech-logo.png"
                      alt="TattvaTech logo"
                      width={176}
                      height={48}
                      priority
                      fetchPriority="high"
                      className="h-auto w-full object-contain object-left"
                    />
                  </div>
                </div>
              </Link>

              <nav aria-label="Primary" className="flex items-center gap-6 lg:gap-7">
                {navigationItems.slice(1).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href ?? "#home"}
                    className="text-[0.95rem] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden xl:flex xl:items-center xl:gap-3">
                {navigationGroups.map((group) => (
                  <span
                    key={group.title}
                    className="rounded-full border border-[rgba(16,24,40,0.08)] bg-white/72 px-3 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-text-secondary"
                  >
                    {group.title.replace("TattvaTech ", "")}
                  </span>
                ))}
              </div>
              <ButtonLink href="#contact">Start a Project</ButtonLink>
            </div>
          </div>

          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </PageContainer>
    </header>
  );
}
