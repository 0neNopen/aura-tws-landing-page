import React from 'react';
import { motion } from 'motion/react';

/**
 * Primary CTA button. Renders as a styled <a> when `href` is provided,
 * otherwise as a <button>. Always pass either `href` or an `onClick` —
 * there is no meaningful default action for a CTA.
 */
export default function Button({ children, className = '', href, ...props }) {
  const classes = `px-5 py-2.5 bg-ink text-paper text-sm font-medium tracking-wide uppercase rounded-lg transition-colors duration-300 ease-out hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper inline-block text-center ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
