"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SetPageProps } from "./types";
import Link from "next/link";

export const HomePage = ({ setPage }: SetPageProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800">
        English Learning Hub
      </h1>
      <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
        Choose an activity to start learning from Unit 1: My New School.
      </p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto"
    >
      {/* Grammar Lessons Column */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📚 Grammar Lessons</h2>
        
        <Card
          className="p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200"
          onClick={() => setPage("grammar")}
        >
          <CardHeader>
            <CardTitle className="text-3xl text-blue-700 mb-4">📚 Complete Grammar Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">Học toàn bộ ngữ pháp Unit 1 với 4 phần hoàn chỉnh</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-orange-100 rounded-lg p-3 text-center">
                <div className="text-orange-700 font-semibold text-sm">Present Simple</div>
                <div className="text-xs text-orange-600">8 slides</div>
              </div>
              <div className="bg-green-100 rounded-lg p-3 text-center">
                <div className="text-green-700 font-semibold text-sm">Present Continuous</div>
                <div className="text-xs text-green-600">7 slides</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-3 text-center">
                <div className="text-purple-700 font-semibold text-sm">So sánh 2 thì</div>
                <div className="text-xs text-purple-600">5 slides</div>
              </div>
              <div className="bg-indigo-100 rounded-lg p-3 text-center">
                <div className="text-indigo-700 font-semibold text-sm">Bài tập vận dụng</div>
                <div className="text-xs text-indigo-600">4 exercises</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Complete</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Interactive</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Practice</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activities Column */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">🎮 Activities</h2>
        <Card
          className="p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200"
          onClick={() => setPage("flashcards")}
        >
          <CardHeader>
            <CardTitle className="text-3xl text-blue-700 mb-4">🃏 Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">Review words and definitions by flipping cards.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Vocabulary</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Memory</span>
            </div>
          </CardContent>
        </Card>
        
        <Card
          className="p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200"
          onClick={() => setPage("game")}
        >
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-700 mb-4">🎯 Matching Game</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">Test your memory by matching words to their definitions.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Memory</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Fun</span>
            </div>
          </CardContent>
        </Card>
        
        <Card
          className="p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200"
          onClick={() => setPage("quiz")}
        >
          <CardHeader>
            <CardTitle className="text-3xl text-violet-700 mb-4">🧠 Choose the Right Word</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">Select the correct word for the given definition.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm">Quiz</span>
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm">Challenge</span>
            </div>
          </CardContent>
        </Card>
        
        <Link href="/grammar/s-es-practice" passHref>
          <Card
            className="p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200"
          >
            <CardHeader>
              <CardTitle className="text-3xl text-pink-700 mb-4">✍️ S/ES Practice Game</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 mb-4">Luyện tập thêm &apos;s&apos; và &apos;es&apos; vào động từ theo 4 quy tắc ngữ pháp.</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Grammar</span>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Practice</span>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Spelling</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </motion.div>
  </div>
);
