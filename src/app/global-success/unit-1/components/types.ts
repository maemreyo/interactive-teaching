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
