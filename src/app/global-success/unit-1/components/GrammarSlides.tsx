// pdf-to-learn/src/app/global-success/unit-1/components/GrammarSlides.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Users, User, Target, BookOpen, Zap } from 'lucide-react';

// Slide 1: Introduction
export const IntroductionSlide: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-baloo-2 mb-4">
            Present Simple
          </h2>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute -top-4 -right-4"
          >
            <Zap className="text-yellow-400 w-12 h-12" />
          </motion.div>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-blue-600 font-baloo-2 mb-6">
          Thì Hiện Tại Đơn
        </h3>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-2xl text-gray-700 mb-4 font-medium">
          🎯 Thì quen thuộc nhất trong tiếng Anh!
        </p>
        <p className="text-xl text-gray-600">
          Cùng khám phá cách dùng một cách thú vị nhé! 🚀
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
        className="relative"
        onHoverStart={() => setIsAnimated(true)}
        onHoverEnd={() => setIsAnimated(false)}
      >
        <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-3xl p-8 shadow-2xl border-4 border-blue-200 mx-auto max-w-2xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <BookOpen className="text-blue-500 w-8 h-8" />
            <span className="text-2xl font-bold text-blue-700">Let's Learn!</span>
            <BookOpen className="text-blue-500 w-8 h-8" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <motion.div
              animate={isAnimated ? { y: -5 } : { y: 0 }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <Clock className="text-green-500 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Thói quen</p>
            </motion.div>
            <motion.div
              animate={isAnimated ? { y: -5 } : { y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <CheckCircle className="text-blue-500 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Sự thật</p>
            </motion.div>
            <motion.div
              animate={isAnimated ? { y: -5 } : { y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <Target className="text-purple-500 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Hiện tại</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Slide 2: Usage
export const UsageSlide: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const usageCards = [
    {
      id: 1,
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Sự thật hiển nhiên",
      subtitle: "Chân lý, quy luật tự nhiên",
      example: "The Earth goes around the Sun.",
      translation: "Trái Đất quay quanh Mặt Trời.",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      emoji: "🌍"
    },
    {
      id: 2,
      icon: <Clock className="w-12 h-12" />,
      title: "Thói quen, hành động lặp lại",
      subtitle: "Những việc làm thường xuyên",
      example: "They walk to school every day.",
      translation: "Họ đi bộ đến trường mỗi ngày.",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      emoji: "🚶‍♂️"
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          🤔 Khi nào chúng ta dùng?
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào từng thẻ để khám phá!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {usageCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ x: index === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className={`${card.bgColor} ${card.borderColor} border-4 rounded-3xl p-8 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105`}
            onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <motion.div
                animate={activeCard === card.id ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${card.color} text-white mb-4 shadow-lg`}
              >
                {card.icon}
              </motion.div>
              
              <div className="text-6xl mb-4">{card.emoji}</div>
              
              <h4 className="text-2xl font-bold text-gray-800 mb-2 font-baloo-2">
                {card.title}
              </h4>
              <p className="text-lg text-gray-600 mb-4">{card.subtitle}</p>

              <motion.div
                initial={false}
                animate={{
                  height: activeCard === card.id ? "auto" : 0,
                  opacity: activeCard === card.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-2xl p-6 shadow-inner">
                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      📝 Ví dụ:
                    </p>
                    <p className="text-xl font-bold text-blue-700 mb-2">
                      {card.example}
                    </p>
                    <p className="text-lg text-gray-600 italic">
                      {card.translation}
                    </p>
                  </div>
                </div>
              </motion.div>

              {activeCard !== card.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <p className="text-sm text-gray-500">👆 Nhấp để xem ví dụ</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Slide 3: Affirmative Form
export const AffirmativeFormSlide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const formData = [
    {
      id: 1,
      subjects: ["I", "You", "We", "They"],
      formula: "+ V",
      examples: [
        { en: "I play football every day.", vi: "Tôi chơi bóng đá mỗi ngày." },
        { en: "You study English well.", vi: "Bạn học tiếng Anh giỏi." },
        { en: "We go to school together.", vi: "Chúng tôi đi học cùng nhau." },
        { en: "They watch TV at night.", vi: "Họ xem TV vào buổi tối." }
      ],
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 2,
      subjects: ["He", "She", "It"],
      formula: "+ V-s/es",
      examples: [
        { en: "He plays football every day.", vi: "Anh ấy chơi bóng đá mỗi ngày." },
        { en: "She studies English well.", vi: "Cô ấy học tiếng Anh giỏi." },
        { en: "It works perfectly.", vi: "Nó hoạt động hoàn hảo." }
      ],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      icon: <User className="w-8 h-8" />
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          ✅ Dạng Khẳng Định (+)
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào ví dụ để xem bản dịch!</p>
      </motion.div>

      <div className="space-y-8">
        {formData.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className={`${form.bgColor} ${form.borderColor} border-4 rounded-3xl p-8 shadow-2xl`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Subjects */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${form.color} text-white mb-4 shadow-lg`}
                >
                  {form.icon}
                </motion.div>
                <div className="space-y-2">
                  {form.subjects.map((subject, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white rounded-full px-6 py-3 shadow-md"
                    >
                      <span className="text-2xl font-bold text-gray-800">{subject}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Formula */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200"
                >
                  <p className="text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-mono mb-2">
                    {form.formula}
                  </p>
                  <p className="text-lg text-gray-600 font-semibold">Công thức</p>
                </motion.div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                {form.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-4 shadow-md cursor-pointer border-2 border-transparent hover:border-blue-300 transition-all duration-200"
                    onClick={() => setSelectedExample(selectedExample === (form.id * 10 + idx) ? null : (form.id * 10 + idx))}
                  >
                    <p className="text-lg font-bold text-blue-700 mb-1">
                      {example.en}
                    </p>
                    <motion.div
                      initial={false}
                      animate={{
                        height: selectedExample === (form.id * 10 + idx) ? "auto" : 0,
                        opacity: selectedExample === (form.id * 10 + idx) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-md text-gray-600 italic pt-2 border-t border-gray-200">
                        {example.vi}
                      </p>
                    </motion.div>
                    {selectedExample !== (form.id * 10 + idx) && (
                      <p className="text-xs text-gray-400 mt-1">👆 Nhấp để xem dịch</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Slide 4: Negative Form
export const NegativeFormSlide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const negativeData = [
    {
      id: 1,
      subjects: ["I", "You", "We", "They"],
      formula: "+ don't + V",
      examples: [
        { en: "I don't like coffee.", vi: "Tôi không thích cà phê." },
        { en: "You don't understand this.", vi: "Bạn không hiểu điều này." },
        { en: "We don't study on Sunday.", vi: "Chúng tôi không học vào Chủ nhật." },
        { en: "They don't watch TV.", vi: "Họ không xem TV." }
      ],
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 2,
      subjects: ["He", "She", "It"],
      formula: "+ doesn't + V",
      examples: [
        { en: "He doesn't like coffee.", vi: "Anh ấy không thích cà phê." },
        { en: "She doesn't understand this.", vi: "Cô ấy không hiểu điều này." },
        { en: "It doesn't work properly.", vi: "Nó không hoạt động đúng cách." }
      ],
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      icon: <User className="w-8 h-8" />
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          ❌ Dạng Phủ Định (-)
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào ví dụ để xem bản dịch!</p>
      </motion.div>

      <div className="space-y-8">
        {negativeData.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className={`${form.bgColor} ${form.borderColor} border-4 rounded-3xl p-8 shadow-2xl`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Subjects */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${form.color} text-white mb-4 shadow-lg`}
                >
                  {form.icon}
                </motion.div>
                <div className="space-y-2">
                  {form.subjects.map((subject, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white rounded-full px-6 py-3 shadow-md"
                    >
                      <span className="text-2xl font-bold text-gray-800">{subject}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Formula */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200"
                >
                  <p className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-mono mb-2">
                    {form.formula}
                  </p>
                  <p className="text-lg text-gray-600 font-semibold">Công thức</p>
                </motion.div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                {form.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-4 shadow-md cursor-pointer border-2 border-transparent hover:border-red-300 transition-all duration-200"
                    onClick={() => setSelectedExample(selectedExample === (form.id * 10 + idx) ? null : (form.id * 10 + idx))}
                  >
                    <p className="text-lg font-bold text-red-700 mb-1">
                      {example.en}
                    </p>
                    <motion.div
                      initial={false}
                      animate={{
                        height: selectedExample === (form.id * 10 + idx) ? "auto" : 0,
                        opacity: selectedExample === (form.id * 10 + idx) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-md text-gray-600 italic pt-2 border-t border-gray-200">
                        {example.vi}
                      </p>
                    </motion.div>
                    {selectedExample !== (form.id * 10 + idx) && (
                      <p className="text-xs text-gray-400 mt-1">👆 Nhấp để xem dịch</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Slide 5: Interrogative Form
export const InterrogativeFormSlide: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const questionData = [
    {
      id: 1,
      helper: "Do",
      subjects: ["I", "You", "We", "They"],
      examples: [
        { 
          question: "Do you like pizza?", 
          yesAnswer: "Yes, I do.", 
          noAnswer: "No, I don't.",
          translation: "Bạn có thích pizza không?"
        },
        { 
          question: "Do they play football?", 
          yesAnswer: "Yes, they do.", 
          noAnswer: "No, they don't.",
          translation: "Họ có chơi bóng đá không?"
        }
      ],
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300"
    },
    {
      id: 2,
      helper: "Does",
      subjects: ["He", "She", "It"],
      examples: [
        { 
          question: "Does she study English?", 
          yesAnswer: "Yes, she does.", 
          noAnswer: "No, she doesn't.",
          translation: "Cô ấy có học tiếng Anh không?"
        },
        { 
          question: "Does it work well?", 
          yesAnswer: "Yes, it does.", 
          noAnswer: "No, it doesn't.",
          translation: "Nó có hoạt động tốt không?"
        }
      ],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300"
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          ❓ Dạng Nghi Vấn (?)
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào câu hỏi để xem cách trả lời!</p>
      </motion.div>

      {/* Main Formula */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-8 mb-8 shadow-2xl border-4 border-indigo-200"
      >
        <div className="text-center">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-mono mb-4"
          >
            Do/Does + S + V?
          </motion.p>
          <p className="text-2xl text-gray-700 font-semibold">Công thức chung</p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {questionData.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className={`${form.bgColor} ${form.borderColor} border-4 rounded-3xl p-8 shadow-2xl`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Helper + Subjects */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${form.color} text-white mb-4 shadow-lg`}
                >
                  <span className="text-2xl font-bold">{form.helper}</span>
                </motion.div>
                <div className="space-y-2">
                  {form.subjects.map((subject, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white rounded-full px-6 py-3 shadow-md"
                    >
                      <span className="text-xl font-bold text-gray-800">{subject}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Formula */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-gray-200"
                >
                  <p className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-mono mb-2">
                    {form.helper} + S + V?
                  </p>
                  <p className="text-lg text-gray-600 font-semibold">Công thức</p>
                </motion.div>
              </div>

              {/* Examples */}
              <div className="space-y-4">
                {form.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-4 shadow-md cursor-pointer border-2 border-transparent hover:border-indigo-300 transition-all duration-200"
                    onClick={() => setSelectedQuestion(selectedQuestion === (form.id * 10 + idx) ? null : (form.id * 10 + idx))}
                  >
                    <p className="text-lg font-bold text-indigo-700 mb-2">
                      {example.question}
                    </p>
                    <p className="text-sm text-gray-500 italic mb-2">
                      {example.translation}
                    </p>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: selectedQuestion === (form.id * 10 + idx) ? "auto" : 0,
                        opacity: selectedQuestion === (form.id * 10 + idx) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">💬 Cách trả lời:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="bg-green-100 rounded-lg p-3">
                            <p className="text-sm font-bold text-green-700">✅ {example.yesAnswer}</p>
                          </div>
                          <div className="bg-red-100 rounded-lg p-3">
                            <p className="text-sm font-bold text-red-700">❌ {example.noAnswer}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {selectedQuestion !== (form.id * 10 + idx) && (
                      <p className="text-xs text-gray-400 mt-2">👆 Nhấp để xem cách trả lời</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Answer Pattern */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-2xl border-4 border-yellow-200"
      >
        <div className="text-center">
          <h4 className="text-3xl font-bold text-orange-700 font-baloo-2 mb-4">
            🎯 Quy tắc trả lời
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-2xl font-bold text-green-600 mb-2">✅ Trả lời "Có"</p>
              <p className="text-lg text-gray-700">Yes, S + do/does.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-2xl font-bold text-red-600 mb-2">❌ Trả lời "Không"</p>
              <p className="text-lg text-gray-700">No, S + don't/doesn't.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Slide 6: Spelling Rules
export const SpellingRulesSlide: React.FC = () => {
  const [activeRule, setActiveRule] = useState<number | null>(null);

  const spellingRules = [
    {
      id: 1,
      title: "Thêm 'ES'",
      condition: "Kết thúc bằng: o, s, sh, ch, x, z",
      endings: ["o", "s", "sh", "ch", "x", "z"],
      rule: "→ Thêm 'es'",
      examples: [
        { base: "go", result: "goes", meaning: "đi" },
        { base: "watch", result: "watches", meaning: "xem" },
        { base: "fix", result: "fixes", meaning: "sửa" },
        { base: "wash", result: "washes", meaning: "rửa" }
      ],
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-300",
      emoji: "🔤"
    },
    {
      id: 2,
      title: "Đổi Y thành IES",
      condition: "Phụ âm + y",
      rule: "→ Đổi 'y' thành 'ies'",
      examples: [
        { base: "study", result: "studies", meaning: "học" },
        { base: "try", result: "tries", meaning: "cố gắng" },
        { base: "fly", result: "flies", meaning: "bay" },
        { base: "cry", result: "cries", meaning: "khóc" }
      ],
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-300",
      emoji: "✏️"
    },
    {
      id: 3,
      title: "Thêm S (với Y)",
      condition: "Nguyên âm + y",
      rule: "→ Thêm 's'",
      examples: [
        { base: "play", result: "plays", meaning: "chơi" },
        { base: "say", result: "says", meaning: "nói" },
        { base: "buy", result: "buys", meaning: "mua" },
        { base: "enjoy", result: "enjoys", meaning: "thích" }
      ],
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      emoji: "📝"
    },
    {
      id: 4,
      title: "Thêm S (thông thường)",
      condition: "Các trường hợp còn lại",
      rule: "→ Thêm 's'",
      details: "Áp dụng cho tất cả động từ không thuộc các quy tắc đặc biệt trên",
      commonEndings: [
        "Tận cùng bằng phụ âm + nguyên âm + phụ âm",
        "Tận cùng bằng 2 phụ âm",
        "Tận cùng bằng nguyên âm + y",
        "Các trường hợp khác"
      ],
      examples: [
        { base: "work", result: "works", meaning: "làm việc", type: "phụ âm + nguyên âm + phụ âm" },
        { base: "eat", result: "eats", meaning: "ăn", type: "nguyên âm + phụ âm" },
        { base: "read", result: "reads", meaning: "đọc", type: "nguyên âm + phụ âm" },
        { base: "sleep", result: "sleeps", meaning: "ngủ", type: "2 phụ âm" },
        { base: "play", result: "plays", meaning: "chơi", type: "nguyên âm + y" },
        { base: "help", result: "helps", meaning: "giúp đỡ", type: "2 phụ âm" }
      ],
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-300",
      emoji: "⭐"
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          📚 Quy tắc thêm 's' và 'es'
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào từng quy tắc để xem ví dụ chi tiết!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spellingRules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ 
              x: index % 2 === 0 ? -100 : 100, 
              opacity: 0,
              scale: 0.9
            }}
            animate={{ 
              x: 0, 
              opacity: 1,
              scale: 1
            }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`${rule.bgColor} ${rule.borderColor} border-4 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105`}
            onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              {/* Icon and Title */}
              <motion.div
                animate={activeRule === rule.id ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${rule.color} text-white mb-4 shadow-lg`}
              >
                <span className="text-2xl">{rule.emoji}</span>
              </motion.div>
              
              <h4 className="text-2xl font-bold text-gray-800 mb-2 font-baloo-2">
                {rule.title}
              </h4>
              
              <p className="text-lg text-gray-600 mb-4">{rule.condition}</p>
              
              {/* Rule Display */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                className="bg-white rounded-2xl p-4 shadow-inner mb-4"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {rule.rule}
                </p>
              </motion.div>

              {/* Special display for endings */}
              {rule.endings && (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {rule.endings.map((ending, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white text-gray-800 font-mono font-bold px-3 py-1 rounded-full shadow-md"
                    >
                      {ending}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Examples */}
              <motion.div
                initial={false}
                animate={{
                  height: activeRule === rule.id ? "auto" : 0,
                  opacity: activeRule === rule.id ? 1 : 0
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-2xl p-4 shadow-inner">
                  {/* Details for rule 4 */}
                  {rule.id === 4 && rule.details && (
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        📝 Chi tiết:
                      </p>
                      <p className="text-md text-gray-700 mb-3">{rule.details}</p>
                      
                      {rule.commonEndings && (
                        <div className="mb-4">
                          <p className="text-md font-semibold text-gray-800 mb-2">
                            🔍 Các trường hợp thường gặp:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {rule.commonEndings.map((ending, idx) => (
                              <div key={idx} className="bg-gray-100 rounded-lg p-2">
                                <span className="text-sm text-gray-700">• {ending}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    📖 Ví dụ:
                  </p>
                  <div className="space-y-2">
                    {rule.examples.map((example, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-left">
                            <span className="text-lg font-bold text-blue-700">
                              {example.base}
                            </span>
                            <span className="text-lg mx-2">→</span>
                            <span className="text-lg font-bold text-red-600">
                              {example.result}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 italic">
                            ({example.meaning})
                          </span>
                        </div>
                        {example.type && (
                          <div className="text-xs text-gray-500 italic">
                            Loại: {example.type}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {activeRule !== rule.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <p className="text-sm text-gray-500">👆 Nhấp để xem ví dụ</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Slide 7: Signal Words
export const SignalWordsSlide: React.FC = () => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const signalWords = [
    {
      category: "Tần suất",
      words: [
        { word: "always", meaning: "luôn luôn", example: "I always brush my teeth.", color: "bg-red-200 text-red-800" },
        { word: "usually", meaning: "thường xuyên", example: "She usually goes to bed early.", color: "bg-orange-200 text-orange-800" },
        { word: "often", meaning: "thường", example: "We often play football.", color: "bg-yellow-200 text-yellow-800" },
        { word: "sometimes", meaning: "thỉnh thoảng", example: "They sometimes watch TV.", color: "bg-green-200 text-green-800" },
        { word: "rarely", meaning: "hiếm khi", example: "He rarely eats fast food.", color: "bg-blue-200 text-blue-800" },
        { word: "never", meaning: "không bao giờ", example: "I never smoke.", color: "bg-purple-200 text-purple-800" }
      ]
    },
    {
      category: "Thời gian",
      words: [
        { word: "every day", meaning: "mỗi ngày", example: "I study English every day.", color: "bg-teal-200 text-teal-800" },
        { word: "every week", meaning: "mỗi tuần", example: "We have a test every week.", color: "bg-cyan-200 text-cyan-800" },
        { word: "every month", meaning: "mỗi tháng", example: "She visits her parents every month.", color: "bg-indigo-200 text-indigo-800" },
        { word: "once a week", meaning: "một lần một tuần", example: "I go swimming once a week.", color: "bg-pink-200 text-pink-800" },
        { word: "twice a day", meaning: "hai lần một ngày", example: "He brushes his teeth twice a day.", color: "bg-rose-200 text-rose-800" }
      ]
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          🔍 Dấu hiệu nhận biết
        </h3>
        <p className="text-xl text-gray-600">Di chuột qua từng từ để xem ví dụ!</p>
      </motion.div>

      <div className="space-y-8">
        {signalWords.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: categoryIndex * 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border-4 border-gray-200"
          >
            <h4 className="text-3xl font-bold text-center text-gray-800 font-baloo-2 mb-6">
              {category.category === "Tần suất" ? "🔄" : "⏰"} {category.category}
            </h4>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {category.words.map((item, index) => (
                <motion.div
                  key={item.word}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: categoryIndex * 0.3 + index * 0.1, 
                    duration: 0.5,
                    type: "spring"
                  }}
                  className="relative"
                  onMouseEnter={() => setHoveredWord(item.word)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  <motion.span
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${item.color} font-bold px-6 py-3 rounded-full cursor-pointer shadow-lg transition-all duration-200 text-lg inline-block`}
                  >
                    {item.word}
                  </motion.span>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredWord === item.word ? 1 : 0,
                      y: hoveredWord === item.word ? -10 : 10,
                      scale: hoveredWord === item.word ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white p-4 rounded-2xl shadow-xl z-10 min-w-64"
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="text-center">
                      <p className="font-bold text-yellow-300 mb-1">{item.meaning}</p>
                      <p className="text-sm italic">{item.example}</p>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800"></div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Tip */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl border-4 border-blue-200"
      >
        <div className="text-center">
          <h4 className="text-3xl font-bold text-blue-700 font-baloo-2 mb-4">
            💡 Mẹo ghi nhớ
          </h4>
          <p className="text-xl text-gray-700 leading-relaxed">
            Khi thấy những từ này trong câu → Sử dụng <span className="font-bold text-blue-600">Present Simple</span>!
          </p>
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-inner">
            <p className="text-lg text-gray-600 italic">
              "Tìm từ khóa → Áp dụng công thức → Thành công!" 🎯
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Slide 8: How-to Guide
export const HowToGuideSlide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Tìm Dấu Hiệu",
      description: "Đọc câu và tìm các từ khóa",
      details: "Tìm các từ như: always, usually, often, sometimes, never, every day, once a week...",
      examples: [
        "She always goes to school. → Có 'always'",
        "They play football every day. → Có 'every day'"
      ],
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Xác Định Chủ Ngữ",
      description: "Phân loại chủ ngữ vào 2 nhóm",
      details: "Nhóm 1: I, You, We, They, Danh từ số nhiều | Nhóm 2: He, She, It, Danh từ số ít",
      examples: [
        "I, You, We, They → Nhóm 1",
        "He, She, It, Tom, The cat → Nhóm 2"
      ],
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      icon: "👥"
    },
    {
      id: 3,
      title: "Xác Định Dạng Câu",
      description: "Phân biệt câu khẳng định, phủ định, nghi vấn",
      details: "Khẳng định (+): Không có 'not' | Phủ định (-): Có 'not' | Nghi vấn (?): Có dấu '?'",
      examples: [
        "She plays tennis. → Khẳng định (+)",
        "She doesn't play tennis. → Phủ định (-)",
        "Does she play tennis? → Nghi vấn (?)"
      ],
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      icon: "❓"
    },
    {
      id: 4,
      title: "Áp Dụng Công Thức",
      description: "Sử dụng công thức phù hợp",
      details: "Chọn công thức dựa trên chủ ngữ và dạng câu đã xác định",
      examples: [
        "Nhóm 1 + Khẳng định: S + V",
        "Nhóm 2 + Khẳng định: S + V-s/es",
        "Nhóm 1 + Phủ định: S + don't + V",
        "Nhóm 2 + Phủ định: S + doesn't + V"
      ],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      icon: "⚡"
    }
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          🎯 Công Thức Làm Bài Tập
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào từng bước để xem chi tiết!</p>
      </motion.div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`${step.bgColor} ${step.borderColor} border-4 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-102`}
            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-6">
              {/* Step Number and Icon */}
              <div className="flex-shrink-0">
                <motion.div
                  animate={activeStep === step.id ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center shadow-lg mb-2`}
                >
                  <span className="text-3xl font-bold">{step.id}</span>
                </motion.div>
                <div className="text-center">
                  <span className="text-3xl">{step.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-800 mb-2 font-baloo-2">
                  {step.title}
                </h4>
                <p className="text-lg text-gray-600 mb-4">
                  {step.description}
                </p>

                {/* Expandable Details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeStep === step.id ? "auto" : 0,
                    opacity: activeStep === step.id ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-inner">
                    <p className="text-lg font-semibold text-gray-800 mb-4">
                      📝 Chi tiết:
                    </p>
                    <p className="text-md text-gray-700 mb-4">
                      {step.details}
                    </p>
                    
                    <p className="text-lg font-semibold text-gray-800 mb-3">
                      💡 Ví dụ:
                    </p>
                    <div className="space-y-2">
                      {step.examples.map((example, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * idx }}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <p className="text-md text-gray-700">
                            {example}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {activeStep !== step.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    <p className="text-sm text-gray-500">👆 Nhấp để xem chi tiết</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8 shadow-2xl border-4 border-green-200"
      >
        <div className="text-center">
          <h4 className="text-3xl font-bold text-green-700 font-baloo-2 mb-4">
            🏆 Tóm tắt quy trình
          </h4>
          <div className="bg-white rounded-2xl p-6 shadow-inner">
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-600">Dấu hiệu</span> → 
              <span className="font-bold text-green-600"> Chủ ngữ</span> → 
              <span className="font-bold text-yellow-600"> Dạng câu</span> → 
              <span className="font-bold text-purple-600"> Công thức</span> → 
              <span className="font-bold text-red-600"> Thành công!</span> 🎉
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};