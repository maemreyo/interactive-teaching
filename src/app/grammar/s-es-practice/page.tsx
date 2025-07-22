import React from 'react';
import Link from 'next/link';

const SESPracticePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Luyện Tập Thêm &apos;S&apos; và &apos;ES&apos;</h1>
      <p className="text-lg text-center mb-8">
        Chọn số lượng câu hỏi bạn muốn luyện tập:
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/grammar/s-es-practice/game?questions=10" className="btn btn-primary">
          10 Câu
        </Link>
        <Link href="/grammar/s-es-practice/game?questions=20" className="btn btn-primary">
          20 Câu
        </Link>
        <Link href="/grammar/s-es-practice/game?questions=30" className="btn btn-primary">
          30 Câu
        </Link>
      </div>
      <div className="mt-12 text-center">
        <Link href="/grammar/s-es-practice/history" className="text-blue-500 hover:underline">
          Xem Lịch Sử Luyện Tập
        </Link>
      </div>
    </div>
  );
};

export default SESPracticePage;
