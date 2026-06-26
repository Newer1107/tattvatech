"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkProps {
  isMobile?: boolean;
}

export default function NeuralNetwork({ isMobile = false }: NeuralNetworkProps) {
  const nodeRef = useRef<THREE.InstancedMesh>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { pointer } = useThree();
  const nodeCount = isMobile ? 15 : 50;

  const { nodePositions, lineGeometry } = useMemo(() => {
    const positions: [number, number, number][] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }

    // Build edges — connect each node to its nearest neighbors
    const edges: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const connections = 2 + Math.floor(Math.random() * 2);
      const dists = positions
        .map((pos, j) => ({
          j,
          dist: Math.sqrt(
            (positions[i][0] - pos[0]) ** 2 +
              (positions[i][1] - pos[1]) ** 2 +
              (positions[i][2] - pos[2]) ** 2,
          ),
        }))
        .filter((d) => d.dist > 0)
        .sort((a, b) => a.dist - b.dist);

      for (let k = 0; k < Math.min(connections, dists.length); k++) {
        if (i < dists[k].j) {
          edges.push([i, dists[k].j]);
        }
      }
    }

    // Build line vertices
    const lineVerts: number[] = [];
    edges.forEach(([i, j]) => {
      lineVerts.push(...positions[i], ...positions[j]);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVerts), 3),
    );

    return { nodePositions: positions, lineGeometry: geo };
  }, [nodeCount]);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime;

    // Update node instances
    nodePositions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);

      // Pulse — central-ish nodes pulse more
      const distFromCenter = Math.sqrt(
        pos[0] * pos[0] + pos[1] * pos[1] + pos[2] * pos[2],
      );
      const isCentral = distFromCenter < 2;
      const pulse = 0.7 + 0.3 * Math.sin(t * 1.2 + i * 0.7);
      const scale = isCentral
        ? 0.12 + 0.05 * Math.sin(t * 2 + i)
        : 0.06 * pulse;

      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      nodeRef.current.setMatrixAt(i, dummy.matrix);
    });
    nodeRef.current.instanceMatrix.needsUpdate = true;

    // Traveling dashes
    if (lineRef.current) {
      (lineRef.current.material as unknown as { dashOffset: number }).dashOffset = -t * 0.15;
    }

    // Mouse parallax on whole network
    if (lineRef.current) {
      lineRef.current.rotation.x += (pointer.y * 0.05 - lineRef.current.rotation.x) * 0.01;
      lineRef.current.rotation.y += (pointer.x * 0.05 - lineRef.current.rotation.y) * 0.01;
    }
  });

  useEffect(() => {
    return () => {
      lineGeometry.dispose();
    };
  }, [lineGeometry]);

  if (isMobile) return null;

  return (
    <group position={[0, 0, -3]}>
      {/* Connection lines */}
      <lineSegments ref={lineRef} geometry={lineGeometry} frustumCulled={false}>
        <lineDashedMaterial
          color="#ff7a18"
          dashSize={0.12}
          gapSize={0.35}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </lineSegments>

      {/* Node spheres via InstancedMesh */}
      <instancedMesh
        ref={nodeRef}
        args={[new THREE.SphereGeometry(1, 8, 8), new THREE.MeshPhysicalMaterial({
          color: "#ff7a18",
          emissive: "#ff944d",
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.85,
          metalness: 0.0,
          roughness: 0.3,
        }), nodeCount]}
        frustumCulled={false}
      />
    </group>
  );
}
