// src/app/global-success/unit-1/components/PronunciationStep1.tsx
// CREATED: 2025-01-27 - Refactored from raw.tsx - Step 1 pronunciation lesson

"use client";

import React from 'react';
import { WordCard } from './WordCard';
import { step1Data } from './PronunciationData';

export const PronunciationStep1 = () => {
  // Web Speech API function for pronunciation
  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Rất tiếc, trình duyệt của bạn không hỗ trợ chức năng phát âm.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-cyan-400 tracking-wider" style={{ textShadow: '0 0 10px #22d3ee' }}>
          Game On! Let's Learn Sounds
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl">
          Bước 1: Khởi động! Hãy cùng nghe và bắt chước các từ vựng chủ đề game dưới đây.
        </p>
      </header>

      <main className="w-full max-w-6xl">
        {/* Section for /ʌ/ sound */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 pb-3 border-b-4 border-cyan-600 flex items-center">
            <span className="text-5xl font-mono text-cyan-400 mr-4">/ʌ/</span> (giống "ă" trong "ăn")
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {step1Data.sound_uh.map((item) => (
              <WordCard 
                key={item.word} 
                {...item} 
                onPlaySound={playSound} 
                colorScheme="cyan"
              />
            ))}
          </div>
        </section>

        {/* Section for /əʊ/ sound */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 pb-3 border-b-4 border-rose-500 flex items-center">
            <span className="text-5xl font-mono text-rose-400 mr-4">/əʊ/</span> (giống "âu" trong "sâu")
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {step1Data.sound_oh.map((item) => (
              <WordCard 
                key={item.word} 
                {...item} 
                onPlaySound={playSound} 
                colorScheme="rose"
              />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>Nhấn vào nút loa để nghe phát âm. Cố gắng lặp lại thật giống nhé!</p>
      </footer>
    </div>
  );
};