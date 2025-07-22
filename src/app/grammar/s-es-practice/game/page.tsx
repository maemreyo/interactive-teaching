"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { spellingRules } from "@/lib/s-es-grammar-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface SpellingRuleExample {
  base: string;
  result: string;
  meaning: string;
  type?: string;
}

interface Question {
  id: number;
  baseWord: string;
  correctAnswer: string;
  options: string[];
  ruleId: number;
}

interface QuizResult {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

const isVowel = (char: string): boolean => "aeiou".includes(char.toLowerCase());

const getCorrectPluralForm = (word: string): string => {
  const lastChar = word.slice(-1);
  const secondLastChar = word.slice(-2, -1);
  const lastTwoChars = word.slice(-2);

  // Rule 2: Consonant + y -> ies
  if (lastChar === "y" && !isVowel(secondLastChar)) {
    return word.slice(0, -1) + "ies";
  }

  // Rule 1: o, s, sh, ch, x, z -> es
  if (
    ["o", "s", "x", "z"].includes(lastChar) ||
    ["sh", "ch"].includes(lastTwoChars)
  ) {
    return word + "es";
  }

  // Rule 4: Others -> s (includes Vowel + y -> s)
  return word + "s";
};

const generateQuestions = (numQuestions: number): Question[] => {
  const allExamples: SpellingRuleExample[] = [];
  spellingRules.forEach((rule) => {
    allExamples.push(...rule.examples);
  });

  const shuffledExamples = allExamples.sort(() => 0.5 - Math.random());
  const selectedExamples = shuffledExamples.slice(0, numQuestions);

  return selectedExamples.map((example, index) => {
    const baseWord = example.base;
    const correctAnswer = getCorrectPluralForm(baseWord);
    const options = new Set<string>([correctAnswer]);

    const incorrectCandidates: string[] = [];

    // 1. Add the base word itself (if not the correct answer)
    if (baseWord !== correctAnswer) {
      incorrectCandidates.push(baseWord);
    }

    // 2. Common incorrect transformations
    // Try adding 's'
    const tryS = baseWord + "s";
    if (tryS !== correctAnswer) {
      incorrectCandidates.push(tryS);
    }

    // Try adding 'es'
    const tryES = baseWord + "es";
    if (tryES !== correctAnswer) {
      incorrectCandidates.push(tryES);
    }

    // Try changing 'y' to 'ies'
    if (baseWord.endsWith("y")) {
      const tryIES = baseWord.slice(0, -1) + "ies";
      if (tryIES !== correctAnswer) {
        incorrectCandidates.push(tryIES);
      }
    }

    // Try adding 's' if it ends with 'es' (e.g., watches -> watchs)
    if (correctAnswer.endsWith("es") && baseWord + "s" !== correctAnswer) {
      incorrectCandidates.push(baseWord + "s");
    }

    // Try adding 'es' if it ends with 's' (e.g., plays -> playes)
    if (correctAnswer.endsWith("s") && baseWord + "es" !== correctAnswer) {
      incorrectCandidates.push(baseWord + "es");
    }

    // Filter out duplicates and the correct answer from candidates
    const uniqueIncorrectCandidates = Array.from(
      new Set(incorrectCandidates.filter((opt) => opt !== correctAnswer))
    );

    // Select up to 3 distinct incorrect options
    const shuffledUniqueIncorrect = uniqueIncorrectCandidates.sort(
      () => 0.5 - Math.random()
    );
    for (
      let i = 0;
      options.size < 4 && i < shuffledUniqueIncorrect.length;
      i++
    ) {
      options.add(shuffledUniqueIncorrect[i]);
    }

    // Fallback: If we still don't have 4 options (e.g., very few distinct incorrect forms possible)
    while (options.size < 4) {
      const randomSuffixes = ["s", "es", "ies", ""]; // Include empty string for base word
      const randomSuffix =
        randomSuffixes[Math.floor(Math.random() * randomSuffixes.length)];
      const generatedOption = baseWord + randomSuffix;
      if (generatedOption !== correctAnswer) {
        options.add(generatedOption);
      }
    }

    return {
      id: index,
      baseWord: baseWord,
      correctAnswer: correctAnswer,
      options: Array.from(options).sort(() => 0.5 - Math.random()),
      ruleId:
        spellingRules.find((rule) =>
          rule.examples.some((ex) => ex.base === example.base)
        )?.id || 4,
    };
  });
};

const INITIAL_TIME_PER_QUESTION = 15; // seconds
const TIME_DECREASE_PER_STREAK = 0.5; // seconds
const MAX_TIME_DECREASE = 5; // seconds

const SESPracticeGamePage = () => {
  const searchParams = useSearchParams();
  const numQuestions = parseInt(searchParams.get("questions") || "10", 10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_PER_QUESTION);
  const [correctStreak, setCorrectStreak] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTimeForQuestion = useCallback(() => {
    const decreasedTime = Math.min(
      INITIAL_TIME_PER_QUESTION - correctStreak * TIME_DECREASE_PER_STREAK,
      INITIAL_TIME_PER_QUESTION - MAX_TIME_DECREASE
    );
    return Math.max(decreasedTime, 5); // Minimum time of 5 seconds
  }, [correctStreak]);

  useEffect(() => {
    setQuestions(generateQuestions(numQuestions));
  }, [numQuestions]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setSelectedAnswer(answer);
      setShowFeedback(true);

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;
      const isTimeout = answer === "TIME_OUT";

      if (isCorrect && !isTimeout) {
        setScore((prevScore) => prevScore + 1);
        setCorrectStreak((prevStreak) => prevStreak + 1);
        toast.success("Chính xác!", {
          description: `'${currentQuestion.baseWord}' thành '${currentQuestion.correctAnswer}'`,
        });
      } else {
        setCorrectStreak(0); // Reset streak on incorrect answer or timeout
        toast.error("Sai rồi!", {
          description: `Đáp án đúng là '${currentQuestion.correctAnswer}'`,
        });
      }

      setQuizResults((prevResults) => [
        ...prevResults,
        {
          question: currentQuestion.baseWord,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: answer,
          isCorrect: isCorrect,
        },
      ]);

      setTimeout(
        () => {
          setShowFeedback(false);
          setSelectedAnswer(null);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          } else {
            setQuizCompleted(true);
            // Save results to local storage or IndexedDB
            setQuizResults((finalResults) => {
              const history = JSON.parse(
                localStorage.getItem("sesQuizHistory") || "[]"
              );
              localStorage.setItem(
                "sesQuizHistory",
                JSON.stringify([
                  ...history,
                  {
                    date: new Date().toISOString(),
                    score: finalResults.filter((r) => r.isCorrect).length, // Calculate final score from results
                    totalQuestions: numQuestions,
                    results: finalResults,
                    maxStreak: correctStreak, // Save max streak
                  },
                ])
              );
              return finalResults; // Return finalResults to update state if needed
            });
          }
        },
        isTimeout ? 500 : 1500
      );
    },
    [currentQuestionIndex, questions, numQuestions, correctStreak]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const timeForQuestion = calculateTimeForQuestion();
    setTimeLeft(timeForQuestion);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAnswer("TIME_OUT"); // Simulate a timeout answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [calculateTimeForQuestion, handleAnswer]);

