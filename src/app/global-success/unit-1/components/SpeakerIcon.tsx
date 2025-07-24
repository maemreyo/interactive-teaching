// src/app/global-success/unit-1/components/SpeakerIcon.tsx
// CREATED: 2025-01-27 - SVG Icon component for pronunciation button

import React from 'react';

export const SpeakerIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

interface MicIconProps {
  isListening?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MicIcon = ({ isListening = false, size = 'md' }: MicIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <svg 
      className={`${sizeClasses[size]} text-white transition-all ${
        isListening ? 'animate-pulse scale-110' : ''
      }`} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"></path>
    </svg>
  );
};