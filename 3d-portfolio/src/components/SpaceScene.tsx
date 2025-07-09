import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial color="#667eea" />
  </mesh>
);

const Meteor = ({ color = "#ffffff", speed = 0.1, size = 1, startPosition, direction }: { color?: string; speed?: number; size?: number; startPosition?: [number, number, number]; direction?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [initPosition] = useState<[number, number, number]>(() =>
    startPosition ? startPosition : [
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      -60 - Math.random() * 30
    ]
  );
  const [meteorColor] = useState(() => color);
  const [meteorSpeed] = useState(() => speed);
  const [meteorSize] = useState(() => size);
  const [moveDir] = useState<[number, number, number]>(() =>
    direction ? direction : [0.8, -0.4, 1.2]
  );

  useFrame(() => {
    if (groupRef.current) {
      // Move meteor in the given direction
      groupRef.current.position.x += meteorSpeed * moveDir[0] * 0.01;
      groupRef.current.position.y += meteorSpeed * moveDir[1] * 0.01;
      groupRef.current.position.z += meteorSpeed * moveDir[2] * 0.01;
      groupRef.current.rotation.z += 0.02;
      // Reset meteor if it goes too far
      const r = Math.sqrt(
        groupRef.current.position.x ** 2 +
        groupRef.current.position.y ** 2 +
        groupRef.current.position.z ** 2
      );
      if (r > 120) {
        groupRef.current.position.set(...initPosition);
      }
    }
  });

  return (
    <group ref={groupRef} position={initPosition} scale={[meteorSize, meteorSize, meteorSize]}>
      {/* Meteor body */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
        <meshStandardMaterial 
          color={meteorColor}
          emissive={meteorColor}
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Meteor trail - primary */}
      <mesh position={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.01, 0.02, 0.4, 6]} />
        <meshBasicMaterial 
          color={meteorColor}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Meteor trail - secondary */}
      <mesh position={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.005, 0.01, 0.4, 6]} />
        <meshBasicMaterial 
          color={meteorColor}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Meteor trail - tertiary */}
      <mesh position={[0, 0, -1.2]}>
        <cylinderGeometry args={[0.002, 0.005, 0.3, 6]} />
        <meshBasicMaterial 
          color={meteorColor}
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Meteor glow */}
      <mesh>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshBasicMaterial 
          color={meteorColor}
          transparent
          opacity={0.15}
          side={2}
        />
      </mesh>
      
      {/* Additional glow layers */}
      <mesh>
        <sphereGeometry args={[0.8, 6, 6]} />
        <meshBasicMaterial 
          color={meteorColor}
          transparent
          opacity={0.08}
          side={2}
        />
      </mesh>
    </group>
  );
};

const RealisticRocket = ({ position, scale = [1, 1, 1] }: { position: [number, number, number]; scale?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.002;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main rocket body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Rocket nose cone */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Rocket fins */}
      <mesh position={[0.4, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-0.4, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[0, -0.8, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[0, -0.8, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      
      {/* Rocket engine exhaust */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.4, 8]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Engine glow */}
      <mesh position={[0, -1.4, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const RealisticAstronaut = ({ position, scale = [1, 1, 1] }: { position: [number, number, number]; scale?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.001;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Helmet */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      
      {/* Helmet visor */}
      <mesh position={[0, 0.6, 0.15]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.7} />
      </mesh>
      
      {/* Body suit */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.35, 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.35, 0.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Hands */}
      <mesh position={[0.6, 0.1, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.6, 0.1, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.1, -0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.1, -0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Boots */}
      <mesh position={[0.1, -0.95, 0.05]}>
        <boxGeometry args={[0.12, 0.1, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.1, -0.95, 0.05]}>
        <boxGeometry args={[0.12, 0.1, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Oxygen tank */}
      <mesh position={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Oxygen tank details */}
      <mesh position={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.12, 0.15, 0.1, 8]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </group>
  );
};

const FloatingDebris = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [startPosition] = useState<[number, number, number]>(() => [
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 80,
    -10 - Math.random() * 30
  ]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.0008;
      groupRef.current.rotation.x += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.y += rotationSpeed * 1.2 * state.clock.getDelta() * 60;
      groupRef.current.rotation.z += rotationSpeed * 0.4 * state.clock.getDelta() * 60;
      
      // Floating motion
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.2) * 0.005;
      groupRef.current.position.x += Math.cos(state.clock.elapsedTime * 0.15) * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {/* Random debris shapes */}
      {Math.random() > 0.5 ? (
        <mesh>
          <boxGeometry args={[0.1, 0.15, 0.08]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      )}
    </group>
  );
};

const RotatingSatellite = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const solarPanelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.004;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
    if (solarPanelRef.current) {
      // Solar panel rotation
      solarPanelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main satellite body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Solar panels */}
      <group ref={solarPanelRef}>
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.3]} />
          <meshStandardMaterial color="#0066cc" />
        </mesh>
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.3]} />
          <meshStandardMaterial color="#0066cc" />
        </mesh>
      </group>
      
      {/* Antenna */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 6]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Communication dish */}
      <mesh position={[0, 0.3, 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};

const PulsingEnergyOrb = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [color] = useState(() => 
    ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)]
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Pulsing scale animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      groupRef.current.scale.set(scale, scale, scale);
      
      // Smoother rotation using delta time
      const rotationSpeed = 0.008;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.x += rotationSpeed * 0.5 * state.clock.getDelta() * 60;
      
      // Floating motion
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Core orb */}
      <mesh>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh>
      
      {/* Energy particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * 0.4,
          Math.sin(i * Math.PI / 4) * 0.4,
          0
        ]}>
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

const OrbitalPath = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      groupRef.current.rotation.y += speed * state.clock.getDelta() * 60;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 32]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh>
      
      {/* Orbiting object */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

const FloatingAsteroid = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [rotationSpeed] = useState(() => 0.001 + Math.random() * 0.005);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const baseRotationSpeed = rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.x += baseRotationSpeed;
      groupRef.current.rotation.y += baseRotationSpeed * 0.7;
      groupRef.current.rotation.z += baseRotationSpeed * 0.5;
      
      // Gentle floating
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.1) * 0.002;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Irregular asteroid shape */}
      <mesh>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial 
          color="#555555"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Surface details */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3
          ]}
        >
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
    </group>
  );
};

