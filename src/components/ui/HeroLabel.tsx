import type { ReactNode } from "react";

export function HeroLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-orange-primary/12 bg-white/70 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-orange-dark backdrop-blur-sm">
      {children}
    </span>
  );
}
