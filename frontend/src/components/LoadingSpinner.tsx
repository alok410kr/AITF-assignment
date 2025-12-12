import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Cloud, Sun, Wind } from 'lucide-react';

interface LoadingSpinnerProps {
    type?: 'default' | 'weather' | 'ai';
    message?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    type = 'default',
    message,
    className = ''
}) => {
    const getLoadingContent = () => {
        switch (type) {
            case 'weather':
                return {
                    icon: <Cloud size={24} className="text-blue-500" />,
                    defaultMessage: 'Fetching weather data...',
                    bgColor: 'bg-blue-50 border-blue-200'
                };
            case 'ai':
                return {
                    icon: <Sun size={24} className="text-purple-500" />,
                    defaultMessage: 'Generating AI suggestions...',
                    bgColor: 'bg-purple-50 border-purple-200'
                };
            default:
                return {
                    icon: <Loader2 size={24} className="text-gray-500 animate-spin" />,
                    defaultMessage: 'Loading...',
                    bgColor: 'bg-gray-50 border-gray-200'
                };
        }
    };

    const { icon, defaultMessage, bgColor } = getLoadingContent();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex items-center justify-center p-6 rounded-lg border ${bgColor} ${className}`}
        >
            <div className="flex items-center space-x-3">
                {/* Animated Icons for Weather */}
                {type === 'weather' && (
                    <div className="flex space-x-1">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        >
                            <Cloud size={20} className="text-blue-400" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        >
                            <Sun size={20} className="text-yellow-400" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        >
                            <Wind size={20} className="text-gray-400" />
                        </motion.div>
                    </div>
                )}

                {/* Pulsing AI Icon */}
                {type === 'ai' && (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                    >
                        <span className="text-white text-sm">🧠</span>
                    </motion.div>
                )}

                {/* Default Spinner */}
                {type === 'default' && icon}

                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                        {message || defaultMessage}
                    </p>
                    <div className="flex justify-center mt-2">
                        <div className="flex space-x-1">
                            <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingSpinner;