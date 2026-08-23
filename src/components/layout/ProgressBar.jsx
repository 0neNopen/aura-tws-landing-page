import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Page-level scroll progress indicator.
 * Driven by Motion's scrollYProgress (rAF-scheduled internally, no React
 * re-renders) and smoothed with a spring. Compositor-only: scaleX transform.
 */
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
