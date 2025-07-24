// src/app/global-success/unit-1/components/SoundInstructionCard.tsx
// CREATED: 2025-01-27 - Detailed instruction card for pronunciation sounds

import React from 'react';
import { MouthShapeIcon } from './MouthShapeIcon';
import { WordCard } from './WordCard';
import { PronunciationWord } from './types';

interface SoundInstructionCardProps {
  sound: string;
  description: string;
  instructions: string[];
  commonSpellings: string[];
  examples: PronunciationWord[];
  mouthShape: 'relaxed' | 'rounded';
  colorScheme: 'cyan' | 'rose';
  onPlaySound: (word: string) => void;
}

export const SoundInstructionCard = ({
  sound,
  description,
  instructions,
  commonSpellings,
  examples,
  mouthShape,
  colorScheme,
  onPlaySound
}: SoundInstructionCardProps) => {
  const colorClasses = {
    cyan: {
      border: 'border-cyan-500/30',
      shadow: 'shadow-cyan-500/10',
      text: 'text-cyan-400',
      listText: 'text-cyan-200',
      spellingBg: 'bg-cyan-900',
      spellingText: 'text-cyan-200'
    },
    rose: {
      border: 'border-rose-500/30',
      shadow: 'shadow-rose-500/10',
      text: 'text-rose-400',
      listText: 'text-rose-200',
      spellingBg: 'bg-rose-900',
      spellingText: 'text-rose-200'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <section className={`bg-gray-800/70 border ${colors.border} rounded-2xl p-6 shadow-2xl ${colors.shadow}`}>
      <div className="flex items-center mb-4">
        <MouthShapeIcon shape={mouthShape} />
        <h2 className={`text-5xl font-bold ml-4 ${colors.text} font-mono`}>{sound}</h2>
      </div>
      
      <p className="text-gray-300 mb-4">{description}</p>
      
      <ul className={`list-disc list-inside space-y-2 mb-6 ${colors.listText}`}>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      
      <h3 className="font-bold text-lg mb-3 text-white">Các mặt chữ thường gặp:</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {commonSpellings.map(spelling => (
          <span 
            key={spelling} 
            className={`${colors.spellingBg} ${colors.spellingText} px-3 py-1 rounded-full font-mono`}
          >
            {spelling}
          </span>
        ))}
      </div>
      
      <div className="space-y-3">
        {examples.map((item) => (
          <WordCard 
            key={item.word} 
            {...item} 
            onPlaySound={onPlaySound}
            colorScheme={colorScheme}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
};