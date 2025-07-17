// src/app/cambridge/unit-3/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Language } from "./shared/types";
import { LanguageToggle } from "./shared/LanguageToggle";
import { Home, Plus, Minus, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Unit3HomePage() {
  const [language, setLanguage] = useState<Language>("en");

  const menuItems = [
    {
      id: "addition",
      title: language === "en" ? "🏠 Addition with Carrying" : "🏠 Phép Cộng Có Nhớ",
      description: language === "en" 
        ? "Learn 3-digit addition with carrying using the Number House method"
        : "Học phép cộng 3 chữ số có nhớ với phương pháp Ngôi nhà số",
      icon: Plus,
      color: "from-green-500 to-emerald-600",
      hoverColor: "from-green-600 to-emerald-700",
      href: "/cambridge/unit-3/addition"
    },
    {
      id: "subtraction",
      title: language === "en" ? "🏠 Subtraction with Borrowing" : "🏠 Phép Trừ Có Nhớ",
      description: language === "en"
        ? "Learn 3-digit subtraction with borrowing using the Number House method"
        : "Học phép trừ 3 chữ số có nhớ với phương pháp Ngôi nhà số",
      icon: Minus,
      color: "from-red-500 to-pink-600", 
      hoverColor: "from-red-600 to-pink-700",
      href: "/cambridge/unit-3/subtraction"
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
        <motion.div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-yellow-400 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
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
          <Link href="/">
            <Button variant="outline" className="px-4 py-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "en" ? "Back to Home" : "Về Trang Chủ"}
            </Button>
          </Link>
          
          <LanguageToggle 
            language={language} 
            onLanguageChange={setLanguage}
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
            <Home className="w-24 h-24 text-blue-600 mx-auto mb-4" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {language === "en" ? "🏠 Number House Method 🏠" : "🏠 Ngôi Nhà Các Con Số 🏠"}
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {language === "en" 
              ? "Visual method for teaching 3-digit addition and subtraction"
              : "Phương pháp dạy cộng trừ số có 3 chữ số trực quan và dễ hiểu"}
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {language === "en" 
              ? "Using the 'Number House' to help students understand the concept of carrying and borrowing"
              : "Sử dụng 'Ngôi nhà' để giúp học sinh hiểu rõ bản chất của việc cộng/trừ có nhớ"}
          </motion.p>
        </motion.header>

        {/* Menu Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
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
              <Link href={item.href}>
                <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
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
                      className={`w-full py-4 text-xl font-bold rounded-xl bg-gradient-to-r ${item.color} hover:${item.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {language === "en" ? "Start Learning" : "Bắt Đầu Học"}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
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
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              {language === "en" ? "Effective Learning Method" : "Phương Pháp Học Tập Hiệu Quả"}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {language === "en" 
                ? "This method uses A4 paper, pens, and number cards to create a 'Number House' for digits, helping students understand the essence of carrying and borrowing instead of just memorizing procedures."
                : "Phương pháp này sử dụng giấy A4, bút và các thẻ số để tạo ra một 'Ngôi nhà' cho các con số, giúp học sinh hiểu rõ bản chất của việc cộng/trừ có nhớ thay vì chỉ học thuộc lòng."}
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}