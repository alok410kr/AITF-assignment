import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Home, MessageSquare, X } from 'lucide-react'
import ChatInterface from './components/ChatInterface'
import LanguageToggle from './components/LanguageToggle'
import ErrorBoundary from './components/ErrorBoundary'
import TroubleshootingGuide from './components/TroubleshootingGuide'
import ThemeToggle from './components/ThemeToggle'
import LandingSection from './components/LandingSection'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { TranslationProvider, useTranslation } from './contexts/TranslationContext'

interface AppSettings {
  language: 'ja' | 'en';
  voiceEnabled: boolean;
  soundEnabled: boolean;
}

type ViewMode = 'landing' | 'chat';

function AppContent({ onLanguageChange }: { onLanguageChange: (lang: 'ja' | 'en') => void }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    voiceEnabled: true,
    soundEnabled: true,
  });
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('weatherChatbotSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weatherChatbotSettings', JSON.stringify(settings));
  }, [settings]);

  const handleLanguageChange = (language: 'ja' | 'en') => {
    setSettings(prev => ({ ...prev, language }));
    onLanguageChange(language);
  };

  const navigateToChat = () => {
    setCurrentView('chat');
    setSidebarOpen(false);
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
    setSidebarOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark'
        ? 'bg-[#0a0a0f]'
        : 'bg-[#f5f3f0]'
        }`}>
        
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed left-0 top-0 h-full w-64 z-50 transition-colors duration-300 ${theme === 'dark'
            ? 'bg-[#1a1a24] border-r border-[#2a2a35]'
            : 'bg-[#ffffff] border-r border-[#e5e3e0]'
            } shadow-2xl`}
        >
          <div className="flex flex-col h-full p-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark'
                  ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500'
                  }`}>
                  <span className="text-2xl">🌤️</span>
                </div>
                <div>
                  <h2 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    SkySense
                  </h2>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Weather AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                  ? 'hover:bg-[#2a2a35] text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
                  }`}
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 space-y-2">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={navigateToLanding}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentView === 'landing'
                    ? theme === 'dark'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-amber-100 text-amber-700 border border-amber-300'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:bg-[#2a2a35] hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={navigateToChat}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentView === 'chat'
                    ? theme === 'dark'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-amber-100 text-amber-700 border border-amber-300'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:bg-[#2a2a35] hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <MessageSquare size={20} />
                <span className="font-medium">Chat</span>
              </motion.button>
            </nav>

            {/* Sidebar Footer */}
            <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-[#2a2a35]">
              <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {settings.language === 'ja' ? 'アロク・クマール' : 'Alok Kumar'}
              </div>
              <div className="flex items-center justify-between">
                <LanguageToggle
                  currentLanguage={settings.language}
                  onLanguageChange={handleLanguageChange}
                />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="relative min-h-screen">
          {/* Top Bar */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`sticky top-0 z-40 px-6 py-4 transition-colors duration-300 ${theme === 'dark'
              ? 'bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#2a2a35]'
              : 'bg-[#f5f3f0]/80 backdrop-blur-md border-b border-[#e5e3e0]'
              }`}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                  ? 'hover:bg-[#1a1a24] text-gray-300'
                  : 'hover:bg-white text-gray-700'
                  }`}
                title="Toggle sidebar menu"
                aria-label="Toggle sidebar menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsHelpOpen(true)}
                  className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                    ? 'hover:bg-[#1a1a24] text-gray-400 hover:text-white'
                    : 'hover:bg-white text-gray-600 hover:text-gray-800'
                    }`}
                  title={t.help}
                >
                  <HelpCircle size={20} />
                </motion.button>
              </div>
            </div>
          </motion.header>

          {/* Content Views */}
          <AnimatePresence mode="wait">
            {currentView === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LandingSection
                  settings={settings}
                  onGetStarted={navigateToChat}
                />
              </motion.div>
            )}

            {currentView === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4"
              >
                <div className="w-full max-w-7xl">
                  <ChatInterface settings={settings} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Help Panel */}
        <AnimatePresence>
          {isHelpOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsHelpOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${theme === 'dark'
                  ? 'bg-[#1a1a24] border border-[#2a2a35]'
                  : 'bg-white border border-[#e5e3e0]'
                  } shadow-2xl`}
              >
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${theme === 'dark'
                    ? 'bg-[#2a2a35] hover:bg-[#3a3a45] text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  title="Close help"
                  aria-label="Close help"
                >
                  <X size={20} />
                </button>
                <div className="p-6">
                  <TroubleshootingGuide />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            aria-label="Close sidebar"
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

function App() {
  const [language, setLanguage] = useState<'ja' | 'en'>('en');

  return (
    <ThemeProvider>
      <TranslationProvider language={language}>
        <AppContentWrapper onLanguageChange={setLanguage} />
      </TranslationProvider>
    </ThemeProvider>
  );
}

function AppContentWrapper({ onLanguageChange }: { onLanguageChange: (lang: 'ja' | 'en') => void }) {
  return <AppContent onLanguageChange={onLanguageChange} />;
}

export default App