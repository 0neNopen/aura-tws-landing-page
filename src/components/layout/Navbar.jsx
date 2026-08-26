import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Container from '../common/Container';
import Button from '../common/Button';
import { duration, ease } from '../../motion/tokens';
import { ORDER_URL } from '../../content/links';

const NAV_THRESHOLDS = {
  scrolled: 20,   // px scrolled before the bar gains its backdrop
  reveal: 120,    // below this the bar is always shown on scroll-up intent
};

const NAV_LINKS = [
  { id: 'storytelling', label: 'Story' },
  { id: 'features', label: 'Features' },
  { id: 'specs', label: 'Specs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up — the bar gets out of the way
  // while reading and returns the moment intent reverses.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    setScrolled(latest > NAV_THRESHOLDS.scrolled);
    if (menuOpen) {
      setHidden(false);
      return;
    }
    if (latest < NAV_THRESHOLDS.reveal) setHidden(false);
    else if (latest > previous) setHidden(true);
    else setHidden(false);
  });

  // Scrollspy
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      let current = '';
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={ease.springSoft}
      className={`fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
        scrolled || menuOpen
          ? 'bg-paper/85 backdrop-blur-md border-b border-ink/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container className="flex items-center justify-between">
        <a href="#hero" className="font-display font-bold text-lg tracking-tight">
          AURA TWS
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 rounded-sm py-2 ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href={ORDER_URL}>Pre-Order</Button>
          </div>

          {/* Mobile menu toggle — 44px+ touch target */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(open => !open)}
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-lg border border-ink/10 bg-paper/60 gap-[5px]"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: duration.fast, ease: ease.standard }}
              className="block w-5 h-[2px] bg-ink rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: duration.fast, ease: ease.standard }}
              className="block w-5 h-[2px] bg-ink rounded-full"
            />
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: duration.fast, ease: ease.standard }}
            className="md:hidden overflow-hidden bg-paper/95 backdrop-blur-md border-b border-ink/10"
          >
            <Container className="flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`min-h-[44px] flex items-center px-2 text-base font-medium border-l-2 transition-colors ${
                    activeSection === link.id
                      ? 'border-accent text-ink'
                      : 'border-transparent text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pb-2">
                <Button href={ORDER_URL} className="w-full min-h-[44px]">Pre-Order</Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
