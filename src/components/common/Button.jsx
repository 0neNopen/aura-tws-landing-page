import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button 
      className={`px-5 py-2.5 bg-ink text-paper text-sm font-medium tracking-wide uppercase rounded-lg transition-all duration-300 ease-out hover:bg-accent hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98] active:translate-y-0 ${className}`} 
      {...props}
    >
      {children || '[Button Component]'}
    </button>
  );
}
