"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { vocabularyData, VocabularyCard } from "./VocabularyData";
import { SetPageProps } from "./types";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  definition: string;
  correctWord: string;
  options: string[];
}

const generateQuizQuestions = (data: VocabularyCard[]): QuizQuestion[] => {
  return data.map((item) => {
    const correctWord = item.word;
    const incorrectWords = data
      .filter((v) => v.word !== correctWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3) // Get 3 random incorrect words
      .map((v) => v.word);

    const options = shuffleArray<string>([correctWord, ...incorrectWords]);

    return {
      definition: item.definition,
      correctWord: correctWord,
      options: options,
    };
  });
};

const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const INITIAL_TIME_PER_QUESTION = 10; // seconds
const TIME_DECREASE_PER_STREAK = 0.5; // seconds
const MAX_TIME_DECREASE = 5; // seconds

export const QuizGamePage = ({ setPage }: SetPageProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_PER_QUESTION);
  const [correctStreak, setCorrectStreak] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio refs
  const correctSound = useRef<HTMLAudioElement | null>(null);
  const incorrectSound = useRef<HTMLAudioElement | null>(null);
  const startSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);
  const backgroundMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSound.current = new Audio('/sounds/correct.mp3');
    incorrectSound.current = new Audio('/sounds/incorrect.wav');
    startSound.current = new Audio('/sounds/start.mp3');
    winSound.current = new Audio('/sounds/win.wav');
    loseSound.current = new Audio('/sounds/lose.mp3');
    backgroundMusic.current = new Audio('/sounds/background_music.mp3');
    if (backgroundMusic.current) {
      backgroundMusic.current.loop = true;
      backgroundMusic.current.volume = 0.3; // Adjust volume as needed
    }
  }, []);

  const playSound = (audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const calculateTimeForQuestion = useCallback(() => {
    const decreasedTime = Math.min(
      INITIAL_TIME_PER_QUESTION - correctStreak * TIME_DECREASE_PER_STREAK,
      INITIAL_TIME_PER_QUESTION - MAX_TIME_DECREASE
    );
    return Math.max(decreasedTime, 3); // Minimum time of 3 seconds
  }, [correctStreak]);

  const handleAnswerClick = useCallback((answer: string) => {
    if (feedback) return; // Prevent multiple clicks
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestionIndex].correctWord;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
      setCorrectStreak((prev) => prev + 1);
      playSound(correctSound);
    } else {
      setFeedback("incorrect");
      setCorrectStreak(0); // Reset streak on incorrect answer
      playSound(incorrectSound);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setGameOver(true);
        if (backgroundMusic.current) backgroundMusic.current.pause();
        if (score + (isCorrect ? 1 : 0) >= questions.length / 2) { // Simple win condition
          playSound(winSound);
        } else {
          playSound(loseSound);
        }
      }
    }, 1500); // Show feedback for 1.5 seconds
  }, [feedback, questions, currentQuestionIndex, score]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const timeForQuestion = calculateTimeForQuestion();
    setTimeLeft(timeForQuestion);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAnswerClick("TIME_OUT"); // Simulate a timeout answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [calculateTimeForQuestion, handleAnswerClick]);

  useEffect(() => {
    setQuestions(shuffleArray(generateQuizQuestions(vocabularyData)));
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !gameOver) {
      startTimer();
      playSound(startSound);
      if (backgroundMusic.current) backgroundMusic.current.play().catch(e => console.error("Error playing background music:", e));
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (backgroundMusic.current) backgroundMusic.current.pause();
    };
  }, [currentQuestionIndex, questions, gameOver, startTimer]);

  const resetGame = () => {
    setQuestions(shuffleArray(generateQuizQuestions(vocabularyData)));
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
    setGameOver(false);
    setCorrectStreak(0);
    startTimer();
    playSound(startSound);
    if (backgroundMusic.current) backgroundMusic.current.play().catch(e => console.error("Error playing background music:", e));
  };

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Loading Quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = (timeLeft / calculateTimeForQuestion()) * 100;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Choose the Right Word</h1>
        <p className="text-lg text-gray-500 mt-2">Match the definition to the correct vocabulary word.</p>
      </header>

      <AnimatePresence mode="wait">
        {!gameOver ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <Card className="p-6 mb-6 shadow-lg">
              <CardContent className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
                  {currentQuestion.definition}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      disabled={!!feedback}
                      className={cn(
                        "w-full py-3 text-lg",
                        selectedAnswer === option && feedback === "correct" && "bg-green-500 hover:bg-green-600 text-white",
                        selectedAnswer === option && feedback === "incorrect" && "bg-red-500 hover:bg-red-600 text-white",
                        feedback && option === currentQuestion.correctWord && selectedAnswer !== option && "bg-green-200 text-green-800", // Highlight correct answer if user chose wrong
                        selectedAnswer !== option && feedback && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="w-full max-w-2xl mb-4">
              <Progress value={progressValue} className="h-2" />
            </div>
            <div className="text-center text-gray-600 text-lg font-medium">
              Question {currentQuestionIndex + 1} / {questions.length} | Score: {score} | Streak: {correctStreak}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-blue-100 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Game Over!</h2>
            <p className="text-xl text-blue-700 mb-2">
              You scored {score} out of {questions.length} correct answers!
            </p>
            <p className="text-lg text-blue-600 mb-6">
              Longest Streak: {correctStreak} (Note: This will show the final streak, not the max achieved)
            </p>
            <div className="space-x-4">
              <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white">
                Play Again
              </Button>
              <Button onClick={() => setPage("home")} variant="outline">
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
