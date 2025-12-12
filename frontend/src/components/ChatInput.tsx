import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTranslation } from '../contexts/TranslationContext';
import { useTheme } from '../contexts/ThemeContext';

interface ChatInputProps {
    onMessage: (message: string, language: 'ja' | 'en') => void;
    disabled?: boolean;
    currentLanguage?: 'ja' | 'en';
}

const ChatInput: React.FC<ChatInputProps> = ({
    onMessage,
    disabled = false,
    currentLanguage = 'en'
}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [textInput, setTextInput] = useState('');
    const textInputRef = useRef<HTMLInputElement>(null);

    // Speech recognition setup
    const {
        isListening,
        isSupported: speechSupported,
        transcript,
        error: speechError,
        startListening,
        stopListening,
        resetTranscript
    } = useSpeechRecognition({
        language: currentLanguage === 'ja' ? 'ja-JP' : 'en-US',
        continuous: false,
        interimResults: true,
        onResult: (result) => {
            if (result.isFinal && result.transcript.trim()) {
                handleSendMessage(result.transcript.trim());
                resetTranscript();
            }
        },
        onError: (error) => {
            console.error('Speech recognition error:', error);
        }
    });

    // Detect language from text input
    const detectLanguage = (text: string): 'ja' | 'en' => {
        // Simple Japanese detection - check for hiragana, katakana, or kanji
        const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
        return japaneseRegex.test(text) ? 'ja' : 'en';
    };

    const handleSendMessage = (message: string) => {
        if (!message.trim() || disabled) return;

        const language = detectLanguage(message);
        onMessage(message.trim(), language);
        setTextInput('');
        resetTranscript();
    };

    const micStatusChip = () => {
        if (!speechSupported) {
            return (
                <span className="status-chip warn">
                    {t.error}: {t.startVoiceInput} not supported in this browser. Try Chrome/Edge on desktop.
                </span>
            );
        }

        if (speechError) {
            const lower = speechError.toLowerCase();
            const helpful = lower.includes('network')
                ? 'Mic blocked or speech service unavailable. Allow mic in the browser (lock icon) or try Chrome/Edge.'
                : speechError;

            return (
                <span className="status-chip danger">
                    {helpful}
                </span>
            );
        }

        if (isListening) {
            return (
                <span className="status-chip info">
                    {t.listening}
                </span>
            );
        }

        return (
            <span className="status-chip info">
                {t.startVoiceInput}
            </span>
        );
    };

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(textInput);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(textInput);
        }
    };

    // Removed unused toggleInputMode function

    const handleVoiceToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="p-6">
            {/* Input Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 150 }}
                onSubmit={handleTextSubmit}
                className="flex items-center space-x-3"
            >
                <div className="flex-1 relative">
                    <input
                        ref={textInputRef}
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.typeMessage}
                        disabled={disabled}
                        className={`w-full px-5 py-4 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg focus:shadow-xl ${
                            theme === 'dark'
                                ? 'bg-[#2a2a35] border-2 border-[#2a2a35] text-gray-200 placeholder-gray-500 focus:bg-[#2a2a35]'
                                : 'bg-white border-2 border-[#e5e3e0] text-gray-900 placeholder-gray-400 focus:bg-white'
                        }`}
                    />
                </div>

                {/* Voice Button */}
                <motion.button
                    type="button"
                    onClick={handleVoiceToggle}
                    disabled={disabled || !speechSupported}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                    transition={isListening ? { duration: 1, repeat: Infinity } : {}}
                    className={`p-4 rounded-xl transition-all duration-300 shadow-lg ${
                        isListening
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/50'
                            : theme === 'dark'
                            ? 'bg-[#2a2a35] text-gray-300 hover:bg-[#3a3a45] border-2 border-[#2a2a35]'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-[#e5e3e0]'
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
                    title={isListening ? t.stopListening : t.startVoiceInput}
                >
                    {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                </motion.button>

                {/* Send Button */}
                <motion.button
                    type="submit"
                    disabled={disabled || !textInput.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-amber-500/50 disabled:shadow-none"
                    title={t.sendMessage}
                >
                    <Send size={22} />
                </motion.button>
            </motion.form>

            {/* Voice Status */}
            {isListening && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mt-4"
                >
                    <div className={`flex items-center justify-center space-x-3 rounded-xl p-4 ${
                        theme === 'dark'
                            ? 'bg-red-900/30 border border-red-700/50'
                            : 'bg-red-50 border border-red-200'
                    }`}>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                        />
                        <span className={`text-base font-bold ${
                            theme === 'dark' ? 'text-red-300' : 'text-red-700'
                        }`}>
                            {t.listening}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Mic helper chip */}
            <div className="mt-3 flex flex-wrap gap-2">
                {micStatusChip()}
            </div>

            {/* Live Transcript */}
            {transcript && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`mt-4 rounded-xl p-4 shadow-lg ${
                        theme === 'dark'
                            ? 'bg-teal-900/30 border-2 border-teal-700/50'
                            : 'bg-teal-50 border-2 border-teal-300'
                    }`}
                >
                    <p className={`text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-teal-100' : 'text-teal-900'
                    }`}>
                        <span className={`font-bold ${
                            theme === 'dark' ? 'text-teal-300' : 'text-teal-700'
                        }`}>{t.transcript} </span>
                        <span className="font-medium">{transcript}</span>
                    </p>
                </motion.div>
            )}

            {/* Speech Error */}
            {speechError && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`mt-4 rounded-xl p-4 shadow-lg ${
                        theme === 'dark'
                            ? 'bg-red-900/30 border-2 border-red-700/50'
                            : 'bg-red-50 border-2 border-red-300'
                    }`}
                >
                    <p className={`text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-red-100' : 'text-red-900'
                    }`}>
                        <span className={`font-bold ${
                            theme === 'dark' ? 'text-red-300' : 'text-red-700'
                        }`}>{t.error} </span>
                        <span className="font-medium">{speechError}</span>
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ChatInput;