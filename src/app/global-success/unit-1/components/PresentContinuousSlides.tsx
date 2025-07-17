// pdf-to-learn/src/app/global-success/unit-1/components/PresentContinuousSlides.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Clock, AlertTriangle } from 'lucide-react';

// Slide 1: Introduction
export const IntroductionSlide: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
        onAnimationComplete={() => setIsAnimated(true)}
      >
        <motion.h2
          animate={isAnimated ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent font-baloo-2 mb-6"
        >
          ⚡ Thì Hiện Tại Tiếp Diễn
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl text-gray-600 mb-8 leading-relaxed"
        >
          Hành động đang diễn ra ngay lúc này? Dùng thì này nhé! 🎯
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 shadow-2xl border-4 border-green-200">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="text-8xl mb-4"
            >
              🏃‍♂️
            </motion.div>
            <p className="text-xl text-gray-700 font-semibold">
              &quot;What&apos;s happening right now?&quot;
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Slide 2: Usage
export const UsageSlide: React.FC = () => {
  const [selectedUsage, setSelectedUsage] = useState<number | null>(null);

  const usages = [
    {
      id: 1,
      title: "Hành động đang xảy ra tại thời điểm nói",
      description: "Diễn tả việc gì đó đang diễn ra ngay bây giờ",
      examples: [
        { en: "I am doing my homework now.", vi: "Bây giờ tôi đang làm bài tập." },
        { en: "She is reading a book.", vi: "Cô ấy đang đọc sách." },
        { en: "They are playing football.", vi: "Họ đang chơi bóng đá." }
      ],
      color: "from-sky-400 to-blue-500",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-300",
      icon: <Clock className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Dùng sau câu mệnh lệnh, đề nghị",
      description: "Khi có Look!, Listen!, Watch out!...",
      examples: [
        { en: "Look! The baby is sleeping.", vi: "Nhìn kìa! Em bé đang ngủ." },
        { en: "Listen! Someone is singing.", vi: "Nghe này! Ai đó đang hát." },
        { en: "Watch out! The car is coming.", vi: "Cẩn thận! Xe đang đến." }
      ],
      color: "from-violet-400 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-300",
      icon: <AlertTriangle className="w-8 h-8" />
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
          🤔 Khi nào chúng ta dùng?
        </h3>
        <p className="text-xl text-gray-600">Nhấp vào từng mục để xem ví dụ chi tiết!</p>
      </motion.div>

      <div className="space-y-6">
        {usages.map((usage, index) => (
          <motion.div
            key={usage.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className={`${usage.bgColor} ${usage.borderColor} border-4 rounded-3xl p-8 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-102`}
            onClick={() => setSelectedUsage(selectedUsage === usage.id ? null : usage.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-6">
              {/* Icon */}
              <motion.div
                animate={selectedUsage === usage.id ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${usage.color} text-white shadow-lg flex-shrink-0`}
              >
                {usage.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-800 mb-2 font-baloo-2">
                  {usage.title}
                </h4>
                <p className="text-lg text-gray-600 mb-4">
                  {usage.description}
                </p>

                {/* Examples */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedUsage === usage.id ? "auto" : 0,
                    opacity: selectedUsage === usage.id ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-inner">
                    <p className="text-lg font-semibold text-gray-800 mb-4">
                      💡 Ví dụ:
                    </p>
                    <div className="space-y-3">
                      {usage.examples.map((example, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * idx }}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <p className="text-lg font-bold text-blue-700 mb-1">
                            {example.en}
                          </p>
                          <p className="text-md text-gray-600 italic">
                            {example.vi}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {selectedUsage !== usage.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    <p className="text-sm text-gray-500">👆 Nhấp để xem ví dụ</p>
                  </motion.div>
                )}
              </div>
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

  const affirmativeData = [
    {
      id: 1,
      subject: "I",
      beVerb: "am",
      examples: [
        { en: "I am studying English.", vi: "Tôi đang học tiếng Anh." },
        { en: "I am watching TV.", vi: "Tôi đang xem TV." },
        { en: "I am cooking dinner.", vi: "Tôi đang nấu bữa tối." }
      ],
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300"
    },
    {
      id: 2,
      subject: "He/She/It",
      beVerb: "is",
      examples: [
        { en: "He is playing football.", vi: "Anh ấy đang chơi bóng đá." },
        { en: "She is reading a book.", vi: "Cô ấy đang đọc sách." },
        { en: "It is raining outside.", vi: "Trời đang mưa bên ngoài." }
      ],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300"
    },
    {
      id: 3,
      subject: "You/We/They",
      beVerb: "are",
      examples: [
        { en: "You are listening to music.", vi: "Bạn đang nghe nhạc." },
        { en: "We are having lunch.", vi: "Chúng tôi đang ăn trưa." },
        { en: "They are dancing.", vi: "Họ đang nhảy múa." }
      ],
      color: "from-green-400 to-teal-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-300"
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

      {/* Main Formula */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-8 mb-8 shadow-2xl border-4 border-gray-300"
      >
        <div className="text-center">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent font-mono mb-4"
          >
            S + am/is/are + V-ing
          </motion.p>
          <p className="text-2xl text-gray-700 font-semibold">Công thức chung</p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {affirmativeData.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`${form.bgColor} ${form.borderColor} border-4 rounded-3xl p-8 shadow-2xl`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Subject */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${form.color} text-white mb-4 shadow-lg`}
                >
                  {form.subject === "I" ? <User className="w-10 h-10" /> : <Users className="w-10 h-10" />}
                </motion.div>
                <div className="bg-white rounded-full px-8 py-4 shadow-md">
                  <span className="text-3xl font-bold text-gray-800">{form.subject}</span>
                </div>
              </div>

              {/* Formula */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-gray-200"
                >
                  <p className="text-2xl font-bold text-gray-600 mb-2">
                    {form.subject} + <span className="text-rose-500">{form.beVerb}</span> + V-ing
                  </p>
                  <p className="text-lg text-gray-500 font-semibold">Công thức</p>
                </motion.div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                {form.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-4 shadow-md cursor-pointer border-2 border-transparent hover:border-green-300 transition-all duration-200"
                    onClick={() => setSelectedExample(selectedExample === (form.id * 10 + idx) ? null : (form.id * 10 + idx))}
                  >
                    <p className="text-lg font-bold text-green-700 mb-1">
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
      subject: "I",
      formula: "am not",
      examples: [
        { en: "I am not studying now.", vi: "Tôi không đang học bây giờ." },
        { en: "I am not watching TV.", vi: "Tôi không đang xem TV." }
      ],
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-300"
    },
    {
      id: 2,
      subject: "He/She/It",
      formula: "is not (isn't)",
      examples: [
        { en: "She is not playing badminton now.", vi: "Cô ấy không đang chơi cầu lông bây giờ." },
        { en: "He isn't working today.", vi: "Anh ấy không đang làm việc hôm nay." }
      ],
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300"
    },
    {
      id: 3,
      subject: "You/We/They",
      formula: "are not (aren't)",
      examples: [
        { en: "They are not playing badminton now.", vi: "Họ không đang chơi cầu lông bây giờ." },
        { en: "We aren't having dinner.", vi: "Chúng tôi không đang ăn tối." }
      ],
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300"
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

      {/* Main Formula */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-8 mb-8 shadow-2xl border-4 border-gray-300"
      >
        <div className="text-center">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent font-mono mb-4"
          >
            S + am/is/are + not + V-ing
          </motion.p>
          <p className="text-2xl text-gray-700 font-semibold">Công thức chung</p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {negativeData.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`${form.bgColor} ${form.borderColor} border-4 rounded-3xl p-8 shadow-2xl`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Subject */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${form.color} text-white mb-4 shadow-lg`}
                >
                  {form.subject === "I" ? <User className="w-10 h-10" /> : <Users className="w-10 h-10" />}
                </motion.div>
                <div className="bg-white rounded-full px-8 py-4 shadow-md">
                  <span className="text-3xl font-bold text-gray-800">{form.subject}</span>
                </div>
              </div>

              {/* Formula */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-gray-200"
                >
                  <p className="text-2xl font-bold text-gray-600 mb-2">
                    {form.subject} + <span className="text-rose-500">{form.formula}</span> + V-ing
                  </p>
                  <p className="text-lg text-gray-500 font-semibold">Công thức</p>
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

  const questionData = [
    {
      id: 1,
      helper: "Am",
      subject: "I",
      examples: [
        { 
          question: "Am I doing this right?", 
          yesAnswer: "Yes, you are.", 
          noAnswer: "No, you are not.",
          translation: "Tôi có đang làm đúng không?"
        }
      ],
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300"
    },
    {
      id: 2,
      helper: "Is",
      subject: "He/She/It",
      examples: [
        { 
          question: "Is she studying English?", 
          yesAnswer: "Yes, she is.", 
          noAnswer: "No, she is not.",
          translation: "Cô ấy có đang học tiếng Anh không?"
        },
        { 
          question: "Is it raining outside?", 
          yesAnswer: "Yes, it is.", 
          noAnswer: "No, it is not.",
          translation: "Trời có đang mưa bên ngoài không?"
        }
      ],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300"
    },
    {
      id: 3,
      helper: "Are",
      subject: "You/We/They",
      examples: [
        { 
          question: "Are you having breakfast?", 
          yesAnswer: "Yes, I am.", 
          noAnswer: "No, I am not.",
          translation: "Bạn có đang ăn sáng không?"
        },
        { 
          question: "Are they playing football?", 
          yesAnswer: "Yes, they are.", 
          noAnswer: "No, they are not.",
          translation: "Họ có đang chơi bóng đá không?"
        }
      ],
      color: "from-green-400 to-teal-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-300"
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
            className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-mono mb-4"
          >
            Am/Is/Are + S + V-ing?
          </motion.p>
          <p className="text-2xl text-gray-700 font-semibold">Công thức chung</p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {questionData.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`${form.bgColor} ${form.borderColor} border-4 rounded-3xl p-8 shadow-2xl`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Helper + Subject */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${form.color} text-white mb-4 shadow-lg`}
                >
                  <span className="text-2xl font-bold">{form.helper}</span>
                </motion.div>
                <div className="bg-white rounded-full px-6 py-3 shadow-md">
                  <span className="text-xl font-bold text-gray-800">{form.subject}</span>
                </div>
              </div>

              {/* Formula */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-gray-200"
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-mono mb-2">
                    {form.helper} + S + V-ing?
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
              <p className="text-2xl font-bold text-green-600 mb-2">✅ Trả lời &quot;Có&quot;</p>
              <p className="text-lg text-gray-700">Yes, S + am/is/are.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-2xl font-bold text-red-600 mb-2">❌ Trả lời &quot;Không&quot;</p>
              <p className="text-lg text-gray-700">No, S + am/is/are + not.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Slide 6: Spelling Rules for -ing
export const SpellingRulesSlide: React.FC = () => {
  const [activeRule, setActiveRule] = useState<number | null>(null);

  const spellingRules = [
    {
      id: 1,
      title: "Bỏ 'e' → thêm 'ing'",
      condition: "Tận cùng là 'e'",
      rule: "→ Bỏ 'e' + ing",
      examples: [
        { base: "write", result: "writing", meaning: "viết" },
        { base: "make", result: "making", meaning: "làm" },
        { base: "take", result: "taking", meaning: "lấy" },
        { base: "come", result: "coming", meaning: "đến" }
      ],
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      emoji: "✏️"
    },
    {
      id: 2,
      title: "Gấp đôi phụ âm → thêm 'ing'",
      condition: "1 nguyên âm + 1 phụ âm",
      rule: "→ Gấp đôi phụ âm + ing",
      examples: [
        { base: "sit", result: "sitting", meaning: "ngồi" },
        { base: "run", result: "running", meaning: "chạy" },
        { base: "swim", result: "swimming", meaning: "bơi" },
        { base: "stop", result: "stopping", meaning: "dừng" }
      ],
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      emoji: "🔄"
    },
    {
      id: 3,
      title: "Đổi 'ie' thành 'y' → thêm 'ing'",
      condition: "Tận cùng là 'ie'",
      rule: "→ Đổi 'ie' thành 'y' + ing",
      examples: [
        { base: "lie", result: "lying", meaning: "nằm" },
        { base: "die", result: "dying", meaning: "chết" },
        { base: "tie", result: "tying", meaning: "buộc" }
      ],
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      emoji: "🔀"
    },
    {
      id: 4,
      title: "Thêm 'ing' (thông thường)",
      condition: "Các trường hợp còn lại",
      rule: "→ Thêm 'ing'",
      examples: [
        { base: "cook", result: "cooking", meaning: "nấu ăn" },
        { base: "play", result: "playing", meaning: "chơi" },
        { base: "read", result: "reading", meaning: "đọc" },
        { base: "watch", result: "watching", meaning: "xem" }
      ],
      color: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
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
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          📝 Quy tắc thêm đuôi &quot;-ing&quot;
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
                <p className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {rule.rule}
                </p>
              </motion.div>

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
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
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
      category: "Thời gian hiện tại",
      words: [
        { word: "now", meaning: "bây giờ", example: "I am studying now.", color: "bg-yellow-200 text-yellow-800" },
        { word: "right now", meaning: "ngay bây giờ", example: "She is cooking right now.", color: "bg-yellow-200 text-yellow-800" },
        { word: "at the moment", meaning: "lúc này", example: "They are playing at the moment.", color: "bg-yellow-200 text-yellow-800" },
        { word: "at present", meaning: "hiện tại", example: "He is working at present.", color: "bg-yellow-200 text-yellow-800" }
      ]
    },
    {
      category: "Câu mệnh lệnh",
      words: [
        { word: "Look!", meaning: "Nhìn kìa!", example: "Look! The baby is sleeping.", color: "bg-red-200 text-red-800" },
        { word: "Listen!", meaning: "Nghe này!", example: "Listen! Someone is singing.", color: "bg-red-200 text-red-800" },
        { word: "Watch out!", meaning: "Cẩn thận!", example: "Watch out! The car is coming.", color: "bg-red-200 text-red-800" }
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
              {category.category === "Thời gian hiện tại" ? "⏰" : "👁️"} {category.category}
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
            Khi thấy những từ này trong câu → Sử dụng <span className="font-bold text-blue-600">Present Continuous</span>!
          </p>
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-inner">
            <p className="text-lg text-gray-600 italic">
              &quot;Tìm từ khóa → Áp dụng công thức → Thành công!&quot; 🎯
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
      details: "Tìm các từ như: now, right now, at the moment, Look!, Listen!, Watch out!...",
      examples: [
        "Look! The baby is sleeping. → Có 'Look!'",
        "I am studying now. → Có 'now'"
      ],
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Xác Định Chủ Ngữ",
      description: "Phân loại chủ ngữ để chọn to be",
      details: "I → am | He/She/It → is | You/We/They → are",
      examples: [
        "I → am studying",
        "She → is playing",
        "They → are running"
      ],
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      icon: "👥"
    },
    {
      id: 3,
      title: "Chọn 'to be' đúng",
      description: "Chọn am/is/are phù hợp với chủ ngữ",
      details: "I → am | He/She/It → is | You/We/They → are",
      examples: [
        "I am reading a book.",
        "She is watching TV.",
        "They are playing football."
      ],
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      icon: "⚡"
    },
    {
      id: 4,
      title: "Thêm '-ing' vào động từ",
      description: "Áp dụng quy tắc thêm -ing",
      details: "Nhớ các quy tắc đặc biệt: bỏ 'e', gấp đôi phụ âm, đổi 'ie' thành 'y'...",
      examples: [
        "write → writing",
        "sit → sitting",
        "lie → lying",
        "play → playing"
      ],
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      icon: "✏️"
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
              <span className="font-bold text-yellow-600"> To be</span> → 
              <span className="font-bold text-red-600"> V-ing</span> → 
              <span className="font-bold text-purple-600"> Thành công!</span> 🎉
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};