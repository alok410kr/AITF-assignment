
class SkySenseSpeechService {
  
 
  private weatherVocabulary = {
 
    '晴れ': 'sunny',
    '曇り': 'cloudy', 
    '雨': 'rain',
    '雪': 'snow',
    '風': 'wind',
    '嵐': 'storm',
    '霧': 'fog',
    
    '暑い': 'hot',
    '寒い': 'cold',
    '涼しい': 'cool',
    '暖かい': 'warm',
    '気温': 'temperature',
    
  
    '天気': 'weather',
    '予報': 'forecast',
    'どう': 'how',
    '今日': 'today',
    '明日': 'tomorrow',
    '週末': 'weekend',
 
    '散歩': 'walk',
    '旅行': 'travel',
    '外出': 'go out',
    '運動': 'exercise',
    '買い物': 'shopping',

    // Major Japanese cities
    '東京': 'Tokyo',
    '大阪': 'Osaka',
    '京都': 'Kyoto',
    '横浜': 'Yokohama',
    '名古屋': 'Nagoya',
    '福岡': 'Fukuoka',
    '札幌': 'Sapporo',
    '仙台': 'Sendai',
    '広島': 'Hiroshima',
    '神戸': 'Kobe',
    '新潟': 'Niigata',
    '静岡': 'Shizuoka',
    '熊本': 'Kumamoto',
    '鹿児島': 'Kagoshima',
    '長崎': 'Nagasaki',
    '岡山': 'Okayama',
    '松山': 'Matsuyama',
    '高松': 'Takamatsu',
    '金沢': 'Kanazawa',
    '富山': 'Toyama',
    '福井': 'Fukui',
    '岐阜': 'Gifu',
    '浜松': 'Hamamatsu',
    '甲府': 'Kofu',
    '長野': 'Nagano',
    '宇都宮': 'Utsunomiya',
    '前橋': 'Maebashi',
    'さいたま': 'Saitama',
    '千葉': 'Chiba',
    '川崎': 'Kawasaki',
    '相模原': 'Sagamihara',
    '横須賀': 'Yokosuka',
    '那覇': 'Naha',
    '沖縄': 'Okinawa',
    // Major Indian cities (in Japanese if needed)
    'ムンバイ': 'Mumbai',
    'デリー': 'Delhi',
    'バンガロール': 'Bangalore',
    'ハイデラバード': 'Hyderabad',
    'チェンナイ': 'Chennai',
    'コルカタ': 'Kolkata',
    'プネ': 'Pune',
    'ジャイプール': 'Jaipur'
  };


  processJapaneseInput(text: string): {
    originalText: string;
    translatedTerms: string[];
    detectedLocation?: string;
    intent: 'weather_query' | 'activity_request' | 'general_chat';
    confidence: number;
  } {
    const normalizedText = text.toLowerCase().trim();
    const translatedTerms: string[] = [];
    let detectedLocation: string | undefined;
    let intent: 'weather_query' | 'activity_request' | 'general_chat' = 'general_chat';
    let confidence = 0.5;

 
    Object.entries(this.weatherVocabulary).forEach(([japanese, english]) => {
      if (normalizedText.includes(japanese)) {
        translatedTerms.push(english);
        
     
        const japaneseCities = ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Fukuoka', 'Sapporo',
          'Sendai', 'Hiroshima', 'Kobe', 'Niigata', 'Shizuoka', 'Kumamoto', 'Kagoshima',
          'Nagasaki', 'Okayama', 'Matsuyama', 'Takamatsu', 'Kanazawa', 'Toyama', 'Fukui',
          'Gifu', 'Hamamatsu', 'Kofu', 'Nagano', 'Utsunomiya', 'Maebashi', 'Saitama',
          'Chiba', 'Kawasaki', 'Sagamihara', 'Yokosuka', 'Naha', 'Okinawa',
          'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'];
        if (japaneseCities.includes(english)) {
          detectedLocation = english;
        }
      }
    });

  
    if (translatedTerms.includes('weather') || translatedTerms.includes('forecast') || 
        translatedTerms.some(term => ['sunny', 'cloudy', 'rain', 'snow', 'hot', 'cold'].includes(term))) {
      intent = 'weather_query';
      confidence = 0.8;
    } else if (translatedTerms.some(term => ['walk', 'travel', 'go out', 'exercise', 'shopping'].includes(term))) {
      intent = 'activity_request';
      confidence = 0.7;
    }

    return {
      originalText: text,
      translatedTerms,
      detectedLocation,
      intent,
      confidence
    };
  }

 
  extractLocation(text: string): string | null {
    const normalizedText = text.toLowerCase();
    

    const japaneseCities = ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Fukuoka', 'Sapporo',
      'Sendai', 'Hiroshima', 'Kobe', 'Niigata', 'Shizuoka', 'Kumamoto', 'Kagoshima',
      'Nagasaki', 'Okayama', 'Matsuyama', 'Takamatsu', 'Kanazawa', 'Toyama', 'Fukui',
      'Gifu', 'Hamamatsu', 'Kofu', 'Nagano', 'Utsunomiya', 'Maebashi', 'Saitama',
      'Chiba', 'Kawasaki', 'Sagamihara', 'Yokosuka', 'Naha', 'Okinawa',
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur',
      'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
      'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
      'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
      'Ranchi', 'Coimbatore', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
      'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli', 'Jabalpur', 'Bhubaneswar',
      'Mysore', 'Kochi', 'Trivandrum', 'Goa', 'Panaji', 'Dehradun', 'Shimla', 'Manali',
      'Udaipur', 'Jaisalmer', 'Pushkar', 'Ooty', 'Kodaikanal', 'Darjeeling', 'Shillong'];
    
    for (const [japanese, english] of Object.entries(this.weatherVocabulary)) {
      if (normalizedText.includes(japanese) && japaneseCities.includes(english)) {
        return english;
      }
    }

    const cities = japaneseCities;
    for (const city of cities) {
      if (normalizedText.includes(city.toLowerCase())) {
        return city;
      }
    }

    return null;
  }


  cleanText(text: string): string {
    return text
      .trim()
      .replace(/[。、！？]/g, '') 
      .replace(/\s+/g, ' ') 
      .toLowerCase();
  }

 
  generateContext(processedInput: ReturnType<typeof this.processJapaneseInput>): string {
    const { translatedTerms, detectedLocation, intent, confidence } = processedInput;
    
    let context = `User spoke in Japanese. `;
    
    if (detectedLocation) {
      context += `Location mentioned: ${detectedLocation}. `;
    }
    
    if (translatedTerms.length > 0) {
      context += `Key terms: ${translatedTerms.join(', ')}. `;
    }
    
    context += `Intent: ${intent} (confidence: ${Math.round(confidence * 100)}%). `;
    
    return context;
  }

 
  isWeatherRelated(text: string): boolean {
    const processed = this.processJapaneseInput(text);
    return processed.intent === 'weather_query' || processed.confidence > 0.6;
  }
}

export default new SkySenseSpeechService();