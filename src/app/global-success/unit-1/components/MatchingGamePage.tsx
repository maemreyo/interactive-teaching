"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { vocabularyData } from "./VocabularyData";
import { SetPageProps, GameCard } from "./types";

const shuffleArray = (array: GameCard[]): GameCard[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const MatchingGamePage = ({ setPage }: SetPageProps) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selection, setSelection] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const initializeGame = () => {
    const gameCards: GameCard[] = vocabularyData.flatMap((item, index) => [
      { id: index, type: "word", content: item.word, isFlipped: false },
      {
        id: index, // Use the same ID for word and definition to link them
        type: "definition",
        content: item.definition,
        isFlipped: false,
      },
    ]);
    setCards(shuffleArray(gameCards));
    setSelection([]);
    setMatched([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (selection.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = selection;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatched((prev) => [...prev, cards[firstIndex].id]);
        setSelection([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) => {
              if (index === firstIndex || index === secondIndex) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
          setSelection([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [selection, cards]);

  const handleCardClick = (clickedIndex: number) => {
    if (
      isProcessing ||
      selection.includes(clickedIndex) ||
      matched.includes(cards[clickedIndex].id)
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card, index) =>
        index === clickedIndex ? { ...card, isFlipped: true } : card
      )
    );
    setSelection((prev) => [...prev, clickedIndex]);
  };

  const allMatched = matched.length === vocabularyData.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Matching Game
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Find the matching pairs of words and definitions.
        </p>
      </header>

      <AnimatePresence>
        {allMatched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-green-100 rounded-lg mb-8"
          >
            <h2 className="text-3xl font-bold text-green-800">
              Congratulations!
            </h2>
            <p className="text-green-600 mt-2">You&apos;ve matched all the words!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card, index) => {
          const isFlipped = card.isFlipped;
          const isMatched = matched.includes(card.id);
          return (
            <motion.div
              key={index}
              className="h-40 md:h-48 cursor-pointer"
              onClick={() => handleCardClick(index)}
              animate={{
                opacity: isMatched ? 0.2 : 1,
                scale: isMatched ? 0.95 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={cn(
                  "w-full h-full flex items-center justify-center p-2 text-center transition-colors duration-300",
                  isFlipped || isMatched
                    ? "bg-yellow-100"
                    : "bg-white hover:bg-gray-100",
                  card.type === "definition" && (isFlipped || isMatched)
                    ? "bg-cyan-100"
                    : ""
                )}
              >
                <span
                  className={cn(
                    "text-xs md:text-sm font-medium text-gray-800 transition-opacity duration-300",
                    isFlipped || isMatched ? "opacity-100" : "opacity-0"
                  )}
                >
                  {card.content}
                </span>
                {!isFlipped && !isMatched && (
                  <div className="absolute text-4xl text-gray-300">?</div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-12 text-center space-x-4">
        <Button onClick={() => setPage("home")} variant="outline">
          Back to Home
        </Button>
        <Button onClick={initializeGame}>Reset Game</Button>
      </div>
    </div>
  );
};
