import React from 'react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import useInView from '../hooks/useInView';

export default function SpecsSection() {
  const [ref, isInView] = useInView();
  const reveal = isInView ? 'is-visible' : '';

  const specs = [
    { category: 'Connectivity', value: 'Bluetooth 5.4 Low Latency (38ms)' },
    { category: 'Audio Codecs', value: 'LDAC, AAC, SBC, LC3' },
    { category: 'Water Resistance', value: 'IPX5 Earbuds / IPX4 Charging Case' },
    { category: 'Battery Life', value: '9 hrs Earbuds + 27 hrs Case (36 hrs Total)' },
    { category: 'Fast Charge', value: '10 min charge = 2 hours playback' },
    { category: 'Weight', value: '4.2g per earbud / 48g charging case' },
  ];

  return (
    <section id="specs" className="py-32 bg-paper border-t border-ink/10 relative z-20" ref={ref}>
      <Container>
        <div className={`mb-4 text-center motion-reveal ${reveal}`}>
          <Badge>Technical Specifications</Badge>
        </div>
        <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-16 max-w-2xl mx-auto text-center motion-reveal ${reveal}`}
          style={{ animationDelay: '80ms' }}
        >
          Architectural Data Sheet
        </h2>
        <div className={`divide-y divide-ink/10 max-w-3xl mx-auto border-t border-b border-ink/10 motion-reveal ${reveal}`}
          style={{ animationDelay: '160ms' }}
        >
          {specs.map((item, idx) => (
            <div key={idx} className="py-5 px-4 -mx-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 group transition-colors duration-200 hover:bg-ink/[0.02] rounded-lg">
              <span className="text-sm font-medium text-ink-muted uppercase tracking-wider transition-colors duration-200 group-hover:text-ink/80">{item.category}</span>
              <span className="font-display font-semibold text-ink/90 text-base md:text-lg transition-colors duration-200 group-hover:text-ink">{item.value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
