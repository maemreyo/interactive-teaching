// src/hooks/useNotes.ts
import { useState, useEffect } from 'react';

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

export interface UnitNotes {
  notes: Note[];
  vocabulary: Vocabulary[];
  settings: {
    tooltipsEnabled: boolean;
  };
  teacherInfo: TeacherInfo;
}

const STORAGE_KEY = 'teaching-app-notes';

export const useNotes = (unitId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo>({ name: '', gender: 'female' });
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const allUnitsData = JSON.parse(savedData);
        const unitData: UnitNotes = allUnitsData[unitId] || { 
          notes: [], 
          vocabulary: [], 
          settings: { tooltipsEnabled: true },
          teacherInfo: { name: '', gender: 'female' }
        };
        
        // Convert date strings back to Date objects
        const notesWithDates = unitData.notes.map(note => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        
        const vocabWithDates = unitData.vocabulary.map(vocab => ({
          ...vocab,
          createdAt: new Date(vocab.createdAt)
        }));
        
        setNotes(notesWithDates);
        setVocabulary(vocabWithDates);
        setTooltipsEnabled(unitData.settings?.tooltipsEnabled ?? true);
        setTeacherInfo(unitData.teacherInfo || { name: '', gender: 'female' });
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [unitId]);

  // Save data to localStorage
  const saveToStorage = (
    newNotes: Note[], 
    newVocabulary: Vocabulary[], 
    newSettings?: { tooltipsEnabled: boolean },
    newTeacherInfo?: TeacherInfo
  ) => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const allUnitsData = savedData ? JSON.parse(savedData) : {};
      
      allUnitsData[unitId] = {
        notes: newNotes,
        vocabulary: newVocabulary,
        settings: newSettings || { tooltipsEnabled },
        teacherInfo: newTeacherInfo || teacherInfo
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allUnitsData));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  // Notes functions
  const addNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveToStorage(updatedNotes, vocabulary);
  };

  const updateNote = (id: string, content: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? { ...note, content, updatedAt: new Date() }
        : note
    );
    
    setNotes(updatedNotes);
    saveToStorage(updatedNotes, vocabulary);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveToStorage(updatedNotes, vocabulary);
  };

  // Vocabulary functions
  const addVocabulary = (word: string, meaning: string, example?: string) => {
    const newVocab: Vocabulary = {
      id: Date.now().toString(),
      word,
      meaning,
      example,
      createdAt: new Date()
    };
    
    const updatedVocabulary = [newVocab, ...vocabulary];
    setVocabulary(updatedVocabulary);
    saveToStorage(notes, updatedVocabulary);
  };

  const updateVocabulary = (id: string, word: string, meaning: string, example?: string) => {
    const updatedVocabulary = vocabulary.map(vocab =>
      vocab.id === id
        ? { ...vocab, word, meaning, example }
        : vocab
    );
    
    setVocabulary(updatedVocabulary);
    saveToStorage(notes, updatedVocabulary);
  };

  const deleteVocabulary = (id: string) => {
    const updatedVocabulary = vocabulary.filter(vocab => vocab.id !== id);
    setVocabulary(updatedVocabulary);
    saveToStorage(notes, updatedVocabulary);
  };

  // Export functions
  const exportNotes = () => {
    const data = {
      unitId,
      exportDate: new Date().toISOString(),
      notes,
      vocabulary
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${unitId}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTooltips = (enabled: boolean) => {
    setTooltipsEnabled(enabled);
    saveToStorage(notes, vocabulary, { tooltipsEnabled: enabled });
  };

  const updateTeacherInfo = (newTeacherInfo: TeacherInfo) => {
    setTeacherInfo(newTeacherInfo);
    saveToStorage(notes, vocabulary, undefined, newTeacherInfo);
  };

  const clearAllData = () => {
    setNotes([]);
    setVocabulary([]);
    setTooltipsEnabled(true);
    const defaultTeacherInfo = { name: '', gender: 'female' as const };
    setTeacherInfo(defaultTeacherInfo);
    saveToStorage([], [], { tooltipsEnabled: true }, defaultTeacherInfo);
  };

  return {
    notes,
    vocabulary,
    tooltipsEnabled,
    teacherInfo,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    toggleTooltips,
    updateTeacherInfo,
    exportNotes,
    clearAllData
  };
};