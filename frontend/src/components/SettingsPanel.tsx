import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    X,
    Volume2,
    Mic,
    Globe,
    Info
} from 'lucide-react';
// Removed unused useTheme import

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        language: 'ja' | 'en';
        voiceEnabled: boolean;
        soundEnabled: boolean;
    };
    onSettingsChange: (settings: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    isOpen,
    onClose,
    settings,
    onSettingsChange
}) => {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleSettingChange = (key: string, value: any) => {
        const newSettings = { ...localSettings, [key]: value };
        setLocalSettings(newSettings);
        onSettingsChange(newSettings);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Settings Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Settings size={24} />
                                    <h2 className="text-xl font-semibold">Settings</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Close settings panel"
                                    title="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Settings Content */}
                        <div className="p-6 space-y-6">
                            {/* Language Settings */}
                            <div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <Globe size={20} className="text-gray-600" />
                                    <h3 className="font-semibold text-gray-800">Language</h3>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="language"
                                            value="ja"
                                            checked={localSettings.language === 'ja'}
                                            onChange={(e) => handleSettingChange('language', e.target.value)}
                                            className="text-blue-500"
                                        />
                                        <span className="flex items-center space-x-2">
                                            <span>🇯🇵</span>
                                            <span>日本語 (Japanese)</span>
                                        </span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="language"
                                            value="en"
                                            checked={localSettings.language === 'en'}
                                            onChange={(e) => handleSettingChange('language', e.target.value)}
                                            className="text-blue-500"
                                        />
                                        <span className="flex items-center space-x-2">
                                            <span>🇺🇸</span>
                                            <span>English</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Voice Settings */}
                            <div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <Mic size={20} className="text-gray-600" />
                                    <h3 className="font-semibold text-gray-800">Voice Input</h3>
                                </div>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-gray-700">Enable voice recognition</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={localSettings.voiceEnabled}
                                            onChange={(e) => handleSettingChange('voiceEnabled', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-12 h-6 rounded-full transition-colors ${localSettings.voiceEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${localSettings.voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                                    } mt-0.5`}
                                            />
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Sound Settings */}
                            <div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <Volume2 size={20} className="text-gray-600" />
                                    <h3 className="font-semibold text-gray-800">Sound</h3>
                                </div>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-gray-700">Enable sound effects</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={localSettings.soundEnabled}
                                            onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-12 h-6 rounded-full transition-colors ${localSettings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${localSettings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                                    } mt-0.5`}
                                            />
                                        </div>
                                    </div>
                                </label>
                            </div>



                            {/* About Section */}
                            <div className="border-t pt-6">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Info size={20} className="text-gray-600" />
                                    <h3 className="font-semibold text-gray-800">About</h3>
                                </div>
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p>ATF Weather ChatBot v1.0</p>
                                    <p>Created by Alok Kumar </p>
                                    <p>Powered by AI and real-time weather data</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SettingsPanel;