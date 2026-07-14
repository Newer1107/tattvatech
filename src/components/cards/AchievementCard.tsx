import type { Achievement } from "@/types";

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <article className="rounded-[24px] border border-border-default bg-white p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-heading text-2xl tracking-[-0.03em] text-text-primary">
        {achievement.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-text-secondary">
        {achievement.description}
      </p>
    </article>
  );
}
