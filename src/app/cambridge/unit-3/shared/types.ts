// src/app/cambridge/unit-3/shared/types.ts
export type Language = "en" | "vi";

export interface NumberHouse {
  hundreds: number | string;
  tens: number | string;
  units: number | string;
}

export interface MathStep {
  id: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  explanation: { en: string; vi: string };
  voiceText: { en: string; vi: string };
  number1: NumberHouse;
  number2: NumberHouse;
  result?: NumberHouse;
  highlightColumn?: "hundreds" | "tens" | "units" | null;
  carryValue?: number;
  borrowValue?: number;
}

export interface Translations {
  title: string;
  subtitle: string;
  controls: {
    home: string;
    playPause: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    reset: string;
    restart: string;
  };
  progress: {
    step: string;
    of: string;
  };
  navigation: {
    previous: string;
    next: string;
  };
  numberHouse: {
    hundreds: string;
    tens: string;
    units: string;
    firstNumber: string;
    secondNumber: string;
    minuend: string;
    subtrahend: string;
    result: string;
  };
  operations: {
    add: string;
    subtract: string;
    addition: string;
    subtraction: string;
  };
  feedback: {
    carry: string;
    borrow: string;
    gift: string;
  };
}