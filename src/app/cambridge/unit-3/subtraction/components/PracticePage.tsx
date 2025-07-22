// src/app/cambridge/unit-3/subtraction/components/PracticePage.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Language } from "../../shared/types";
import { translations } from "../../shared/translations";
import { NumberHouse } from "../../shared/NumberHouse";
import { LanguageToggle } from "../../shared/LanguageToggle";
import { 
  ArrowLeft, 
  RefreshCw, 
  Check, 
  X, 
  Trophy,
  Target,
  Zap,
  Minus,
  Volume2,
  VolumeX
} from "lucide-react";

interface PracticeProblem {
  id: string;
  number1: { hundreds: number; tens: number; units: number };
  number2: { hundreds: number; tens: number; units: number };
  correctAnswer: { hundreds: number; tens: number; units: number };
  storyContext: { en: string; vi: string };
}

interface PracticePageProps {
  setPage: (page: "home" | "lesson" | "practice") => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const generateProblem = (): PracticeProblem => {
  const id = Math.random().toString(36).substr(2, 9);
  
  // Generate first number (larger)
  const num1 = {
    hundreds: Math.floor(Math.random() * 4) + 3, // 3-6
    tens: Math.floor(Math.random() * 9) + 1,     // 1-9
    units: Math.floor(Math.random() * 9) + 1     // 1-9
  };
  
  // Generate second number (smaller, ensuring subtraction is possible)
  const num2 = {
    hundreds: Math.floor(Math.random() * 2) + 1, // 1-2
    tens: Math.floor(Math.random() * num1.tens + 1), // 0 to num1.tens
    units: Math.floor(Math.random() * 9)         // 0-8
  };
  
  // Calculate correct answer with borrowing
  let units = num1.units - num2.units;
  let tens = num1.tens - num2.tens;
  let hundreds = num1.hundreds - num2.hundreds;
  
  if (units < 0) {
    units += 10;
    tens -= 1;
  }
  if (tens < 0) {
    tens += 10;
    hundreds -= 1;
  }
  
  const num1Str = `${num1.hundreds}${num1.tens}${num1.units}`;
  const num2Str = `${num2.hundreds}${num2.tens}${num2.units}`;
  
  const stories = {
    en: [
      `Rabbit had ${num1Str} carrots. Rabbit ate ${num2Str} carrots. How many carrots does Rabbit have left?`,
      `There were ${num1Str} books in the library. ${num2Str} books were taken out. How many books are left in the library?`,
      `The store had ${num1Str} candies. They sold ${num2Str} candies. How many candies are left in the store?`
    ],
    vi: [
      `Bạn Thỏ có ${num1Str} củ cà rốt, bạn Thỏ ăn hết ${num2Str} củ. Hỏi bạn ấy còn lại bao nhiêu củ?`,
      `Trong kho có ${num1Str} quyển sách, người ta lấy đi ${num2Str} quyển. Hỏi trong kho còn lại bao nhiêu quyển sách?`,
      `Cửa hàng có ${num1Str} chiếc kẹo, đã bán ${num2Str} chiếc. Hỏi cửa hàng còn lại bao nhiêu chiếc kẹo?`
    ]
  };
  
  const randomIndex = Math.floor(Math.random() * stories.en.length);
  
  return {
    id,
    number1: num1,
    number2: num2,
    correctAnswer: { hundreds, tens, units },
    storyContext: {
      en: stories.en[randomIndex],
      vi: stories.vi[randomIndex]
    }
  };
};

export const PracticePage = ({ setPage, language, onLanguageChange }: PracticePageProps) => {
  const [currentProblem, setCurrentProblem] = useState<PracticeProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState({ hundreds: "", tens: "", units: "" });
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const t = translations[language];

  const playSound = useCallback((soundFile: string) => {
    if (!isMuted) {
      try {
        const audio = new Audio(`/sounds/${soundFile}`);
        audio.play().catch(e => console.log("Sound play failed:", e));
      } catch (e) {
        console.log("Sound creation failed:", e);
      }
    }
  }, [isMuted]);

  const speakText = useCallback((text: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted, language]);

  const generateNewProblem = () => {
    const problem = generateProblem();
    setCurrentProblem(problem);
    setUserAnswer({ hundreds: "", tens: "", units: "" });
    setFeedback(null);
    speakText(problem.storyContext[language]);
  };

  const checkAnswer = () => {
    if (!currentProblem) return;
    
    const userHundreds = parseInt(userAnswer.hundreds) || 0;
    const userTens = parseInt(userAnswer.tens) || 0;
    const userUnits = parseInt(userAnswer.units) || 0;
    
    const isCorrect = 
      userHundreds === currentProblem.correctAnswer.hundreds &&
      userTens === currentProblem.correctAnswer.tens &&
      userUnits === currentProblem.correctAnswer.units;
    
    setFeedback(isCorrect ? "correct" : "incorrect");
    setTotalAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      playSound('correct.mp3');
      speakText(language === "en" ? "Correct! Well done!" : "Chính xác! Bạn làm rất tốt!");
    } else {
      setStreak(0);
      playSound('incorrect.wav');
      const correctAnswer = `${currentProblem.correctAnswer.hundreds}${currentProblem.correctAnswer.tens}${currentProblem.correctAnswer.units}`;
      speakText(language === "en" 
        ? `Not quite right. The correct answer is ${correctAnswer}` 
        : `Chưa đúng. Đáp án đúng là ${correctAnswer}`);
    }
    
    setTimeout(() => {
      generateNewProblem();
    }, 3000);
  };

