export type PageType = "home" | "flashcards" | "game" | "quiz" | "history" | "grammar";

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
