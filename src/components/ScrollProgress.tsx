import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (currentScrollY / scrollHeight) * 100;
      setScrollY(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 z-50 origin-left"
      style={{ scaleX: scrollY / 100 }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollY / 100 }}
      transition={{ duration: 0.1 }}
    />
  );
}