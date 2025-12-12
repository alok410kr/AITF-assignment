export interface WeatherData {
  location: {
    name: string;
    country: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  current: {
    temperature: number;
    feelsLike: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
    icon: string;
  };
  forecast: ForecastItem[];
  timestamp: Date;
}

export interface ForecastItem {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  description: string;
  precipitationChance: number;
  icon: string;
}

export interface ActivitySuggestion {
  category: 'travel' | 'outdoor' | 'indoor' | 'clothing' | 'food';
  title: string;
  description: string;
  reasoning: string;
  icon: string;
  priority: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'weather' | 'ai-suggestion';
  content: string;
  timestamp: Date;
  weatherData?: WeatherData;
  suggestions?: ActivitySuggestion[];
}

export interface AIResponse {
  suggestions: ActivitySuggestion[];
  explanation: string;
  additionalTips: string[];
  conversationalResponse: string;
}