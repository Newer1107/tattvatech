import { cn } from "@/lib/utils";

type HeroThreeFallbackProps = {
  activeVertical: number | null;
  exploded: boolean;
  className?: string;
};

const layers = [
  "bg-[#142033] border-white/10",
  "bg-[#B44713] border-orange-300/20",
  "bg-[#222B38] border-amber-200/10",
  "bg-[#F4D49A]/90 border-[#F6E6C5]/30",
] as const;

export function HeroThreeFallback({
  activeVertical,
  exploded,
  className,
}: HeroThreeFallbackProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),rgba(255,255,255,0)_60%)]",
        className,
      )}
    >
      <div className="absolute inset-[12%] rounded-full border border-white/8" />
      <div className="absolute inset-[18%] rounded-full border border-orange-primary/12" />
      <div className="absolute h-[72%] w-[2px] bg-[linear-gradient(180deg,rgba(255,196,107,0),rgba(255,196,107,0.92),rgba(245,90,10,0))]" />
      <div className="relative h-[320px] w-[320px] scale-[0.9] sm:h-[420px] sm:w-[420px]">
        {layers.map((layer, index) => {
          const xOffset =
            activeVertical === null
              ? exploded
                ? [-18, 14, -10, 16][index]
                : [-10, 8, -6, 10][index]
              : activeVertical === index
                ? [-22, 20, -14, 22][index]
                : [-8, 6, -4, 6][index];
          const yOffset = exploded ? [-34, -8, 18, 42][index] : [-22, -2, 14, 30][index];

          return (
            <div
              key={layer}
              className={cn(
                "absolute left-1/2 top-1/2 h-[210px] w-[86px] -translate-x-1/2 -translate-y-1/2 rounded-[999px] border shadow-[0_24px_64px_rgba(8,17,31,0.24)] transition-all duration-500",
                layer,
                activeVertical === index ? "opacity-100" : activeVertical === null ? "opacity-90" : "opacity-55",
              )}
              style={{
                transform: `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) rotate(${[-28, -10, 12, 28][index]}deg) scale(${activeVertical === index ? 1.04 : 1})`,
                clipPath:
                  "polygon(50% 0%, 100% 18%, 78% 100%, 22% 100%, 0% 18%)",
              }}
            />
          );
        })}
        <div className="absolute left-1/2 top-1/2 h-[168px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#FFC56B_0%,#F55A0A_48%,#101828_100%)] shadow-[0_0_42px_rgba(245,90,10,0.24)]" />
      </div>
    </div>
  );
}
