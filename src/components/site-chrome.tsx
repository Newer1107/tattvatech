import { Link } from "@tanstack/react-router";
import {
  LINKEDIN_URL,
  PUBLIC_EMAIL,
  PUBLIC_EMAIL_MAILTO,
  footerColumns,
  verticalRoutes,
} from "@/lib/site";
import { assetPath } from "@/lib/assets";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "onDark";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
  const styles =
    variant === "primary"
      ? "gradient-sunset text-ivory shadow-warm"
      : variant === "onDark"
        ? "bg-ivory text-ink hover:bg-cream"
        : "border border-ink/20 text-ink hover:border-ink hover:bg-ink/5";

  return (
    <a href={href} data-cursor="hover" className={`${base} ${styles} ${className}`.trim()}>
      <span className="relative z-10">{children}</span>
      <span
        className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-ink/90 text-ivory"
        aria-hidden
      >
        <svg
          viewBox="0 0 20 20"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="footer-brand">
              <img
                src={assetPath("/Logo.png")}
                alt="TattvaTech"
                width={220}
                height={220}
                loading="lazy"
                className="footer-logo"
              />
            </div>
            <p className="max-w-xs text-sm text-charcoal">
              Technology that transformsâ€”engineered with clarity, precision, and purpose.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-orange">
                  {column.heading}
                </div>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-cursor="hover"
                        className={`block py-2 text-sm text-charcoal underline-offset-4 hover:text-ink hover:underline md:py-0 ${link.className ?? ""}`.trim()}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        aria-label={
                          link.href === LINKEDIN_URL ? "Visit TattvaTech on LinkedIn" : undefined
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-charcoal md:mt-16 md:flex-row md:items-center md:pt-8">
          <div>© {new Date().getFullYear()} TattvaTech. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Made with intent</span>
            <span className="tabular-nums">v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SecondaryPageHeader() {
  return (
    <header className="border-b border-border bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Go to TattvaTech home">
          <img
            src={assetPath("/Logo.png")}
            alt="TattvaTech"
            width={220}
            height={220}
            className="navbar-logo"
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {verticalRoutes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className="rounded-full px-4 py-2 text-charcoal transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
              activeProps={{
                className: "rounded-full bg-orange/10 px-4 py-2 font-medium text-orange",
              }}
            >
              {route.title}
            </Link>
          ))}
          <a
            href={PUBLIC_EMAIL_MAILTO}
            className="contact-email rounded-full px-4 py-2 text-charcoal transition-colors duration-300 hover:bg-ink/5 hover:text-orange"
          >
            {PUBLIC_EMAIL}
          </a>
        </nav>
      </div>
    </header>
  );
}
