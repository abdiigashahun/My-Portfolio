import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import * as THREE from 'three';

interface ProjectsProps {
  setActiveSection: (section: string) => void;
}

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, secure payments, and admin dashboard.',
    image: '/images/Ecommerce.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express',],
    github: 'https://github.com/abdiigashahun/Ninja-Frontend',
    demo: 'https://ninja-h5id.vercel.app/',
    color: '#8B5CF6'
  },
  {
    id: 2,
    title: 'LSM Saas App',
    description: 'Interactive LMS platform with subscriptions, real-time sessions, and AI-powered vocal assistant.',
    image: '/images/Saas.png',
    tech: ['Next.js', 'Supabase', 'Clerk', 'Vapi',],
    github: 'https://github.com/abdiigashahun/LMS-Saas',
    demo: 'https://lms-saas-livid.vercel.app/',
    color: '#06B6D4'
  },
  {
    id: 3,
    title: 'UI Component',
    description: 'Reusable, customizable interface elements for building fast, clean, and consistent designs.',
    image: '/images/UI.png',
    tech: ['React', 'Tailwind Css', 'TypeScript'],
    github: 'https://github.com/abdiigashahun/Abdi.ui',
    demo: 'https://abdi-ui.vercel.app/',
    color: '#EC4899'
  }
];

function ProjectCard3D({ project, position, isHovered, onHover }: { 
  project: typeof projects[0], 
  position: [number, number, number], 
  isHovered: boolean,
  onHover: (hovered: boolean) => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.scale.setScalar(isHovered ? 1.1 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <boxGeometry args={[2, 2.5, 0.1]} />
      <meshStandardMaterial color={project.color} transparent opacity={0.8} />
    </mesh>
  );
}

export default function Projects({ setActiveSection }: ProjectsProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('projects');
    },
  });

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
            My <span className="bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
         <a
  href="https://github.com/abdiigashahun"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-full font-medium hover:bg-purple-500 hover:text-white transition-all duration-300">
    View All Projects
  </button>
</a>

        </motion.div>
      </div>
    </section>
  );
}