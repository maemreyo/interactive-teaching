// src/app/global-success/unit-1/components/WordCard.tsx
// CREATED: 2025-01-27 - Reusable word card component for pronunciation practice

import React from 'react';
import { SpeakerIcon } from './SpeakerIcon';
import { PronunciationWord } from './types';

interface WordCardProps extends PronunciationWord {
  onPlaySound: (word: string) => void;
  colorScheme?: 'cyan' | 'rose' | 'emerald' | 'purple' | 'orange' | 'blue';
  variant?: 'default' | 'compact';
}

export const WordCard = ({ 
  word, 
  phonetic, 
  onPlaySound, 
  colorScheme = 'cyan',
  variant = 'default'
}: WordCardProps) => {
  const colorClasses = {
    cyan: {
      button: 'bg-cyan-500 hover:bg-cyan-400 focus:ring-cyan-300',
      phonetic: 'text-cyan-400'
    },
    rose: {
      button: 'bg-rose-500 hover:bg-rose-400 focus:ring-rose-300',
      phonetic: 'text-rose-400'
    },
    emerald: {
      button: 'bg-emerald-500 hover:bg-emerald-400 focus:ring-emerald-300',
      phonetic: 'text-emerald-400'
    },
    purple: {
      button: 'bg-purple-500 hover:bg-purple-400 focus:ring-purple-300',
      phonetic: 'text-purple-400'
    },
    orange: {
      button: 'bg-orange-500 hover:bg-orange-400 focus:ring-orange-300',
      phonetic: 'text-orange-400'
    },
    blue: {
      button: 'bg-blue-500 hover:bg-blue-400 focus:ring-blue-300',
      phonetic: 'text-blue-400'
    }
  };

  const colors = colorClasses[colorScheme];

  if (variant === 'compact') {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex items-center justify-between transition-all duration-300 transform hover:scale-105">
        <div>
          <p className="text-2xl font-bold text-white">{word}</p>
          <p className="text-lg text-gray-400 font-mono">{phonetic}</p>
        </div>
        <button
          onClick={() => onPlaySound(word)}
          className="bg-gray-700 text-white rounded-full p-3 transform transition-transform duration-200 hover:bg-gray-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-500"
          aria-label={`Phát âm từ ${word}`}
        >
          <SpeakerIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/20">
      <div className="text-center sm:text-left mb-4 sm:mb-0">
        <p className="text-3xl font-bold text-white">{word}</p>
        <p className={`text-xl font-mono ${colors.phonetic}`}>{phonetic}</p>
      </div>
      <button
        onClick={() => onPlaySound(word)}
        className={`${colors.button} text-white rounded-full p-4 transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4 shadow-lg`}
        aria-label={`Phát âm từ ${word}`}
      >
        <SpeakerIcon />
      </button>
    </div>
  );
};