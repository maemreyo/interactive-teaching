// src/components/EnhancedVocabularyTooltip.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Volume2, Eye, Brain, Star, ChevronRight } from 'lucide-react';
import { Vocabulary } from '../hooks/useNotes';

interface EnhancedVocabularyTooltipProps {
  vocabulary: Vocabulary[];
  isEnabled: boolean;
  spacedRepetitionEnabled: boolean;
  difficultyAdaptation: boolean;
  eyeBlinkSensitivity: number;
  onVocabularyInteraction: (vocabularyId: string, isCorrect: boolean, timeSpent: number) => void;
  onDifficultyFeedback: (vocabularyId: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  vocabularyDueForReview: Vocabulary[];
}

interface EyeBlinkDetector {
  isBlinking: boolean;
  blinkCount: number;
  lastBlinkTime: number;
  attentionScore: number;
}

const EnhancedVocabularyTooltip: React.FC<EnhancedVocabularyTooltipProps> = ({
  vocabulary,
  isEnabled,
  spacedRepetitionEnabled,
  difficultyAdaptation,
  eyeBlinkSensitivity,
  onVocabularyInteraction,
  onDifficultyFeedback,
  vocabularyDueForReview
}) => {
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTime, setShowTime] = useState<number>(0);
  const [interactionStartTime, setInteractionStartTime] = useState<number>(0);
  const [eyeBlinkState, setEyeBlinkState] = useState<EyeBlinkDetector>({
    isBlinking: false,
    blinkCount: 0,
    lastBlinkTime: 0,
    attentionScore: 100
  });
  const [showDifficultyFeedback, setShowDifficultyFeedback] = useState(false);
  const [userFeedback, setUserFeedback] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLearned, setIsLearned] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Eye blink detection using MediaPipe or simple motion detection
  useEffect(() => {
    let mediaStream: MediaStream;
    let animationFrame: number;
    let initializationTimeout: NodeJS.Timeout;
    let isInitializing = false;
    
    const initializeEyeTracking = async () => {
      if (isInitializing) return;
      isInitializing = true;
      
      try {
        // Add timeout to prevent hanging on camera permission
        const timeoutPromise = new Promise((_, reject) => {
          initializationTimeout = setTimeout(() => {
            reject(new Error('Camera initialization timeout'));
          }, 5000); // 5 second timeout
        });
        
        const cameraPromise = navigator.mediaDevices.getUserMedia({ 
          video: { width: 320, height: 240 } 
        });
        
        mediaStream = await Promise.race([cameraPromise, timeoutPromise]) as MediaStream;
        
        if (initializationTimeout) {
          clearTimeout(initializationTimeout);
        }
        
        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          startEyeDetection();
        }
      } catch (error) {
        console.log('Eye tracking not available:', error);
        // Fallback to simulated attention tracking
        startSimulatedAttentionTracking();
      } finally {
        isInitializing = false;
      }
    };

    const startEyeDetection = () => {
      let frameCount = 0;
      const detectBlinks = () => {
        // Throttle detection to every 3rd frame to reduce CPU usage
        if (frameCount % 3 === 0) {
          if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const video = videoRef.current;
            
            if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
              try {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Simple blink detection based on pixel intensity changes
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const intensity = calculateIntensity(imageData);
                
                detectBlinkFromIntensity(intensity);
              } catch (error) {
                console.warn('Eye detection error:', error);
                // Fallback to simulated tracking
                startSimulatedAttentionTracking();
                return;
              }
            }
          }
        }
        
        frameCount++;
        if (isVisible && isEnabled) {
          animationFrame = requestAnimationFrame(detectBlinks);
        }
      };
      
      detectBlinks();
    };
    
    const startSimulatedAttentionTracking = () => {
      // Simulate attention tracking when camera is not available
      const simulateAttention = () => {
        setEyeBlinkState(prev => ({
          ...prev,
          attentionScore: Math.max(60, Math.min(100, prev.attentionScore + (Math.random() - 0.5) * 10)),
          blinkCount: prev.blinkCount + (Math.random() > 0.8 ? 1 : 0)
        }));
      };
      
      const interval = setInterval(simulateAttention, 2000);
      
      return () => clearInterval(interval);
    };

    const calculateIntensity = (imageData: ImageData): number => {
      let totalIntensity = 0;
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        totalIntensity += (r + g + b) / 3;
      }
      
      return totalIntensity / (data.length / 4);
    };

    const detectBlinkFromIntensity = (intensity: number) => {
      const now = Date.now();
      const threshold = 50 * eyeBlinkSensitivity; // Adjustable sensitivity
      
      if (intensity < threshold && !eyeBlinkState.isBlinking) {
        setEyeBlinkState(prev => ({
          ...prev,
          isBlinking: true,
          blinkCount: prev.blinkCount + 1,
          lastBlinkTime: now
        }));
      } else if (intensity >= threshold && eyeBlinkState.isBlinking) {
        setEyeBlinkState(prev => ({
          ...prev,
          isBlinking: false
        }));
      }
      
      // Calculate attention score based on blink patterns
      const timeSinceLastBlink = now - eyeBlinkState.lastBlinkTime;
      const attentionScore = Math.max(0, 100 - (timeSinceLastBlink / 1000) * 2); // Decrease over time
      
      setEyeBlinkState(prev => ({
        ...prev,
        attentionScore
      }));
    };

    if (isEnabled && isVisible) {
      initializeEyeTracking();
    }

    return () => {
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isEnabled, isVisible, eyeBlinkSensitivity]);

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

  // Adaptive timing based on difficulty and attention
  const calculateDisplayTime = (word: Vocabulary): number => {
    let baseTime = 5000; // 5 seconds default
    
    if (difficultyAdaptation) {
      // Adjust based on word length and complexity
      const wordComplexity = word.word.length + (word.meaning?.length || 0) / 10;
      baseTime += wordComplexity * 200;
    }
    
    // Adjust based on attention score
    if (eyeBlinkState.attentionScore < 50) {
      baseTime += 2000; // Show longer if attention is low
    }
    
    return Math.min(baseTime, 10000); // Max 10 seconds
  };

  useEffect(() => {
    if (!isEnabled || vocabulary.length === 0) {
      setIsVisible(false);
      return;
    }

    let tooltipInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const showTooltip = () => {
      const selectedWord = selectVocabulary();
      if (!selectedWord) return;

      setCurrentWord(selectedWord);
      setInteractionStartTime(Date.now());
      setShowTime(calculateDisplayTime(selectedWord));
      setProgress(0);
      setIsLearned(false);
      setUserFeedback(null);
      setShowDifficultyFeedback(false);

      // Smart positioning to avoid edges and overlap
      const x = Math.random() * (window.innerWidth - 400) + 20;
      const y = Math.random() * (window.innerHeight - 300) + 100;
      setPosition({ x, y });

      setIsVisible(true);
      
      // Progress animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, showTime / 100);

      // Auto hide with difficulty feedback
      hideTimeout = setTimeout(() => {
        if (difficultyAdaptation) {
          setShowDifficultyFeedback(true);
        } else {
          handleClose();
        }
      }, showTime);
    };

    // Adaptive interval based on attention and learning progress
    const getInterval = () => {
      let baseInterval = 10000; // 20 seconds default
      
      if (eyeBlinkState.attentionScore > 80) {
        baseInterval = 7000; // Show more frequently when attentive
      } else if (eyeBlinkState.attentionScore < 40) {
        baseInterval = 15000; // Show less frequently when distracted
      }
      
      return baseInterval + Math.random() * 10000; // Add randomness
    };

    tooltipInterval = setInterval(() => {
      if (!isVisible) {
        showTooltip();
      }
    }, getInterval());

    return () => {
      if (tooltipInterval) clearInterval(tooltipInterval);
      if (progressInterval) clearInterval(progressInterval);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [vocabulary, isEnabled, isVisible, spacedRepetitionEnabled, difficultyAdaptation, eyeBlinkState.attentionScore]);

  const handleClose = () => {
    if (currentWord) {
      const timeSpent = Date.now() - interactionStartTime;
      onVocabularyInteraction(currentWord.id, isLearned, timeSpent);
    }
    setIsVisible(false);
  };

  const handleDifficultyFeedback = (difficulty: 'easy' | 'medium' | 'hard') => {
    setUserFeedback(difficulty);
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
        ref={tooltipRef}
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
            <Eye 
              className={`w-4 h-4 ${eyeBlinkState.attentionScore > 70 ? 'text-green-300' : 
                eyeBlinkState.attentionScore > 40 ? 'text-yellow-300' : 'text-red-300'}`} 
            />
            <span className="text-xs">{Math.round(eyeBlinkState.attentionScore)}%</span>
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
                "{currentWord.example}"
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
              <span>Blinks: {eyeBlinkState.blinkCount}</span>
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

        {/* Hidden video and canvas for eye tracking */}
        <video
          ref={videoRef}
          className="hidden"
          width="320"
          height="240"
          autoPlay
          muted
        />
        <canvas
          ref={canvasRef}
          className="hidden"
          width="320"
          height="240"
        />

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

export default EnhancedVocabularyTooltip;