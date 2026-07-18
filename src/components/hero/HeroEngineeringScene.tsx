"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { type HeroSceneMode } from "@/constants/hero";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import { HeroSceneFallback } from "./HeroSceneFallback";

type PointerState = {
  x: number;
  y: number;
};

type HeroEngineeringSceneProps = {
  activeVertical: number | null;
  ctaMode: HeroSceneMode;
};

const HeroEngineeringSceneCanvas = dynamic(
  () =>
    import("./HeroEngineeringSceneCanvas").then(
      (module) => module.HeroEngineeringSceneCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <HeroSceneFallback activeVertical={null} ctaMode={null} className="h-full w-full" />
    ),
  },
);

export function HeroEngineeringScene({
  activeVertical,
  ctaMode,
}: HeroEngineeringSceneProps) {
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });
  const [canUseWebGL, setCanUseWebGL] = useState(false);
  const tabletUp = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const contextAttributes: WebGLContextAttributes = {
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    };

    const context =
      canvas.getContext("webgl2", contextAttributes) ||
      canvas.getContext("webgl", contextAttributes) ||
      canvas.getContext("experimental-webgl", contextAttributes);

    const frame = window.requestAnimationFrame(() => {
      setCanUseWebGL(Boolean(context));
    });

    if (context && "getExtension" in context) {
      context.getExtension("WEBGL_lose_context")?.loseContext?.();
    }

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const useCanvas = tabletUp && !prefersReducedMotion && canUseWebGL;

  return (
    <div
      className="relative h-full w-full"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

        setPointer({ x, y });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      {useCanvas ? (
        <HeroEngineeringSceneCanvas
          activeVertical={activeVertical}
          ctaMode={ctaMode}
          pointer={pointer}
        />
      ) : (
        <HeroSceneFallback
          activeVertical={activeVertical}
          ctaMode={ctaMode}
          className="h-full w-full"
        />
      )}
    </div>
  );
}
