import React from 'react';
import Container from '../common/Container';
import useInView from '../../hooks/useInView';

export default function Footer() {
  const [ref, isInView] = useInView();
  const reveal = isInView ? 'is-visible' : '';

  return (
    <footer className="bg-paper border-t border-ink/10 py-16 md:py-20 text-ink-muted text-sm" ref={ref}>
      <Container className={`flex flex-col md:flex-row justify-between items-center gap-8 motion-reveal ${reveal}`}>
        <div>&copy; 2026 AURA Sound Tech. All rights reserved.</div>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-ink transition-colors">Contact</a>
        </div>
      </Container>
    </footer>
  );
}
