import { useState, useEffect } from 'react';
import { useScroll } from 'motion/react';
import { resolveFrame } from '../utils/frameResolver';

/**
 * Resolves the discrete active frame index from scroll progress.
 *
 * Progress is sourced from Motion's single `useScroll` pipeline (the same
 * MotionValue consumed by ProductStage's continuous scrub), so the discrete
 * chapter state and the continuous transforms can never drift apart.
 * A React state update is triggered only when the resolved index actually
 * changes — preventing unnecessary re-renders on every scroll tick.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - Ref to the section element
 * @param {number} [totalFrames] - Total frames (defaults to STORY_CHAPTERS.length)
 * @returns {number} activeIndex - Current resolved frame index (0-based)
 */
export default function useFrameSync(containerRef, totalFrames) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    // Read the current value once and subscribe to subsequent changes.
    // resolveFrame is pure, so re-checking on each emission is cheap and
    // state updates fire only when the visible frame genuinely changes.
    let lastIndex = 0;

    const sync = (progress) => {
      const index = resolveFrame(progress, totalFrames);
      if (index !== lastIndex) {
        lastIndex = index;
        setActiveIndex(index);
      }
    };

    sync(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', sync);
    return unsubscribe;
  }, [scrollYProgress, totalFrames]);

  return activeIndex;
}
