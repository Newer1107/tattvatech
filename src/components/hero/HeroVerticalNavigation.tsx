import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HeroVertical } from "./hero.types";

type HeroVerticalNavigationProps = {
  items: HeroVertical[];
  activeIndex: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
};

export function HeroVerticalNavigation({
  items,
  activeIndex,
  onHover,
  onSelect,
}: HeroVerticalNavigationProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-5 lg:grid-cols-4 lg:gap-x-6">
      {items.map((item, index) => (
        <Link
          key={item.id}
          data-hero-strip-item
          href={item.href}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(index)}
          onBlur={() => onHover(null)}
          onClick={() => onSelect(index)}
          className={cn(
            "group relative rounded-[16px] px-0 py-0 text-left transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary",
            activeIndex !== null && activeIndex !== index ? "opacity-55" : "opacity-100",
          )}
        >
          <span
            className={cn(
              "absolute left-0 top-0 h-px w-full origin-left bg-orange-primary transition-transform duration-300",
              activeIndex === index ? "scale-x-100" : "scale-x-0",
            )}
          />
          <span className="block pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
            {item.number}
          </span>
          <span className="mt-2 block font-heading text-[1rem] leading-[1.05] tracking-[-0.03em] text-white">
            {item.label}
          </span>
          <span className="mt-2 block max-w-[18ch] text-[0.84rem] leading-5 text-white/66">
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
