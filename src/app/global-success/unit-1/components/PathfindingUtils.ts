// src/app/global-success/unit-1/components/PathfindingUtils.ts
// CREATED: 2025-01-27 - Pathfinding utilities for maze generation

import { Position, GridCell, PathfinderLevel, DifficultySettings } from './types';

export const DIFFICULTY_SETTINGS: Record<string, DifficultySettings> = {
  easy: { gridSize: 5, lives: 5, name: 'Dễ', timer: 15 },
  medium: { gridSize: 6, lives: 3, name: 'Thường', timer: 10 },
  hard: { gridSize: 7, lives: 2, name: 'Khó', timer: 7 },
  nightmare: { gridSize: 10, lives: 1, name: 'Siêu Khó', timer: 5 },
};

export const WORDS_UH = [
  'love', 'come', 'run', 'fun', 'month', 'luck', 'study', 'honey', 
  'brother', 'double', 'stun', 'hunt', 'ugly', 'cup', 'summon',
  // Nightmare level words - harder /ʌ/ sounds
  'blood', 'flood', 'rough', 'tough', 'enough', 'young', 'country', 
  'trouble', 'couple', 'nothing', 'something', 'wonderful', 'comfortable',
  'government', 'company', 'money', 'monkey', 'onion', 'dozen', 'cousin'
];

export const WORDS_OH = [
  'gold', 'bone', 'role', 'code', 'opponent', 'control', 'judo', 'most', 
  'go', 'hold', 'soul', 'bonus', 'load', 'poem', 'open',
  // Nightmare level words - harder /əʊ/ sounds
  'shoulder', 'although', 'approach', 'coach', 'throat', 'float', 'boat',
  'remote', 'promote', 'compose', 'suppose', 'propose', 'expose', 'impose',
  'global', 'local', 'social', 'total', 'hotel', 'postal', 'coastal'
];

export const STREAK_MEMES = [
  "Double Kill!", "Triple Kill!", "Ultra Kill!", "RAMPAGE!", 
  "Không thể cản phá!", "Thần Tốc!", "Quá nhanh, quá nguy hiểm!",
  // Nightmare level streaks
  "LEGENDARY!", "GODLIKE!", "BEYOND GODLIKE!", "Siêu nhân là đây!"
];

export const FAIL_STREAK_MEMES = [
  "Combo sai!", "Lại sai à?", "Bạn đang tấu hài à?", "Dừng lại đi...",
  // Nightmare level fails
  "RIP! Chỉ có 1 mạng thôi!", "Nightmare mode không tha thứ!", 
  "Quá khó? Thử lại từ Easy đi!", "Bạn có chắc mình đã sẵn sàng?"
];

export const TIMEOUT_MEMES = [
  "Ngủ gật à?", "Nhanh lên nào!", "Hết giờ! Toang...",
  // Nightmare level timeouts
  "5 giây thôi! Tốc độ ánh sáng đi!", "Nightmare = tốc độ Flash!", 
  "Thời gian là vàng, bạn đang lãng phí!"
];

// Randomized DFS for maze-like path generation
export const generatePath = (gridSize: number): Position[] => {
  const START_POS: Position = { r: 0, c: 0 };
  const END_POS: Position = { r: gridSize - 1, c: gridSize - 1 };
  const stack = [START_POS];
  const visited = new Set(['0,0']);
  const path: Position[] = [];
  const pathMap: Record<string, Position> = {};

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    pathMap[`${current.r},${current.c}`] = current;

    if (current.r === END_POS.r && current.c === END_POS.c) break;

    const neighbors: Position[] = [];
    const moves = [{r:1, c:0}, {r:0, c:1}, {r:-1, c:0}, {r:0, c:-1}];
    
    // Shuffle moves to get random paths
    for (let i = moves.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moves[i], moves[j]] = [moves[j], moves[i]];
    }
    
    for(const move of moves) {
      const nextR = current.r + move.r;
      const nextC = current.c + move.c;
      if(nextR >= 0 && nextR < gridSize && nextC >= 0 && nextC < gridSize && 
         !visited.has(`${nextR},${nextC}`)) {
        neighbors.push({r: nextR, c: nextC});
      }
    }

    if (neighbors.length > 0) {
      const next = neighbors[0];
      visited.add(`${next.r},${next.c}`);
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  // Reconstruct path from start to end
  let current = END_POS;
  while(current.r !== START_POS.r || current.c !== START_POS.c){
    path.unshift(current);
    // Find parent in pathMap
    const parent = Object.values(pathMap).find(p => 
      Math.abs(p.r - current.r) + Math.abs(p.c - current.c) === 1
    );
    current = parent || START_POS;
  }
  path.unshift(START_POS);
  return path;
};

// Generate complex maze for nightmare mode - FIXED: No more trap cells with correct words
const generateNightmareMaze = (gridSize: number, pathSound: '/ʌ/' | '/əʊ/'): GridCell[][] => {
  const pathWords = pathSound === '/ʌ/' ? WORDS_UH : WORDS_OH;
  const distractorWords = pathSound === '/ʌ/' ? WORDS_OH : WORDS_UH;
  
  const grid: GridCell[][] = Array(gridSize).fill(null).map(() => 
    Array(gridSize).fill(null)
  );
  
  // Generate main path
  const mainPath = generatePath(gridSize);
  
  // Fill main path with correct words
  for (const pos of mainPath) {
    grid[pos.r][pos.c] = { 
      word: pathWords[Math.floor(Math.random() * pathWords.length)], 
      isPath: true 
    };
  }
  
  // Fill ALL remaining cells with distractor words (wrong sound)
  // This ensures only the correct path has correct words
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!grid[r][c]) {
        grid[r][c] = { 
          word: distractorWords[Math.floor(Math.random() * distractorWords.length)], 
          isPath: false 
        };
      }
    }
  }
  
  return grid;
};

export const generateLevel = (difficulty: string): PathfinderLevel => {
  const { gridSize } = DIFFICULTY_SETTINGS[difficulty];
  const pathSound: '/ʌ/' | '/əʊ/' = Math.random() < 0.5 ? '/ʌ/' : '/əʊ/';
  const pathWords = pathSound === '/ʌ/' ? WORDS_UH : WORDS_OH;
  const distractorWords = pathSound === '/ʌ/' ? WORDS_OH : WORDS_UH;

  let grid: GridCell[][];
  
  if (difficulty === 'nightmare') {
    // Use complex maze generation for nightmare mode
    grid = generateNightmareMaze(gridSize, pathSound);
  } else {
    // Use simple generation for other difficulties
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    const path = generatePath(gridSize);

    // Fill path cells
    for (const pos of path) {
      grid[pos.r][pos.c] = { 
        word: pathWords[Math.floor(Math.random() * pathWords.length)], 
        isPath: true 
      };
    }

    // Fill non-path cells
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) {
          grid[r][c] = { 
            word: distractorWords[Math.floor(Math.random() * distractorWords.length)], 
            isPath: false 
          };
        }
      }
    }
  }

  return { grid, pathSound, gridSize };
};