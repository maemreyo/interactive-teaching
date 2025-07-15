// UPDATED: Enhanced QuizGamePage with game-like UI design
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { vocabularyData, VocabularyCard } from "./VocabularyData";
import { SetPageProps } from "./types";
import { cn } from "@/lib/utils";
import { Trophy, Zap, Target, Clock, Star } from "lucide-react";

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

const INITIAL_TIME_PER_QUESTION = 15; // seconds - increased from 10
const TIME_DECREASE_PER_STREAK = 0.5; // seconds
const MAX_TIME_DECREASE = 5; // seconds

// Particle component for visual effects
const Particle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100],
    }}
    transition={{
      duration: 2,
      delay,
      ease: "easeOut"
    }}
  />
);

// Floating score animation
const FloatingScore = ({ score, show }: { score: number; show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-green-500 z-50"
        initial={{ opacity: 0, y: 0, scale: 0.5 }}
        animate={{ opacity: 1, y: -50, scale: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
      >
        +{score}
      </motion.div>
    )}
  </AnimatePresence>
);

export const QuizGamePage = ({ setPage }: SetPageProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_PER_QUESTION);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [showFloatingScore, setShowFloatingScore] = useState(false);
  const [maxStreak, setMaxStreak] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio refs
  const correctSound = useRef<HTMLAudioElement | null>(null);
  const incorrectSound = useRef<HTMLAudioElement | null>(null);
  const startSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);
  // const backgroundMusic = useRef<HTMLAudioElement | null>(null); // Removed as file not found

  useEffect(() => {
    correctSound.current = new Audio('/sounds/correct.mp3');
    incorrectSound.current = new Audio('/sounds/incorreact.wav'); // Updated to .wav
    startSound.current = new Audio('/sounds/start.wav'); // Updated to .wav
    winSound.current = new Audio('/sounds/win.wav'); // Updated to .wav
    loseSound.current = new Audio('/sounds/lose.wav'); // Updated to .wav
    // if (backgroundMusic.current) {
    //   backgroundMusic.current.loop = true;
    //   backgroundMusic.current.volume = 0.3; // Adjust volume as needed
    // }
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
    return Math.max(decreasedTime, 5); // Minimum time of 5 seconds
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
      setCorrectStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((maxPrev) => Math.max(maxPrev, newStreak));
        return newStreak;
      });
      setShowParticles(true);
      setShowFloatingScore(true);
      playSound(correctSound);
      
      // Hide effects after animation
      setTimeout(() => {
        setShowParticles(false);
        setShowFloatingScore(false);
      }, 2000);
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
        // if (backgroundMusic.current) backgroundMusic.current.pause(); // Removed as file not found
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
      // if (backgroundMusic.current) backgroundMusic.current.play().catch(e => console.error("Error playing background music:", e)); // Removed as file not found
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // if (backgroundMusic.current) backgroundMusic.current.pause(); // Removed as file not found
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
    setMaxStreak(0);
    setShowParticles(false);
    setShowFloatingScore(false);
    startTimer();
    playSound(startSound);
    // if (backgroundMusic.current) backgroundMusic.current.play().catch(e => console.error("Error playing background music:", e)); // Removed as file not found
  };

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Loading Quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = (timeLeft / calculateTimeForQuestion()) * 100;
  const timePercentage = (timeLeft / calculateTimeForQuestion()) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-pink-400 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-cyan-400 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen relative z-10">
        {/* Game Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            🎮 Word Quest 🎮
          </motion.h1>
          <p className="text-xl text-cyan-200 font-medium">Match definitions to unlock vocabulary mastery!</p>
        </motion.header>

        {/* Game Stats Bar */}
        <motion.div 
          className="w-full max-w-4xl mb-8 bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-xl font-bold">{score}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-orange-400" />
                <span className="text-lg">Streak: {correctStreak}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-green-400" />
                <span className="text-lg">Question {currentQuestionIndex + 1}/{questions.length}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-red-400" />
              <span className={cn(
                "text-2xl font-bold",
                timeLeft <= 3 ? "text-red-400 animate-pulse" : "text-white"
              )}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!gameOver ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl relative"
            >
              {/* Particles effect */}
              {showParticles && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <Particle key={i} delay={i * 0.1} />
                  ))}
                </div>
              )}

              {/* Floating score */}
              <FloatingScore score={1} show={showFloatingScore} />

              {/* Timer Progress Bar */}
              <div className="mb-6">
                <motion.div 
                  className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-cyan-500/50"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <motion.div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      timePercentage > 50 ? "bg-gradient-to-r from-green-400 to-cyan-400" :
                      timePercentage > 25 ? "bg-gradient-to-r from-yellow-400 to-orange-400" :
                      "bg-gradient-to-r from-red-500 to-pink-500"
                    )}
                    style={{ width: `${timePercentage}%` }}
                    animate={timeLeft <= 3 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }}
                  />
                </motion.div>
              </div>

              {/* Question Card */}
              <div className="relative">
                <Card className="p-8 mb-8 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg border-2 border-cyan-500/30 shadow-2xl">
                  <CardContent className="text-center">
                    <motion.p 
                      className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentQuestion.definition}
                    </motion.p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={option}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ 
                            scale: feedback ? 1 : 1.03,
                            transition: { duration: 0.2, ease: "easeOut" }
                          }}
                          whileTap={{ 
                            scale: feedback ? 1 : 0.98,
                            transition: { duration: 0.1 }
                          }}
                        >
                          <Button
                            onClick={() => handleAnswerClick(option)}
                            disabled={!!feedback}
                            className={cn(
                              "w-full py-6 text-xl font-semibold rounded-xl transition-colors duration-200",
                              "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border-2 border-slate-600",
                              "hover:shadow-lg hover:shadow-slate-500/20",
                              selectedAnswer === option && feedback === "correct" && 
                                "bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-green-500/50 shadow-lg animate-pulse",
                              selectedAnswer === option && feedback === "incorrect" && 
                                "bg-gradient-to-r from-red-500 to-red-600 border-red-400 shadow-red-500/50 shadow-lg animate-pulse",
                              feedback && option === currentQuestion.correctWord && selectedAnswer !== option && 
                                "bg-gradient-to-r from-green-400 to-green-500 border-green-300 text-white animate-pulse",
                              selectedAnswer !== option && feedback && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <span className="block">
                              {option}
                            </span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Streak Indicator */}
              {correctStreak > 2 && (
                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    <Star className="w-6 h-6" />
                    <span>🔥 ON FIRE! {correctStreak} STREAK! 🔥</span>
                    <Star className="w-6 h-6" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-center p-12 bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-2xl border-2 border-cyan-500/30"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
              </motion.div>
              
              <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
                🎉 GAME COMPLETE! 🎉
              </h2>
              
              <div className="space-y-4 mb-8">
                <motion.div
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Final Score: <span className="text-yellow-400">{score}/{questions.length}</span>
                </motion.div>
                
                <motion.div
                  className="text-xl text-cyan-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Best Streak: <span className="text-orange-400 font-bold">{maxStreak}</span>
                </motion.div>
                
                <motion.div
                  className="text-lg text-purple-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Accuracy: <span className="text-green-400 font-bold">
                    {Math.round((score / questions.length) * 100)}%
                  </span>
                </motion.div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={resetGame} 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-lg"
                  >
                    🎮 Play Again
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => setPage("home")} 
                    variant="outline"
                    className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-xl font-bold rounded-xl"
                  >
                    🏠 Back to Home
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};