/**
 * Legacy scroll sync hook — preserved for backward compatibility.
 * 
 * All scroll synchronization logic has been modularized into:
 *   - useScrollProgress  (normalized 0–1 scroll progress)
 *   - frameResolver      (pure progress → index mapping)
 *   - useFrameSync       (orchestrator: combines the above, gates re-renders)
 * 
 * New consumers should import useFrameSync directly.
 * 
 * @param {React.RefObject<HTMLElement>} containerRef - Target section element ref
 * @param {number} totalItems - Total number of frames
 * @returns {number} activeIndex - Current active index (0-based)
 */
import useFrameSync from './useFrameSync';

export default function useScrollSync(containerRef, totalItems = 9) {
  return useFrameSync(containerRef, totalItems);
}
