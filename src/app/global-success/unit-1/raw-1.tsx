import React, { useState } from 'react';

// --- SVG Icons ---
const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

// Biểu tượng cho vị trí miệng, giúp trực quan hóa
const MouthShapeIcon = ({ shape = 'relaxed' }) => {
  if (shape === 'rounded') {
    // Miệng tròn cho âm /əʊ/
    return (
      <svg width="60" height="60" viewBox="0 0 100 100" className="text-rose-400">
        <ellipse cx="50" cy="50" rx="30" ry="20" fill="currentColor" />
      </svg>
    );
  }
  // Miệng thả lỏng cho âm /ʌ/
  return (
    <svg width="60" height="60" viewBox="0 0 100 100" className="text-cyan-400">
      <path d="M 20 50 Q 50 60 80 50" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
  );
};

// --- Component Card cho mỗi từ vựng (Tái sử dụng từ Bước 1) ---
const WordCard = ({ word, phonetic, onPlaySound }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex items-center justify-between transition-all duration-300 transform hover:scale-105">
    <div>
      <p className="text-2xl font-bold text-white">{word}</p>
      <p className="text-lg text-gray-400 font-mono">{phonetic}</p>
    </div>
    <button
      onClick={() => onPlaySound(word)}
      className="bg-gray-700 text-white rounded-full p-3 transform transition-transform duration-200 hover:bg-gray-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-500"
      aria-label={`Phát âm từ ${word}`}
    >
      <SpeakerIcon />
    </button>
  </div>
);

// --- Component chính của ứng dụng ---
export default function App() {
  // --- Dữ liệu cho hướng dẫn và ví dụ ---
  const pronunciationData = {
    sound_uh: {
      sound: "/ʌ/",
      description: "Âm này ngắn và dứt khoát, giống âm 'ă' trong tiếng Việt.",
      instructions: [
        "Hàm và môi thả lỏng, không căng.",
        "Mở miệng tự nhiên, không quá rộng.",
        "Lưỡi hạ thấp và hơi lùi về phía sau.",
      ],
      commonSpellings: ["u", "o", "ou"],
      examples: [
        { word: 'run', phonetic: '/rʌn/' },
        { word: 'jump', phonetic: '/dʒʌmp/' },
        { word: 'fun', phonetic: '/fʌn/' },
        { word: 'stun', phonetic: '/stʌn/' },
        { word: 'hunt', phonetic: '/hʌnt/' },
        { word: 'double', phonetic: '/ˈdʌbəl/' },
      ]
    },
    sound_oh: {
      sound: "/əʊ/",
      description: "Đây là nguyên âm đôi, di chuyển từ /ə/ (ơ) sang /ʊ/ (u).",
      instructions: [
        "Bắt đầu với miệng thả lỏng như khi nói 'ơ'.",
        "Nâng cuống lưỡi lên.",
        "Tròn môi dần và đưa ra phía trước để kết thúc bằng âm 'u' ngắn.",
      ],
      commonSpellings: ["o", "ow", "oa", "ou"],
      examples: [
        { word: 'go', phonetic: '/ɡəʊ/' },
        { word: 'gold', phonetic: '/ɡəʊld/' },
        { word: 'role', phonetic: '/rəʊl/' },
        { word: 'soul', phonetic: '/səʊl/' },
        { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
        { word: 'control', phonetic: '/kənˈtrəʊl/' },
      ]
    }
  };

  // --- Hàm phát âm (Tái sử dụng từ Bước 1) ---
  const playSound = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Rất tiếc, trình duyệt của bạn không hỗ trợ chức năng phát âm.");
    }
  };

  const { sound_uh, sound_oh } = pronunciationData;

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
        {/* --- Hướng dẫn cho âm /ʌ/ --- */}
        <section className="bg-gray-800/70 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center mb-4">
            <MouthShapeIcon shape="relaxed" />
            <h2 className="text-5xl font-bold ml-4 text-cyan-400 font-mono">{sound_uh.sound}</h2>
          </div>
          <p className="text-gray-300 mb-4">{sound_uh.description}</p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-cyan-200">
            {sound_uh.instructions.map((inst, index) => <li key={index}>{inst}</li>)}
          </ul>
          <h3 className="font-bold text-lg mb-3 text-white">Các mặt chữ thường gặp:</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {sound_uh.commonSpellings.map(s => <span key={s} className="bg-cyan-900 text-cyan-200 px-3 py-1 rounded-full font-mono">{s}</span>)}
          </div>
          <div className="space-y-3">
            {sound_uh.examples.map((item) => <WordCard key={item.word} {...item} onPlaySound={playSound} />)}
          </div>
        </section>

        {/* --- Hướng dẫn cho âm /əʊ/ --- */}
        <section className="bg-gray-800/70 border border-rose-500/30 rounded-2xl p-6 shadow-2xl shadow-rose-500/10">
          <div className="flex items-center mb-4">
            <MouthShapeIcon shape="rounded" />
            <h2 className="text-5xl font-bold ml-4 text-rose-400 font-mono">{sound_oh.sound}</h2>
          </div>
          <p className="text-gray-300 mb-4">{sound_oh.description}</p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-rose-200">
            {sound_oh.instructions.map((inst, index) => <li key={index}>{inst}</li>)}
          </ul>
          <h3 className="font-bold text-lg mb-3 text-white">Các mặt chữ thường gặp:</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {sound_oh.commonSpellings.map(s => <span key={s} className="bg-rose-900 text-rose-200 px-3 py-1 rounded-full font-mono">{s}</span>)}
          </div>
          <div className="space-y-3">
            {sound_oh.examples.map((item) => <WordCard key={item.word} {...item} onPlaySound={playSound} />)}
          </div>
        </section>
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>Soi gương và làm theo hướng dẫn để cảm nhận sự khác biệt nhé!</p>
        <button className="mt-4 bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
          Sẵn sàng cho Bước 3: Thử thách!
        </button>
      </footer>
    </div>
  );
}
