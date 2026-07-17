import type { BusinessVerticalTheme } from "@/types";
import { cn } from "@/lib/utils";

const themeMap: Record<
  BusinessVerticalTheme,
  {
    shell: string;
    eyebrow: string;
    title: string;
    line: string;
    glow: string;
    orb: string;
  }
> = {
  warm: {
    shell:
      "border border-orange-primary/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.6)_0%,rgba(255,247,237,0.95)_52%,rgba(254,215,170,0.9)_100%)]",
    eyebrow: "text-orange-dark/70",
    title: "text-text-primary",
    line: "border-orange-primary/25",
    glow: "from-orange-primary/18 via-orange-accent/8 to-transparent",
    orb: "bg-orange-primary/14",
  },
  dark: {
    shell:
      "border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05)_0%,rgba(22,31,52,0.92)_52%,rgba(16,24,40,0.98)_100%)]",
    eyebrow: "text-white/60",
    title: "text-white",
    line: "border-white/16",
    glow: "from-amber-primary/22 via-orange-accent/10 to-transparent",
    orb: "bg-white/8",
  },
  orange: {
    shell:
      "border border-white/14 bg-[linear-gradient(160deg,rgba(255,255,255,0.1)_0%,rgba(244,114,23,0.92)_52%,rgba(234,88,12,0.98)_100%)]",
    eyebrow: "text-white/65",
    title: "text-white",
    line: "border-white/18",
    glow: "from-amber-soft/26 via-white/8 to-transparent",
    orb: "bg-white/10",
  },
  amber: {
    shell:
      "border border-orange-dark/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.65)_0%,rgba(254,215,170,0.98)_52%,rgba(255,237,213,0.98)_100%)]",
    eyebrow: "text-orange-dark/72",
    title: "text-text-primary",
    line: "border-orange-dark/18",
    glow: "from-orange-dark/16 via-amber-primary/10 to-transparent",
    orb: "bg-orange-dark/10",
  },
};

type VerticalImageFallbackProps = {
  title: string;
  theme: BusinessVerticalTheme;
};

export function VerticalImageFallback({
  title,
  theme,
}: VerticalImageFallbackProps) {
  const styles = themeMap[theme];

  return (
    <div
      className={cn(
        "relative aspect-[4/3] min-h-[220px] w-full overflow-hidden rounded-[18px] transition-transform duration-700 group-hover:scale-[1.02] lg:min-h-[280px]",
        styles.shell,
      )}
      aria-label={`${title} visual placeholder`}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute -top-[18%] right-[8%] h-[48%] w-[42%] rounded-full blur-3xl",
          styles.glow,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-[10%] top-[14%] h-[44%] w-[44%] rounded-full border",
          styles.line,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute right-[12%] top-[18%] h-[28%] w-[28%] rounded-full",
          styles.orb,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-[16%] bottom-[18%] h-px border-t border-dashed",
          styles.line,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute bottom-[18%] left-[16%] h-[36%] w-[34%] rounded-tr-[999px] border-t border-r",
          styles.line,
        )}
      />

      <div className="absolute inset-x-6 bottom-6">
        <p className={cn("text-[0.72rem] font-semibold uppercase tracking-[0.18em]", styles.eyebrow)}>
          Visual placeholder
        </p>
        <p className={cn("mt-3 max-w-[16rem] font-heading text-[clamp(1.1rem,2vw,1.7rem)] leading-tight tracking-[-0.04em]", styles.title)}>
          {title}
        </p>
      </div>
    </div>
  );
}
