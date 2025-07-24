// src/app/global-success/unit-1/components/PathfinderFeedbackMessage.tsx
// CREATED: 2025-01-27 - Feedback message overlay for pathfinder

import React from 'react';

interface PathfinderFeedbackMessageProps {
  message: string;
}

export const PathfinderFeedbackMessage = ({ message }: PathfinderFeedbackMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-3xl font-bold p-4 rounded-lg z-30 animate-fade-in-out">
      {message}
    </div>
  );
};