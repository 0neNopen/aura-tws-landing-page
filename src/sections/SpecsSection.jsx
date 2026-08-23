import React from 'react';
import { motion } from 'motion/react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import { fadeUp, staggerContainer } from '../motion/tokens';
import { SPECS } from '../content/specs';

export default function SpecsSection() {
  return (
    <section id="specs" className="py-32 bg-paper border-t border-ink/10 relative z-20">
      <Container>
        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <Badge>Technical Specifications</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-16 max-w-2xl text-center"
          >
            Architectural Data Sheet
          </motion.h2>
          <motion.div
            variants={staggerContainer(0.06)}
            className="divide-y divide-ink/10 max-w-3xl w-full border-t border-b border-ink/10"
          >
            {SPECS.map((item) => (
              <motion.div
                key={item.category}
                variants={fadeUp}
                className="py-5 px-4 -mx-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 group transition-colors duration-200 hover:bg-ink/[0.02] rounded-lg"
              >
                <span className="text-sm font-medium text-ink-muted uppercase tracking-wider transition-colors duration-200 group-hover:text-ink/80">{item.category}</span>
                <span className="font-display font-semibold text-ink/90 text-base md:text-lg transition-colors duration-200 group-hover:text-ink">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
