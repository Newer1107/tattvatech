"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import type { HeroVertical } from "./hero.types";
import { TattvaTechCore } from "./TattvaTechCore";

type HeroThreeSceneProps = {
  activeVertical: number | null;
  exploded: boolean;
  pointer: { x: number; y: number };
  interactionStrength: number;
  reducedMotion: boolean;
  visible: boolean;
  mobile: boolean;
  labelsVisible: boolean;
  verticals: HeroVertical[];
};

export function HeroThreeScene({
  activeVertical,
  exploded,
  pointer,
  interactionStrength,
  reducedMotion,
  visible,
  mobile,
  labelsVisible,
  verticals,
}: HeroThreeSceneProps) {
  const dpr = useMemo<[number, number]>(
    () => (mobile ? [1, 1.25] : [1, 1.75]),
    [mobile],
  );

  return (
    <div className="relative h-full min-h-[320px] w-full">
      <Canvas
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: mobile ? 40 : 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#08111f", 7, 12]} />
        <ambientLight intensity={0.65} color="#c7d2fe" />
        <directionalLight position={[-3.8, 3.6, 4.2]} intensity={2.2} color="#F9E7C7" />
        <pointLight position={[2.6, -0.5, 3.2]} intensity={18} distance={8} color="#F55A0A" />
        <pointLight position={[-2.4, 1.4, 2.6]} intensity={8} distance={9} color="#FFB347" />
        <pointLight position={[0, 0.8, -2.2]} intensity={4.8} distance={7} color="#7DD3FC" />
        <TattvaTechCore
          activeVertical={activeVertical}
          exploded={exploded}
          pointer={pointer}
          interactionStrength={interactionStrength}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {labelsVisible ? (
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
          <div className="absolute left-[8%] top-[24%] text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/54">
            {verticals[0]?.label}
          </div>
          <div className="absolute right-[12%] top-[22%] text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/54">
            {verticals[1]?.label}
          </div>
          <div className="absolute left-[10%] bottom-[24%] text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/54">
            {verticals[2]?.label}
          </div>
          <div className="absolute right-[10%] bottom-[18%] text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/54">
            {verticals[3]?.label}
          </div>
        </div>
      ) : null}
    </div>
  );
}
