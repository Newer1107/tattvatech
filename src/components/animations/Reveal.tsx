"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { sectionReveal } from "@/lib/animations";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} {...sectionReveal}>
      {children}
    </motion.div>
  );
}
