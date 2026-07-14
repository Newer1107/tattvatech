"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type MutableRefObject } from "react";
import { businessVerticals } from "@/constants/businesses";
import { introAssets } from "@/constants/intro-animation";
import { navigationItems } from "@/constants/navigation";
import { useScrollDirection } from "@/hooks/useScrollDirection";
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
  const { direction, isScrolled } = useScrollDirection();
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
        "navbar-root fixed inset-x-0 top-0 z-[10020]",
        navbarReady
          ? "visible opacity-100 pointer-events-auto"
          : "invisible opacity-0 pointer-events-none",
        direction === "down" ? "translate-y-0" : "translate-y-0",
      )}
    >
      <PageContainer className="relative py-4">
        <div
          ref={navbarRevealRef}
          className={cn(
            "relative flex items-center justify-between px-1 py-3 md:px-0",
            isScrolled
              ? "rounded-2xl border border-white/55 bg-white/78 text-text-primary shadow-[var(--shadow-soft)] backdrop-blur-xl"
              : "border-b border-border-default/70 bg-transparent text-text-primary",
          )}
        >
          <Link
            href="#home"
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
          >
            <div className="relative h-9 w-9">
              <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
              <div ref={navbarSymbolRef} className="absolute inset-0 bg-transparent">
                <Image
                  src={introAssets.logo}
                  alt="TattvaTech logo"
                  width={36}
                  height={36}
                  priority
                  fetchPriority="high"
                  className="h-auto w-full object-contain object-center"
                />
              </div>
            </div>
            <div className="leading-tight">
              <p
                className={cn(
                  "font-heading text-base tracking-[-0.04em]",
                  isScrolled ? "text-text-primary" : "text-text-primary",
                )}
              >
                TattvaTech
              </p>
              <p
                className={cn(
                  "text-xs uppercase tracking-[0.18em]",
                  isScrolled ? "text-text-muted" : "text-text-muted",
                )}
              >
                Technology Brand
              </p>
            </div>
          </Link>

          <div
            ref={navbarContentRef}
            className="flex items-center gap-4 md:gap-7"
          >
            <nav className="hidden items-center gap-7 md:flex">
              {navigationItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary",
                      isScrolled
                        ? "text-text-secondary hover:text-text-primary"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    aria-disabled="true"
                    className={cn(
                      "cursor-not-allowed text-sm font-medium",
                      isScrolled ? "text-text-muted" : "text-text-muted",
                    )}
                    title={businessVerticals.map((item) => item.name).join(", ")}
                  >
                    {item.label}
                  </span>
                )
              ))}
            </nav>

            <div className="hidden md:block">
              <ButtonLink href="#contact">Start a Project</ButtonLink>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary md:hidden",
              isScrolled
                ? "border border-border-default bg-white text-text-primary"
                : "border border-border-default bg-white/72 text-text-primary",
            )}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </PageContainer>
    </header>
  );
}
