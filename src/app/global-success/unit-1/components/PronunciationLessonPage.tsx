// src/app/global-success/unit-1/components/PronunciationLessonPage.tsx
// CREATED: 2025-01-27 - Main pronunciation lesson page with 6 steps

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SetPageProps } from './types';
import { pronunciationSections } from './PronunciationData';
import { PronunciationStep1 } from './PronunciationStep1';
import { PronunciationStep2 } from './PronunciationStep2';
import { PronunciationStep3 } from './PronunciationStep3';
import { PronunciationStep4 } from './PronunciationStep4';
import { PronunciationStep5 } from './PronunciationStep5';

export const PronunciationLessonPage = ({ setPage }: SetPageProps) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const renderStepContent = (stepId: number) => {
    switch (stepId) {
      case 1:
        return <PronunciationStep1 />;
      case 2:
        return <PronunciationStep2 />;
      case 3:
        return <PronunciationStep3 />;
      case 4:
        return <PronunciationStep4 />;
      case 5:
        return <PronunciationStep5 />;
      case 6:
        return (
          <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-400 mb-6">
                🚧 Đang phát triển
              </h1>
              <p className="text-xl text-gray-500 mb-8">
                {pronunciationSections.find(s => s.id === stepId)?.title}
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl">
                {pronunciationSections.find(s => s.id === stepId)?.description}
              </p>
              <button
                onClick={() => setCurrentStep(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                ← Quay lại danh sách bài học
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (currentStep !== null) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed top-4 left-4 z-10">
            <button
              onClick={() => setCurrentStep(null)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
            >
              ← Quay lại
            </button>
          </div>
          {renderStepContent(currentStep)}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setPage("home")}
            className="mb-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Về trang chủ
          </button>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            🎵 Pronunciation Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Học phát âm tiếng Anh qua 6 bước từ cơ bản đến nâng cao. 
            Mỗi bước tập trung vào các cặp âm quan trọng với từ vựng Unit 1.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tiến độ học tập</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {pronunciationSections.map((section, index) => (
                <div key={section.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    section.isActive 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {section.id}
                  </div>
                  {index < pronunciationSections.length - 1 && (
                    <div className="w-8 h-1 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-4">
              <span className="font-semibold text-green-600">5/6</span> bài học đã hoàn thành
            </p>
          </div>
        </motion.div>

        {/* Lesson Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pronunciationSections.map((section) => (
            <Card
              key={section.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                section.isActive
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-green-200'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:shadow-gray-200'
              }`}
              onClick={() => setCurrentStep(section.id)}
            >
              <CardHeader>
                <CardTitle className={`text-lg ${
                  section.isActive ? 'text-green-700' : 'text-gray-600'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold ${
                      section.isActive ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {section.sound}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      section.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {section.isActive ? 'Sẵn sàng' : 'Sắp ra mắt'}
                    </span>
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm mb-4 ${
                  section.isActive ? 'text-gray-700' : 'text-gray-500'
                }`}>
                  {section.description}
                </p>
                
                {section.isActive && (
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {section.words.length} từ vựng
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Có phát âm
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      Tương tác
                    </span>
                  </div>
                )}
                
                {!section.isActive && (
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      Đang phát triển
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12 text-gray-600"
        >
          <p className="text-sm">
            💡 Mẹo: Hãy luyện tập mỗi ngày 10-15 phút để cải thiện phát âm hiệu quả nhất!
          </p>
        </motion.div>
      </div>
    </div>
  );
};