"use client";

import type { SVGAttributes } from "react";

const base: Partial<SVGAttributes<SVGSVGElement>> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

const shapes: Record<string, React.ReactNode> = {
  circle: <circle cx="12" cy="12" r="8" />,
  square: <rect x="4" y="4" width="16" height="16" rx="3" />,
  diamond: <path d="M12 2 22 12 12 22 2 12z" />,
  hexagon: <path d="M12 2l9 5v10l-9 5-9-5V7z" />,
  cross: <path d="M12 5v14M5 12h14" />,
  bars: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V6" />
      <path d="M16 20v-8" />
      <path d="M22 20V2" />
    </>
  ),
  brackets: (
    <>
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
    </>
  ),
  cycle: <path d="M21 12a9 9 0 1 1-6.219-8.56" />,
  bulb: (
    <>
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 5.5V16h8v-1.5c1.5-1 3-3 3-5.5a7 7 0 0 0-7-7z" />
      <path d="M9 19h6" />
    </>
  ),
  star: <path d="M12 2l3 7h7l-5.5 4.5L19 21l-7-4.5L5 21l2.5-7.5L2 9h7z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h12" />
    </>
  ),
  desktop: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
  flask: (
    <>
      <path d="M10 2v6l-6 14h10l-6-14V2" />
      <path d="M7 2h6" />
    </>
  ),
  graduation: <path d="M12 3L1 9l11 6 11-6-11-6z" />,
  handshake: (
    <>
      <path d="M16 8l-4-4-4 4" />
      <path d="M16 8l2 2-6 6-6-6 2-2" />
      <path d="M16 8l4 4-6 6" />
    </>
  ),
  zap: <path d="M13 2L3 14h7l-1 8 10-12h-7z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <ellipse cx="12" cy="12" rx="4" ry="8" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 22h8" />
      <path d="M12 18v4" />
      <path d="M2 18h20" />
    </>
  ),
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M3 9h2" />
      <path d="M3 13h2" />
      <path d="M19 9h2" />
      <path d="M19 13h2" />
      <path d="M9 3v2" />
      <path d="M13 3v2" />
      <path d="M9 19v2" />
      <path d="M13 19v2" />
    </>
  ),
  activity: (
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </>
  ),
  chart: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  flag: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  map: (
    <>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </>
  ),
};

export function Icon({
  name,
  className = "w-5 h-5 text-orange",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg className={className} {...base} style={style}>
      {shapes[name] ?? shapes.circle}
    </svg>
  );
}
