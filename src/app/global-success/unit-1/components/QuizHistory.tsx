// src/app/global-success/unit-1/components/QuizHistory.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/stores/quizStore";
import { Trophy, Target, Zap, Clock, Calendar, Trash2 } from "lucide-react";
import { SetPageProps } from "./types";

export const QuizHistory = ({ setPage }: SetPageProps) => {
  const { getResults, getBestScore, getAverageAccuracy, clearResults } = useQuizStore();
  
  const results = getResults();
  const bestScore = getBestScore("unit-1");
  const averageAccuracy = getAverageAccuracy("unit-1");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            📊 Quiz History 📊
          </h1>
          <p className="text-xl text-cyan-200 font-medium">Track your learning progress over time</p>
        </motion.header>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg border-2 border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Best Score</h3>
              <p className="text-3xl font-bold text-yellow-400">
                {bestScore ? `${bestScore.accuracy}%` : "N/A"}
              </p>
              {bestScore && (
                <p className="text-sm text-gray-300 mt-2">
                  {bestScore.score}/{bestScore.totalQuestions} correct
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg border-2 border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Average Accuracy</h3>
              <p className="text-3xl font-bold text-green-400">
                {averageAccuracy}%
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Across {results.length} games
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg border-2 border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Best Streak</h3>
              <p className="text-3xl font-bold text-orange-400">
                {bestScore ? bestScore.maxStreak : 0}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Consecutive correct answers
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg border-2 border-cyan-500/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white">Recent Games</CardTitle>
              {results.length > 0 && (
                <Button
                  onClick={clearResults}
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-xl text-gray-400">No games played yet</p>
                  <p className="text-gray-500 mt-2">Start playing to see your results here!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/20 rounded-lg p-4 border border-gray-600/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {formatDate(result.date)}
                          </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          result.accuracy >= 80 ? 'bg-green-500/20 text-green-400' :
                          result.accuracy >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {result.accuracy}%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">
                            {result.score}/{result.totalQuestions}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-orange-400" />
                          <span className="text-white">
                            Streak: {result.maxStreak}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-white">
                            {formatTime(result.timeSpent)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-green-400" />
                          <span className="text-white">
                            {result.completedQuestions} completed
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-center mt-8 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button 
            onClick={() => setPage("quiz")} 
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-lg"
          >
            🎮 Play Quiz
          </Button>
          
          <Button 
            onClick={() => setPage("home")} 
            variant="outline"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-xl font-bold rounded-xl"
          >
            🏠 Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};