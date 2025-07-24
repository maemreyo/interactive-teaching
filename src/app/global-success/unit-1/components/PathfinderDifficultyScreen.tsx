// src/app/global-success/unit-1/components/PathfinderDifficultyScreen.tsx
// CREATED: 2025-01-27 - Difficulty selection screen for pathfinder

import React from 'react';
import { DIFFICULTY_SETTINGS } from './PathfindingUtils';

interface PathfinderDifficultyScreenProps {
  onSelectDifficulty: (difficulty: string) => void;
}

export const PathfinderDifficultyScreen = ({ onSelectDifficulty }: PathfinderDifficultyScreenProps) => (
  <div className="text-center">
    <h1 className="text-5xl font-bold text-white mb-8">Chọn Độ Khó</h1>
    <div className="flex flex-col gap-4">
      {Object.entries(DIFFICULTY_SETTINGS).map(([key, { name }]) => (
        <button 
          key={key} 
          onClick={() => onSelectDifficulty(key)} 
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-12 rounded-lg text-2xl transition-transform transform hover:scale-105"
        >
          {name}
        </button>
      ))}
    </div>
    
    <div className="mt-8 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 max-w-md mx-auto">
      <p className="text-purple-400 font-semibold mb-2">🎯 Cách chơi:</p>
      <div className="text-gray-300 text-sm space-y-1">
        <p>• Tìm đường từ góc trên trái đến góc dưới phải</p>
        <p>• Chỉ nhấn vào từ có âm đúng theo yêu cầu</p>
        <p>• Di chuyển theo ô liền kề (không chéo)</p>
        <p>• Hoàn thành trước khi hết mạng và thời gian</p>
      </div>
    </div>
  </div>
);