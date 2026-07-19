'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Start' },
  { id: 'services', label: 'Services' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [nodes, setNodes] = useState([]);

  // Smooth spring progress mapping
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate dynamic section offsets on mount & resize
  useEffect(() => {
    const calculatePositions = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const calculatedNodes = SECTIONS.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return null;

        // Position percentage relative to total scrollable height
        const progress = Math.min(1, Math.max(0, el.offsetTop / docHeight));
        return {
          id: sec.id,
          label: sec.label,
          progress,
        };
      }).filter(Boolean);

      setNodes(calculatedNodes);
    };

    calculatePositions();
    
    // Recalculate slightly later to account for image/font load layout shifts
    const timer = setTimeout(calculatePositions, 800);
    window.addEventListener('resize', calculatePositions);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  // Monitor scroll progress changes
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setCurrentProgress(v);
    });
  }, [scrollYProgress]);

  // Smooth anchor scrolling
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-full max-w-7xl px-6 md:px-12 pointer-events-none hidden sm:block z-40">
      <div className="relative h-full w-full">
        
        {/* Minimalist dashed background trace line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] border-l border-dashed border-[#0a1411]/15" />
        
        {/* Solid active green progress line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-0 top-0 w-[1.5px] h-full bg-grass-accent origin-top"
        />
        
        {/* Glowing active tracker tip dot */}
        <motion.div
          style={{ top: dotTop }}
          className="absolute left-0 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-grass-accent border-2 border-[#fcfbf9] shadow-[0_0_10px_rgba(63,174,106,0.8)] -translate-y-1/2 z-50"
        />

        {/* Milestone Nodes */}
        {nodes.map((node) => {
          // Node is active when the scroll line progress has reached or passed it
          const isActive = currentProgress >= node.progress - 0.01;

          return (
            <div
              key={node.id}
              style={{ top: `${node.progress * 100}%` }}
              className="absolute left-0 -translate-y-1/2 flex items-center group pointer-events-auto"
            >
              {/* Pulse ripple wave effect on active nodes */}
              {isActive && (
                <span className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-grass-accent/25 animate-ping pointer-events-none" />
              )}

              {/* Interactive Node Point */}
              <button
                onClick={() => scrollToSection(node.id)}
                aria-label={`Scroll to ${node.label}`}
                className={`relative z-30 -translate-x-1/2 w-[9px] h-[9px] rounded-full border-2 transition-all duration-500 hover:scale-125 focus:outline-none ${
                  isActive
                    ? 'bg-grass-accent border-grass-accent shadow-[0_0_8px_rgba(63,174,106,0.6)]'
                    : 'bg-white border-luxury-border hover:border-grass-accent'
                }`}
              />

              {/* Text label next to node */}
              <span
                onClick={() => scrollToSection(node.id)}
                className={`ml-4 text-[9px] font-mono tracking-widest uppercase cursor-pointer select-none transition-all duration-500 ${
                  isActive
                    ? 'text-[#0a1411] font-semibold opacity-100 translate-x-0'
                    : 'text-[#0a1411]/30 opacity-40 hover:opacity-80 translate-x-[-2px] hover:translate-x-0'
                }`}
              >
                {node.label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}
