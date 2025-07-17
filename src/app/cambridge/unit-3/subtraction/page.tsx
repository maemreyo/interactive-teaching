// src/app/cambridge/unit-3/subtraction/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SubtractionLessonPage } from "./components/SubtractionLessonPage";
import { PracticePage } from "./components/PracticePage";
import { HomePage } from "./components/HomePage";
import { Language } from "../shared/types";
import NotesFloatingButton from "../../../../components/NotesFloatingButton";

type PageType = "home" | "lesson" | "practice";

export default function SubtractionApp() {
  const [page, setPage] = useState<PageType>("home");
  const [language, setLanguage] = useState<Language>("en");

  const renderPage = () => {
    switch (page) {
      case "lesson":
        return <SubtractionLessonPage setPage={setPage} language={language} onLanguageChange={setLanguage} />;
      case "practice":
        return <PracticePage setPage={setPage} language={language} onLanguageChange={setLanguage} />;
      case "home":
      default:
        return <HomePage setPage={setPage} language={language} onLanguageChange={setLanguage} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      
      {/* Notes Tool - Available on all pages */}
      <NotesFloatingButton unitId="cambridge-unit-3-subtraction" />
    </main>
  );
}