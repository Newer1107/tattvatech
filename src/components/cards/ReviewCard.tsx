import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[24px] border border-dashed border-border-strong bg-white/80 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-primary">
        Review Policy
      </p>
      <h3 className="mt-4 font-heading text-2xl tracking-[-0.03em]">
        {review.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-text-secondary">
        {review.description}
      </p>
    </article>
  );
}
