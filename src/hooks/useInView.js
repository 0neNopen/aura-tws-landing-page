import { useState, useEffect, useRef } from 'react';

/**
 * Lightweight IntersectionObserver hook for viewport entrance detection.
 * Triggers once when the element enters the viewport, then disconnects.
 * 
 * @param {object} options
 * @param {number} [options.threshold=0.15] - Visibility threshold (0–1)
 * @param {boolean} [options.once=true] - If true, triggers only on first intersection
 * @returns {[React.RefObject, boolean]} Tuple of [ref to attach, whether element is in view]
 */
export default function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isInView];
}
