// src/app/global-success/unit-1/components/PronunciationStep3.tsx
// CREATED: 2025-01-27 - Refactored from raw-2.tsx - Step 3 interactive games

"use client";

import React, { useState, useEffect } from 'react';
import { SoundSortGame } from './SoundSortGame';
import { OddOneOutGame } from './OddOneOutGame';
import { GameSummary } from './GameSummary';
import { getStep3GameData } from './PronunciationData';
import { shuffleArray } from './gameUtils';
import { GameData } from './types';

export const PronunciationStep3 = () => {
  const [activeGame, setActiveGame] = useState<'sort' | 'odd'>('sort');
  const [gameData, setGameData] = useState<GameData>(() => {
    const data = getStep3GameData();
    return {
      soundSort: shuffleArray(data.soundSort),
      oddOneOut: shuffleArray(data.oddOneOut)
    };
  });
  const [summary, setSummary] = useState({ show: false, score: 0, total: 0 });

  const handleGameEnd = (finalScore: number, totalQuestions: number) => {
    setSummary({ show: true, score: finalScore, total: totalQuestions });
  };

  const handleRestart = () => {
    setSummary({ show: false, score: 0, total: 0 });
    const data = getStep3GameData();
    setGameData({
      soundSort: shuffleArray(data.soundSort),
      oddOneOut: shuffleArray(data.oddOneOut)
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-8">
      {summary.show && (
        <GameSummary 
          score={summary.score} 
          total={summary.total} 
          onRestart={handleRestart} 
        />
      )}
      
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-400 tracking-wider" style={{ textShadow: '0 0 10px #c084fc' }}>
          Level 3: The Challenge
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl">
          Bước 3: Thử thách! Đã đến lúc kiểm tra kỹ năng của bạn qua các trò chơi.
        </p>
      </header>

      <nav className="flex justify-center space-x-4 mb-8">
        <button 
          onClick={() => setActiveGame('sort')}
          className={`px-6 py-2 font-bold rounded-lg transition-all ${
            activeGame === 'sort' 
              ? 'bg-green-500 text-white shadow-lg' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Game Phân Loại
        </button>
        <button 
          onClick={() => setActiveGame('odd')}
          className={`px-6 py-2 font-bold rounded-lg transition-all ${
            activeGame === 'odd' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Game Tìm Từ Khác
        </button>
      </nav>

      <main className="w-full">
        {activeGame === 'sort' ? (
          <SoundSortGame 
            gameData={gameData.soundSort} 
            onGameEnd={handleGameEnd} 
          />
        ) : (
          <OddOneOutGame 
            gameData={gameData.oddOneOut} 
            onGameEnd={handleGameEnd} 
          />
        )}
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>Hoàn thành các thử thách để trở thành bậc thầy phát âm!</p>
        <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-purple-400 font-semibold mb-2">🎮 Hướng dẫn chơi:</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p><strong>Game Phân Loại:</strong> Chọn âm đúng cho từ được gạch chân</p>
            <p><strong>Game Tìm Từ Khác:</strong> Tìm từ có phát âm khác với 3 từ còn lại</p>
          </div>
        </div>
      </footer>
    </div>
  );
};