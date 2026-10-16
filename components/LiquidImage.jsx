"use client";

import { useRef, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float dist = distance(uv, uMouse);
    float force = smoothstep(0.4, 0.0, dist);
    vec2 displacement = vec2(sin(uv.y * 10.0 + uTime) * 0.02, cos(uv.x * 10.0 + uTime) * 0.02) * force * uHover;
    vec4 texColor = texture2D(uTexture, uv + displacement);
    gl_FragColor = texColor;
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Scene({ src, isHovered }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const texture = useLoader(THREE.TextureLoader, src);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 }
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      const targetHover = isHovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHover.value += (targetHover - materialRef.current.uniforms.uHover.value) * 0.1;
    }
  });

  const handlePointerMove = (e) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value.set(e.uv.x, e.uv.y);
    }
  };

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

export default function LiquidImage({ src, alt }) {
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.innerWidth > 768,
    () => false
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isDesktop && isHovered ? (
        <Canvas 
          camera={{ position: [0, 0, 1] }} 
          gl={{ powerPreference: "low-power", antialias: false }}
        >
          <Scene src={src} isHovered={isHovered} />
        </Canvas>
      ) : (
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
