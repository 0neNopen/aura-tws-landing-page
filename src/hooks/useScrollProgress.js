import { useEffect, useRef, useCallback } from 'react';

/**
 * Calculates normalized scroll progress (0–1) within a container element.
 * 
 * Uses a ref-based value to avoid triggering React re-renders on every scroll tick.
 * Consumers read the current progress via the returned getter function.
 * 
 * @param {React.RefObject<HTMLElement>} containerRef - Ref to the scrollable container
 * @returns {{ getProgress: () => number }} Getter for the current normalized progress
 */
export default function useScrollProgress(containerRef) {
  const progressRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const calculate = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;

      if (scrollableDistance <= 0) {
        progressRef.current = 0;
        return;
      }

      // Distance the section has scrolled past the viewport top
      const scrolled = -rect.top;
      progressRef.current = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculate();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation on mount
    calculate();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [containerRef]);

  const getProgress = useCallback(() => progressRef.current, []);

  return { getProgress };
}
