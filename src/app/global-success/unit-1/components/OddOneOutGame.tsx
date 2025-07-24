// src/app/global-success/unit-1/components/OddOneOutGame.tsx
// CREATED: 2025-01-27 - Odd one out game component

import React, { useState } from 'react';
import { UnderlinedWord } from './UnderlinedWord';
import { OddOneOutQuestion, OddOneOutWord } from './types';

interface OddOneOutGameProps {
  gameData: OddOneOutQuestion[];
  onGameEnd: (score: number, total: number) => void;
}

export const OddOneOutGame = ({ gameData, onGameEnd }: OddOneOutGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState<{ index: number; isCorrect: boolean } | null>(null);

  const currentQuestion = gameData[currentIndex];

  const handleAnswer = (chosenWord: OddOneOutWord, index: number) => {
    if (userChoice) return;

    const isCorrect = chosenWord.isAnswer;
    setUserChoice({ index, isCorrect });
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      setUserChoice(null);
      if (currentIndex < gameData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onGameEnd(isCorrect ? score + 10 : score, gameData.length);
      }
    }, 3000);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-2xl font-bold text-orange-400 mb-2">Game 2: Tìm Từ Khác Biệt</h3>
      <p className="text-gray-400 mb-6">Chọn từ có phần gạch chân được phát âm khác.</p>
      
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.words.map((word, index) => {
          const isChosen = userChoice?.index === index;
          const isTheAnswer = word.isAnswer;
          let buttonClass = "p-6 bg-gray-700 rounded-lg transition-all flex flex-col items-center justify-center h-32";
          
          if (userChoice) {
            if (isTheAnswer) {
              buttonClass += ' bg-green-600 ring-2 ring-white';
            } else if (isChosen && !isTheAnswer) {
              buttonClass += ' bg-red-600';
            } else {
              buttonClass += ' bg-gray-600 opacity-70';
            }
          } else {
            buttonClass += ' hover:bg-gray-600';
          }

          return (
            <button 
              key={index} 
              onClick={() => handleAnswer(word, index)} 
              className={buttonClass} 
              disabled={!!userChoice}
            >
              <UnderlinedWord parts={word.parts} className="text-3xl font-bold" />
              {userChoice && (
                <span className="text-xl font-mono mt-2 text-white/80">
                  {word.phonetic}
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold text-white">
          Điểm: <span className="text-orange-400">{score}</span>
        </p>
        <p className="text-gray-400">{currentIndex + 1} / {gameData.length}</p>
      </div>
    </div>
  );
};