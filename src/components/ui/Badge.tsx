import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-orange-primary/15 bg-orange-primary/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-orange-dark">
      {children}
    </span>
  );
}
