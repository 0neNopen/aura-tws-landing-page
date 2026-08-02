import React, { useState, useEffect } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple scrollspy
      const sections = ['storytelling', 'features', 'specs'];
      let current = '';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the middle of the viewport
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
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'storytelling', label: 'Story' },
    { id: 'features', label: 'Features' },
    { id: 'specs', label: 'Specs' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-all duration-500 ease-out ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-ink/10 shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container className="flex items-center justify-between">
        <div className="font-display font-bold text-lg tracking-tight">AURA TWS</div>
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                className={`relative transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 rounded-sm ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
                {/* Active indicator dot */}
                <span 
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <Button>Pre-Order</Button>
      </Container>
    </header>
  );
}
