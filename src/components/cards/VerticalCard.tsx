import type { Vertical } from "@/types";
import { cn } from "@/lib/utils";

export function VerticalCard({ vertical }: { vertical: Vertical }) {
  return (
    <article
      className={cn(
        "rounded-[24px] border p-5 shadow-[var(--shadow-card)]",
        vertical.emphasis === "primary"
          ? "border-orange-primary/20 bg-white"
          : "border-border-default bg-white/75",
      )}
    >
      <h3 className="font-heading text-xl tracking-[-0.03em]">{vertical.name}</h3>
      <p className="mt-3 text-sm leading-7 text-text-secondary">
        {vertical.description}
      </p>
    </article>
  );
}
