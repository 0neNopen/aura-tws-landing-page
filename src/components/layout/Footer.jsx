import React from 'react';
import { motion } from 'motion/react';
import Container from '../common/Container';
import { fadeUp } from '../../motion/tokens';

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-ink/10 py-16 md:py-20 text-ink-muted text-sm">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div>&copy; 2026 AURA Sound Tech. All rights reserved.</div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-ink transition-colors">Contact</a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
