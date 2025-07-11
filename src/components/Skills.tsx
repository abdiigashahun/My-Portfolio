import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

interface SkillsProps {
  setActiveSection: (section: string) => void;
}

const skills = [
  { name: 'React', level: 75, color: '#61DAFB' },
  { name: 'TypeScript', level: 70, color: '#3178C6' },
  { name: 'Node.js', level: 75, color: '#339933' },
  { name: 'Python', level: 60, color: '#3776AB' },
  { name: 'Next.js', level: 75, color: '#000000' },
  { name: 'MongoDB', level: 75, color: '#47A248' },
  { name: 'Dart', level: 70, color: '#232F3E' },
  { name: 'Java', level: 65, color: '#2496ED' },
];

function FloatingSkill({ skill, position, index }: { skill: typeof skills[0], position: [number, number, number], index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={skill.color} transparent opacity={0.8} />
      </mesh>
      <Text
        ref={textRef}
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
}

export default function Skills({ setActiveSection }: SkillsProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('skills');
    },
  });

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
            My <span className="bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <div key={skill.name} className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                  <span className="text-sm font-medium text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-gray-500 to-gray-500"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-96"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              {skills.slice(0, 6).map((skill, index) => (
                <FloatingSkill
                  key={skill.name}
                  skill={skill}
                  position={[
                    (index % 3 - 1) * 2,
                    Math.floor(index / 3) * 2 - 1,
                    0
                  ]}
                  index={index}
                />
              ))}
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}