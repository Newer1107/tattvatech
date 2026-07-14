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
        "relative h-full w-full overflow-hidden bg-background",
        className,
      )}
    >
      <div className="absolute inset-0 bg-background" />
      <Image
        src="/placeholders/hero-placeholder.jpg"
        alt="TattvaTech hero placeholder visual"
        fill
        sizes="100vw"
        fetchPriority="high"
        className="object-cover opacity-38"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.62)_40%,rgba(255,255,255,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,168,0,0.08),transparent_30%)]" />
    </div>
  );
}
