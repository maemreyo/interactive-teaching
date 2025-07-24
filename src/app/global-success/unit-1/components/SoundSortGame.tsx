// src/app/global-success/unit-1/components/SoundSortGame.tsx
// CREATED: 2025-01-27 - Sound sorting game component

import React, { useState } from 'react';
import { UnderlinedWord } from './UnderlinedWord';
import { SoundSortWord } from './types';

interface SoundSortGameProps {
  gameData: SoundSortWord[];
  onGameEnd: (score: number, total: number) => void;
}

export const SoundSortGame = ({ gameData, onGameEnd }: SoundSortGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentWord = gameData[currentIndex];

  const handleAnswer = (chosenSound: '/ʌ/' | '/əʊ/') => {
    if (feedback) return;

    const isCorrect = chosenSound === currentWord.sound;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < gameData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onGameEnd(isCorrect ? score + 10 : score, gameData.length);
      }
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-2xl font-bold text-green-400 mb-2">Game 1: Phân Loại Âm Thanh</h3>
      <p className="text-gray-400 mb-6">Từ này chứa âm /ʌ/ hay /əʊ/?</p>
      
      <div className="mb-8 p-8 bg-gray-900 rounded-lg relative h-40 flex items-center justify-center">
        {!feedback ? (
          <UnderlinedWord 
            parts={currentWord.parts} 
            className="text-5xl font-bold text-white tracking-widest" 
          />
        ) : (
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-lg text-white ${
            feedback === 'correct' ? 'bg-green-500/80' : 'bg-red-500/80'
          }`}>
            <UnderlinedWord 
              parts={currentWord.parts} 
              className="text-5xl font-bold text-white tracking-widest" 
            />
            <span className="text-2xl font-mono mt-2 text-white/90">
              {currentWord.phonetic}
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleAnswer('/ʌ/')} 
          className="p-6 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-4xl font-mono transition-colors disabled:opacity-50" 
          disabled={!!feedback}
        >
          /ʌ/
        </button>
        <button 
          onClick={() => handleAnswer('/əʊ/')} 
          className="p-6 bg-rose-600 hover:bg-rose-500 rounded-lg text-4xl font-mono transition-colors disabled:opacity-50" 
          disabled={!!feedback}
        >
          /əʊ/
        </button>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold text-white">
          Điểm: <span className="text-green-400">{score}</span>
        </p>
        <p className="text-gray-400">{currentIndex + 1} / {gameData.length}</p>
      </div>
    </div>
  );
};