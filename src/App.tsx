import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-x-hidden bg-gray-900">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-xl font-light"
              >
                Loading Portfolio...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <Navigation
            sections={sections}
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />
          
          <main>
            <Hero setActiveSection={setActiveSection} />
            <About setActiveSection={setActiveSection} />
            <Skills setActiveSection={setActiveSection} />
            <Projects setActiveSection={setActiveSection} />
            <Contact setActiveSection={setActiveSection} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;