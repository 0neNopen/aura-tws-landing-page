import React, { useState } from 'react';
import { PRODUCT_IMAGES } from '../../utils/constants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Crossfade transition duration in milliseconds.
 * Kept subtle and premium — fast enough to not feel sluggish,
 * slow enough to eliminate the harshness of instant switching.
 */
const TRANSITION_DURATION_MS = 420;

export default function ProductStage({ activeIndex: controlledIndex }) {
  // Fallback state for isolated component usage (default to index 0: /foto1.webp)
  const [internalIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Use controlled prop if provided, otherwise default to internal state
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Ensure index remains strictly within valid bounds [0, PRODUCT_IMAGES.length - 1]
  const validIndex = Math.max(0, Math.min(currentIndex, PRODUCT_IMAGES.length - 1));

  return (
    <div 
      id="product-stage"
      className="sticky top-0 h-screen w-full flex items-center justify-center bg-paper z-0 overflow-hidden select-none px-4 md:px-8"
    >
      {/* Centered stage viewport with fixed responsive constraints to prevent layout shift */}
      <div className="relative w-full max-w-7xl h-[70vh] md:h-[85vh] flex items-center justify-center transform scale-110 md:scale-125">
        
        {/* Soft Radial Backlight for Studio Effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(245, 243, 238, 0) 65%)',
            transform: 'scale(1.2)',
          }}
        />

        {/* Image Container with Natural Blending (Multiply) + Feathered Edges */}
        <div 
          className="absolute inset-0 w-full h-full z-10 mix-blend-multiply"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)',
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)'
          }}
        >
          {PRODUCT_IMAGES.map((src, idx) => {
            const isActive = idx === validIndex;

            return (
              <img
                key={idx}
                src={src}
                alt={`AURA TWS Product Render Sequence - Frame ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                loading={idx === 0 ? "eager" : "lazy"}
                fetchpriority={idx === 0 ? "high" : "auto"}
                draggable={false}
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: prefersReducedMotion
                    ? 'none'
                    : `opacity ${TRANSITION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  // Active image receives pointer events; inactive images are inert
                  pointerEvents: isActive ? 'auto' : 'none',
                  // GPU-accelerated compositing — prevents paint thrashing during transitions
                  willChange: 'opacity',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
