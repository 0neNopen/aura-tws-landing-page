import { STORY_CHAPTERS } from '../content/story';

/**
 * Resolves a normalized scroll progress value (0–1) into a discrete frame index.
 * 
 * Uses the `range: [start, end]` metadata defined on each STORY_CHAPTER entry
 * for precise, non-uniform mapping. Falls back to linear distribution if no
 * range match is found.
 * 
 * This function is a pure utility — it has no React dependencies and no
 * coupling to ProductStage or any rendering layer.
 * 
 * @param {number} progress - Normalized scroll progress, clamped to [0, 1]
 * @param {number} [totalFrames] - Override for total frame count (defaults to STORY_CHAPTERS.length)
 * @returns {number} Frame index in [0, totalFrames - 1]
 */
export function resolveFrame(progress, totalFrames = STORY_CHAPTERS.length) {
  // Clamp input to valid domain
  const clamped = Math.max(0, Math.min(1, progress));

  // Attempt range-based resolution using chapter metadata
  for (let i = 0; i < STORY_CHAPTERS.length; i++) {
    const chapter = STORY_CHAPTERS[i];
    if (chapter.range) {
      const [start, end] = chapter.range;
      if (clamped >= start && clamped <= end) {
        return i;
      }
    }
  }

  // Fallback: linear distribution across total frames
  // Handles edge case where progress falls in a gap between defined ranges
  return Math.min(
    totalFrames - 1,
    Math.floor(clamped * totalFrames)
  );
}
