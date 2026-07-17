import { ArrowDownRight } from "lucide-react";
import type { HTMLAttributes } from "react";
import type { BusinessVertical } from "@/types";
import { cn } from "@/lib/utils";
import { VerticalImage } from "@/components/ui/VerticalImage";
import { VerticalImageFallback } from "@/components/ui/VerticalImageFallback";

const themeMap = {
  warm: {
    surface: "bg-[#FFF7ED] text-text-primary",
    border: "border-orange-primary/14",
    label: "text-orange-dark/78",
    number: "text-orange-primary/40",
    body: "text-text-secondary",
    capability: "border-orange-primary/14 bg-white/55 text-text-primary",
    link:
      "text-text-primary decoration-orange-primary/40 hover:text-orange-primary hover:decoration-orange-primary",
  },
  dark: {
    surface: "bg-[#101828] text-white",
    border: "border-white/10",
    label: "text-white/64",
    number: "text-white/34",
    body: "text-[#D0D5DD]",
    capability: "border-white/10 bg-white/6 text-white",
    link:
      "text-white decoration-white/35 hover:text-[#FFA800] hover:decoration-[#FFA800]",
  },
  orange: {
    surface: "bg-[#EA580C] text-white",
    border: "border-white/12",
    label: "text-white/66",
    number: "text-white/34",
    body: "text-[rgba(255,255,255,0.82)]",
    capability: "border-white/14 bg-white/8 text-white",
    link:
      "text-white decoration-white/35 hover:text-[#FFC56B] hover:decoration-[#FFC56B]",
  },
  amber: {
    surface: "bg-[#FED7AA] text-text-primary",
    border: "border-orange-dark/12",
    label: "text-orange-dark/74",
    number: "text-orange-dark/28",
    body: "text-text-secondary",
    capability: "border-orange-dark/12 bg-white/44 text-text-primary",
    link:
      "text-text-primary decoration-orange-dark/30 hover:text-orange-dark hover:decoration-orange-dark",
  },
} satisfies Record<
  BusinessVertical["theme"],
  {
    surface: string;
    border: string;
    label: string;
    number: string;
    body: string;
    capability: string;
    link: string;
  }
>;

type BusinessVerticalCardProps = {
  vertical: BusinessVertical;
  index: number;
  priority?: boolean;
  stacked?: boolean;
  className?: HTMLAttributes<HTMLElement>["className"];
};

export function BusinessVerticalCard({
  vertical,
  index,
  priority = false,
  stacked = false,
  className,
}: BusinessVerticalCardProps) {
  const theme = themeMap[vertical.theme];
  const title = `${vertical.titleTop} ${vertical.titleBottom}`;

  return (
    <article
      id={vertical.id}
      data-stack-card
      className={cn(
        stacked
          ? "group absolute inset-0 overflow-hidden"
          : "group scroll-mt-24 overflow-hidden border-t rounded-t-[32px] lg:scroll-mt-28 lg:rounded-t-[40px]",
        theme.surface,
        stacked ? "" : theme.border,
        className,
      )}
      style={{ zIndex: (index + 2) * 10 }}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1440px] flex-col px-6 py-12 md:px-10 md:py-14 xl:px-16 xl:py-20",
          stacked ? "h-full min-h-full" : "min-h-[92svh]",
        )}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <h3 className="max-w-[8ch] font-heading text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.9] tracking-[-0.05em]">
            <span className="block">{vertical.titleTop}</span>
            <span className="block">{vertical.titleBottom}</span>
          </h3>

          <span
            aria-hidden="true"
            className={cn(
              "font-heading text-[clamp(3rem,6vw,7rem)] leading-none tracking-[-0.05em]",
              theme.number,
            )}
          >
            {vertical.number}
          </span>
        </div>

        <div className="mt-10 grid flex-1 gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,0.68fr)] lg:items-end lg:gap-14">
          <div className="order-2 flex flex-col justify-end lg:order-1">
            <p className={cn("text-[0.74rem] font-semibold uppercase tracking-[0.18em]", theme.label)}>
              Approach
            </p>
            <p className={cn("mt-4 max-w-[36ch] text-[clamp(1rem,1.3vw,1.24rem)] leading-8", theme.body)}>
              {vertical.description}
            </p>

            <p className={cn("mt-9 text-[0.74rem] font-semibold uppercase tracking-[0.18em]", theme.label)}>
              Capabilities
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {vertical.capabilities.map((capability) => (
                <li
                  key={capability}
                  className={cn(
                    "rounded-full border px-4 py-3 text-sm font-medium leading-6",
                    theme.capability,
                  )}
                >
                  {capability}
                </li>
              ))}
            </ul>

            <a
              href={vertical.anchor}
              className={cn(
                "mt-10 inline-flex w-fit items-center gap-3 border-b pb-1 text-[clamp(0.98rem,1.05vw,1.12rem)] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4",
                theme.link,
              )}
            >
              <span>{vertical.linkLabel}</span>
              <ArrowDownRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>
          </div>

          <div className="order-1 flex items-end lg:order-2 lg:justify-end">
            <div className="w-full max-w-[600px]">
              {vertical.image ? (
                <VerticalImage
                  src={vertical.image}
                  alt={vertical.imageAlt ?? title}
                  title={title}
                  theme={vertical.theme}
                  priority={priority}
                />
              ) : (
                <VerticalImageFallback title={title} theme={vertical.theme} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
