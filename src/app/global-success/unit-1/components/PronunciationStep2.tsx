// src/app/global-success/unit-1/components/PronunciationStep2.tsx
// CREATED: 2025-01-27 - Refactored from raw-1.tsx - Step 2 detailed pronunciation lesson

"use client";

import React from 'react';
import { SoundInstructionCard } from './SoundInstructionCard';
import { step2Data } from './PronunciationData';

export const PronunciationStep2 = () => {
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

  const { sound_uh, sound_oh } = step2Data;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-400 tracking-wider" style={{ textShadow: '0 0 10px #facc15' }}>
          Level 2: Master the Moves
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl">
          Bước 2: Hướng dẫn chi tiết. Hãy cùng tìm hiểu cách đặt miệng và lưỡi để tạo ra âm thanh chuẩn xác!
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Hướng dẫn cho âm /ʌ/ */}
        <SoundInstructionCard
          sound={sound_uh.sound}
          description={sound_uh.description}
          instructions={sound_uh.instructions}
          commonSpellings={sound_uh.commonSpellings}
          examples={sound_uh.examples}
          mouthShape="relaxed"
          colorScheme="cyan"
          onPlaySound={playSound}
        />

        {/* Hướng dẫn cho âm /əʊ/ */}
        <SoundInstructionCard
          sound={sound_oh.sound}
          description={sound_oh.description}
          instructions={sound_oh.instructions}
          commonSpellings={sound_oh.commonSpellings}
          examples={sound_oh.examples}
          mouthShape="rounded"
          colorScheme="rose"
          onPlaySound={playSound}
        />
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p className="mb-4">Soi gương và làm theo hướng dẫn để cảm nhận sự khác biệt nhé!</p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-yellow-400 font-semibold mb-2">💡 Mẹo luyện tập:</p>
          <p className="text-gray-300 text-sm">
            Đặt tay lên cổ họng để cảm nhận sự rung động khi phát âm. 
            Luyện tập trước gương để quan sát hình dạng miệng.
          </p>
        </div>
      </footer>
    </div>
  );
};