const AnimatedNebula = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [particles] = useState(() => {
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const colorObj = new THREE.Color(color);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, colors, sizes };
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.0003;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.x += rotationSpeed * 0.5 * state.clock.getDelta() * 60;
      
      // Gentle floating motion
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.1) * 0.002;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            args={[particles.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[particles.colors, 3]}
            attach="attributes-color"
          />
          <bufferAttribute
            args={[particles.sizes, 1]}
            attach="attributes-size"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const StarCluster = ({ position, starCount }: { position: [number, number, number]; starCount: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [stars] = useState(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      // Random star colors (white, blue, yellow, red)
      const starColors = ['#ffffff', '#87ceeb', '#ffff00', '#ff6b6b'];
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const colorObj = new THREE.Color(color);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = Math.random() * 0.3 + 0.05;
    }
    
    return { positions, colors, sizes };
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.0008;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.z += rotationSpeed * 0.5 * state.clock.getDelta() * 60;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            args={[stars.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[stars.colors, 3]}
            attach="attributes-color"
          />
          <bufferAttribute
            args={[stars.sizes, 1]}
            attach="attributes-size"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const CosmicDustCloud = ({ position, size }: { position: [number, number, number]; size: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [dustParticles] = useState(() => {
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * size;
      positions[i * 3 + 1] = (Math.random() - 0.5) * size;
      positions[i * 3 + 2] = (Math.random() - 0.5) * size;
      
      // Dust colors (browns, grays)
      const dustColors = ['#8b4513', '#a0522d', '#696969', '#808080'];
      const color = dustColors[Math.floor(Math.random() * dustColors.length)];
      const colorObj = new THREE.Color(color);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = Math.random() * 0.2 + 0.02;
    }
    
    return { positions, colors, sizes };
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.0002;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.x += rotationSpeed * 0.4 * state.clock.getDelta() * 60;
      
      // Slow drift
      groupRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.05) * 0.001;
      groupRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.07) * 0.001;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            args={[dustParticles.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[dustParticles.colors, 3]}
            attach="attributes-color"
          />
          <bufferAttribute
            args={[dustParticles.sizes, 1]}
            attach="attributes-size"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
};

const GalacticCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [coreParticles] = useState(() => {
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 15;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Core colors (yellows, oranges, whites)
      const coreColors = ['#ffff00', '#ffa500', '#ffffff', '#ffd700', '#ff8c00'];
      const color = coreColors[Math.floor(Math.random() * coreColors.length)];
      const colorObj = new THREE.Color(color);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = Math.random() * 0.4 + 0.1;
    }
    
    return { positions, colors, sizes };
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Smoother rotation using delta time
      const rotationSpeed = 0.001;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      
      // Pulsing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            args={[coreParticles.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[coreParticles.colors, 3]}
            attach="attributes-color"
          />
          <bufferAttribute
            args={[coreParticles.sizes, 1]}
            attach="attributes-size"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Central glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial 
          color="#ffff00"
          transparent
          opacity={0.1}
          side={2}
        />
      </mesh>
    </group>
  );
};

const BackgroundScreen = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      timeRef.current += state.clock.getDelta();
      const time = timeRef.current;
      
      // Add subtle 3D movement to the background screen
      const depthMovement = Math.sin(time * 0.2) * 0.5;
      groupRef.current.position.z = -50 + depthMovement;
      
      // Add very subtle rotation to enhance 3D effect
      const rotationSpeed = 0.0001;
      groupRef.current.rotation.y += rotationSpeed * state.clock.getDelta() * 60;
      groupRef.current.rotation.x += rotationSpeed * 0.3 * state.clock.getDelta() * 60;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Multiple layered nebulas with enhanced 3D positioning */}
      <AnimatedNebula position={[-30, 20, -40]} color="#ff0080" scale={2} />
      <AnimatedNebula position={[25, -15, -35]} color="#0080ff" scale={1.5} />
      <AnimatedNebula position={[40, 30, -45]} color="#8000ff" scale={2.5} />
      <AnimatedNebula position={[-20, -25, -30]} color="#00ff80" scale={1.8} />
      <AnimatedNebula position={[60, 10, -55]} color="#ff4000" scale={1.2} />
      <AnimatedNebula position={[-50, -10, -38]} color="#4000ff" scale={1.6} />
      
      {/* Star clusters with varied depths */}
      <StarCluster position={[-40, 40, -25]} starCount={80} />
      <StarCluster position={[35, -30, -20]} starCount={60} />
      <StarCluster position={[50, 15, -30]} starCount={100} />
      <StarCluster position={[-45, -20, -25]} starCount={70} />
      <StarCluster position={[20, 50, -35]} starCount={90} />
      <StarCluster position={[-30, -50, -28]} starCount={75} />
      
      {/* Cosmic dust clouds with 3D layering */}
      <CosmicDustCloud position={[15, 35, -15]} size={12} />
      <CosmicDustCloud position={[-25, -40, -18]} size={10} />
      <CosmicDustCloud position={[45, -10, -12]} size={8} />
      <CosmicDustCloud position={[-35, 25, -22]} size={14} />
      <CosmicDustCloud position={[55, -25, -16]} size={9} />
      
      {/* Galactic core */}
      <GalacticCore />
      
      {/* Enhanced background stars with 3D depth variation */}
      {Array.from({ length: 2500 }).map((_, i) => (
        <mesh 
          key={`bg-star-${i}`}
          position={[
            (Math.random() - 0.5) * 250,
            (Math.random() - 0.5) * 250,
            -60 - Math.random() * 120
          ]}
        >
          <sphereGeometry args={[0.01 + Math.random() * 0.03, 4, 4]} />
          <meshBasicMaterial 
            color="#ffffff"
            transparent
            opacity={0.2 + Math.random() * 0.5}
          />
        </mesh>
      ))}
      
      {/* Additional 3D depth layers */}
      {Array.from({ length: 500 }).map((_, i) => (
        <mesh 
          key={`deep-star-${i}`}
          position={[
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
            -150 - Math.random() * 200
          ]}
        >
          <sphereGeometry args={[0.005 + Math.random() * 0.015, 3, 3]} />
          <meshBasicMaterial 
            color="#ffffff"
            transparent
            opacity={0.1 + Math.random() * 0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// 3D Particle System Component
const ParticleSystem3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const [particles] = useState(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = -20 - Math.random() * 40;
      
      // Random colors
      const particleColors = ['#667eea', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      const colorObj = new THREE.Color(color);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = Math.random() * 0.2 + 0.05;
      speeds[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, colors, sizes, speeds };
  });

  useFrame((state) => {
    if (groupRef.current) {
      timeRef.current += state.clock.getDelta();
      const time = timeRef.current;
      
      // Update particle positions for 3D movement
      for (let i = 0; i < 100; i++) {
        const speed = particles.speeds[i];
        const offset = i * 0.1;
        
        // 3D spiral movement
        particles.positions[i * 3] += Math.sin(time * speed + offset) * 0.02;
        particles.positions[i * 3 + 1] += Math.cos(time * speed * 0.7 + offset) * 0.02;
        particles.positions[i * 3 + 2] += Math.sin(time * speed * 0.5 + offset) * 0.01;
        
        // Reset particles that go too far
        if (Math.abs(particles.positions[i * 3]) > 30) {
          particles.positions[i * 3] = (Math.random() - 0.5) * 60;
        }
        if (Math.abs(particles.positions[i * 3 + 1]) > 30) {
          particles.positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        }
        if (particles.positions[i * 3 + 2] > 10 || particles.positions[i * 3 + 2] < -60) {
          particles.positions[i * 3 + 2] = -20 - Math.random() * 40;
        }
      }
      
      // Update geometry
      const firstChild = groupRef.current.children[0];
      if (firstChild && 'geometry' in firstChild && firstChild.geometry) {
        const geometry = firstChild.geometry as THREE.BufferGeometry;
        geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            args={[particles.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[particles.colors, 3]}
            attach="attributes-color"
          />
          <bufferAttribute
            args={[particles.sizes, 1]}
            attach="attributes-size"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const SpaceBackground360 = () => {
  const texture = useLoader(THREE.TextureLoader, '/space360.jpg');
  return (
    <mesh scale={[-200, 200, 200]}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

// 360-degree starfield
const Starfield360 = ({ count = 1000, radius = 95 }) => {
  const groupRef = useRef<THREE.Group>(null);
  // Store random phase for each star
  const phases = useRef(Array.from({ length: count }, () => Math.random() * Math.PI * 2));

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((star, i) => {
        const phase = phases.current[i];
        const twinkle = 0.7 + 0.3 * Math.sin(clock.elapsedTime * 1.5 + phase);
        const mesh = star as THREE.Mesh;
        const material = mesh.material as THREE.Material & { opacity?: number; transparent?: boolean };
        if (material) {
          material.opacity = twinkle;
          material.transparent = true;
        }
      });
    }
  });

  const stars = Array.from({ length: count }).map((_, i) => {
    // Spherical coordinates
    const theta = Math.acos(2 * Math.random() - 1); // polar angle
    const phi = 2 * Math.PI * Math.random(); // azimuthal angle
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    return (
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.08 + Math.random() * 0.07, 6, 6]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    );
  });
  return <group ref={groupRef}>{stars}</group>;
};

// Classic meteor shower: top left to bottom right
const MeteorShower = ({ count = 10, speed = 0.25, size = 3 }) => {
  const meteors = Array.from({ length: count }).map((_, i) => {
    // Start closer to the camera, top left
    const x = -20 - Math.random() * 10;
    const y = 20 + Math.random() * 10;
    const z = -5 + Math.random() * 10;
    // Direction: down and to the right (positive x, negative y, positive z)
    const meteorDirection: [number, number, number] = [1, -1, 0.5];
    return <Meteor key={i} color="#aaf6ff" speed={speed} size={size} startPosition={[x, y, z]} direction={meteorDirection} />;
  });
  return <>{meteors}</>;
};

const SpaceScene = () => {
  const sceneRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const targetRotationZ = useRef(0);
  const timeRef = useRef(0);

  // Track full 360-degree rotations
  const [rotationCount, setRotationCount] = useState(0);
  const lastRotationY = useRef(0);
  // Control large meteor shower visibility
  const [showLargeShower, setShowLargeShower] = useState(false);
  const largeShowerTimeout = useRef<NodeJS.Timeout | null>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      timeRef.current += state.clock.getDelta();
      // Slow down the rotation
      const baseSpeed = 0.00015; // was 0.0004
      const time = timeRef.current;
      targetRotationY.current += baseSpeed * state.clock.getDelta() * 60;
      targetRotationX.current += baseSpeed * 0.15 * state.clock.getDelta() * 60;
      targetRotationZ.current += baseSpeed * 0.08 * state.clock.getDelta() * 60;
      const waveInfluence = Math.sin(time * 0.5) * 0.0001;
      targetRotationY.current += waveInfluence * state.clock.getDelta() * 60;
      const lerpFactor = 0.08;
      sceneRef.current.rotation.y += (targetRotationY.current - sceneRef.current.rotation.y) * lerpFactor;
      sceneRef.current.rotation.x += (targetRotationX.current - sceneRef.current.rotation.x) * lerpFactor;
      sceneRef.current.rotation.z += (targetRotationZ.current - sceneRef.current.rotation.z) * lerpFactor;
      const positionWave = Math.sin(time * 0.3) * 0.02;
      sceneRef.current.position.y = positionWave;
      sceneRef.current.position.x = Math.cos(time * 0.2) * 0.01;

      // --- Rotation tracking logic ---
      // Detect full 360-degree rotation (2 * Math.PI)
      const prev = lastRotationY.current;
      const curr = targetRotationY.current;
      if (Math.floor(curr / (2 * Math.PI)) > Math.floor(prev / (2 * Math.PI))) {
        setRotationCount((c) => c + 1);
      }
      lastRotationY.current = curr;
    }
  });

  // Show large meteor shower every 360 rotations
  React.useEffect(() => {
    if (rotationCount > 0 && rotationCount % 360 === 0) {
      setShowLargeShower(true);
      if (largeShowerTimeout.current) clearTimeout(largeShowerTimeout.current);
      largeShowerTimeout.current = setTimeout(() => {
        setShowLargeShower(false);
      }, 4000); // Show for 4 seconds
    }
    // Cleanup on unmount
    return () => {
      if (largeShowerTimeout.current) clearTimeout(largeShowerTimeout.current);
    };
  }, [rotationCount]);

  // 360-degree meteor shower
  const Meteor360 = ({ count = 18, speed = 0.12, size = 1.2 }) => {
    const meteors = Array.from({ length: count }).map((_, i) => {
      // Spherical coordinates for random direction
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = 80 + Math.random() * 10;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      // Each meteor will move radially outward
      return <Meteor key={i} color="#fff" speed={speed} size={size} startPosition={[x, y, z]} direction={[x, y, z]} />;
    });
    return <>{meteors}</>;
  };

  return (
    <group ref={sceneRef}>
      <Suspense fallback={<LoadingFallback />}>
        {/* 360° Starfield */}
        <Starfield360 count={1000} radius={95} />
        {/* Enhanced Lighting - Brighter for visibility */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#667eea" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#ff6b6b" />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#4ecdc4" />
        
        {/* 3D Background Screen */}
        <BackgroundScreen />
        
              {/* Enhanced 3D Space Background with multiple layers */}
      <mesh position={[0, 0, -100]}>
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial 
          color="#000000" 
          side={2}
        />
      </mesh>
      
      {/* Additional depth layers for 3D effect */}
      <mesh position={[0, 0, -150]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial 
          color="#000000" 
          side={2}
        />
      </mesh>
      
      <mesh position={[0, 0, -200]}>
        <planeGeometry args={[500, 500]} />
        <meshBasicMaterial 
          color="#000000" 
          side={2}
        />
      </mesh>
      
      {/* White Stars - Full Screen Coverage */}
      {Array.from({ length: 3500 }).map((_, i) => (
        <mesh 
          key={`star-${i}`}
          position={[
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            -5 - Math.random() * 50
          ]}
        >
          <sphereGeometry args={[0.02 + Math.random() * 0.03, 6, 6]} />
          <meshBasicMaterial 
            color="#ffffff"
          />
        </mesh>
      ))}
      
      {/* Enhanced Multi-Color Meteor Shower */}
      {/* White meteors */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Meteor 
          key={`white-meteor-${i}`} 
          color="#ffffff" 
          speed={0.08 + Math.random() * 0.04}
          size={0.8 + Math.random() * 0.4}
        />
      ))}
      
      {/* Blue meteors */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Meteor 
          key={`blue-meteor-${i}`} 
          color="#00ffff" 
          speed={0.1 + Math.random() * 0.05}
          size={1.0 + Math.random() * 0.3}
        />
      ))}
      
      {/* Green meteors */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Meteor 
          key={`green-meteor-${i}`} 
          color="#00ff00" 
          speed={0.12 + Math.random() * 0.06}
          size={0.9 + Math.random() * 0.5}
        />
      ))}
      
      {/* Purple meteors */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Meteor 
          key={`purple-meteor-${i}`} 
          color="#8000ff" 
          speed={0.09 + Math.random() * 0.04}
          size={1.1 + Math.random() * 0.4}
        />
      ))}
      
      {/* Orange meteors */}
      {Array.from({ length: 2 }).map((_, i) => (
        <Meteor 
          key={`orange-meteor-${i}`} 
          color="#ff8000" 
          speed={0.11 + Math.random() * 0.05}
          size={1.2 + Math.random() * 0.3}
        />
      ))}
      
      {/* Pink meteors */}
      {Array.from({ length: 2 }).map((_, i) => (
        <Meteor 
          key={`pink-meteor-${i}`} 
          color="#ff0080" 
          speed={0.07 + Math.random() * 0.03}
          size={0.7 + Math.random() * 0.4}
        />
      ))}
      
      {/* Yellow meteors */}
      {Array.from({ length: 2 }).map((_, i) => (
        <Meteor 
          key={`yellow-meteor-${i}`} 
          color="#ffff00" 
          speed={0.13 + Math.random() * 0.06}
          size={1.0 + Math.random() * 0.5}
        />
      ))}
      
      {/* Red meteors */}
      {Array.from({ length: 2 }).map((_, i) => (
        <Meteor 
          key={`red-meteor-${i}`} 
          color="#ff0000" 
          speed={0.14 + Math.random() * 0.07}
          size={1.3 + Math.random() * 0.4}
        />
      ))}
      
      {/* Special large meteors for dramatic effect */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Meteor 
          key={`special-meteor-${i}`} 
          color={['#ff6b6b', '#4ecdc4', '#45b7d1'][i]} 
          speed={0.16 + Math.random() * 0.08}
          size={1.8 + Math.random() * 0.6}
        />
      ))}
      
      {/* Fast small meteors for intensity */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Meteor 
          key={`fast-meteor-${i}`} 
          color={['#667eea', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][i % 6]} 
          speed={0.18 + Math.random() * 0.1}
          size={0.5 + Math.random() * 0.3}
        />
      ))}

      {/* Floating Space Debris */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingDebris key={`debris-${i}`} />
      ))}

      {/* Rotating Satellites */}
      <RotatingSatellite position={[8, 6, -20]} />
      <RotatingSatellite position={[-6, 8, -25]} />
      <RotatingSatellite position={[10, -4, -18]} />

      {/* Pulsing Energy Orbs */}
      <PulsingEnergyOrb position={[5, 2, -12]} />
      <PulsingEnergyOrb position={[-3, 7, -15]} />
      <PulsingEnergyOrb position={[7, -3, -10]} />
      <PulsingEnergyOrb position={[-8, 1, -13]} />

      {/* Orbital Paths */}
      <OrbitalPath radius={15} speed={0.005} color="#00ffff" />
      <OrbitalPath radius={20} speed={0.003} color="#ff00ff" />
      <OrbitalPath radius={25} speed={0.002} color="#ffff00" />

      {/* Floating Asteroids */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingAsteroid 
          key={`asteroid-${i}`}
          position={[
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            -8 - Math.random() * 40
          ]}
        />
      ))}

      {/* Realistic Rocket - Right Corner */}
      <RealisticRocket position={[12, 3, -15]} scale={[2,2,2]} />

      {/* Realistic Astronaut - Left Corner */}
      <RealisticAstronaut position={[-12, -2, -12]} scale={[2,2,2]} />

      {/* Floating 3D Elements for enhanced depth */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={`floating-element-${i}`}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            -10 - Math.random() * 30
          ]}
        >
          <dodecahedronGeometry args={[0.3 + Math.random() * 0.4, 0]} />
          <meshStandardMaterial 
            color={['#667eea', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 4)]}
            transparent
            opacity={0.3 + Math.random() * 0.4}
            emissive={['#667eea', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 4)]}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* 3D Particle System */}
      <ParticleSystem3D />

      {/* Large Meteor Shower every 360 rotations */}
      {showLargeShower && <Meteor360 count={60} speed={0.22} size={3.5} />}

      </Suspense>
    </group>
  );
};

export default SpaceScene; 