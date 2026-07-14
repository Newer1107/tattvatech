import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-heading text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-[-0.04em] text-text-primary",
        className,
      )}
    >
      {children}
    </h2>
  );
}
