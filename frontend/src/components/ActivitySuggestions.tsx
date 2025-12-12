import React from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb
} from 'lucide-react';
import { ActivitySuggestion } from '../types';
import { useTranslation } from '../contexts/TranslationContext';
import { useTheme } from '../contexts/ThemeContext';

interface ActivitySuggestionsProps {
  suggestions: ActivitySuggestion[];
  explanation?: string;
  additionalTips?: string[];
  className?: string;
}

const ActivitySuggestions: React.FC<ActivitySuggestionsProps> = ({
  suggestions,
  explanation,
  additionalTips = [],
  className = ''
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Removed unused getCategoryIcon function

  const getCategoryColor = (category: string) => {
    const isDark = theme === 'dark';
    switch (category) {
      case 'travel':
        return isDark 
          ? 'bg-[#1a1a24] border-2 border-purple-700/50'
          : 'bg-white border-2 border-purple-200';
      case 'outdoor':
        return isDark
          ? 'bg-[#1a1a24] border-2 border-teal-700/50'
          : 'bg-white border-2 border-teal-200';
      case 'indoor':
        return isDark
          ? 'bg-[#1a1a24] border-2 border-cyan-700/50'
          : 'bg-white border-2 border-cyan-200';
      case 'clothing':
        return isDark
          ? 'bg-[#1a1a24] border-2 border-amber-700/50'
          : 'bg-white border-2 border-amber-200';
      case 'food':
        return isDark
          ? 'bg-[#1a1a24] border-2 border-orange-700/50'
          : 'bg-white border-2 border-orange-200';
      default:
        return isDark
          ? 'bg-[#1a1a24] border-2 border-[#2a2a35]'
          : 'bg-white border-2 border-[#e5e3e0]';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'travel':
        return 'from-purple-500 to-purple-600';
      case 'outdoor':
        return 'from-green-500 to-green-600';
      case 'indoor':
        return 'from-blue-500 to-blue-600';
      case 'clothing':
        return 'from-pink-500 to-pink-600';
      case 'food':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority >= 4) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {t.priority.high}
        </span>
      );
    } else if (priority >= 3) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {t.priority.medium}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {t.priority.low}
        </span>
      );
    }
  };

  // Sort suggestions by priority (highest first)
  const sortedSuggestions = [...suggestions].sort((a, b) => b.priority - a.priority);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Explanation */}
      {explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-6 shadow-xl relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-[#1a1a24] border-2 border-teal-700/50'
              : 'bg-white border-2 border-teal-200'
          }`}
        >
          <div className="flex items-start space-x-4 relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <Lightbulb size={28} className={theme === 'dark' ? 'text-teal-400' : 'text-teal-600'} />
            </motion.div>
            <p className={`text-base font-medium leading-relaxed ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>{explanation}</p>
          </div>
        </motion.div>
      )}

    
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedSuggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getCategoryGradient(suggestion.category)} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

              {/* Card Content */}
              <div className={`relative ${getCategoryColor(suggestion.category)} p-5 h-full transition-all duration-300 hover:shadow-xl rounded-2xl`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-3xl flex-shrink-0"
                    >
                      {suggestion.icon}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm capitalize font-medium dark:text-gray-400 opacity-80">
                        {suggestion.category}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getPriorityBadge(suggestion.priority)}
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-sm mb-4 leading-relaxed dark:text-gray-200 font-medium">
                  {suggestion.description}
                </p>

                {/* Reasoning */}
                <div className={`rounded-xl p-4 ${
                  theme === 'dark'
                    ? 'bg-[#2a2a35] border border-[#2a2a35]'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className={`font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>{t.whyThisSuggestion} </span>
                    {suggestion.reasoning}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tips */}
        {additionalTips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.01 }}
            className={`rounded-2xl p-6 shadow-xl relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#1a1a24] border-2 border-[#2a2a35]'
                : 'bg-white border-2 border-[#e5e3e0]'
            }`}
          >
            <h4 className={`font-bold mb-5 text-lg flex items-center relative z-10 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <span className="text-2xl mr-2">💡</span>
              {t.additionalTips}
            </h4>
            <ul className="space-y-3 relative z-10">
              {additionalTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className={`text-sm flex items-start leading-relaxed font-medium p-3 rounded-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-[#2a2a35]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={`mr-3 mt-0.5 text-xl font-bold ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`}>•</span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActivitySuggestions;