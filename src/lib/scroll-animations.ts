import { useEffect } from "react";

/**
 * Animates `[data-reveal]` children inside `#sectionId` with a scroll-triggered
 * fade-in + slide-up via GSAP / ScrollTrigger.  Honor prefers-reduced-motion.
 */
export function useSectionReveal(sectionId: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    const section = document.getElementById(sectionId);
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    void (async () => {
      const { gsap } = await import("@/lib/animations");
      if (cancelled) return;

      const triggers = Array.from(targets, (el) =>
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          },
        ),
      );

      cleanup = () => {
        triggers.forEach((animation) => {
          animation.scrollTrigger?.kill();
          animation.kill();
        });
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [sectionId]);
}
