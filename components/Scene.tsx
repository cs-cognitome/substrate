"use client";
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshStandardMaterial color="#00ff66" wireframe opacity={0.25} transparent />
    </Sphere>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff66" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
