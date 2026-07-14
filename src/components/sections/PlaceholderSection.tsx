import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

type PlaceholderSectionProps = {
  id: string;
  label: string;
  heading: string;
  copy: string;
  tone?: "white" | "warm" | "dark";
};

export function PlaceholderSection({
  id,
  label,
  heading,
  copy,
  tone = "white",
}: PlaceholderSectionProps) {
  return (
    <SectionContainer id={id}>
      <div
        className={cn(
          "rounded-[32px] border p-8 md:p-10 lg:p-12",
          tone === "warm" && "border-transparent bg-background-warm",
          tone === "white" && "border-border-default bg-white",
          tone === "dark" && "border-white/10 bg-background-dark text-white",
        )}
      >
        <SectionLabel>{label}</SectionLabel>
        <SectionHeading className={cn("mt-5", tone === "dark" && "text-white")}>
          {heading}
        </SectionHeading>
        <p
          className={cn(
            "mt-6 max-w-3xl text-lg leading-8",
            tone === "dark" ? "text-white/72" : "text-text-secondary",
          )}
        >
          {copy}
        </p>
      </div>
    </SectionContainer>
  );
}
