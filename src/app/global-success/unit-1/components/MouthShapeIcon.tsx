// src/app/global-success/unit-1/components/MouthShapeIcon.tsx
// CREATED: 2025-01-27 - Mouth shape visualization icon for pronunciation guidance

import React from 'react';

interface MouthShapeIconProps {
  shape?: 'relaxed' | 'rounded';
  size?: number;
}

export const MouthShapeIcon = ({ shape = 'relaxed', size = 60 }: MouthShapeIconProps) => {
  if (shape === 'rounded') {
    // Miệng tròn cho âm /əʊ/
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="text-rose-400">
        <ellipse cx="50" cy="50" rx="30" ry="20" fill="currentColor" />
      </svg>
    );
  }
  
  // Miệng thả lỏng cho âm /ʌ/
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="text-cyan-400">
      <path 
        d="M 20 50 Q 50 60 80 50" 
        stroke="currentColor" 
        strokeWidth="8" 
        fill="none" 
        strokeLinecap="round" 
      />
    </svg>
  );
};