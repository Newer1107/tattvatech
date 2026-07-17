import { SectionReveal } from "@/components/animations/SectionReveal";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { reviews } from "@/constants/reviews";

export function Reviews() {
  return (
    <SectionContainer id="reviews">
      <SectionReveal className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,1fr)] lg:gap-14">
        <div data-reveal>
          <SectionLabel>References and Trust</SectionLabel>
          <SectionHeading className="mt-5 max-w-[12ch]">
            Public proof will appear with approval, not invention.
          </SectionHeading>
          <p className="mt-6 max-w-[42ch] text-[1.02rem] leading-8 text-text-secondary">
            This section is intentionally designed as an evidence shelf rather than a fabricated testimonial carousel. TattvaTech will publish customer references only when attribution and approval are clear.
          </p>
        </div>

        <div className="grid gap-4">
          {reviews.map((review, index) => (
            <article
              key={review.title}
              data-reveal
              data-reveal-axis="x"
              data-reveal-direction={index % 2 === 0 ? "left" : "right"}
              className="overflow-hidden rounded-[28px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(252,251,249,0.96)_100%)] p-6 shadow-[0_18px_42px_rgba(16,24,40,0.06)] md:p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
                    Evidence record {index + 1}
                  </p>
                  <h3 className="mt-3 font-heading text-[1.6rem] leading-[1.02] tracking-[-0.04em] text-text-primary">
                    {review.title}
                  </h3>
                </div>
                <span className="font-heading text-[2.4rem] leading-none tracking-[-0.05em] text-orange-primary/22">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-5 max-w-[40ch] text-[0.98rem] leading-7 text-text-secondary">
                {review.description}
              </p>
            </article>
          ))}
        </div>
      </SectionReveal>
    </SectionContainer>
  );
}
