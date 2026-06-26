"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useSectionInView(once = true) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { once, margin: "-80px" as const });

  return { ref, inView };
}
