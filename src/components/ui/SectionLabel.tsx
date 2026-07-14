import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-orange-primary">
      {children}
    </p>
  );
}