  useEffect(() => {
    if (questions.length > 0 && !quizCompleted) {
      startTimer();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, questions, quizCompleted, startTimer]);

  const currentQuestion = questions[currentQuestionIndex];

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Đang tải câu hỏi...
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-10 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-green-600">
            Hoàn Thành Bài Luyện Tập!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl mb-4">
            Bạn đã đạt được{" "}
            <span className="font-extrabold text-blue-600">{score}</span> /{" "}
            <span className="font-extrabold text-blue-600">{numQuestions}</span>{" "}
            điểm.
          </p>
          <p className="text-xl mb-6">
            Tỷ lệ đúng: {((score / numQuestions) * 100).toFixed(2)}%
          </p>
          <Separator className="my-6" />
          <h3 className="text-2xl font-semibold mb-4">Kết Quả Chi Tiết:</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {quizResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex justify-between items-center ${
                  result.isCorrect
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <span className="font-medium">
                  {index + 1}. {result.question}
                </span>
                <span
                  className={`font-semibold ${
                    result.isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.userAnswer}{" "}
                  {result.isCorrect
                    ? "✔️"
                    : `❌ (Đúng: ${result.correctAnswer})`}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="flex justify-center space-x-4">
            <Link href="/grammar/s-es-practice" passHref>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Luyện Tập Lại
              </Button>
            </Link>
            <Link href="/grammar/s-es-practice/history" passHref>
              <Button variant="outline">Xem Lịch Sử</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto mt-10 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-2">
            Câu hỏi {currentQuestionIndex + 1} / {numQuestions}
          </CardTitle>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">Thời gian còn lại:</span>
            <span className="text-2xl font-bold text-blue-600">
              {timeLeft}s
            </span>
          </div>
          <Progress
            value={(timeLeft / calculateTimeForQuestion()) * 100}
            className="w-full mb-4"
          />
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <p className="text-4xl font-extrabold text-gray-800 mb-2">
              {currentQuestion.baseWord}
            </p>
            <p className="text-lg text-gray-600">
              Thêm &apos;s&apos; hoặc &apos;es&apos; vào từ trên:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                className={`w-full py-3 text-xl ${
                  showFeedback && selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SESPracticeGamePage />
    </Suspense>
  );
}
