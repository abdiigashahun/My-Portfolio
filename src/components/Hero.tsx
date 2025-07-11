import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text3D, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

function FloatingGeometry() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.01;
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.02;
      cubeRef.current.rotation.z += 0.01;
      cubeRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.015;
      torusRef.current.rotation.y += 0.025;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.4;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[-3, 0, -2]}>
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.8} />
      </Sphere>
      <mesh ref={cubeRef} position={[3, 0, -1]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#06B6D4" transparent opacity={0.8} />
      </mesh>
      <mesh ref={torusRef} position={[0, 2, -3]}>
        <torusGeometry args={[0.8, 0.3, 16, 32]} />
        <meshStandardMaterial color="#EC4899" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

export default function Hero({ setActiveSection }: HeroProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('hero');
    },
  });

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingGeometry />
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="bg-gradient-to-r text-gray-500 bg-clip-text ">
              Abdi Gashahun
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Full Stack Developer & AI Enthusiastic
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r bg-gray-800 border-2 border-gray-600 text-white rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gray-500 text-purple-500 rounded-full font-medium hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}
