import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Cloud, Zap } from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/TranslationContext';

interface LandingSectionProps {
    settings: {
        language: 'ja' | 'en';
        voiceEnabled: boolean;
        soundEnabled: boolean;
    };
    onGetStarted?: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ settings, onGetStarted }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const handleGetStarted = () => {
        if (onGetStarted) {
            onGetStarted();
        } else {
            const chatSection = document.getElementById('chat-section');
            chatSection?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 pt-24 sm:pt-28">
            {/* Geometric Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-20 left-10 w-96 h-96 ${theme === 'dark' ? 'bg-amber-500/5' : 'bg-amber-500/10'} rounded-full blur-3xl`} />
                <div className={`absolute bottom-20 right-10 w-96 h-96 ${theme === 'dark' ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`} />
                
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.2)'} 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto text-center relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="mb-16"
                >
                    {/* Icon Container */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-32 h-32 mx-auto mb-10"
                    >
                        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-amber-400 to-orange-500'} rounded-3xl shadow-2xl transform rotate-6`} />
                        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#1a1a24]' : 'bg-white'} rounded-3xl flex items-center justify-center shadow-xl`}>
                            <span className="text-6xl">🌤️</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight ${theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                            }`}
                    >
                        {t.landingTitle.split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="inline-block mr-3"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className={`text-xl sm:text-2xl md:text-3xl mb-12 px-4 font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}
                    >
                        {t.landingSubtitle}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        onClick={handleGetStarted}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl overflow-hidden shadow-2xl ${theme === 'dark'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                            : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                            }`}
                    >
                        <motion.div
                            animate={{
                                x: ['-200%', '200%'],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />
                        <span className="relative z-10 flex items-center space-x-3">
                            <span>{t.getStarted}</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                        </span>
                    </motion.button>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {[
                        { icon: Sparkles, text: t.voiceInputSupport, enabled: settings.voiceEnabled, color: 'amber' },
                        { icon: Cloud, text: t.realTimeWeather, enabled: true, color: 'teal' },
                        { icon: Zap, text: t.aiRecommendationEngine, enabled: true, color: 'orange' },
                        { icon: Sparkles, text: t.multiLanguageSupport, enabled: true, color: 'amber' }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`group relative p-6 rounded-2xl transition-all duration-300 ${theme === 'dark'
                                ? 'bg-[#1a1a24] border-2 border-[#2a2a35] hover:border-amber-500/50'
                                : 'bg-white border-2 border-[#e5e3e0] hover:border-amber-400'
                                } ${feature.enabled ? 'opacity-100' : 'opacity-60'}`}
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${theme === 'dark'
                                ? `bg-${feature.color}-500/20`
                                : `bg-${feature.color}-100`
                                }`}>
                                <feature.icon 
                                    size={32} 
                                    className={theme === 'dark' 
                                        ? `text-${feature.color}-400`
                                        : `text-${feature.color}-600`
                                    } 
                                />
                            </div>
                            <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                {feature.text}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Start Guide */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className={`max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl ${theme === 'dark'
                        ? 'bg-[#1a1a24] border-2 border-[#2a2a35]'
                        : 'bg-white border-2 border-[#e5e3e0]'
                        } shadow-xl`}
                >
                    <h3 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.quickStart}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        {[
                            { text: t.quickStartTips.microphone, icon: '🎤' },
                            { text: t.quickStartTips.askWeather, icon: '❓' },
                            { text: t.quickStartTips.aiRecommendations, icon: '🤖' },
                            { text: t.quickStartTips.switchLanguage, icon: '🌐' }
                        ].map((tip, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
                                whileHover={{ x: 5 }}
                                className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${theme === 'dark'
                                    ? 'hover:bg-[#2a2a35]'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <span className="text-3xl flex-shrink-0">{tip.icon}</span>
                                <span className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    {tip.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingSection;
