import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, TransformControls } from '@react-three/drei';

const Nucleus = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Electron: React.FC<{ orbitRadius: number; speed: number; color: string }> = ({
  orbitRadius,
  speed,
  color,
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const angle = useRef(0);

  const rotationAxis = useRef(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()); // Random rotation axis
  const rotationAngle = useRef(Math.PI / 4); // Fixed rotation angle (45 degrees)

  useFrame((state, delta) => {
    if (mesh.current) {
      angle.current += speed * delta;

      // Calculate position in the XY plane
      let x = orbitRadius * Math.cos(angle.current);
      let y = orbitRadius * Math.sin(angle.current);
      let z = 0;

      // Create a Vector3 for the position
      const position = new THREE.Vector3(x, y, z);

      // Rotate the position around the rotation axis
      position.applyAxisAngle(rotationAxis.current, rotationAngle.current);

      // Set the position of the mesh
      mesh.current.position.copy(position);
    }
  });

  return (
    <>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Orbit radius={orbitRadius} color={color} rotationAxis={rotationAxis.current} rotationAngle={rotationAngle.current} />
    </>
  );
};

const Orbit: React.FC<{ radius: number; color: string; rotationAxis: THREE.Vector3; rotationAngle: number }> = ({
  radius,
  color,
  rotationAxis,
  rotationAngle
}) => {

  const orbitRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.setRotationFromAxisAngle(rotationAxis, rotationAngle);
    }
  })

  return (
    <group ref={orbitRef}>
      <mesh>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 128, 1]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Atom = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} />
      <Nucleus />
      <Electron orbitRadius={4} speed={1} color="blue" />
      <Electron orbitRadius={6} speed={0.8} color="green" />
      <Electron orbitRadius={8} speed={0.6} color="yellow" />
    </>
  );
};

const AtomAnimation = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <OrbitControls />
        <Atom />
      </Canvas>
    </div>
  );
};

export default AtomAnimation;