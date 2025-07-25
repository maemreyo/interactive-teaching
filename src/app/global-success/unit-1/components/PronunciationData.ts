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
    title: 'Bước 3: Thử thách Game /ʌ/ và /əʊ/',
    sound: '/ʌ/ và /əʊ/',
    description: 'Thử thách! Đã đến lúc kiểm tra kỹ năng của bạn qua các trò chơi.',
    isActive: true,
    words: [
      // Game words
      { word: 'honey', phonetic: '/ˈhʌni/' },
      { word: 'come', phonetic: '/kʌm/' },
      { word: 'most', phonetic: '/məʊst/' },
      { word: 'brother', phonetic: '/ˈbrʌðə(r)/' },
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'hold', phonetic: '/həʊld/' },
      { word: 'bone', phonetic: '/bəʊn/' },
      { word: 'month', phonetic: '/mʌnθ/' },
      { word: 'opponent', phonetic: '/əˈpəʊnənt/' },
      { word: 'summon', phonetic: '/ˈsʌmən/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'love', phonetic: '/lʌv/' },
      { word: 'code', phonetic: '/kəʊd/' }
    ]
  },
  {
    id: 4,
    title: 'Bước 4: Boss Battle - Speech Recognition',
    sound: '/ʌ/ và /əʊ/',
    description: 'Chiến đấu với Trùm Phát Âm bằng giọng nói! Sử dụng microphone để tấn công.',
    isActive: true,
    words: [
      // Boss battle words
      { word: 'run', phonetic: '/rʌn/' },
      { word: 'jump', phonetic: '/dʒʌmp/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'stun', phonetic: '/stʌn/' },
      { word: 'hunt', phonetic: '/hʌnt/' },
      { word: 'luck', phonetic: '/lʌk/' },
      { word: 'double', phonetic: '/ˈdʌbəl/' },
      { word: 'summon', phonetic: '/ˈsʌmən/' },
      { word: 'love', phonetic: '/lʌv/' },
      { word: 'month', phonetic: '/mʌnθ/' },
      { word: 'come', phonetic: '/kʌm/' },
      { word: 'brother', phonetic: '/ˈbrʌðə(r)/' },
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'role', phonetic: '/rəʊl/' },
      { word: 'soul', phonetic: '/səʊl/' },
      { word: 'code', phonetic: '/kəʊd/' },
      { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
      { word: 'control', phonetic: '/kənˈtrəʊl/' },
      { word: 'load', phonetic: '/ləʊd/' },
      { word: 'opponent', phonetic: '/əˈpəʊnənt/' },
      { word: 'hold', phonetic: '/həʊld/' },
      { word: 'bone', phonetic: '/bəʊn/' },
      { word: 'most', phonetic: '/məʊst/' }
    ]
  },
  {
    id: 5,
    title: 'Bước 5: Pathfinder Maze - Tìm Đường',
    sound: '/ʌ/ và /əʊ/',
    description: 'Tìm đường trong mê cung bằng cách chọn từ có âm đúng. Game có 3 độ khó với âm thanh.',
    isActive: true,
    words: [
      // Pathfinder words - /ʌ/ sounds
      { word: 'love', phonetic: '/lʌv/' },
      { word: 'come', phonetic: '/kʌm/' },
      { word: 'run', phonetic: '/rʌn/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'month', phonetic: '/mʌnθ/' },
      { word: 'luck', phonetic: '/lʌk/' },
      { word: 'study', phonetic: '/ˈstʌdi/' },
      { word: 'honey', phonetic: '/ˈhʌni/' },
      { word: 'brother', phonetic: '/ˈbrʌðə(r)/' },
      { word: 'double', phonetic: '/ˈdʌbəl/' },
      { word: 'stun', phonetic: '/stʌn/' },
      { word: 'hunt', phonetic: '/hʌnt/' },
      { word: 'ugly', phonetic: '/ˈʌɡli/' },
      { word: 'cup', phonetic: '/kʌp/' },
      { word: 'summon', phonetic: '/ˈsʌmən/' },
      // Pathfinder words - /əʊ/ sounds
      { word: 'gold', phonetic: '/ɡəʊld/' },
      { word: 'bone', phonetic: '/bəʊn/' },
      { word: 'role', phonetic: '/rəʊl/' },
      { word: 'code', phonetic: '/kəʊd/' },
      { word: 'opponent', phonetic: '/əˈpəʊnənt/' },
      { word: 'control', phonetic: '/kənˈtrəʊl/' },
      { word: 'judo', phonetic: '/ˈdʒuːdəʊ/' },
      { word: 'most', phonetic: '/məʊst/' },
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'hold', phonetic: '/həʊld/' },
      { word: 'soul', phonetic: '/səʊl/' },
      { word: 'bonus', phonetic: '/ˈbəʊnəs/' },
      { word: 'load', phonetic: '/ləʊd/' },
      { word: 'poem', phonetic: '/ˈpəʊɪm/' },
      { word: 'open', phonetic: '/ˈəʊpən/' }
    ]
  },
  {
    id: 6,
    title: 'Bước 6: Bài Tập Về Nhà',
    sound: '/ʌ/ và /əʊ/',
    description: 'Luyện đọc hiểu với 3 bài đọc tương tác. Học từ vựng qua ngữ cảnh và luyện phát âm.',
    isActive: true,
    words: [
      // Homework vocabulary from reading passages
      { word: 'show', phonetic: '/ʃəʊ/' },
      { word: 'lovely', phonetic: '/ˈlʌvli/' },
      { word: 'home', phonetic: '/həʊm/' },
      { word: 'go', phonetic: '/ɡəʊ/' },
      { word: 'brother', phonetic: '/ˈbrʌðə(r)/' },
      { word: 'fun', phonetic: '/fʌn/' },
      { word: 'hope', phonetic: '/həʊp/' },
      { word: 'club', phonetic: '/klʌb/' },
      { word: 'one', phonetic: '/wʌn/' },
      { word: 'don\'t', phonetic: '/dəʊnt/' },
      { word: 'gloves', phonetic: '/ɡlʌvz/' },
      { word: 'mother', phonetic: '/ˈmʌðə(r)/' },
      { word: 'so', phonetic: '/səʊ/' },
      { word: 'Some', phonetic: '/sʌm/' },
      { word: 'study', phonetic: '/ˈstʌdi/' },
      { word: 'subject', phonetic: '/ˈsʌbdʒɪkt/' },
      { word: 'piano', phonetic: '/piˈænəʊ/' },
      { word: 'know', phonetic: '/nəʊ/' },
      { word: 'wonderful', phonetic: '/ˈwʌndəfl/' },
      { word: 'Monday', phonetic: '/ˈmʌndeɪ/' },
      { word: 'open', phonetic: '/ˈəʊpən/' },
      { word: 'window', phonetic: '/ˈwɪndəʊ/' },
      { word: 'dove', phonetic: '/dʌv/' },
      { word: 'poem', phonetic: '/ˈpəʊɪm/' },
      { word: 'month', phonetic: '/mʌnθ/' },
      { word: 'love', phonetic: '/lʌv/' }
    ]
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

// Game data for step 3
export const getStep3GameData = () => ({
  soundSort: [
    { parts: ['h', 'o', 'ney'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/ˈhʌni/' },
    { parts: ['c', 'o', 'me'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/kʌm/' },
    { parts: ['m', 'o', 'st'] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/məʊst/' },
    { parts: ['br', 'o', 'ther'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/ˈbrʌðə(r)/' },
    { parts: ['', 'go', ''] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/ɡəʊ/' },
    { parts: ['h', 'o', 'ld'] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/həʊld/' },
    { parts: ['b', 'o', 'ne'] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/bəʊn/' },
    { parts: ['m', 'o', 'nth'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/mʌnθ/' },
    { parts: ['opp', 'o', 'nent'] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/əˈpəʊnənt/' },
    { parts: ['s', 'u', 'mmon'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/ˈsʌmən/' },
    { parts: ['f', 'u', 'n'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/fʌn/' },
    { parts: ['g', 'o', 'ld'] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/ɡəʊld/' },
    { parts: ['l', 'o', 've'] as [string, string, string], sound: '/ʌ/' as '/ʌ/', phonetic: '/lʌv/' },
    { parts: ['c', 'o', 'de'] as [string, string, string], sound: '/əʊ/' as '/əʊ/', phonetic: '/kəʊd/' }
  ],
  oddOneOut: [
    { 
      words: [
        { parts: ['c', 'o', 'mb'] as [string, string, string], phonetic: '/kəʊm/', isAnswer: false }, 
        { parts: ['l', 'o', 've'] as [string, string, string], phonetic: '/lʌv/', isAnswer: true }, 
        { parts: ['wh', 'o', 'le'] as [string, string, string], phonetic: '/həʊl/', isAnswer: false }, 
        { parts: ['h', 'o', 'le'] as [string, string, string], phonetic: '/həʊl/', isAnswer: false }
      ] 
    },
    { 
      words: [
        { parts: ['l', 'u', 'ck'] as [string, string, string], phonetic: '/lʌk/', isAnswer: false }, 
        { parts: ['m', 'u', 'ch'] as [string, string, string], phonetic: '/mʌtʃ/', isAnswer: false }, 
        { parts: ['sh', 'u', 't'] as [string, string, string], phonetic: '/ʃʌt/', isAnswer: false }, 
        { parts: ['c', 'u', 'be'] as [string, string, string], phonetic: '/kjuːb/', isAnswer: true }
      ] 
    },
    { 
      words: [
        { parts: ['p', 'o', 'st'] as [string, string, string], phonetic: '/pəʊst/', isAnswer: false }, 
        { parts: ['f', 'o', 'lder'] as [string, string, string], phonetic: '/ˈfəʊldə(r)/', isAnswer: false }, 
        { parts: ['p', 'o', 'em'] as [string, string, string], phonetic: '/ˈpəʊɪm/', isAnswer: false }, 
        { parts: ['b', 'o', 'x'] as [string, string, string], phonetic: '/bɒks/', isAnswer: true }
      ] 
    },
    { 
      words: [
        { parts: ['j', 'u', 'do'] as [string, string, string], phonetic: '/ˈdʒuːdəʊ/', isAnswer: true }, 
        { parts: ['st', 'u', 'dy'] as [string, string, string], phonetic: '/ˈstʌdi/', isAnswer: false }, 
        { parts: ['', 'u', 'ncle'] as [string, string, string], phonetic: '/ˈʌŋkl/', isAnswer: false }, 
        { parts: ['', 'u', 'gly'] as [string, string, string], phonetic: '/ˈʌɡli/', isAnswer: false }
      ] 
    },
    { 
      words: [
        { parts: ['m', 'o', 'ney'] as [string, string, string], phonetic: '/ˈmʌni/', isAnswer: true }, 
        { parts: ['st', 'o', 'ne'] as [string, string, string], phonetic: '/stəʊn/', isAnswer: false }, 
        { parts: ['r', 'o', 'lling'] as [string, string, string], phonetic: '/ˈrəʊlɪŋ/', isAnswer: false }, 
        { parts: ['r', 'o', 'pe'] as [string, string, string], phonetic: '/rəʊp/', isAnswer: false }
      ] 
    }
  ]
});

// Boss battle challenge words for step 4
export const getBossBattleWords = (): string[] => [
  'run', 'jump', 'fun', 'stun', 'hunt', 'luck', 'double', 'summon', 'love', 'month', 'come', 'brother',
  'go', 'gold', 'role', 'soul', 'code', 'bonus', 'control', 'load', 'opponent', 'hold', 'bone', 'most'
];