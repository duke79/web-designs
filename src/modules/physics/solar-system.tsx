import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const Star: React.FC<{ position: THREE.Vector3; color: string }> = ({
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
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sun = ({ numStars }: { numStars: number }) => {
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numStars; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.7
      );
      positions.push(position);
    }
    return positions;
  }, [numStars]);

  return (
    <group>
      {starPositions.map((position, index) => (
        <Star
          key={index}
          position={position}
          color="yellow"
        />
      ))}
    </group>
  );
};

const Planet: React.FC<{
  orbitRadius: number;
  speed: number;
  color: string;
  rotationAxis: THREE.Vector3;
  rotationAngle: number;
  planetRadius: number;
}> = ({ planetRadius, orbitRadius, speed, color, rotationAxis, rotationAngle }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const angle = useRef(0);
  const SPEED_SCALE = 0.01;
  const PLANET_SIZE_SCALE = 1;
  const ORBIT_RADIUS_SCALE = 10;

  useFrame((state, delta) => {
    if (mesh.current) {
      angle.current += speed * SPEED_SCALE * delta;

      // Calculate position in the XY plane
      const x = orbitRadius * ORBIT_RADIUS_SCALE * Math.cos(angle.current);
      const y = orbitRadius * ORBIT_RADIUS_SCALE * Math.sin(angle.current);
      const z = 0;

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
        <sphereGeometry args={[planetRadius * PLANET_SIZE_SCALE, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Orbit
        radius={orbitRadius * ORBIT_RADIUS_SCALE}
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
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const SolarSystem = ({ numPlanets }: { numPlanets: number }) => {
  const planetsData = useMemo(() => {
    // Data for the 8 planets in our solar system, structured for the Planet component
    const data = [
      {
        name: 'Mercury',
        orbitRadius: 0.39, // AU (Scaled down)
        speed: 47.9, // km/s (Adjust for animation)
        color: '#A9A9A9',
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(0.03), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: 58.6,
        planetRadius: 0.38, // Relative to Earth (Scaled down)
      },
      // ... (data for Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune)
            {
        name: 'Venus',
        orbitRadius: 0.72,  // AU
        speed: 35.0,       // km/s
        color: '#F5DEB3', // Wheat
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(177.4), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: -243, // Earth days (Retrograde)
        planetRadius: 0.95,
      },
      {
        name: 'Earth',
        orbitRadius: 1.0,   // AU
        speed: 29.8,       // km/s
        color: '#0088FF', // Blue
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(23.5), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: 1,   // Earth days
        planetRadius: 1,
      },
      {
        name: 'Mars',
        orbitRadius: 1.52,  // AU
        speed: 24.1,       // km/s
        color: '#D2691E', // Chocolate (reddish-brown)
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(25.2), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: 1.03, // Earth days
        planetRadius: 0.53,
      },
      {
        name: 'Jupiter',
        orbitRadius: 5.20,  // AU
        speed: 13.1,       // km/s
        color: '#DEB887', // BurlyWood (tan with stripes)
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(3.1), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: 0.41, // Earth days
        planetRadius: 11.2,
      },
      {
        name: 'Saturn',
        orbitRadius: 9.58,  // AU
        speed: 9.7,        // km/s
        color: '#FAEBD7', // AntiqueWhite (yellowish)
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(26.7), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: 0.45, // Earth days
        planetRadius: 9.45,
      },
      {
        name: 'Uranus',
        orbitRadius: 19.2,  // AU
        speed: 6.8,        // km/s
        color: '#ADD8E6', // Light Blue (icy blue)
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(97.8), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: -0.72, // Earth days (Retrograde)
        planetRadius: 4.0,
      },
      {
        name: 'Neptune',
        orbitRadius: 30.1,  // AU
        speed: 5.4,        // km/s
        color: '#87CEFA', // Sky Blue (bright blue)
        rotationAxis: new THREE.Vector3().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(28.3), 0, 0, 'XYZ')),
        rotationAngle: 0,
        rotationPeriod: 0.67, // Earth days
        planetRadius: 3.88,
      }
    ];

    return data.slice(0, numPlanets);
  }, [numPlanets]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} />
      <Sun numStars={1} />
      {planetsData.map((data, index) => (
        <Planet key={index} {...data} />
      ))}
    </>
  );
};

const SolarSystemAnimation = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <OrbitControls />
        <SolarSystem numPlanets={10} />
      </Canvas>
    </div>
  );
};

export default SolarSystemAnimation;
