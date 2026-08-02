/**
 * Hook placeholder for asset preloader functionality.
 */
export function useImagePreloader(assets = []) {
  return {
    isReady: true,
    progress: 100,
    images: [],
    error: null,
  };
}
