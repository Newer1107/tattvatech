"use client";

import { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";

interface SceneProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  /** Disable pointer events on the canvas so clicks pass through to content */
  pointerEvents?: "none" | "auto";
}

export default function Scene({
  children,
  className = "",
  cameraPosition = [0, 0, 6],
  cameraFov = 60,
  pointerEvents = "none",
}: SceneProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
