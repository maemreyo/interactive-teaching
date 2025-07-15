"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VocabularyCard } from "./VocabularyData";

interface FlashcardProps {
  card: VocabularyCard;
}

export const Flashcard = ({ card }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="w-full h-full cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="w-full h-full flex flex-col items-center justify-center bg-white">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center text-gray-800">
                {card.word}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Card className="w-full h-full flex flex-col justify-center bg-blue-100">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl text-blue-900">
                {card.word}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-md text-blue-800">
                {card.definition}
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};