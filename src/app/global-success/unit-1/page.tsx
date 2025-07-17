"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlashcardsPage } from "./components/FlashcardsPage";
import { MatchingGamePage } from "./components/MatchingGamePage";
import { HomePage } from "./components/HomePage";
import { QuizGamePage } from "./components/QuizGamePage";
import { QuizHistory } from "./components/QuizHistory";
import { GrammarLessonPage } from "./components/GrammarLessonPage";
import { PageType } from "./components/types";
import NotesFloatingButton from "../../../components/NotesFloatingButton";

export default function App() {
  const [page, setPage] = useState<PageType>("home"); // 'home', 'flashcards', 'game', 'quiz'

  const renderPage = () => {
    switch (page) {
      case "grammar":
        return <GrammarLessonPage setPage={setPage} />;
      case "flashcards":
        return <FlashcardsPage setPage={setPage} />;
      case "game":
        return <MatchingGamePage setPage={setPage} />;
      case "quiz":
        return <QuizGamePage setPage={setPage} />;
      case "history":
        return <QuizHistory setPage={setPage} />;
      case "home":
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      
      {/* Notes Tool - Available on all pages */}
      <NotesFloatingButton unitId="global-success-unit-1" />
    </main>
  );
}