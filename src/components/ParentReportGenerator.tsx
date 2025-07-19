// src/components/ParentReportGenerator.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Star,
  Clock,
  Target,
  Award,
  Brain,
  Eye,
  Send,
  Loader2,
  User,
  MessageCircle,
  X
} from 'lucide-react';
import { Note, Vocabulary, TeacherInfo } from '../hooks/useNotes';
import { VocabularyProgress, StudentSession } from '../services/indexedDBService';

interface ParentReportGeneratorProps {
  unitId: string;
  notes: Note[];
  vocabulary: Vocabulary[];
  vocabularyProgress: VocabularyProgress[];
  sessions: StudentSession[];
  teacherInfo: TeacherInfo;
  studentName?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface LearningAnalytics {
  totalStudyTime: number;
  vocabularyMastered: number;
  vocabularyInProgress: number;
  averageAttentionScore: number;
  learningStreak: number;
  progressTrend: 'improving' | 'stable' | 'declining';
  strengths: string[];
  areasForImprovement: string[];
  recommendedActivities: string[];
}

const ParentReportGenerator: React.FC<ParentReportGeneratorProps> = ({
  unitId,
  notes,
  vocabulary,
  vocabularyProgress,
  sessions,
  teacherInfo,
  studentName,
  isOpen,
  onClose
}) => {
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportLanguage, setReportLanguage] = useState<'vi' | 'en'>('vi');
  const [reportFormat, setReportFormat] = useState<'detailed' | 'summary'>('summary');
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [generatedReport, setGeneratedReport] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      generateAnalytics();
    }
  }, [isOpen, vocabulary, vocabularyProgress, sessions]);

  const generateAnalytics = () => {
    if (!vocabulary.length && !sessions.length) return;

    const totalStudyTime = sessions.reduce((total, session) => {
      const sessionDuration = session.endTime 
        ? session.endTime.getTime() - session.startTime.getTime()
        : 0;
      return total + sessionDuration;
    }, 0);

    const vocabularyMastered = vocabularyProgress.filter(progress => 
      progress.correctCount > 0 && progress.correctCount >= progress.incorrectCount * 2
    ).length;

    const vocabularyInProgress = vocabularyProgress.filter(progress => 
      progress.correctCount > 0 && progress.correctCount < progress.incorrectCount * 2
    ).length;

    const averageAttentionScore = sessions.length > 0 
      ? sessions.reduce((sum, session) => sum + session.attentionScore, 0) / sessions.length
      : 0;

    const maxStreak = Math.max(...vocabularyProgress.map(p => p.learningStreak), 0);

    // Calculate progress trend
    const recentSessions = sessions.slice(0, 5);
    const olderSessions = sessions.slice(5, 10);
    const recentAvgAttention = recentSessions.length > 0 
      ? recentSessions.reduce((sum, s) => sum + s.attentionScore, 0) / recentSessions.length
      : 0;
    const olderAvgAttention = olderSessions.length > 0 
      ? olderSessions.reduce((sum, s) => sum + s.attentionScore, 0) / olderSessions.length
      : 0;

    let progressTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentAvgAttention > olderAvgAttention + 10) progressTrend = 'improving';
    else if (recentAvgAttention < olderAvgAttention - 10) progressTrend = 'declining';

    // Generate insights
    const strengths: string[] = [];
    const areasForImprovement: string[] = [];
    const recommendedActivities: string[] = [];

    if (averageAttentionScore > 80) {
      strengths.push('Excellent attention and focus during lessons');
    }
    if (vocabularyMastered > vocabulary.length * 0.7) {
      strengths.push('Strong vocabulary retention and recall');
    }
    if (maxStreak > 5) {
      strengths.push('Consistent learning progress and engagement');
    }

    if (averageAttentionScore < 50) {
      areasForImprovement.push('Attention and focus during learning activities');
      recommendedActivities.push('Shorter, more interactive lesson segments');
    }
    if (vocabularyMastered < vocabulary.length * 0.3) {
      areasForImprovement.push('Vocabulary retention and practice');
      recommendedActivities.push('Daily vocabulary review sessions');
    }

    if (totalStudyTime < 30 * 60 * 1000) { // Less than 30 minutes
      areasForImprovement.push('Study time consistency');
      recommendedActivities.push('Regular 15-minute daily practice sessions');
    }

    setAnalytics({
      totalStudyTime,
      vocabularyMastered,
      vocabularyInProgress,
      averageAttentionScore,
      learningStreak: maxStreak,
      progressTrend,
      strengths,
      areasForImprovement,
      recommendedActivities
    });
  };

  const formatDuration = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const generateReport = async () => {
    if (!analytics) return;

    setIsGenerating(true);
    
    try {
      const reportData = {
        studentName: studentName || 'Student',
        unitId,
        teacherName: teacherInfo.name || 'Teacher',
        generatedDate: new Date().toLocaleDateString(reportLanguage === 'vi' ? 'vi-VN' : 'en-US'),
        analytics,
        notes: notes.slice(0, 5), // Recent notes
        vocabulary: vocabulary.slice(0, 10), // Recent vocabulary
        vocabularyProgress: vocabularyProgress.slice(0, 10)
      };

      const report = reportLanguage === 'vi' ? generateVietnameseReport(reportData) : generateEnglishReport(reportData);
      setGeneratedReport(report);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVietnameseReport = (data: {
    studentName: string;
    teacherName: string;
    generatedDate: string;
    analytics: LearningAnalytics;
    notes: Note[];
    vocabulary: Vocabulary[];
  }): string => {
    const { studentName, teacherName, generatedDate, analytics, notes, vocabulary } = data;
    
    return `
BÁO CÁO HỌC TẬP CHO PHỤ HUYNH
=====================================

📚 Học sinh: ${studentName}
👨‍🏫 Giáo viên: ${teacherName}
📅 Ngày báo cáo: ${generatedDate}
📖 Bài học: ${unitId}

📊 TỔNG QUAN TIẾN TRÌNH HỌC TẬP
================================

⏰ Tổng thời gian học: ${formatDuration(analytics.totalStudyTime)}
📝 Từ vựng đã thành thạo: ${analytics.vocabularyMastered}/${vocabulary.length}
🎯 Từ vựng đang học: ${analytics.vocabularyInProgress}
🧠 Điểm chú ý trung bình: ${Math.round(analytics.averageAttentionScore)}%
🔥 Chuỗi học tập dài nhất: ${analytics.learningStreak} từ liên tiếp
📈 Xu hướng tiến bộ: ${analytics.progressTrend === 'improving' ? 'Đang tiến bộ' : 
  analytics.progressTrend === 'stable' ? 'Ổn định' : 'Cần cải thiện'}

✨ ĐIỂM MẠNH
============
${analytics.strengths.map(strength => `• ${strength}`).join('\n')}

🎯 CẦN CẢI THIỆN
================
${analytics.areasForImprovement.map(area => `• ${area}`).join('\n')}

📋 GHI CHÚ CỦA GIÁO VIÊN
=========================
${notes.map(note => `• ${note.content} (${note.createdAt.toLocaleDateString('vi-VN')})`).join('\n')}

📖 TỪ VỰNG ĐÃ HỌC
==================
${vocabulary.map(vocab => `• ${vocab.word} - ${vocab.meaning}`).join('\n')}

💡 KHUYẾN NGHỊ
==============
${analytics.recommendedActivities.map(activity => `• ${activity}`).join('\n')}

---
Báo cáo này được tạo tự động bởi hệ thống học tập thông minh.
Cảm ơn sự quan tâm và hỗ trợ của quý phụ huynh!
    `.trim();
  };

  const generateEnglishReport = (data: {
    studentName: string;
    teacherName: string;
    generatedDate: string;
    analytics: LearningAnalytics;
    notes: Note[];
    vocabulary: Vocabulary[];
  }): string => {
    const { studentName, teacherName, generatedDate, analytics, notes, vocabulary } = data;
    
    return `
STUDENT LEARNING REPORT FOR PARENTS
====================================

📚 Student: ${studentName}
👨‍🏫 Teacher: ${teacherName}
📅 Report Date: ${generatedDate}
📖 Unit: ${unitId}

📊 LEARNING PROGRESS OVERVIEW
==============================

⏰ Total Study Time: ${formatDuration(analytics.totalStudyTime)}
📝 Vocabulary Mastered: ${analytics.vocabularyMastered}/${vocabulary.length}
🎯 Vocabulary In Progress: ${analytics.vocabularyInProgress}
🧠 Average Attention Score: ${Math.round(analytics.averageAttentionScore)}%
🔥 Longest Learning Streak: ${analytics.learningStreak} consecutive words
📈 Progress Trend: ${analytics.progressTrend === 'improving' ? 'Improving' : 
  analytics.progressTrend === 'stable' ? 'Stable' : 'Needs Improvement'}

✨ STRENGTHS
============
${analytics.strengths.map(strength => `• ${strength}`).join('\n')}

🎯 AREAS FOR IMPROVEMENT
========================
${analytics.areasForImprovement.map(area => `• ${area}`).join('\n')}

📋 TEACHER'S NOTES
==================
${notes.map(note => `• ${note.content} (${note.createdAt.toLocaleDateString('en-US')})`).join('\n')}

📖 VOCABULARY LEARNED
=====================
${vocabulary.map(vocab => `• ${vocab.word} - ${vocab.meaning}`).join('\n')}

💡 RECOMMENDATIONS
==================
${analytics.recommendedActivities.map(activity => `• ${activity}`).join('\n')}

---
This report was automatically generated by the intelligent learning system.
Thank you for your support and involvement in your child's education!
    `.trim();
  };

  const downloadReport = () => {
    if (!generatedReport) return;
    
    const blob = new Blob([generatedReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentName || 'student'}-report-${unitId}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (generatedReport) {
      navigator.clipboard.writeText(generatedReport);
    }
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Parent Report Generator</h2>
                <p className="text-sm text-gray-500">Unit: {unitId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Analytics Dashboard */}
          {analytics && (
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Study Time</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatDuration(analytics.totalStudyTime)}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Vocabulary</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {analytics.vocabularyMastered}/{vocabulary.length}
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Attention</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(analytics.averageAttentionScore)}%
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Best Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {analytics.learningStreak}
                  </div>
                </div>
              </div>

              {/* Report Generation Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Language
                  </label>
                  <select
                    value={reportLanguage}
                    onChange={(e) => setReportLanguage(e.target.value as 'vi' | 'en')}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vi">🇻🇳 Tiếng Việt</option>
                    <option value="en">🇺🇸 English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Format
                  </label>
                  <select
                    value={reportFormat}
                    onChange={(e) => setReportFormat(e.target.value as 'detailed' | 'summary')}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="summary">Summary Report</option>
                    <option value="detailed">Detailed Report</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={generateReport}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>Generate Report</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Generated Report */}
          {generatedReport && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Generated Report</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={downloadReport}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Download report"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm leading-relaxed">
                  {generatedReport}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ParentReportGenerator;