"use client";

import { ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { heroVerticals, type HeroSceneMode } from "@/constants/hero";

type PointerState = {
  x: number;
  y: number;
};

type HeroEngineeringSceneCanvasProps = {
  activeVertical: number | null;
  ctaMode: HeroSceneMode;
  pointer: PointerState;
};

const podPositions: Array<[number, number, number]> = [
  [-2.8, 0, 0],
  [2.8, 0, 0],
  [0, 2.8, 0],
  [0, -2.8, 0],
];

const connectorDefinitions = [
  { position: [-1.45, 0, 0], scale: [1.8, 0.12, 0.18] },
  { position: [1.45, 0, 0], scale: [1.8, 0.12, 0.18] },
  { position: [0, 1.45, 0], scale: [0.18, 1.8, 0.12] },
  { position: [0, -1.45, 0], scale: [0.18, 1.8, 0.12] },
] as const;

function EngineeringAssembly({
  activeVertical,
  ctaMode,
  pointer,
}: HeroEngineeringSceneCanvasProps) {
  const rootRef = useRef<THREE.Group | null>(null);
  const outerRingRef = useRef<THREE.Mesh | null>(null);
  const innerRingRef = useRef<THREE.Mesh | null>(null);
  const pulseRef = useRef<THREE.Mesh | null>(null);
  const podRefs = useRef<Array<THREE.Group | null>>([]);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const outerRing = outerRingRef.current;
    const innerRing = innerRingRef.current;
    const pulse = pulseRef.current;

    if (root) {
      const targetX = pointer.y * 0.32 - 0.18;
      const targetY = pointer.x * 0.46 + (activeVertical ?? 0) * 0.04;
      const pulseBoost = ctaMode ? 0.08 : 0;

      root.rotation.x = THREE.MathUtils.lerp(
        root.rotation.x,
        targetX + Math.sin(state.clock.elapsedTime * 0.45) * (0.035 + pulseBoost),
        0.08,
      );
      root.rotation.y = THREE.MathUtils.lerp(
        root.rotation.y,
        targetY + Math.cos(state.clock.elapsedTime * 0.35) * 0.04,
        0.08,
      );
      root.position.y = THREE.MathUtils.lerp(
        root.position.y,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08,
        0.08,
      );
    }

    if (outerRing) {
      outerRing.rotation.z += delta * 0.2;
    }

    if (innerRing) {
      innerRing.rotation.z -= delta * 0.28;
    }

    if (pulse) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.05 + (ctaMode ? 0.06 : 0);
      pulse.scale.setScalar(scale);
    }

    podRefs.current.forEach((pod, index) => {
      if (!pod) {
        return;
      }

      const isActive = activeVertical === index;
      const targetScale = isActive ? 1.12 : activeVertical === null ? 1 : 0.92;
      const activeLift = isActive ? 0.12 : 0;

      pod.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      pod.position.y = THREE.MathUtils.lerp(
        pod.position.y,
        podPositions[index]?.[1] + activeLift,
        0.08,
      );
      pod.rotation.z = THREE.MathUtils.lerp(
        pod.rotation.z,
        isActive ? 0.16 : Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.03,
        0.08,
      );
    });
  });

  return (
    <group ref={rootRef} position={[0, 0.15, 0]}>
      <mesh ref={outerRingRef} rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[3.7, 0.04, 20, 120]} />
        <meshStandardMaterial color="#475467" transparent opacity={0.34} />
      </mesh>

      <mesh ref={innerRingRef} rotation={[0.6, 0.7, 0.2]}>
        <torusGeometry args={[2.45, 0.06, 18, 100]} />
        <meshStandardMaterial color="#F55A0A" transparent opacity={0.45} />
      </mesh>

      {connectorDefinitions.map((connector, index) => (
        <mesh
          key={`connector-${index}`}
          position={connector.position as [number, number, number]}
          scale={connector.scale as [number, number, number]}
        >
          <boxGeometry />
          <meshStandardMaterial color="#667085" transparent opacity={0.62} />
        </mesh>
      ))}

      <mesh ref={pulseRef} position={[0, 0, -0.25]}>
        <planeGeometry args={[6.8, 6.8]} />
        <meshBasicMaterial color="#F55A0A" transparent opacity={0.06} />
      </mesh>

      <RoundedBox args={[2.2, 2.2, 2.2]} radius={0.24} smoothness={5}>
        <meshPhysicalMaterial
          color="#101828"
          metalness={0.52}
          roughness={0.3}
          clearcoat={0.7}
          clearcoatRoughness={0.28}
        />
      </RoundedBox>

      <RoundedBox args={[1.36, 1.36, 1.36]} radius={0.18} smoothness={5}>
        <meshPhysicalMaterial
          color={ctaMode ? "#F55A0A" : "#1D2939"}
          emissive={ctaMode ? "#F55A0A" : "#000000"}
          emissiveIntensity={ctaMode ? 0.38 : 0.08}
          metalness={0.36}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </RoundedBox>

      <mesh position={[0, 0, 1.22]}>
        <planeGeometry args={[1.02, 1.02]} />
        <meshBasicMaterial color="#F7F5EF" transparent opacity={0.1} />
      </mesh>

      {heroVerticals.map((item, index) => {
        const isActive = activeVertical === index;
        const opacity = activeVertical === null || isActive ? 0.92 : 0.42;

        return (
          <group
            key={item.id}
            ref={(node) => {
              podRefs.current[index] = node;
            }}
            position={podPositions[index]}
          >
            <RoundedBox args={[1.08, 1.08, 0.78]} radius={0.18} smoothness={5}>
              <meshPhysicalMaterial
                color={isActive ? "#F55A0A" : item.sceneTint}
                emissive={isActive ? "#F55A0A" : item.sceneTint}
                emissiveIntensity={isActive ? 0.42 : 0.1}
                metalness={0.22}
                roughness={0.28}
                transparent
                opacity={opacity}
              />
            </RoundedBox>

            <mesh position={[0, 0, -0.38]}>
              <boxGeometry args={[1.38, 1.38, 0.06]} />
              <meshStandardMaterial color="#F7F5EF" transparent opacity={0.24} />
            </mesh>

            <mesh position={[0, 0, 0.44]}>
              <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
              <meshStandardMaterial color="#F7F5EF" transparent opacity={0.72} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function HeroEngineeringSceneCanvas(
  props: HeroEngineeringSceneCanvasProps,
) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 34, position: [0, 0.4, 10.2] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#f7f5ef"]} />
      <fog attach="fog" args={["#f7f5ef", 10, 18]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 6]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-6, -4, 4]} intensity={0.55} color="#ffd27a" />
      <pointLight position={[0, 0, 6]} intensity={1.2} color="#f55a0a" />
      <EngineeringAssembly {...props} />
      <ContactShadows
        position={[0, -3.2, 0]}
        opacity={0.28}
        scale={12}
        blur={2.8}
        far={6}
      />
      <Environment preset="studio" />
    </Canvas>
  );
}
