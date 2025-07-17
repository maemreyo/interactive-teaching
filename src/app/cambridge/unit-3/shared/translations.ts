// src/app/cambridge/unit-3/shared/translations.ts
import { Language, Translations } from "./types";

export const translations: Record<Language, Translations> = {
  en: {
    title: "🏠 Number House Method 🏠",
    subtitle: "Visual method for teaching 3-digit addition and subtraction",
    controls: {
      home: "Home",
      playPause: "Play/Pause",
      play: "Play Audio",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      reset: "Reset",
      restart: "Start Over"
    },
    progress: {
      step: "Step",
      of: "of"
    },
    navigation: {
      previous: "Previous Step",
      next: "Next Step"
    },
    numberHouse: {
      hundreds: "HUNDREDS",
      tens: "TENS", 
      units: "UNITS",
      firstNumber: "First number",
      secondNumber: "Second number",
      minuend: "Minuend",
      subtrahend: "Subtrahend",
      result: "RESULT"
    },
    operations: {
      add: "ADD",
      subtract: "SUBTRACT",
      addition: "Addition with Carrying",
      subtraction: "Subtraction with Borrowing"
    },
    feedback: {
      carry: "Carry",
      borrow: "Borrow",
      gift: "Gift"
    }
  },
  vi: {
    title: "🏠 Ngôi Nhà Các Con Số 🏠",
    subtitle: "Phương pháp dạy cộng trừ số có 3 chữ số trực quan và dễ hiểu",
    controls: {
      home: "Trang Chủ",
      playPause: "Phát/Tạm Dừng",
      play: "Phát Âm",
      pause: "Tạm Dừng",
      mute: "Tắt Tiếng",
      unmute: "Bật Tiếng",
      reset: "Làm Lại",
      restart: "Bắt Đầu Lại"
    },
    progress: {
      step: "Bước",
      of: "/"
    },
    navigation: {
      previous: "Bước Trước",
      next: "Bước Tiếp"
    },
    numberHouse: {
      hundreds: "TRĂM",
      tens: "CHỤC",
      units: "ĐƠN VỊ",
      firstNumber: "Số thứ nhất",
      secondNumber: "Số thứ hai",
      minuend: "Số bị trừ",
      subtrahend: "Số trừ",
      result: "KẾT QUẢ"
    },
    operations: {
      add: "CỘNG",
      subtract: "TRỪ",
      addition: "Phép Cộng Có Nhớ",
      subtraction: "Phép Trừ Có Nhớ"
    },
    feedback: {
      carry: "Nhớ",
      borrow: "Mượn",
      gift: "Gửi quà"
    }
  }
};