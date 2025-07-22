"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface QuizResultDetail {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

interface QuizHistoryEntry {
  date: string;
  score: number;
  totalQuestions: number;
  results: QuizResultDetail[];
  maxStreak: number;
}

const SESPracticeHistoryPage = () => {
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('sesQuizHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('sesQuizHistory');
    setHistory([]);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto mt-10 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-blue-700">Lịch Sử Luyện Tập &apos;S&apos; và &apos;ES&apos;</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Chưa có lịch sử luyện tập nào.</p>
          ) : (
            <div className="space-y-6">
              {history.map((entry, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Lần luyện tập {history.length - index}</h3>
                    <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleString()}</span>
                  </div>
                  <p className="text-lg mb-2">Điểm số: <span className="font-bold text-blue-600">{entry.score}</span> / {entry.totalQuestions}</p>
                  <p className="text-lg mb-2">Tỷ lệ đúng: <span className="font-bold text-blue-600">{((entry.score / entry.totalQuestions) * 100).toFixed(2)}%</span></p>
                  <p className="text-lg mb-4">Chuỗi đúng cao nhất: <span className="font-bold text-purple-600">{entry.maxStreak}</span></p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-500 hover:underline">Xem chi tiết</summary>
                    <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-2">
                      {entry.results.map((result, resIndex) => (
                        <div key={resIndex} className={`p-2 rounded-md flex justify-between items-center ${result.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                          <span className="font-medium">{resIndex + 1}. {result.question}</span>
                          <span className={`font-semibold ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {result.userAnswer} {result.isCorrect ? '✔️' : `❌ (Đúng: ${result.correctAnswer})`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                  {index < history.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
              <div className="text-center mt-6">
                <Button onClick={clearHistory} variant="destructive">
                  Xóa Lịch Sử
                </Button>
              </div>
            </div>
          )}
          <div className="text-center mt-6">
            <Link href="/grammar/s-es-practice" passHref>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Quay Lại Luyện Tập</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SESPracticeHistoryPage;
