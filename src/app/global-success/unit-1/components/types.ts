export type PageType = "home" | "flashcards" | "game" | "quiz" | "history" | "grammar" | "pronunciation";

export interface SetPageProps {
  setPage: (page: PageType) => void;
}

export interface VocabularyCard {
  word: string;
  definition: string;
}

export interface GameCard {
  id: number;
  type: "word" | "definition";
  content: string;
  isFlipped: boolean;
}

export interface GrammarSlide {
  id: number;
  title: string;
  component: React.ComponentType;
}

export interface PronunciationWord {
  word: string;
  phonetic: string;
}

export interface PronunciationSection {
  id: number;
  title: string;
  sound: string;
  description: string;
  words: PronunciationWord[];
  isActive: boolean;
}

export interface SoundSortWord {
  parts: [string, string, string];
  sound: '/ʌ/' | '/əʊ/';
  phonetic: string;
}

export interface OddOneOutWord {
  parts: [string, string, string];
  phonetic: string;
  isAnswer: boolean;
}

export interface OddOneOutQuestion {
  words: OddOneOutWord[];
}

export interface GameData {
  soundSort: SoundSortWord[];
  oddOneOut: OddOneOutQuestion[];
}

export type GameState = 'ready' | 'playing' | 'over';

export interface BossBattleState {
  words: string[];
  currentWord: string;
  playerHealth: number;
  cpuHealth: number;
  score: number;
  isListening: boolean;
  gameState: GameState;
  feedbackText: string;
}

export interface Position {
  r: number;
  c: number;
}

export interface GridCell {
  word: string;
  isPath: boolean;
}

export interface PathfinderLevel {
  grid: GridCell[][];
  pathSound: '/ʌ/' | '/əʊ/';
  gridSize: number;
}

export interface DifficultySettings {
  gridSize: number;
  lives: number;
  name: string;
  timer: number;
}

export type PathfinderGameState = 'difficulty' | 'playing' | 'won' | 'lost';

export interface PathfinderState {
  level: PathfinderLevel | null;
  playerPos: Position;
  playerPath: Position[];
  lives: number;
  gameState: PathfinderGameState;
  difficulty: string;
  timer: number;
  correctStreak: number;
  incorrectStreak: number;
  feedbackMessage: string;
}
