// src/stores/quizStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuizResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  maxStreak: number;
  accuracy: number;
  timeSpent: number; // in seconds
  completedQuestions: number;
  unit: string;
}

export interface QuizSession {
  currentScore: number;
  currentStreak: number;
  maxStreak: number;
  startTime: number;
  completedQuestions: number;
  totalQuestions: number;
}

interface QuizStore {
  // Quiz results history
  results: QuizResult[];
  
  // Current session
  currentSession: QuizSession | null;
  
  // Actions
  startSession: (totalQuestions: number) => void;
  updateSession: (updates: Partial<QuizSession>) => void;
  endSession: (unit: string) => QuizResult;
  clearSession: () => void;
  getSessionStats: () => QuizSession | null;
  
  // Results management
  addResult: (result: QuizResult) => void;
  getResults: () => QuizResult[];
  getBestScore: (unit?: string) => QuizResult | null;
  getAverageAccuracy: (unit?: string) => number;
  clearResults: () => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      results: [],
      currentSession: null,

      startSession: (totalQuestions: number) => {
        set({
          currentSession: {
            currentScore: 0,
            currentStreak: 0,
            maxStreak: 0,
            startTime: Date.now(),
            completedQuestions: 0,
            totalQuestions,
          }
        });
      },

      updateSession: (updates: Partial<QuizSession>) => {
        const current = get().currentSession;
        if (current) {
          set({
            currentSession: {
              ...current,
              ...updates,
              maxStreak: Math.max(
                current.maxStreak, 
                updates.currentStreak ?? current.currentStreak
              )
            }
          });
        }
      },

      endSession: (unit: string) => {
        const session = get().currentSession;
        if (!session) {
          throw new Error('No active session to end');
        }

        const timeSpent = Math.round((Date.now() - session.startTime) / 1000);
        const accuracy = Math.round((session.currentScore / session.totalQuestions) * 100);

        const result: QuizResult = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          score: session.currentScore,
          totalQuestions: session.totalQuestions,
          maxStreak: session.maxStreak,
          accuracy,
          timeSpent,
          completedQuestions: session.completedQuestions,
          unit,
        };

        // Add to results
        set(state => ({
          results: [result, ...state.results].slice(0, 50) // Keep last 50 results
        }));

        return result;
      },

      clearSession: () => {
        set({ currentSession: null });
      },

      getSessionStats: () => {
        return get().currentSession;
      },

      addResult: (result: QuizResult) => {
        set(state => ({
          results: [result, ...state.results].slice(0, 50)
        }));
      },

      getResults: () => {
        return get().results;
      },

      getBestScore: (unit?: string) => {
        const results = get().results;
        const filtered = unit ? results.filter(r => r.unit === unit) : results;
        
        if (filtered.length === 0) return null;
        
        return filtered.reduce((best, current) => 
          current.accuracy > best.accuracy ? current : best
        );
      },

      getAverageAccuracy: (unit?: string) => {
        const results = get().results;
        const filtered = unit ? results.filter(r => r.unit === unit) : results;
        
        if (filtered.length === 0) return 0;
        
        const totalAccuracy = filtered.reduce((sum, result) => sum + result.accuracy, 0);
        return Math.round(totalAccuracy / filtered.length);
      },

      clearResults: () => {
        set({ results: [] });
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({ 
        results: state.results,
        // Don't persist current session - it should reset on page reload
      }),
    }
  )
);