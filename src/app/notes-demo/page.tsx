// src/app/notes-demo/page.tsx
'use client';

import React from 'react';
import NotesFloatingButton from '../../components/NotesFloatingButton';

export default function NotesDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          📝 Notes Tool Demo
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Features:</h2>
          <ul className="space-y-3 text-lg text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Write and manage teaching notes for each lesson
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Add vocabulary with meanings and examples
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Data is saved automatically in browser storage
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Export notes as JSON file
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Edit and delete notes/vocabulary
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">How to use:</h2>
          <ol className="space-y-3 text-lg text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              Click the floating blue button in the bottom-right corner
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              Switch between &quot;Notes&quot; and &quot;Vocabulary&quot; tabs
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              Add your teaching notes or new vocabulary
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
              Edit or delete items as needed
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
              Export your data or clear all if needed
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-lg">
            👆 Try the floating button now! This demo uses unit ID: &quot;demo-unit&quot;
          </p>
        </div>
      </div>

      {/* Notes Tool */}
      <NotesFloatingButton unitId="demo-unit" />
    </div>
  );
}