import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/animations";

const HOVER_SELECTOR = "[data-cursor='hover'], a, button, [role='button']";
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true'], [contenteditable='']";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(any-pointer: fine)");
    const hoverQuery = window.matchMedia("(any-hover: hover)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () =>
      setEnabled(pointerQuery.matches && hoverQuery.matches && !motionQuery.matches);

    updateEnabled();
    pointerQuery.addEventListener("change", updateEnabled);
    hoverQuery.addEventListener("change", updateEnabled);
    motionQuery.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      hoverQuery.removeEventListener("change", updateEnabled);
      motionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const doc = document.documentElement;

    if (!enabled || !root || !ring || !dot) {
      doc.classList.remove("custom-cursor-ready");
      return;
    }

    let visible = false;
    let overTextControl = false;

    const show = () => {
      if (visible || overTextControl) return;
      visible = true;
      doc.classList.add("custom-cursor-ready");
      gsap.to(root, { autoAlpha: 1, duration: 0.14, overwrite: true });
    };

    const hide = () => {
      visible = false;
      doc.classList.remove("custom-cursor-ready");
      gsap.to(root, { autoAlpha: 0, duration: 0.16, overwrite: true });
    };

    const setInteractiveState = (isHovering: boolean) => {
      gsap.to(ring, {
        width: isHovering ? 42 : 34,
        height: isHovering ? 42 : 34,
        duration: 0.22,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(dot, {
        width: isHovering ? 18 : 14,
        height: isHovering ? 18 : 14,
        duration: 0.18,
        ease: "power3.out",
        overwrite: true,
      });
    };

    gsap.set(root, {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
      autoAlpha: 0,
    });

    const setX = gsap.quickSetter(root, "x", "px");
    const setY = gsap.quickSetter(root, "y", "px");

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const target = event.target as HTMLElement | null;
      overTextControl = !!target?.closest(TEXT_INPUT_SELECTOR);

      setX(event.clientX);
      setY(event.clientY);

      if (overTextControl) {
        hide();
        return;
      }

      setInteractiveState(!!target?.closest(HOVER_SELECTOR));
      show();
    };

    const handlePointerLeave = () => hide();
    const handleWindowBlur = () => hide();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
      doc.classList.remove("custom-cursor-ready");
    };
  }, [enabled]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={rootRef}
      data-custom-cursor
      data-cursor-root="global"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-0 w-0 overflow-visible will-change-transform"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <span
        ref={ringRef}
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 34,
          height: 34,
          transform: "translate(-50%, -50%)",
          border: "1px solid color-mix(in oklab, var(--orange) 30%, white 45%)",
          background: "transparent",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: 0.9,
        }}
      />
      <span
        ref={dotRef}
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          transform: "translate(-50%, -50%)",
          background: "var(--orange-soft)",
          border: "1px solid var(--orange)",
          boxShadow: "0 0 10px color-mix(in oklab, var(--orange) 16%, transparent)",
          opacity: 0.96,
        }}
      />
    </div>,
    document.body,
  );
}
