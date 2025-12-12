export interface Translations {
    // Header
    appTitle: string;
    appSubtitle: string;

    // Landing Page
    landingTitle: string;
    landingSubtitle: string;
    getStarted: string;
    scrollToChat: string;

    // Features
    voiceInputSupport: string;
    realTimeWeather: string;
    aiRecommendationEngine: string;
    multiLanguageSupport: string;

    // Quick Start
    quickStart: string;
    quickStartTips: {
        microphone: string;
        askWeather: string;
        aiRecommendations: string;
        switchLanguage: string;
    };

    // Chat Interface
    chatTitle: string;
    hello: string;
    letsGetStarted: string;

    // Quick Actions
    currentWeather: string;
    fiveDayForecast: string;
    pastStatistics: string;

    // Chat Input
    typeMessage: string;
    voiceInputPlaceholder: string;
    listening: string;
    transcript: string;
    error: string;
    sendMessage: string;
    startVoiceInput: string;
    stopListening: string;

    // Weather Card
    updated: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    visibility: string;
    showingWeatherFor: string;

    // AI Suggestions
    aiSuggestions: string;
    whyThisSuggestion: string;
    additionalTips: string;

    // Categories
    categories: {
        travel: string;
        outdoor: string;
        indoor: string;
        clothing: string;
        food: string;
    };

    // Priority
    priority: {
        high: string;
        medium: string;
        low: string;
    };

    // Days of week
    days: {
        sun: string;
        mon: string;
        tue: string;
        wed: string;
        thu: string;
        fri: string;
        sat: string;
    };

    // Common
    loading: string;
    retry: string;
    cancel: string;
    ok: string;

    // Settings
    settings: string;
    language: string;
    theme: string;
    help: string;
    refresh: string;

    // Error Messages
    weatherApiError: string;
    aiServiceUnavailable: string;
    locationNotFound: string;
    networkError: string;
    microphonePermissionDenied: string;
    speechRecognitionNotSupported: string;

    // Bot Responses
    botResponses: {
        weatherSuggestions: string;
        weatherRetrieved: string;
        weatherError: string;
        gettingWeather: string;
        processingRequest: string;
    };
}

