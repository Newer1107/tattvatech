import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations";

const HOVER_SELECTOR = "[data-cursor='hover'], a, button, [role='button']";
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true'], [contenteditable='']";

export function CustomCursor() {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const coreInnerRef = useRef<HTMLDivElement | null>(null);
  const ringInnerRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => setEnabled(pointerQuery.matches && !motionQuery.matches);

    updateEnabled();
    pointerQuery.addEventListener("change", updateEnabled);
    motionQuery.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      motionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    const core = coreRef.current;
    const ring = ringRef.current;
    const coreInner = coreInnerRef.current;
    const ringInner = ringInnerRef.current;
    if (!core || !ring || !coreInner || !ringInner) return;

    let visible = false;
    let overTextControl = false;

    const show = () => {
      if (visible || overTextControl) return;
      visible = true;
      document.body.classList.add("custom-cursor-active");
      gsap.to([core, ring], { autoAlpha: 1, duration: 0.14, overwrite: true });
    };

    const hide = () => {
      visible = false;
      document.body.classList.remove("custom-cursor-active");
      gsap.to([core, ring], { autoAlpha: 0, duration: 0.18, overwrite: true });
    };

    const setHoverState = (isHovering: boolean) => {
      gsap.to(coreInner, {
        width: isHovering ? 18 : 14,
        height: isHovering ? 18 : 14,
        marginLeft: isHovering ? -9 : -7,
        marginTop: isHovering ? -9 : -7,
        background: isHovering ? "var(--orange-soft)" : "var(--orange-soft)",
        borderWidth: 1,
        borderColor: isHovering ? "var(--orange)" : "var(--orange)",
        boxShadow: isHovering
          ? "0 0 18px color-mix(in oklab, var(--orange) 30%, transparent)"
          : "0 0 10px color-mix(in oklab, var(--orange) 16%, transparent)",
        duration: 0.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(ringInner, {
        width: isHovering ? 42 : 34,
        height: isHovering ? 42 : 34,
        marginLeft: isHovering ? -21 : -17,
        marginTop: isHovering ? -21 : -17,
        background: "transparent",
        borderColor: "color-mix(in oklab, var(--orange) 30%, white 45%)",
        duration: 0.24,
        ease: "power3.out",
        overwrite: true,
      });
    };

    gsap.set([core, ring], { x: -100, y: -100, autoAlpha: 0 });

    const moveCoreX = gsap.quickTo(core, "x", { duration: 0.08, ease: "power3.out" });
    const moveCoreY = gsap.quickTo(core, "y", { duration: 0.08, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.2, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.2, ease: "power3.out" });

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      overTextControl = !!target?.closest(TEXT_INPUT_SELECTOR);

      moveCoreX(event.clientX);
      moveCoreY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);

      if (overTextControl) {
        hide();
        return;
      }

      setHoverState(!!target?.closest(HOVER_SELECTOR));
      show();
    };

    const handlePointerLeave = () => hide();
    const handleWindowBlur = () => hide();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div data-cursor-root="global" aria-hidden="true">
      <div
        ref={coreRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-0 w-0 overflow-visible will-change-transform"
      >
        <div
          ref={coreInnerRef}
          className="rounded-full"
          style={{
            width: 14,
            height: 14,
            marginLeft: -7,
            marginTop: -7,
            background: "var(--orange-soft)",
            border: "1px solid var(--orange)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 0 10px color-mix(in oklab, var(--orange) 16%, transparent)",
            opacity: 0.96,
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[89] h-0 w-0 overflow-visible will-change-transform"
      >
        <div
          ref={ringInnerRef}
          className="rounded-full"
          style={{
            width: 34,
            height: 34,
            marginLeft: -17,
            marginTop: -17,
            border: "1px solid color-mix(in oklab, var(--orange) 30%, white 45%)",
            background: "transparent",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  );
}
