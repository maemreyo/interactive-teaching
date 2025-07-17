// src/app/cambridge/unit-3/subtraction/components/SubtractionLessonPage.tsx
"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Language } from "../../shared/types";
import { translations } from "../../shared/translations";
import { NumberHouse } from "../../shared/NumberHouse";
import { LanguageToggle } from "../../shared/LanguageToggle";
import { subtractionSteps } from "./subtractionSteps";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRightLeft,
  Minus
} from "lucide-react";

interface SubtractionLessonPageProps {
  setPage: (page: "home" | "lesson" | "practice") => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const SubtractionLessonPage = ({ setPage, language, onLanguageChange }: SubtractionLessonPageProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const t = translations[language];
  const currentStepData = subtractionSteps[currentStep];

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

  const nextStep = () => {
    if (currentStep < subtractionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      playSound('correct.mp3');
      speakText(subtractionSteps[currentStep + 1].voiceText[language]);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      playSound('correct.mp3');
      speakText(subtractionSteps[currentStep - 1].voiceText[language]);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    playSound('start.wav');
    speakText(subtractionSteps[0].voiceText[language]);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      speakText(currentStepData.voiceText[language]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-red-400 rounded-full blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
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

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            {t.operations.subtraction}
          </h1>
          <p className="text-xl text-gray-700">
            {language === "en" ? "Example: 472 - 267 = ?" : "Ví dụ: 472 - 267 = ?"}
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
            onClick={toggleAutoPlay}
            className={`px-6 py-3 text-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isPlaying ? t.controls.pause : t.controls.play}
          </Button>

          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant="outline"
            className="px-6 py-3 text-lg"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          <Button
            onClick={resetLesson}
            variant="outline"
            className="px-6 py-3 text-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t.controls.restart}
          </Button>
        </motion.div>

        {/* Progress */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">
                {t.progress.step} {currentStep + 1} {t.progress.of} {subtractionSteps.length}
              </span>
              <div className="flex space-x-2">
                {subtractionSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / subtractionSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Step Title and Description */}
            <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-red-200/50">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {currentStepData.title[language]}
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  {currentStepData.description[language]}
                </p>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-lg text-gray-700 italic">
                    &quot;{currentStepData.explanation[language]}&quot;
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Number Houses */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* First Number */}
              <div className="text-center">
                <NumberHouse
                  hundreds={currentStepData.number1.hundreds}
                  tens={currentStepData.number1.tens}
                  units={currentStepData.number1.units}
                  label={`${t.numberHouse.minuend}: 472`}
                  highlightColumn={currentStepData.highlightColumn}
                  borrowValue={currentStepData.borrowValue}
                  size="large"
                  language={language}
                />
              </div>

              {/* Minus Sign */}
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
                
                {/* Borrow indicator */}
                {currentStepData.borrowValue && (
                  <motion.div
                    className="mt-4 bg-blue-100 border-2 border-blue-300 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                  >
                    <ArrowRightLeft className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-blue-600">
                      {t.feedback.borrow}: {currentStepData.borrowValue} {language === "en" ? "ten" : "chục"}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Second Number */}
              <div className="text-center">
                <NumberHouse
                  hundreds={currentStepData.number2.hundreds}
                  tens={currentStepData.number2.tens}
                  units={currentStepData.number2.units}
                  label={`${t.numberHouse.subtrahend}: 267`}
                  highlightColumn={currentStepData.highlightColumn}
                  size="large"
                  language={language}
                />
              </div>
            </div>

            {/* Result */}
            {currentStepData.result && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="bg-gradient-to-r from-red-400 to-orange-500 text-white p-2 rounded-t-lg text-xl font-bold">
                  {t.numberHouse.result}
                </div>
                <NumberHouse
                  hundreds={currentStepData.result.hundreds}
                  tens={currentStepData.result.tens}
                  units={currentStepData.result.units}
                  label=""
                  showRoof={false}
                  highlightColumn={currentStepData.highlightColumn}
                  size="large"
                  language={language}
                  className="border-4 border-red-400 rounded-b-lg bg-red-50"
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          className="flex justify-center items-center space-x-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-8 py-4 text-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.navigation.previous}
          </Button>

          <div className="text-lg font-semibold text-gray-700 px-4">
            {currentStep + 1} {t.progress.of} {subtractionSteps.length}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === subtractionSteps.length - 1}
            className="px-8 py-4 text-lg bg-red-500 hover:bg-red-600 disabled:opacity-50"
          >
            {t.navigation.next}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};