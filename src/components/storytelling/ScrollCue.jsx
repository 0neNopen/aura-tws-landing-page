import React from 'react';
import { motion } from 'motion/react';

export default function ScrollCue() {
  return (
    <motion.div
      className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-ink-muted border border-ink/10 px-4 py-2 rounded-full bg-paper/60"
      animate={{ y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
    >
      <span>Scroll to explore</span>
      <span>&darr;</span>
    </motion.div>
  );
}