  const resetStats = () => {
    setScore(0);
    setTotalAttempts(0);
    setStreak(0);
    generateNewProblem();
    playSound('start.wav');
  };

  useEffect(() => {
    generateNewProblem();
  }, [generateNewProblem]);

  if (!currentProblem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {language === "en" ? "Creating practice problems..." : "Đang tạo bài tập..."}
      </div>
    );
  }

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-red-400 rounded-full blur-xl"
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
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => setPage("home")}
              variant="outline"
              className="px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.controls.home}
            </Button>
            
            <LanguageToggle 
              language={language} 
              onLanguageChange={onLanguageChange}
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {language === "en" ? "📝 Subtraction Practice 📝" : "📝 Luyện Tập Trừ 📝"}
          </h1>
          <p className="text-xl text-gray-700">
            {language === "en" ? "Practice with word problems" : "Thực hành với bài tập có lời văn"}
          </p>
        </motion.header>

        {/* Controls */}
        <motion.div 
          className="flex justify-center items-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant="outline"
            className="px-6 py-3 text-lg"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          <Button
            onClick={resetStats}
            variant="outline"
            className="px-6 py-3 text-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {t.controls.reset}
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-yellow-200/50">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === "en" ? "Score" : "Điểm Số"}
              </h3>
              <p className="text-3xl font-bold text-yellow-600">{score}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200/50">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === "en" ? "Accuracy" : "Độ Chính Xác"}
              </h3>
              <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200/50">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === "en" ? "Streak" : "Chuỗi Đúng"}
              </h3>
              <p className="text-3xl font-bold text-orange-600">{streak}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Problem */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProblem.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Story Context */}
            <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-red-200/50">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {language === "en" ? "Word Problem" : "Bài Toán Có Lời Văn"}
                </h2>
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {currentProblem.storyContext[language]}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Math Problem */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
              <div className="text-center">
                <NumberHouse
                  hundreds={currentProblem.number1.hundreds}
                  tens={currentProblem.number1.tens}
                  units={currentProblem.number1.units}
                  label={t.numberHouse.minuend}
                  size="large"
                  language={language}
                />
              </div>

              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, -360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Minus className="w-16 h-16 text-red-600 mx-auto" />
                </motion.div>
                <p className="text-2xl font-bold text-gray-700 mt-4">{t.operations.subtract}</p>
              </div>

              <div className="text-center">
                <NumberHouse
                  hundreds={currentProblem.number2.hundreds}
                  tens={currentProblem.number2.tens}
                  units={currentProblem.number2.units}
                  label={t.numberHouse.subtrahend}
                  size="large"
                  language={language}
                />
              </div>
            </div>

            {/* Answer Input */}
            <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-blue-200/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  {language === "en" ? "Enter Your Answer" : "Nhập Đáp Án Của Bạn"}
                </h3>
                
                <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-6">
                  <div className="text-center">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      {t.numberHouse.hundreds}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="9"
                      value={userAnswer.hundreds}
                      onChange={(e) => setUserAnswer(prev => ({ ...prev, hundreds: e.target.value }))}
                      className="text-center text-2xl font-bold h-16"
                      disabled={feedback !== null}
                    />
                  </div>
                  
                  <div className="text-center">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      {t.numberHouse.tens}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="9"
                      value={userAnswer.tens}
                      onChange={(e) => setUserAnswer(prev => ({ ...prev, tens: e.target.value }))}
                      className="text-center text-2xl font-bold h-16"
                      disabled={feedback !== null}
                    />
                  </div>
                  
                  <div className="text-center">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      {t.numberHouse.units}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="9"
                      value={userAnswer.units}
                      onChange={(e) => setUserAnswer(prev => ({ ...prev, units: e.target.value }))}
                      className="text-center text-2xl font-bold h-16"
                      disabled={feedback !== null}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={checkAnswer}
                    disabled={feedback !== null || !userAnswer.hundreds || !userAnswer.tens || !userAnswer.units}
                    className="px-12 py-4 text-xl font-bold bg-red-500 hover:bg-red-600"
                  >
                    {language === "en" ? "Check Answer" : "Kiểm Tra Đáp Án"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <Card className={`max-w-md mx-auto ${
                    feedback === "correct" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
                  }`}>
                    <CardContent className="p-8">
                      {feedback === "correct" ? (
                        <>
                          <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-green-800 mb-2">
                            {language === "en" ? "Correct!" : "Chính Xác!"}
                          </h3>
                          <p className="text-lg text-green-700">
                            {language === "en" ? "Well done! 🎉" : "Bạn làm rất tốt! 🎉"}
                          </p>
                        </>
                      ) : (
                        <>
                          <X className="w-16 h-16 text-red-600 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-red-800 mb-2">
                            {language === "en" ? "Not Quite Right" : "Chưa Đúng"}
                          </h3>
                          <p className="text-lg text-red-700 mb-4">
                            {language === "en" ? "The correct answer is:" : "Đáp án đúng là:"}
                          </p>
                          <div className="text-3xl font-bold text-red-800">
                            {currentProblem.correctAnswer.hundreds}{currentProblem.correctAnswer.tens}{currentProblem.correctAnswer.units}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};