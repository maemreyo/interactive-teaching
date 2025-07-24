// src/components/NotesFloatingButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StickyNote } from 'lucide-react';
import NotesTool from './NotesTool';
import EnhancedVocabularyTooltip from './EnhancedVocabularyTooltip';
import ParentReportGenerator from './ParentReportGenerator';
import { useNotes, Vocabulary } from '../hooks/useNotes';

interface NotesFloatingButtonProps {
  unitId: string;
}

const NotesFloatingButton: React.FC<NotesFloatingButtonProps> = ({ unitId }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { 
    notes,
    vocabulary, 
    vocabularyProgress,
    sessions,
    settings,
    teacherInfo,
    updateVocabularyProgress,
    getVocabularyDueForReview,
  } = useNotes(unitId);
  const [vocabularyDueForReview, setVocabularyDueForReview] = useState<Vocabulary[]>([]);
  
  useEffect(() => {
    const loadDueVocabulary = async () => {
      try {
        const dueVocab = await getVocabularyDueForReview();
        setVocabularyDueForReview(dueVocab);
      } catch (error) {
        console.error('Error loading due vocabulary:', error);
        setVocabularyDueForReview([]); // Fallback to empty array
      }
    };
    
    // Debounce the load function to prevent rapid re-loads
    const timeoutId = setTimeout(loadDueVocabulary, 300);
    
    return () => clearTimeout(timeoutId);
  }, [vocabulary, vocabularyProgress, getVocabularyDueForReview]);
  
  const handleVocabularyInteraction = async (vocabularyId: string, isCorrect: boolean, timeSpent: number) => {
    await updateVocabularyProgress(vocabularyId, isCorrect, timeSpent);
    // Refresh due vocabulary list
    const dueVocab = await getVocabularyDueForReview();
    setVocabularyDueForReview(dueVocab);
  };
  
  const handleDifficultyFeedback = (vocabularyId: string, difficulty: 'easy' | 'medium' | 'hard') => {
    // Handle difficulty feedback - could be used for adaptive learning
    console.log(`Vocabulary ${vocabularyId} difficulty: ${difficulty}`);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsNotesOpen(true)}
        className="fixed bottom-25 right-6 z-60 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        title="Open Teaching Notes"
      >
        <StickyNote className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Teaching Notes
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </motion.button>

      {/* Enhanced Vocabulary Tooltips */}
      {/* <EnhancedVocabularyTooltip
        vocabulary={vocabulary}
        isEnabled={settings.tooltipsEnabled && !isNotesOpen && !isReportOpen}
        spacedRepetitionEnabled={settings.spacedRepetitionEnabled}
        difficultyAdaptation={settings.difficultyAdaptation}
        eyeBlinkSensitivity={settings.eyeBlinkSensitivity}
        onVocabularyInteraction={handleVocabularyInteraction}
        onDifficultyFeedback={handleDifficultyFeedback}
        vocabularyDueForReview={vocabularyDueForReview}
      /> */}

      {/* Notes Tool Modal */}
      <NotesTool
        unitId={unitId}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        onOpenReport={() => setIsReportOpen(true)}
      />
      
      {/* Parent Report Generator */}
      <ParentReportGenerator
        unitId={unitId}
        notes={notes}
        vocabulary={vocabulary}
        vocabularyProgress={vocabularyProgress}
        sessions={sessions}
        teacherInfo={teacherInfo}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </>
  );
};

export default NotesFloatingButton;