import React from 'react';

export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest bg-ink/5 border border-ink/10 text-ink-muted rounded-full ${className}`}>
      {children || '[Badge Component]'}
    </span>
  );
}
