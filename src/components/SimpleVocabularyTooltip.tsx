// src/components/SimpleVocabularyTooltip.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Volume2, Star, Brain } from 'lucide-react';
import { Vocabulary } from '../hooks/useNotes';

interface SimpleVocabularyTooltipProps {
  vocabulary: Vocabulary[];
  isEnabled: boolean;
  spacedRepetitionEnabled: boolean;
  difficultyAdaptation: boolean;
  eyeBlinkSensitivity: number;
  onVocabularyInteraction: (vocabularyId: string, isCorrect: boolean, timeSpent: number) => void;
  onDifficultyFeedback: (vocabularyId: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  vocabularyDueForReview: Vocabulary[];
}

const SimpleVocabularyTooltip: React.FC<SimpleVocabularyTooltipProps> = ({
  vocabulary,
  isEnabled,
  spacedRepetitionEnabled,
  difficultyAdaptation,
  onVocabularyInteraction,
  onDifficultyFeedback,
  vocabularyDueForReview
}) => {
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [interactionStartTime, setInteractionStartTime] = useState<number>(0);
  const [showDifficultyFeedback, setShowDifficultyFeedback] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!isEnabled || vocabulary.length === 0) {
      setIsVisible(false);
      return;
    }

    const showTooltip = () => {
      // Select vocabulary - prioritize spaced repetition
      let selectedWord: Vocabulary;
      if (spacedRepetitionEnabled && vocabularyDueForReview.length > 0) {
        selectedWord = vocabularyDueForReview[Math.floor(Math.random() * vocabularyDueForReview.length)];
      } else {
        selectedWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
      }

      setCurrentWord(selectedWord);
      setInteractionStartTime(Date.now());
      setShowDifficultyFeedback(false);

      // Random position (avoiding edges)
      const x = Math.random() * (window.innerWidth - 320) + 20;
      const y = Math.random() * (window.innerHeight - 200) + 100;
      setPosition({ x, y });

      setIsVisible(true);

      // Auto hide after 4-6 seconds
      const hideTimeout = setTimeout(() => {
        if (difficultyAdaptation) {
          setShowDifficultyFeedback(true);
        } else {
          setIsVisible(false);
        }
      }, 4000 + Math.random() * 2000);

      return hideTimeout;
    };

    // Show tooltip every 15-30 seconds
    const interval = setInterval(() => {
      if (!isVisible) {
        showTooltip();
      }
    }, 3000 + Math.random() * 3000);

    return () => {
      clearInterval(interval);
    };
  }, [vocabulary, isEnabled, isVisible, spacedRepetitionEnabled, difficultyAdaptation, vocabularyDueForReview]);

  const handleClose = () => {
    if (currentWord) {
      const timeSpent = Date.now() - interactionStartTime;
      onVocabularyInteraction(currentWord.id, false, timeSpent);
    }
    setIsVisible(false);
  };

  const handleDifficultyFeedback = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (currentWord) {
      onDifficultyFeedback(currentWord.id, difficulty);
      const timeSpent = Date.now() - interactionStartTime;
      onVocabularyInteraction(currentWord.id, difficulty === 'easy', timeSpent);
    }
    setShowDifficultyFeedback(false);
    setIsVisible(false);
  };

  const handleLearned = () => {
    setStreak(prev => prev + 1);
    if (currentWord) {
      const timeSpent = Date.now() - interactionStartTime;
      onVocabularyInteraction(currentWord.id, true, timeSpent);
    }
    setIsVisible(false);
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isVisible || !currentWord) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 1000,
        }}
        className="pointer-events-auto"
      >
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl p-4 max-w-xs border-4 border-white/20"
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              '0 10px 30px rgba(59, 130, 246, 0.3)',
              '0 15px 40px rgba(147, 51, 234, 0.4)',
              '0 10px 30px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium opacity-90">
                {spacedRepetitionEnabled ? 'Spaced Review' : 'Quick Review'}
              </span>
              {streak > 0 && (
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs">{streak}</span>
                </div>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Word */}
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <motion.h3
                className="text-xl font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {currentWord.word}
              </motion.h3>
              <button
                onClick={() => speakWord(currentWord.word)}
                className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                title="Pronounce word"
              >
                <Volume2 className="w-3 h-3" />
              </button>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {currentWord.meaning}
            </p>
          </div>

          {/* Example */}
          {currentWord.example && (
            <div className="bg-white/10 rounded-lg p-3 mb-3">
              <p className="text-xs text-white/80 mb-1">Example:</p>
              <p className="text-sm italic text-white/95">
                &quot;{currentWord.example}&quot;
              </p>
            </div>
          )}

          {/* Interactive buttons */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={handleLearned}
              className="flex items-center space-x-1 bg-green-500/20 hover:bg-green-500/30 px-3 py-1 rounded-lg transition-colors"
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm">Got it!</span>
            </button>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="h-1 bg-white/20 rounded-full overflow-hidden"
            initial={{ width: '100%' }}
          >
            <motion.div
              className="h-full bg-white/60 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </motion.div>

          {/* Difficulty feedback modal */}
          {showDifficultyFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-sm mb-3">How difficult was this word?</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDifficultyFeedback('easy')}
                    className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded text-xs"
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => handleDifficultyFeedback('medium')}
                    className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded text-xs"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handleDifficultyFeedback('hard')}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs"
                  >
                    Hard
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sparkle effects */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-300 rounded-full"
            animate={{
              scale: [0, 1, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </motion.div>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: Math.random() * 200,
              top: Math.random() * 100,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SimpleVocabularyTooltip;