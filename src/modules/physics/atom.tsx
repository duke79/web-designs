import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const Nucleon: React.FC<{ position: THREE.Vector3; color: string }> = ({
  position,
  color,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Store the initial position in a ref
  const initialPosition = useRef(position.clone());

  useFrame(() => {
    if (meshRef.current) {
      // Small random displacement for the shaking effect
      const time = Date.now() * 0.001;
      const displacement = new THREE.Vector3(
        Math.sin(time * 2 + initialPosition.current.x) * 0.05,
        Math.sin(time * 3 + initialPosition.current.y) * 0.05,
        Math.sin(time * 4 + initialPosition.current.z) * 0.05
      );

      // Apply displacement to the initial position
      meshRef.current.position.copy(initialPosition.current).add(displacement);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Nucleus = ({ numNucleons }: { numNucleons: number }) => {
  const nucleonPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numNucleons; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.7
      );
      positions.push(position);
    }
    return positions;
  }, [numNucleons]);

  return (
    <group>
      {nucleonPositions.map((position, index) => (
        <Nucleon
          key={index}
          position={position}
          color={index % 2 === 0 ? "red" : "purple"} // Alternate colors for protons and neutrons
        />
      ))}
    </group>
  );
};

const Electron: React.FC<{
  orbitRadius: number;
  speed: number;
  color: string;
  rotationAxis: THREE.Vector3;
  rotationAngle: number;
}> = ({ orbitRadius, speed, color, rotationAxis, rotationAngle }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const angle = useRef(0);

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
      position.applyAxisAngle(rotationAxis, rotationAngle);

      // Set the position of the mesh
      mesh.current.position.copy(position);
    }
  });

  return (
    <>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Orbit
        radius={orbitRadius}
        color={color}
        rotationAxis={rotationAxis}
        rotationAngle={rotationAngle}
      />
    </>
  );
};

const Orbit: React.FC<{
  radius: number;
  color: string;
  rotationAxis: THREE.Vector3;
  rotationAngle: number;
}> = ({ radius, color, rotationAxis, rotationAngle }) => {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.setRotationFromAxisAngle(rotationAxis, rotationAngle);
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh>
        <torusGeometry args={[radius, 0.1, 16, 100]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const Atom = ({ numElectrons }: { numElectrons: number }) => {
  const electronsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < numElectrons; i++) {
      const orbitRadius = 40 + i * 2;
      const speed = 1 / (i + 1);
      const color = ["blue", "green", "yellow", "orange", "cyan", "magenta"][
        i % 6
      ]; // Cycle through colors
      const rotationAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const rotationAngle = Math.PI / 4;
      data.push({ orbitRadius, speed, color, rotationAxis, rotationAngle });
    }
    return data;
  }, [numElectrons]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} />
      <Nucleus numNucleons={numElectrons * 2} />
      {electronsData.map((data, index) => (
        <Electron key={index} {...data} />
      ))}
    </>
  );
};

const AtomAnimation = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <OrbitControls />
        <Atom numElectrons={6} />
      </Canvas>
    </div>
  );
};

export default AtomAnimation;
