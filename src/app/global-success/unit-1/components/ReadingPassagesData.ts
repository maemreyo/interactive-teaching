// src/app/global-success/unit-1/components/ReadingPassagesData.ts
// CREATED: 2025-01-27 - Reading passages data for pronunciation homework

import { ReadingPassage } from './types';

export const readingPassagesData: ReadingPassage[] = [
  {
    title: "Bài đọc 1: My Wonderful School",
    content: [
      { type: 'text', content: 'Hello! My name is Phong. I want to ' },
      { type: 'interactive', word: 'show', sound: '/əʊ/', phonetic: '/ʃəʊ/', meaning: 'chỉ cho xem' },
      { type: 'text', content: ' you my new school. It is so ' },
      { type: 'interactive', word: 'lovely', sound: '/ʌ/', phonetic: '/ˈlʌvli/', meaning: 'đáng yêu' },
      { type: 'text', content: '. My school is not far from my ' },
      { type: 'interactive', word: 'home', sound: '/əʊ/', phonetic: '/həʊm/', meaning: 'nhà' },
      { type: 'text', content: '. Every morning, I ' },
      { type: 'interactive', word: 'go', sound: '/əʊ/', phonetic: '/ɡəʊ/', meaning: 'đi' },
      { type: 'text', content: ' to school with my younger ' },
      { type: 'interactive', word: 'brother', sound: '/ʌ/', phonetic: '/ˈbrʌðə(r)/', meaning: 'em trai' },
      { type: 'text', content: '. We have a lot of ' },
      { type: 'interactive', word: 'fun', sound: '/ʌ/', phonetic: '/fʌn/', meaning: 'niềm vui' },
      { type: 'text', content: ' together. The school has many clubs. I ' },
      { type: 'interactive', word: 'hope', sound: '/əʊ/', phonetic: '/həʊp/', meaning: 'hy vọng' },
      { type: 'text', content: ' to join the English ' },
      { type: 'interactive', word: 'club', sound: '/ʌ/', phonetic: '/klʌb/', meaning: 'câu lạc bộ' },
      { type: 'text', content: ' ' },
      { type: 'interactive', word: 'one', sound: '/ʌ/', phonetic: '/wʌn/', meaning: 'một' },
      { type: 'text', content: ' day.' },
    ]
  },
  {
    title: "Bài đọc 2: First Day Fun",
    content: [
      { type: 'text', content: 'Today is my first day. I ' },
      { type: 'interactive', word: 'don\'t', sound: '/əʊ/', phonetic: '/dəʊnt/', meaning: 'không' },
      { type: 'text', content: ' feel worried. I put on my new uniform and my ' },
      { type: 'interactive', word: 'gloves', sound: '/ʌ/', phonetic: '/ɡlʌvz/', meaning: 'găng tay' },
      { type: 'text', content: '. My ' },
      { type: 'interactive', word: 'mother', sound: '/ʌ/', phonetic: '/ˈmʌðə(r)/', meaning: 'mẹ' },
      { type: 'text', content: ' gives me a new notebook. I feel ' },
      { type: 'interactive', word: 'so', sound: '/əʊ/', phonetic: '/səʊ/', meaning: 'rất' },
      { type: 'text', content: ' excited! At school, I meet my new classmates. ' },
      { type: 'interactive', word: 'Some', sound: '/ʌ/', phonetic: '/sʌm/', meaning: 'một vài' },
      { type: 'text', content: ' of them are very friendly. We ' },
      { type: 'interactive', word: 'study', sound: '/ʌ/', phonetic: '/ˈstʌdi/', meaning: 'học' },
      { type: 'text', content: ' many subjects. My favorite ' },
      { type: 'interactive', word: 'subject', sound: '/ʌ/', phonetic: '/ˈsʌbdʒɪkt/', meaning: 'môn học' },
      { type: 'text', content: ' is Music, where I learn to play the ' },
      { type: 'interactive', word: 'piano', sound: '/əʊ/', phonetic: '/piˈænəʊ/', meaning: 'đàn piano' },
      { type: 'text', content: '. I ' },
      { type: 'interactive', word: 'know', sound: '/əʊ/', phonetic: '/nəʊ/', meaning: 'biết' },
      { type: 'text', content: ' it will be a ' },
      { type: 'interactive', word: 'wonderful', sound: '/ʌ/', phonetic: '/ˈwʌndəfl/', meaning: 'tuyệt vời' },
      { type: 'text', content: ' year.' },
    ]
  },
  {
    title: "Bài đọc 3: A Monday Morning",
    content: [
      { type: 'text', content: 'On ' },
      { type: 'interactive', word: 'Monday', sound: '/ʌ/', phonetic: '/ˈmʌndeɪ/', meaning: 'Thứ Hai' },
      { type: 'text', content: ' morning, our classroom is very busy. The teacher asks us to ' },
      { type: 'interactive', word: 'open', sound: '/əʊ/', phonetic: '/ˈəʊpən/', meaning: 'mở' },
      { type: 'text', content: ' the ' },
      { type: 'interactive', word: 'window', sound: '/əʊ/', phonetic: '/ˈwɪndəʊ/', meaning: 'cửa sổ' },
      { type: 'text', content: '. A ' },
      { type: 'interactive', word: 'dove', sound: '/ʌ/', phonetic: '/dʌv/', meaning: 'bồ câu' },
      { type: 'text', content: ' flies past. For our homework, we write a ' },
      { type: 'interactive', word: 'poem', sound: '/əʊ/', phonetic: '/ˈpəʊɪm/', meaning: 'bài thơ' },
      { type: 'text', content: '. It is about a ' },
      { type: 'interactive', word: 'month', sound: '/ʌ/', phonetic: '/mʌnθ/', meaning: 'tháng' },
      { type: 'text', content: ' of ' },
      { type: 'interactive', word: 'love', sound: '/ʌ/', phonetic: '/lʌv/', meaning: 'tình yêu' },
      { type: 'text', content: ' and ' },
      { type: 'interactive', word: 'hope', sound: '/əʊ/', phonetic: '/həʊp/', meaning: 'hy vọng' },
      { type: 'text', content: '.' },
    ]
  }
];

// Extract all interactive words for vocabulary reference
export const homeworkVocabulary = readingPassagesData
  .flatMap(passage => passage.content)
  .filter(item => item.type === 'interactive')
  .map(item => ({
    word: item.word!,
    phonetic: item.phonetic!,
    meaning: item.meaning!,
    sound: item.sound!
  }));

// Statistics
export const homeworkStats = {
  totalPassages: readingPassagesData.length,
  totalWords: homeworkVocabulary.length,
  uhSounds: homeworkVocabulary.filter(w => w.sound === '/ʌ/').length,
  ohSounds: homeworkVocabulary.filter(w => w.sound === '/əʊ/').length,
};