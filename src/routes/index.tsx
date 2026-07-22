import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, SiteFooter } from "@/components/site-chrome";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useSectionReveal } from "@/lib/scroll-animations";
import { PUBLIC_EMAIL, PUBLIC_EMAIL_MAILTO, verticalRoutes } from "@/lib/site";

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

/* --------------------------------- cursor --------------------------------- */

function Cursor() {
  const { coreRef, ringRef, hover } = useCursor();

  useEffect(() => {
    document.body.style.cursor = "none";
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) document.body.style.cursor = "";
    return () => {
      document.body.style.cursor = "";
    };
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
            border: hover
              ? "1.5px solid color-mix(in oklab, var(--orange) 50%, transparent)"
              : "1px solid color-mix(in oklab, var(--orange) 30%, transparent)",
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["about", "ecosystem", "services", "drones", "training", "process", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    ["About", "#about"],
    ["Ecosystem", "#ecosystem"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <header className="navbar relative z-10 w-full">
      <div className="flex items-center justify-between gap-4 py-4 md:py-5">
        <a href="#top" data-cursor="hover" className="group flex shrink-0 items-center">
          <img
            src="/Logo.png"
            alt="TattvaTech"
            width={220}
            height={220}
            loading="eager"
            fetchPriority="high"
            className="navbar-logo"
          />
        </a>

        <nav className="hidden min-w-0 items-center gap-1 md:flex">
          {links.map(([label, href]) => {
            const isActive = active === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                data-cursor="hover"
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-orange/10 text-orange font-medium"
                    : "text-charcoal hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <ButtonLink href="#contact">Start a conversation</ButtonLink>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="relative z-50 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-xl bg-ivory/90 md:hidden overscroll-behavior-none"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-full flex-col justify-center gap-2 px-10"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className={`border-b border-border/30 py-5 text-2xl font-medium transition-colors hover:text-orange ${
                  active === h.slice(1) ? "text-orange" : "text-ink"
                }`}
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full gradient-sunset px-8 py-4 text-base font-medium text-ivory"
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
  const heroVideoRef = useRef<HTMLVideoElement>(null);
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

  /* Hero entrance: staggered blur + slide reveal with ambient background settle */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".network-node",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.03 },
        0,
      );

      const items = [
        { sel: ".hero-badge", y: -8, blur: 4, dur: 0.5, at: 0.2 },
        { sel: ".hero-heading-line-1", y: 28, blur: 6, dur: 0.7, at: 0.35 },
        { sel: ".hero-heading-line-2", y: 28, blur: 6, dur: 0.7, at: 0.5 },
        { sel: ".hero-paragraph", y: 18, blur: 3, dur: 0.6, at: 0.65 },
        { sel: ".hero-actions", y: 14, blur: 2, dur: 0.5, at: 0.8 },
      ];

      items.forEach(({ sel, y, blur, dur, at }) => {
        tl.fromTo(
          sel,
          { y, opacity: 0, filter: `blur(${blur}px)` },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: dur },
          at,
        );
      });

      gsap.utils.toArray<Element>(".hero-particle").forEach((dot) => {
        gsap.set(dot, { opacity: 0.15 });
        gsap.to(dot, {
          x: gsap.utils.random(-40, 40),
          y: gsap.utils.random(-40, 40),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="top" className="hero-section relative overflow-hidden bg-ivory">
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
      {/* Animated SVG network */}
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-[480px] w-[480px] max-w-none opacity-40 sm:h-[640px] sm:w-[640px] sm:max-w-[140%] lg:opacity-60"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Connection lines */}
        <path
          d="M220,420 L360,510 L490,440 L440,310 L310,340 L220,420"
          stroke="#ff7a18"
          strokeWidth="1.5"
          className="network-line"
          opacity="0.35"
        />
        <path
          d="M310,340 L400,200 L440,310"
          stroke="#ff7a18"
          strokeWidth="1.2"
          className="network-line"
          opacity="0.3"
        />
        <path
          d="M360,510 L530,340 L440,310"
          stroke="#ff7a18"
          strokeWidth="1"
          className="network-line"
          opacity="0.25"
        />
        <path
          d="M530,340 L550,480 L490,440"
          stroke="#ff7a18"
          strokeWidth="1"
          className="network-line"
          opacity="0.25"
        />
        <path
          d="M140,480 L220,420 L100,380"
          stroke="#ff7a18"
          strokeWidth="1"
          className="network-line"
          opacity="0.2"
        />
        <path
          d="M310,340 L180,320 L100,380"
          stroke="#ff7a18"
          strokeWidth="0.8"
          className="network-line"
          opacity="0.2"
        />
        <path
          d="M360,510 L490,440 L550,480"
          stroke="#ff7a18"
          strokeWidth="0.8"
          className="network-line"
          opacity="0.2"
        />
        <path
          d="M220,420 L310,340 L400,200"
          stroke="#ff7a18"
          strokeWidth="0.8"
          className="network-line"
          opacity="0.15"
        />
        <path
          d="M140,480 L360,510"
          stroke="#ff7a18"
          strokeWidth="0.6"
          className="network-line"
          opacity="0.15"
        />
        <path
          d="M400,200 L530,340"
          stroke="#ff7a18"
          strokeWidth="0.6"
          className="network-line"
          opacity="0.15"
        />
        <path
          d="M180,320 L220,420"
          stroke="#ff7a18"
          strokeWidth="0.6"
          className="network-line"
          opacity="0.15"
        />
        {/* Network nodes */}
        <circle cx="220" cy="420" r="4.5" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="360" cy="510" r="3.5" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="490" cy="440" r="4" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="440" cy="310" r="3" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="310" cy="340" r="3.5" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="140" cy="480" r="2.5" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="100" cy="380" r="2" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="530" cy="340" r="3" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="550" cy="480" r="2.5" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="400" cy="200" r="3" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="180" cy="320" r="2.5" fill="#ff7a18" className="network-node" opacity="0" />
        <circle cx="260" cy="240" r="2" fill="#ff7a18" className="network-node" opacity="0" />
        {/* Floating particles */}
        <circle cx="80" cy="120" r="2" fill="#ff7a18" className="hero-particle" />
        <circle cx="320" cy="80" r="1.5" fill="#ff7a18" className="hero-particle" />
        <circle cx="500" cy="100" r="2" fill="#ff7a18" className="hero-particle" />
        <circle cx="120" cy="280" r="1.5" fill="#ff7a18" className="hero-particle" />
        <circle cx="560" cy="200" r="1.8" fill="#ff7a18" className="hero-particle" />
        <circle cx="380" cy="150" r="1.2" fill="#ff7a18" className="hero-particle" />
        <circle cx="200" cy="180" r="1.5" fill="#ff7a18" className="hero-particle" />
        <circle cx="460" cy="540" r="1.8" fill="#ff7a18" className="hero-particle" />
        <circle cx="40" cy="540" r="2" fill="#ff7a18" className="hero-particle" />
        <circle cx="520" cy="560" r="1.2" fill="#ff7a18" className="hero-particle" />
        <circle cx="160" cy="400" r="1.5" fill="#ff7a18" className="hero-particle" />
        <circle cx="440" cy="220" r="1.8" fill="#ff7a18" className="hero-particle" />
        <circle cx="280" cy="520" r="1.2" fill="#ff7a18" className="hero-particle" />
        <circle cx="580" cy="380" r="1.5" fill="#ff7a18" className="hero-particle" />
        <circle cx="70" cy="300" r="1.8" fill="#ff7a18" className="hero-particle" />
        <circle cx="480" cy="60" r="1.2" fill="#ff7a18" className="hero-particle" />
        <circle cx="340" cy="420" r="1.5" fill="#ff7a18" className="hero-particle" />
        <circle cx="60" cy="440" r="1.2" fill="#ff7a18" className="hero-particle" />
      </svg>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-6 pb-12 pt-4 md:px-10 md:pb-16 md:pt-6">
        <Nav />

        <div className="flex flex-1 flex-col justify-center py-6 md:py-8">
          <div className="hero-badge" style={{ opacity: 0 }}>
            <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70 md:mb-10">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_14px_var(--orange)]" />
              A founder-led technology company · Est. 2024
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h1
                className="font-display text-[clamp(2rem,8.5vw,8rem)] leading-[0.9] text-balance break-words"
                style={{ transform: `translateY(${p * -40}px)` }}
              >
                <span className="block hero-heading-line-1" style={{ opacity: 0 }}>
                  Technology
                </span>
                <span
                  className="block hero-heading-line-2 italic text-gradient-orange"
                  style={{ opacity: 0 }}
                >
                  that transforms.
                </span>
              </h1>

              <p
                className="hero-paragraph mt-8 max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg"
                style={{ opacity: 0 }}
              >
                TattvaTech builds practical technology across software, AI, drones, digital
                products, and technical education—creating solutions that grow stronger through
                connected expertise.
              </p>

              <div
                className="hero-actions mt-10 flex flex-wrap items-center gap-4"
                style={{ opacity: 0 }}
              >
                <ButtonLink href="#services">Explore our work</ButtonLink>
                <ButtonLink href="#ecosystem" variant="ghost">
                  Discover our ecosystem
                </ButtonLink>
              </div>
            </div>

            <div className="reveal-up lg:col-span-5" style={{ animationDelay: "300ms" }}>
              <div className="group relative overflow-hidden rounded-3xl border border-border shadow-warm">
                <video
                  ref={heroVideoRef}
                  className="aspect-[4/5] w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src="/hero-ui.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6 text-xs uppercase tracking-[0.24em] text-charcoal/60 md:mt-24 md:grid-cols-4 md:gap-6 md:pt-8">
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
      <div
        className={`absolute inset-0 ${onDark ? "text-ivory" : "text-ink"} bg-grid-fine opacity-40`}
      />
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

      <span
        className={`pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t ${onDark ? "border-ivory/40" : "border-ink/30"}`}
      />
      <span
        className={`pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t ${onDark ? "border-ivory/40" : "border-ink/30"}`}
      />
      <span
        className={`pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l ${onDark ? "border-ivory/40" : "border-ink/30"}`}
      />
      <span
        className={`pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r ${onDark ? "border-ivory/40" : "border-ink/30"}`}
      />
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
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#about .step-card",
        { y: 60, rotation: (i: number) => (i % 2 === 0 ? -2 : 2), autoAlpha: 0 },
        {
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#about .step-grid",
            start: "top 80%",
            end: "top 45%",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        "#about .step-num",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#about .step-grid",
            start: "top 82%",
            end: "top 50%",
            scrub: 0.5,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative bg-ivory py-24 md:py-40 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>The Company</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance break-words">
                A parent technology company where each vertical strengthens{" "}
                <span className="italic text-gradient-orange">the others.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                TattvaTech is founder-led. We build software, AI systems, drones, digital products,
                and technical education—not as separate businesses, but as an ecosystem that
                compounds expertise over time.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={100}>
          <div className="mt-10 md:mt-16">
            <MediaFrame aspect="wide" caption="Studio · Add image or video" />
          </div>
        </Reveal>

        <div className="step-grid mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5 md:mt-24">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 90}>
              <div
                className="step-card group relative h-full bg-ivory p-8 transition-colors duration-500 hover:bg-cream"
                data-cursor="hover"
                data-card
              >
                <div className="flex items-baseline justify-between">
                  <span className="step-num text-xs tabular-nums text-orange/60">0{i + 1}</span>
                  <span className="h-px w-10 origin-right scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <h3 className="mt-6 font-display text-2xl md:mt-10 md:text-3xl">{s.k}.</h3>
                <p className="mt-4 text-sm leading-relaxed text-charcoal">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- ecosystem hooks ---------------------------- */

function useEcosystemLines() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-card]");
    const paths = grid.querySelectorAll<SVGPathElement>(".ecosystem-line");
    if (cards.length !== 4 || paths.length !== 4) return;

    const updatePaths = () => {
      const gridRect = grid.getBoundingClientRect();
      const positions = Array.from(cards).map((c) => {
        const r = c.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - gridRect.left,
          y: r.top + r.height / 2 - gridRect.top,
        };
      });
      const conns: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ];
      paths.forEach((path, i) => {
        const [from, to] = conns[i];
        const x1 = positions[from].x,
          y1 = positions[from].y;
        const x2 = positions[to].x,
          y2 = positions[to].y;
        const mx = (x1 + x2) / 2;
        path.setAttribute(
          "d",
          `M ${x1} ${y1} Q ${mx} ${y1}, ${mx} ${(y1 + y2) / 2} Q ${mx} ${y2}, ${x2} ${y2}`,
        );
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
      });
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);

    const triggers = Array.from(paths).map((path, i) =>
      ScrollTrigger.create({
        trigger: cards[i],
        start: "top 85%",
        once: true,
        onEnter: () => {
          const len = path.getTotalLength();
          gsap.to(path, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" });
        },
      }),
    );

    return () => {
      window.removeEventListener("resize", updatePaths);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return gridRef;
}

function useEcosystemBar() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const segs = document.querySelectorAll<HTMLElement>(
      "#ecosystem .bar-segment, #ecosystem .bar-arrow",
    );
    if (!segs.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#ecosystem",
        start: "top 65%",
        end: "top 20%",
        scrub: 1,
      },
    });

    segs.forEach((seg) => {
      tl.fromTo(seg, { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.25 }, "+=0.04");
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
}

/* -------------------------------- ecosystem ------------------------------- */

function Ecosystem() {
  const nodes = [
    {
      k: "Services",
      desc: "Custom software, AI systems, cloud infrastructure, and design—delivered as long-term engineering partnerships.",
      tags: ["Web", "Mobile", "AI", "Cloud"],
      feeds: "Services",
    },
    {
      k: "Products",
      desc: "Scalable software products built from recurring, real-world problems discovered during service delivery.",
      tags: ["SaaS", "Tools", "Platforms"],
      feeds: "Products",
    },
    {
      k: "Drones",
      desc: "Research, industrial applications, aerial systems, consulting, and training across the drone stack.",
      tags: ["Aerial", "Telemetry", "Industry"],
      feeds: "Drones",
    },
    {
      k: "Training",
      desc: "College programs, workshops, faculty development, student upskilling, and corporate training.",
      tags: ["Colleges", "Workshops", "Corporate"],
      feeds: "Training",
    },
  ];
  void nodes;

  const gridRef = useEcosystemLines();
  useEcosystemBar();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#ecosystem .eco-card",
        { scale: 0.95, y: 30, autoAlpha: 0 },
        {
          scale: 1,
          y: 0,
          autoAlpha: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#ecosystem .eco-grid",
            start: "top 80%",
            end: "top 45%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<SVGPathElement>("#ecosystem .eco-arrow path").forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: path.closest(".eco-card"),
              start: "top 75%",
              end: "top 45%",
              scrub: 0.5,
            },
          },
        );
      });

      const words = document.querySelectorAll("#ecosystem .eco-closed-loop .eco-word");
      words.forEach((el, i) => {
        gsap.fromTo(
          el,
          { color: "rgb(var(--color-charcoal) / 0.7)" },
          {
            color: "var(--color-orange)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 65%",
              scrub: 0.5,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ecosystem"
      className="verticals-section relative overflow-hidden bg-cream py-24 lg:py-0 scroll-mt-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full glow-orange opacity-40 blur-3xl" />

      <div className="verticals-shell relative mx-auto flex max-w-[1400px] flex-col px-6 md:px-10">
        <div className="verticals-header grid items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SectionLabel>The Ecosystem</SectionLabel>
            <h2
              data-reveal
              className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance break-words"
            >
              Four verticals. <span className="italic text-gradient-orange">One system.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <p className="max-w-md text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                Every part of TattvaTech feeds the others. Insights from services become products.
                Field work sharpens training. Training strengthens engineering.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={gridRef} className="verticals-frame relative mt-10 lg:mt-0">
          <svg
            className="verticals-connector pointer-events-none absolute inset-0 z-[0] hidden h-full w-full md:block"
            style={{ overflow: "visible" }}
            aria-hidden
          >
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                className="ecosystem-line"
                stroke="var(--orange)"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="verticals-grid eco-grid relative z-[1] grid gap-5 md:grid-cols-2 md:gap-6">
            {verticalRoutes.map((vertical, i) => (
              <Reveal key={vertical.title} delay={i * 90}>
                <article
                  className="eco-card vertical-card group relative overflow-hidden rounded-3xl border border-border bg-ivory p-6 shadow-soft transition-colors duration-300 hover:border-orange/50 hover:shadow-warm md:p-8 xl:p-9"
                  data-cursor="hover"
                  data-card
                >
                  <span className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange/0 blur-3xl transition-colors duration-300 group-hover:bg-orange/20" />

                  <Link
                    to={vertical.href}
                    className="vertical-card__main-link block rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                    aria-label={`View ${vertical.title}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-orange">
                        Vertical
                      </span>
                      <span className="h-px w-14 bg-ink/20 transition-colors duration-300 group-hover:bg-orange" />
                    </div>

                    <div className="vertical-card__content">
                      <h3 className="mt-6 font-display text-[clamp(2.6rem,4vw,4.6rem)] leading-[0.95] md:mt-8">
                        {vertical.title}
                        <span className="text-orange">.</span>
                      </h3>

                      <p className="mt-4 max-w-[46ch] text-pretty text-[clamp(0.95rem,1.15vw,1.15rem)] leading-[1.45] text-charcoal">
                        {vertical.description}
                      </p>

                      <div className="vertical-card__tags mt-6 flex flex-wrap gap-2">
                        {vertical.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-charcoal/80 transition-colors duration-300 group-hover:border-orange/40 group-hover:text-ink"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange">
                        <span>View {vertical.title}</span>
                        <span aria-hidden>↗</span>
                      </span>
                    </div>
                  </Link>

                  <div className="vertical-card__footer mt-6 flex items-center gap-3 border-t border-border pt-4 text-xs uppercase tracking-[0.24em] text-charcoal/60">
                    <span>Feeds</span>
                    <span aria-hidden className="text-orange">
                      →
                    </span>
                    <Link
                      to={vertical.feedsHref}
                      className="rounded-full text-ink transition-colors duration-300 hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                    >
                      {vertical.feedsInto}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="eco-closed-loop mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-border bg-ivory px-6 py-4 text-xs uppercase tracking-[0.24em] text-charcoal/70 md:mt-8 md:px-8 md:justify-between md:gap-4">
            <span className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_10px_var(--orange)]" />
              A closed loop
            </span>
            <span className="hidden md:inline">
              {[
                { type: "segment", text: "Services " },
                { type: "arrow", text: "→ " },
                { type: "segment", text: "Products " },
                { type: "arrow", text: "→ " },
                { type: "segment", text: "Drones " },
                { type: "arrow", text: "→ " },
                { type: "segment", text: "Training " },
                { type: "arrow", text: "→ " },
                { type: "segment", text: "Services" },
              ].map((item, i) => (
                <span
                  key={i}
                  className={`eco-word ${item.type === "arrow" ? "bar-arrow" : "bar-segment"}`}
                >
                  {item.text}
                </span>
              ))}
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
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("#services .service-item").forEach((item, i) => {
        const num = item.querySelector<HTMLElement>(".service-num");
        const title = item.querySelector<HTMLElement>(".service-title");
        const desc = item.querySelector<HTMLElement>(".service-desc");
        const divider = item.querySelector<HTMLElement>(".service-divider");
        const makeST = (item: HTMLElement) => ({
          trigger: item,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.5,
        });
        if (num && title) {
          gsap.fromTo(
            [num, title],
            { x: -30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, scrollTrigger: makeST(item), duration: 0.5 },
          );
        }
        if (desc) {
          gsap.fromTo(
            desc,
            { x: 30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, scrollTrigger: makeST(item), duration: 0.5 },
          );
        }
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              scrollTrigger: makeST(item),
              duration: 0.4,
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative bg-ivory py-24 md:py-40 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Services</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Engineering as a{" "}
                <span className="italic text-gradient-orange">long-term practice.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {services.map((s, i) => (
                <Reveal key={s.k} delay={i * 60}>
                  <li className="service-item group relative overflow-hidden">
                    <span className="service-divider pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-border/70" />
                    <a
                      href="#contact"
                      data-cursor="hover"
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 md:gap-6 md:py-7"
                    >
                      <span className="service-num text-xs tabular-nums text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="service-title font-display text-xl md:text-4xl">{s.k}</div>
                        <p className="service-desc mt-1 hidden max-w-md text-sm text-charcoal md:block">
                          {s.d}
                        </p>
                      </div>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-ivory md:h-11 md:w-11">
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
    {
      k: "Recurring problems",
      d: "We surface patterns across engagements and turn them into products.",
    },
    { k: "Own the stack", d: "Products built with the same engineering rigor as our services." },
    { k: "Compounding IP", d: "Each release strengthens the ecosystem and shortens delivery." },
  ];
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-40">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full glow-orange opacity-40 blur-3xl" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <SectionLabel>Products</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance break-words">
                Products born from <span className="italic text-gradient-orange">real work.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="md:col-span-6">
            <p className="max-w-xl text-pretty text-charcoal">
              We build scalable software products from recurring, real-world problems discovered
              during service delivery—shipped with the discipline of a product company and the
              pragmatism of an engineering team.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 90}>
              <article
                data-cursor="hover"
                data-card
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-ivory p-8 transition-colors duration-300 hover:shadow-warm"
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
                  <h3 className="mt-10 font-display text-2xl md:mt-14 md:text-3xl">{it.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal md:mt-4">{it.d}</p>
                </div>
                <div className="mt-8 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-700 group-hover:scale-x-100 md:mt-10" />
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const rows = [
    ["Research", "Applied research across flight, sensing, and autonomy."],
    ["Industrial", "Aerial systems for inspection, surveying, and monitoring."],
    ["Solutions", "End-to-end drone deployments tailored to industry needs."],
    ["Consulting", "Advisory across regulation, hardware, and operational design."],
    ["Innovation", "Prototyping new applications for aerial technology."],
    ["Training", "Pilot programs, technical courses, and certifications."],
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGPathElement>(".flight-path").forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: path.closest("section"),
              start: "top 80%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        "#drones .capability-item",
        { x: (i: number) => (i % 2 === 0 ? -40 : 40), autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.12,
          scrollTrigger: {
            trigger: "#drones .capability-grid",
            start: "top 75%",
            end: "top 45%",
            scrub: 0.8,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="drones"
      className="relative overflow-hidden bg-cream py-24 text-ink md:py-40 scroll-mt-24"
    >
      <FlightPathBg />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionLabel>Drones</SectionLabel>
            <h2
              data-reveal
              className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] text-balance break-words"
            >
              Aerial systems,{" "}
              <span className="italic text-gradient-orange">grounded engineering.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-pretty text-charcoal">
              Research, industrial applications, consulting, and training across the drone
              stack—built by engineers who fly what they design.
            </p>
            <Reveal delay={140}>
              <div className="group relative mt-10 overflow-hidden rounded-3xl border border-border shadow-warm">
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src="/drones-aerial.mp4" type="video/mp4" />
                </video>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <div className="capability-grid grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x">
              {rows.map(([k, d], i) => (
                <Reveal key={k} delay={i * 60}>
                  <div className="capability-item group relative p-6 md:p-8" data-cursor="hover">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-orange">
                        Capability
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-orange opacity-70 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl md:mt-10 md:text-3xl">{k}</h3>
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
          className="flight-path"
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#training .timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: "#training .timeline-list",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("#training .timeline-item").forEach((item) => {
        const dot = item.querySelector<HTMLElement>(".timeline-dot");
        gsap.fromTo(
          item,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            },
          },
        );
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 45%",
                scrub: 0.5,
              },
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="training" className="relative bg-ivory py-24 md:py-40 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 md:gap-y-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Training</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Knowledge that <span className="italic text-gradient-orange">travels.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-sm text-pretty text-charcoal">
                We teach what we build. Programs, workshops, and long-form curricula designed to
                move engineers, students, and faculty forward.
              </p>
            </Reveal>
          </div>
          <Reveal delay={180} className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <MediaFrame
                aspect="video"
                caption="Cohort · Add video"
                className="md:aspect-[16/11]"
              />
            </div>
          </Reveal>
          <div className="md:col-span-7">
            <ol className="timeline-list relative">
              <span className="timeline-line pointer-events-none absolute top-0 h-full w-px origin-top bg-orange/70" />
              {items.map(([k, d], i) => (
                <Reveal key={k} delay={i * 80}>
                  <li className="timeline-item group relative pb-8 pl-8 last:pb-0 md:pb-12 md:pl-10">
                    <span className="timeline-dot absolute grid h-6 w-6 place-items-center rounded-full border border-border bg-ivory transition-colors duration-300 group-hover:border-orange group-hover:bg-orange">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange transition-colors group-hover:bg-ivory" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-orange">
                        Program
                      </span>
                      <h3 className="font-display text-xl md:text-3xl">{k}</h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal">{d}</p>
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
    [
      "Design",
      "Architecture, interfaces, and systems planned before a single line of production code.",
    ],
    ["Build", "Clean engineering with regular checkpoints, not long silences."],
    [
      "Deploy",
      "Shipping to production with confidence—monitored, documented, backed out if needed.",
    ],
    ["Improve", "Real usage data feeds back into the cycle. The system gets smarter over time."],
  ];
  return (
    <section id="process" className="relative overflow-hidden bg-cream py-24 md:py-40 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Process</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                A calm, <span className="italic text-gradient-orange">deliberate cadence.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={160}>
              <p className="mb-10 max-w-xl text-pretty text-sm leading-relaxed text-charcoal">
                Every engagement follows the same cycle—not because we lack creativity, but because
                disciplined process is what lets us move fast without breaking things.
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("#why .why-row").forEach((row) => {
        const num = row.querySelector<HTMLElement>(".why-num");
        const title = row.querySelector<HTMLElement>(".why-title");
        const makeST = () => ({
          trigger: row,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.5,
        });
        if (num) {
          gsap.fromTo(num, { autoAlpha: 0 }, { autoAlpha: 1, scrollTrigger: makeST() });
        }
        if (title) {
          gsap.fromTo(
            title,
            { x: -24, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, scrollTrigger: makeST(), duration: 0.5 },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative bg-ivory py-24 md:py-40 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Why TattvaTech</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Confidence through <span className="italic text-gradient-orange">restraint.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <dl className="divide-y divide-border border-y border-border">
              {rows.map(([k, d], i) => (
                <Reveal key={k} delay={i * 50}>
                  <div className="why-row grid grid-cols-12 items-baseline gap-6 py-7">
                    <dt className="col-span-12 flex items-baseline gap-4 md:col-span-5">
                      <span className="why-num text-xs tabular-nums text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="why-title font-display text-xl md:text-3xl">{k}</span>
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
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const heading = document.querySelector("#contact .cta-heading");
      if (heading) {
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, null);
        const textNodes: Text[] = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

        textNodes.forEach((node) => {
          const words = node.textContent!.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          words.forEach((w) => {
            if (w.trim() === "") {
              frag.appendChild(document.createTextNode(w));
            } else {
              const span = document.createElement("span");
              span.className = "cta-word";
              span.style.display = "inline-block";
              span.textContent = w;
              frag.appendChild(span);
            }
          });
          node.parentNode!.replaceChild(frag, node);
        });

        gsap.fromTo(
          ".cta-word",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.035,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: "#contact", start: "top 80%", once: true },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-sunset" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 text-ink" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15 text-ivory" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-24 text-ivory md:px-10 md:py-48 scroll-mt-24">
        <Reveal>
          <SectionLabel>
            <span className="text-ivory">Contact</span>
          </SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="cta-heading mt-8 font-display text-[clamp(1.75rem,10vw,10rem)] leading-[0.92] text-balance break-words">
            Let's build technology <br />
            <span className="italic text-ivory/85">that matters.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal delay={220} className="md:col-span-6">
            <p className="max-w-md text-pretty text-ivory/80">
              Tell us about your problem, your team, or the system you're trying to build. We reply
              personally, and we reply well.
            </p>
          </Reveal>
          <Reveal delay={320} className="md:col-span-6 md:justify-self-end">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href={PUBLIC_EMAIL_MAILTO} variant="onDark">
                <span className="cta-btn">Start a conversation</span>
              </ButtonLink>
              <a
                href={PUBLIC_EMAIL_MAILTO}
                data-cursor="hover"
                className="contact-email text-sm text-ivory/90 underline-offset-4 hover:underline"
              >
                {PUBLIC_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function LegacyFooter() {
  const cols: [string, string[]][] = [
    ["Company", ["About", "Ecosystem", "Principles", "Contact"]],
    ["Services", ["Web", "Software", "Mobile", "AI & Automation", "Cloud & DevOps"]],
    ["Verticals", ["Products", "Drones", "Training"]],
    ["Contact", [PUBLIC_EMAIL, "LinkedIn", "X / Twitter", "GitHub"]],
  ];
  return (
    <footer className="bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="footer-brand">
              <img
                src="/Logo.png"
                alt="TattvaTech"
                width={220}
                height={220}
                loading="lazy"
                className="footer-logo"
              />
            </div>
            <p className="max-w-xs text-sm text-charcoal">
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
                        className="block py-2 text-sm text-charcoal underline-offset-4 hover:text-ink hover:underline md:py-0"
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

function Footer() {
  return <SiteFooter />;
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
