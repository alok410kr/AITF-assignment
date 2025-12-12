export type Language = 'en' | 'ja';

export interface Translations {
  navbar: {
    title: string;
    tagline: string;
    language: {
      english: string;
      japanese: string;
    };
    theme: {
      light: string;
      dark: string;
    };
  };
  chat: {
    welcome: string;
    placeholder: string;
    processing: string;
    error: string;
    voiceInstructions: {
      tap: string;
      listening: string;
    };
  };
  weather: {
    feelsLike: string;
    humidity: string;
    wind: string;
    visibility: string;
    forecast: string;
    showingWeather: string;
  };
  ai: {
    suggestions: string;
    tips: string;
    unavailable: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      title: 'AI Weather Chatbot',
      tagline: 'Speak in Japanese or English to get weather updates and AI-powered activity suggestions',
      language: {
        english: 'English',
        japanese: 'Japanese',
      },
      theme: {
        light: 'Light Mode',
        dark: 'Dark Mode',
      },
    },
    chat: {
      welcome: 'Hello! Please speak to me about the weather in Japanese or English.',
      placeholder: 'Type a message or use 🎤 for voice input...',
      processing: 'Processing...',
      error: 'Sorry, an error occurred',
      voiceInstructions: {
        tap: 'Tap to speak in English',
        listening: 'Listening... Speak now!',
      },
    },
    weather: {
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      forecast: '5-Day Forecast',
      showingWeather: 'Showing weather for',
    },
    ai: {
      suggestions: 'AI Suggestions',
      tips: 'Additional Tips',
      unavailable: 'AI suggestions temporarily unavailable',
    },
  },
  ja: {
    navbar: {
      title: 'AI天気チャットボット',
      tagline: '日本語または英語で話しかけて、天気情報とAIによる活動提案を取得',
      language: {
        english: '英語',
        japanese: '日本語',
      },
      theme: {
        light: 'ライトモード',
        dark: 'ダークモード',
      },
    },
    chat: {
      welcome: 'こんにちは！天気について日本語または英語で話しかけてください。',
      placeholder: 'メッセージを入力するか🎤で音声入力...',
      processing: '処理中...',
      error: '申し訳ありません。エラーが発生しました',
      voiceInstructions: {
        tap: 'タップして日本語で話す',
        listening: '聞いています...今話してください！',
      },
    },
    weather: {
      feelsLike: '体感温度',
      humidity: '湿度',
      wind: '風速',
      visibility: '視界',
      forecast: '5日間予報',
      showingWeather: '天気情報を表示中',
    },
    ai: {
      suggestions: 'AI提案',
      tips: '追加のヒント',
      unavailable: 'AI提案は一時的に利用できません',
    },
  },
};

export const useTranslation = (language: Language) => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, translations: translations[language] };
};