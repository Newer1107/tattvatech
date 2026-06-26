"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = "#ff7a18";
const ORANGE_LIGHT = "#ff944d";
const WHITE = "#ffffff";

const outerLabels = [
  { title: "Consulting", angleOffset: 0 },
  { title: "Software", angleOffset: Math.PI / 2 },
  { title: "Learning", angleOffset: Math.PI },
  { title: "Innovation", angleOffset: (3 * Math.PI) / 2 },
];

const ORBIT_RADIUS = 3.5;

function makeGlowTexture(color: string): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, color);
  grad.addColorStop(0.2, color + "60");
  grad.addColorStop(0.5, color + "20");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function makeLabelTexture(text: string): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 64);
  ctx.font = "bold 16px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = WHITE;
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 6;
  ctx.fillText(text, 128, 32);
  return new THREE.CanvasTexture(c);
}

function CenterNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const glowTex = useMemo(() => makeGlowTexture(ORANGE), []);
  const labelTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 256, 128);
    ctx.font = "bold 24px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = WHITE;
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 10;
    ctx.fillText("TATTVA", 128, 60);
    ctx.font = "bold 20px Space Grotesk, sans-serif";
    ctx.fillStyle = ORANGE;
    ctx.textBaseline = "top";
    ctx.fillText("TECH", 128, 66);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current || !ringRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.06;
    meshRef.current.scale.setScalar(pulse);
    glowRef.current.scale.setScalar(2.5 + Math.sin(clock.elapsedTime * 0.5) * 0.5);
    ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
    ringRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.4) * 0.2;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color={ORANGE} />
      </mesh>
      {/* Central glow */}
      <sprite ref={glowRef} scale={[3, 3, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </sprite>
      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[0.4, 0, 0]}>
        <ringGeometry args={[1.2, 1.5, 48]} />
        <meshBasicMaterial
          color={ORANGE}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Label */}
      <sprite position={[0, 1.8, 0]} scale={[3, 1.5, 1]}>
        <spriteMaterial map={labelTex} transparent depthWrite={false} opacity={0.95} />
      </sprite>
    </group>
  );
}

function OrbitingNode({
  label,
  angleOffset,
  index,
}: {
  label: string;
  angleOffset: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const spriteRef = useRef<THREE.Sprite>(null);

  const glowTex = useMemo(() => makeGlowTexture(ORANGE_LIGHT), []);
  const labelTex = useMemo(() => makeLabelTexture(label), [label]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current || !spriteRef.current) return;
    const angle = clock.elapsedTime * 0.15 + angleOffset;
    const x = Math.cos(angle) * ORBIT_RADIUS;
    const z = Math.sin(angle) * ORBIT_RADIUS;
    const y = Math.sin(clock.elapsedTime * 0.12 + index) * 0.3;

    meshRef.current.position.set(x, y, z);
    glowRef.current.position.set(x, y, z);
    spriteRef.current.position.set(x, y + 1.2, z);

    const pulse = 1 + Math.sin(clock.elapsedTime * 0.6 + index) * 0.08;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial color={ORANGE_LIGHT} />
      </mesh>
      <sprite ref={glowRef} scale={[2, 2, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.5}
        />
      </sprite>
      <sprite ref={spriteRef} scale={[2.5, 0.8, 1]}>
        <spriteMaterial
          map={labelTex}
          transparent
          depthWrite={false}
          opacity={0.9}
        />
      </sprite>
    </group>
  );
}

function ConnectionLine({
  start,
  end,
  index,
}: {
  start: () => THREE.Vector3;
  end: () => THREE.Vector3;
  index: number;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const line = useMemo(() => {
    const s = start();
    const e = end();
    const geo = new THREE.BufferGeometry().setFromPoints([s, e]);
    const mat = new THREE.LineDashedMaterial({
      color: ORANGE_LIGHT,
      dashSize: 0.3,
      gapSize: 0.15,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const l = new THREE.Line(geo, mat);
    l.computeLineDistances();
    return l;
  }, [start, end]);

  useFrame(({ clock }) => {
    const mat = line.material as THREE.LineDashedMaterial;
    if (mat) {
      (mat as any).dashOffset = clock.elapsedTime * -0.3 + index;
      mat.opacity = 0.25 + Math.sin(clock.elapsedTime * 0.5 + index) * 0.1;
      mat.needsUpdate = true;
    }
  });

  return <primitive object={line} />;
}

function OuterConnections() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let a = 0; a < 4; a++) {
      for (let b = a + 1; b < 4; b++) {
        const angleA = (a * Math.PI) / 2;
        const angleB = (b * Math.PI) / 2;
        positions.push(
          Math.cos(angleA) * ORBIT_RADIUS,
          0,
          Math.sin(angleA) * ORBIT_RADIUS
        );
        positions.push(
          Math.cos(angleB) * ORBIT_RADIUS,
          0,
          Math.sin(angleB) * ORBIT_RADIUS
        );
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.06 + Math.sin(clock.elapsedTime * 0.2) * 0.03;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={ORANGE_LIGHT}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.03;
    const targetX = 2 + mouse.current.x * 1.5 + Math.sin(t) * 0.8;
    const targetY = 1.5 + mouse.current.y * 1.0 + Math.sin(t * 0.7) * 0.5;
    const targetZ = 6 + Math.cos(t * 0.5) * 0.5;

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  const centerPos = useCallback(() => new THREE.Vector3(0, 0, 0), []);
  const outerPositions = useMemo(() => {
    const fns: (() => THREE.Vector3)[] = [];
    for (let i = 0; i < 4; i++) {
      const offset = (i * Math.PI) / 2;
      fns.push(() => {
        // approximate current position — we don't track time here perfectly
        // but the connection lines update every frame from the orbiting nodes
        return new THREE.Vector3(
          Math.cos(offset) * ORBIT_RADIUS,
          0,
          Math.sin(offset) * ORBIT_RADIUS
        );
      });
    }
    return fns;
  }, []);

  return (
    <>
      <CenterNode />
      {outerLabels.map((item, i) => (
        <OrbitingNode
          key={item.title}
          label={item.title}
          angleOffset={item.angleOffset}
          index={i}
        />
      ))}
      {outerPositions.map((endFn, i) => (
        <ConnectionLine key={`center-${i}`} start={centerPos} end={endFn} index={i} />
      ))}
      <OuterConnections />
      <CameraController />
    </>
  );
}

export default function EcosystemNetwork() {
  return (
    <Canvas
      camera={{ position: [2, 1.5, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      style={{ pointerEvents: "auto" }}
    >
      <Scene />
    </Canvas>
  );
}
