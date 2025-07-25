// src/app/global-success/unit-1/components/HomeworkReadingPassage.tsx
// CREATED: 2025-01-27 - Reading passage component for homework

import React from 'react';
import { ReadingPassage } from './types';
import { HomeworkInteractiveWord } from './HomeworkInteractiveWord';

interface HomeworkReadingPassageProps {
  passage: ReadingPassage;
  onWordClick: (word: string) => void;
  passageIndex: number;
}

export const HomeworkReadingPassage = ({ 
  passage, 
  onWordClick, 
  passageIndex 
}: HomeworkReadingPassageProps) => {
  return (
    <article className="bg-gray-900/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white pb-3 border-b border-gray-600 flex-1">
          {passage.title}
        </h2>
        <div className="ml-4 bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
          {passageIndex + 1}/3
        </div>
      </div>
      
      <div className="text-xl sm:text-2xl leading-relaxed">
        {passage.content.map((item, i) => {
          if (item.type === 'text') {
            return <span key={i}>{item.content}</span>;
          }
          return (
            <HomeworkInteractiveWord 
              key={i} 
              word={item.word!}
              sound={item.sound!}
              phonetic={item.phonetic!}
              meaning={item.meaning!}
              onWordClick={onWordClick}
            />
          );
        })}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            📖 Từ vựng: {passage.content.filter(item => item.type === 'interactive').length} từ
          </span>
          <span>
            🎯 Âm: {passage.content.filter(item => item.sound === '/ʌ/').length} /ʌ/ • {passage.content.filter(item => item.sound === '/əʊ/').length} /əʊ/
          </span>
        </div>
      </div>
    </article>
  );
};