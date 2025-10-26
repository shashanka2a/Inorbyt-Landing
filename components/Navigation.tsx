'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section
      const sections = ['why-creators-need-reward-layer', 'how-it-works', 'for-creators-fans-freelancers', 'discover-reward-ecosystem', 'resources'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    // Close mobile menu on scroll
    if (isMobileMenuOpen) {
      window.addEventListener('scroll', () => setIsMobileMenuOpen(false));
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinks = ['How It Works', 'For Creators', 'Ecosystem', 'Resources'];

  const handleMobileMenuClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-[#f9f4e1]/10 shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group" 
            >
              <Image 
                src="/inorbyt.svg" 
                alt="InOrbyt" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => {
                const sectionIdMap: { [key: string]: string } = {
                  'How It Works': 'how-it-works',
                  'For Creators': 'for-creators-fans-freelancers',
                  'Ecosystem': 'discover-reward-ecosystem',
                  'Resources': 'resources'
                };
                const sectionId = sectionIdMap[item] || item.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.a
                    key={item}
                    href={`#${sectionId}`}
                    whileHover={{ y: -2 }}
                    className={`relative transition-colors duration-300 ${
                      isActive ? 'text-[#f9f4e1]' : 'text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
                    }`}
                    style={{ fontSize: '15px' }}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block relative px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden group"
              style={{ fontSize: '15px', fontWeight: 600 }}
            >
              <span className="relative z-10">Get Early Access</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
              />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-[#f9f4e1]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-[#f9f4e1]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#0a0e1a]/95 backdrop-blur-xl border-l border-[#f9f4e1]/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {/* Mobile Navigation Links */}
                <div className="flex-1 space-y-6">
                  {navLinks.map((item, index) => {
                    const sectionIdMap: { [key: string]: string } = {
                      'How It Works': 'how-it-works',
                      'For Creators': 'for-creators-fans-freelancers',
                      'Ecosystem': 'discover-reward-ecosystem',
                      'Resources': 'resources'
                    };
                    const sectionId = sectionIdMap[item] || item.toLowerCase().replace(/\s+/g, '-');
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.button
                          onClick={() => handleMobileMenuClick(sectionId)}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? 'bg-orange-500/20 text-[#f9f4e1] border-l-2 border-orange-500' 
                              : 'text-[#f9f4e1]/70 hover:text-[#f9f4e1] hover:bg-[#f9f4e1]/5'
                          }`}
                          style={{ fontSize: '18px', fontWeight: isActive ? 600 : 400 }}
                        >
                          {item}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Mobile CTA Button */}
                <div className="py-6 border-t border-[#f9f4e1]/10">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Early Access</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
