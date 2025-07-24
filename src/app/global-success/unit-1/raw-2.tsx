import React, { useState, useEffect } from 'react';

// --- Helper Functions & Data ---

// Trộn một mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

// --- Dữ liệu cho các trò chơi (cập nhật cấu trúc cho Game 1) ---
const getGameData = () => ({
  soundSort: shuffleArray([
    { parts: ['h', 'o', 'ney'], sound: '/ʌ/', phonetic: '/ˈhʌni/' },
    { parts: ['c', 'o', 'me'], sound: '/ʌ/', phonetic: '/kʌm/' },
    { parts: ['m', 'o', 'st'], sound: '/əʊ/', phonetic: '/məʊst/' },
    { parts: ['br', 'o', 'ther'], sound: '/ʌ/', phonetic: '/ˈbrʌðə(r)/' },
    { parts: ['', 'go', ''], sound: '/əʊ/', phonetic: '/ɡəʊ/' },
    { parts: ['h', 'o', 'ld'], sound: '/əʊ/', phonetic: '/həʊld/' },
    { parts: ['b', 'o', 'ne'], sound: '/əʊ/', phonetic: '/bəʊn/' },
    { parts: ['m', 'o', 'nth'], sound: '/ʌ/', phonetic: '/mʌnθ/' },
    { parts: ['opp', 'o', 'nent'], sound: '/əʊ/', phonetic: '/əˈpəʊnənt/' },
    { parts: ['s', 'u', 'mmon'], sound: '/ʌ/', phonetic: '/ˈsʌmən/' },
    { parts: ['f', 'u', 'n'], sound: '/ʌ/', phonetic: '/fʌn/' },
    { parts: ['g', 'o', 'ld'], sound: '/əʊ/', phonetic: '/ɡəʊld/' },
    { parts: ['l', 'o', 've'], sound: '/ʌ/', phonetic: '/lʌv/' },
    { parts: ['c', 'o', 'de'], sound: '/əʊ/', phonetic: '/kəʊd/' }
  ]),
  oddOneOut: shuffleArray([
    { words: [{ parts: ['c', 'o', 'mb'], phonetic: '/kəʊm/', isAnswer: false }, { parts: ['l', 'o', 've'], phonetic: '/lʌv/', isAnswer: true }, { parts: ['wh', 'o', 'le'], phonetic: '/həʊl/', isAnswer: false }, { parts: ['h', 'o', 'le'], phonetic: '/həʊl/', isAnswer: false }] },
    { words: [{ parts: ['l', 'u', 'ck'], phonetic: '/lʌk/', isAnswer: false }, { parts: ['m', 'u', 'ch'], phonetic: '/mʌtʃ/', isAnswer: false }, { parts: ['sh', 'u', 't'], phonetic: '/ʃʌt/', isAnswer: false }, { parts: ['c', 'u', 'be'], phonetic: '/kjuːb/', isAnswer: true }] },
    { words: [{ parts: ['p', 'o', 'st'], phonetic: '/pəʊst/', isAnswer: false }, { parts: ['f', 'o', 'lder'], phonetic: '/ˈfəʊldə(r)/', isAnswer: false }, { parts: ['p', 'o', 'em'], phonetic: '/ˈpəʊɪm/', isAnswer: false }, { parts: ['b', 'o', 'x'], phonetic: '/bɒks/', isAnswer: true }] },
    { words: [{ parts: ['j', 'u', 'do'], phonetic: '/ˈdʒuːdəʊ/', isAnswer: true }, { parts: ['st', 'u', 'dy'], phonetic: '/ˈstʌdi/', isAnswer: false }, { parts: ['', 'u', 'ncle'], phonetic: '/ˈʌŋkl/', isAnswer: false }, { parts: ['', 'u', 'gly'], phonetic: '/ˈʌɡli/', isAnswer: false }] },
    { words: [{ parts: ['m', 'o', 'ney'], phonetic: '/ˈmʌni/', isAnswer: true }, { parts: ['st', 'o', 'ne'], phonetic: '/stəʊn/', isAnswer: false }, { parts: ['r', 'o', 'lling'], phonetic: '/ˈrəʊlɪŋ/', isAnswer: false }, { parts: ['r', 'o', 'pe'], phonetic: '/rəʊp/', isAnswer: false }] }
  ])
});

// --- SVG Icons ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// --- Word Component with Underline ---
const UnderlinedWord = ({ parts, className }) => (
  <span className={className}>
    {parts[0]}<u className="text-yellow-300 no-underline border-b-2 border-yellow-300">{parts[1]}</u>{parts[2]}
  </span>
);

// --- Game Summary Modal ---
const GameSummary = ({ score, total, onRestart }) => {
  const percentage = (score / (total * 10)) * 100;
  let message = '';
  let title = '';

  if (percentage >= 80) {
    title = 'Pro Player!';
    message = 'Bậc thầy phát âm là đây chứ đâu! Thử lại xem có phá được kỷ lục không?';
  } else if (percentage >= 50) {
    title = 'Khá lắm!';
    message = 'Chỉ một chút nữa là hoàn hảo rồi. Chơi lại để lên hạng Pro nào!';
  } else {
    title = 'Cần luyện tập thêm!';
    message = 'Hmm... Chắc là do chuột lag thôi. Thử lại một ván nữa chứng tỏ bản lĩnh nào!';
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border-2 border-purple-500 rounded-2xl p-8 text-center shadow-2xl shadow-purple-500/30 transform transition-all animate-fade-in-up">
        <h2 className="text-4xl font-bold text-purple-400 mb-2">{title}</h2>
        <p className="text-6xl font-bold text-white my-4">{score}</p>
        <p className="text-lg text-gray-300 mb-8 max-w-sm">{message}</p>
        <button onClick={onRestart} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition-transform transform hover:scale-105">
          Chơi Lại
        </button>
      </div>
    </div>
  );
};

