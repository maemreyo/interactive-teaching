// src/app/cambridge/unit-3/addition/components/additionSteps.ts
import { MathStep } from "../../shared/types";

export const additionSteps: MathStep[] = [
  {
    id: "step-1",
    title: {
      en: "Step 1: Build the Number House",
      vi: "Bước 1: Xây Dựng Ngôi Nhà"
    },
    description: {
      en: "Create a house with 3 rooms: HUNDREDS, TENS, UNITS",
      vi: "Tạo ngôi nhà với 3 phòng: TRĂM, CHỤC, ĐƠN VỊ"
    },
    explanation: {
      en: "This is the house for our numbers. Each digit will live in its proper room.",
      vi: "Đây là ngôi nhà của các con số, mỗi số sẽ ở đúng phòng của mình."
    },
    voiceText: {
      en: "We will build a number house with three rooms: hundreds room, tens room, and units room.",
      vi: "Chúng ta sẽ xây dựng ngôi nhà các con số với ba phòng: phòng trăm, phòng chục và phòng đơn vị."
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    highlightColumn: null
  },
  {
    id: "step-2",
    title: {
      en: "Step 2: Place Numbers in the House",
      vi: "Bước 2: Xếp Số Vào Nhà"
    },
    description: {
      en: "Place 245 and 137 in their proper rooms",
      vi: "Xếp số 245 và 137 vào đúng phòng"
    },
    explanation: {
      en: "Number 245: 2 in Hundreds room, 4 in Tens room, 5 in Units room. Number 137: 1 in Hundreds room, 3 in Tens room, 7 in Units room.",
      vi: "Số 245: 2 ở phòng Trăm, 4 ở phòng Chục, 5 ở phòng Đơn vị. Số 137: 1 ở phòng Trăm, 3 ở phòng Chục, 7 ở phòng Đơn vị."
    },
    voiceText: {
      en: "Now we place each number in its proper room in the house.",
      vi: "Bây giờ chúng ta xếp các số vào đúng phòng của chúng trong ngôi nhà."
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    highlightColumn: null
  },
  {
    id: "step-3",
    title: {
      en: "Step 3: Calculate Units Room",
      vi: "Bước 3: Tính Phòng Đơn Vị"
    },
    description: {
      en: "5 + 7 = 12 (Always start from right to left)",
      vi: "5 + 7 = 12 (Luôn bắt đầu từ phải qua trái)"
    },
    explanation: {
      en: "In the Units room: 5 + 7 = 12. Since 12 has 2 digits, but each room can only hold 1 digit, the 2 stays in the Units room.",
      vi: "Trong phòng Đơn vị: 5 + 7 = 12. Số 12 có 2 chữ số, nhưng mỗi phòng chỉ được ở 1 chữ số. Vậy số 2 ở lại phòng Đơn vị."
    },
    voiceText: {
      en: "In the units room, we have 5 plus 7 equals 12. The 2 stays in the units room.",
      vi: "Trong phòng đơn vị, chúng ta có 5 cộng 7 bằng 12. Số 2 ở lại phòng đơn vị."
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    result: { hundreds: "", tens: "", units: 2 },
    highlightColumn: "units",
    carryValue: 1
  },
  {
    id: "step-4",
    title: {
      en: "Step 4: Send Gift to Neighbor",
      vi: "Bước 4: Gửi Quà Cho Hàng Xóm"
    },
    description: {
      en: "The 1 (1 ten) is sent as a gift to the Tens room",
      vi: "Số 1 (1 chục) được gửi sang phòng Chục"
    },
    explanation: {
      en: "The 1 (which represents 1 ten) will be 'sent as a gift' to the neighboring Tens room.",
      vi: "Số 1 (tức là 1 chục) sẽ được 'gửi làm quà' cho hàng xóm là phòng Chục."
    },
    voiceText: {
      en: "The 1 ten will run over as a gift to the tens room next door.",
      vi: "Số 1 chục sẽ chạy sang làm quà cho phòng chục bên cạnh."
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    result: { hundreds: "", tens: "", units: 2 },
    highlightColumn: "tens",
    carryValue: 1
  },
  {
    id: "step-5",
    title: {
      en: "Step 5: Calculate Tens Room",
      vi: "Bước 5: Tính Phòng Chục"
    },
    description: {
      en: "4 + 3 + 1 (gift) = 8",
      vi: "4 + 3 + 1 (quà) = 8"
    },
    explanation: {
      en: "The Tens room has: 4 + 3 + 1 (gift received) = 8. Since 8 has only 1 digit, it stays in the Tens room.",
      vi: "Phòng Chục có: 4 + 3 + 1 (quà được gửi) = 8. Số 8 chỉ có 1 chữ số nên được ở lại phòng Chục."
    },
    voiceText: {
      en: "Now the tens room has 4 plus 3 plus the 1 that was sent over, equals 8.",
      vi: "Bây giờ phòng chục có 4 cộng 3 cộng thêm 1 được gửi qua, bằng 8."
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    result: { hundreds: "", tens: 8, units: 2 },
    highlightColumn: "tens"
  },
  {
    id: "step-6",
    title: {
      en: "Step 6: Calculate Hundreds Room",
      vi: "Bước 6: Tính Phòng Trăm"
    },
    description: {
      en: "2 + 1 = 3",
      vi: "2 + 1 = 3"
    },
    explanation: {
      en: "Finally, the Hundreds room: 2 + 1 = 3.",
      vi: "Cuối cùng là phòng Trăm: 2 + 1 = 3."
    },
    voiceText: {
      en: "Finally, the hundreds room has 2 plus 1 equals 3.",
      vi: "Cuối cùng, phòng trăm có 2 cộng 1 bằng 3."
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    result: { hundreds: 3, tens: 8, units: 2 },
    highlightColumn: "hundreds"
  },
  {
    id: "step-7",
    title: {
      en: "Final Result",
      vi: "Kết Quả Cuối Cùng"
    },
    description: {
      en: "245 + 137 = 382",
      vi: "245 + 137 = 382"
    },
    explanation: {
      en: "So we have our final result in the number house: 382!",
      vi: "Vậy là chúng ta đã có kết quả cuối cùng trong ngôi nhà: 382!"
    },
    voiceText: {
      en: "So we have our final result: three hundred eighty-two!",
      vi: "Vậy là chúng ta đã có kết quả cuối cùng: ba trăm tám mươi hai!"
    },
    number1: { hundreds: 2, tens: 4, units: 5 },
    number2: { hundreds: 1, tens: 3, units: 7 },
    result: { hundreds: 3, tens: 8, units: 2 },
    highlightColumn: null
  }
];