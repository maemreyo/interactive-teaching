/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/indexedDBService.ts
import { Note, Vocabulary, TeacherInfo } from '../hooks/useNotes';

export interface VocabularyProgress {
  id: string;
  vocabularyId: string;
  correctCount: number;
  incorrectCount: number;
  lastReviewed: Date;
  nextReviewDate: Date;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  learningStreak: number;
  totalTimeSpent: number; // in milliseconds
}

export interface StudentSession {
  id: string;
  unitId: string;
  startTime: Date;
  endTime?: Date;
  totalVocabularyShown: number;
  totalVocabularyLearned: number;
  attentionScore: number; // 0-100 based on interaction patterns
  engagementMetrics: {
    tooltipClicks: number;
    pronunciationAttempts: number;
    timeSpentOnVocabulary: number;
  };
}

export interface UnitData {
  unitId: string;
  notes: Note[];
  vocabulary: Vocabulary[];
  vocabularyProgress: VocabularyProgress[];
  sessions: StudentSession[];
  settings: {
    tooltipsEnabled: boolean;
    spacedRepetitionEnabled: boolean;
    difficultyAdaptation: boolean;
    eyeBlinkSensitivity: number;
  };
  teacherInfo: TeacherInfo;
  lastModified: Date;
}

class IndexedDBService {
  private dbName = 'TeachingNotesDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      // Add timeout to prevent hanging on database initialization
      const timeoutId = setTimeout(() => {
        reject(new Error('Database initialization timeout'));
      }, 5000); // 5 second timeout

      request.onerror = () => {
        clearTimeout(timeoutId);
        reject(request.error);
      };

      request.onsuccess = () => {
        clearTimeout(timeoutId);
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.setupDatabase(db);
      };
    });
  }

  private setupDatabase(db: IDBDatabase): void {
    // Units store - main data store
    if (!db.objectStoreNames.contains('units')) {
      const unitStore = db.createObjectStore('units', { keyPath: 'unitId' });
      unitStore.createIndex('lastModified', 'lastModified', { unique: false });
    }

    // Vocabulary progress store for analytics
    if (!db.objectStoreNames.contains('vocabularyProgress')) {
      const progressStore = db.createObjectStore('vocabularyProgress', { keyPath: 'id' });
      progressStore.createIndex('vocabularyId', 'vocabularyId', { unique: false });
      progressStore.createIndex('nextReviewDate', 'nextReviewDate', { unique: false });
      progressStore.createIndex('difficultyLevel', 'difficultyLevel', { unique: false });
    }

    // Sessions store for tracking learning sessions
    if (!db.objectStoreNames.contains('sessions')) {
      const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
      sessionStore.createIndex('unitId', 'unitId', { unique: false });
      sessionStore.createIndex('startTime', 'startTime', { unique: false });
    }

    // Settings store for global app settings
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings', { keyPath: 'key' });
    }
  }

  async getUnitData(unitId: string): Promise<UnitData | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['units'], 'readonly');
      const store = transaction.objectStore('units');
      const request = store.get(unitId);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async saveUnitData(unitData: UnitData): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['units'], 'readwrite');
      const store = transaction.objectStore('units');
      
      unitData.lastModified = new Date();
      const request = store.put(unitData);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getVocabularyProgress(vocabularyId: string): Promise<VocabularyProgress | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['vocabularyProgress'], 'readonly');
      const store = transaction.objectStore('vocabularyProgress');
      const index = store.index('vocabularyId');
      const request = index.get(vocabularyId);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async saveVocabularyProgress(progress: VocabularyProgress): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['vocabularyProgress'], 'readwrite');
      const store = transaction.objectStore('vocabularyProgress');
      const request = store.put(progress);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getVocabularyDueForReview(): Promise<VocabularyProgress[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['vocabularyProgress'], 'readonly');
      const store = transaction.objectStore('vocabularyProgress');
      const index = store.index('nextReviewDate');
      const request = index.getAll(IDBKeyRange.upperBound(new Date()));

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async saveSession(session: StudentSession): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['sessions'], 'readwrite');
      const store = transaction.objectStore('sessions');
      const request = store.put(session);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getSessionsForUnit(unitId: string): Promise<StudentSession[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['sessions'], 'readonly');
      const store = transaction.objectStore('sessions');
      const index = store.index('unitId');
      const request = index.getAll(unitId);

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getAllUnits(): Promise<UnitData[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['units'], 'readonly');
      const store = transaction.objectStore('units');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async migrateFromLocalStorage(): Promise<void> {
    const STORAGE_KEY = 'teaching-app-notes';
    
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return;

      const allUnitsData = JSON.parse(savedData);
      
      for (const [unitId, legacyData] of Object.entries(allUnitsData)) {
        const legacy = legacyData as any;
        
        // Convert legacy data to new format
        const unitData: UnitData = {
          unitId,
          notes: legacy.notes?.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt)
          })) || [],
          vocabulary: legacy.vocabulary?.map((vocab: any) => ({
            ...vocab,
            createdAt: new Date(vocab.createdAt)
          })) || [],
          vocabularyProgress: [], // Will be populated as user interacts
          sessions: [],
          settings: {
            tooltipsEnabled: legacy.settings?.tooltipsEnabled ?? true,
            spacedRepetitionEnabled: true,
            difficultyAdaptation: true,
            eyeBlinkSensitivity: 0.7
          },
          teacherInfo: legacy.teacherInfo || { name: '', gender: 'female' },
          lastModified: new Date()
        };

        await this.saveUnitData(unitData);
      }

      // Mark migration as complete
      await this.saveSetting('migrationComplete', true);
      
      console.log('Successfully migrated data from localStorage to IndexedDB');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  async saveSetting(key: string, value: any): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['settings'], 'readwrite');
      const store = transaction.objectStore('settings');
      const request = store.put({ key, value });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getSetting(key: string): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['settings'], 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result?.value);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['units', 'vocabularyProgress', 'sessions'], 'readwrite');
      
      [
        transaction.objectStore('units').clear(),
        transaction.objectStore('vocabularyProgress').clear(),
        transaction.objectStore('sessions').clear()
      ];

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  }

  async exportData(): Promise<string> {
    const units = await this.getAllUnits();
    const exportData = {
      version: this.dbVersion,
      exportDate: new Date().toISOString(),
      units
    };
    
    return JSON.stringify(exportData, null, 2);
  }
}

export const indexedDBService = new IndexedDBService();