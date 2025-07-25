// src/app/global-success/unit-1/components/HomeworkTooltip.tsx
// CREATED: 2025-01-27 - Tooltip component for homework interactive words

import React from 'react';

interface HomeworkTooltipProps {
  phonetic: string;
  meaning: string;
}

export const HomeworkTooltip = ({ phonetic, meaning }: HomeworkTooltipProps) => (
  <div className="absolute bottom-full mb-2 w-max max-w-xs p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
    <p className="font-mono text-cyan-400">{phonetic}</p>
    <p className="font-bold">{meaning}</p>
  </div>
);