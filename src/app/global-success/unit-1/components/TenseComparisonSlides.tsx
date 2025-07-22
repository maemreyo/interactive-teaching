// pdf-to-learn/src/app/global-success/unit-1/components/TenseComparisonSlides.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

// Slide 1: Introduction
export const IntroductionSlide: React.FC = () => {
  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent font-baloo-2 mb-6">
          ⚖️ So Sánh 2 Thì
        </h3>
        <p className="text-2xl text-gray-600 mb-8">Present Simple vs Present Continuous</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Present Simple */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-2xl border-4 border-blue-200"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6 shadow-lg">
              <Clock className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-blue-700 mb-4 font-baloo-2">
              Present Simple
            </h4>
            <div className="space-y-3 text-left">
              <div className="bg-white rounded-lg p-3 shadow-inner">
                <p className="text-lg font-semibold text-gray-800">🔄 Thói quen, lặp lại</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-inner">
                <p className="text-lg font-semibold text-gray-800">📚 Sự thật, chân lý</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-inner">
                <p className="text-lg font-semibold text-gray-800">📅 Lịch trình cố định</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Present Continuous */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-2xl border-4 border-green-200"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-6 shadow-lg">
              <Zap className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-green-700 mb-4 font-baloo-2">
              Present Continuous
            </h4>
            <div className="space-y-3 text-left">
              <div className="bg-white rounded-lg p-3 shadow-inner">
                <p className="text-lg font-semibold text-gray-800">⚡ Đang xảy ra bây giờ</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-inner">
                <p className="text-lg font-semibold text-gray-800">⏰ Tạm thời</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-inner">
                <p className="text-lg font-semibold text-gray-800">🔄 Kế hoạch tương lai gần</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Difference */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-2xl border-4 border-yellow-200"
      >
        <div className="text-center">
          <h4 className="text-3xl font-bold text-orange-700 font-baloo-2 mb-4">
            🔑 Điểm khác biệt chính
          </h4>
          <div className="bg-white rounded-2xl p-6 shadow-inner">
            <p className="text-2xl text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-600">Present Simple</span> = Thường xuyên, lặp lại<br/>
              <span className="font-bold text-green-600">Present Continuous</span> = Đang diễn ra ngay bây giờ
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Slide 2: Time Expressions Comparison
export const TimeExpressionsSlide: React.FC = () => {
  const [hoveredSide, setHoveredSide] = useState<'simple' | 'continuous' | null>(null);

  const simpleExpressions = [
    { word: "always", meaning: "luôn luôn", example: "I always brush my teeth." },
    { word: "usually", meaning: "thường thường", example: "She usually goes to school by bus." },
    { word: "often", meaning: "thường xuyên", example: "We often play football." },
    { word: "sometimes", meaning: "đôi khi", example: "He sometimes watches TV." },
    { word: "never", meaning: "không bao giờ", example: "They never eat fast food." },
    { word: "every day", meaning: "mỗi ngày", example: "I study English every day." }
  ];

  const continuousExpressions = [
    { word: "now", meaning: "bây giờ", example: "I am studying now." },
    { word: "right now", meaning: "ngay bây giờ", example: "She is cooking right now." },
    { word: "at the moment", meaning: "lúc này", example: "They are playing at the moment." },
    { word: "Look!", meaning: "Nhìn kìa!", example: "Look! The baby is sleeping." },
    { word: "Listen!", meaning: "Nghe này!", example: "Listen! Someone is singing." },
    { word: "today", meaning: "hôm nay", example: "I am working from home today." }
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
          🕐 Từ chỉ thời gian
        </h3>
        <p className="text-xl text-gray-600">Di chuột qua từng bên để xem chi tiết!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Present Simple */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-2xl border-4 border-blue-200 cursor-pointer"
          onMouseEnter={() => setHoveredSide('simple')}
          onMouseLeave={() => setHoveredSide(null)}
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-3xl font-bold text-blue-700 text-center mb-6 font-baloo-2">
            Present Simple
          </h4>
          
          <div className="space-y-3">
            {simpleExpressions.map((expr, index) => (
              <motion.div
                key={expr.word}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-lg p-4 shadow-inner transition-all duration-200 ${
                  hoveredSide === 'simple' ? 'transform scale-105' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-700 text-lg">{expr.word}</span>
                  <span className="text-sm text-gray-500 italic">({expr.meaning})</span>
                </div>
                {hoveredSide === 'simple' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-gray-600 italic"
                  >
                    {expr.example}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Present Continuous */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-2xl border-4 border-green-200 cursor-pointer"
          onMouseEnter={() => setHoveredSide('continuous')}
          onMouseLeave={() => setHoveredSide(null)}
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-3xl font-bold text-green-700 text-center mb-6 font-baloo-2">
            Present Continuous
          </h4>
          
          <div className="space-y-3">
            {continuousExpressions.map((expr, index) => (
              <motion.div
                key={expr.word}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-lg p-4 shadow-inner transition-all duration-200 ${
                  hoveredSide === 'continuous' ? 'transform scale-105' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-700 text-lg">{expr.word}</span>
                  <span className="text-sm text-gray-500 italic">({expr.meaning})</span>
                </div>
                {hoveredSide === 'continuous' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-gray-600 italic"
                  >
                    {expr.example}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 3: Examples Comparison
export const ExamplesComparisonSlide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const comparisons = [
    {
      id: 1,
      situation: "Hoạt động hàng ngày",
      simple: {
        sentence: "I drink coffee every morning.",
        translation: "Tôi uống cà phê mỗi sáng.",
        explanation: "Thói quen hàng ngày, lặp lại"
      },
      continuous: {
        sentence: "I am drinking coffee now.",
        translation: "Tôi đang uống cà phê bây giờ.",
        explanation: "Hành động đang diễn ra lúc này"
      }
    },
    {
      id: 2,
      situation: "Công việc",
      simple: {
        sentence: "She works in a hospital.",
        translation: "Cô ấy làm việc ở bệnh viện.",
        explanation: "Công việc cố định, lâu dài"
      },
      continuous: {
        sentence: "She is working on a project.",
        translation: "Cô ấy đang làm một dự án.",
        explanation: "Công việc tạm thời, hiện tại"
      }
    },
    {
      id: 3,
      situation: "Học tập",
      simple: {
        sentence: "We study English at school.",
        translation: "Chúng tôi học tiếng Anh ở trường.",
        explanation: "Môn học thường xuyên"
      },
      continuous: {
        sentence: "We are studying for the exam.",
        translation: "Chúng tôi đang học cho kỳ thi.",
        explanation: "Học cho mục đích cụ thể, tạm thời"
      }
    },
    {
      id: 4,
      situation: "Thể thao",
      simple: {
        sentence: "He plays football on weekends.",
        translation: "Anh ấy chơi bóng đá vào cuối tuần.",
        explanation: "Hoạt động thường xuyên, theo lịch"
      },
      continuous: {
        sentence: "He is playing football right now.",
        translation: "Anh ấy đang chơi bóng đá ngay bây giờ.",
        explanation: "Đang chơi tại thời điểm nói"
      }
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
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          📝 So sánh ví dụ
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào từng tình huống để xem chi tiết!</p>
      </motion.div>

      <div className="space-y-6">
        {comparisons.map((comp, index) => (
          <motion.div
            key={comp.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-2xl border-4 border-gray-200 cursor-pointer"
            onClick={() => setSelectedExample(selectedExample === comp.id ? null : comp.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center mb-4">
              <h4 className="text-2xl font-bold text-gray-800 font-baloo-2">
                {comp.situation}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Present Simple */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="flex items-center mb-3">
                  <Clock className="w-6 h-6 text-blue-600 mr-2" />
                  <h5 className="text-xl font-bold text-blue-700">Present Simple</h5>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-inner mb-3">
                  <p className="text-lg font-semibold text-gray-800">{comp.simple.sentence}</p>
                  <p className="text-md text-gray-600 italic">{comp.simple.translation}</p>
                </div>
                {selectedExample === comp.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-100 rounded-lg p-3"
                  >
                    <p className="text-sm text-blue-800">💡 {comp.simple.explanation}</p>
                  </motion.div>
                )}
              </div>

              {/* Present Continuous */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center mb-3">
                  <Zap className="w-6 h-6 text-green-600 mr-2" />
                  <h5 className="text-xl font-bold text-green-700">Present Continuous</h5>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-inner mb-3">
                  <p className="text-lg font-semibold text-gray-800">{comp.continuous.sentence}</p>
                  <p className="text-md text-gray-600 italic">{comp.continuous.translation}</p>
                </div>
                {selectedExample === comp.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-green-100 rounded-lg p-3"
                  >
                    <p className="text-sm text-green-800">💡 {comp.continuous.explanation}</p>
                  </motion.div>
                )}
              </div>
            </div>

            {selectedExample !== comp.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-gray-500">👆 Nhấp để xem giải thích</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Slide 4: Common Mistakes
export const CommonMistakesSlide: React.FC = () => {
  const [selectedMistake, setSelectedMistake] = useState<number | null>(null);

  const mistakes = [
    {
      id: 1,
      title: "Nhầm lẫn từ chỉ thời gian",
      wrong: "I am always going to school by bus.",
      correct: "I always go to school by bus.",
      explanation: "'Always' dùng với Present Simple, không dùng với Present Continuous",
      tip: "Nhớ: always, usually, often, sometimes → Present Simple"
    },
    {
      id: 2,
      title: "Dùng sai thì với 'now'",
      wrong: "I study English now.",
      correct: "I am studying English now.",
      explanation: "'Now' chỉ thời điểm hiện tại → dùng Present Continuous",
      tip: "Nhớ: now, right now, at the moment → Present Continuous"
    },
    {
      id: 3,
      title: "Quên thêm 's/es' với ngôi thứ 3 số ít",
      wrong: "She work in a bank.",
      correct: "She works in a bank.",
      explanation: "He/She/It + V(s/es) trong Present Simple",
      tip: "Nhớ: He/She/It → động từ phải thêm s/es"
    },
    {
      id: 4,
      title: "Dùng Present Continuous với động từ trạng thái",
      wrong: "I am knowing the answer.",
      correct: "I know the answer.",
      explanation: "Động từ 'know' là động từ trạng thái, không dùng với Present Continuous",
      tip: "Động từ trạng thái: know, like, love, want, need → chỉ dùng Present Simple"
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
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          ⚠️ Lỗi thường gặp
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào từng lỗi để xem cách sửa!</p>
      </motion.div>

      <div className="space-y-6">
        {mistakes.map((mistake, index) => (
          <motion.div
            key={mistake.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-6 shadow-2xl border-4 border-red-200 cursor-pointer"
            onClick={() => setSelectedMistake(selectedMistake === mistake.id ? null : mistake.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
              <h4 className="text-2xl font-bold text-red-700 font-baloo-2">
                {mistake.title}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wrong */}
              <div className="bg-white rounded-2xl p-4 shadow-inner border-2 border-red-300">
                <div className="flex items-center mb-2">
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-bold text-red-700">Sai:</span>
                </div>
                <p className="text-lg text-gray-800 line-through">{mistake.wrong}</p>
              </div>

              {/* Correct */}
              <div className="bg-white rounded-2xl p-4 shadow-inner border-2 border-green-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-bold text-green-700">Đúng:</span>
                </div>
                <p className="text-lg text-gray-800 font-semibold">{mistake.correct}</p>
              </div>
            </div>

            {selectedMistake === mistake.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
                className="mt-6 bg-white rounded-2xl p-4 shadow-inner"
              >
                <div className="mb-3">
                  <p className="text-lg font-semibold text-gray-800 mb-2">📝 Giải thích:</p>
                  <p className="text-md text-gray-700">{mistake.explanation}</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <p className="text-sm font-semibold text-yellow-800">💡 Mẹo nhớ: {mistake.tip}</p>
                </div>
              </motion.div>
            )}

            {selectedMistake !== mistake.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-gray-500">👆 Nhấp để xem giải thích</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Slide 5: Quick Decision Guide
export const QuickDecisionSlide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      question: "Câu có từ chỉ thời gian không?",
      options: [
        { text: "Có: always, usually, often, sometimes, never, every day...", next: 1, tense: "simple" },
        { text: "Có: now, right now, at the moment, Look!, Listen!...", next: 2, tense: "continuous" },
        { text: "Không có từ chỉ thời gian rõ ràng", next: 3, tense: null }
      ]
    },
    {
      question: "✅ Dùng Present Simple!",
      explanation: "Các từ này chỉ thói quen, sự lặp lại → Present Simple",
      example: "I always brush my teeth. → I always brush my teeth.",
      isResult: true,
      tense: "simple"
    },
    {
      question: "✅ Dùng Present Continuous!",
      explanation: "Các từ này chỉ hành động đang diễn ra → Present Continuous",
      example: "Look! She is dancing. → Look! She is dancing.",
      isResult: true,
      tense: "continuous"
    },
    {
      question: "Hành động này như thế nào?",
      options: [
        { text: "Thói quen, lặp lại, sự thật", next: 1, tense: "simple" },
        { text: "Đang xảy ra ngay bây giờ", next: 2, tense: "continuous" },
        { text: "Tạm thời, không thường xuyên", next: 2, tense: "continuous" }
      ]
    }
  ];

  const resetGuide = () => {
    setCurrentStep(0);
  };

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          🎯 Hướng dẫn chọn thì
        </h3>
        <p className="text-xl text-gray-600">Làm theo từng bước để chọn đúng thì!</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border-4 border-purple-200"
        >
          {steps[currentStep].isResult ? (
            // Result screen
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-lg ${
                  steps[currentStep].tense === 'simple' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                } text-white`}
              >
                <CheckCircle className="w-12 h-12" />
              </motion.div>
              
              <h4 className={`text-4xl font-bold mb-6 font-baloo-2 ${
                steps[currentStep].tense === 'simple' ? 'text-blue-700' : 'text-green-700'
              }`}>
                {steps[currentStep].question}
              </h4>
              
              <div className="bg-white rounded-2xl p-6 shadow-inner mb-6">
                <p className="text-lg text-gray-700 mb-4">{steps[currentStep].explanation}</p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-md font-mono text-gray-800">{steps[currentStep].example}</p>
                </div>
              </div>
              
              <button
                onClick={resetGuide}
                className="bg-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors shadow-lg"
              >
                🔄 Thử lại
              </button>
            </div>
          ) : (
            // Question screen
            <div>
              <h4 className="text-3xl font-bold text-gray-800 text-center mb-8 font-baloo-2">
                {steps[currentStep].question}
              </h4>
              
              <div className="space-y-4">
                {steps[currentStep].options?.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setCurrentStep(option.next)}
                    className={`w-full p-6 rounded-2xl shadow-lg transition-all duration-200 text-left hover:shadow-xl hover:-translate-y-1 ${
                      option.tense === 'simple' 
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-300' 
                        : option.tense === 'continuous'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300'
                        : 'bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-lg font-semibold text-gray-800">{option.text}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};