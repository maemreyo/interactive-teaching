// src/components/SafeVocabularyTooltip.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Volume2, Star, Brain } from 'lucide-react';
import { Vocabulary } from '../hooks/useNotes';

interface SafeVocabularyTooltipProps {
  vocabulary: Vocabulary[];
  isEnabled: boolean;
  spacedRepetitionEnabled: boolean;
  difficultyAdaptation: boolean;
  eyeBlinkSensitivity: number;
  onVocabularyInteraction: (vocabularyId: string, isCorrect: boolean, timeSpent: number) => void;
  onDifficultyFeedback: (vocabularyId: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  vocabularyDueForReview: Vocabulary[];
}

const SafeVocabularyTooltip: React.FC<SafeVocabularyTooltipProps> = ({
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
  const [showTime, setShowTime] = useState<number>(0);
  const [interactionStartTime, setInteractionStartTime] = useState<number>(0);
  const [showDifficultyFeedback, setShowDifficultyFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLearned, setIsLearned] = useState(false);
  const [streak, setStreak] = useState(0);
  const [attentionScore, setAttentionScore] = useState(85); // Simulated attention score

  // Smart vocabulary selection with spaced repetition
  const selectVocabulary = (): Vocabulary | null => {
    if (vocabulary.length === 0) return null;
    
    if (spacedRepetitionEnabled && vocabularyDueForReview.length > 0) {
      // Prioritize vocabulary due for review
      const randomIndex = Math.floor(Math.random() * vocabularyDueForReview.length);
      return vocabularyDueForReview[randomIndex];
    }
    
    // Fallback to random selection
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    return vocabulary[randomIndex];
  };

  // Adaptive timing based on difficulty
  const calculateDisplayTime = (word: Vocabulary): number => {
    let baseTime = 5000; // 5 seconds default
    
    if (difficultyAdaptation) {
      // Adjust based on word length and complexity
      const wordComplexity = word.word.length + (word.meaning?.length || 0) / 10;
      baseTime += wordComplexity * 100;
    }
    
    // Adjust based on simulated attention score
    if (attentionScore < 50) {
      baseTime += 2000; // Show longer if attention is low
    }
    
    return Math.min(baseTime, 8000); // Max 8 seconds
  };

  // Simulate attention patterns
  useEffect(() => {
    if (!isEnabled || !isVisible) return;

    const simulateAttention = () => {
      setAttentionScore(prev => {
        // Simulate realistic attention fluctuations
        const change = (Math.random() - 0.5) * 20;
        return Math.max(30, Math.min(100, prev + change));
      });
    };

    const attentionInterval = setInterval(simulateAttention, 2000);
    return () => clearInterval(attentionInterval);
  }, [isEnabled, isVisible]);

  useEffect(() => {
    if (!isEnabled || vocabulary.length === 0) {
      setIsVisible(false);
      return;
    }

    const showTooltip = () => {
      const selectedWord = selectVocabulary();
      if (!selectedWord) return;

      setCurrentWord(selectedWord);
      setInteractionStartTime(Date.now());
      setShowTime(calculateDisplayTime(selectedWord));
      setProgress(0);
      setIsLearned(false);
      setShowDifficultyFeedback(false);

      // Smart positioning to avoid edges
      const x = Math.random() * (window.innerWidth - 400) + 20;
      const y = Math.random() * (window.innerHeight - 300) + 100;
      setPosition({ x, y });

      setIsVisible(true);
      
      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, showTime / 50);

      // Auto hide with optional difficulty feedback
      const hideTimeout = setTimeout(() => {
        if (difficultyAdaptation) {
          setShowDifficultyFeedback(true);
        } else {
          handleClose();
        }
      }, showTime);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(hideTimeout);
      };
    };

    // Start with an initial shorter interval to show the first tooltip quickly
    const showInitialTooltip = () => {
      if (!isVisible) {
        showTooltip();
      }
    };

    // Show first tooltip after 2 seconds
    const initialTimeout = setTimeout(showInitialTooltip, 2000);

    // Adaptive interval based on attention
    const scheduleNextTooltip = () => {
      let baseInterval = 15000; // 15 seconds default (shorter for better UX)
      
      if (attentionScore > 80) {
        baseInterval = 10000; // Show more frequently when attentive
      } else if (attentionScore < 40) {
        baseInterval = 25000; // Show less frequently when distracted
      }
      
      const nextInterval = baseInterval + Math.random() * 5000; // Add randomness
      
      return setTimeout(() => {
        if (!isVisible) {
          showTooltip();
          // Schedule the next one
          scheduleNextTooltip();
        }
      }, nextInterval);
    };

    // Start the scheduling after initial tooltip
    let scheduledTimeout: NodeJS.Timeout;
    const scheduleTimeout = setTimeout(() => {
      scheduledTimeout = scheduleNextTooltip();
    }, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(scheduleTimeout);
      if (scheduledTimeout) {
        clearTimeout(scheduledTimeout);
      }
    };
  }, [vocabulary, isEnabled, isVisible, spacedRepetitionEnabled, difficultyAdaptation, attentionScore]);

  const handleClose = () => {
    if (currentWord) {
      const timeSpent = Date.now() - interactionStartTime;
      onVocabularyInteraction(currentWord.id, isLearned, timeSpent);
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
    setIsLearned(true);
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
          className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl p-4 max-w-sm border-4 border-white/20 relative overflow-hidden"
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
          {/* Attention indicator */}
          <div className="absolute top-2 right-2 flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${
              attentionScore > 70 ? 'bg-green-300' : 
              attentionScore > 40 ? 'bg-yellow-300' : 'bg-red-300'
            }`} />
            <span className="text-xs">{Math.round(attentionScore)}%</span>
          </div>

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
            
            <div className="flex items-center space-x-1 text-xs text-white/70">
              <span>Focus: {Math.round(attentionScore)}%</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

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
              left: Math.random() * 300,
              top: Math.random() * 200,
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

export default SafeVocabularyTooltip;