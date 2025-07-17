// src/app/cambridge/unit-3/addition/components/HomePage.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Language } from "../../shared/types";
import { translations } from "../../shared/translations";
import { LanguageToggle } from "../../shared/LanguageToggle";
import { Home, Plus, BookOpen, Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HomePageProps {
  setPage: (page: "home" | "lesson" | "practice") => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const HomePage = ({ setPage, language, onLanguageChange }: HomePageProps) => {
  const t = translations[language];

  const menuItems = [
    {
      id: "lesson" as const,
      title: language === "en" ? "📚 Learn Addition" : "📚 Học Phép Cộng",
      description: language === "en" 
        ? "Step-by-step lesson on 3-digit addition with carrying using the Number House method"
        : "Bài học từng bước về phép cộng 3 chữ số có nhớ với phương pháp Ngôi nhà số",
      icon: BookOpen,
      color: "from-green-500 to-emerald-600",
      hoverColor: "from-green-600 to-emerald-700"
    },
    {
      id: "practice" as const,
      title: language === "en" ? "🎯 Practice Problems" : "🎯 Luyện Tập",
      description: language === "en"
        ? "Interactive practice with word problems and instant feedback"
        : "Thực hành tương tác với bài toán có lời văn và phản hồi tức thì",
      icon: Calculator,
      color: "from-blue-500 to-cyan-600", 
      hoverColor: "from-blue-600 to-cyan-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-green-400 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Language Toggle */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/cambridge/unit-3">
            <Button variant="outline" className="px-4 py-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "en" ? "Back to Unit 3" : "Về Unit 3"}
            </Button>
          </Link>
          
          <LanguageToggle 
            language={language} 
            onLanguageChange={onLanguageChange}
          />
        </motion.div>

        {/* Main Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Plus className="w-24 h-24 text-green-600 mx-auto mb-4" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {t.operations.addition}
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t.subtitle}
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {language === "en" 
              ? "Example: 245 + 137 = ?" 
              : "Ví dụ: 245 + 137 = ?"}
          </motion.p>
        </motion.header>

        {/* Menu Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, staggerChildren: 0.2 }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      className="mb-6"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-16 h-16 text-gray-600 mx-auto" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setPage(item.id)}
                    className={`w-full py-4 text-xl font-bold rounded-xl bg-gradient-to-r ${item.color} hover:${item.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {language === "en" ? "Start Learning" : "Bắt Đầu Học"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200/50">
            <Home className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              {language === "en" ? "Effective Learning Method" : "Phương Pháp Học Tập Hiệu Quả"}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {language === "en" 
                ? "This method uses visual representation with a 'Number House' to help students understand the concept of carrying in addition, rather than just memorizing procedures."
                : "Phương pháp này sử dụng hình ảnh trực quan với 'Ngôi nhà số' để giúp học sinh hiểu bản chất của việc cộng có nhớ thay vì chỉ học thuộc lòng."}
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};