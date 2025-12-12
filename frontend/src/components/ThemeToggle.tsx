import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg transition-colors ${
                theme === 'dark'
                    ? 'bg-[#2a2a35] hover:bg-[#3a3a45] text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
            }`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="relative w-5 h-5">
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === 'light' ? 1 : 0,
                        rotate: theme === 'light' ? 0 : 180,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Sun size={20} />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === 'dark' ? 1 : 0,
                        rotate: theme === 'dark' ? 0 : -180,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Moon size={20} />
                </motion.div>
            </div>
        </motion.button>
    );
};

export default ThemeToggle;