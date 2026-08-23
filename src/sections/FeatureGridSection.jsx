import React from 'react';
import { motion } from 'motion/react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import { fadeUp, staggerContainer } from '../motion/tokens';
import { FEATURES } from '../content/features';

export default function FeatureGridSection() {
  return (
    <section id="features" className="py-32 bg-paper border-t border-ink/10 relative z-20">
      <Container>
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <Badge>Engineering Highlights</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-16 max-w-2xl"
          >
            Crafted without compromise.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="p-8 border border-ink/10 bg-paper/80 rounded-2xl transition-all duration-300 ease-out hover:bg-white hover:shadow-sm hover:-translate-y-0.5"
              >
                <h3 className="font-display font-bold text-xl text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                  {feature.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
