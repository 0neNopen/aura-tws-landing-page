import React, { useEffect, useRef } from 'react';

/**
 * Page-level scroll progress indicator.
 * Uses direct DOM manipulation (ref-based) to avoid React re-renders on every scroll tick.
 * Positioned above the Navbar at z-[60].
 */
export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      barRef.current.style.width = `${progress}%`;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div 
        ref={barRef}
        className="h-full bg-accent w-0"
        style={{ transition: 'width 100ms linear' }}
      />
    </div>
  );
}
