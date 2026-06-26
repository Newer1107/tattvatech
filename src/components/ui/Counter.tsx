"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label?: string;
  description?: string;
  className?: string;
}

export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  label,
  description,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-text-primary">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </div>
        {label && (
          <div className="mt-2 text-sm font-medium text-text-tertiary">
            {label}
          </div>
        )}
        {description && (
          <div className="mt-1 text-xs text-text-tertiary/60">
            {description}
          </div>
        )}
      </motion.div>
    </div>
  );
}
