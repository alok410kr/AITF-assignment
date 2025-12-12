import { WeatherData } from './weather';

export interface AIRequest {
  weatherData: WeatherData;
  userQuery: string;
  context?: string;
  language?: 'ja' | 'en';
}

export interface ActivitySuggestion {
  category: 'travel' | 'outdoor' | 'indoor' | 'clothing' | 'food';
  title: string;
  description: string;
  reasoning: string;
  icon: string;
  priority: number;
}

export interface AIResponse {
  suggestions: ActivitySuggestion[];
  explanation: string;
  additionalTips: string[];
  conversationalResponse: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'weather' | 'ai-suggestion';
  content: string;
  timestamp: Date;
  weatherData?: WeatherData;
  suggestions?: ActivitySuggestion[];
}