import { SectionReveal } from "@/components/animations/SectionReveal";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { achievements } from "@/constants/achievements";

export function Achievements() {
  return (
    <SectionContainer id="achievements">
      <SectionReveal className="rounded-[32px] border border-[rgba(16,24,40,0.08)] bg-white p-8 shadow-[0_24px_64px_rgba(16,24,40,0.06)] md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(340px,1fr)] lg:gap-14">
          <div data-reveal>
            <SectionLabel>Notable Achievements</SectionLabel>
            <SectionHeading className="mt-5 max-w-[11ch]">
              Milestones should read like evidence, not decoration.
            </SectionHeading>
            <p className="mt-6 max-w-[40ch] text-[1rem] leading-8 text-text-secondary">
              TattvaTech is keeping this section disciplined until verified public milestones are ready. That protects trust and keeps the site aligned with what has actually been documented.
            </p>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <article
                key={achievement.title}
                data-reveal
                className="relative overflow-hidden rounded-[24px] border border-[rgba(16,24,40,0.08)] bg-background-warm px-5 py-6 md:px-6"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[image:var(--brand-gradient)]" />
                <div className="pl-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
                    Record {index + 1}
                  </p>
                  <h3 className="mt-3 font-heading text-[1.4rem] leading-[1.04] tracking-[-0.04em] text-text-primary">
                    {achievement.title}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[0.96rem] leading-7 text-text-secondary">
                    {achievement.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </SectionContainer>
  );
}
