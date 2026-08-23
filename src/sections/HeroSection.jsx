import React from 'react';
import { motion } from 'motion/react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ScrollCue from '../components/storytelling/ScrollCue';
import AuroraHero from '../components/ui/aurora-voice-hero';
import { heroEnter, staggerContainer } from '../motion/tokens';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      <AuroraHero />
      <Container className="relative z-10 flex flex-col items-start">
        <motion.div
          className="flex flex-col items-start"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={heroEnter} className="mb-6">
            <Badge>AURA TWS • Edition 01</Badge>
          </motion.div>

          <motion.h1
            variants={heroEnter}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-[1.05] max-w-4xl"
          >
            Architectural Sound Precision.
          </motion.h1>

          <motion.p
            variants={heroEnter}
            className="mt-6 text-lg sm:text-xl text-ink-muted max-w-2xl leading-relaxed"
          >
            Cinematic audio engineering, wrapped in a hand-milled titanium-aluminum enclosure.
          </motion.p>

          <motion.div
            variants={heroEnter}
            className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Button className="px-8 py-4 text-base">Pre-Order AURA TWS</Button>
            <a
              href="#storytelling"
              className="px-6 py-4 text-sm font-medium text-ink-muted hover:text-ink text-center rounded-lg transition-colors"
            >
              Explore Specifications &rarr;
            </a>
          </motion.div>

          <motion.div variants={heroEnter} className="mt-20 sm:mt-24">
            <ScrollCue />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
