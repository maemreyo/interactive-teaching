// src/app/global-success/unit-1/components/PathfinderGameCell.tsx
// CREATED: 2025-01-27 - Game cell component for pathfinder maze

import React from 'react';
import { GridCell, Position } from './types';

interface PathfinderGameCellProps {
  data: GridCell & { gridSize: number };
  pos: Position;
  playerPos: Position;
  isVisited: boolean;
  onClick: () => void;
}

export const PathfinderGameCell = ({ 
  data, 
  pos, 
  playerPos, 
  isVisited, 
  onClick 
}: PathfinderGameCellProps) => {
  const isStart = pos.r === 0 && pos.c === 0;
  const isEnd = pos.r === data.gridSize - 1 && pos.c === data.gridSize - 1;
  const isPlayerHere = pos.r === playerPos.r && pos.c === playerPos.c;

  let cellClass = 'bg-gray-700 hover:bg-gray-600';
  if (isVisited && !isPlayerHere) cellClass = 'bg-cyan-800';
  if (isStart) cellClass = 'bg-cyan-600';
  if (isEnd) cellClass = 'bg-purple-600';
  if (isPlayerHere) cellClass = 'bg-yellow-500 ring-4 ring-white';
  
  return (
    <button 
      onClick={onClick} 
      className={`w-full h-20 sm:h-24 flex items-center justify-center text-center font-bold text-lg sm:text-2xl rounded-lg transition-all duration-200 transform ${
        isPlayerHere ? 'scale-110' : ''
      } ${cellClass}`}
    >
      {data.word}
    </button>
  );
};