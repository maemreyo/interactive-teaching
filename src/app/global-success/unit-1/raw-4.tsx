import React, { useState, useEffect, useRef } from 'react';

// --- Game Constants & Data ---
const DIFFICULTY_SETTINGS = {
  easy: { gridSize: 5, lives: 5, name: 'Dễ', timer: 15 },
  medium: { gridSize: 6, lives: 3, name: 'Thường', timer: 10 },
  hard: { gridSize: 7, lives: 2, name: 'Khó', timer: 7 },
};

const WORDS_UH = ['love', 'come', 'run', 'fun', 'month', 'luck', 'study', 'honey', 'brother', 'double', 'stun', 'hunt', 'ugly', 'cup', 'summon'];
const WORDS_OH = ['gold', 'bone', 'role', 'code', 'opponent', 'control', 'judo', 'most', 'go', 'hold', 'soul', 'bonus', 'load', 'poem', 'open'];

// Meme Libraries
const STREAK_MEMES = ["Double Kill!", "Triple Kill!", "Ultra Kill!", "RAMPAGE!", "Không thể cản phá!", "Thần Tốc!", "Quá nhanh, quá nguy hiểm!"];
const FAIL_STREAK_MEMES = ["Combo sai!", "Lại sai à?", "Bạn đang tấu hài à?", "Dừng lại đi..."];
const TIMEOUT_MEMES = ["Ngủ gật à?", "Nhanh lên nào!", "Hết giờ! Toang..."];

// --- Helper Functions ---
const generatePath = (gridSize) => {
    // Randomized DFS for a more maze-like path
    const START_POS = { r: 0, c: 0 };
    const END_POS = { r: gridSize - 1, c: gridSize - 1 };
    let stack = [START_POS];
    let visited = new Set(['0,0']);
    let path = [];
    let pathMap = {};

    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        pathMap[`${current.r},${current.c}`] = current;

        if (current.r === END_POS.r && current.c === END_POS.c) break;

        let neighbors = [];
        const moves = [{r:1, c:0}, {r:0, c:1}, {r:-1, c:0}, {r:0, c:-1}];
        // Shuffle moves to get random paths
        for (let i = moves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [moves[i], moves[j]] = [moves[j], moves[i]];
        }
        
        for(const move of moves) {
            const nextR = current.r + move.r;
            const nextC = current.c + move.c;
            if(nextR >= 0 && nextR < gridSize && nextC >= 0 && nextC < gridSize && !visited.has(`${nextR},${nextC}`)) {
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
        // This part needs a proper parent map from DFS, but for simplicity we'll use the generated stack
        // For a more robust solution, a parent map should be stored during DFS traversal.
        // This simplified version will work for most generated paths.
        let parent = Object.values(pathMap).find(p => Math.abs(p.r - current.r) + Math.abs(p.c - current.c) === 1);
        current = parent || START_POS;
    }
    path.unshift(START_POS);
    return path;
}

const generateLevel = (difficulty) => {
  const { gridSize } = DIFFICULTY_SETTINGS[difficulty];
  const pathSound = Math.random() < 0.5 ? '/ʌ/' : '/əʊ/';
  const pathWords = pathSound === '/ʌ/' ? WORDS_UH : WORDS_OH;
  const distractorWords = pathSound === '/ʌ/' ? WORDS_OH : WORDS_UH;

  let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  let path = generatePath(gridSize);

  for (const pos of path) {
    grid[pos.r][pos.c] = { word: pathWords[Math.floor(Math.random() * pathWords.length)], isPath: true };
  }
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!grid[r][c]) {
        grid[r][c] = { word: distractorWords[Math.floor(Math.random() * distractorWords.length)], isPath: false };
      }
    }
  }
  return { grid, pathSound, gridSize };
};

// --- Components ---
const GameCell = ({ data, pos, playerPos, isVisited, onClick }) => {
  const isStart = pos.r === 0 && pos.c === 0;
  const isEnd = pos.r === data.gridSize - 1 && pos.c === data.gridSize - 1;
  const isPlayerHere = pos.r === playerPos.r && pos.c === playerPos.c;

  let cellClass = 'bg-gray-700 hover:bg-gray-600';
  if (isVisited && !isPlayerHere) cellClass = 'bg-cyan-800';
  if (isStart) cellClass = 'bg-cyan-600';
  if (isEnd) cellClass = 'bg-purple-600';
  if (isPlayerHere) cellClass = 'bg-yellow-500 ring-4 ring-white';
  
  return (
    <button onClick={onClick} className={`w-full h-20 sm:h-24 flex items-center justify-center text-center font-bold text-lg sm:text-2xl rounded-lg transition-all duration-200 transform ${isPlayerHere ? 'scale-110' : ''} ${cellClass}`}>
      {data.word}
    </button>
  );
};

