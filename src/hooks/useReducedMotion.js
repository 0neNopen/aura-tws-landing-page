import { useState, useEffect } from 'react';

/**
 * Detects the user's prefers-reduced-motion system preference.
 * Subscribes to changes via MediaQueryList so it stays in sync
 * if the user toggles the setting while the page is open.
 * 
 * @returns {boolean} true if the user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onChange = (e) => {
      setPrefersReduced(e.matches);
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
