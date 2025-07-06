import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
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
            roughness={0.6}
            metalness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
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
      {/* Enhanced Lighting - Brighter for visibility */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={1.0} color="#667eea" />
      <pointLight position={[0, 10, 0]} intensity={0.6} color="#ff6b6b" />
      <pointLight position={[0, -10, 0]} intensity={0.4} color="#4ecdc4" />
      
      {/* Multiple Nebula Layers for Depth */}
      <mesh position={[0, 0, -30]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial 
          color="#667eea" 
          transparent 
          opacity={0.15}
          side={2}
        />
      </mesh>
      
      <mesh position={[0, 0, -25]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial 
          color="#764ba2" 
          transparent 
          opacity={0.1}
          side={2}
        />
      </mesh>
      
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial 
          color="#f093fb" 
          transparent 
          opacity={0.08}
          side={2}
        />
      </mesh>
      
      {/* Cosmic Dust Clouds */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={`dust-${i}`}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            -15 - Math.random() * 10
          ]}
        >
          <sphereGeometry args={[2 + Math.random() * 3, 16, 16]} />
          <meshBasicMaterial 
            color={`hsl(${280 + Math.random() * 40}, 60%, 70%)`}
            transparent 
            opacity={0.03 + Math.random() * 0.05}
            side={2}
          />
        </mesh>
      ))}
      
      {/* Star Clusters */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={`cluster-${i}`} position={[
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          -10 - Math.random() * 5
        ]}>
          {Array.from({ length: 20 }).map((_, j) => (
            <mesh key={`star-${i}-${j}`} position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}>
              <sphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
              <meshBasicMaterial 
                color={`hsl(${200 + Math.random() * 60}, 80%, 80%)`}
                emissive={`hsl(${200 + Math.random() * 60}, 80%, 40%)`}
              />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Galactic Core Glow */}
      <mesh position={[0, 0, -35]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial 
          color="#667eea"
          transparent 
          opacity={0.05}
          side={2}
        />
      </mesh>
      
      <mesh position={[0, 0, -35]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial 
          color="#764ba2"
          transparent 
          opacity={0.08}
          side={2}
        />
      </mesh>
      
      {/* Optimized Planets - Closer to camera */}
      <Planet position={[3, 2, -3]} color="#ff6b6b" size={1.5} rotationSpeed={0.008} />
      <Planet position={[-4, -1, 4]} color="#4ecdc4" size={1.2} rotationSpeed={0.012} />
      <Planet position={[6, 3, 2]} color="#45b7d1" size={2.0} rotationSpeed={0.006} />
      <Planet position={[-6, 1, -4]} color="#96ceb4" size={1.3} rotationSpeed={0.01} />
      
      {/* Optimized Rockets - Closer to camera */}
      <Rocket position={[2, -3, 0]} rotation={[0, 0, Math.PI / 6]} />
      <Rocket position={[-4, -2, 3]} rotation={[0, 0, -Math.PI / 4]} />
      <Rocket position={[0, -4, -5]} rotation={[0, 0, Math.PI / 3]} />
      
      {/* Optimized Astronauts - Closer to camera */}
      <Astronaut position={[2, 1, 3]} />
      <Astronaut position={[-3, -1, -2]} />
      
      {/* Optimized Floating debris/asteroids - Closer to camera */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={0.3} rotationIntensity={0.5} floatIntensity={0.2}>
          <mesh position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial 
              color="#888888"
              emissive="#444444"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Optimized Energy Particles - Closer to camera */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Float key={`particle-${i}`} speed={1} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial 
              color="#667eea"
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export default SpaceScene; 