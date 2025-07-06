import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simple geometric shapes for space objects
const Planet = ({ position, color, size, rotationSpeed }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={position}>
        {/* Main planet */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial 
            color={color}
            roughness={0.8}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.05}
          />
        </mesh>
        
        {/* Simple atmosphere glow */}
        <mesh>
          <sphereGeometry args={[size * 1.05, 16, 16]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.05}
            side={2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Rocket = ({ position, rotation }: any) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += 0.008;
      if (groupRef.current.position.y > 10) {
        groupRef.current.position.y = -10;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Rocket body */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.1, 2, 6]} />
        <meshStandardMaterial 
          color="#ff4444"
          emissive="#ff2222"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Rocket nose */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.1, 0.4, 6]} />
        <meshStandardMaterial 
          color="#ff6666"
          emissive="#ff4444"
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Rocket fins */}
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      
      {/* Simple engine exhaust */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.2, 6]} />
        <meshBasicMaterial 
          color="#ffaa00"
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

const Astronaut = ({ position }: any) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Helmet */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.8, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Arms */}
        <mesh position={[0.4, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.4, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Legs */}
        <mesh position={[0.15, -0.6, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.15, -0.6, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
};

const SpaceScene = () => {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#667eea" />
      <pointLight position={[0, 20, 0]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[0, -20, 0]} intensity={0.3} color="#4ecdc4" />
      
      {/* Nebula Effect */}
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial 
          color="#667eea" 
          transparent 
          opacity={0.1}
          side={2}
        />
      </mesh>
      
      {/* Optimized Planets */}
      <Planet position={[8, 3, -5]} color="#ff6b6b" size={1.2} rotationSpeed={0.008} />
      <Planet position={[-6, -2, 8]} color="#4ecdc4" size={0.8} rotationSpeed={0.012} />
      <Planet position={[12, 5, 3]} color="#45b7d1" size={1.5} rotationSpeed={0.006} />
      <Planet position={[-10, 1, -8]} color="#96ceb4" size={1.0} rotationSpeed={0.01} />
      
      {/* Optimized Rockets */}
      <Rocket position={[5, -5, 0]} rotation={[0, 0, Math.PI / 6]} />
      <Rocket position={[-8, -3, 5]} rotation={[0, 0, -Math.PI / 4]} />
      <Rocket position={[0, -8, -10]} rotation={[0, 0, Math.PI / 3]} />
      
      {/* Optimized Astronauts */}
      <Astronaut position={[3, 2, 5]} />
      <Astronaut position={[-5, -1, -3]} />
      
      {/* Optimized Floating debris/asteroids */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={0.3} rotationIntensity={0.5} floatIntensity={0.2}>
          <mesh position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial 
              color="#888888"
              emissive="#444444"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Optimized Energy Particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Float key={`particle-${i}`} speed={1} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshBasicMaterial 
              color="#667eea"
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export default SpaceScene; 