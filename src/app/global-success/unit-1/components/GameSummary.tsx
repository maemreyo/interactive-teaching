// src/app/global-success/unit-1/components/GameSummary.tsx
// CREATED: 2025-01-27 - Game summary modal for pronunciation games

import React from 'react';

interface GameSummaryProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const GameSummary = ({ score, total, onRestart }: GameSummaryProps) => {
  const percentage = (score / (total * 10)) * 100;
  let message = '';
  let title = '';

  if (percentage >= 80) {
    title = 'Pro Player!';
    message = 'Bậc thầy phát âm là đây chứ đâu! Thử lại xem có phá được kỷ lục không?';
  } else if (percentage >= 50) {
    title = 'Khá lắm!';
    message = 'Chỉ một chút nữa là hoàn hảo rồi. Chơi lại để lên hạng Pro nào!';
  } else {
    title = 'Cần luyện tập thêm!';
    message = 'Hmm... Chắc là do chuột lag thôi. Thử lại một ván nữa chứng tỏ bản lĩnh nào!';
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border-2 border-purple-500 rounded-2xl p-8 text-center shadow-2xl shadow-purple-500/30 transform transition-all animate-fade-in-up">
        <h2 className="text-4xl font-bold text-purple-400 mb-2">{title}</h2>
        <p className="text-6xl font-bold text-white my-4">{score}</p>
        <p className="text-lg text-gray-300 mb-8 max-w-sm">{message}</p>
        <button 
          onClick={onRestart} 
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition-transform transform hover:scale-105"
        >
          Chơi Lại
        </button>
      </div>
    </div>
  );
};