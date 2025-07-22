export const spellingRules = [
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
    emoji: ""
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
    emoji: ""
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