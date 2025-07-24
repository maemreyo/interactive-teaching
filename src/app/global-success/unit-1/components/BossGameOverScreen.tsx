// src/app/global-success/unit-1/components/BossGameOverScreen.tsx
// CREATED: 2025-01-27 - Game over screen for boss battle with dynamic messages

import React, { useState, useEffect } from 'react';

interface BossGameOverScreenProps {
  didWin: boolean;
  score: number;
  onRestart: () => void;
}

export const BossGameOverScreen = ({ didWin, score, onRestart }: BossGameOverScreenProps) => {
  const winTitles = ['Victory!', 'Flawless!', 'Unstoppable!'];
  const loseTitles = ['Defeated', 'Try Harder', 'Ouch!'];

  const winMessages = [
    'Trùm phát âm cũng chỉ đến thế thôi. Dễ như ăn kẹo!',
    'Đẳng cấp! Chắc bạn là người tạo ra từ điển rồi.',
    'Chiến thắng quá áp đảo! Trùm khóc thét.'
  ];
  
  const loseMessages = [
    'Ủa alo? Mic có vấn đề hay do "năng lực" vậy?',
    'Trùm còn chưa dùng hết sức đâu. Cố lên nào "tân binh"!',
    'Thua keo này ta bày keo khác... và có vẻ vẫn thua tiếp.'
  ];

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Set a random message when the component mounts
  useEffect(() => {
    if (didWin) {
      setTitle(winTitles[Math.floor(Math.random() * winTitles.length)]);
      setMessage(winMessages[Math.floor(Math.random() * winMessages.length)]);
    } else {
      setTitle(loseTitles[Math.floor(Math.random() * loseTitles.length)]);
      setMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)]);
    }
  }, [didWin]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 text-center p-4">
      <div className={`bg-gray-800 border-2 ${
        didWin ? 'border-green-500' : 'border-red-500'
      } rounded-2xl p-8 shadow-2xl transform transition-all animate-fade-in-up`}>
        <h2 className={`text-6xl font-bold mb-4 ${
          didWin ? 'text-green-400' : 'text-red-400'
        }`}>
          {title}
        </h2>
        <p className="text-xl text-gray-300 mb-6 max-w-sm">
          {message}
        </p>
        <p className="text-2xl text-white">
          Điểm cuối cùng: <span className="font-bold text-yellow-400">{score}</span>
        </p>
        <button 
          onClick={onRestart} 
          className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-2xl transition-transform transform hover:scale-105"
        >
          Chơi Lại
        </button>
      </div>
    </div>
  );
};