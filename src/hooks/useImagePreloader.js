import { useState, useEffect } from 'react';

/**
 * Preloads a list of image sources and reports real loading progress.
 *
 * Each source is loaded once via `new Image()`. Progress counts both
 * fulfilled and failed loads so a broken asset cannot wedge the UI at 90%.
 * The hook is idempotent for a stable `assets` array — pass a memoized
 * constant (e.g. an imported module-level array), not an inline literal.
 *
 * @param {string[]} assets - Image URLs to preload
 * @returns {{ isReady: boolean, progress: number, error: string|null }}
 *   progress is 0–100 and reaches 100 only when every asset has settled.
 */
export function useImagePreloader(assets = []) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assets.length) {
      setLoadedCount(0);
      setError(null);
      return;
    }

    let cancelled = false;

    setLoadedCount(0);
    setError(null);

    assets.forEach(src => {
      const img = new Image();
      const settle = (failed) => {
        if (cancelled) return;
        if (failed) setError(prev => prev ?? src);
        setLoadedCount(count => count + 1);
      };
      img.onload = () => settle(false);
      img.onerror = () => settle(true);
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [assets]);

  const progress = assets.length === 0
    ? 100
    : Math.round((loadedCount / assets.length) * 100);

  return {
    isReady: progress >= 100,
    progress,
    error,
  };
}
