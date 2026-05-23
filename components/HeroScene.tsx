"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function HologramRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[1.5, 2.0, 2.5].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + (i * Math.PI) / 6, 0, 0]}>
          <torusGeometry args={[radius, 0.008, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? "#00f5ff" : i === 1 ? "#8b5cf6" : "#ec4899"}
            transparent
            opacity={0.6 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} color="#00f5ff" intensity={2} />
      <ParticleField />
      <HologramRings />
      <FloatingOrb />
    </Canvas>
  );
}
