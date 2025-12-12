import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HelpCircle,
    ChevronDown,
    ChevronRight,
    Mic,
    Globe,
    Shield,
    Wifi,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';

interface TroubleshootingItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    problem: string;
    solutions: string[];
    severity: 'low' | 'medium' | 'high';
}

const TroubleshootingGuide: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const troubleshootingItems: TroubleshootingItem[] = [
        {
            id: 'speech-not-working',
            title: 'Speech Recognition Not Working',
            icon: <Mic size={20} className="text-red-500" />,
            problem: 'Voice input button doesn\'t respond or shows "Failed to start speech recognition"',
            solutions: [
                'Use Chrome or Edge browser (Firefox and Safari have limited support)',
                'Ensure you\'re on HTTPS (speech recognition requires secure connection)',
                'Click the microphone icon in your browser\'s address bar to allow permissions',
                'Check if your microphone is working in other applications',
                'Try refreshing the page and allowing permissions again',
                'Disable browser extensions that might block microphone access'
            ],
            severity: 'high'
        },
        {
            id: 'permission-denied',
            title: 'Microphone Permission Denied',
            icon: <Shield size={20} className="text-orange-500" />,
            problem: 'Browser shows "Microphone permission denied" error',
            solutions: [
                'Click the microphone icon in your browser\'s address bar',
                'Select "Always allow" for microphone access',
                'Go to browser Settings > Privacy > Microphone and add this site',
                'Clear browser data and try again',
                'Check if microphone is blocked by antivirus software',
                'Try using an incognito/private window'
            ],
            severity: 'high'
        },
        {
            id: 'japanese-not-recognized',
            title: 'Japanese Speech Not Recognized',
            icon: <Globe size={20} className="text-blue-500" />,
            problem: 'English works but Japanese speech is not detected',
            solutions: [
                'Speak clearly and at a moderate pace',
                'Ensure Japanese language is selected (🇯🇵 button should be highlighted)',
                'Try common Japanese phrases like "東京の天気" (Tokyo no tenki)',
                'Check if your browser supports Japanese speech recognition',
                'Try switching to English and back to Japanese',
                'Use Chrome browser for best Japanese support'
            ],
            severity: 'medium'
        },
        {
            id: 'network-issues',
            title: 'Network Connection Problems',
            icon: <Wifi size={20} className="text-purple-500" />,
            problem: 'Weather data not loading or AI suggestions unavailable',
            solutions: [
                'Check your internet connection',
                'Try refreshing the page',
                'Check if you\'re behind a firewall that blocks API requests',
                'Wait a moment and try again (APIs might be temporarily down)',
                'Try using a different network (mobile hotspot)',
                'Clear browser cache and cookies'
            ],
            severity: 'medium'
        },
        {
            id: 'browser-compatibility',
            title: 'Browser Compatibility Issues',
            icon: <AlertTriangle size={20} className="text-yellow-500" />,
            problem: 'Features not working properly in your browser',
            solutions: [
                'Use Google Chrome (recommended) or Microsoft Edge',
                'Update your browser to the latest version',
                'Enable JavaScript if disabled',
                'Disable ad blockers for this site',
                'Try using a different browser',
                'Check if your browser supports Web Speech API'
            ],
            severity: 'low'
        }
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'border-red-200 bg-red-50';
            case 'medium': return 'border-orange-200 bg-orange-50';
            case 'low': return 'border-yellow-200 bg-yellow-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'high': return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Critical</span>;
            case 'medium': return <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Important</span>;
            case 'low': return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Minor</span>;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
        >
            <div className="flex items-center space-x-2 mb-6">
                <HelpCircle size={24} className="text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Troubleshooting Guide</h2>
            </div>

            <div className="space-y-4">
                {troubleshootingItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`border rounded-lg ${getSeverityColor(item.severity)}`}
                    >
                        <button
                            onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                {item.icon}
                                <div>
                                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{item.problem}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {getSeverityBadge(item.severity)}
                                {expandedItem === item.id ? (
                                    <ChevronDown size={20} className="text-gray-400" />
                                ) : (
                                    <ChevronRight size={20} className="text-gray-400" />
                                )}
                            </div>
                        </button>

                        <AnimatePresence>
                            {expandedItem === item.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-gray-200"
                                >
                                    <div className="p-4 bg-white/50">
                                        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                            <CheckCircle size={16} className="text-green-500 mr-2" />
                                            Solutions:
                                        </h4>
                                        <ul className="space-y-2">
                                            {item.solutions.map((solution, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start space-x-2 text-sm text-gray-700"
                                                >
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{solution}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Quick Tips for Best Experience:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use Chrome browser for optimal performance</li>
                    <li>• Ensure stable internet connection</li>
                    <li>• Speak clearly and at moderate pace</li>
                    <li>• Allow microphone permissions when prompted</li>
                    <li>• Try both Japanese and English if one doesn't work</li>
                </ul>
            </div>

            {/* Contact Support */}
            <div className="mt-4 text-center text-sm text-gray-600">
                <p>Still having issues? The system status panel shows real-time service health.</p>
            </div>
        </motion.div>
    );
};

export default TroubleshootingGuide;