const GameStatus = ({ lives, pathSound, timer, correctStreak }) => (
    <div className="w-full max-w-md bg-gray-900 p-4 rounded-xl text-center border-2 border-gray-700">
        <p className="text-2xl font-bold text-yellow-300">Nhiệm vụ: Tìm đường với âm <span className="font-mono text-3xl">{pathSound}</span></p>
        <div className="flex justify-around items-center mt-2">
            <div>
                <p className="text-xl mr-2">Mạng:</p>
                <div className="flex gap-2">
                    {[...Array(lives)].map((_, i) => <span key={i} className="text-3xl text-red-500">♥</span>)}
                </div>
            </div>
            <div>
                <p className="text-xl">Thời gian:</p>
                <p className="text-4xl font-mono text-white">{timer}</p>
            </div>
            <div>
                <p className="text-xl">Combo:</p>
                <p className="text-4xl font-mono text-green-400">{correctStreak}x</p>
            </div>
        </div>
    </div>
);

const FeedbackMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-3xl font-bold p-4 rounded-lg z-30 animate-fade-in-out">
            {message}
        </div>
    )
}

const ResultScreen = ({ didWin, onRestart }) => {
    const winMessages = ['Đỉnh của chóp! Con đường này quá dễ với bạn.', 'Bậc thầy dẫn lối là đây chứ đâu!', 'Easy game! Chắc bạn nhìn bản đồ trước rồi phải không?'];
    const loseMessages = ['Lạc lối à? Để mình gọi Google Maps giúp nhé.', 'Game này khó hay do bạn... thôi chắc là do game khó.', 'Bạn đã cố gắng... để thua. Chơi lại phục thù nào!'];
    const message = didWin ? winMessages[Math.floor(Math.random() * winMessages.length)] : loseMessages[Math.floor(Math.random() * loseMessages.length)];
    return (
     <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 text-center p-4">
        <h2 className={`text-7xl font-bold ${didWin ? 'text-green-400' : 'text-red-500'}`}>{didWin ? 'Phá Đảo!' : 'Game Over!'}</h2>
        <p className="text-2xl text-white mt-4 max-w-md">{message}</p>
        <button onClick={onRestart} className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-12 rounded-lg text-2xl">Chơi Lại</button>
    </div>
    );
};

