// src/app/cambridge/unit-3/shared/LanguageToggle.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Language } from "./types";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

export const LanguageToggle = ({ 
  language, 
  onLanguageChange, 
  className = "" 
}: LanguageToggleProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Globe className="w-5 h-5 text-gray-600" />
      
      <div className="flex bg-gray-200 rounded-lg p-1">
        <motion.button
          onClick={() => onLanguageChange("en")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === "en" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🇺🇸 EN
        </motion.button>
        
        <motion.button
          onClick={() => onLanguageChange("vi")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === "vi" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🇻🇳 VI
        </motion.button>
      </div>
    </div>
  );
};