import React, { useEffect, useState } from 'react';
import { animate, motion } from 'motion/react';
import Badge from '../common/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { duration, ease } from '../../motion/tokens';

/**
 * Dimmed-floor for inactive chapters. 0.55 keeps the large ink text
 * (title, metric values) at AA-readable contrast even while a chapter
 * waits its turn; small muted labels only reach full contrast when the
 * chapter activates. Lower values fail harder in audits.
 */
const INACTIVE_OPACITY = 0.55;

const blockVariants = {
  inactive: { opacity: INACTIVE_OPACITY, scale: 0.97 },
  active: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: ease.standard },
  },
};

/**
 * Animates the leading number of a metric ("4.2g per earbud", "-48dB …",
 * "±0.01mm") up from zero when its chapter activates. Values that don't
 * start with a number render statically. Skipped under reduced motion.
 */
function MetricValue({ value, active }) {
  const prefersReducedMotion = useReducedMotion();
  const match = value.match(/^([±+-]?)([\d.,]+)/);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || !active || prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const [, prefix, num] = match;
    const target = parseFloat(num.replace(/,/g, ''));
    if (Number.isNaN(target)) {
      setDisplay(value);
      return;
    }
    const decimals = (num.split('.')[1] || '').length;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: ease.outExpo,
      onUpdate: (v) => {
        setDisplay(prefix + v.toFixed(decimals) + value.slice(prefix.length + num.length));
      },
    });
    return () => controls.stop();
  }, [active, value, prefersReducedMotion]);

  return <>{display}</>;
}

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
  // Odd chapters dock right on desktop so the centred product stays clear
  // and the run of cards develops a rhythm instead of a uniform stack.
  const alignRight = chapterIndex % 2 === 1;

  return (
    <motion.article
      className={`min-h-[90vh] relative flex flex-col justify-center py-20 md:py-24 px-4 md:px-0 ${
        alignRight ? 'md:items-end' : 'md:items-start'
      }`}
      aria-current={isActive ? 'step' : undefined}
      data-chapter-index={chapterIndex}
      variants={blockVariants}
      initial={false}
      animate={isActive ? 'active' : 'inactive'}
    >
      {/* Ghost chapter numeral — typographic landmark, not content */}
      <span
        aria-hidden="true"
        className={`pointer-events-none select-none absolute top-8 md:top-12 font-display font-bold leading-none text-ink/[0.06] text-[7rem] md:text-[10rem] ${
          alignRight ? 'right-2 md:right-4' : 'left-2 md:left-2'
        }`}
      >
        {step}
      </span>

      <div className="relative max-w-xl w-full bg-paper/90 backdrop-blur-md border border-ink/10 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <Badge>{step} / {totalSteps}</Badge>
          <span className="text-xs font-mono tracking-widest text-ink-muted uppercase">
            {subtitle}
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
          {title}
        </h2>

        <p className="mt-5 text-ink-muted text-base md:text-lg leading-relaxed">
          {description}
        </p>

        {metrics && metrics.length > 0 && (
          <div className="mt-6 pt-6 border-t border-ink/10 grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-semibold text-ink text-sm md:text-base">
                  <MetricValue value={m.value} active={isActive} />
                </span>
                <span className="text-xs text-ink-muted mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
