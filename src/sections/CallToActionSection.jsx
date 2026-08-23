import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { fadeUp, staggerContainer } from '../motion/tokens';

export default function CallToActionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Gentle counter-scroll drift on the architectural grid backdrop
  const gridY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="cta" className="py-32 bg-paper border-t border-ink/10 text-center relative z-20 overflow-hidden" ref={sectionRef}>

      {/* Subtle Architectural Grid Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(to right, rgba(14, 14, 14, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 14, 14, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
        }}
      />

      <Container className="flex flex-col items-center relative z-10">
        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-6 max-w-3xl"
          >
            Sound Precision. Redefined.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-ink-muted text-base md:text-lg max-w-xl mb-12 leading-relaxed"
          >
            Available in limited batch production. Reserve your pair today in Paper White or Ink Black.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button className="px-10 py-5 text-lg">Order AURA TWS — $299</Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
