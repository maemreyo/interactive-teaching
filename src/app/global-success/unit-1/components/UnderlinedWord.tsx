// src/app/global-success/unit-1/components/UnderlinedWord.tsx
// CREATED: 2025-01-27 - Word component with underlined pronunciation focus

import React from 'react';

interface UnderlinedWordProps {
  parts: [string, string, string];
  className?: string;
}

export const UnderlinedWord = ({ parts, className = '' }: UnderlinedWordProps) => (
  <span className={className}>
    {parts[0]}
    <u className="text-yellow-300 no-underline border-b-2 border-yellow-300">
      {parts[1]}
    </u>
    {parts[2]}
  </span>
);