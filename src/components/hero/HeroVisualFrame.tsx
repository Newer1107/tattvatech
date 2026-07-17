import Image from "next/image";
import { cn } from "@/lib/utils";

export function HeroVisualFrame({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#0d1117]",
        className,
      )}
    >
      <Image
        src="/placeholders/hero-placeholder.jpg"
        alt="TattvaTech hero placeholder visual"
        fill
        sizes="100vw"
        fetchPriority="high"
        className="object-cover object-center opacity-62"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,18,0.1)_0%,rgba(8,12,18,0.28)_38%,rgba(8,12,18,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_28%,rgba(255,168,0,0.22),transparent_24%),radial-gradient(circle_at_76%_22%,rgba(245,90,10,0.16),transparent_18%),radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.18),transparent_42%)]" />
    </div>
  );
}
