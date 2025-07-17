// pdf-to-learn/src/app/global-success/unit-1/components/TenseComparisonLessonPage.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import {
  IntroductionSlide,
  TimeExpressionsSlide,
  ExamplesComparisonSlide,
  CommonMistakesSlide,
  QuickDecisionSlide
} from './TenseComparisonSlides';

const TenseComparisonLessonPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: IntroductionSlide, title: "Giới thiệu" },
    { component: TimeExpressionsSlide, title: "Từ chỉ thời gian" },
    { component: ExamplesComparisonSlide, title: "So sánh ví dụ" },
    { component: CommonMistakesSlide, title: "Lỗi thường gặp" },
    { component: QuickDecisionSlide, title: "Hướng dẫn chọn thì" }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header with Progress Bar - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b-2 border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/global-success/unit-1" 
              className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Trang chủ</span>
            </Link>
            
            <h1 className="text-xl md:text-2xl font-bold text-purple-800 text-center font-baloo-2">
              So sánh: Present Simple vs Present Continuous
            </h1>
            
            <div className="text-sm text-purple-600 font-medium">
              {currentSlide + 1}/{slides.length}
            </div>
          </div>
          
          <div className="bg-purple-200 rounded-full h-3 w-full">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
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

            {/* Slide indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-purple-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={slides[index].title}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center space-x-2 font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg transform hover:-translate-y-1'
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

export default TenseComparisonLessonPage;