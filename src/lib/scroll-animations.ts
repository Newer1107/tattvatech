import { useEffect } from "react";
import { gsap, ScrollTrigger, scrollConfig } from "@/lib/animations";

/**
 * Animates `[data-reveal]` children inside `#sectionId` with a scroll-triggered
 * fade-in + slide-up via GSAP / ScrollTrigger.  Honor prefers-reduced-motion.
 */
export function useSectionReveal(sectionId: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    targets.forEach((el) => {
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
            start: scrollConfig.reveal,
            once: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [sectionId]);
}
