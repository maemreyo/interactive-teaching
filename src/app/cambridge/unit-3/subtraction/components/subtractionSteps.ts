// src/app/cambridge/unit-3/subtraction/components/subtractionSteps.ts
import { MathStep } from "../../shared/types";

export const subtractionSteps: MathStep[] = [
  {
    id: "step-1",
    title: {
      en: "Step 1: Build the Number House",
      vi: "Bước 1: Xây Dựng Ngôi Nhà"
    },
    description: {
      en: "Create a house with 3 rooms for subtraction 472 - 267",
      vi: "Tạo ngôi nhà với 3 phòng cho phép trừ 472 - 267"
    },
    explanation: {
      en: "This is the number house for subtraction. We will place 472 on top and 267 below.",
      vi: "Đây là ngôi nhà của các con số cho phép trừ. Chúng ta sẽ xếp 472 ở trên và 267 ở dưới."
    },
    voiceText: {
      en: "We will build a number house to perform subtraction of four hundred seventy-two minus two hundred sixty-seven.",
      vi: "Chúng ta sẽ xây dựng ngôi nhà các con số để thực hiện phép trừ bốn trăm bảy mươi hai trừ hai trăm sáu mươi bảy."
    },
    number1: { hundreds: 4, tens: 7, units: 2 },
    number2: { hundreds: 2, tens: 6, units: 7 },
    highlightColumn: null
  },
  {
    id: "step-2",
    title: {
      en: "Step 2: Place Numbers in the House",
      vi: "Bước 2: Xếp Số Vào Nhà"
    },
    description: {
      en: "Place 472 and 267 in their proper rooms",
      vi: "Xếp số 472 và 267 vào đúng phòng"
    },
    explanation: {
      en: "Number 472: 4 in Hundreds room, 7 in Tens room, 2 in Units room. Number 267: 2 in Hundreds room, 6 in Tens room, 7 in Units room.",
      vi: "Số 472: 4 ở phòng Trăm, 7 ở phòng Chục, 2 ở phòng Đơn vị. Số 267: 2 ở phòng Trăm, 6 ở phòng Chục, 7 ở phòng Đơn vị."
    },
    voiceText: {
      en: "Now we place each number in its proper room in the house.",
      vi: "Bây giờ chúng ta xếp các số vào đúng phòng của chúng trong ngôi nhà."
    },
    number1: { hundreds: 4, tens: 7, units: 2 },
    number2: { hundreds: 2, tens: 6, units: 7 },
    highlightColumn: null
  },
  {
    id: "step-3",
    title: {
      en: "Step 3: Problem in Units Room",
      vi: "Bước 3: Vấn Đề Ở Phòng Đơn Vị"
    },
    description: {
      en: "2 - 7 = ? (2 is smaller than 7, can't subtract!)",
      vi: "2 - 7 = ? (2 nhỏ hơn 7, không trừ được!)"
    },
    explanation: {
      en: "In the Units room: 2 - 7. Oh no, 2 is smaller than 7, we can't subtract. What should we do?",
      vi: "Trong phòng Đơn vị: 2 - 7. Ôi, 2 nhỏ hơn 7, không trừ được rồi. Phải làm sao đây?"
    },
    voiceText: {
      en: "In the units room, we have 2 minus 7. But 2 is smaller than 7, we can't subtract.",
      vi: "Trong phòng đơn vị, chúng ta có 2 trừ 7. Nhưng 2 nhỏ hơn 7, không trừ được."
    },
    number1: { hundreds: 4, tens: 7, units: 2 },
    number2: { hundreds: 2, tens: 6, units: 7 },
    highlightColumn: "units"
  },
  {
    id: "step-4",
    title: {
      en: "Step 4: Borrow from Neighbor",
      vi: "Bước 4: Đi Mượn Hàng Xóm"
    },
    description: {
      en: "The 2 goes to borrow 1 ten from the Tens room",
      vi: "Số 2 chạy sang mượn 1 chục từ phòng Chục"
    },
    explanation: {
      en: "The 2 will go to the Tens room to 'borrow' 1 ten from the 7. The 7 is very kind and lends 1 ten, so only 6 remains.",
      vi: "Số 2 sẽ chạy sang phòng Chục để 'mượn' 1 chục của số 7. Số 7 rất tốt bụng, cho mượn 1 chục nên chỉ còn lại 6."
    },
    voiceText: {
      en: "Don't worry, the 2 will go to the tens room next door to borrow 1 ten.",
      vi: "Đừng lo, số 2 sẽ chạy sang phòng chục bên cạnh để mượn 1 chục."
    },
    number1: { hundreds: 4, tens: "6", units: "12" },
    number2: { hundreds: 2, tens: 6, units: 7 },
    highlightColumn: "tens",
    borrowValue: 1
  },
  {
    id: "step-5",
    title: {
      en: "Step 5: Transform Borrowed Number",
      vi: "Bước 5: Biến Đổi Số Mượn"
    },
    description: {
      en: "1 ten = 10 units, so 2 + 10 = 12",
      vi: "1 chục = 10 đơn vị, nên 2 + 10 = 12"
    },
    explanation: {
      en: "The 1 ten borrowed runs back to the Units room and transforms into 10 units. So now the Units room has 10 + 2 = 12.",
      vi: "1 chục mượn được chạy về phòng Đơn vị, nó sẽ biến thành 10 đơn vị. Vậy bây giờ phòng Đơn vị có 10 + 2 = 12."
    },
    voiceText: {
      en: "The 1 ten borrowed will transform into 10 units. So now the units room has 10 plus 2 equals 12.",
      vi: "Một chục mượn được sẽ biến thành 10 đơn vị. Vậy bây giờ phòng đơn vị có 10 cộng 2 bằng 12."
    },
    number1: { hundreds: 4, tens: "6", units: "12" },
    number2: { hundreds: 2, tens: 6, units: 7 },
    highlightColumn: "units"
  },
  {
    id: "step-6",
    title: {
      en: "Step 6: Perform Units Subtraction",
      vi: "Bước 6: Thực Hiện Phép Trừ Đơn Vị"
    },
    description: {
      en: "12 - 7 = 5",
      vi: "12 - 7 = 5"
    },
    explanation: {
      en: "Now we calculate 12 - 7 = 5. Excellent!",
      vi: "Bây giờ mình lấy 12 - 7 = 5. Tuyệt vời!"
    },
    voiceText: {
      en: "Now we calculate 12 minus 7 equals 5.",
      vi: "Bây giờ chúng ta lấy 12 trừ 7 bằng 5."
    },
    number1: { hundreds: 4, tens: "6", units: "12" },
    number2: { hundreds: 2, tens: 6, units: 7 },
    result: { hundreds: "", tens: "", units: 5 },
    highlightColumn: "units"
  },
  {
    id: "step-7",
    title: {
      en: "Step 7: Calculate Tens Room",
      vi: "Bước 7: Tính Phòng Chục"
    },
    description: {
      en: "6 - 6 = 0",
      vi: "6 - 6 = 0"
    },
    explanation: {
      en: "Next, the Tens room has 6 - 6 = 0.",
      vi: "Tiếp theo, phòng Chục còn lại 6 - 6 = 0."
    },
    voiceText: {
      en: "Next, the tens room has 6 minus 6 equals 0.",
      vi: "Tiếp theo, phòng chục có 6 trừ 6 bằng 0."
    },
    number1: { hundreds: 4, tens: "6", units: "12" },
    number2: { hundreds: 2, tens: 6, units: 7 },
    result: { hundreds: "", tens: 0, units: 5 },
    highlightColumn: "tens"
  },
  {
    id: "step-8",
    title: {
      en: "Step 8: Calculate Hundreds Room",
      vi: "Bước 8: Tính Phòng Trăm"
    },
    description: {
      en: "4 - 2 = 2",
      vi: "4 - 2 = 2"
    },
    explanation: {
      en: "Finally, the Hundreds room: 4 - 2 = 2.",
      vi: "Cuối cùng, phòng Trăm: 4 - 2 = 2."
    },
    voiceText: {
      en: "Finally, the hundreds room has 4 minus 2 equals 2.",
      vi: "Cuối cùng, phòng trăm có 4 trừ 2 bằng 2."
    },
    number1: { hundreds: 4, tens: "6", units: "12" },
    number2: { hundreds: 2, tens: 6, units: 7 },
    result: { hundreds: 2, tens: 0, units: 5 },
    highlightColumn: "hundreds"
  },
  {
    id: "step-9",
    title: {
      en: "Final Result",
      vi: "Kết Quả Cuối Cùng"
    },
    description: {
      en: "472 - 267 = 205",
      vi: "472 - 267 = 205"
    },
    explanation: {
      en: "So our subtraction result is 205!",
      vi: "Vậy là phép trừ của chúng ta có kết quả là 205!"
    },
    voiceText: {
      en: "So our subtraction result is two hundred and five!",
      vi: "Vậy là phép trừ của chúng ta có kết quả là hai trăm lẻ năm!"
    },
    number1: { hundreds: 4, tens: "6", units: "12" },
    number2: { hundreds: 2, tens: 6, units: 7 },
    result: { hundreds: 2, tens: 0, units: 5 },
    highlightColumn: null
  }
];