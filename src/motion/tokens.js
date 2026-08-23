/**
 * Motion design tokens — single source of truth for animation timing.
 *
 * Durations are seconds (Motion convention). Easing curves reuse the
 * project's existing identity: `outExpo` is the curve already used by
 * `.motion-reveal`, `standard` is the Material-style curve from the old
 * crossfade system.
 */
export const duration = {
  fast: 0.25,
  base: 0.42,
  reveal: 0.8,
  hero: 0.9,
};

export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  standard: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', stiffness: 260, damping: 30 },
  springSoft: { type: 'spring', stiffness: 120, damping: 20 },
};

/** Parent variant: orchestrates staggered children on viewport entry. */
export const staggerContainer = (stagger = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Child variant: fades and rises into place. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.outExpo },
  },
};

/** Child variant for the hero entrance (slightly longer, page-load driven). */
export const heroEnter = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.hero, ease: ease.outExpo },
  },
};
