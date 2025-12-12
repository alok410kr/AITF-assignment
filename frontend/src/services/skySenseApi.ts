import { WeatherData, AIResponse } from '../types';

// Dynamic backend URL configuration for deployment
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

// API client configuration
export const apiClient = {
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased to 30 seconds for cold starts
  headers: {
    'Content-Type': 'application/json'
  }
};

// Helper function for API requests with timeout and error handling
async function apiRequest(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiClient.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...apiClient.headers,
        ...options.headers
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection');
    }
    throw error;
  }
}

export class SkySenseApiService {

  /**
   * Get weather data for a location
   */
  static async getWeather(location: string): Promise<WeatherData> {
    const response = await apiRequest(`${API_BASE_URL}/api/weather?location=${encodeURIComponent(location)}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Failed to fetch weather data');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Get weather data by coordinates
   */
  static async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    const response = await apiRequest(`${API_BASE_URL}/api/weather?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Failed to fetch weather data');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Send chat message and get AI response
   */
  static async sendChatMessage(
    message: string,
    weatherData?: WeatherData,
    language: 'ja' | 'en' = 'en'
  ): Promise<AIResponse> {
    const response = await apiRequest(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        weatherData,
        language
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Failed to get AI response');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Get weather and AI suggestions in one request
   */
  static async getWeatherAndSuggestions(
    location: string,
    message: string = 'What should I do today?',
    language: 'ja' | 'en' = 'en'
  ): Promise<{ weather: WeatherData; ai: AIResponse }> {
    const response = await apiRequest(`${API_BASE_URL}/api/weather-chat`, {
      method: 'POST',
      body: JSON.stringify({
        location,
        message,
        language
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Failed to get weather and suggestions');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Get weather and AI suggestions by coordinates
   */
  static async getWeatherAndSuggestionsByCoordinates(
    lat: number,
    lon: number,
    message: string = 'What should I do today?',
    language: 'ja' | 'en' = 'en'
  ): Promise<{ weather: WeatherData; ai: AIResponse }> {
    const response = await apiRequest(`${API_BASE_URL}/api/weather-chat`, {
      method: 'POST',
      body: JSON.stringify({
        lat,
        lon,
        message,
        language
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Failed to get weather and suggestions');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Check API health
   */
  static async checkHealth(): Promise<any> {
    const response = await apiRequest(`${API_BASE_URL}/api/health`);

    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return response.json();
  }
}