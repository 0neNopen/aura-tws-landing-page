import React from 'react';
import { motion } from 'motion/react';

export default function Button({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`px-5 py-2.5 bg-ink text-paper text-sm font-medium tracking-wide uppercase rounded-lg transition-colors duration-300 ease-out hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${className}`}
      {...props}
    >
      {children || '[Button Component]'}
    </motion.button>
  );
}
