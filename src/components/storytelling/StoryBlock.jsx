import React from 'react';
import Badge from '../common/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Transition duration for active-state visual changes (ms).
 * Matched to ProductStage crossfade for perceptual synchronization.
 */
const TRANSITION_DURATION_MS = 420;

export default function StoryBlock({ 
  step = '01', 
  totalSteps = '09',
  title = 'Chapter Title', 
  subtitle = 'Architectural Detail',
  description = 'Detailed breakdown of engineering craftsmanship and sound precision.',
  metrics = [],
  isActive = true,
  chapterIndex = 0,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <article 
      className="min-h-[90vh] flex flex-col justify-center py-20 md:py-24 px-4 md:px-0"
      aria-current={isActive ? 'step' : undefined}
      data-chapter-index={chapterIndex}
      style={{
        opacity: isActive ? 1 : 0.35,
        transform: isActive ? 'scale(1)' : 'scale(0.97)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity ${TRANSITION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${TRANSITION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      <div className="max-w-xl bg-paper/90 backdrop-blur-md border border-ink/10 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <Badge>{step} / {totalSteps}</Badge>
          <span className="text-xs font-mono tracking-widest text-ink-muted uppercase">
            {subtitle}
          </span>
        </div>
        
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
          {title}
        </h3>
        
        <p className="mt-5 text-ink-muted text-base md:text-lg leading-relaxed">
          {description}
        </p>

        {metrics && metrics.length > 0 && (
          <div className="mt-6 pt-6 border-t border-ink/10 grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-semibold text-ink text-sm md:text-base">
                  {m.value}
                </span>
                <span className="text-xs text-ink-muted mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
