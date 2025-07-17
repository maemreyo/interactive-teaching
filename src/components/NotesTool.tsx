// src/components/NotesTool.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  StickyNote, 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  X,
  Save,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useNotes, Note, Vocabulary } from '../hooks/useNotes';
import AIAssistant from './AIAssistant';
import TooltipSettings from './TooltipSettings';

interface NotesToolProps {
  unitId: string;
  isOpen: boolean;
  onClose: () => void;
}

const NotesTool: React.FC<NotesToolProps> = ({ unitId, isOpen, onClose }) => {
  const {
    notes,
    vocabulary,
    tooltipsEnabled,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    toggleTooltips,
    exportNotes,
    clearAllData
  } = useNotes(unitId);

  const [activeTab, setActiveTab] = useState<'notes' | 'vocabulary' | 'ai'>('notes');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newExample, setNewExample] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editingVocab, setEditingVocab] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editWord, setEditWord] = useState('');
  const [editMeaning, setEditMeaning] = useState('');
  const [editExample, setEditExample] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      addNote(newNoteContent.trim());
      setNewNoteContent('');
    }
  };

  const handleAddVocabulary = () => {
    if (newWord.trim() && newMeaning.trim()) {
      addVocabulary(newWord.trim(), newMeaning.trim(), newExample.trim() || undefined);
      setNewWord('');
      setNewMeaning('');
      setNewExample('');
    }
  };

  const startEditNote = (note: Note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const saveEditNote = () => {
    if (editingNote && editContent.trim()) {
      updateNote(editingNote, editContent.trim());
      setEditingNote(null);
      setEditContent('');
    }
  };

  const startEditVocab = (vocab: Vocabulary) => {
    setEditingVocab(vocab.id);
    setEditWord(vocab.word);
    setEditMeaning(vocab.meaning);
    setEditExample(vocab.example || '');
  };

  const saveEditVocab = () => {
    if (editingVocab && editWord.trim() && editMeaning.trim()) {
      updateVocabulary(editingVocab, editWord.trim(), editMeaning.trim(), editExample.trim() || undefined);
      setEditingVocab(null);
      setEditWord('');
      setEditMeaning('');
      setEditExample('');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <StickyNote className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Teaching Notes</h2>
                <p className="text-sm text-gray-500">Unit: {unitId}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={exportNotes}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Export notes"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear all data"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <StickyNote className="w-4 h-4" />
              <span className="hidden sm:inline">Notes ({notes.length})</span>
              <span className="sm:hidden">Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-colors ${
                activeTab === 'vocabulary'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Vocabulary ({vocabulary.length})</span>
              <span className="sm:hidden">Vocab</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-colors ${
                activeTab === 'ai'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'ai' ? (
              <div className="h-full overflow-y-auto p-4 space-y-6">
                <TooltipSettings
                  isEnabled={tooltipsEnabled}
                  onToggle={toggleTooltips}
                  vocabularyCount={vocabulary.length}
                />
                <AIAssistant 
                  unitId={unitId}
                  notes={notes}
                  vocabulary={vocabulary}
                />
              </div>
            ) : activeTab === 'notes' ? (
              <div className="h-full flex flex-col">
                {/* Add new note */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <textarea
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      placeholder="Write a note for this lesson..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!newNoteContent.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Notes list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLoading ? (
                    <div className="text-center text-gray-500 py-8">Loading notes...</div>
                  ) : notes.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <StickyNote className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No notes yet. Add your first note above!</p>
                    </div>
                  ) : (
                    notes.map((note) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                      >
                        {editingNote === note.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingNote(null)}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={saveEditNote}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-800 whitespace-pre-wrap mb-2">{note.content}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>
                                Created: {formatDate(note.createdAt)}
                                {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                                  <span className="ml-2">• Updated: {formatDate(note.updatedAt)}</span>
                                )}
                              </span>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => startEditNote(note)}
                                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                {/* Add new vocabulary */}
                <div className="p-4 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="New word..."
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      value={newMeaning}
                      onChange={(e) => setNewMeaning(e.target.value)}
                      placeholder="Meaning..."
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      value={newExample}
                      onChange={(e) => setNewExample(e.target.value)}
                      placeholder="Example (optional)..."
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    onClick={handleAddVocabulary}
                    disabled={!newWord.trim() || !newMeaning.trim()}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Vocabulary</span>
                  </button>
                </div>

                {/* Vocabulary list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLoading ? (
                    <div className="text-center text-gray-500 py-8">Loading vocabulary...</div>
                  ) : vocabulary.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No vocabulary yet. Add your first word above!</p>
                    </div>
                  ) : (
                    vocabulary.map((vocab) => (
                      <motion.div
                        key={vocab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-4"
                      >
                        {editingVocab === vocab.id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={editWord}
                                onChange={(e) => setEditWord(e.target.value)}
                                placeholder="Word"
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                              <input
                                type="text"
                                value={editMeaning}
                                onChange={(e) => setEditMeaning(e.target.value)}
                                placeholder="Meaning"
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <input
                              type="text"
                              value={editExample}
                              onChange={(e) => setEditExample(e.target.value)}
                              placeholder="Example (optional)"
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingVocab(null)}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={saveEditVocab}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="mb-2">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-bold text-green-800 text-lg">{vocab.word}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-700">{vocab.meaning}</span>
                              </div>
                              {vocab.example && (
                                <p className="text-sm text-gray-600 italic">Example: {vocab.example}</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Added: {formatDate(vocab.createdAt)}</span>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => startEditVocab(vocab)}
                                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deleteVocabulary(vocab.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Clear confirmation modal */}
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-gray-800">Clear All Data</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete all notes and vocabulary for this unit? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearAllData();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default NotesTool;