"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Digital planet (icosahedron with wireframe)                       */
/* ------------------------------------------------------------------ */
function DigitalPlanet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { pointer } = useThree();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current || !wireRef.current) return;

    // Mouse-reactive rotation
    targetRot.current.x += (pointer.y * 0.3 - targetRot.current.x) * 0.02;
    targetRot.current.y += (pointer.x * 0.5 - targetRot.current.y) * 0.02;

    meshRef.current.rotation.x += delta * 0.08 + targetRot.current.x * 0.001;
    meshRef.current.rotation.y += delta * 0.12 + targetRot.current.y * 0.001;

    wireRef.current.rotation.copy(meshRef.current.rotation);

    if (glowRef.current) {
      glowRef.current.rotation.x += delta * 0.04;
      glowRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      {/* Main icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#ff7a18"
          emissive="#ff7a18"
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial
          color="#ff944d"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle ring around the planet                                    */
/* ------------------------------------------------------------------ */
function ParticleRing({ count = 300, radius = 3 }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.8;
      const r = radius + spread;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      sizes[i] = Math.random() * 2 + 1;
    }
    return pos;
  }, [count, radius]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        size={0.03}
        color="#ff944d"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Starfield background                                               */
/* ------------------------------------------------------------------ */
function Starfield({ count = 600 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pos[i * 3 + 2] = Math.cos(phi) * r;
    }
    return pos;
  }, [count]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points geometry={geom}>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ff944d" />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#ff7a18" />

      <Starfield />
      <DigitalPlanet />
      <ParticleRing count={400} radius={3} />
      <ParticleRing count={200} radius={4} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */
export default function PlanetScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50, near: 0.1, far: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
