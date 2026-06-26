"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { roadmap } from "@/lib/data";

// ─── Scene Content ───────────────────────────────────────────

function Stars() {
  const count = 800;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) p[i] = (Math.random() - 0.5) * 100;
    return p;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function EnergyStream({ scrollProgress }: { scrollProgress: number }) {
  const count = 60;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      p[i * 3] = (Math.random() - 0.5) * 2;
      p[i * 3 + 1] = (Math.random() - 0.5) * 2;
      p[i * 3 + 2] = (t - 0.5) * 20;
    }
    return p;
  }, [count]);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const baseZ = (t - 0.5) * 20;
      const flowOffset = (scrollProgress * 20) % 20;
      let z = baseZ + flowOffset;
      if (z > 10) z -= 20;
      if (z < -10) z += 20;
      positions[i * 3 + 2] = z;
      const wobble = Math.sin(t * Math.PI * 8 + scrollProgress * Math.PI * 4) * 0.8;
      positions[i * 3] = wobble;
      positions[i * 3 + 1] = Math.cos(t * Math.PI * 6 + scrollProgress * Math.PI * 3) * 0.5;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ff7a18"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MilestoneRing({
  position,
  index,
  scrollProgress,
  label,
  period,
}: {
  position: [number, number, number];
  index: number;
  scrollProgress: number;
  label: string;
  period: string;
}) {
  const phaseCount = roadmap.phases.length;
  const segmentSize = 1 / phaseCount;
  const center = segmentSize * index + segmentSize / 2;
  const dist = Math.abs(scrollProgress - center);
  const isActive = dist < segmentSize / 2;
  const activeIntensity = Math.max(0, 1 - dist / (segmentSize / 2));

  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
    ringRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 + index * 0.5) * 0.1;
  });

  const opacity = 0.3 + activeIntensity * 0.7;
  const ringColor = isActive ? "#ff7a18" : "#ff944d";

  return (
    <group position={position}>
      {/* Glow halo */}
      <mesh>
        <ringGeometry args={[0.9, 1.1, 48]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={opacity * 0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.8, 0.04, 16, 48]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={isActive ? 0.6 : 0.15}
          transparent
          opacity={opacity}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Center dot for active */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff7a18" />
        </mesh>
      )}

      {/* Label floating above */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <Text
          position={[0, 1.6, 0]}
          fontSize={0.25}
          color={isActive ? "#ffffff" : "#a0a0a0"}
          anchorX="center"
          anchorY="middle"
          fontWeight={600}
        >
          {period}
        </Text>
        <Text
          position={[0, 2, 0]}
          fontSize={0.15}
          color={isActive ? "#ff944d" : "#737373"}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

function CameraRig({
  scrollProgress,
  children,
}: {
  scrollProgress: number;
  children: React.ReactNode;
}) {
  const curve = useMemo(() => {
    const phases = roadmap.phases;
    const pts: THREE.Vector3[] = phases.map((_, i) => {
      const t = i / (phases.length - 1);
      const x = Math.sin(t * Math.PI * 2) * 4;
      const y = Math.cos(t * Math.PI * 1.5) * 1.5;
      const z = t * 12 - 6;
      return new THREE.Vector3(x, y, z);
    });
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame((state) => {
    const clamped = Math.max(0, Math.min(1, scrollProgress));
    const point = curve.getPoint(clamped);
    const lookAhead = curve.getPoint(Math.min(1, clamped + 0.05));

    state.camera.position.lerp(point, 0.04);
    state.camera.lookAt(lookAhead);
  });

  return <>{children}</>;
}

function PathLine({ scrollProgress }: { scrollProgress: number }) {
  const curve = useMemo(() => {
    const phases = roadmap.phases;
    const pts: THREE.Vector3[] = phases.map((_, i) => {
      const t = i / (phases.length - 1);
      const x = Math.sin(t * Math.PI * 2) * 4;
      const y = Math.cos(t * Math.PI * 1.5) * 1.5;
      const z = t * 12 - 6;
      return new THREE.Vector3(x, y, z);
    });
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const points = useMemo(() => curve.getPoints(100), [curve]);

  const progressIndex = Math.floor(scrollProgress * points.length);
  const filledPoints = useMemo(
    () => points.slice(0, Math.max(2, progressIndex)),
    [points, progressIndex]
  );
  const emptyPoints = useMemo(
    () => points.slice(Math.max(1, progressIndex - 1)),
    [points, progressIndex]
  );

  return (
    <group>
      {/* Filled path */}
      {filledPoints.length > 1 && (
        <mesh>
          <tubeGeometry
            args={[
              (() => {
                const c = new THREE.CatmullRomCurve3(filledPoints);
                return c;
              })(),
              32,
              0.02,
              8,
              false,
            ]}
          />
          <meshBasicMaterial color="#ff7a18" transparent opacity={0.6} />
        </mesh>
      )}
      {/* Empty path */}
      {emptyPoints.length > 1 && (
        <mesh>
          <tubeGeometry
            args={[
              (() => {
                const c = new THREE.CatmullRomCurve3(emptyPoints);
                return c;
              })(),
              32,
              0.015,
              8,
              false,
            ]}
          />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.15}
          />
        </mesh>
      )}
    </group>
  );
}

function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  const phases = roadmap.phases;

  const milestonePositions = useMemo(() => {
    return phases.map((_, i) => {
      const t = i / (phases.length - 1);
      const x = Math.sin(t * Math.PI * 2) * 4;
      const y = Math.cos(t * Math.PI * 1.5) * 1.5;
      const z = t * 12 - 6;
      return [x, y, z] as [number, number, number];
    });
  }, [phases]);

  return (
    <CameraRig scrollProgress={scrollProgress}>
      <Stars />
      <EnergyStream scrollProgress={scrollProgress} />
      <PathLine scrollProgress={scrollProgress} />
      {milestonePositions.map((pos, i) => (
        <MilestoneRing
          key={i}
          position={pos}
          index={i}
          scrollProgress={scrollProgress}
          label={phases[i].title}
          period={phases[i].period}
        />
      ))}
    </CameraRig>
  );
}

// ─── Exported Component ──────────────────────────────────────

interface RoadmapPathProps {
  scrollProgress: number;
  className?: string;
}

export default function RoadmapPath({ scrollProgress, className = "" }: RoadmapPathProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 60, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#ff7a18" />
        <SceneContent scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
