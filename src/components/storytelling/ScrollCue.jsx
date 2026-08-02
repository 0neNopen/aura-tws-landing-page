import React from 'react';

export default function ScrollCue() {
  return (
    <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-ink-muted border border-ink/10 px-4 py-2 rounded-full bg-paper/60 motion-breathe">
      <span>Scroll to explore</span>
      <span>&darr;</span>
    </div>
  );
}
