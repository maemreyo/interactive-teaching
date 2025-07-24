// src/app/global-success/unit-1/components/PronunciationData.ts
// CREATED: 2025-01-27 - Pronunciation data for Unit 1

import { PronunciationSection } from './types';

export const pronunciationSections: PronunciationSection[] = [
  {
    id: 1,
    title: 'Bước 1: Âm /ʌ/ và /əʊ/ - Game On!',
    sound: '/ʌ/ và /əʊ/',
    description: 'Khởi động! Hãy cùng nghe và bắt chước các từ vựng chủ đề game dưới đây.',
    isActive: true,
    words: [
      // Âm /ʌ/
      { word: 'run', phonetic: '/rʌn/' },
      { word: 'jump', phonetic: '/dʒʌmp/' },
      { word: 'gun', phonetic: '/ɡʌn/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'stun', phonetic: '/stʌn/' },
      { word: 'hunt', phonetic: '/hʌnt/' },
      { word: 'luck', phonetic: '/lʌk/' },
      { word: 'double', phonetic: '/ˈdʌbəl/' },
      { word: 'summon', phonetic: '/ˈsʌmən/' },
      // Âm /əʊ/
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'role', phonetic: '/rəʊl/' },
      { word: 'soul', phonetic: '/səʊl/' },
      { word: 'code', phonetic: '/kəʊd/' },
      { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
      { word: 'control', phonetic: '/kənˈtrəʊl/' },
      { word: 'load', phonetic: '/ləʊd/' },
      { word: 'opponent', phonetic: '/əˈpəʊnənt/' },
    ]
  },
  {
    id: 2,
    title: 'Bước 2: Hướng dẫn chi tiết /ʌ/ và /əʊ/',
    sound: '/ʌ/ và /əʊ/',
    description: 'Hướng dẫn chi tiết cách đặt miệng và lưỡi để tạo ra âm thanh chuẩn xác.',
    isActive: true,
    words: [
      // Âm /ʌ/
      { word: 'run', phonetic: '/rʌn/' },
      { word: 'jump', phonetic: '/dʒʌmp/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'stun', phonetic: '/stʌn/' },
      { word: 'hunt', phonetic: '/hʌnt/' },
      { word: 'double', phonetic: '/ˈdʌbəl/' },
      // Âm /əʊ/
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'role', phonetic: '/rəʊl/' },
      { word: 'soul', phonetic: '/səʊl/' },
      { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
      { word: 'control', phonetic: '/kənˈtrəʊl/' },
    ]
  },
  {
    id: 3,
    title: 'Bước 3: Âm /æ/ và /eɪ/ - Daily Activities',
    sound: '/æ/ và /eɪ/',
    description: 'Thực hành âm ngắn và âm đôi qua các hoạt động hàng ngày.',
    isActive: false,
    words: []
  },
  {
    id: 4,
    title: 'Bước 4: Âm /ɒ/ và /ɔː/ - School Subjects',
    sound: '/ɒ/ và /ɔː/',
    description: 'Phân biệt âm ngắn và âm dài qua tên các môn học.',
    isActive: false,
    words: []
  },
  {
    id: 5,
    title: 'Bước 5: Âm /ʊ/ và /uː/ - School Equipment',
    sound: '/ʊ/ và /uː/',
    description: 'Luyện tập âm u ngắn và u dài với đồ dùng học tập.',
    isActive: false,
    words: []
  },
  {
    id: 6,
    title: 'Bước 6: Tổng hợp và Ôn tập',
    sound: 'Mixed Sounds',
    description: 'Ôn tập tất cả các âm đã học qua game tương tác.',
    isActive: false,
    words: []
  }
];

// Separate data for step 1 with organized sections
export const step1Data = {
  sound_uh: [
    { word: 'run', phonetic: '/rʌn/' },
    { word: 'jump', phonetic: '/dʒʌmp/' },
    { word: 'gun', phonetic: '/ɡʌn/' },
    { word: 'fun', phonetic: '/fʌn/' },
    { word: 'stun', phonetic: '/stʌn/' },
    { word: 'hunt', phonetic: '/hʌnt/' },
    { word: 'luck', phonetic: '/lʌk/' },
    { word: 'double', phonetic: '/ˈdʌbəl/' },
    { word: 'summon', phonetic: '/ˈsʌmən/' },
  ],
  sound_oh: [
    { word: 'go', phonetic: '/ɡəʊ/' },
    { word: 'gold', phonetic: '/ɡəʊld/' },
    { word: 'role', phonetic: '/rəʊl/' },
    { word: 'soul', phonetic: '/səʊl/' },
    { word: 'code', phonetic: '/kəʊd/' },
    { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
    { word: 'control', phonetic: '/kənˈtrəʊl/' },
    { word: 'load', phonetic: '/ləʊd/' },
    { word: 'opponent', phonetic: '/əˈpəʊnənt/' },
  ],
};

// Detailed data for step 2 with instructions
export const step2Data = {
  sound_uh: {
    sound: "/ʌ/",
    description: "Âm này ngắn và dứt khoát, giống âm 'ă' trong tiếng Việt.",
    instructions: [
      "Hàm và môi thả lỏng, không căng.",
      "Mở miệng tự nhiên, không quá rộng.",
      "Lưỡi hạ thấp và hơi lùi về phía sau.",
    ],
    commonSpellings: ["u", "o", "ou"],
    examples: [
      { word: 'run', phonetic: '/rʌn/' },
      { word: 'jump', phonetic: '/dʒʌmp/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'stun', phonetic: '/stʌn/' },
      { word: 'hunt', phonetic: '/hʌnt/' },
      { word: 'double', phonetic: '/ˈdʌbəl/' },
    ]
  },
  sound_oh: {
    sound: "/əʊ/",
    description: "Đây là nguyên âm đôi, di chuyển từ /ə/ (ơ) sang /ʊ/ (u).",
    instructions: [
      "Bắt đầu với miệng thả lỏng như khi nói 'ơ'.",
      "Nâng cuống lưỡi lên.",
      "Tròn môi dần và đưa ra phía trước để kết thúc bằng âm 'u' ngắn.",
    ],
    commonSpellings: ["o", "ow", "oa", "ou"],
    examples: [
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'role', phonetic: '/rəʊl/' },
      { word: 'soul', phonetic: '/səʊl/' },
      { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
      { word: 'control', phonetic: '/kənˈtrəʊl/' },
    ]
  }
};