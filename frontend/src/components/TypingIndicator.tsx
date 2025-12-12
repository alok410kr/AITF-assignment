import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface TypingIndicatorProps {
    message?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
    message = "AI is thinking..."
}) => {
    const { theme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex justify-start"
        >
            <div className={`chat-bubble chat-bubble-bot max-w-md ${theme === 'dark' ? 'bg-gray-700/80' : 'bg-gray-100'
                }`}>
                <div className="flex items-center space-x-3">
                    {/* Animated AI Avatar */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0"
                    >
                        <span className="text-xs">🤖</span>
                    </motion.div>

                    <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                                }`}>
                                {message}
                            </span>
                        </div>

                        {/* Animated dots */}
                        <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TypingIndicator;