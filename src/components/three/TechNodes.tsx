"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { expertise } from "@/lib/data";

const ORANGE = "#ff7a18";
const WHITE = "#ffffff";
const NODE_COUNT = 12;

interface NodeData {
  pos: THREE.Vector3;
  color: string;
  scale: number;
  speed: number;
  phase: number;
  label: string;
}

function generateSpiralPositions(count: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 6;
    const y = (t - 0.5) * radius * 1.6;
    const r = radius * (0.5 + t * 0.5);
    positions.push(
      new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r)
    );
  }
  return positions;
}

function NodeSphere({
  node,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  node: NodeData;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hoveredIndex === index;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * node.speed + node.phase) * 0.15;
    const targetScale = isHovered ? node.scale * 2.2 : node.scale * pulse;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
  });

  const handlePointerOver = useCallback(
    (e: any) => {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      setHoveredIndex(index);
    },
    [index, setHoveredIndex]
  );

  const handlePointerOut = useCallback(
    (e: any) => {
      e.stopPropagation();
      document.body.style.cursor = "default";
      setHoveredIndex(null);
    },
    [setHoveredIndex]
  );

  return (
    <group>
      <mesh
        ref={meshRef}
        position={node.pos}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.9} />
      </mesh>
      {/* Glow sprite */}
      <sprite position={[node.pos.x, node.pos.y, node.pos.z]}>
        <spriteMaterial
          map={useMemo(() => {
            const c = document.createElement("canvas");
            c.width = 64;
            c.height = 64;
            const ctx = c.getContext("2d")!;
            const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            grad.addColorStop(0, node.color);
            grad.addColorStop(0.3, node.color + "40");
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(c);
          }, [node.color])}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={isHovered ? 0.6 : 0.3}
        />
      </sprite>
      {/* Label */}
      {isHovered && (
        <sprite position={[node.pos.x, node.pos.y + 1.0, node.pos.z]} scale={[2, 1, 1]}>
          <spriteMaterial
            map={useMemo(() => {
              const c = document.createElement("canvas");
              c.width = 256;
              c.height = 64;
              const ctx = c.getContext("2d")!;
              ctx.clearRect(0, 0, 256, 64);
              ctx.font = "bold 18px Inter, sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#ffffff";
              ctx.shadowColor = "rgba(0,0,0,0.8)";
              ctx.shadowBlur = 8;
              ctx.fillText(node.label, 128, 32);
              return new THREE.CanvasTexture(c);
            }, [node.label])}
            transparent
            depthWrite={false}
            opacity={0.95}
          />
        </sprite>
      )}
    </group>
  );
}

function ConnectionLines({ nodes }: { nodes: NodeData[] }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const positions = useMemo(() => {
    const pairs: number[] = [];
    const threshold = 4.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < threshold) {
          pairs.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
          pairs.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
        }
      }
    }
    return new Float32Array(pairs);
  }, [nodes]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.12 + Math.sin(clock.elapsedTime * 0.3) * 0.04;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={ORANGE}
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function OrbitCamera() {
  const { camera } = useThree();
  const initialPos = useMemo(() => camera.position.clone(), [camera]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.08;
    const radius = 12;
    camera.position.x = initialPos.x + Math.sin(t) * radius * 0.15;
    camera.position.z = initialPos.z + Math.cos(t) * radius * 0.15;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const basePositions = useMemo(() => generateSpiralPositions(NODE_COUNT, 6), []);

  const nodes: NodeData[] = useMemo(
    () =>
      basePositions.map((pos, i) => ({
        pos,
        color: i % 2 === 0 ? ORANGE : WHITE,
        scale: 0.6 + Math.random() * 0.4,
        speed: 0.6 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        label: expertise[i]?.title ?? `Node ${i + 1}`,
      })),
    [basePositions]
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <ConnectionLines nodes={nodes} />
      {nodes.map((node, i) => (
        <NodeSphere
          key={i}
          node={node}
          index={i}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
      <OrbitCamera />
    </>
  );
}

export default function TechNodes() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        style={{ pointerEvents: "auto" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
