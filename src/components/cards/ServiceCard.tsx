import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="rounded-[24px] border border-border-default bg-white p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-heading text-[1.35rem] tracking-[-0.03em] text-text-primary">
        {service.title}
      </h3>
      <p className="mt-3 text-[0.98rem] leading-7 text-text-secondary">
        {service.description}
      </p>
    </article>
  );
}
