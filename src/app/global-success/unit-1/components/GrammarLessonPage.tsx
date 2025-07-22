// pdf-to-learn/src/app/global-success/unit-1/components/GrammarLessonPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { SetPageProps } from './types';
import {
  IntroductionSlide,
  UsageSlide,
  AffirmativeFormSlide,
  NegativeFormSlide,
  InterrogativeFormSlide,
  SpellingRulesSlide,
  SignalWordsSlide,
  HowToGuideSlide
} from './GrammarSlides';
import {
  IntroductionSlide as PCIntroSlide,
  UsageSlide as PCUsageSlide,
  AffirmativeFormSlide as PCAffirmativeSlide,
  NegativeFormSlide as PCNegativeSlide,
  InterrogativeFormSlide as PCInterrogativeSlide,
  SignalWordsSlide as PCSignalWordsSlide,
  HowToGuideSlide as PCHowToGuideSlide
} from './PresentContinuousSlides';
import {
  IntroductionSlide as CompIntroSlide,
  TimeExpressionsSlide,
  ExamplesComparisonSlide,
  CommonMistakesSlide,
  QuickDecisionSlide
} from './TenseComparisonSlides';
import { ExerciseSlide } from './ExerciseSlide';

const slides = [
  // Present Simple Section
  { id: 1, title: "Present Simple - Giới thiệu", component: IntroductionSlide, section: "Present Simple" },
  { id: 2, title: "Present Simple - Cách sử dụng", component: UsageSlide, section: "Present Simple" },
  { id: 3, title: "Present Simple - Dạng khẳng định", component: AffirmativeFormSlide, section: "Present Simple" },
  { id: 4, title: "Present Simple - Dạng phủ định", component: NegativeFormSlide, section: "Present Simple" },
  { id: 5, title: "Present Simple - Dạng nghi vấn", component: InterrogativeFormSlide, section: "Present Simple" },
  { id: 6, title: "Present Simple - Quy tắc thêm s/es", component: SpellingRulesSlide, section: "Present Simple" },
  { id: 7, title: "Present Simple - Dấu hiệu nhận biết", component: SignalWordsSlide, section: "Present Simple" },
  { id: 8, title: "Present Simple - Công thức làm bài", component: HowToGuideSlide, section: "Present Simple" },
  
  // Present Continuous Section
  { id: 9, title: "Present Continuous - Giới thiệu", component: PCIntroSlide, section: "Present Continuous" },
  { id: 10, title: "Present Continuous - Cách sử dụng", component: PCUsageSlide, section: "Present Continuous" },
  { id: 11, title: "Present Continuous - Dạng khẳng định", component: PCAffirmativeSlide, section: "Present Continuous" },
  { id: 12, title: "Present Continuous - Dạng phủ định", component: PCNegativeSlide, section: "Present Continuous" },
  { id: 13, title: "Present Continuous - Dạng nghi vấn", component: PCInterrogativeSlide, section: "Present Continuous" },
  { id: 14, title: "Present Continuous - Dấu hiệu nhận biết", component: PCSignalWordsSlide, section: "Present Continuous" },
  { id: 15, title: "Present Continuous - Công thức làm bài", component: PCHowToGuideSlide, section: "Present Continuous" },
  
  // Comparison Section
  { id: 16, title: "So sánh - Giới thiệu", component: CompIntroSlide, section: "So sánh" },
  { id: 17, title: "So sánh - Từ chỉ thời gian", component: TimeExpressionsSlide, section: "So sánh" },
  { id: 18, title: "So sánh - Ví dụ", component: ExamplesComparisonSlide, section: "So sánh" },
  { id: 19, title: "So sánh - Lỗi thường gặp", component: CommonMistakesSlide, section: "So sánh" },
  { id: 20, title: "So sánh - Hướng dẫn chọn thì", component: QuickDecisionSlide, section: "So sánh" },
  
  // Exercise Section
  { id: 21, title: "Bài tập vận dụng", component: ExerciseSlide, section: "Bài tập" }
];

export const GrammarLessonPage: React.FC<SetPageProps> = ({ setPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentSlide + 1) / slides.length) * 100);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Header with Progress Bar - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setPage("home")}
              className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Trang chủ</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-blue-800 font-baloo-2">
                Grammar Lesson: Unit 1
              </h1>
              <p className="text-sm text-blue-600 font-medium">
                {slides[currentSlide].section}
              </p>
            </div>
            
            <div className="text-sm text-blue-600 font-medium">
              {currentSlide + 1}/{slides.length}
            </div>
          </div>
          
          <div className="bg-blue-200 rounded-full h-3 w-full">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area - Full page */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - Fixed at bottom of screen */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-t-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center space-x-2 font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ${
                currentSlide === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg transform hover:-translate-y-1'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </button>

            {/* Section indicators */}
            <div className="flex space-x-4">
              {['Present Simple', 'Present Continuous', 'So sánh', 'Bài tập'].map((section) => {
                const sectionSlides = slides.filter(slide => slide.section === section);
                const isCurrentSection = slides[currentSlide].section === section;
                const sectionStartIndex = slides.findIndex(slide => slide.section === section);
                
                return (
                  <div key={section} className="flex flex-col items-center space-y-1">
                    <span className={`text-xs font-medium ${isCurrentSection ? 'text-blue-600' : 'text-gray-500'}`}>
                      {section}
                    </span>
                    <div className="flex space-x-1">
                      {sectionSlides.map((_, slideIndex) => {
                        const globalIndex = sectionStartIndex + slideIndex;
                        return (
                          <button
                            key={globalIndex}
                            onClick={() => goToSlide(globalIndex)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              globalIndex === currentSlide
                                ? 'bg-blue-500 scale-125'
                                : isCurrentSection
                                ? 'bg-blue-300 hover:bg-blue-400'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            title={slides[globalIndex].title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center space-x-2 font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1'
              }`}
            >
              <span>Tiếp theo</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};