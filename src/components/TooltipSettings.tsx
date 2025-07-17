// src/components/TooltipSettings.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Settings } from 'lucide-react';

interface TooltipSettingsProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  vocabularyCount: number;
}

const TooltipSettings: React.FC<TooltipSettingsProps> = ({ 
  isEnabled, 
  onToggle, 
  vocabularyCount 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Vocabulary Tooltips</h4>
            <p className="text-sm text-gray-600">
              Random vocabulary reminders ({vocabularyCount} words available)
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={() => onToggle(!isEnabled)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            isEnabled ? 'bg-indigo-500' : 'bg-gray-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
            animate={{
              x: isEnabled ? 24 : 2,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {isEnabled ? (
              <Eye className="w-3 h-3 text-indigo-600" />
            ) : (
              <EyeOff className="w-3 h-3 text-gray-400" />
            )}
          </motion.div>
        </motion.button>
      </div>
      
      {isEnabled && vocabularyCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-indigo-200"
        >
          <div className="flex items-center space-x-2 text-sm text-indigo-700">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span>Tooltips will appear every 15-30 seconds</span>
          </div>
        </motion.div>
      )}
      
      {isEnabled && vocabularyCount === 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-indigo-200"
        >
          <p className="text-sm text-amber-600">
            Add some vocabulary words to enable tooltips
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TooltipSettings;