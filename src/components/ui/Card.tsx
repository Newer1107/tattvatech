"use client";

import { useRef, ReactNode, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  delay = 0,
  hover = true,
  glow = false,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hover) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [hover, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={
        hover
          ? {
              rotateX,
              rotateY,
              transformPerspective: 800,
            }
          : undefined
      }
      whileHover={
        hover
          ? {
              y: -4,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      className={`relative rounded-2xl border border-black/[0.06] bg-gradient-to-b from-black/[0.02] to-transparent p-6 md:p-8 transition-colors duration-300 ${
        hover ? "hover:border-black/[0.12] hover:bg-black/[0.04]" : ""
      } ${glow ? "glow-orange" : ""} ${className}`}
    >
      {children}
      {/* Glowing border overlay on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/[0.02] to-transparent opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-2xl border border-orange/20 opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
