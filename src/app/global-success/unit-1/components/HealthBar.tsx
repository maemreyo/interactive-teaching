// src/app/global-success/unit-1/components/HealthBar.tsx
// CREATED: 2025-01-27 - Health bar component for boss battle game

import React from 'react';

interface HealthBarProps {
  health: number;
  maxHealth: number;
  label: string;
  colorClass: string;
}

export const HealthBar = ({ health, maxHealth, label, colorClass }: HealthBarProps) => {
  const percentage = (health / maxHealth) * 100;
  
  return (
    <div className="w-full">
      <p className="text-lg font-bold text-white mb-1">{label}</p>
      <div className="w-full bg-gray-700 rounded-full h-8 border-2 border-gray-500">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
      <p className="text-center font-mono text-xl mt-1">{health} / {maxHealth}</p>
    </div>
  );
};