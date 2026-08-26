import React from 'react';
import { motion } from 'motion/react';
import Container from '../common/Container';
import { fadeUp } from '../../motion/tokens';
import { FOOTER } from '../../content/copy';
import { FOOTER_LINKS } from '../../content/links';

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
          <div>{FOOTER.copyright}</div>
          <div className="flex space-x-8">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-ink transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
