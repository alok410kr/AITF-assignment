// Location extraction utility
export const extractLocationFromText = (text: string): string | null => {
  const normalizedText = text.toLowerCase();
  console.log('🔍 Location extraction input:', text);
  console.log('🔍 Normalized text:', normalizedText);

  // Japanese to English city mapping - CHECK THIS FIRST!
  const japaneseToEnglish: { [key: string]: string } = {
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
    '日本': 'Tokyo', // Default Japan to Tokyo
    // Indian cities in Japanese (if needed)
    'オランガバ': 'Aurangabad',
    'オーランガバード': 'Aurangabad',
    'ムンバイ': 'Mumbai',
    'デリー': 'Delhi',
    'バンガロール': 'Bangalore'
  };

  // Check for Japanese characters FIRST (use original text, not normalized)
  for (const [japanese, english] of Object.entries(japaneseToEnglish)) {
    if (text.includes(japanese)) {
      console.log('✅ Japanese character match:', japanese, '→', english);
      return english;
    }
  }

  // Common location patterns
  const locationPatterns = [
    // English patterns - basic weather queries
    /weather in ([a-zA-Z\s,]+)/i,
    /weather for ([a-zA-Z\s,]+)/i,
    /weather at ([a-zA-Z\s,]+)/i,
    /how.*weather.*in ([a-zA-Z\s,]+)/i,
    /what.*weather.*in ([a-zA-Z\s,]+)/i,
    /tell me.*weather.*in ([a-zA-Z\s,]+)/i,
    /show.*weather.*in ([a-zA-Z\s,]+)/i,
    /check.*weather.*in ([a-zA-Z\s,]+)/i,

    // Travel and future tense patterns
    /going to ([a-zA-Z\s,]+)/i,
    /plan.*going to ([a-zA-Z\s,]+)/i,
    /planning.*to.*go.*to ([a-zA-Z\s,]+)/i,
    /trip to ([a-zA-Z\s,]+)/i,
    /travel.*to ([a-zA-Z\s,]+)/i,
    /visiting ([a-zA-Z\s,]+)/i,
    /visit ([a-zA-Z\s,]+)/i,
    /plan.*visit.*([a-zA-Z\s,]+)/i,
    /weather.*([a-zA-Z\s,]+).*tomorrow/i,
    /weather.*([a-zA-Z\s,]+).*next week/i,
    /weather.*([a-zA-Z\s,]+).*after.*week/i,

    // More flexible patterns
    /about.*weather.*([a-zA-Z\s,]+)/i,

    // Japanese patterns (both Japanese characters and romanized)
    /([a-zA-Z\s,]+).*no.*tenki/i,
    /([a-zA-Z]+).*weather/i, // Removed \s, to avoid capturing extra words
    // Japanese character patterns (expanded)
    /(東京|大阪|京都|横浜|名古屋|福岡|札幌|仙台|広島|神戸|新潟|静岡|熊本|鹿児島|長崎|岡山|松山|高松|金沢|富山|福井|岐阜|浜松|甲府|長野|宇都宮|前橋|さいたま|千葉|川崎|相模原|横須賀|那覇|沖縄|日本|オランガバ|オーランガバード).*の.*天気/i,
    /(東京|大阪|京都|横浜|名古屋|福岡|札幌|仙台|広島|神戸|新潟|静岡|熊本|鹿児島|長崎|岡山|松山|高松|金沢|富山|福井|岐阜|浜松|甲府|長野|宇都宮|前橋|さいたま|千葉|川崎|相模原|横須賀|那覇|沖縄|日本|オランガバ|オーランガバード).*天気/i,
    // More flexible Japanese patterns
    /([ァ-ヶー]+).*の.*天気/i, // Katakana cities
    /([一-龯]+).*の.*天気/i,  // Kanji cities
  ];

  // Common city names (English, Japanese, and Indian cities)
  const cities = [
    // Japanese cities (English and Japanese) - Major cities
    'tokyo', 'osaka', 'kyoto', 'yokohama', 'nagoya', 'fukuoka', 'sapporo',
    'sendai', 'hiroshima', 'kobe', 'niigata', 'shizuoka', 'kumamoto', 'kagoshima',
    'nagasaki', 'okayama', 'matsuyama', 'takamatsu', 'kanazawa', 'toyama', 'fukui',
    'gifu', 'hamamatsu', 'kofu', 'nagano', 'utsunomiya', 'maebashi', 'saitama',
    'chiba', 'kawasaki', 'sagamihara', 'yokosuka', 'naha', 'okinawa',
    // Japanese cities (Japanese characters)
    '東京', '大阪', '京都', '横浜', '名古屋', '福岡', '札幌', '仙台', '広島', '神戸',
    '新潟', '静岡', '熊本', '鹿児島', '長崎', '岡山', '松山', '高松', '金沢', '富山',
    '福井', '岐阜', '浜松', '甲府', '長野', '宇都宮', '前橋', 'さいたま', '千葉', '川崎',
    '相模原', '横須賀', '那覇', '沖縄', '日本',
    // International cities
    'new york', 'london', 'paris', 'berlin', 'rome', 'madrid', 'amsterdam',
    'sydney', 'melbourne', 'toronto', 'vancouver', 'singapore', 'hong kong',
    'seoul', 'beijing', 'shanghai', 'bangkok',
    // Indian cities - Major metropolitan cities
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'ahmedabad', 'chennai', 'kolkata',
    'pune', 'jaipur', 'surat', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane',
    'bhopal', 'visakhapatnam', 'pimpri', 'patna', 'vadodara', 'ghaziabad', 'ludhiana',
    'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 'kalyan', 'vasai', 'varanasi',
    'srinagar', 'aurangabad', 'dhanbad', 'amritsar', 'navi mumbai', 'allahabad',
    'ranchi', 'howrah', 'coimbatore', 'gwalior', 'vijayawada', 'jodhpur',
    'madurai', 'raipur', 'kota', 'guwahati', 'chandigarh', 'solapur', 'hubli',
    // Additional major Indian cities
    'jabalpur', 'bhubaneswar', 'mysore', 'tiruchirappalli', 'salem', 'warangal',
    'guntur', 'bhiwandi', 'saharanpur', 'gorakhpur', 'bikaner', 'amravati',
    'noida', 'jamshedpur', 'bhilai', 'cutrack', 'kochi', 'raigarh', 'jalandhar',
    'tirunelveli', 'mangalore', 'thrissur', 'kollam', 'tirupati', 'kakinada',
    'belgaum', 'rajahmundry', 'nellore', 'kurnool', 'tumkur', 'gulbarga',
    'davanagere', 'bellary', 'bijapur', 'raichur', 'bidar', 'hospet', 'gadag',
    'shimoga', 'udupi', 'chikmagalur', 'hassan', 'mandya', 'mysuru',
    // North Indian cities
    'dehradun', 'haridwar', 'rishikesh', 'mussoorie', 'nainital', 'shimla', 'manali',
    'dharamshala', 'mcleodganj', 'kasauli', 'dalhousie', 'kullu', 'spiti', 'leh',
    'ladakh', 'jammu', 'udaipur', 'mount abu', 'jaisalmer', 'bikaner', 'pushkar',
    'ajmer', 'bundi', 'chittorgarh', 'kota', 'bharatpur', 'alwar', 'sikar',
    // East Indian cities
    'bhubaneswar', 'cuttack', 'puri', 'konark', 'rourkela', 'sambalpur', 'berhampur',
    'siliguri', 'darjeeling', 'kalimpong', 'gangtok', 'shillong', 'aizawl', 'imphal',
    'agartala', 'kohima', 'dimapur', 'itanagar', 'dispur',
    // West Indian cities
    'goa', 'panaji', 'margao', 'vasco', 'mapusa', 'ponda', 'calangute', 'anjuna',
    'baroda', 'bhavnagar', 'jamnagar', 'gandhinagar', 'anand', 'nadiad', 'bharuch',
    'surat', 'valsad', 'navsari', 'daman', 'diu', 'silvassa',
    // South Indian cities
    'kochi', 'trivandrum', 'calicut', 'thrissur', 'kollam', 'alappuzha', 'kottayam',
    'palakkad', 'kannur', 'kasargod', 'wayanad', 'munnar', 'thekkady',
    'pondicherry', 'cuddalore', 'vellore', 'salem', 'erode', 'tiruppur', 'karur',
    'dindigul', 'theni', 'tuticorin', 'nagercoil', 'kanyakumari', 'ooty', 'kodaikanal',
    'coonoor', 'yercaud', 'valparai',
    // Additional smaller cities often requested
    'ballia', 'ballia city',
    // US cities
    'los angeles', 'chicago', 'houston', 'phoenix', 'philadelphia', 'san antonio',
    'san diego', 'dallas', 'san jose', 'austin', 'jacksonville', 'san francisco',
    'columbus', 'charlotte', 'fort worth', 'detroit', 'el paso', 'memphis',
    'seattle', 'denver', 'washington', 'boston', 'nashville', 'baltimore',
    'louisville', 'portland', 'oklahoma city', 'milwaukee', 'las vegas'
  ];

  // Try pattern matching first
  for (const pattern of locationPatterns) {
    const match = text.match(pattern); // Use original text, not normalized
    console.log('🔍 Testing pattern:', pattern, 'Match:', match);
    if (match && match[1]) {
      let location = match[1].trim();
      console.log('🔍 Raw location match:', location);

      // Clean up the location by removing common non-location words
      location = location
        .replace(/\b(today|tomorrow|now|currently|right now|this morning|tonight|weather|forecast|after|week|next|plan|planning|trip|travel|visiting|visit|about|the|a|an|and|or|but|so|tell|me|show|check|how|what|is|are|will|be|going|to|five|day|days|hour|hours|minute|minutes)\b/gi, '')
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();

      console.log('🔍 Cleaned location:', location);

      // Handle state names (e.g., "Aurangabad Maharashtra" -> "Aurangabad")
      const stateParts = location.split(/\s+/);
      if (stateParts.length > 1) {
        // Try the first part (city name) first
        const cityName = stateParts[0];
        if (cities.includes(cityName.toLowerCase())) {
          location = cityName;
        } else {
          // Use the first word as location
          location = cityName;
        }
      }

      // Validate if it's a reasonable location name
      // Exclude numbers, time-related words, and forecast-related terms
      const excludeWords = /^(five|day|days|week|weeks|hour|hours|minute|minutes|forecast|weather|current|today|tomorrow|\d+)$/i;

      if (location.length > 2 && location.length < 50 && !excludeWords.test(location)) {
        console.log('✅ Pattern match found:', location);
        return capitalizeLocation(location);
      }
    }
  }

  // Try direct city name matching (word boundaries to avoid partial matches)
  for (const city of cities) {
    const cityRegex = new RegExp(`\\b${city}\\b`, 'i');
    if (cityRegex.test(text)) {
      console.log('✅ Direct city match found:', city);
      return capitalizeLocation(city);
    }
  }



  // Special handling for current location queries
  if (normalizedText.includes('current') || normalizedText.includes('here') || normalizedText.includes('my location')) {
    return null; // Let geolocation handle this
  }

  // Special handling for Japan/Japanese cities
  if (normalizedText.includes('japan') && !normalizedText.includes(' in ')) {
    return 'Tokyo'; // Default to Tokyo for general Japan queries
  }

  return null;
};

const capitalizeLocation = (location: string): string => {
  return location
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Test function to validate location extraction
export const testLocationExtraction = () => {
  const testCases = [
    "What's the weather in Tokyo?",
    "How is the weather in New York?",
    "Tell me the weather in London",
    "Weather in Paris today",
    "What's the weather like in Japan?",
    "Tokyo no tenki wa dou desu ka?",
    "I want to know the weather for Sydney",
    "Check weather at Mumbai",
    // Travel-related test cases
    "I am planning to go to Dehradun tomorrow so tell me about the weather",
    "I have a plan of going to Mumbai after a week so tell me about the weather",
    "Going to Delhi next week",
    "Planning a trip to Bangalore",
    "Visiting Chennai tomorrow",
    // Japanese test cases
    "日本の天気はどうですか",
    "東京の天気はどうですか",
    "大阪の天気を教えて",
    "京都の天気はどう",
    "オーストラリアの天気はどうですか"
  ];

  console.log('🧪 Testing location extraction:');
  testCases.forEach(text => {
    const location = extractLocationFromText(text);
    console.log(`"${text}" → ${location || 'No location found'}`);
  });
};