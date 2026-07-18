"use client";

import { heroVerticals, type HeroSceneMode } from "@/constants/hero";
import { cn } from "@/lib/utils";

type HeroSceneFallbackProps = {
  activeVertical: number | null;
  ctaMode: HeroSceneMode;
  className?: string;
};

export function HeroSceneFallback({
  activeVertical,
  ctaMode,
  className,
}: HeroSceneFallbackProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-[28px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(247,245,239,0.96)_100%)] shadow-[0_28px_80px_rgba(16,24,40,0.12)]",
        className,
      )}
    >
      <div className="absolute inset-[12%] rounded-[32px] border border-[rgba(16,24,40,0.08)]" />
      <div className="absolute inset-x-[16%] top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(16,24,40,0),rgba(16,24,40,0.14),rgba(16,24,40,0))]" />
      <div className="absolute left-1/2 top-[16%] h-[68%] w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(16,24,40,0),rgba(16,24,40,0.14),rgba(16,24,40,0))]" />

      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-[rgba(16,24,40,0.08)] bg-[#101828] shadow-[0_18px_50px_rgba(16,24,40,0.28)] transition-transform duration-500",
          ctaMode && "scale-[1.03]",
        )}
      >
        <div className="absolute inset-[18px] rounded-[26px] border border-[rgba(255,255,255,0.12)]" />
        <div className="absolute inset-[34px] rounded-[20px] bg-[linear-gradient(135deg,rgba(245,90,10,0.86),rgba(255,168,0,0.58))]" />
      </div>

      {[
        "left-[17%] top-1/2 h-[88px] w-[72px] -translate-y-1/2",
        "right-[17%] top-1/2 h-[88px] w-[72px] -translate-y-1/2",
        "left-1/2 top-[18%] h-[72px] w-[88px] -translate-x-1/2",
        "left-1/2 bottom-[18%] h-[72px] w-[88px] -translate-x-1/2",
      ].map((placement, index) => {
        const isActive = activeVertical === index;

        return (
          <div
            key={heroVerticals[index]?.id}
            className={cn(
              "absolute rounded-[22px] border border-[rgba(16,24,40,0.08)] bg-white/84 shadow-[0_12px_30px_rgba(16,24,40,0.08)] transition-all duration-300",
              placement,
              activeVertical !== null && !isActive && "opacity-45",
              isActive && "border-orange-primary shadow-[0_12px_34px_rgba(245,90,10,0.18)]",
            )}
          >
            <div
              className="absolute inset-[10px] rounded-[16px]"
              style={{
                background: `linear-gradient(135deg, ${heroVerticals[index]?.sceneTint}55, rgba(16,24,40,0.08))`,
              }}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-5 left-5 flex flex-wrap gap-2">
        {heroVerticals.map((item, index) => {
          const isActive = activeVertical === index;

          return (
            <span
              key={item.id}
              className={cn(
                "rounded-full border border-[rgba(16,24,40,0.08)] bg-white/72 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[rgba(16,24,40,0.62)] transition-colors duration-300",
                isActive && "border-orange-primary text-orange-primary",
              )}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
