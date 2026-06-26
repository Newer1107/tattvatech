"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGeometryProps {
  isMobile?: boolean;
}

function FloatingShape({
  geometry,
  position,
  color,
  speed,
  floatAmp,
  rotationSpeed,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  color: string;
  speed: number;
  floatAmp: number;
  rotationSpeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const startY = position[1];
  const startX = position[0];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // Floating drift
    ref.current.position.y = startY + Math.sin(t * speed) * floatAmp;
    ref.current.position.x = startX + Math.sin(t * speed * 0.7) * floatAmp * 0.5;

    // Slow rotation
    ref.current.rotation.x += rotationSpeed * 0.008;
    ref.current.rotation.y += rotationSpeed * 0.015;
    ref.current.rotation.z += rotationSpeed * 0.004;
  });

  // Dispose geometry when shape unmounts
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <mesh ref={ref} position={position} geometry={geometry} frustumCulled={false}>
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.25}
        metalness={0.1}
        roughness={0.3}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

export default function FloatingGeometry({ isMobile = false }: FloatingGeometryProps) {
  const shapes = useMemo(() => {
    return [
      new THREE.IcosahedronGeometry(0.7, 0),
      new THREE.TorusGeometry(0.55, 0.18, 8, 24),
      new THREE.OctahedronGeometry(0.55),
      new THREE.TorusKnotGeometry(0.45, 0.14, 48, 10),
    ];
  }, []);

  if (isMobile) return null;

  return (
    <group>
      <FloatingShape
        geometry={shapes[0]}
        position={[-4, 1.8, -4]}
        color="#ff7a18"
        speed={0.5}
        floatAmp={0.35}
        rotationSpeed={0.25}
      />
      <FloatingShape
        geometry={shapes[1]}
        position={[4, -1.5, -5]}
        color="#ff944d"
        speed={0.7}
        floatAmp={0.4}
        rotationSpeed={0.45}
      />
      <FloatingShape
        geometry={shapes[2]}
        position={[-3, -2.5, -6]}
        color="#ff8c28"
        speed={0.45}
        floatAmp={0.3}
        rotationSpeed={0.35}
      />
      <FloatingShape
        geometry={shapes[3]}
        position={[4.5, 2.2, -7]}
        color="#ffa040"
        speed={0.6}
        floatAmp={0.38}
        rotationSpeed={0.55}
      />
    </group>
  );
}
