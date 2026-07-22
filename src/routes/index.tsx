import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useSectionReveal } from "@/lib/scroll-animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TattvaTech | Technology That Transforms" },
      {
        name: "description",
        content:
          "TattvaTech builds software, AI, drones, products, and training with premium engineering discipline.",
      },
      { property: "og:title", content: "TattvaTech | Technology That Transforms" },
      {
        property: "og:description",
        content:
          "A founder-led technology company across services, products, drones, and training.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* --------------------------------- hooks ---------------------------------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reveal well before entering the viewport so nothing looks half-rendered
    // when the user scrolls quickly through sections.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }),
      { threshold: 0, rootMargin: "0px 0px 200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}


function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? h.scrollTop / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const core = coreRef.current;
    const ring = ringRef.current;
    if (!core || !ring) return;
    gsap.set([core, ring], { x: -100, y: -100 });
    const setCoreX = gsap.quickSetter(core, "x", "px") as (v: number) => void;
    const setCoreY = gsap.quickSetter(core, "y", "px") as (v: number) => void;
    const setRingX = gsap.quickSetter(ring, "x", "px") as (v: number) => void;
    const setRingY = gsap.quickSetter(ring, "y", "px") as (v: number) => void;
    const onMove = (e: MouseEvent) => {
      setCoreX(e.clientX);
      setCoreY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("[data-cursor='hover'], a, button"));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return { coreRef, ringRef, hover };
}

/* -------------------------------- primitives ------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  // Cap stagger so grids never look like a word-by-word crawl.
  const d = Math.min(delay, 220);
  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 500ms cubic-bezier(0.2,0.7,0.2,1) ${d}ms, transform 500ms cubic-bezier(0.2,0.7,0.2,1) ${d}ms`,
      }}
    >
      {children}
    </As>
  );
}


function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70">
      <span className="h-px w-8 bg-orange/50" />
      <span>{children}</span>
    </div>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "onDark";
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const toX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d < 140) {
        toX(dx * 0.18);
        toY(dy * 0.18);
      } else {
        toX(0);
        toY(0);
      }
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium overflow-hidden transition-colors duration-500 will-change-transform";
  const styles =
    variant === "primary"
      ? "gradient-sunset text-ivory shadow-warm"
      : variant === "onDark"
        ? "bg-ivory text-ink"
        : "border border-ink/20 text-ink hover:border-ink";
  return (
    <a
      ref={ref}
      href={href}
      data-cursor="hover"
      className={`${base} ${styles}`}
      style={{
        transition: "color 500ms, background 500ms",
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-ink/90 text-ivory transition-transform duration-500 group-hover:translate-x-0.5"
        aria-hidden
      >
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ animation: "shine 1.6s ease-out infinite" }}
        />
      )}
    </a>
  );
}

/* --------------------------------- cursor --------------------------------- */

function Cursor() {
  const { coreRef, ringRef, hover } = useCursor();

  useEffect(() => {
    document.body.style.cursor = "none";
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) document.body.style.cursor = "";
    return () => { document.body.style.cursor = ""; };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Glass core — follows with slight lag */}
      <div
        ref={coreRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
        style={{
          transition: "transform 80ms cubic-bezier(0.2,0.7,0.2,1)",
        }}
        aria-hidden
      >
        <div
          className="rounded-full"
          style={{
            width: hover ? 48 : 14,
            height: hover ? 48 : 14,
            marginLeft: hover ? -24 : -7,
            marginTop: hover ? -24 : -7,
            background: hover
              ? "color-mix(in oklab, var(--orange) 20%, transparent)"
              : "color-mix(in oklab, var(--orange) 40%, transparent)",
            border: hover ? "1.5px solid color-mix(in oklab, var(--orange) 50%, transparent)" : "1px solid color-mix(in oklab, var(--orange) 30%, transparent)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: hover
              ? "0 0 30px color-mix(in oklab, var(--orange) 25%, transparent)"
              : "0 0 12px color-mix(in oklab, var(--orange) 10%, transparent)",
            transition: "all 300ms cubic-bezier(0.2,0.7,0.2,1)",
          }}
        />
      </div>
      {/* Floating ring — orbits outside on hover */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[69] hidden md:block"
        style={{
          transition: "transform 200ms cubic-bezier(0.2,0.7,0.2,1)",
        }}
        aria-hidden
      >
        <div
          className="rounded-full"
          style={{
            width: hover ? 64 : 28,
            height: hover ? 64 : 28,
            marginLeft: hover ? -32 : -14,
            marginTop: hover ? -32 : -14,
            border: "1px solid color-mix(in oklab, var(--orange) 25%, transparent)",
            background: hover
              ? "color-mix(in oklab, var(--orange) 8%, transparent)"
              : "transparent",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            transition: "all 400ms cubic-bezier(0.2,0.7,0.2,1)",
          }}
        />
      </div>
    </>
  );
}

/* ---------------------------------- nav ----------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["About", "#about"],
    ["Ecosystem", "#ecosystem"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-ivory/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 md:flex md:justify-between md:px-10 md:py-5">
        <a href="#top" data-cursor="hover" className="group flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-sunset text-ivory transition-transform duration-700 group-hover:rotate-180">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
          <span className="truncate text-[15px] font-semibold tracking-tight">
            Tattva<span className="text-orange">Tech</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-cursor="hover"
              className="group relative text-sm text-charcoal transition-colors hover:text-ink"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <MagneticButton href="#contact">Start a conversation</MagneticButton>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-ivory md:hidden">
          <div className="flex flex-col p-6">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-lg">
                {l}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full gradient-sunset px-4 py-3 text-sm font-medium text-ivory"
            >
              Start a conversation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const p = useScrollProgress();
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Hero parallax: heading scale/fade + background grid translateY on scroll */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = document.querySelector<HTMLElement>("#top h1");
    const grid = document.querySelector<HTMLElement>("#top .bg-grid");

    if (heading) {
      gsap.to(heading, {
        scale: 0.95,
        opacity: 0.4,
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (grid) {
      gsap.to(grid, {
        y: "30%",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-ivory">
      <div className="absolute inset-0 text-ink">
        <div className="absolute inset-0 bg-grid grid-drift opacity-70" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, color-mix(in oklab, var(--orange-soft) 55%, transparent) 0%, transparent 60%)`,
          transition: "background 300ms ease-out",
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] rounded-full glow-orange opacity-70 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[440px] w-[440px] rounded-full glow-orange opacity-50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <div className="reveal-in">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70 md:mb-10">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_14px_var(--orange)]" />
            A founder-led technology company · Est. 2024
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h1
              className="font-display text-[clamp(2.75rem,8.5vw,8rem)] leading-[0.9] text-balance"
              style={{ transform: `translateY(${p * -40}px)` }}
            >
              <span className="block reveal-up" style={{ animationDelay: "80ms" }}>
                Technology
              </span>
              <span
                className="block reveal-up italic text-gradient-orange"
                style={{ animationDelay: "220ms" }}
              >
                that transforms.
              </span>
            </h1>

            <p
              className="reveal-up mt-8 max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg"
              style={{ animationDelay: "460ms" }}
            >
              TattvaTech builds practical technology across software, AI, drones,
              digital products, and technical education—creating solutions that grow
              stronger through connected expertise.
            </p>

            <div
              className="reveal-up mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "620ms" }}
            >
              <MagneticButton href="#services">Explore our work</MagneticButton>
              <MagneticButton href="#ecosystem" variant="ghost">
                Discover our ecosystem
              </MagneticButton>
            </div>
          </div>

          <div className="reveal-up lg:col-span-5" style={{ animationDelay: "300ms" }}>
            <MediaFrame
              aspect="portrait"
              caption="Product tour · Add video or screen recording"
              accent
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 text-xs uppercase tracking-[0.24em] text-charcoal/60 md:mt-24 md:grid-cols-4">
          {["Software · AI", "Drones · Aerial", "Products", "Training"].map((t, i) => (
            <div
              key={t}
              className="reveal-up flex items-center gap-2"
              style={{ animationDelay: `${760 + i * 90}ms` }}
            >
              <span className="h-2 w-2 rounded-full bg-orange/60" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <Ticks />
    </section>
  );
}

function MediaFrame({
  aspect = "video",
  caption,
  accent = false,
  onDark = false,
  className = "",
}: {
  aspect?: "video" | "portrait" | "square" | "wide";
  caption?: string;
  accent?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  const ratio =
    aspect === "portrait"
      ? "aspect-[4/5]"
      : aspect === "square"
        ? "aspect-square"
        : aspect === "wide"
          ? "aspect-[21/9]"
          : "aspect-video";

  return (
    <figure
      className={`group relative ${ratio} w-full overflow-hidden rounded-3xl border ${
        onDark ? "border-ivory/15 bg-ivory/5" : "border-border bg-cream"
      } ${accent ? "shadow-warm" : "shadow-soft"} ${className}`}
      data-cursor="hover"
      aria-label={caption ?? "Media placeholder"}
    >
      <div className={`absolute inset-0 ${onDark ? "text-ivory" : "text-ink"} bg-grid-fine opacity-40`} />
      {accent && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full glow-orange opacity-70 blur-3xl" />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <span
          className={`grid h-14 w-14 place-items-center rounded-full ${
            onDark ? "bg-ivory/10 text-ivory" : "bg-ivory text-ink"
          } shadow-soft transition-transform duration-500 group-hover:scale-105`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.28em] ${
            onDark ? "text-ivory/70" : "text-charcoal/70"
          }`}
        >
          {caption ?? "Add media"}
        </span>
      </div>

      <span className={`pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t ${onDark ? "border-ivory/40" : "border-ink/30"}`} />
      <span className={`pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t ${onDark ? "border-ivory/40" : "border-ink/30"}`} />
      <span className={`pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l ${onDark ? "border-ivory/40" : "border-ink/30"}`} />
      <span className={`pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r ${onDark ? "border-ivory/40" : "border-ink/30"}`} />
    </figure>
  );
}


function Ticks() {
  return (
    <>
      <span className="pointer-events-none absolute left-6 top-24 h-4 w-4 border-l border-t border-ink/25 md:left-10" />
      <span className="pointer-events-none absolute right-6 top-24 h-4 w-4 border-r border-t border-ink/25 md:right-10" />
      <span className="pointer-events-none absolute bottom-6 left-6 h-4 w-4 border-b border-l border-ink/25 md:left-10" />
      <span className="pointer-events-none absolute bottom-6 right-6 h-4 w-4 border-b border-r border-ink/25 md:right-10" />
    </>
  );
}

/* --------------------------------- marquee -------------------------------- */

function Marquee() {
  const items = [
    "Observe",
    "Build",
    "Scale",
    "Evolve",
    "Responsibly",
    "Software",
    "AI",
    "Drones",
    "Products",
    "Training",
  ];
  return (
    <div className="overflow-hidden border-y border-border bg-cream py-6">
      <div className="flex whitespace-nowrap marquee">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 font-display text-3xl text-charcoal/70 md:text-5xl"
          >
            {t}
            <span className="text-orange">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- about --------------------------------- */

function About() {
  const steps = [
    { k: "Observe", d: "Real problems, patterns, and gaps in how technology is actually used." },
    { k: "Build", d: "Engineered solutions with clarity, restraint, and long-term architecture." },
    { k: "Scale", d: "Systems designed to grow with organizations, not against them." },
    { k: "Evolve", d: "Continuous refinement guided by outcomes rather than trends." },
    { k: "Responsibly", d: "Practical innovation grounded in ethics, trust, and durability." },
  ];
  return (
    <section id="about" className="relative bg-ivory py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>The Company</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance">
                A parent technology company where each vertical strengthens{" "}
                <span className="italic text-gradient-orange">the others.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                TattvaTech is founder-led. We build software, AI systems, drones, digital
                products, and technical education—not as separate businesses, but as an
                ecosystem that compounds expertise over time.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={100}>
          <div className="mt-16">
            <MediaFrame aspect="wide" caption="Studio · Add image or video" />
          </div>
        </Reveal>



        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
                <Reveal key={s.k} delay={i * 90}>
              <div
                className="group relative h-full bg-ivory p-8 transition-colors duration-500 hover:bg-cream"
                data-cursor="hover"
              >
                <div className="flex items-baseline justify-between">
                  <span className="h-px w-10 origin-right scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <h3 className="mt-10 font-display text-3xl">{s.k}.</h3>
                <p className="mt-4 text-sm leading-relaxed text-charcoal">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- ecosystem ------------------------------- */

function Ecosystem() {
  const nodes = [
    {
      k: "Services",
      desc: "Custom software, AI systems, cloud infrastructure, and design—delivered as long-term engineering partnerships.",
      tags: ["Web", "Mobile", "AI", "Cloud"],
      feeds: "Products",
    },
    {
      k: "Products",
      desc: "Scalable software products built from recurring, real-world problems discovered during service delivery.",
      tags: ["SaaS", "Tools", "Platforms"],
      feeds: "Drones",
    },
    {
      k: "Drones",
      desc: "Research, industrial applications, aerial systems, consulting, and training across the drone stack.",
      tags: ["Aerial", "Telemetry", "Industry"],
      feeds: "Training",
    },
    {
      k: "Training",
      desc: "College programs, workshops, faculty development, student upskilling, and corporate training.",
      tags: ["Colleges", "Workshops", "Corporate"],
      feeds: "Services",
    },
  ];

  return (
    <section id="ecosystem" className="relative overflow-hidden bg-cream py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full glow-orange opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>The Ecosystem</SectionLabel>
            <h2 data-reveal className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance">
              Four verticals.{" "}
              <span className="italic text-gradient-orange">One system.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <p className="max-w-md text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                Every part of TattvaTech feeds the others. Insights from services
                become products. Field work sharpens training. Training strengthens
                engineering.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2 md:gap-6">
          {nodes.map((n, i) => (
            <Reveal key={n.k} delay={i * 90}>
              <article
                className="group relative overflow-hidden rounded-3xl border border-border bg-ivory p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-orange/50 hover:shadow-warm md:p-10"
                data-cursor="hover"
              >
                <span className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange/0 blur-3xl transition-all duration-700 group-hover:bg-orange/20" />

                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-orange">
                    Vertical
                  </span>
                  <span className="h-px w-16 origin-right scale-x-50 bg-ink/20 transition-transform duration-500 group-hover:scale-x-100 group-hover:bg-orange" />
                </div>

                <h3 className="mt-10 font-display text-4xl leading-[1] md:text-5xl">
                  {n.k}
                  <span className="text-orange">.</span>
                </h3>

                <p className="mt-5 max-w-md text-pretty text-charcoal">{n.desc}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-charcoal/80 transition-colors duration-300 group-hover:border-orange/40 group-hover:text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-xs uppercase tracking-[0.24em] text-charcoal/60">
                  <span>Feeds</span>
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                  <span className="text-ink">{n.feeds}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-full border border-border bg-ivory px-6 py-4 text-xs uppercase tracking-[0.24em] text-charcoal/70 md:mt-12 md:px-8">
            <span className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_10px_var(--orange)]" />
              A closed loop
            </span>
            <span className="hidden md:inline">
              Services → Products → Drones → Training → Services
            </span>
            <span className="text-orange">Compounding expertise</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}



/* --------------------------------- services ------------------------------- */

const services = [
  { k: "Web Development", d: "Fast, resilient, and beautifully engineered web experiences." },
  { k: "Software Development", d: "Custom systems designed for scale, clarity, and longevity." },
  { k: "Mobile Development", d: "Native-quality iOS and Android applications." },
  { k: "AI & Automation", d: "Applied machine learning and intelligent workflow automation." },
  { k: "Cloud & DevOps", d: "Reliable infrastructure, CI/CD, and platform engineering." },
  { k: "Data Analytics", d: "Data platforms and insight systems that inform decisions." },
  { k: "UI/UX Design", d: "Interfaces that feel obvious, considered, and effortless." },
];

function Services() {
  return (
    <section id="services" className="relative bg-ivory py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Services</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance">
                Engineering as a{" "}
                <span className="italic text-gradient-orange">long-term practice.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {services.map((s, i) => (
                <Reveal key={s.k} delay={i * 60}>
                  <li className="group relative overflow-hidden">
                    <a
                      href="#contact"
                      data-cursor="hover"
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 py-7"
                    >
                      <span className="text-xs tabular-nums text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                          {s.k}
                        </div>
                        <p className="mt-1 hidden max-w-md text-sm text-charcoal md:block">
                          {s.d}
                        </p>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-ivory">
                        <svg
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 14L14 6M8 6h6v6" />
                        </svg>
                      </span>
                    </a>
                    <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-orange transition-transform duration-700 group-hover:scale-x-100" />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- products ------------------------------- */

function Products() {
  const items = [
    { k: "Recurring problems", d: "We surface patterns across engagements and turn them into products." },
    { k: "Own the stack", d: "Products built with the same engineering rigor as our services." },
    { k: "Compounding IP", d: "Each release strengthens the ecosystem and shortens delivery." },
  ];
  return (
    <section className="relative overflow-hidden bg-cream py-32 md:py-40">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full glow-orange opacity-40 blur-3xl" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <Reveal>
              <SectionLabel>Products</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance">
                Products born from{" "}
                <span className="italic text-gradient-orange">real work.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="md:col-span-6">
            <p className="max-w-xl text-pretty text-charcoal">
              We build scalable software products from recurring, real-world problems
              discovered during service delivery—shipped with the discipline of a
              product company and the pragmatism of an engineering team.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 90}>
              <article
                data-cursor="hover"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-ivory p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-warm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.24em] text-orange">
                      Products
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-charcoal/60 transition-colors group-hover:text-orange"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                      <path d="M4 10h16M10 4v16" />
                    </svg>
                  </div>
                  <h3 className="mt-14 font-display text-3xl">{it.k}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal">{it.d}</p>
                </div>
                <div className="mt-10 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-700 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- drones -------------------------------- */

function Drones() {
  const rows = [
    ["Research", "Applied research across flight, sensing, and autonomy."],
    ["Industrial", "Aerial systems for inspection, surveying, and monitoring."],
    ["Solutions", "End-to-end drone deployments tailored to industry needs."],
    ["Consulting", "Advisory across regulation, hardware, and operational design."],
    ["Innovation", "Prototyping new applications for aerial technology."],
    ["Training", "Pilot programs, technical courses, and certifications."],
  ];
  return (
    <section className="relative overflow-hidden bg-cream py-32 text-ink md:py-40">
      <FlightPathBg />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Drones</SectionLabel>
            <h2 data-reveal className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance">
              Aerial systems,{" "}
              <span className="italic text-gradient-orange">grounded engineering.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-pretty text-charcoal">
              Research, industrial applications, consulting, and training across the
              drone stack—built by engineers who fly what they design.
            </p>
            <div className="mt-10">
              <MediaFrame aspect="video" caption="Aerial footage · Add media" />
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x">
              {rows.map(([k, d], i) => (
                <Reveal key={k} delay={i * 60}>
                  <div className="group relative p-8" data-cursor="hover">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-orange">
                        Capability
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-orange opacity-70 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-10 font-display text-3xl">{k}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function FlightPathBg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="fp" x1="0" x2="1">
          <stop offset="0" stopColor="var(--orange)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--orange)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M 0 ${120 + i * 100} C 300 ${80 + i * 80}, 900 ${160 + i * 90}, 1200 ${100 + i * 100}`}
          fill="none"
          stroke="url(#fp)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={"d" + i}
          cx={(i * 137) % 1200}
          cy={(i * 71) % 800}
          r="1.5"
          fill="var(--orange)"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

/* --------------------------------- training ------------------------------- */

function Training() {
  const items = [
    ["College Programs", "Semester-length curricula in software and emerging tech."],
    ["Workshops", "Focused hands-on sessions for teams and cohorts."],
    ["Faculty Development", "Programs that upgrade teaching capacity and tooling."],
    ["Student Upskilling", "Career-ready tracks in software, AI, and drones."],
    ["Corporate Training", "Structured programs for engineering organizations."],
  ];
  return (
    <section className="relative bg-ivory py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-16 md:gap-y-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Training</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance">
                Knowledge that{" "}
                <span className="italic text-gradient-orange">travels.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-sm text-pretty text-charcoal">
                We teach what we build. Programs, workshops, and long-form curricula
                designed to move engineers, students, and faculty forward.
              </p>
            </Reveal>
          </div>
          <Reveal delay={180} className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <MediaFrame aspect="video" caption="Cohort · Add video" className="md:aspect-[16/11]" />
            </div>
          </Reveal>
          <div className="md:col-span-7">
            <ol className="relative border-l border-border">
              {items.map(([k, d], i) => (
                <Reveal key={k} delay={i * 80}>
                  <li className="group relative pb-12 pl-10 last:pb-0">
                    <span className="absolute left-0 top-1.5 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border border-border bg-ivory transition-all duration-500 group-hover:border-orange group-hover:bg-orange">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange transition-colors group-hover:bg-ivory" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-orange">
                        Program
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl">{k}</h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal">
                      {d}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- process -------------------------------- */

function Process() {
  const steps = [
    ["Understand", "We learn your domain, your constraints, and what success actually looks like."],
    ["Research", "We explore the problem space, what's been tried, what failed, what's possible."],
    ["Design", "Architecture, interfaces, and systems planned before a single line of production code."],
    ["Build", "Clean engineering with regular checkpoints, not long silences."],
    ["Deploy", "Shipping to production with confidence—monitored, documented, backed out if needed."],
    ["Improve", "Real usage data feeds back into the cycle. The system gets smarter over time."],
  ];
  return (
    <section id="process" className="relative overflow-hidden bg-cream py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Process</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance">
                A calm,{" "}
                <span className="italic text-gradient-orange">deliberate cadence.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={160}>
              <p className="mb-10 max-w-xl text-pretty text-sm leading-relaxed text-charcoal">
                Every engagement follows the same cycle—not because we lack creativity, but
                because disciplined process is what lets us move fast without breaking things.
              </p>
            </Reveal>
            <ol className="grid gap-5 md:grid-cols-6">
                {steps.map(([title, desc], i) => (
                  <Reveal key={title} delay={i * 90}>
                    <li className="relative">
                      <h3 className="font-display text-lg">{title}</h3>
                      <span className="mt-2 block h-px w-8 bg-orange/60" />
                      <p className="mt-3 text-xs leading-relaxed text-charcoal">{desc}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- why ---------------------------------- */

function Why() {
  const rows = [
    ["Long-term partnerships", "We work with clients across years, not sprints."],
    ["Practical engineering", "Solutions engineered to run, not to demo."],
    ["Founder-led execution", "Senior involvement on every engagement."],
    ["Connected ecosystem", "Verticals that share insight, tooling, and IP."],
    ["Scalable thinking", "Architecture that survives its second year."],
    ["Responsible innovation", "Technology built with care for its context."],
  ];
  return (
    <section className="relative bg-ivory py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Why TattvaTech</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance">
                Confidence through{" "}
                <span className="italic text-gradient-orange">restraint.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <dl className="divide-y divide-border border-y border-border">
              {rows.map(([k, d], i) => (
                <Reveal key={k} delay={i * 50}>
                  <div className="grid grid-cols-12 items-baseline gap-6 py-7">
                    <dt className="col-span-12 flex items-baseline gap-4 md:col-span-5">
                      <span className="text-xs tabular-nums text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl md:text-3xl">{k}</span>
                    </dt>
                    <dd className="col-span-12 text-sm text-charcoal md:col-span-7 md:text-base">
                      {d}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ---------------------------------- */

function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-sunset" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 text-ink" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15 text-ivory" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-32 text-ivory md:px-10 md:py-48">
        <Reveal>
            <SectionLabel>
              <span className="text-ivory">Contact</span>
            </SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,10vw,10rem)] leading-[0.92] text-balance">
            Let's build technology <br />
            <span className="italic text-ivory/85">that matters.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal delay={220} className="md:col-span-6">
            <p className="max-w-md text-pretty text-ivory/80">
              Tell us about your problem, your team, or the system you're trying to
              build. We reply personally, and we reply well.
            </p>
          </Reveal>
          <Reveal delay={320} className="md:col-span-6 md:justify-self-end">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="mailto:hello@tattvatech.com" variant="onDark">
                Start a conversation
              </MagneticButton>
              <a
                href="mailto:hello@tattvatech.com"
                data-cursor="hover"
                className="text-sm text-ivory/90 underline-offset-4 hover:underline"
              >
                hello@tattvatech.com
              </a>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  const cols: [string, string[]][] = [
    ["Company", ["About", "Ecosystem", "Principles", "Contact"]],
    ["Services", ["Web", "Software", "Mobile", "AI & Automation", "Cloud & DevOps"]],
    ["Verticals", ["Products", "Drones", "Training"]],
    ["Contact", ["hello@tattvatech.com", "LinkedIn", "X / Twitter", "GitHub"]],
  ];
  return (
    <footer className="bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-sunset text-ivory">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                Tattva<span className="text-orange">Tech</span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm text-charcoal">
              Technology that transforms—engineered with clarity, precision, and purpose.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {cols.map(([h, links]) => (
              <div key={h}>
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-orange">
                  {h}
                </div>
                <ul className="mt-5 space-y-3">
                  {links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        data-cursor="hover"
                        className="text-sm text-charcoal underline-offset-4 hover:text-ink hover:underline"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-charcoal md:flex-row md:items-center">
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

/* --------------------------------- index --------------------------------- */

function Index() {
  const p = useScrollProgress();
  useSectionReveal("about");
  useSectionReveal("ecosystem");
  useSectionReveal("services");
  useSectionReveal("process");
  useSectionReveal("contact");
  return (
    <main>
      <div
        className="fixed left-0 top-0 z-[60] h-px gradient-sunset"
        style={{ width: `${p * 100}%`, transition: "width 100ms linear" }}
      />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Ecosystem />
      <Services />
      <Products />
      <Drones />
      <Training />
      <Process />
      <Why />
      <CTA />
      <Footer />
    </main>
  );
}
