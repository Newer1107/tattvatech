"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type TattvaTechCoreProps = {
  activeVertical: number | null;
  exploded: boolean;
  pointer: { x: number; y: number };
  interactionStrength: number;
  reducedMotion: boolean;
};

const layerColors = [
  "#142033",
  "#B85618",
  "#202936",
  "#F2D39C",
] as const;

const emissiveColors = [
  "#17263B",
  "#F55A0A",
  "#FFB347",
  "#F9E4B7",
] as const;

export function TattvaTechCore({
  activeVertical,
  exploded,
  pointer,
  interactionStrength,
  reducedMotion,
}: TattvaTechCoreProps) {
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const layerRefs = useRef<Array<THREE.Mesh | null>>([]);

  const layerGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.45);
    shape.bezierCurveTo(0.42, -1.1, 0.92, -0.28, 0.62, 0.5);
    shape.bezierCurveTo(0.48, 1.04, 0.16, 1.48, 0, 1.76);
    shape.bezierCurveTo(-0.16, 1.48, -0.48, 1.04, -0.62, 0.5);
    shape.bezierCurveTo(-0.92, -0.28, -0.42, -1.1, 0, -1.45);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.06,
      bevelThickness: 0.05,
      curveSegments: 28,
      steps: 1,
    });
  }, []);

  useFrame((_, delta) => {
    const root = rootRef.current;
    const core = coreRef.current;
    const ring = ringRef.current;

    if (!root || !core || !ring) {
      return;
    }

    const targetX = reducedMotion ? 0.08 : pointer.y * -0.09;
    const targetY = reducedMotion ? -0.32 : -0.32 + pointer.x * 0.16;
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, targetX, 4.5, delta);
    root.rotation.y = THREE.MathUtils.damp(root.rotation.y, targetY, 4.5, delta);
    root.rotation.z = THREE.MathUtils.damp(
      root.rotation.z,
      exploded ? 0.08 : 0,
      4.5,
      delta,
    );

    core.scale.y = THREE.MathUtils.damp(
      core.scale.y,
      exploded ? 1.18 : 1 + interactionStrength * 0.06,
      4.5,
      delta,
    );

    ring.rotation.z += delta * (reducedMotion ? 0 : 0.12);
    ring.rotation.x = THREE.MathUtils.damp(
      ring.rotation.x,
      exploded ? 1.04 : 0.94,
      3.8,
      delta,
    );

    layerRefs.current.forEach((layer, index) => {
      if (!layer) {
        return;
      }

      const angle = -0.9 + index * 0.58;
      const separationBase = exploded ? 0.48 : 0.22 + interactionStrength * 0.12;
      const focusBoost =
        activeVertical === null ? 0 : activeVertical === index ? 0.16 : -0.04;
      const radius = 0.36 + separationBase + focusBoost;
      const targetXPos = Math.sin(angle) * radius;
      const targetZPos = Math.cos(angle) * radius * 0.82 - 0.2;
      const targetYPos = (index - 1.5) * 0.15;

      layer.position.x = THREE.MathUtils.damp(layer.position.x, targetXPos, 5, delta);
      layer.position.y = THREE.MathUtils.damp(layer.position.y, targetYPos, 5, delta);
      layer.position.z = THREE.MathUtils.damp(layer.position.z, targetZPos, 5, delta);
      layer.rotation.y = THREE.MathUtils.damp(
        layer.rotation.y,
        angle * 0.7 + (exploded ? 0.28 : 0),
        5,
        delta,
      );
      layer.rotation.z = THREE.MathUtils.damp(
        layer.rotation.z,
        angle * 0.18,
        5,
        delta,
      );

      const targetScale =
        activeVertical === null ? 1 : activeVertical === index ? 1.08 : 0.94;
      layer.scale.x = THREE.MathUtils.damp(layer.scale.x, targetScale, 5, delta);
      layer.scale.y = THREE.MathUtils.damp(layer.scale.y, targetScale, 5, delta);
      layer.scale.z = THREE.MathUtils.damp(layer.scale.z, targetScale, 5, delta);

      const material = layer.material as THREE.MeshPhysicalMaterial;
      material.emissiveIntensity = THREE.MathUtils.damp(
        material.emissiveIntensity,
        activeVertical === index ? 0.34 : activeVertical === null ? 0.18 : 0.08,
        5,
        delta,
      );
      material.opacity = THREE.MathUtils.damp(
        material.opacity,
        activeVertical === null ? 1 : activeVertical === index ? 1 : 0.72,
        5,
        delta,
      );
    });
  });

  return (
    <group ref={rootRef} position={[0.15, -0.05, 0]}>
      <mesh ref={coreRef} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.12, 0.22, 2.8, 24, 1, true]} />
        <meshStandardMaterial
          color="#FFB347"
          emissive="#F55A0A"
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.32}
        />
      </mesh>

      <group ref={ringRef}>
        <mesh rotation={[1.02, 0.1, 0.26]}>
          <torusGeometry args={[1.9, 0.015, 20, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[0.74, 0.86, -0.12]}>
          <torusGeometry args={[1.45, 0.012, 20, 120]} />
          <meshBasicMaterial color="#F55A0A" transparent opacity={0.24} />
        </mesh>
      </group>

      {layerColors.map((color, index) => (
        <mesh
          key={color}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
          geometry={layerGeometry}
        >
          <meshPhysicalMaterial
            color={color}
            emissive={emissiveColors[index]}
            emissiveIntensity={0.18}
            roughness={index === 1 ? 0.28 : index === 3 ? 0.24 : 0.44}
            metalness={index === 3 ? 0.12 : 0.68}
            reflectivity={0.42}
            transmission={index === 3 ? 0.14 : 0}
            thickness={index === 3 ? 0.48 : 0}
            transparent
            opacity={1}
          />
          <Edges color="rgba(255,255,255,0.22)" threshold={12} />
        </mesh>
      ))}
    </group>
  );
}
