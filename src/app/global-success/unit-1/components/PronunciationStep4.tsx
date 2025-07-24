/* eslint-disable react/no-unescaped-entities */
// src/app/global-success/unit-1/components/PronunciationStep4.tsx
// CREATED: 2025-01-27 - Refactored from raw-3.tsx - Step 4 boss battle with speech recognition

"use client";

import React, { useState, useEffect } from 'react';
import { MicIcon } from './SpeakerIcon';
import { HealthBar } from './HealthBar';
import { BossGameOverScreen } from './BossGameOverScreen';
import { getBossBattleWords } from './PronunciationData';
import { shuffleArray } from './gameUtils';
import { GameState } from './types';

// Web Speech API Initialization
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition = typeof window !== 'undefined' ? 
  (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

let recognition: any;
if (typeof window !== 'undefined' && SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

export const PronunciationStep4 = () => {
  const MAX_HEALTH = 100;
  const [words, setWords] = useState<string[]>(getBossBattleWords());
  const [currentWord, setCurrentWord] = useState('');
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [cpuHealth, setCpuHealth] = useState(MAX_HEALTH);
  const [score, setScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [feedbackText, setFeedbackText] = useState('');
  const playerDamage = 20;
  const cpuDamage = 15;

  // Game Logic
  useEffect(() => {
    if (gameState === 'playing' && (playerHealth <= 0 || cpuHealth <= 0)) {
      setGameState('over');
    }
  }, [playerHealth, cpuHealth, gameState]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript.toLowerCase().trim();
      checkAnswer(spokenText);
    };
  }, []);

  const startGame = () => {
    setPlayerHealth(MAX_HEALTH);
    setCpuHealth(MAX_HEALTH);
    setScore(0);
    setWords(shuffleArray([...getBossBattleWords()]));
    setGameState('playing');
  };

  // This useEffect will run when gameState changes to 'playing'
  useEffect(() => {
    if (gameState === 'playing') {
      nextWord();
    }
  }, [gameState]);

  const nextWord = () => {
    setFeedbackText('');
    setWords(prevWords => {
      const newWords = [...prevWords];
      const next = newWords.pop() || 'restart';
      setCurrentWord(next);
      return newWords;
    });
  };

  const checkAnswer = (spokenText: string) => {
    if (spokenText.includes(currentWord)) {
      setFeedbackText(`Chính xác! Gây ${playerDamage} sát thương!`);
      setCpuHealth(prev => Math.max(0, prev - playerDamage));
      setScore(prev => prev + 10);
    } else {
      setFeedbackText(`Sai rồi! Mất ${cpuDamage} máu!`);
      setPlayerHealth(prev => Math.max(0, prev - cpuDamage));
    }
    setTimeout(nextWord, 1500);
  };

  const handleMicClick = () => {
    if (isListening || !recognition) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  if (!recognition) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-red-500">Lỗi API</h1>
        <p className="text-lg mt-4 text-center">
          Trình duyệt của bạn không hỗ trợ Nhận dạng Giọng nói.<br/>
          Vui lòng sử dụng Google Chrome phiên bản mới nhất.
        </p>
      </div>
    );
  }

  if (gameState === 'ready') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-6xl font-bold text-red-500" style={{textShadow: '0 0 15px #ef4444'}}>
          Pronunciation Boss Battle
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl">
          Đọc đúng từ để tấn công Trùm. Đọc sai sẽ bị phản đòn! Bạn đã sẵn sàng chưa?
        </p>
        <button 
          onClick={startGame} 
          className="mt-8 bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-12 rounded-lg text-3xl transition-transform transform hover:scale-105"
        >
          Bắt đầu!
        </button>
        
        <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-400 font-semibold mb-2">🎤 Yêu cầu hệ thống:</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>• Sử dụng Google Chrome</p>
            <p>• Cho phép truy cập microphone</p>
            <p>• Nói rõ ràng và chậm rãi</p>
            <p>• Môi trường yên tĩnh</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between p-4 sm:p-8">
      {gameState === 'over' && (
        <BossGameOverScreen 
          didWin={cpuHealth <= 0} 
          score={score} 
          onRestart={startGame} 
        />
      )}
      
      {/* CPU Area */}
      <div className="w-full max-w-4xl">
        <HealthBar 
          health={cpuHealth} 
          maxHealth={MAX_HEALTH} 
          label="Trùm Phát Âm" 
          colorClass="bg-red-500" 
        />
      </div>

      {/* Word Display & Mic */}
      <div className="flex flex-col items-center justify-center my-8">
        <p className="text-gray-400 text-2xl mb-4">Đọc từ này!</p>
        <p className="text-7xl font-bold text-yellow-300 tracking-widest mb-6 h-24">
          {currentWord}
        </p>
        <button 
          onClick={handleMicClick} 
          disabled={isListening} 
          className="bg-blue-600 rounded-full w-24 h-24 flex items-center justify-center transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MicIcon isListening={isListening} />
        </button>
        <p className="text-xl text-center h-8 mt-4 italic text-gray-300">
          {feedbackText || ' '}
        </p>
        
        {isListening && (
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-red-400 font-semibold">Đang nghe...</p>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Player Area */}
      <div className="w-full max-w-4xl">
        <HealthBar 
          health={playerHealth} 
          maxHealth={MAX_HEALTH} 
          label="Bạn" 
          colorClass="bg-green-500" 
        />
        <p className="text-center mt-2 text-2xl font-bold">
          Điểm: <span className="text-yellow-400">{score}</span>
        </p>
      </div>
    </div>
  );
};