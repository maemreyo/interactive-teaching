// pdf-to-learn/src/app/global-success/unit-1/components/ExerciseSlide.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface ExerciseData {
  ex1: {
    pointsPerAnswer: number;
    questions: Array<{ q: string; a: string }>;
  };
  ex2: {
    pointsPerAnswer: number;
    questions: Array<{ q: string; a: string | string[] }>;
  };
  ex3: {
    pointsPerAnswer: number;
    text: string;
    answers: string[];
  };
  ex4: {
    pointsPerAnswer: number;
    questions: Array<{ q: string; a: string | string[] }>;
  };
}

const exercisesData: ExerciseData = {
  ex1: {
    pointsPerAnswer: 1,
    questions: [
      { q: "My father and I {go|are going} jogging every morning.", a: "go" },
      { q: "I {go|am going} to the swimming pool with my cousin on Mondays.", a: "go" },
      { q: "We {don't study|aren't studying} Physics right now.", a: "aren't studying" },
      { q: "My baby sister {sleeps|is sleeping} in the bedroom at the moment.", a: "is sleeping" },
      { q: "We {have|are having} Maths, Literature and P.E. on Thursdays.", a: "have" },
      { q: "Turn the gas out! The water {boils|is boiling} over.", a: "is boiling" }
    ]
  },
  ex2: {
    pointsPerAnswer: 1,
    questions: [
      { q: "Samuel (hate) ___ rainy days.", a: "hates" },
      { q: "Stop singing! I (learn) ___ English words by heart.", a: "am learning" },
      { q: "Those gloves (not look) ___ nice as well as warm.", a: "don't look" },
      { q: "___ they (do) ___ an experiment without their teacher right now?", a: ["Are", "doing"] },
      { q: "A: Where is Jill? B: She (watch) ___ the cartoon in the living room.", a: "is watching" },
      { q: "The school year in Vietnam (begin) ___ in September and (end) ___ in May.", a: ["begins", "ends"] },
      { q: "Watch out! The baby (dribble) ___ on your shirt.", a: "is dribbling" },
      { q: "We (always - have) ___ a holiday in the summer. We (never - work) ___ in August.", a: ["always have", "never work"] },
      { q: "Julie (usually - play) ___ computer games after dinner but today she (watch) ___ TV with her parents.", a: ["usually plays", "is watching"] },
      { q: "Quang (be) ___ a teacher. He (usually teach) ___ students but today he (read) ___ a newspaper at home.", a: ["is", "usually teaches", "is reading"] }
    ]
  },
  ex3: {
    pointsPerAnswer: 1,
    text: "On my birthday, I (1. sometimes go) ___ out with his friends, or I (2. eat) ___ at a restaurant with my family. My mum (3. usually make) ___ me a birthday cake. My dad and sisters (4. usually - give) ___ me birthday presents. But this birthday is different! It's Leo's eighteenth birthday, so now he's an adult. This morning, he got a lot of presents. Now he (5. have) ___ a big party with all his friends. Some of his friends (6. dance) ___ to music. Others (7. eat) ___ delicious cakes and fruit. Leo (8. talk) ___ happily with his cousin, Anna.",
    answers: ["sometimes go", "eat", "usually makes", "usually give", "is having", "are dancing", "are eating", "is talking"]
  },
  ex4: {
    pointsPerAnswer: 1,
    questions: [
      { q: "Students/often/ go camping/ the summer. <br>→ Students often ___ camping in the summer.", a: "go" },
      { q: "Nga/talk/ the phone/her boyfriend/ at the moment. <br>→ Nga ___ on the phone with her boyfriend at the moment.", a: "is talking" },
      { q: "They/do/judo/ now. <br>→ They ___ judo now.", a: "are doing" },
      { q: "Harry/ sometimes/play/badminton/ his brother. <br>→ Harry sometimes ___ badminton with his brother.", a: "plays" },
      { q: "Peter/read/newspaper/wait/ the bus/right now. <br>→ Peter ___ a newspaper and ___ for the bus right now.", a: ["is reading", "waiting"] },
      { q: "Their grandma/ always/read/them/story/before/ bedtime. <br>→ Their grandma always ___ them a story before bedtime.", a: "reads" },
      { q: "Jim/go/ swimming pool/ his friend/ Monday afternoon. <br>→ Jim ___ to the swimming pool with his friends on Monday afternoons.", a: "goes" },
      { q: "Look!/ someone/try/ steal/ that man/wallet. <br>→ Look! Someone ___ to steal that man's wallet.", a: "is trying" },
      { q: "Sam and Sarah/wait/bus/right now? <br>→ ___ Sam and Sarah ___ for the bus right now?", a: ["Are", "waiting"] },
      { q: "Mom/always/advise/me/ do exercise/ enhance my health. <br>→ My mom always ___ me to do exercises to enhance my health.", a: "advises" }
    ]
  }
};

