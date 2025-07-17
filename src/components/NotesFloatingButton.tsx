// src/components/NotesFloatingButton.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StickyNote } from 'lucide-react';
import NotesTool from './NotesTool';
import VocabularyTooltip from './VocabularyTooltip';
import { useNotes } from '../hooks/useNotes';

interface NotesFloatingButtonProps {
  unitId: string;
}

const NotesFloatingButton: React.FC<NotesFloatingButtonProps> = ({ unitId }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { vocabulary, tooltipsEnabled } = useNotes(unitId);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsNotesOpen(true)}
        className="fixed bottom-25 right-6 z-60 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        title="Open Teaching Notes"
      >
        <StickyNote className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Teaching Notes
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </motion.button>

      {/* Vocabulary Tooltips */}
      <VocabularyTooltip
        vocabulary={vocabulary}
        isEnabled={tooltipsEnabled && !isNotesOpen}
      />

      {/* Notes Tool Modal */}
      <NotesTool
        unitId={unitId}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </>
  );
};

export default NotesFloatingButton;