// src/hooks/useNotes.ts
// UPDATED: 2025-01-17 - Migrated from localStorage to IndexedDB for better performance and enhanced features
import { useState, useEffect } from 'react';
import { indexedDBService, UnitData, VocabularyProgress, StudentSession } from '../services/indexedDBService';

export interface Vocabulary {
  id: string;
  word: string;
  meaning: string;
  example?: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherInfo {
  name: string;
  gender: 'male' | 'female' | 'other';
}

export interface EnhancedSettings {
  tooltipsEnabled: boolean;
  spacedRepetitionEnabled: boolean;
  difficultyAdaptation: boolean;
  eyeBlinkSensitivity: number;
}

export interface UnitNotes {
  notes: Note[];
  vocabulary: Vocabulary[];
  vocabularyProgress: VocabularyProgress[];
  sessions: StudentSession[];
  settings: EnhancedSettings;
  teacherInfo: TeacherInfo;
}

export const useNotes = (unitId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [vocabularyProgress, setVocabularyProgress] = useState<VocabularyProgress[]>([]);
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [settings, setSettings] = useState<EnhancedSettings>({
    tooltipsEnabled: true,
    spacedRepetitionEnabled: true,
    difficultyAdaptation: true,
    eyeBlinkSensitivity: 0.7
  });
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo>({ name: '', gender: 'female' });
  const [isLoading, setIsLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState<StudentSession | null>(null);

  // Load data from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if migration is needed (with timeout to prevent hanging)
        const migrationPromise = (async () => {
          const migrationComplete = await indexedDBService.getSetting('migrationComplete');
          if (!migrationComplete) {
            await indexedDBService.migrateFromLocalStorage();
          }
        })();
        
        // Add timeout to prevent hanging on migration
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Migration timeout'));
          }, 10000); // 10 second timeout
        });
        
        try {
          await Promise.race([migrationPromise, timeoutPromise]);
        } catch (migrationError) {
          console.warn('Migration failed or timed out:', migrationError);
          // Continue with normal loading even if migration fails
        }

        // Load unit data
        const unitData = await indexedDBService.getUnitData(unitId);
        
        if (unitData && unitData.vocabulary && unitData.vocabulary.length > 0) {
          setNotes(unitData.notes);
          setVocabulary(unitData.vocabulary);
          setVocabularyProgress(unitData.vocabularyProgress);
          setSessions(unitData.sessions);
          setSettings(unitData.settings);
          setTeacherInfo(unitData.teacherInfo);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the load function to prevent rapid re-loads
    const timeoutId = setTimeout(loadData, 100);
    
    return () => clearTimeout(timeoutId);
  }, [unitId]);

  // Initialize with sample vocabulary if none exists
  useEffect(() => {
    if (!isLoading && vocabulary.length === 0 && unitId === 'global-success-unit-1') {
      const sampleVocabulary: Vocabulary[] = [
        {
          id: 'vocab_1',
          word: 'activity',
          meaning: 'hoạt động',
          example: 'We do many activities at break time.',
          createdAt: new Date()
        },
        {
          id: 'vocab_2',
          word: 'creative',
          meaning: 'sáng tạo',
          example: 'She is very creative, she writes poetry and paints.',
          createdAt: new Date()
        },
        {
          id: 'vocab_3',
          word: 'excited',
          meaning: 'phấn chấn, phấn khích',
          example: 'The students are very excited about the first day of school.',
          createdAt: new Date()
        }
      ];
      setVocabulary(sampleVocabulary);
    }
  }, [isLoading, vocabulary.length, unitId]);

  // Save data to IndexedDB
  const saveToStorage = async (
    newNotes?: Note[], 
    newVocabulary?: Vocabulary[], 
    newVocabularyProgress?: VocabularyProgress[],
    newSessions?: StudentSession[],
    newSettings?: EnhancedSettings,
    newTeacherInfo?: TeacherInfo
  ) => {
    try {
      const unitData: UnitData = {
        unitId,
        notes: newNotes || notes,
        vocabulary: newVocabulary || vocabulary,
        vocabularyProgress: newVocabularyProgress || vocabularyProgress,
        sessions: newSessions || sessions,
        settings: newSettings || settings,
        teacherInfo: newTeacherInfo || teacherInfo,
        lastModified: new Date()
      };
      
      await indexedDBService.saveUnitData(unitData);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  // Notes functions
  const addNote = async (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    await saveToStorage(updatedNotes);
  };

  const updateNote = async (id: string, content: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? { ...note, content, updatedAt: new Date() }
        : note
    );
    
    setNotes(updatedNotes);
    await saveToStorage(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    await saveToStorage(updatedNotes);
  };

  // Vocabulary functions
  const addVocabulary = async (word: string, meaning: string, example?: string) => {
    const newVocab: Vocabulary = {
      id: Date.now().toString(),
      word,
      meaning,
      example,
      createdAt: new Date()
    };
    
    // Create initial progress tracking
    const initialProgress: VocabularyProgress = {
      id: `progress_${newVocab.id}`,
      vocabularyId: newVocab.id,
      correctCount: 0,
      incorrectCount: 0,
      lastReviewed: new Date(),
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Review in 24 hours
      difficultyLevel: 'medium',
      learningStreak: 0,
      totalTimeSpent: 0
    };
    
    const updatedVocabulary = [newVocab, ...vocabulary];
    const updatedProgress = [initialProgress, ...vocabularyProgress];
    
    setVocabulary(updatedVocabulary);
    setVocabularyProgress(updatedProgress);
    await saveToStorage(undefined, updatedVocabulary, updatedProgress);
  };

  const updateVocabulary = async (id: string, word: string, meaning: string, example?: string) => {
    const updatedVocabulary = vocabulary.map(vocab =>
      vocab.id === id
        ? { ...vocab, word, meaning, example }
        : vocab
    );
    
    setVocabulary(updatedVocabulary);
    await saveToStorage(undefined, updatedVocabulary);
  };

  const deleteVocabulary = async (id: string) => {
    const updatedVocabulary = vocabulary.filter(vocab => vocab.id !== id);
    const updatedProgress = vocabularyProgress.filter(progress => progress.vocabularyId !== id);
    
    setVocabulary(updatedVocabulary);
    setVocabularyProgress(updatedProgress);
    await saveToStorage(undefined, updatedVocabulary, updatedProgress);
  };

  // Export functions
  // Session management
  const startSession = async () => {
    const newSession: StudentSession = {
      id: `session_${Date.now()}`,
      unitId,
      startTime: new Date(),
      totalVocabularyShown: 0,
      totalVocabularyLearned: 0,
      attentionScore: 100,
      engagementMetrics: {
        tooltipClicks: 0,
        pronunciationAttempts: 0,
        timeSpentOnVocabulary: 0
      }
    };
    
    setCurrentSession(newSession);
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    await saveToStorage(undefined, undefined, undefined, updatedSessions);
  };

  const endSession = async () => {
    if (currentSession) {
      const endedSession = {
        ...currentSession,
        endTime: new Date()
      };
      
      const updatedSessions = sessions.map(session =>
        session.id === currentSession.id ? endedSession : session
      );
      
      setSessions(updatedSessions);
      setCurrentSession(null);
      await saveToStorage(undefined, undefined, undefined, updatedSessions);
    }
  };

  // Vocabulary progress tracking
  const updateVocabularyProgress = async (
    vocabularyId: string,
    isCorrect: boolean,
    timeSpent: number
  ) => {
    const existingProgress = vocabularyProgress.find(p => p.vocabularyId === vocabularyId);
    
    if (existingProgress) {
      const updatedProgress = {
        ...existingProgress,
        correctCount: isCorrect ? existingProgress.correctCount + 1 : existingProgress.correctCount,
        incorrectCount: !isCorrect ? existingProgress.incorrectCount + 1 : existingProgress.incorrectCount,
        lastReviewed: new Date(),
        learningStreak: isCorrect ? existingProgress.learningStreak + 1 : 0,
        totalTimeSpent: existingProgress.totalTimeSpent + timeSpent,
        nextReviewDate: calculateNextReviewDate(existingProgress, isCorrect),
        difficultyLevel: calculateDifficultyLevel(existingProgress, isCorrect)
      };
      
      const updatedProgressArray = vocabularyProgress.map(p =>
        p.vocabularyId === vocabularyId ? updatedProgress : p
      );
      
      setVocabularyProgress(updatedProgressArray);
      await saveToStorage(undefined, undefined, updatedProgressArray);
    }
  };

  const calculateNextReviewDate = (progress: VocabularyProgress, isCorrect: boolean): Date => {
    const now = new Date();
    let intervalHours = 24; // Default 24 hours
    
    if (isCorrect) {
      // Increase interval based on streak (spaced repetition)
      const multiplier = Math.min(progress.learningStreak + 1, 7);
      intervalHours = 24 * multiplier;
    } else {
      // Decrease interval for incorrect answers
      intervalHours = 4; // Review in 4 hours
    }
    
    return new Date(now.getTime() + intervalHours * 60 * 60 * 1000);
  };

  const calculateDifficultyLevel = (progress: VocabularyProgress, isCorrect: boolean): 'easy' | 'medium' | 'hard' => {
    const totalAttempts = progress.correctCount + progress.incorrectCount + 1;
    const correctRate = (progress.correctCount + (isCorrect ? 1 : 0)) / totalAttempts;
    
    if (correctRate >= 0.8) return 'easy';
    if (correctRate >= 0.5) return 'medium';
    return 'hard';
  };

  const getVocabularyDueForReview = async (): Promise<Vocabulary[]> => {
    const dueProgress = vocabularyProgress.filter(progress => 
      progress.nextReviewDate <= new Date()
    );
    
    return vocabulary.filter(vocab => 
      dueProgress.some(progress => progress.vocabularyId === vocab.id)
    );
  };

  const exportNotes = async () => {
    try {
      const exportData = await indexedDBService.exportData();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `teaching-notes-${unitId}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<EnhancedSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    await saveToStorage(undefined, undefined, undefined, undefined, updatedSettings);
  };

  const toggleTooltips = async (enabled: boolean) => {
    await updateSettings({ tooltipsEnabled: enabled });
  };

  const updateTeacherInfo = async (newTeacherInfo: TeacherInfo) => {
    setTeacherInfo(newTeacherInfo);
    await saveToStorage(undefined, undefined, undefined, undefined, undefined, newTeacherInfo);
  };

  const clearAllData = async () => {
    const emptyNotes: Note[] = [];
    const emptyVocabulary: Vocabulary[] = [];
    const emptyProgress: VocabularyProgress[] = [];
    const emptySessions: StudentSession[] = [];
    const defaultSettings: EnhancedSettings = {
      tooltipsEnabled: true,
      spacedRepetitionEnabled: true,
      difficultyAdaptation: true,
      eyeBlinkSensitivity: 0.7
    };
    const defaultTeacherInfo = { name: '', gender: 'female' as const };
    
    setNotes(emptyNotes);
    setVocabulary(emptyVocabulary);
    setVocabularyProgress(emptyProgress);
    setSessions(emptySessions);
    setSettings(defaultSettings);
    setTeacherInfo(defaultTeacherInfo);
    
    await saveToStorage(emptyNotes, emptyVocabulary, emptyProgress, emptySessions, defaultSettings, defaultTeacherInfo);
  };

  return {
    // Data
    notes,
    vocabulary,
    vocabularyProgress,
    sessions,
    settings,
    tooltipsEnabled: settings.tooltipsEnabled,
    teacherInfo,
    isLoading,
    currentSession,
    
    // Note functions
    addNote,
    updateNote,
    deleteNote,
    
    // Vocabulary functions
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    updateVocabularyProgress,
    getVocabularyDueForReview,
    
    // Session functions
    startSession,
    endSession,
    
    // Settings functions
    updateSettings,
    toggleTooltips,
    updateTeacherInfo,
    
    // Utility functions
    exportNotes,
    clearAllData
  };
};