import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false | Record<string, boolean | undefined | null>)[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}
