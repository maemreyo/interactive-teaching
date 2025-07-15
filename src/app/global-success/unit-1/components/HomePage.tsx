"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SetPageProps } from "./types";

export const HomePage = ({ setPage }: SetPageProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800">
        Vocabulary Practice
      </h1>
      <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
        Choose an activity to start learning the vocabulary from Unit 1: My New
        School.
      </p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-6 mt-12"
    >
      <Card
        className="w-72 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        onClick={() => setPage("flashcards")}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Review words and definitions by flipping cards.</p>
        </CardContent>
      </Card>
      <Card
        className="w-72 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        onClick={() => setPage("game")}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">
            Matching Game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test your memory by matching words to their definitions.</p>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);