"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

// Procedurally generates an organic, smooth wabi-sabi river stone
function PebbleGeometry({ seed = 0 }: { seed?: number }) {
  const geom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 48, 36);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    
    // Smoothly perturb sphere coordinates
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      
      const s = seed * 2.0;
      const noise = 
        (Math.sin(v.x * 1.8 + s) * 0.055) + 
        (Math.cos(v.y * 2.2 + s) * 0.045) + 
        (Math.sin(v.z * 1.6 + s) * 0.035);
        
      v.addScaledVector(v.clone().normalize(), noise);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    
    g.computeVertexNormals();
    return g;
  }, [seed]);

  return <primitive object={geom} attach="geometry" />;
}

function Stone({ 
  position, 
  scale, 
  rotation, 
  color,
  seed,
  roughness,
  metalness,
  bumpScale,
  textures
}: { 
  position: [number, number, number]; 
  scale: [number, number, number]; 
  rotation: [number, number, number]; 
  color: string;
  seed: number;
  roughness: number;
  metalness: number;
  bumpScale: number;
  textures: { bump: THREE.CanvasTexture | null; diffuse: THREE.CanvasTexture | null };
}) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <PebbleGeometry seed={seed} />
      <meshStandardMaterial
        color={color}
        map={textures.diffuse || undefined}
        bumpMap={textures.bump || undefined}
        bumpScale={bumpScale}
        roughness={roughness}
        metalness={metalness}
        flatShading={false}
      />
    </mesh>
  );
}