export const translations: Record<'en' | 'ja', Translations> = {
    en: {
        // Header
        appTitle: "SkySense",
        appSubtitle: "Calm, beautiful AI weather concierge",

        // Landing Page
        landingTitle: "Meet SkySense",
        landingSubtitle: "Your serene AI weather companion — forecasts, outfits, and travel ideas in one soothing place.",
        getStarted: "Start the breeze",
        scrollToChat: "Scroll to begin your weather chat",

        // Features
        voiceInputSupport: "Voice-first experience",
        realTimeWeather: "Live weather insights",
        aiRecommendationEngine: "Smart AI suggestions",
        multiLanguageSupport: "English & Japanese",

        // Quick Start
        quickStart: "Quick start",
        quickStartTips: {
            microphone: "Tap the mic and speak naturally",
            askWeather: "Ask for any city’s weather or outfit tips",
            aiRecommendations: "Get gentle AI ideas for your day",
            switchLanguage: "Switch between English & Japanese anytime"
        },

        // Chat Interface
        chatTitle: "SkySense chat",
        hello: "Hi there!",
        letsGetStarted: "Say or type your city and I’ll bring the weather to you.",

        // Quick Actions
        currentWeather: "Current weather",
        fiveDayForecast: "5-day outlook",
        pastStatistics: "Past stats",

        // Chat Input
        typeMessage: "Type or tap the mic to ask for weather...",
        voiceInputPlaceholder: "Ask for a city, forecast, or outfit idea...",
        listening: "Listening... speak naturally",
        transcript: "Heard: ",
        error: "Error: ",
        sendMessage: "Send",
        startVoiceInput: "Start voice input",
        stopListening: "Stop listening",

        // Weather Card
        updated: "Updated",
        feelsLike: "Feels like",
        humidity: "Humidity",
        wind: "Wind",
        visibility: "Visibility",
        showingWeatherFor: "Showing weather for",

        // AI Suggestions
        aiSuggestions: "✨ Day Planner",
        whyThisSuggestion: "Why this idea: ",
        additionalTips: "Extra tips:",

        // Categories
        categories: {
            travel: "travel",
            outdoor: "outdoor",
            indoor: "indoor",
            clothing: "clothing",
            food: "food"
        },

        // Priority
        priority: {
            high: "High Priority",
            medium: "Medium Priority",
            low: "Low Priority"
        },

        // Days of week
        days: {
            sun: "Sun",
            mon: "Mon",
            tue: "Tue",
            wed: "Wed",
            thu: "Thu",
            fri: "Fri",
            sat: "Sat"
        },

        // Common
        loading: "Loading...",
        retry: "Retry",
        cancel: "Cancel",
        ok: "OK",

        // Settings
        settings: "Settings",
        language: "Language",
        theme: "Theme",
        help: "Help",
        refresh: "Refresh",

        // Error Messages
        weatherApiError: "Failed to get weather information",
        aiServiceUnavailable: "AI suggestions temporarily unavailable",
        locationNotFound: "Location not found",
        networkError: "Network connection error",
        microphonePermissionDenied: "Microphone permission denied",
        speechRecognitionNotSupported: "Speech recognition not supported",

        // Bot Responses
        botResponses: {
            weatherSuggestions: "Here are some suggestions based on the current weather!",
            weatherRetrieved: "Weather information retrieved successfully. AI suggestions temporarily unavailable.",
            weatherError: "Sorry, failed to get weather information",
            gettingWeather: "Getting weather data and AI suggestions...",
            processingRequest: "Processing your request..."
        }
    },

    ja: {
        // Header
        appTitle: "SkySense",
        appSubtitle: "穏やかなAI天気コンシェルジュ",

        // Landing Page
        landingTitle: "SkySenseへようこそ",
        landingSubtitle: "天気予報、服装アイデア、旅行のヒントを静かに届けるAIコンシェルジュ。",
        getStarted: "はじめる",
        scrollToChat: "スクロールしてチャットを開始",

        // Features
        voiceInputSupport: "音声ファースト",
        realTimeWeather: "ライブ天気インサイト",
        aiRecommendationEngine: "スマートAI提案",
        multiLanguageSupport: "日本語 & 英語",

        // Quick Start
        quickStart: "クイックスタート",
        quickStartTips: {
            microphone: "マイクを押して自然に話す",
            askWeather: "都市名や予報、服装を尋ねる",
            aiRecommendations: "AIがやさしくプランを提案",
            switchLanguage: "日本語と英語を自由に切替"
        },

        // Chat Interface
        chatTitle: "SkySense チャット",
        hello: "こんにちは！",
        letsGetStarted: "都市名を言うか入力してください。天気をお届けします。",

        // Quick Actions
        currentWeather: "現在の天気",
        fiveDayForecast: "5日間の見通し",
        pastStatistics: "過去の統計",

        // Chat Input
        typeMessage: "入力またはマイクで天気を尋ねる...",
        voiceInputPlaceholder: "都市名や予報、服装について聞いてください...",
        listening: "聞いています… 自然に話してください",
        transcript: "認識: ",
        error: "エラー: ",
        sendMessage: "送信",
        startVoiceInput: "音声入力を開始",
        stopListening: "聞き取りを停止",

        // Weather Card
        updated: "更新済み",
        feelsLike: "体感温度",
        humidity: "湿度",
        wind: "風",
        visibility: "視界",
        showingWeatherFor: "天気を表示中",

        // AI Suggestions
        aiSuggestions: "🤖 AI提案",
        whyThisSuggestion: "この提案の理由: ",
        additionalTips: "追加のヒント:",

        // Categories
        categories: {
            travel: "旅行",
            outdoor: "屋外",
            indoor: "屋内",
            clothing: "服装",
            food: "食べ物"
        },

        // Priority
        priority: {
            high: "高優先度",
            medium: "中優先度",
            low: "低優先度"
        },

        // Days of week
        days: {
            sun: "日",
            mon: "月",
            tue: "火",
            wed: "水",
            thu: "木",
            fri: "金",
            sat: "土"
        },

        // Common
        loading: "読み込み中...",
        retry: "再試行",
        cancel: "キャンセル",
        ok: "OK",

        // Settings
        settings: "設定",
        language: "言語",
        theme: "テーマ",
        help: "ヘルプ",
        refresh: "更新",

        // Error Messages
        weatherApiError: "天気情報の取得に失敗しました",
        aiServiceUnavailable: "AI提案は一時的に利用できません",
        locationNotFound: "場所が見つかりません",
        networkError: "ネットワーク接続エラー",
        microphonePermissionDenied: "マイクの許可が拒否されました",
        speechRecognitionNotSupported: "音声認識はサポートされていません",

        // Bot Responses
        botResponses: {
            weatherSuggestions: "現在の天気に基づいた提案をご紹介します！",
            weatherRetrieved: "天気情報を取得しました。AIサービスは一時的に利用できません。",
            weatherError: "申し訳ありません。天気情報の取得に失敗しました",
            gettingWeather: "天気データとAI提案を取得中...",
            processingRequest: "リクエストを処理中..."
        }
    }
};