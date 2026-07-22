import { Link } from "@tanstack/react-router";
import { ButtonLink, SecondaryPageHeader, SiteFooter } from "@/components/site-chrome";
import { PUBLIC_EMAIL_MAILTO } from "@/lib/site";

type VerticalRoutePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly string[];
};

export function VerticalRoutePage({
  eyebrow,
  title,
  description,
  highlights,
}: VerticalRoutePageProps) {
  return (
    <main className="min-h-screen bg-ivory">
      <SecondaryPageHeader />
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-35 text-ink" />
        <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full glow-orange opacity-35 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-14">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70">
                <span className="h-px w-8 bg-orange/50" />
                <span>{eyebrow}</span>
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-balance break-words">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                {description}
              </p>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <div className="rounded-3xl border border-border bg-ivory p-6 shadow-soft md:p-8">
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-orange">
                  Quick Actions
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href={PUBLIC_EMAIL_MAILTO}>Start a conversation</ButtonLink>
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <article
                key={highlight}
                className="rounded-3xl border border-border bg-ivory p-6 shadow-soft md:p-8"
              >
                <div className="text-xs tabular-nums text-orange">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                  {highlight}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
