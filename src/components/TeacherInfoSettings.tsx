// src/components/TeacherInfoSettings.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Edit3 } from 'lucide-react';
import { TeacherInfo } from '../hooks/useNotes';

interface TeacherInfoSettingsProps {
  teacherInfo: TeacherInfo;
  onUpdate: (info: TeacherInfo) => void;
}

const TeacherInfoSettings: React.FC<TeacherInfoSettingsProps> = ({ 
  teacherInfo, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(!teacherInfo.name);
  const [tempInfo, setTempInfo] = useState(teacherInfo);

  const handleSave = () => {
    if (tempInfo.name.trim()) {
      onUpdate(tempInfo);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempInfo(teacherInfo);
    setIsEditing(false);
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return '👨‍🏫';
      case 'female':
        return '👩‍🏫';
      default:
        return '🧑‍🏫';
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return 'Khác';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Teacher Information</h4>
            <p className="text-sm text-gray-600">Your details for AI personalization</p>
          </div>
        </div>
        
        {!isEditing && teacherInfo.name && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit teacher info"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teacher Name
            </label>
            <input
              type="text"
              value={tempInfo.name}
              onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
              placeholder="Enter your name..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['female', 'male', 'other'] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setTempInfo({ ...tempInfo, gender })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tempInfo.gender === gender
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{getGenderIcon(gender)}</div>
                  <div className="text-sm font-medium">{getGenderLabel(gender)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={!tempInfo.name.trim()}
              className="flex-1 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg"
        >
          <div className="text-3xl">{getGenderIcon(teacherInfo.gender)}</div>
          <div>
            <div className="font-semibold text-gray-800">{teacherInfo.name}</div>
            <div className="text-sm text-gray-600">
              {getGenderLabel(teacherInfo.gender)} • Teacher
            </div>
          </div>
        </motion.div>
      )}

      {!teacherInfo.name && !isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add your teacher information
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeacherInfoSettings;