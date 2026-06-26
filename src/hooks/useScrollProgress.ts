"use client";

import { useScroll, type UseScrollOptions } from "framer-motion";
import { useRef } from "react";

export function useScrollProgress(offset?: UseScrollOptions["offset"]) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset ?? ["start start", "end end"],
  });

  return { ref, scrollYProgress };
}
