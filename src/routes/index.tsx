import { Link, createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type DependencyList,
  type RefObject,
} from "react";
import { ButtonLink, SiteFooter, SiteNavbar } from "@/components/site-chrome";
import { assetPath } from "@/lib/assets";
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

const loadAnimations = (() => {
  let promise: Promise<typeof import("@/lib/animations")> | null = null;
  return () => (promise ??= import("@/lib/animations"));
})();

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

function useDeferredMotionEffect(
  callback: (animations: typeof import("@/lib/animations")) => void | (() => void),
  deps: DependencyList,
) {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(async () => {
        const animations = await loadAnimations();
        if (cancelled) return;

        const maybeCleanup = callback(animations);
        cleanup = typeof maybeCleanup === "function" ? maybeCleanup : () => {};
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      cleanup();
    };
  }, deps);
  /* eslint-enable react-hooks/exhaustive-deps */
}

function useCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  return {
    coreRef,
    ringRef,
    hover: false,
  };
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

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const p = useScrollProgress();
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        hero.style.setProperty("--hero-mouse-x", `${(e.clientX / window.innerWidth) * 100}%`);
        hero.style.setProperty("--hero-mouse-y", `${(e.clientY / window.innerHeight) * 100}%`);
        frame = 0;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setHeroVideoReady(true);
    }

    video.play().catch(() => {});
  }, []);

  /* Hero parallax: heading scale/fade + background grid translateY on scroll */
  useDeferredMotionEffect(({ gsap }) => {
    const heading = document.querySelector<HTMLElement>("#top h1");
    const grid = document.querySelector<HTMLElement>("#top .bg-grid");
    const tweens: gsap.core.Tween[] = [];

    if (heading) {
      tweens.push(
        gsap.to(heading, {
          scale: 0.95,
          opacity: 0.4,
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }),
      );
    }

    if (grid) {
      tweens.push(
        gsap.to(grid, {
          y: "30%",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }),
      );
    }

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  /* Hero entrance: staggered blur + slide reveal with ambient background settle */
  useDeferredMotionEffect(({ gsap }) => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".network-node",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.03 },
        0,
      );

      tl.fromTo(
        ".hero-media-frame",
        { y: 18, opacity: 0.45 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.18,
      );

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
    <section
      ref={heroRef}
      id="top"
      className="hero-section relative overflow-hidden bg-ivory"
      style={
        {
          "--hero-mouse-x": "50%",
          "--hero-mouse-y": "50%",
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 text-ink">
        <div className="absolute inset-0 bg-grid grid-drift opacity-70" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at var(--hero-mouse-x) var(--hero-mouse-y), color-mix(in oklab, var(--orange-soft) 55%, transparent) 0%, transparent 60%)",
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

      <div className="hero-shell relative mx-auto flex max-w-[1400px] flex-col px-6 pb-12 pt-4 md:px-10 md:pb-16 md:pt-6">
        <SiteNavbar page="home" />

        <div className="hero-content flex flex-1 flex-col justify-center py-6 md:py-8">
          <div className="hero-badge">
            <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70 md:mb-10">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_14px_var(--orange)]" />
              A founder-led technology company · Est. 2024
            </div>
          </div>

          <div className="hero-grid grid gap-10">
            <div className="hero-copy">
              <h1
                className="font-display text-[clamp(2.75rem,6vw,7rem)] leading-[0.9] text-balance break-words"
                style={{ transform: `translateY(${p * -40}px)` }}
              >
                <span className="block hero-heading-line-1">Technology</span>
                <span className="block hero-heading-line-2 italic text-gradient-orange">
                  that transforms.
                </span>
              </h1>

              <p className="hero-paragraph mt-8 max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                TattvaTech builds practical technology across software, AI, drones, digital
                products, and technical education—creating solutions that grow stronger through
                connected expertise.
              </p>

              <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="#services">Explore our work</ButtonLink>
                <ButtonLink href="#ecosystem" variant="ghost">
                  Discover our ecosystem
                </ButtonLink>
              </div>
            </div>

            <div className="hero-media reveal-up" style={{ animationDelay: "300ms" }}>
              <div className="hero-media-frame group relative overflow-hidden rounded-3xl border border-border shadow-warm">
                <video
                  ref={heroVideoRef}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${heroVideoReady ? "opacity-100" : "opacity-0"}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlay={() => setHeroVideoReady(true)}
                  onLoadedData={() => setHeroVideoReady(true)}
                  disablePictureInPicture
                >
                  <source src={assetPath("/hero-ui.mp4")} type="video/mp4" />
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

function LazyVideo({
  src,
  className,
  rootMargin = "300px",
  preload = "metadata",
  videoRef,
}: {
  src: string;
  className: string;
  rootMargin?: string;
  preload?: "none" | "metadata" | "auto";
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    const video = videoRef?.current ?? localVideoRef.current;
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
  }, [shouldLoad, videoRef]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {shouldLoad ? (
        <video
          ref={videoRef ?? localVideoRef}
          className={`${className} transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
          autoPlay
          loop
          muted
          playsInline
          preload={preload}
          disablePictureInPicture
          onLoadedData={() => setIsReady(true)}
        >
          <source src={assetPath(src)} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-grid-fine opacity-35 text-ink" aria-hidden="true" />
      )}
    </div>
  );
}

function MediaFrame({
  aspect = "video",
  caption,
  accent = false,
  onDark = false,
  videoSrc,
  className = "",
}: {
  aspect?: "video" | "portrait" | "square" | "wide";
  caption?: string;
  accent?: boolean;
  onDark?: boolean;
  videoSrc?: string;
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
      {videoSrc ? (
        <LazyVideo src={videoSrc} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          className={`absolute inset-0 ${onDark ? "text-ivory" : "text-ink"} bg-grid-fine opacity-40`}
        />
      )}
      {accent && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full glow-orange opacity-70 blur-3xl" />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        {!videoSrc && (
          <span
            className={`grid h-14 w-14 place-items-center rounded-full ${
              onDark ? "bg-ivory/10 text-ivory" : "bg-ivory text-ink"
            } shadow-soft transition-transform duration-500 group-hover:scale-105`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.28em] ${
            videoSrc ? "text-ivory/80" : onDark ? "text-ivory/70" : "text-charcoal/70"
          }`}
        >
          {caption ?? ""}
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
  const aboutVideoSectionRef = useRef<HTMLDivElement>(null);
  const aboutVideoPinRef = useRef<HTMLDivElement>(null);
  const aboutVideoFrameRef = useRef<HTMLDivElement>(null);
  const aboutPrinciplesRef = useRef<HTMLDivElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);
  const steps = [
    { k: "Observe", d: "Real problems, patterns, and gaps in how technology is actually used." },
    { k: "Build", d: "Engineered solutions with clarity, restraint, and long-term architecture." },
    { k: "Scale", d: "Systems designed to grow with organizations, not against them." },
    { k: "Evolve", d: "Continuous refinement guided by outcomes rather than trends." },
    { k: "Responsibly", d: "Practical innovation grounded in ethics, trust, and durability." },
  ];
  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = aboutVideoSectionRef.current;
    const pin = aboutVideoPinRef.current;
    const frame = aboutVideoFrameRef.current;
    const principles = aboutPrinciplesRef.current;
    const video = aboutVideoRef.current;
    if (!section || !pin || !frame || !principles || !video) return;

    const playVideo = () => video.play().catch(() => {});
    const pauseVideo = () => video.pause();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        },
        { threshold: 0.35 },
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const geometry = {
      initialScaleX: 1,
      initialScaleY: 1,
      initialRadius: 36,
    };
    let updateFrameGeometry = () => {};

    const ctx = gsap.context(() => {
      gsap.set(principles, {
        autoAlpha: 0,
        y: 72,
        scale: 0.985,
        transformOrigin: "center center",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const viewportHeight = window.innerHeight;
            if (window.innerWidth < 768) return `+=${Math.round(viewportHeight * 1.1)}`;
            if (window.innerWidth < 1024) return `+=${Math.round(viewportHeight * 1.2)}`;
            return `+=${Math.round(viewportHeight * 1.3)}`;
          },
          scrub: 1,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: playVideo,
          onEnterBack: playVideo,
          onLeave: pauseVideo,
          onLeaveBack: pauseVideo,
        },
      });

      timeline
        .to({}, { duration: 0.15 })
        .to(
          frame,
          {
            scaleX: 1,
            scaleY: 1,
            borderRadius: 0,
            ease: "none",
            duration: 0.4,
          },
          0.15,
        )
        .to(
          principles,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.25,
          },
          0.33,
        )
        .to({}, { duration: 0.2 })
        .to({}, { duration: 0.12 });

      updateFrameGeometry = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isMobile = viewportWidth < 768;
        const isTablet = viewportWidth < 1024;
        const insetX = isMobile
          ? 12
          : isTablet
            ? clamp(viewportWidth * 0.03, 16, 24)
            : clamp(viewportWidth * 0.022, 20, 32);
        const insetHeight = isMobile
          ? clamp(viewportHeight * 0.7, viewportHeight * 0.66, viewportHeight * 0.74)
          : isTablet
            ? clamp(viewportHeight * 0.8, viewportHeight * 0.76, viewportHeight * 0.84)
            : clamp(viewportHeight * 0.86, viewportHeight * 0.82, viewportHeight * 0.88);
        const insetWidth = viewportWidth - insetX * 2;

        geometry.initialScaleX = insetWidth / viewportWidth;
        geometry.initialScaleY = insetHeight / viewportHeight;
        geometry.initialRadius = isMobile
          ? 22
          : isTablet
            ? 28
            : clamp(viewportWidth * 0.022, 28, 38);

        gsap.set(frame, {
          width: "100vw",
          height: "100svh",
          x: 0,
          y: 0,
          scaleX: geometry.initialScaleX,
          scaleY: geometry.initialScaleY,
          borderRadius: geometry.initialRadius,
          transformOrigin: "center center",
        });
      };

      ScrollTrigger.addEventListener("refreshInit", updateFrameGeometry);
      updateFrameGeometry();
    }, section);

    const refreshLayout = () => ScrollTrigger.refresh();
    video.addEventListener("loadedmetadata", refreshLayout);
    video.addEventListener("loadeddata", refreshLayout);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", updateFrameGeometry);
      video.removeEventListener("loadedmetadata", refreshLayout);
      video.removeEventListener("loadeddata", refreshLayout);
      ctx.revert();
    };
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
      </div>

      <div ref={aboutVideoSectionRef} className="about-video-section mt-10 md:mt-16">
        <div ref={aboutVideoPinRef} className="about-video-pin">
          <div ref={aboutVideoFrameRef} className="about-video-frame">
            <video
              ref={aboutVideoRef}
              src={assetPath("/about.mp4")}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              className="about-video"
            />
            <div
              ref={aboutPrinciplesRef}
              className="about-principles"
              aria-label="TattvaTech principles"
            >
              {steps.map((s, i) => (
                <div key={s.k} className="about-principles__item">
                  <div className="about-principles__num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="about-principles__title">{s.k}.</h3>
                  <p className="about-principles__description">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
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
  return (
    <section id="ecosystem" className="verticals-section relative bg-cream scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />

      <div className="verticals-inner relative">
        <div className="verticals-eyebrow">
          <SectionLabel>The Ecosystem</SectionLabel>
        </div>

        <div className="verticals-header">
          <div>
            <h2 data-reveal className="verticals-title mt-6 font-display text-balance break-words">
              Four verticals. <span className="italic text-gradient-orange">One system.</span>
            </h2>
          </div>
          <div className="verticals-copy">
            <Reveal delay={120}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                Every part of TattvaTech feeds the others. Insights from services become products.
                Field work sharpens training. Training strengthens engineering.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="verticals-grid">
          {verticalRoutes.map((vertical, i) => (
            <Reveal key={vertical.title} delay={i * 90}>
              <article
                className="vertical-card group relative rounded-[28px] shadow-soft"
                data-cursor="hover"
                data-card
              >
                <div className="vertical-card__main-link">
                  <div className="vertical-card__header">
                    <span className="vertical-card__eyebrow">Vertical</span>
                    <span className="vertical-card__rule" />
                  </div>

                  <div className="vertical-card__body">
                    <h3 className="vertical-card__title">
                      {vertical.title}
                      <span className="vertical-card__period">.</span>
                    </h3>

                    <p className="vertical-card__description">{vertical.description}</p>

                    <div className="vertical-card__tags">
                      {vertical.tags.map((tag) => (
                        <span
                          key={tag}
                          className="vertical-card__tag rounded-full border border-ink/15 bg-cream px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="vertical-card__footer">
                  <Link
                    to={vertical.href}
                    className="vertical-card__cta"
                    aria-label={`View ${vertical.title}`}
                  >
                    <span>View {vertical.title}</span>
                    <span aria-hidden="true">&#8599;</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="verticals-closing text-pretty text-charcoal/75">
            A connected system where each vertical stays readable, evenly weighted, and clearly
            routed.
          </p>
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
                <div className="relative aspect-video">
                  <LazyVideo
                    src="/drones-aerial.mp4"
                    className="absolute inset-0 h-full w-full object-cover"
                    preload="metadata"
                    rootMargin="350px"
                    videoRef={videoRef}
                  />
                </div>
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
              <MediaFrame aspect="video" videoSrc="/training.mp4" className="md:aspect-[16/11]" />
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
                src={assetPath("/Logo.png")}
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
