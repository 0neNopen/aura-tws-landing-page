import { useState, useEffect, useRef } from 'react';
import useScrollProgress from './useScrollProgress';
import { resolveFrame } from '../utils/frameResolver';

/**
 * Orchestrating hook that combines scroll progress detection with frame resolution.
 * 
 * Subscribes to scroll events via useScrollProgress, resolves the current frame
 * index via the Frame Resolver, and only triggers a React state update when
 * the resolved index actually changes — preventing unnecessary re-renders.
 * 
 * @param {React.RefObject<HTMLElement>} containerRef - Ref to the scrollable container
 * @param {number} [totalFrames=9] - Total number of frames in the product sequence
 * @returns {number} activeIndex - Current resolved frame index (0-based)
 */
export default function useFrameSync(containerRef, totalFrames = 9) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(0);
  const { getProgress } = useScrollProgress(containerRef);

  useEffect(() => {
    let ticking = false;

    const sync = () => {
      const progress = getProgress();
      const index = resolveFrame(progress, totalFrames);

      // Only update React state when the frame actually changes
      if (index !== lastIndexRef.current) {
        lastIndexRef.current = index;
        setActiveIndex(index);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          sync();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial sync on mount
    sync();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [getProgress, totalFrames]);

  return activeIndex;
}
