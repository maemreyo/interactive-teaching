/* eslint-disable react/no-unescaped-entities */
// src/app/global-success/unit-1/components/PronunciationStep5.tsx
// CREATED: 2025-01-27 - Refactored from raw-4.tsx - Step 5 pathfinder maze game

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PathfinderGameCell } from './PathfinderGameCell';
import { PathfinderGameStatus } from './PathfinderGameStatus';
import { PathfinderFeedbackMessage } from './PathfinderFeedbackMessage';
import { PathfinderResultScreen } from './PathfinderResultScreen';
import { PathfinderDifficultyScreen } from './PathfinderDifficultyScreen';
import { soundEffects } from './SoundEffects';
import { 
  generateLevel, 
  DIFFICULTY_SETTINGS, 
  STREAK_MEMES, 
  FAIL_STREAK_MEMES, 
  TIMEOUT_MEMES 
} from './PathfindingUtils';
import { 
  PathfinderLevel, 
  Position, 
  PathfinderGameState 
} from './types';

export const PronunciationStep5 = () => {
  const [level, setLevel] = useState<PathfinderLevel | null>(null);
  const [playerPos, setPlayerPos] = useState<Position>({ r: 0, c: 0 });
  const [playerPath, setPlayerPath] = useState<Position[]>([{ r: 0, c: 0 }]);
  const [lives, setLives] = useState(0);
  const [gameState, setGameState] = useState<PathfinderGameState>('difficulty');
  const [difficulty, setDifficulty] = useState('medium');
  const [timer, setTimer] = useState(10);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [incorrectStreak, setIncorrectStreak] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sound effects
  useEffect(() => {
    soundEffects.initialize();
    return () => soundEffects.dispose();
  }, []);

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(''), 2000);
  };

  const handleTimeout = () => {
    soundEffects.playSoundEffect('timeout');
    showFeedback(TIMEOUT_MEMES[Math.floor(Math.random() * TIMEOUT_MEMES.length)]);
    setCorrectStreak(0);
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) setGameState('lost');
    else resetTimer();
  };
  
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const newTimer = DIFFICULTY_SETTINGS[difficulty].timer;
    setTimer(newTimer);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      resetTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleSelectDifficulty = async (selectedDifficulty: string) => {
    // Ensure sound effects are initialized before setting difficulty
    await soundEffects.initialize();
    soundEffects.setDifficulty(selectedDifficulty);
    soundEffects.playSoundEffect('start');
    setDifficulty(selectedDifficulty);
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    setLevel(generateLevel(selectedDifficulty));
    setPlayerPos({ r: 0, c: 0 });
    setPlayerPath([{ r: 0, c: 0 }]);
    setLives(settings.lives);
    setCorrectStreak(0);
    setIncorrectStreak(0);
    setGameState('playing');
  };

  const restartGame = () => {
    soundEffects.stopBackgroundMusic();
    setGameState('difficulty');
    setLevel(null);
  };

  const handleCellClick = async (r: number, c: number) => {
    if (gameState !== 'playing' || !level) return;
    const isAdjacent = Math.abs(r - playerPos.r) + Math.abs(c - playerPos.c) === 1;
    if (!isAdjacent) return;
    
    // Ensure sound effects are initialized
    await soundEffects.initialize();
    
    resetTimer();
    const clickedCell = level.grid[r][c];
    soundEffects.playWordSound(clickedCell.word, difficulty);

    if (clickedCell.isPath) {
      // Play correct sound effect
      soundEffects.playSoundEffect('correct');
      
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);
      setIncorrectStreak(0);
      if(newStreak >= 2) {
        soundEffects.playSoundEffect('streak', newStreak);
        showFeedback(STREAK_MEMES[Math.min(newStreak - 2, STREAK_MEMES.length - 1)]);
      }
      setPlayerPos({ r, c });
      setPlayerPath(prev => [...prev, { r, c }]);
      if (r === level.gridSize - 1 && c === level.gridSize - 1) {
        soundEffects.playSoundEffect('win');
        
        // Special victory message for nightmare mode
        if (difficulty === 'nightmare') {
          showFeedback('🏆 NIGHTMARE CONQUERED! 🏆');
        }
        
        setGameState('won');
      }
    } else {
      // Play incorrect sound effect
      soundEffects.playSoundEffect('incorrect');
      
      const newFailStreak = incorrectStreak + 1;
      setIncorrectStreak(newFailStreak);
      setCorrectStreak(0);
      
      // Nightmare mode: extra harsh feedback
      if (difficulty === 'nightmare') {
        showFeedback('💀 NIGHTMARE TRAP! GAME OVER! 💀');
        soundEffects.playSoundEffect('nightmare');
        setGameState('lost');
        return; // Instant death in nightmare mode
      }
      
      if(newFailStreak >= 2) {
        showFeedback(FAIL_STREAK_MEMES[Math.min(newFailStreak - 2, FAIL_STREAK_MEMES.length - 1)]);
      }
      
      const newLives = lives - 1;
      setLives(newLives);
      
      // Enhanced shake animation for nightmare mode
      const app = document.getElementById('pathfinder-app');
      if (app) {
        app.classList.add(difficulty === 'nightmare' ? 'animate-nightmare-shake' : 'animate-shake');
        setTimeout(() => {
          app.classList.remove('animate-nightmare-shake', 'animate-shake');
        }, difficulty === 'nightmare' ? 1000 : 500);
      }
      
      if (newLives <= 0) {
        soundEffects.playSoundEffect('lose');
        setGameState('lost');
      }
    }
  };
  
  const isVisited = (r: number, c: number) => 
    playerPath.some(pos => pos.r === r && pos.c === c);

  if (gameState === 'difficulty') {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
        <PathfinderDifficultyScreen onSelectDifficulty={handleSelectDifficulty} />
      </div>
    );
  }

  if (!level) return null;

  return (
    <div 
      id="pathfinder-app" 
      className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4 gap-6 relative"
    >
      <PathfinderFeedbackMessage message={feedbackMessage} />
      
      {(gameState === 'won' || gameState === 'lost') && (
        <PathfinderResultScreen 
          didWin={gameState === 'won'} 
          onRestart={restartGame}
          difficulty={difficulty}
        />
      )}
      
      <PathfinderGameStatus 
        lives={lives} 
        pathSound={level.pathSound} 
        timer={timer} 
        correctStreak={correctStreak} 
      />
      
      <div 
        className={`grid gap-1 ${difficulty === 'nightmare' ? 'max-w-full' : 'gap-2'}`}
        style={{gridTemplateColumns: `repeat(${level.gridSize}, minmax(0, 1fr))`}}
      >
        {level.grid.map((row, r) =>
          row.map((cell, c) => (
            <PathfinderGameCell 
              key={`${r}-${c}`} 
              data={{...cell, gridSize: level.gridSize}} 
              pos={{ r, c }} 
              playerPos={playerPos} 
              isVisited={isVisited(r, c)} 
              onClick={() => handleCellClick(r, c)}
              difficulty={difficulty}
            />
          ))
        )}
      </div>
      
      <button 
        onClick={restartGame} 
        className="mt-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg"
      >
        Chọn lại độ khó
      </button>
      
      <style jsx>{`
        @keyframes shake { 
          10%, 90% { transform: translate3d(-1px, 0, 0); } 
          20%, 80% { transform: translate3d(2px, 0, 0); } 
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 
          40%, 60% { transform: translate3d(4px, 0, 0); } 
        }
        .animate-shake { 
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; 
        }
        @keyframes nightmare-shake { 
          0% { transform: translate3d(0, 0, 0) rotate(0deg); } 
          10% { transform: translate3d(-10px, -10px, 0) rotate(-2deg); } 
          20% { transform: translate3d(10px, -5px, 0) rotate(1deg); } 
          30% { transform: translate3d(-8px, 8px, 0) rotate(-1deg); } 
          40% { transform: translate3d(8px, 5px, 0) rotate(2deg); } 
          50% { transform: translate3d(-5px, -8px, 0) rotate(-2deg); } 
          60% { transform: translate3d(5px, 8px, 0) rotate(1deg); } 
          70% { transform: translate3d(-8px, -5px, 0) rotate(-1deg); } 
          80% { transform: translate3d(8px, -8px, 0) rotate(2deg); } 
          90% { transform: translate3d(-5px, 5px, 0) rotate(-1deg); } 
          100% { transform: translate3d(0, 0, 0) rotate(0deg); } 
        }
        .animate-nightmare-shake { 
          animation: nightmare-shake 1s cubic-bezier(.36,.07,.19,.97) both; 
        }
        @keyframes fade-in-out { 
          0% { opacity: 0; transform: translateY(-20px) translateX(-50%); } 
          20% { opacity: 1; transform: translateY(0) translateX(-50%); } 
          80% { opacity: 1; transform: translateY(0) translateX(-50%); } 
          100% { opacity: 0; transform: translateY(20px) translateX(-50%); } 
        }
        .animate-fade-in-out { 
          animation: fade-in-out 2s ease-in-out forwards; 
        }
      `}</style>
    </div>
  );
};