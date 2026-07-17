"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type MutableRefObject } from "react";
import { navigationActions, navigationGroups } from "@/constants/navigation";
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

  const markerClassMap = {
    circle: "rounded-full bg-orange-primary",
    triangle:
      "h-0 w-0 border-r-[5px] border-b-[9px] border-l-[5px] border-r-transparent border-b-orange-accent border-l-transparent bg-transparent",
    square: "bg-amber-primary",
    diamond: "rotate-45 bg-orange-accent",
  } as const;

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
      <PageContainer className="relative px-5 py-0 md:px-8 xl:px-12">
        <div
          ref={navbarRevealRef}
          className="relative px-0 pt-6 pb-4 md:pt-6 md:pb-4"
        >
          <div className="flex items-center justify-between gap-6 md:hidden">
            <Link
              href="#home"
              className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <div className="relative h-11 w-11">
                <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
                <div ref={navbarSymbolRef} className="absolute inset-0 bg-transparent">
                  <Image
                    src="/brand/tattvatech-logo.png"
                    alt="TattvaTech logo"
                    width={44}
                    height={44}
                    priority
                    fetchPriority="high"
                    className="h-auto w-full object-contain object-center"
                  />
                </div>
              </div>
              <div className="leading-tight">
                <p className="font-heading text-base tracking-[-0.04em] text-text-primary">
                  TattvaTech
                </p>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
                  Technology Brand
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            ref={navbarContentRef}
            className="hidden md:grid md:grid-cols-[220px_repeat(4,minmax(120px,1fr))_minmax(170px,auto)] md:items-start md:gap-6 lg:gap-8"
          >
            <Link
              href="#home"
              className="flex items-start gap-4 rounded-md pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
            >
              <div className="relative h-14 w-14 shrink-0">
                <div ref={navbarLogoTargetRef} data-navbar-logo-anchor className="absolute inset-0" />
                <div ref={navbarSymbolRef} className="absolute inset-0 bg-transparent">
                  <Image
                    src="/brand/tattvatech-logo.png"
                    alt="TattvaTech logo"
                    width={56}
                    height={56}
                    priority
                    fetchPriority="high"
                    className="h-auto w-full object-contain object-center"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-heading text-[1.1rem] tracking-[-0.04em] text-text-primary">
                  TattvaTech
                </p>
                <p className="max-w-[9rem] text-[0.72rem] uppercase tracking-[0.18em] text-text-muted">
                  Technology Brand
                </p>
              </div>
            </Link>

            {navigationGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-text-primary">
                  <span
                    aria-hidden="true"
                    className={cn("inline-block h-2.5 w-2.5", markerClassMap[group.marker])}
                  />
                  {group.title}
                </p>

                <div className="flex flex-col items-start gap-2">
                  {group.links.map((item) => (
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="inline-block border-b border-[rgba(16,24,40,0.35)] pb-1 text-[clamp(0.95rem,1.05vw,1.08rem)] leading-tight text-text-secondary transition-colors hover:border-orange-primary hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        key={item.label}
                        aria-disabled="true"
                        className="inline-block border-b border-[rgba(16,24,40,0.12)] pb-1 text-[clamp(0.95rem,1.05vw,1.08rem)] leading-tight text-text-muted"
                      >
                        {item.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col items-start gap-3 justify-self-end">
              <div className="flex flex-col items-start gap-2">
                {navigationActions.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href ?? "#contact"}
                    className="inline-block border-b border-[rgba(16,24,40,0.35)] pb-1 text-[0.98rem] font-medium text-text-primary transition-colors hover:border-orange-primary hover:text-orange-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary"
                  >
                    {item.label}
                  </Link>
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
