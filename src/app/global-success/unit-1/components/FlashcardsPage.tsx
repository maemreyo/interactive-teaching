"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Flashcard } from "./Flashcard";
import { vocabularyData } from "./VocabularyData";
import { SetPageProps } from "./types";

export const FlashcardsPage = ({ setPage }: SetPageProps) => (
  <div className="container mx-auto px-4 py-8">
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
        Unit 1 Vocabulary
      </h1>
      <p className="text-lg text-gray-500 mt-2">
        Click on a card to flip it and see the definition.
      </p>
    </header>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {vocabularyData.map((card, index) => (
        <div key={index} className="h-48">
          <Flashcard card={card} />
        </div>
      ))}
    </div>
    <div className="mt-12 text-center">
      <Button onClick={() => setPage("home")} variant="outline">
        Back to Home
      </Button>
    </div>
  </div>
);