/* eslint-disable react/no-unescaped-entities */
// src/app/global-success/unit-1/components/PronunciationHomework.tsx
// CREATED: 2025-01-27 - Refactored from raw-7.tsx - Pronunciation homework with reading passages

"use client";

import React, { useState } from 'react';
import { HomeworkCameraView } from './HomeworkCameraView';
import { HomeworkReadingPassage } from './HomeworkReadingPassage';
import { readingPassagesData, homeworkStats } from './ReadingPassagesData';

export const PronunciationHomework = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [totalWordsClicked, setTotalWordsClicked] = useState(0);
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());
  
  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      
      // Track clicked words
      if (!clickedWords.has(text)) {
        setClickedWords(prev => new Set([...prev, text]));
        setTotalWordsClicked(prev => prev + 1);
      }
    } else {
      alert("Rất tiếc, trình duyệt của bạn không hỗ trợ chức năng phát âm.");
    }
  };

  const progressPercentage = Math.round((clickedWords.size / homeworkStats.totalWords) * 100);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 font-sans p-4 sm:p-8">
      {isCameraVisible && <HomeworkCameraView onClose={() => setIsCameraVisible(false)} />}
      
      {/* Camera Toggle Button */}
      {/* <button 
        onClick={() => setIsCameraVisible(prev => !prev)}
        className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-5 rounded-full shadow-lg z-50 transition-all duration-200 transform hover:scale-110"
      >
        {isCameraVisible ? '📹 Tắt Camera' : '🎥 Bật Camera & Ghi'}
      </button> */}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Bài Tập Về Nhà</h1>
          </div>
          
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Luyện đọc & phát âm với các bài đọc hiểu. Di chuột vào từ được gạch chân để xem nghĩa, click để nghe phát âm.
          </p>
          
          {/* Sound Legend */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
              <span className="font-bold text-yellow-300">Âm /ʌ/</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-rose-400 rounded"></div>
              <span className="font-bold text-rose-400">Âm /əʊ/</span>
            </div>
          </div>
        </header>

        {/* Progress Stats */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 mb-8 border border-purple-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-300">{homeworkStats.totalPassages}</div>
              <div className="text-sm text-gray-400">Bài đọc</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">{clickedWords.size}/{homeworkStats.totalWords}</div>
              <div className="text-sm text-gray-400">Từ đã học</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{progressPercentage}%</div>
              <div className="text-sm text-gray-400">Hoàn thành</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{totalWordsClicked}</div>
              <div className="text-sm text-gray-400">Lần nghe</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Tiến độ học tập</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Reading Passages */}
        <main className="space-y-12">
          {readingPassagesData.map((passage, index) => (
            <HomeworkReadingPassage
              key={index}
              passage={passage}
              onWordClick={playSound}
              passageIndex={index}
            />
          ))}
        </main>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className="mt-12 bg-green-900/50 border border-green-500/50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">Chúc mừng!</h3>
            <p className="text-lg text-gray-300">
              Bạn đã hoàn thành tất cả bài tập về nhà! Hãy tiếp tục luyện tập để nâng cao kỹ năng phát âm.
            </p>
          </div>
        )}

        {/* Video Recording Feature */}
        {/* <div className="mt-12 bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            🎥 Tính năng ghi video mới!
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">📹 Cách sử dụng:</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">1</span>
                  <span>Nhấn "🎥 Bật Camera & Ghi" để mở camera</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">2</span>
                  <span>Kéo thả camera đến vị trí mong muốn</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">3</span>
                  <span>Nhấn nút "Ghi" để bắt đầu quay video</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">4</span>
                  <span>Luyện phát âm trong khi ghi</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">5</span>
                  <span>Nhấn "Dừng" và "📥 Tải" để lưu video</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">✨ Lợi ích:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <span className="text-green-400">Tự đánh giá</span> - Xem lại cách phát âm của mình</li>
                <li>• <span className="text-blue-400">Chia sẻ</span> - Gửi video cho giáo viên/bạn bè</li>
                <li>• <span className="text-yellow-400">Theo dõi tiến bộ</span> - So sánh video theo thời gian</li>
                <li>• <span className="text-purple-400">Luyện tập</span> - Ghi lại để luyện nhiều lần</li>
                <li>• <span className="text-pink-400">Tự tin</span> - Cải thiện kỹ năng nói trước camera</li>
              </ul>
              
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                <p className="text-blue-300 text-xs">
                  📹 <strong>Lưu ý:</strong> Hiện tại chỉ ghi hình ảnh (không có âm thanh) để đảm bảo tương thích tốt nhất. 
                  Video được lưu định dạng .webm với timestamp.
                </p>
              </div>
              
              <div className="mt-2 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-300 text-xs">
                  💡 <strong>Mẹo:</strong> Bạn có thể đổi tên file sau khi tải xuống để dễ quản lý!
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Instructions */}
        {/* <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            💡 Hướng dẫn sử dụng
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">🎯 Cách học hiệu quả:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Đọc to từng câu trước khi click từ</li>
                <li>• Lặp lại phát âm sau khi nghe</li>
                <li>• Chú ý sự khác biệt giữa /ʌ/ và /əʊ/</li>
                <li>• Sử dụng camera để quan sát miệng</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🔧 Tính năng:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Tooltip hiển thị phiên âm và nghĩa</li>
                <li>• Camera có thể kéo thả tự do</li>
                <li>• <span className="text-green-400 font-semibold">🎥 Ghi video và tải xuống</span></li>
                <li>• Theo dõi tiến độ học tập</li>
                <li>• Phát âm tự động bằng giọng nói</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};