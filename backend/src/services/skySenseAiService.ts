import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIRequest, AIResponse, ActivitySuggestion } from '../types/ai';
import { WeatherData } from '../types/weather';
import { request } from 'http';

class SkySenseAIService {
  private genAI: GoogleGenerativeAI | null = null;
  private models: any[] = [];
  private modelNames: string[] = [
    // Stable, generally available models
    'models/gemini-1.5-flash-latest',
    'models/gemini-1.5-pro-latest',
    'models/gemini-pro'
  ];

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);

      
      this.models = this.modelNames.map(modelName => ({
        name: modelName,
        instance: this.genAI!.getGenerativeModel({ model: modelName })
      }));

      console.log('✅ Initialized Gemini models with fallback:', this.modelNames);
    } else {
      console.warn('⚠️  Gemini API key not found. Please set GEMINI_API_KEY in environment variables.');
    }
  }



 
  async generateSuggestions(request: AIRequest): Promise<AIResponse> {
    if (!this.models || this.models.length === 0) {
      throw new Error('Gemini AI service is not configured. Please set GEMINI_API_KEY.');
    }

    const maxRetries = 2;
    const retryDelay = 1500;
    const prompt = this.buildPrompt(request);

   
    for (let modelIndex = 0; modelIndex < this.models.length; modelIndex++) {
      const currentModel = this.models[modelIndex];
      console.log(`🤖 Trying model: ${currentModel.name} (${modelIndex + 1}/${this.models.length})`);

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await currentModel.instance.generateContent(prompt);
          const response = await result.response;
          const text = response.text();

          return this.parseAIResponse(text, request.language || 'en', request.weatherData);

        } catch (error: any) {
          console.error(` ${currentModel.name} attempt ${attempt} failed:`, error?.message || error);

          const isOverloaded = error?.message?.includes('503') || error?.message?.includes('overloaded');
          const isNotFound = error?.message?.includes('404') || error?.message?.includes('not found');

          
          if (isNotFound) {
            console.log(` Model ${currentModel.name} not available, trying next model...`);
            break;
          }

          // If overloaded and we have more attempts, retry
          if (isOverloaded && attempt < maxRetries) {
            console.log(` Model overloaded, retrying in ${retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            continue;
          }

          // If this was the last attempt for this model, try next model
          if (attempt === maxRetries) {
            console.log(` All attempts failed for ${currentModel.name}, trying next model...`);
            break;
          }
        }
      }
    }

    // If all models failed, return enhanced fallback
    console.log(' All models failed, returning enhanced fallback suggestions');
    return {
      suggestions: this.createFallbackSuggestions(request.weatherData),
      explanation: 'AI service is currently experiencing high demand. Here are some weather-based suggestions:',
      additionalTips: [
        'Check the weather forecast before heading out',
        'Dress appropriately for the temperature',
        'Stay safe and enjoy your day',
        'Try again in a few minutes for AI-powered suggestions'
      ],
      conversationalResponse: request.language === 'ja'
        ? 'AIサービスが混雑しています。天気に基づいたおすすめをご紹介します。'
        : 'AI service is busy right now. Here are some weather-based activity suggestions for you!'
    };
  }


  async generateConversationalResponse(
    userInput: string,
    weatherData?: WeatherData,
    language: 'ja' | 'en' = 'en'
  ): Promise<string> {
    if (!this.models || this.models.length === 0) {
      throw new Error('Gemini AI service is not configured. Please set GEMINI_API_KEY.');
    }

    const prompt = this.buildConversationalPrompt(userInput, weatherData, language);

    for (const currentModel of this.models) {
      try {
        console.log(` Attempting conversational response with ${currentModel.name}...`);
        const result = await currentModel.instance.generateContent(prompt);
        const response = await result.response;
        console.log(` Conversational response received from ${currentModel.name}!`);
        return response.text();
      } catch (error: any) {
        console.error(` ${currentModel.name} failed:`, error?.message || error);

        const isNotFound = error?.message?.includes('404') || error?.message?.includes('not found');
        if (isNotFound) {
          console.log(` Model ${currentModel.name} not available, trying next...`);
          continue;
        }

        // For conversational responses, try next model immediately on any error
        console.log(` Trying next model for conversational response...`);
        continue;
      }
    }

    // Fallback if all models failed
    const fallbackMessage = language === 'ja'
      ? 'すみません、現在AIサービスが利用できません。後でもう一度お試しください。'
      : 'Sorry, the AI service is currently unavailable. Please try again later.';

    console.log(' Returning fallback conversational response');
    return fallbackMessage;
  }

  
  private buildPrompt(request: AIRequest): string {
    const { weatherData, userQuery, language = 'en' } = request;
    const isJapanese = language === 'ja';

    const weatherInfo = `
Location: ${weatherData.location.name}, ${weatherData.location.country}
Temperature: ${weatherData.current.temperature}°C (feels like ${weatherData.current.feelsLike}°C)
Condition: ${weatherData.current.condition} - ${weatherData.current.description}
Humidity: ${weatherData.current.humidity}%
Wind Speed: ${weatherData.current.windSpeed} m/s
Visibility: ${weatherData.current.visibility} km
`;

    const forecastInfo = weatherData.forecast.length > 0
      ? `\nForecast for next few days:\n${weatherData.forecast.map(f => {
        const dateStr = f.date instanceof Date ? f.date.toDateString() :
          typeof f.date === 'string' ? f.date :
            new Date(f.date).toDateString();
        return `${dateStr}: ${f.temperature.min}-${f.temperature.max}°C, ${f.condition}`;
      }).join('\n')}`
      : '';

    return `
You are an AI weather assistant that provides helpful activity suggestions based on current weather conditions.

Current Weather Information:
${weatherInfo}${forecastInfo}

User Query: "${userQuery}"

Please provide activity suggestions in this simple JSON format:
{
  "suggestions": [
    {
      "category": "outdoor",
      "title": "Go for a walk",
      "description": "Take a nice walk in the park",
      "reasoning": "Good weather for outdoor activities",
      "icon": "🚶",
      "priority": 3
    }
  ],
  "explanation": "Weather looks good today",
  "additionalTips": ["Bring an umbrella", "Dress warmly"],
  "conversationalResponse": "${isJapanese ? 'Japanese response here' : 'English response here'}"
}

Guidelines:
- Provide 3-5 relevant suggestions
- Consider the current weather, temperature, and forecast
- Include both outdoor and indoor options when appropriate
- Prioritize safety and comfort
- Be specific and actionable
- ${isJapanese ? 'Respond in Japanese for conversationalResponse' : 'Respond in English'}
- Consider Japanese culture and preferences for activities
- Include clothing recommendations based on temperature and conditions
- Suggest food/drinks appropriate for the weather
`;
  }

  
  private buildConversationalPrompt(
    userInput: string,
    weatherData?: WeatherData,
    language: 'ja' | 'en' = 'en'
  ): string {
    const isJapanese = language === 'ja';
    const weatherInfo = weatherData ? `
Current weather in ${weatherData.location.name}: ${weatherData.current.temperature}°C, ${weatherData.current.condition}
` : '';

    return `
You are a friendly AI weather assistant. Respond naturally and helpfully to the user's input.

${weatherInfo}
User input: "${userInput}"

Please respond in ${isJapanese ? 'Japanese' : 'English'} in a conversational, helpful manner. 
If the user is asking about weather, provide relevant information and suggestions.
If they're asking about activities, consider the weather conditions.
Keep responses concise but informative.
`;
  }

  
  private parseAIResponse(text: string, language: 'ja' | 'en', weatherData?: any): AIResponse {
    try {

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          suggestions: parsed.suggestions || [],
          explanation: parsed.explanation || '',
          additionalTips: parsed.additionalTips || [],
          conversationalResponse: parsed.conversationalResponse || text
        };
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }


    return {
      suggestions: this.createFallbackSuggestions(weatherData),
      explanation: 'Based on the current weather conditions, here are some suggestions for you.',
      additionalTips: [
        'Check the weather forecast before heading out',
        'Dress appropriately for the temperature',
        'Stay hydrated and safe'
      ],
      conversationalResponse: text || 'Here are some weather-based activity suggestions for you!'
    };
  }


  private createFallbackSuggestions(weatherData?: any): ActivitySuggestion[] {
    const temp = weatherData?.current?.temperature || 20;
    const condition = weatherData?.current?.condition?.toLowerCase() || 'clear';

    const suggestions: ActivitySuggestion[] = [];

  
    if (condition.includes('rain')) {
      suggestions.push({
        category: 'indoor',
        title: 'Stay Cozy Indoors',
        description: 'Perfect weather for indoor activities like reading or cooking.',
        reasoning: 'Rainy weather is ideal for indoor relaxation.',
        icon: '🏠',
        priority: 4
      });
      suggestions.push({
        category: 'clothing',
        title: 'Bring an Umbrella',
        description: 'Don\'t forget your umbrella and waterproof jacket.',
        reasoning: 'Essential for staying dry in the rain.',
        icon: '☂️',
        priority: 5
      });
    } else if (temp > 25) {
      suggestions.push({
        category: 'outdoor',
        title: 'Enjoy the Sunshine',
        description: 'Great weather for outdoor activities like walking or picnics.',
        reasoning: 'Warm weather is perfect for being outside.',
        icon: '☀️',
        priority: 4
      });
      suggestions.push({
        category: 'clothing',
        title: 'Light Clothing',
        description: 'Wear light, breathable clothing and stay hydrated.',
        reasoning: 'Warm weather requires appropriate clothing.',
        icon: '👕',
        priority: 3
      });
    } else if (temp < 10) {
      suggestions.push({
        category: 'clothing',
        title: 'Bundle Up',
        description: 'Wear warm layers, coat, and accessories.',
        reasoning: 'Cold weather requires proper insulation.',
        icon: '🧥',
        priority: 5
      });
      suggestions.push({
        category: 'food',
        title: 'Hot Drinks',
        description: 'Enjoy warm beverages like coffee, tea, or hot chocolate.',
        reasoning: 'Hot drinks help keep you warm in cold weather.',
        icon: '☕',
        priority: 4
      });
    } else {
      suggestions.push({
        category: 'outdoor',
        title: 'Perfect Weather',
        description: 'Great conditions for any outdoor activity you enjoy.',
        reasoning: 'Mild weather is comfortable for most activities.',
        icon: '🌤️',
        priority: 4
      });
    }

    return suggestions;
  }

 
  private createFallbackResponse(request: AIRequest): AIResponse {
    return {
      suggestions: this.createFallbackSuggestions(request.weatherData),
      explanation: 'Here are some weather-based suggestions (AI service temporarily unavailable).',
      additionalTips: [
        'Check the weather forecast before heading out',
        'Dress appropriately for the temperature',
        'Stay safe and enjoy your day'
      ],
      conversationalResponse: request.language === 'ja'
        ? '天気に基づいたおすすめをご紹介します。'
        : 'Here are some weather-based activity suggestions for you!'
    };
  }

 
  isConfigured(): boolean {
    return !!this.genAI && !!this.models && this.models.length > 0;
  }
}

export default SkySenseAIService;