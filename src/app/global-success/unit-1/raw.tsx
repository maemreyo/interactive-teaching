import React, { useState, useEffect } from 'react';

// --- SVG Icon cho nút phát âm ---
// Sử dụng SVG inline để không cần file ngoài và dễ dàng tạo kiểu
const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

// --- Component Card cho mỗi từ vựng ---
// Giúp code sạch sẽ và dễ quản lý hơn
const WordCard = ({ word, phonetic, onPlaySound }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/20">
    <div className="text-center sm:text-left mb-4 sm:mb-0">
      <p className="text-3xl font-bold text-white">{word}</p>
      <p className="text-xl text-cyan-400 font-mono">{phonetic}</p>
    </div>
    <button
      onClick={() => onPlaySound(word)}
      className="bg-cyan-500 text-white rounded-full p-4 transform transition-transform duration-200 hover:bg-cyan-400 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg"
      aria-label={`Phát âm từ ${word}`}
    >
      <SpeakerIcon />
    </button>
  </div>
);

// --- Component chính của ứng dụng ---
export default function App() {
  // --- Danh sách từ vựng ---
  // Các từ được chọn lọc theo chủ đề game và chứa 2 âm mục tiêu
  const wordsData = {
    sound_uh: [
      { word: 'run', phonetic: '/rʌn/' },
      { word: 'jump', phonetic: '/dʒʌmp/' },
      { word: 'gun', phonetic: '/ɡʌn/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'stun', phonetic: '/stʌn/' },
      { word: 'hunt', phonetic: '/hʌnt/' },
      { word: 'luck', phonetic: '/lʌk/' },
      { word: 'double', phonetic: '/ˈdʌbəl/' },
      { word: 'summon', phonetic: '/ˈsʌmən/' },
    ],
    sound_oh: [
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'role', phonetic: '/rəʊl/' },
      { word: 'soul', phonetic: '/səʊl/' },
      { word: 'code', phonetic: '/kəʊd/' },
      { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
      { word: 'control', phonetic: '/kənˈtrəʊl/' },
      { word: 'load', phonetic: '/ləʊd/' },
      { word: 'opponent', phonetic: '/əˈpəʊnənt/' },
    ],
  };

  // --- Hàm phát âm sử dụng Web Speech API của trình duyệt ---
  const playSound = (text) => {
    // Kiểm tra xem trình duyệt có hỗ trợ API này không
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Chọn giọng tiếng Anh để phát âm cho chính xác
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Tốc độ đọc vừa phải
      window.speechSynthesis.speak(utterance);
    } else {
      // Thông báo nếu trình duyệt không hỗ trợ
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
        {/* --- Phần cho âm /ʌ/ --- */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 pb-3 border-b-4 border-cyan-600 flex items-center">
            <span className="text-5xl font-mono text-cyan-400 mr-4">/ʌ/</span> (giống "ă" trong "ăn")
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wordsData.sound_uh.map((item) => (
              <WordCard key={item.word} {...item} onPlaySound={playSound} />
            ))}
          </div>
        </section>

        {/* --- Phần cho âm /əʊ/ --- */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 pb-3 border-b-4 border-rose-500 flex items-center">
            <span className="text-5xl font-mono text-rose-400 mr-4">/əʊ/</span> (giống "âu" trong "sâu")
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wordsData.sound_oh.map((item) => (
              <WordCard key={item.word} {...item} onPlaySound={playSound} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>Nhấn vào nút loa để nghe phát âm. Cố gắng lặp lại thật giống nhé!</p>
      </footer>
    </div>
  );
}
