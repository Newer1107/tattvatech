"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Floating hexagonal ring                                            */
/* ------------------------------------------------------------------ */
function HexRing({ radius = 3, color = "#ff7a18", speed = 0.2, y = 0 }) {
  const ref = useRef<THREE.Group>(null);
  const segments = 12;

  const positions = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group ref={ref} position={[0, y, 0]}>
      {positions.map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.1, 0.15, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
      {/* Connecting lines */}
      {positions.map(([x1, z1], i) => {
        const [x2, z2] = positions[(i + 1) % segments];
        const mid: [number, number, number] = [(x1 + x2) / 2, 0, (z1 + z2) / 2];
        const length = Math.sqrt(
          (x2 - x1) ** 2 + (z2 - z1) ** 2
        );
        const angle = Math.atan2(z2 - z1, x2 - x1);
        return (
          <mesh
            key={`line-${i}`}
            position={mid}
            rotation={[0, -angle, 0]}
          >
            <planeGeometry args={[length, 0.02]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scan line overlay                                                  */
/* ------------------------------------------------------------------ */
function ScanLines() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.y += delta * 0.15;
      if (ref.current.position.y > 8) ref.current.position.y = -8;
    }
  });

  return (
    <mesh ref={ref} position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 16]} />
      <meshBasicMaterial
        color="#ff7a18"
        transparent
        opacity={0.03}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Data particles floating up                                         */
/* ------------------------------------------------------------------ */
function DataParticles({ count = 80 }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.random() * 6 - 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      speeds[i] = 0.1 + Math.random() * 0.2;
    }
    return { pos, speeds };
  }, [count]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.pos, 3));
    return g;
  }, [positions]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const p = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      p[i * 3 + 1] += delta * positions.speeds[i];
      if (p[i * 3 + 1] > 4) p[i * 3 + 1] = -3;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geom}>
      <pointsMaterial
        size={0.04}
        color="#ff944d"
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Central glowing core                                               */
/* ------------------------------------------------------------------ */
function GlowingCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });

  return (
    <group>
      {/* Inner solid */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#ff7a18" transparent opacity={0.6} />
      </mesh>
      {/* Glow aura */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color="#ff944d"
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  HUD wireframe ring                                                 */
/* ------------------------------------------------------------------ */
function HUDWireframe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={ref}>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 4.6, 64]} />
        <meshBasicMaterial color="#ff7a18" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Middle ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 3.55, 48]} />
        <meshBasicMaterial color="#ff944d" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Inner scene (everything rendered inside Canvas)                    */
/* ------------------------------------------------------------------ */
function Scene() {
  return (
    <>
      {/* Grid floor */}
      <Grid
        args={[20, 20]}
        cellSize={0.8}
        cellThickness={0.5}
        cellColor="#ff7a18"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#ff944d"
        fadeDistance={12}
        position={[0, -2.5, 0]}
      />

      <HUDWireframe />
      <HexRing radius={3} color="#ff7a18" speed={0.15} y={1.5} />
      <HexRing radius={2} color="#ff944d" speed={-0.1} y={-0.5} />
      <ScanLines />
      <DataParticles count={100} />
      <GlowingCore />

      {/* Ambient camera orbit */}
      <CameraOrbit />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Slow camera orbit                                                  */
/* ------------------------------------------------------------------ */
function CameraOrbit() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={ref}>
      {/* This is a dummy; we control camera via orbit hook below */}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */
export default function CommandCenter() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 45, near: 0.1, far: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