// --- Game Components ---

// Game 1: Sound Sort (Đã cải tiến)
const SoundSortGame = ({ gameData, onGameEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const currentWord = gameData[currentIndex];

  const handleAnswer = (chosenSound) => {
    if (feedback) return;

    const isCorrect = chosenSound === currentWord.sound;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < gameData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onGameEnd(isCorrect ? score + 10 : score, gameData.length);
      }
    }, 2000); // Tăng thời gian chờ một chút
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-2xl font-bold text-green-400 mb-2">Game 1: Phân Loại Âm Thanh</h3>
      <p className="text-gray-400 mb-6">Từ này chứa âm /ʌ/ hay /əʊ/?</p>
      <div className="mb-8 p-8 bg-gray-900 rounded-lg relative h-40 flex items-center justify-center">
        {!feedback ? (
          // Before answering
          <UnderlinedWord parts={currentWord.parts} className="text-5xl font-bold text-white tracking-widest" />
        ) : (
          // After answering, show feedback overlay with word and phonetic
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-lg text-white ${feedback === 'correct' ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
            <UnderlinedWord parts={currentWord.parts} className="text-5xl font-bold text-white tracking-widest" />
            <span className="text-2xl font-mono mt-2 text-white/90">{currentWord.phonetic}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => handleAnswer('/ʌ/')} className="p-6 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-4xl font-mono transition-colors disabled:opacity-50" disabled={!!feedback}>/ʌ/</button>
        <button onClick={() => handleAnswer('/əʊ/')} className="p-6 bg-rose-600 hover:bg-rose-500 rounded-lg text-4xl font-mono transition-colors disabled:opacity-50" disabled={!!feedback}>/əʊ/</button>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold text-white">Điểm: <span className="text-green-400">{score}</span></p>
        <p className="text-gray-400">{currentIndex + 1} / {gameData.length}</p>
      </div>
    </div>
  );
};

// Game 2: Odd One Out (Đã cải tiến)
const OddOneOutGame = ({ gameData, onGameEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState(null);

  const currentQuestion = gameData[currentIndex];

  const handleAnswer = (chosenWord, index) => {
    if (userChoice) return;

    const isCorrect = chosenWord.isAnswer;
    setUserChoice({ index, isCorrect });
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      setUserChoice(null);
      if (currentIndex < gameData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onGameEnd(isCorrect ? score + 10 : score, gameData.length);
      }
    }, 3000);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-2xl font-bold text-orange-400 mb-2">Game 2: Tìm Từ Khác Biệt</h3>
      <p className="text-gray-400 mb-6">Chọn từ có phần gạch chân được phát âm khác.</p>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.words.map((word, index) => {
          const isChosen = userChoice?.index === index;
          const isTheAnswer = word.isAnswer;
          let buttonClass = "p-6 bg-gray-700 rounded-lg transition-all flex flex-col items-center justify-center h-32";
          if (userChoice) {
            if (isTheAnswer) buttonClass += ' bg-green-600 ring-2 ring-white';
            else if (isChosen && !isTheAnswer) buttonClass += ' bg-red-600';
            else buttonClass += ' bg-gray-600 opacity-70';
          } else {
             buttonClass += ' hover:bg-gray-600';
          }

          return (
            <button key={index} onClick={() => handleAnswer(word, index)} className={buttonClass} disabled={!!userChoice}>
              <UnderlinedWord parts={word.parts} className="text-3xl font-bold" />
              {userChoice && <span className="text-xl font-mono mt-2 text-white/80">{word.phonetic}</span>}
            </button>
          );
        })}
      </div>
       <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold text-white">Điểm: <span className="text-orange-400">{score}</span></p>
        <p className="text-gray-400">{currentIndex + 1} / {gameData.length}</p>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeGame, setActiveGame] = useState('sort');
  const [gameData, setGameData] = useState(getGameData());
  const [summary, setSummary] = useState({ show: false, score: 0, total: 0 });

  const handleGameEnd = (finalScore, totalQuestions) => {
    setSummary({ show: true, score: finalScore, total: totalQuestions });
  };

  const handleRestart = () => {
    setSummary({ show: false, score: 0, total: 0 });
    setGameData(getGameData());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-8">
      {summary.show && <GameSummary score={summary.score} total={summary.total} onRestart={handleRestart} />}
      
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-400 tracking-wider" style={{ textShadow: '0 0 10px #c084fc' }}>
          Level 3: The Challenge
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl">
          Bước 3: Thử thách! Đã đến lúc kiểm tra kỹ năng của bạn qua các trò chơi.
        </p>
      </header>

      <nav className="flex justify-center space-x-4 mb-8">
        <button 
          onClick={() => setActiveGame('sort')}
          className={`px-6 py-2 font-bold rounded-lg transition-all ${activeGame === 'sort' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300'}`}>
          Game Phân Loại
        </button>
        <button 
          onClick={() => setActiveGame('odd')}
          className={`px-6 py-2 font-bold rounded-lg transition-all ${activeGame === 'odd' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300'}`}>
          Game Tìm Từ Khác
        </button>
      </nav>

      <main className="w-full">
        {activeGame === 'sort' 
            ? <SoundSortGame gameData={gameData.soundSort} onGameEnd={handleGameEnd} /> 
            : <OddOneOutGame gameData={gameData.oddOneOut} onGameEnd={handleGameEnd} />
        }
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>Hoàn thành các thử thách để trở thành bậc thầy phát âm!</p>
      </footer>
    </div>
  );
}
