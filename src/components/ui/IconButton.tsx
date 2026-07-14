import type { ReactNode } from "react";

export function IconButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-white text-text-primary shadow-[var(--shadow-card)]">
      {children}
    </span>
  );
}
