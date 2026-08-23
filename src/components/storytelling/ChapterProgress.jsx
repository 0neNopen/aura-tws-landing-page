import React from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { duration, ease } from '../../motion/tokens';

/**
 * Vertical chapter rail. Fades in only while the storytelling section is on
 * screen; the active dot grows and takes the accent colour, and every dot
 * is a jump link to its chapter. Desktop only — mobile cards span the full
 * width, so a rail would crowd them.
 */
export default function ChapterProgress({ sectionRef, activeIndex, total }) {
  const inView = useInView(sectionRef, { amount: 0.01 });

  const jumpTo = (idx) => {
    const el = document.querySelector(`[data-chapter-index="${idx}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <AnimatePresence>
      {inView && (
        <motion.nav
          aria-label="Chapters"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: duration.fast, ease: ease.standard }}
          className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col"
        >
          {Array.from({ length: total }, (_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to chapter ${i + 1} of ${total}`}
                aria-current={isActive ? 'step' : undefined}
                className="group flex items-center justify-center w-10 h-10"
              >
                <motion.span
                  className={`block rounded-full ${
                    isActive ? 'bg-accent' : 'bg-ink/25 group-hover:bg-ink/50'
                  }`}
                  animate={{ width: isActive ? 9 : 6, height: isActive ? 9 : 6 }}
                  transition={ease.spring}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
