// src/app/global-success/unit-1/components/PathfinderResultScreen.tsx
// CREATED: 2025-01-27 - Result screen for pathfinder game

import React from 'react';

interface PathfinderResultScreenProps {
  didWin: boolean;
  onRestart: () => void;
}

export const PathfinderResultScreen = ({ didWin, onRestart }: PathfinderResultScreenProps) => {
  const winMessages = [
    'Đỉnh của chóp! Con đường này quá dễ với bạn.', 
    'Bậc thầy dẫn lối là đây chứ đâu!', 
    'Easy game! Chắc bạn nhìn bản đồ trước rồi phải không?'
  ];
  
  const loseMessages = [
    'Lạc lối à? Để mình gọi Google Maps giúp nhé.', 
    'Game này khó hay do bạn... thôi chắc là do game khó.', 
    'Bạn đã cố gắng... để thua. Chơi lại phục thù nào!'
  ];
  
  const message = didWin 
    ? winMessages[Math.floor(Math.random() * winMessages.length)]
    : loseMessages[Math.floor(Math.random() * loseMessages.length)];
    
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 text-center p-4">
      <h2 className={`text-7xl font-bold ${didWin ? 'text-green-400' : 'text-red-500'}`}>
        {didWin ? 'Phá Đảo!' : 'Game Over!'}
      </h2>
      <p className="text-2xl text-white mt-4 max-w-md">{message}</p>
      <button 
        onClick={onRestart} 
        className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-12 rounded-lg text-2xl"
      >
        Chơi Lại
      </button>
    </div>
  );
};