function BalancedStones() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { theme } = useTheme();

  // Track mouse coordinates globally at window level
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Procedural noise bump-map and organic mineral diffuse map for realistic stone texture
  const stoneTextures = useMemo(() => {
    if (typeof document === "undefined") return { bump: null, diffuse: null };
    
    // 1. Create Bump Texture (fine-grained rock pores)
    const canvasB = document.createElement("canvas");
    canvasB.width = 256;
    canvasB.height = 256;
    const ctxB = canvasB.getContext("2d");
    if (!ctxB) return { bump: null, diffuse: null };
    
    ctxB.fillStyle = "#808080";
    ctxB.fillRect(0, 0, 256, 256);
    const imgDataB = ctxB.getImageData(0, 0, 256, 256);
    const dataB = imgDataB.data;
    
    for (let i = 0; i < dataB.length; i += 4) {
      const noise = (Math.random() - 0.5) * 35; // Natural limestone pore density
      const val = Math.min(255, Math.max(0, 128 + noise));
      dataB[i] = val;
      dataB[i+1] = val;
      dataB[i+2] = val;
    }
    ctxB.putImageData(imgDataB, 0, 0);
    const bump = new THREE.CanvasTexture(canvasB);
    bump.wrapS = THREE.RepeatWrapping;
    bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(5, 5); // Tiled for delicate micro-texture

    // 2. Create Diffuse Texture (organic mineral spots/veins for realistic wabi-sabi tone variation)
    const canvasD = document.createElement("canvas");
    canvasD.width = 128;
    canvasD.height = 128;
    const ctxD = canvasD.getContext("2d");
    if (!ctxD) return { bump, diffuse: null };
    
    ctxD.fillStyle = "#ffffff";
    ctxD.fillRect(0, 0, 128, 128);
    const imgDataD = ctxD.getImageData(0, 0, 128, 128);
    const dataD = imgDataD.data;
    
    for (let i = 0; i < dataD.length; i += 4) {
      const x = (i / 4) % 128;
      const y = Math.floor((i / 4) / 128);
      // Beautiful low-frequency organic mineral spots
      const blotch = Math.sin(x * 0.12) * Math.cos(y * 0.12) * 0.12 + (Math.random() - 0.5) * 0.04;
      const val = Math.min(255, Math.max(0, 255 * (1 + blotch)));
      dataD[i] = val;
      dataD[i+1] = val;
      dataD[i+2] = val;
    }
    ctxD.putImageData(imgDataD, 0, 0);
    const diffuse = new THREE.CanvasTexture(canvasD);
    diffuse.wrapS = THREE.RepeatWrapping;
    diffuse.wrapT = THREE.RepeatWrapping;
    diffuse.repeat.set(1.5, 1.5);

    return { bump, diffuse };
  }, []);

  // Curated Japandi Color Palette: Original terracotta/sandstone bases with a polished black top stone
  const palette = useMemo(() => {
    if (theme === "dark") {
      return {
        bottom: "#323335", // Original dark charcoal basalt
        middle: "#5c4a43", // Original warm iron rust clay
        top: "#111213",    // Deep polished black pebble
      };
    } else {
      return {
        bottom: "#bcab96", // Original warm terracotta sandstone
        middle: "#d4b295", // Original warm ochre clay
        top: "#1a1b1d",    // Deep polished black pebble matching typography
      };
    }
  }, [theme]);

  const smoothScrollY = useRef(0);

  useFrame(() => {
    const actualScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    // Smoothly interpolate scroll position to eliminate WebGL tick vs scrolling frame mismatch jitter
    smoothScrollY.current = THREE.MathUtils.lerp(smoothScrollY.current, actualScrollY, 0.08);
    const scrollY = smoothScrollY.current;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    // The intro section pins for 3.5x viewport height (3.5 * vh).
    // The Hero section enters after the intro unpins, so scroll calculations are offset by 3.5 * vh.
    const startScroll = 3.5 * vh;
    const endScroll = 4.5 * vh;
    const heroScroll = Math.max(0, scrollY - startScroll);

    // Smoothly animate rotation and 3D positioning along a scroll path relative to Hero start
    if (groupRef.current) {
      // 1. Scroll-driven Y rotation + mouse tilt
      const targetRY = mouse.current.x * 0.35 + heroScroll * 0.0022;
      const targetRX = mouse.current.y * -0.22;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRY, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRX, 0.06);
      
      // 2. Scroll-driven Zig-Zag Floating Path
      // Phase-shifted by -PI/2 to start at the far left on Hero, and swings fully
      // across the entire viewport width (-1.6 to 1.6) as the user scrolls.
      const targetX = 0.0 + Math.sin(heroScroll * 0.0022 - Math.PI / 2) * 1.6;
      const targetY = 0.15 - Math.sin(heroScroll * 0.0006) * 0.6;
      const targetZ = -Math.abs(Math.sin(heroScroll * 0.0008)) * 1.2;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.06);

      // 3. Scroll-driven scale (pebbles scale up from 0 to 0.85 as the user scrolls past the intro)
      let scaleFactor = 0;
      if (scrollY > startScroll) {
        scaleFactor = Math.min((scrollY - startScroll) / (endScroll - startScroll), 1.0);
      }
      const currentScale = THREE.MathUtils.lerp(0.001, 0.85, scaleFactor);
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }
    
    // Dynamic light tracking
    if (lightRef.current) {
      const targetLX = mouse.current.x * 2.5;
      const targetLY = 4.0 + mouse.current.y * 1.5;
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetLX, 0.06);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetLY, 0.06);
    }
  });

  return (
    <group>
      <ambientLight intensity={theme === "dark" ? 0.3 : 0.6} />
      
      {/* Specular lighting to define colors and shapes */}
      <directionalLight
        ref={lightRef}
        position={[2.0, 4.0, 3.5]}
        intensity={theme === "dark" ? 2.5 : 3.0}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-4, -1, -3]} intensity={0.6} color="#ffffff" />
      <pointLight position={[3, -2, 2]} intensity={0.3} color="#dfd8c4" />

      {/* Main Stack Group (Scaled down to 60% of original size for delicate balance) */}
      <group ref={groupRef} position={[0, 0.1, 0]}>
        {/* Bottom Stone (Warm Sandstone/Basalt) */}
        <Stone
          position={[0, -0.6, 0]}
          scale={[0.9, 0.35, 0.69]}
          rotation={[0.12, 0.35, -0.05]}
          color={palette.bottom}
          seed={1}
          roughness={0.88} // Porous sandstone feel
          metalness={0.02}
          bumpScale={0.016} // Pronounced wabi-sabi pore texture
          textures={stoneTextures}
        />
        {/* Middle Stone (Warm Ochre/Rust) */}
        <Stone
          position={[0.04, -0.22, -0.02]}
          scale={[0.69, 0.31, 0.58]}
          rotation={[-0.08, -0.45, 0.1]}
          color={palette.middle}
          seed={2}
          roughness={0.72} // Soft clay texture
          metalness={0.05}
          bumpScale={0.010} // Moderate texture
          textures={stoneTextures}
        />
        {/* Top Stone (Polished Black) */}
        <Stone
          position={[-0.02, 0.1, 0.02]}
          scale={[0.47, 0.25, 0.43]}
          rotation={[0.15, 0.15, -0.12]}
          color={palette.top}
          seed={3}
          roughness={0.24} // Smooth glossy satin black river rock
          metalness={0.16} // Elegant slight specular reflectivity
          bumpScale={0.003} // Fine, almost invisible micro-pores
          textures={stoneTextures}
        />
      </group>

      {/* Soft Contact Shadows on the floor */}
      <ContactShadows
        position={[0, -0.78, 0]}
        opacity={theme === "dark" ? 0.5 : 0.3}
        scale={4}
        blur={2.4}
        far={2.5}
      />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <BalancedStones />
    </Canvas>
  );
}
