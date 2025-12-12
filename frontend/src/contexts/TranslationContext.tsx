import React, { createContext, useContext, ReactNode } from 'react';
import { translations, Translations } from '../translations';

interface TranslationContextType {
    t: Translations;
    language: 'en' | 'ja';
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
    children: ReactNode;
    language: 'en' | 'ja';
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
    children,
    language
}) => {
    const t = translations[language];

    return (
        <TranslationContext.Provider value={{ t, language }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};