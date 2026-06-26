"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MouseGlow() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [windowHeight, setWindowHeight] = useState(900);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024 && !("ontouchstart" in window));
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      mq.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    if (!isDesktop) return;
    const onMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop, mouseX, mouseY]);

  const opacity = useTransform(
    springY,
    [0, windowHeight],
    [0.8, 0.2]
  );

  if (!isDesktop || reducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ opacity }}
    >
      <motion.div
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2"
        style={{ left: springX, top: springY }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,122,24,0.08) 0%, rgba(255,148,77,0.04) 30%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
