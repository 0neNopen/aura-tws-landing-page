import React from 'react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ScrollCue from '../components/storytelling/ScrollCue';
import AuroraHero from '../components/ui/aurora-voice-hero';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      <AuroraHero />
      <Container className="relative z-10 flex flex-col items-start">
        <div className="mb-6 motion-hero-enter">
          <Badge>AURA TWS • Edition 01</Badge>
        </div>

        <h1 
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-[1.05] max-w-4xl motion-hero-enter"
          style={{ animationDelay: '100ms' }}
        >
          Architectural Sound Precision.
        </h1>

        <p 
          className="mt-6 text-lg sm:text-xl text-ink-muted max-w-2xl leading-relaxed motion-hero-enter"
          style={{ animationDelay: '220ms' }}
        >
          Experience cinematic audio engineering encapsulated in a minimal, hand-milled titanium-aluminum enclosure.
        </p>

        <div 
          className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto motion-hero-enter"
          style={{ animationDelay: '360ms' }}
        >
          <Button className="px-8 py-4 text-base">Pre-Order AURA TWS</Button>
          <a 
            href="#storytelling" 
            className="px-6 py-4 text-sm font-medium text-ink-muted hover:text-ink text-center rounded-lg transition-colors"
          >
            Explore Specifications &rarr;
          </a>
        </div>

        <div 
          className="mt-20 sm:mt-24 motion-hero-enter"
          style={{ animationDelay: '600ms' }}
        >
          <ScrollCue />
        </div>
      </Container>
    </section>
  );
}
