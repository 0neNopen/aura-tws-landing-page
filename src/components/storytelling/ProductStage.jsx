import React from 'react';
import { motion, useTransform } from 'motion/react';
import { PRODUCT_IMAGES } from '../../content/story';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { duration, ease } from '../../motion/tokens';

/**
 * Sticky full-screen product stage.
 *
 * Two motion layers coexist here:
 *  - Discrete: chapters crossfade by opacity when `activeIndex` changes.
 *  - Continuous: `scrollProgress` (a MotionValue) drives a gentle scale +
 *    vertical drift on the whole stage, so the product breathes with the
 *    user's own scrolling between chapters.
 *
 * Under `prefers-reduced-motion` the continuous layer is dropped entirely
 * and the crossfade collapses to an instant swap.
 */
export default function ProductStage({ activeIndex, scrollProgress, ready = true, preloadError = null }) {
  const prefersReducedMotion = useReducedMotion();

  // Ensure index remains strictly within valid bounds [0, PRODUCT_IMAGES.length - 1]
  const validIndex = Math.max(0, Math.min(activeIndex ?? 0, PRODUCT_IMAGES.length - 1));

  // Continuous cinematic scrub — follows the user's own scrolling.
  const scrubScale = useTransform(scrollProgress, [0, 0.5, 1], [1.04, 1, 0.97]);
  const scrubY = useTransform(scrollProgress, [0, 1], [14, -14]);

  return (
    <div
      id="product-stage"
      className="sticky top-0 h-screen w-full flex items-center justify-center bg-paper z-0 overflow-hidden select-none px-4 md:px-8"
    >
      {/* Responsive base zoom lives on this plain wrapper so it never fights
          the Motion-driven transform on the scrub layer inside it. */}
      <div className="relative w-full max-w-7xl h-[70vh] md:h-[85vh] flex items-center justify-center transform scale-110 md:scale-125">

        {/* Soft Radial Backlight for Studio Effect */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(245, 243, 238, 0) 65%)',
            transform: 'scale(1.2)',
          }}
        />

        {/* Image Container: fade-in once preloaded, natural multiply blending */}
        {preloadError && !ready ? (
          /* Graceful degradation: at least one asset failed and the sequence
             never became ready — surface it instead of an empty stage. */
          <div
            role="status"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          >
            <p className="font-display text-xl md:text-2xl text-ink mb-3">
              AURA TWS — Visual Sequence Unavailable
            </p>
            <p className="text-sm text-ink-muted max-w-md">
              Some product imagery failed to load. Please check your connection and refresh.
            </p>
          </div>
        ) : (
        <motion.div
          className="absolute inset-0 w-full h-full z-10 mix-blend-multiply"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: duration.base, ease: 'easeOut' }}
          style={{
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)',
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)',
            ...(prefersReducedMotion ? {} : { scale: scrubScale, y: scrubY }),
          }}
        >
          {PRODUCT_IMAGES.map((src, idx) => {
            const isActive = idx === validIndex;

            return (
              <motion.img
                key={src}
                src={src}
                alt={`AURA TWS Product Render Sequence - Frame ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                draggable={false}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: duration.base, ease: ease.standard }
                }
              />
            );
          })}
        </motion.div>
        )}
      </div>
    </div>
  );
}
