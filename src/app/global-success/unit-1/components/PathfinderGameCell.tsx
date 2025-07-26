// src/app/global-success/unit-1/components/PathfinderGameCell.tsx
// UPDATED: 2025-01-27 - Removed visual hints to prevent cheating

import React from 'react';
import { GridCell, Position } from './types';

interface PathfinderGameCellProps {
  data: GridCell & { gridSize: number };
  pos: Position;
  playerPos: Position;
  isVisited: boolean;
  onClick: () => void;
  difficulty?: string;
}

export const PathfinderGameCell = ({ 
  data, 
  pos, 
  playerPos, 
  isVisited, 
  onClick,
  difficulty = 'medium'
}: PathfinderGameCellProps) => {
  const isStart = pos.r === 0 && pos.c === 0;
  const isEnd = pos.r === data.gridSize - 1 && pos.c === data.gridSize - 1;
  const isPlayerHere = pos.r === playerPos.r && pos.c === playerPos.c;
  const isNightmare = difficulty === 'nightmare';

  let cellClass = 'bg-gray-700 hover:bg-gray-600';
  if (isVisited && !isPlayerHere) cellClass = 'bg-cyan-800';
  if (isStart) cellClass = isNightmare ? 'bg-green-600 animate-pulse' : 'bg-cyan-600';
  if (isEnd) cellClass = isNightmare ? 'bg-red-600 animate-pulse' : 'bg-purple-600';
  if (isPlayerHere) cellClass = isNightmare ? 'bg-yellow-500 ring-4 ring-red-500 animate-bounce' : 'bg-yellow-500 ring-4 ring-white';
  
  // Nightmare mode: smaller cells, different font size
  const cellSize = isNightmare ? 'h-12 sm:h-16' : 'h-20 sm:h-24';
  const fontSize = isNightmare ? 'text-sm sm:text-lg' : 'text-lg sm:text-2xl';
  
  // No visual hints about correct path - players must discover it themselves
  const nightmareClass = '';
  
  return (
    <button 
      onClick={onClick} 
      className={`w-full ${cellSize} flex items-center justify-center text-center font-bold ${fontSize} rounded-lg transition-all duration-200 transform ${
        isPlayerHere ? 'scale-110' : ''
      } ${cellClass} ${nightmareClass} ${
        isNightmare ? 'hover:shadow-lg hover:shadow-red-500/20' : ''
      }`}
    >
      <span className={isNightmare && data.word.length > 8 ? 'text-xs' : ''}>
        {data.word}
      </span>
    </button>
  );
};