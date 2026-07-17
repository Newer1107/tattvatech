"use client";

import Image from "next/image";
import { useState } from "react";
import type { BusinessVerticalTheme } from "@/types";
import { VerticalImageFallback } from "@/components/ui/VerticalImageFallback";

type VerticalImageProps = {
  src: string;
  alt: string;
  title: string;
  theme: BusinessVerticalTheme;
  priority?: boolean;
};

export function VerticalImage({
  src,
  alt,
  title,
  theme,
  priority = false,
}: VerticalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <VerticalImageFallback title={title} theme={theme} />;
  }

  return (
    <div className="relative aspect-[4/3] min-h-[220px] w-full overflow-hidden rounded-[18px] border border-white/10 lg:min-h-[280px]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,40,0.02)_0%,rgba(16,24,40,0.28)_100%)]" />
    </div>
  );
}
