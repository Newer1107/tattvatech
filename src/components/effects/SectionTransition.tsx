"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, type TargetAndTransition } from "framer-motion";

type TransitionVariant =
  | "fade"
  | "blur"
  | "wipe"
  | "morph"
  | "perspective"
  | "layer";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: TransitionVariant;
  delay?: number;
}

const variants: Record<
  TransitionVariant,
  { initial: TargetAndTransition; whileInView: TargetAndTransition }
> = {
  fade: {
    initial: { opacity: 0 } as TargetAndTransition,
    whileInView: { opacity: 1 } as TargetAndTransition,
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" } as TargetAndTransition,
    whileInView: { opacity: 1, filter: "blur(0px)" } as TargetAndTransition,
  },
  wipe: {
    initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" } as TargetAndTransition,
    whileInView: { opacity: 1, clipPath: "inset(0 0 0% 0)" } as TargetAndTransition,
  },
  morph: {
    initial: { opacity: 0, scale: 0.96, borderRadius: "40px" } as TargetAndTransition,
    whileInView: { opacity: 1, scale: 1, borderRadius: "0px" } as TargetAndTransition,
  },
  perspective: {
    initial: { opacity: 0, rotateX: 8, y: 60 } as TargetAndTransition,
    whileInView: { opacity: 1, rotateX: 0, y: 0 } as TargetAndTransition,
  },
  layer: {
    initial: { opacity: 0, y: 40, scale: 0.98 } as TargetAndTransition,
    whileInView: { opacity: 1, y: 0, scale: 1 } as TargetAndTransition,
  },
};

export default function SectionTransition({
  children,
  className = "",
  variant = "fade",
  delay = 0,
}: SectionTransitionProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const v = variants[variant];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
