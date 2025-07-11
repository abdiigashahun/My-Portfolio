import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


interface AboutProps {
  setActiveSection: (section: string) => void;
}

export default function About({ setActiveSection }: AboutProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('about');
    },
  });

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-6">
            About <span className="bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-cyan-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div className="relative mx-auto md:mx-0 w-80 h-80 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
              <img
               src="/images/abdi.jpg"
                alt="Profile"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-800"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
  I'm a passionate full-stack developer skilled in building modern web applications using React, Node.js, and Tailwind CSS. I create scalable, responsive platforms with a focus on clean design and smooth user experience.
</p>

<p className="text-lg text-gray-300 leading-relaxed">
  I’ve recently started working with AI-powered tools, integrating technologies like Supabase, Vapi, and Clerk to bring intelligent, real-time features into SaaS applications. My goal is to build interactive, AI-enhanced platforms that solve real-world problems.
</p>



            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-purple-500 mb-2">10+</h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-500 mb-2">3+</h3>
                <p className="text-gray-300">Years Experience</p>
              </div>
            </div>
<a href="/resume.pdf" download>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              Download Resume
            </motion.button></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}