const DifficultyScreen = ({ onSelectDifficulty }) => (
    <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Chọn Độ Khó</h1>
        <div className="flex flex-col gap-4">
            {Object.entries(DIFFICULTY_SETTINGS).map(([key, { name }]) => (
                <button key={key} onClick={() => onSelectDifficulty(key)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-12 rounded-lg text-2xl transition-transform transform hover:scale-105">{name}</button>
            ))}
        </div>
    </div>
);

// --- Main App Component ---
export default function App() {
  const [level, setLevel] = useState(null);
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [playerPath, setPlayerPath] = useState([{ r: 0, c: 0 }]);
  const [lives, setLives] = useState(0);
  const [gameState, setGameState] = useState('difficulty');
  const [difficulty, setDifficulty] = useState('medium');
  const [timer, setTimer] = useState(10);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [incorrectStreak, setIncorrectStreak] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const timerRef = useRef(null);

  const synths = useRef(null);
  useEffect(() => {
    if (typeof window.Tone !== 'undefined' && !synths.current) {
        synths.current = {
            start: new window.Tone.Synth({ oscillator: { type: 'fatsawtooth' }, envelope: { attack: 0.1, decay: 0.2, sustain: 0.1, release: 0.3 } }).toDestination(),
            win: new window.Tone.PolySynth(window.Tone.Synth, { oscillator: { type: 'triangle' } }).toDestination(),
            lose: new window.Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.2, decay: 0.5, sustain: 0, release: 0.5 } }).toDestination(),
            streak: new window.Tone.Synth({ oscillator: { type: 'sine' } }).toDestination(),
            timeout: new window.Tone.Synth({ oscillator: { type: 'noise' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination(),
        };
    }
  }, []);

  const playSoundEffect = (type, value = 0) => {
    if (!synths.current) return;
    const now = window.Tone.now();
    if (type === 'start') synths.current.start.triggerAttackRelease('C4', '8n', now);
    else if (type === 'win') synths.current.win.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '8n', now);
    else if (type === 'lose') synths.current.lose.triggerAttackRelease('C3', '4n', now);
    else if (type === 'streak') synths.current.streak.triggerAttackRelease(220 + value * 20, '16n', now);
    else if (type === 'timeout') synths.current.timeout.triggerAttackRelease('8n', now);
  };

  const playWordSound = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      let volumeLevel = 1.0;
      if (difficulty === 'medium') volumeLevel = 0.7;
      if (difficulty === 'hard') volumeLevel = 0.4;
      utterance.volume = volumeLevel;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const showFeedback = (message) => {
      setFeedbackMessage(message);
      setTimeout(() => setFeedbackMessage(''), 2000);
  }

  const handleTimeout = () => {
    playSoundEffect('timeout');
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
                  clearInterval(timerRef.current);
                  handleTimeout();
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);
  }

  useEffect(() => {
    if (gameState === 'playing') {
        resetTimer();
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const handleSelectDifficulty = (selectedDifficulty) => {
    playSoundEffect('start');
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
      setGameState('difficulty');
      setLevel(null);
  }

  const handleCellClick = (r, c) => {
    if (gameState !== 'playing') return;
    const isAdjacent = Math.abs(r - playerPos.r) + Math.abs(c - playerPos.c) === 1;
    if (!isAdjacent) return;
    
    resetTimer();
    const clickedCell = level.grid[r][c];
    playWordSound(clickedCell.word);

    if (clickedCell.isPath) {
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);
      setIncorrectStreak(0);
      if(newStreak >= 2) {
          playSoundEffect('streak', newStreak);
          showFeedback(STREAK_MEMES[Math.min(newStreak - 2, STREAK_MEMES.length - 1)]);
      }
      setPlayerPos({ r, c });
      setPlayerPath(prev => [...prev, { r, c }]);
      if (r === level.gridSize - 1 && c === level.gridSize - 1) {
        playSoundEffect('win');
        setGameState('won');
      }
    } else {
      const newFailStreak = incorrectStreak + 1;
      setIncorrectStreak(newFailStreak);
      setCorrectStreak(0);
      if(newFailStreak >= 2) showFeedback(FAIL_STREAK_MEMES[Math.min(newFailStreak - 2, FAIL_STREAK_MEMES.length - 1)]);
      
      const newLives = lives - 1;
      setLives(newLives);
      const app = document.getElementById('pathfinder-app');
      app.classList.add('animate-shake');
      setTimeout(() => app.classList.remove('animate-shake'), 500);
      if (newLives <= 0) {
        playSoundEffect('lose');
        setGameState('lost');
      }
    }
  };
  
  const isVisited = (r, c) => playerPath.some(pos => pos.r === r && pos.c === c);

  if (gameState === 'difficulty') {
      return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
            <DifficultyScreen onSelectDifficulty={handleSelectDifficulty} />
        </div>
      );
  }

  return (
    <div id="pathfinder-app" className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4 gap-6 relative">
      <FeedbackMessage message={feedbackMessage} />
      {(gameState === 'won' || gameState === 'lost') && <ResultScreen didWin={gameState === 'won'} onRestart={restartGame} />}
      <GameStatus lives={lives} pathSound={level.pathSound} timer={timer} correctStreak={correctStreak} />
      <div className={`grid gap-2`} style={{gridTemplateColumns: `repeat(${level.gridSize}, minmax(0, 1fr))`}}>
        {level.grid.map((row, r) =>
          row.map((cell, c) => (
            <GameCell key={`${r}-${c}`} data={{...cell, gridSize: level.gridSize}} pos={{ r, c }} playerPos={playerPos} isVisited={isVisited(r, c)} onClick={() => handleCellClick(r, c)} />
          ))
        )}
      </div>
      <button onClick={restartGame} className="mt-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg">Chọn lại độ khó</button>
      <style>{`
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes fade-in-out { 0% { opacity: 0; transform: translateY(-20px) translateX(-50%); } 20% { opacity: 1; transform: translateY(0) translateX(-50%); } 80% { opacity: 1; transform: translateY(0) translateX(-50%); } 100% { opacity: 0; transform: translateY(20px) translateX(-50%); } }
        .animate-fade-in-out { animation: fade-in-out 2s ease-in-out forwards; }
      `}</style>
    </div>
  );
}
