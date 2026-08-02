import React from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import useInView from '../hooks/useInView';

export default function CallToActionSection() {
  const [ref, isInView] = useInView();
  const reveal = isInView ? 'is-visible' : '';

  return (
    <section id="cta" className="py-32 bg-paper border-t border-ink/10 text-center relative z-20" ref={ref}>
      <Container className="flex flex-col items-center">
        <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-6 max-w-3xl motion-reveal ${reveal}`}>
          Sound Precision. Redefined.
        </h2>
        <p className={`text-ink-muted text-base md:text-lg max-w-xl mb-12 leading-relaxed motion-reveal ${reveal}`}
          style={{ animationDelay: '100ms' }}
        >
          Available in limited batch production. Reserve your pair today in Paper White or Ink Black.
        </p>
        <div className={`motion-reveal ${reveal}`} style={{ animationDelay: '200ms' }}>
          <Button className="px-10 py-5 text-lg">Order AURA TWS — $299</Button>
        </div>
      </Container>
    </section>
  );
}
