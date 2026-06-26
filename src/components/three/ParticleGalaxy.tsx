"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleGalaxyProps {
  count?: number;
  isMobile?: boolean;
}

export default function ParticleGalaxy({ count = 2000, isMobile = false }: ParticleGalaxyProps) {
  const ref = useRef<THREE.Points>(null!);
  const { pointer, viewport } = useThree();
  const particleCount = isMobile ? Math.floor(count * 0.3) : count;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const cA = new THREE.Color("#ff7a18");
    const cB = new THREE.Color("#ff944d");

    for (let i = 0; i < particleCount; i++) {
      // Galaxy disk distribution with z-depth for depth perception
      const radius = 2 + Math.pow(Math.random(), 1.5) * 10;
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.max(0.3, (1 - radius / 12) * 1.8);

      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread;

      // Color gradient from center (#ff944d light orange) to edge (#ff7a18 orange)
      const mix = Math.min(1, radius / 12) * 0.7 + 0.15;
      const c = cA.clone().lerp(cB, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.02 + Math.random() * 0.06;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow base rotation
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.06;

    // Mouse-reactive parallax — gentle follow
    const targetRotX = pointer.y * 0.12;
    const targetRotZ = -pointer.x * 0.08;
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * 0.02;
    ref.current.rotation.z += (targetRotZ - ref.current.rotation.z) * 0.02;
  });

  // Dispose on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
