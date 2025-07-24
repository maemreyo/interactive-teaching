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
      {Object.entries(DIFFICULTY_SETTINGS).map(([key, { name, gridSize, lives, timer }]) => {
        const isNightmare = key === 'nightmare';
        return (
          <div key={key} className="relative">
            <button 
              onClick={() => onSelectDifficulty(key)} 
              className={`${
                isNightmare 
                  ? 'bg-red-600 hover:bg-red-500 animate-pulse border-2 border-red-400' 
                  : 'bg-purple-600 hover:bg-purple-500'
              } text-white font-bold py-4 px-12 rounded-lg text-2xl transition-transform transform hover:scale-105 w-full`}
            >
              {name}
              {isNightmare && <span className="ml-2">💀</span>}
            </button>
            <div className="text-xs text-gray-400 mt-1">
              {gridSize}x{gridSize} • {lives} mạng • {timer}s
            </div>
          </div>
        );
      })}
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

    <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 max-w-md mx-auto">
      <p className="text-red-400 font-semibold mb-2">💀 Cảnh báo Siêu Khó:</p>
      <div className="text-gray-300 text-sm space-y-1">
        <p>• Map toàn màn hình 10x10 với 100 ô</p>
        <p>• Chỉ có 1 mạng duy nhất!</p>
        <p>• 5 giây mỗi nước đi</p>
        <p>• Có bẫy: từ đúng âm nhưng không phải đường đi</p>
        <p>• Từ vựng khó hơn: government, comfortable...</p>
      </div>
    </div>
  </div>
);