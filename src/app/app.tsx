import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Electron = ({ radius, speed }: { radius: number; speed: number }) => {
  const ref = React.useRef<THREE.Mesh>(null!);
  const angle = React.useRef(0);

  useFrame(() => {
    angle.current += speed;
    const x = radius * Math.cos(angle.current);
    const z = radius * Math.sin(angle.current);
    ref.current.position.set(x, 0, z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const Atom = () => {
  return (
    <>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Electrons */}
      <Electron radius={2} speed={0.03} />
      <Electron radius={3} speed={0.02} />
      <Electron radius={4} speed={0.01} />
    </>
  );
};

const AtomScene = () => {
  return (
    <Canvas>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Atom */}
      <Atom />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AtomScene />
    </div>
  );
}
