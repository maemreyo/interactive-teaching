// src/app/global-success/unit-1/components/PathfinderGameStatus.tsx
// CREATED: 2025-01-27 - Game status display for pathfinder

import React from 'react';

interface PathfinderGameStatusProps {
  lives: number;
  pathSound: '/ʌ/' | '/əʊ/';
  timer: number;
  correctStreak: number;
}

export const PathfinderGameStatus = ({ 
  lives, 
  pathSound, 
  timer, 
  correctStreak 
}: PathfinderGameStatusProps) => (
  <div className="w-full max-w-md bg-gray-900 p-4 rounded-xl text-center border-2 border-gray-700">
    <p className="text-2xl font-bold text-yellow-300">
      Nhiệm vụ: Tìm đường với âm <span className="font-mono text-3xl">{pathSound}</span>
    </p>
    <div className="flex justify-around items-center mt-2">
      <div>
        <p className="text-xl mr-2">Mạng:</p>
        <div className="flex gap-2">
          {[...Array(lives)].map((_, i) => (
            <span key={i} className="text-3xl text-red-500">♥</span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xl">Thời gian:</p>
        <p className="text-4xl font-mono text-white">{timer}</p>
      </div>
      <div>
        <p className="text-xl">Combo:</p>
        <p className="text-4xl font-mono text-green-400">{correctStreak}x</p>
      </div>
    </div>
  </div>
);