export const ExerciseSlide: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
  const [inputAnswers, setInputAnswers] = useState<{[key: string]: string}>({});
  const [checkedExercises, setCheckedExercises] = useState<{[key: string]: boolean}>({});
  const [totalScore, setTotalScore] = useState(0);

  const handleOptionClick = (questionId: string, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleInputChange = (inputId: string, value: string) => {
    setInputAnswers(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  const checkExercise = (exNum: string) => {
    setCheckedExercises(prev => ({
      ...prev,
      [exNum]: true
    }));
  };

  const resetExercise = (exNum: string) => {
    setCheckedExercises(prev => ({
      ...prev,
      [exNum]: false
    }));
    
    // Reset answers for this exercise
    if (exNum === '1') {
      const newSelected = { ...selectedAnswers };
      exercisesData.ex1.questions.forEach((_, i) => {
        delete newSelected[`1-${i}`];
      });
      setSelectedAnswers(newSelected);
    } else {
      const newInputs = { ...inputAnswers };
      Object.keys(newInputs).forEach(key => {
        if (key.startsWith(`${exNum}-`)) {
          delete newInputs[key];
        }
      });
      setInputAnswers(newInputs);
    }
  };

  const calculateScore = () => {
    let score = 0;
    
    // Exercise 1
    if (checkedExercises['1']) {
      exercisesData.ex1.questions.forEach((q, i) => {
        const selected = selectedAnswers[`1-${i}`];
        if (selected && selected.toLowerCase().trim() === q.a.toLowerCase().trim()) {
          score += exercisesData.ex1.pointsPerAnswer;
        }
      });
    }

    // Exercise 2
    if (checkedExercises['2']) {
      exercisesData.ex2.questions.forEach((q, i) => {
        let allCorrect = true;
        if (Array.isArray(q.a)) {
          q.a.forEach((ans, j) => {
            const input = inputAnswers[`2-${i}-${j}`];
            if (!input || input.toLowerCase().trim() !== ans.toLowerCase().trim()) {
              allCorrect = false;
            }
          });
        } else {
          const input = inputAnswers[`2-${i}`];
          if (!input || input.toLowerCase().trim() !== q.a.toLowerCase().trim()) {
            allCorrect = false;
          }
        }
        if (allCorrect) score += exercisesData.ex2.pointsPerAnswer;
      });
    }

    // Exercise 3
    if (checkedExercises['3']) {
      exercisesData.ex3.answers.forEach((ans, i) => {
        const input = inputAnswers[`3-${i}`];
        if (input && input.toLowerCase().trim() === ans.toLowerCase().trim()) {
          score += exercisesData.ex3.pointsPerAnswer;
        }
      });
    }

    // Exercise 4
    if (checkedExercises['4']) {
      exercisesData.ex4.questions.forEach((q, i) => {
        let allCorrect = true;
        if (Array.isArray(q.a)) {
          q.a.forEach((ans, j) => {
            const input = inputAnswers[`4-${i}-${j}`];
            if (!input || input.toLowerCase().trim() !== ans.toLowerCase().trim()) {
              allCorrect = false;
            }
          });
        } else {
          const input = inputAnswers[`4-${i}`];
          if (!input || input.toLowerCase().trim() !== q.a.toLowerCase().trim()) {
            allCorrect = false;
          }
        }
        if (allCorrect) score += exercisesData.ex4.pointsPerAnswer;
      });
    }

    return score;
  };

  useEffect(() => {
    setTotalScore(calculateScore());
  }, [checkedExercises, selectedAnswers, inputAnswers]);

  const renderFeedback = (questionId: string, correctAnswer: string | string[], isChecked: boolean) => {
    if (!isChecked) return null;

    let isCorrect = false;
    if (questionId.startsWith('1-')) {
      const selected = selectedAnswers[questionId];
      isCorrect = selected && selected.toLowerCase().trim() === (correctAnswer as string).toLowerCase().trim();
    } else {
      if (Array.isArray(correctAnswer)) {
        isCorrect = correctAnswer.every((ans, j) => {
          const input = inputAnswers[`${questionId}-${j}`];
          return input && input.toLowerCase().trim() === ans.toLowerCase().trim();
        });
      } else {
        const input = inputAnswers[questionId];
        isCorrect = input && input.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      }
    }

    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`inline-flex items-center ml-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
      >
        {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
      </motion.span>
    );
  };

  const renderInput = (id: string, width: string = 'w-40') => (
    <input
      type="text"
      id={id}
      value={inputAnswers[id] || ''}
      onChange={(e) => handleInputChange(id, e.target.value)}
      className={`inline-block ${width} p-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
    />
  );

  const renderExercise1 = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-purple-700">Bài 1: Chọn dạng đúng của động từ</h3>
      <p className="mb-4 text-gray-600">Nhấn vào từ đúng để hoàn thành câu. Mỗi câu đúng được 1 điểm.</p>
      
      <div className="space-y-4">
        {exercisesData.ex1.questions.map((item, index) => {
          const options = item.q.match(/\{(.*?)\}/)?.[1].split('|') || [];
          const questionText = item.q.replace(/\{.*?\}/, '___');
          const [before, after] = questionText.split('___');
          const questionId = `1-${index}`;
          
          return (
            <div key={index} className="flex items-center">
              <p className="text-lg">
                {index + 1}. {before}{' '}
                <span className="font-semibold">
                  {options.map((opt, optIndex) => (
                    <React.Fragment key={optIndex}>
                      <span
                        className={`verb-option cursor-pointer px-2 py-1 rounded border transition-all ${
                          selectedAnswers[questionId] === opt
                            ? checkedExercises['1']
                              ? opt.toLowerCase().trim() === item.a.toLowerCase().trim()
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-blue-400 text-white'
                            : 'border-gray-300 hover:bg-blue-100'
                        }`}
                        onClick={() => handleOptionClick(questionId, opt)}
                      >
                        {opt}
                      </span>
                      {optIndex < options.length - 1 && ' / '}
                    </React.Fragment>
                  ))}
                </span>
                {' '}{after}
              </p>
              {renderFeedback(questionId, item.a, checkedExercises['1'])}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => resetExercise('1')}
          className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại</span>
        </button>
        <button
          onClick={() => checkExercise('1')}
          className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-all"
        >
          Kiểm tra
        </button>
      </div>
    </div>
  );

  const renderExercise2 = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-orange-700">Bài 2: Chia động từ ở thì Hiện tại đơn hoặc Hiện tại tiếp diễn</h3>
      <p className="mb-4 text-gray-600">Điền vào chỗ trống dạng đúng của động từ trong ngoặc. Mỗi câu đúng được 1 điểm.</p>
      
      <div className="space-y-4">
        {exercisesData.ex2.questions.map((item, index) => {
          let questionHtml = item.q;
          const questionId = `2-${index}`;
          
          if (Array.isArray(item.a)) {
            item.a.forEach((_, j) => {
              questionHtml = questionHtml.replace('___', `INPUT_${questionId}-${j}`);
            });
          } else {
            questionHtml = questionHtml.replace('___', `INPUT_${questionId}`);
          }
          
          const parts = questionHtml.split(/INPUT_[\w-]+/);
          const inputs = questionHtml.match(/INPUT_[\w-]+/g) || [];
          
          return (
            <div key={index} className="flex items-center">
              <p className="text-lg">
                {index + 1}. {parts.map((part, partIndex) => (
                  <React.Fragment key={partIndex}>
                    <span dangerouslySetInnerHTML={{ __html: part }} />
                    {inputs[partIndex] && renderInput(inputs[partIndex].replace('INPUT_', ''))}
                  </React.Fragment>
                ))}
              </p>
              {renderFeedback(questionId, item.a, checkedExercises['2'])}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => resetExercise('2')}
          className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại</span>
        </button>
        <button
          onClick={() => checkExercise('2')}
          className="bg-orange-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-700 transition-all"
        >
          Kiểm tra
        </button>
      </div>
    </div>
  );

  const renderExercise3 = () => {
    let textWithInputs = exercisesData.ex3.text;
    exercisesData.ex3.answers.forEach((_, index) => {
      textWithInputs = textWithInputs.replace('___', `INPUT_3-${index}`);
    });
    
    const parts = textWithInputs.split(/INPUT_[\w-]+/);
    const inputs = textWithInputs.match(/INPUT_[\w-]+/g) || [];
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-teal-700">Bài 3: Hoàn thành đoạn văn về Leo</h3>
        <p className="mb-4 text-gray-600">Chia động từ trong ngoặc để hoàn thành đoạn văn. Mỗi câu đúng được 1 điểm.</p>
        
        <div className="text-lg leading-loose">
          <p>
            {parts.map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {part}
                {inputs[partIndex] && (
                  <>
                    {renderInput(inputs[partIndex].replace('INPUT_', ''))}
                    {renderFeedback(`3-${partIndex}`, exercisesData.ex3.answers[partIndex], checkedExercises['3'])}
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => resetExercise('3')}
            className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại</span>
          </button>
          <button
            onClick={() => checkExercise('3')}
            className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-all"
          >
            Kiểm tra
          </button>
        </div>
      </div>
    );
  };

  const renderExercise4 = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-indigo-700">Bài 4: Hoàn thành câu dùng từ gợi ý</h3>
      <p className="mb-4 text-gray-600">Điền vào chỗ trống để hoàn thành câu. Mỗi câu đúng được 1 điểm.</p>
      
      <div className="space-y-4">
        {exercisesData.ex4.questions.map((item, index) => {
          let questionHtml = item.q;
          const questionId = `4-${index}`;
          
          if (Array.isArray(item.a)) {
            item.a.forEach((_, j) => {
              questionHtml = questionHtml.replace('___', `INPUT_${questionId}-${j}`);
            });
          } else {
            questionHtml = questionHtml.replace('___', `INPUT_${questionId}`);
          }
          
          const parts = questionHtml.split(/INPUT_[\w-]+/);
          const inputs = questionHtml.match(/INPUT_[\w-]+/g) || [];
          
          return (
            <div key={index} className="flex items-start">
              <p className="text-lg">
                {index + 1}. {parts.map((part, partIndex) => (
                  <React.Fragment key={partIndex}>
                    <span dangerouslySetInnerHTML={{ __html: part }} />
                    {inputs[partIndex] && renderInput(inputs[partIndex].replace('INPUT_', ''), 'w-32')}
                  </React.Fragment>
                ))}
              </p>
              {renderFeedback(questionId, item.a, checkedExercises['4'])}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => resetExercise('4')}
          className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại</span>
        </button>
        <button
          onClick={() => checkExercise('4')}
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Kiểm tra
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-baloo-2 mb-4">
          📝 Bài Tập Vận Dụng
        </h3>
        <p className="text-xl text-gray-600 mb-6">Thực hành Present Simple và Present Continuous</p>
        
        {/* Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-6 py-3 shadow-lg border-2 border-yellow-200"
        >
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span className="text-lg font-medium text-gray-600">Tổng Điểm:</span>
          <motion.div
            key={totalScore}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-green-500"
          >
            {totalScore}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        {renderExercise1()}
        {renderExercise2()}
        {renderExercise3()}
        {renderExercise4()}
      </div>
    </div>
  );
};