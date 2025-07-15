"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const units = [
    { id: 1, title: "Unit 1: My New School", description: "Vocabulary practice and games for Unit 1.", link: "/global-success/unit-1" },
    // Add more units here as you create them
    // { id: 2, title: "Unit 2: My Family", description: "Coming soon!", link: "#" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-4">
          Welcome to Interactive Learning
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
          Choose a unit to start your vocabulary learning journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {units.map((unit) => (
          <Link href={unit.link} key={unit.id} passHref>
            <Card
              className="w-80 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">{unit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{unit.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}