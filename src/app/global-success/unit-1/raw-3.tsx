import React, { useState, useEffect } from 'react';

// --- Web Speech API Initialization ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

// --- Helper Functions ---
// Trộn một mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// --- Game Data ---
const getChallengeWords = () => ([
  'run', 'jump', 'fun', 'stun', 'hunt', 'luck', 'double', 'summon', 'love', 'month', 'come', 'brother',
  'go', 'gold', 'role', 'soul', 'code', 'bonus', 'control', 'load', 'opponent', 'hold', 'bone', 'most'
]);

// --- Helper Components ---
const MicIcon = ({ isListening }) => (
  <svg className={`w-12 h-12 text-white transition-all ${isListening ? 'animate-pulse scale-110' : ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"></path>
  </svg>
);

const HealthBar = ({ health, maxHealth, label, colorClass }) => {
  const percentage = (health / maxHealth) * 100;
  return (
    <div className="w-full">
      <p className="text-lg font-bold text-white mb-1">{label}</p>
      <div className="w-full bg-gray-700 rounded-full h-8 border-2 border-gray-500">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} 
          style={{ width: `${percentage}%` }}>
        </div>
      </div>
      <p className="text-center font-mono text-xl mt-1">{health} / {maxHealth}</p>
    </div>
  );
};

// --- GameOverScreen Component with more impactful taunts ---
const GameOverScreen = ({ didWin, score, onRestart }) => {
  const winTitles = ['Victory!', 'Flawless!', 'Unstoppable!'];
  const loseTitles = ['Defeated', 'Try Harder', 'Ouch!'];

  const winMessages = [
    'Trùm phát âm cũng chỉ đến thế thôi. Dễ như ăn kẹo!',
    'Đẳng cấp! Chắc bạn là người tạo ra từ điển rồi.',
    'Chiến thắng quá áp đảo! Trùm khóc thét.'
  ];
  
  const loseMessages = [
    'Ủa alo? Mic có vấn đề hay do "năng lực" vậy?',
    'Trùm còn chưa dùng hết sức đâu. Cố lên nào "tân binh"!',
    'Thua keo này ta bày keo khác... và có vẻ vẫn thua tiếp.'
  ];

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Set a random message when the component mounts
  useEffect(() => {
    if (didWin) {
      setTitle(winTitles[Math.floor(Math.random() * winTitles.length)]);
      setMessage(winMessages[Math.floor(Math.random() * winMessages.length)]);
    } else {
      setTitle(loseTitles[Math.floor(Math.random() * loseTitles.length)]);
      setMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)]);
    }
  }, [didWin]); // Dependency added to re-render on win/loss change

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 text-center p-4">
      <div className={`bg-gray-800 border-2 ${didWin ? 'border-green-500' : 'border-red-500'} rounded-2xl p-8 shadow-2xl transform transition-all animate-fade-in-up`}>
        <h2 className={`text-6xl font-bold mb-4 ${didWin ? 'text-green-400' : 'text-red-400'}`}>
          {title}
        </h2>
        <p className="text-xl text-gray-300 mb-6 max-w-sm">
          {message}
        </p>
        <p className="text-2xl text-white">Điểm cuối cùng: <span className="font-bold text-yellow-400">{score}</span></p>
        <button onClick={onRestart} className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-2xl transition-transform transform hover:scale-105">
          Chơi Lại
        </button>
      </div>
    </div>
  );
};


// --- Main Component ---
export default function App() {
  const MAX_HEALTH = 100;
  const [words, setWords] = useState(getChallengeWords());
  const [currentWord, setCurrentWord] = useState('');
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [cpuHealth, setCpuHealth] = useState(MAX_HEALTH);
  const [score, setScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [gameState, setGameState] = useState('ready'); // ready, playing, over
  const [feedbackText, setFeedbackText] = useState('');
  const playerDamage = 20;
  const cpuDamage = 15;

  // --- Game Logic ---
  useEffect(() => {
    if (gameState === 'playing' && (playerHealth <= 0 || cpuHealth <= 0)) {
      setGameState('over');
    }
  }, [playerHealth, cpuHealth, gameState]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase().trim();
      checkAnswer(spokenText);
    };
  }, []);

  const startGame = () => {
    setPlayerHealth(MAX_HEALTH);
    setCpuHealth(MAX_HEALTH);
    setScore(0);
    setWords(shuffleArray([...getChallengeWords()]));
    setGameState('playing');
    // Call nextWord from within a useEffect that depends on gameState
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

  const checkAnswer = (spokenText) => {
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
        <p className="text-lg mt-4 text-center">Trình duyệt của bạn không hỗ trợ Nhận dạng Giọng nói.<br/>Vui lòng sử dụng Google Chrome phiên bản mới nhất.</p>
      </div>
    );
  }

  if (gameState === 'ready') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-6xl font-bold text-red-500" style={{textShadow: '0 0 15px #ef4444'}}>Pronunciation Boss Battle</h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl">Đọc đúng từ để tấn công Trùm. Đọc sai sẽ bị phản đòn! Bạn đã sẵn sàng chưa?</p>
        <button onClick={startGame} className="mt-8 bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-12 rounded-lg text-3xl transition-transform transform hover:scale-105">
          Bắt đầu!
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between p-4 sm:p-8">
      {gameState === 'over' && <GameOverScreen didWin={cpuHealth <= 0} score={score} onRestart={startGame} />}
      
      {/* --- CPU Area --- */}
      <div className="w-full max-w-4xl">
        <HealthBar health={cpuHealth} maxHealth={MAX_HEALTH} label="Trùm Phát Âm" colorClass="bg-red-500" />
      </div>

      {/* --- Word Display & Mic --- */}
      <div className="flex flex-col items-center justify-center my-8">
        <p className="text-gray-400 text-2xl mb-4">Đọc từ này!</p>
        <p className="text-7xl font-bold text-yellow-300 tracking-widest mb-6 h-24">{currentWord}</p>
        <button onClick={handleMicClick} disabled={isListening} className="bg-blue-600 rounded-full w-24 h-24 flex items-center justify-center transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
          <MicIcon isListening={isListening} />
        </button>
        <p className="text-xl text-center h-8 mt-4 italic text-gray-300">{feedbackText || ' '}</p>
      </div>

      {/* --- Player Area --- */}
      <div className="w-full max-w-4xl">
        <HealthBar health={playerHealth} maxHealth={MAX_HEALTH} label="Bạn" colorClass="bg-green-500" />
        <p className="text-center mt-2 text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></p>
      </div>
    </div>
  );
}
