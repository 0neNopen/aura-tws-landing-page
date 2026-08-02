import React from 'react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import useInView from '../hooks/useInView';

export default function FeatureGridSection() {
  const [ref, isInView] = useInView();
  const reveal = isInView ? 'is-visible' : '';

  return (
    <section id="features" className="py-32 bg-paper border-t border-ink/10 relative z-20" ref={ref}>
      <Container>
        <div className={`mb-4 motion-reveal ${reveal}`}>
          <Badge>Engineering Highlights</Badge>
        </div>
        <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-16 max-w-2xl motion-reveal ${reveal}`}
          style={{ animationDelay: '80ms' }}
        >
          Crafted without compromise.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className={`p-8 border border-ink/10 bg-paper/80 rounded-2xl motion-reveal ${reveal} transition-all duration-300 ease-out hover:bg-white hover:shadow-sm hover:-translate-y-0.5`}
            style={{ animationDelay: '160ms' }}
          >
            <h3 className="font-display font-bold text-xl text-ink">Active Noise Cancellation</h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Dual-feedforward hybrid microphone system canceling up to 48dB of ambient acoustic noise.
            </p>
          </div>
          <div className={`p-8 border border-ink/10 bg-paper/80 rounded-2xl motion-reveal ${reveal} transition-all duration-300 ease-out hover:bg-white hover:shadow-sm hover:-translate-y-0.5`}
            style={{ animationDelay: '240ms' }}
          >
            <h3 className="font-display font-bold text-xl text-ink">36 Hours Playback</h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              High-density energy cells providing 9 hours per earbud and 27 additional hours via charging case.
            </p>
          </div>
          <div className={`p-8 border border-ink/10 bg-paper/80 rounded-2xl motion-reveal ${reveal} transition-all duration-300 ease-out hover:bg-white hover:shadow-sm hover:-translate-y-0.5`}
            style={{ animationDelay: '320ms' }}
          >
            <h3 className="font-display font-bold text-xl text-ink">Custom Titanium Driver</h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              11mm dynamic diaphragm tuned to studio reference curve for pristine acoustic separation.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
