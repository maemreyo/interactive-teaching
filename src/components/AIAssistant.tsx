// src/components/AIAssistant.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Lightbulb, 
  Copy, 
  Download,
  Loader2,
  User,
  BookOpen,
  Send,
  Globe
} from 'lucide-react';
import { geminiService, LessonSummary } from '../services/geminiService';
import { Note, Vocabulary, TeacherInfo } from '../hooks/useNotes';

interface AIAssistantProps {
  unitId: string;
  notes: Note[];
  vocabulary: Vocabulary[];
  teacherInfo: TeacherInfo;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ unitId, notes, vocabulary, teacherInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonSummary, setLessonSummary] = useState<LessonSummary | null>(null);
  const [studentName, setStudentName] = useState('');
  const [lessonTopic, setLessonTopic] = useState('');
  const [outputLanguage, setOutputLanguage] = useState<'vi' | 'en'>('vi');
  const [activeTab, setActiveTab] = useState<'feedback' | 'vocabulary' | 'suggestions' | 'email'>('feedback');
  const [error, setError] = useState<string | null>(null);

  const generateLessonSummary = async () => {
    if (notes.length === 0 && vocabulary.length === 0) {
      setError('Please add some notes or vocabulary before generating summary.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const summary = await geminiService.generateLessonSummary(
        unitId,
        notes,
        vocabulary,
        studentName || undefined,
        lessonTopic || undefined,
        outputLanguage,
        teacherInfo
      );
      setLessonSummary(summary);
    } catch (err) {
      setError('Failed to generate lesson summary. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'feedback', label: 'Student Feedback', icon: MessageSquare },
    { id: 'vocabulary', label: 'Vocabulary Review', icon: BookOpen },
    { id: 'suggestions', label: 'Next Lesson', icon: Lightbulb },
    { id: 'email', label: 'Email Content', icon: Mail }
  ];

  const getActiveContent = () => {
    if (!lessonSummary) return '';
    
    switch (activeTab) {
      case 'feedback':
        return lessonSummary.studentFeedback;
      case 'vocabulary':
        return lessonSummary.vocabularyReview;
      case 'suggestions':
        return lessonSummary.nextLessonSuggestions;
      case 'email':
        return lessonSummary.emailContent;
      default:
        return '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">AI Teaching Assistant</h3>
          <p className="text-sm text-gray-600">Powered by Gemini AI</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Student Name (Optional)
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="w-4 h-4 inline mr-1" />
            Lesson Topic (Optional)
          </label>
          <input
            type="text"
            value={lessonTopic}
            onChange={(e) => setLessonTopic(e.target.value)}
            placeholder="Enter lesson topic..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Output Language
          </label>
          <select
            value={outputLanguage}
            onChange={(e) => setOutputLanguage(e.target.value as 'vi' | 'en')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="vi">🇻🇳 Tiếng Việt</option>
            <option value="en">🇺🇸 English</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateLessonSummary}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 mb-6"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Generate Lesson Summary</span>
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      {/* Results Section */}
      {lessonSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-purple-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(getActiveContent())}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => downloadAsText(getActiveContent(), `${activeTab}-${unitId}`)}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Download as text file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                {getActiveContent()}
              </pre>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{notes.length}</div>
          <div className="text-sm text-gray-600">Notes</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-indigo-600">{vocabulary.length}</div>
          <div className="text-sm text-gray-600">Vocabulary</div>
        </div>
      </div>

      {/* API Key Notice */}
      {!process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
          <strong>Note:</strong> To use AI features, please add your Gemini API key to the environment variables.
        </div>
      )}
    </div>
  );
};

export default AIAssistant;