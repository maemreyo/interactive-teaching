// src/app/global-success/unit-1/components/HomeworkInteractiveWord.tsx
// CREATED: 2025-01-27 - Interactive word component for homework reading

import React from 'react';
import { HomeworkTooltip } from './HomeworkTooltip';

interface HomeworkInteractiveWordProps {
  word: string;
  sound: string;
  phonetic: string;
  meaning: string;
  onWordClick: (word: string) => void;
}

export const HomeworkInteractiveWord = ({ 
  word, 
  sound, 
  phonetic, 
  meaning, 
  onWordClick 
}: HomeworkInteractiveWordProps) => {
  const isTargetSound = sound === '/ʌ/' || sound === '/əʊ/';
  const highlightClass = sound === '/ʌ/' 
    ? 'text-yellow-300 border-yellow-500' 
    : 'text-rose-400 border-rose-500';

  return (
    <span 
      className={`group relative inline-block cursor-pointer border-b-2 transition-all duration-200 hover:scale-105 ${
        isTargetSound ? highlightClass : 'text-white border-gray-500'
      }`}
      onClick={() => onWordClick(word)}
    >
      {word}
      <HomeworkTooltip phonetic={phonetic} meaning={meaning} />
    </span>
  );
};