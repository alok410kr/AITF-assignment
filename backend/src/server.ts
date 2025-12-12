import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'path'


dotenv.config({ path: path.join(__dirname, '../.env') })


import SkySenseWeatherService from './services/skySenseWeatherService'
import SkySenseAIService from './services/skySenseAiService'


const weatherService = new SkySenseWeatherService()
const aiService = new SkySenseAIService()

const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)


if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.openweathermap.org", "https://generativelanguage.googleapis.com"]
      }
    },
    crossOriginEmbedderPolicy: false
  }))

  
  app.use(compression())
}

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In production, allow Vercel domains and custom FRONTEND_URL
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = process.env.FRONTEND_URL 
        ? [process.env.FRONTEND_URL]
        : [];
      
      // Allow all Vercel app domains
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      
      // Allow custom frontend URL if set
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(null, true); // Allow all in production for flexibility
    }
    
    // In development, allow localhost
    const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'];
    if (allowedOrigins.includes(origin) || !origin) {
      return callback(null, true);
    }
    
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}

app.use(cors(corsOptions))


app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
  })
}

// Health check endpoint with comprehensive system status
app.get('/api/health', (req, res) => {
  const weatherConfigured = weatherService.isConfigured()
  const aiConfigured = aiService.isConfigured()

  // Calculate uptime in seconds
  const uptimeSeconds = process.uptime()

  // Memory usage information
  const memoryUsage = process.memoryUsage()

  // Overall health status
  const isHealthy = weatherConfigured && aiConfigured

  const healthData = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: uptimeSeconds,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    services: {
      weather: {
        status: weatherConfigured ? 'operational' : 'misconfigured',
        configured: weatherConfigured,
        message: weatherConfigured ? 'OpenWeather API ready' : 'Missing OPENWEATHER_API_KEY'
      },
      ai: {
        status: aiConfigured ? 'operational' : 'misconfigured',
        configured: aiConfigured,
        message: aiConfigured ? 'Gemini AI API ready' : 'Missing GEMINI_API_KEY'
      }
    },
    system: {
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024) // MB
      },
      uptime: {
        seconds: Math.floor(uptimeSeconds),
        human: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${Math.floor(uptimeSeconds % 60)}s`
      }
    }
  }

  // Set appropriate HTTP status code
  const statusCode = isHealthy ? 200 : 503

  res.status(statusCode).json(healthData)
})

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { location, lat, lon } = req.query

    if (!weatherService.isConfigured()) {
      return res.status(500).json({
        error: 'Weather service not configured',
        message: 'Please set OPENWEATHER_API_KEY in environment variables'
      })
    }

    let weatherData

    if (lat && lon) {
      // Get weather by coordinates
      weatherData = await weatherService.getWeatherByCoordinates(
        parseFloat(lat as string),
        parseFloat(lon as string)
      )
    } else if (location) {
      // Get weather by location name
      weatherData = await weatherService.getCurrentWeather(location as string)
    } else {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Please provide either location name or coordinates (lat, lon)'
      })
    }

    res.json({
      success: true,
      data: weatherData
    })
  } catch (error) {
    console.error('Weather API error:', error)
    res.status(500).json({
      error: 'Weather fetch failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
})

// Chat endpoint for AI responses
app.post('/api/chat', async (req, res) => {
  try {
    const { message, weatherData, language = 'en' } = req.body

    if (!message) {
      return res.status(400).json({
        error: 'Missing message',
        message: 'Please provide a message in the request body'
      })
    }

    if (!aiService.isConfigured()) {
      return res.status(500).json({
        error: 'AI service not configured',
        message: 'Please set GEMINI_API_KEY in environment variables'
      })
    }

    let response

    if (weatherData) {
      // Generate activity suggestions based on weather
      response = await aiService.generateSuggestions({
        weatherData,
        userQuery: message,
        language: language as 'ja' | 'en'
      })
    } else {
      // Generate conversational response
      const conversationalResponse = await aiService.generateConversationalResponse(
        message,
        undefined,
        language as 'ja' | 'en'
      )

      response = {
        conversationalResponse,
        suggestions: [],
        explanation: '',
        additionalTips: []
      }
    }

    res.json({
      success: true,
      data: response
    })
  } catch (error) {
    console.error('Chat API error:', error)
    res.status(500).json({
      error: 'AI response failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
})

// Get weather and AI suggestions in one request
app.post('/api/weather-chat', async (req, res) => {
  try {
    const { location, message, language = 'en', lat, lon } = req.body

    if (!weatherService.isConfigured() || !aiService.isConfigured()) {
      return res.status(500).json({
        error: 'Services not configured',
        message: 'Please set both OPENWEATHER_API_KEY and GEMINI_API_KEY in environment variables'
      })
    }

    // Get weather data
    let weatherData
    if (lat && lon) {
      weatherData = await weatherService.getWeatherByCoordinates(
        parseFloat(lat),
        parseFloat(lon)
      )
    } else if (location) {
      weatherData = await weatherService.getCurrentWeather(location)
    } else {
      return res.status(400).json({
        error: 'Missing location',
        message: 'Please provide either location name or coordinates'
      })
    }

    // Generate AI suggestions
    const aiResponse = await aiService.generateSuggestions({
      weatherData,
      userQuery: message || 'What should I do today?',
      language: language as 'ja' | 'en'
    })

    res.json({
      success: true,
      data: {
        weather: weatherData,
        ai: aiResponse
      }
    })
  } catch (error) {
    console.error('Weather-chat API error:', error)
    res.status(500).json({
      error: 'Request failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  })
})

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  process.exit(0)
})

// Start server - bind to all interfaces for Railway deployment
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server running on port ${PORT}`)
  console.log(` API endpoints available at /api`)
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(` Environment check:`)
  console.log(`  - OPENWEATHER_API_KEY: ${process.env.OPENWEATHER_API_KEY ? ' Set' : ' Missing'}`)
  console.log(`  - GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? ' Set' : ' Missing'}`)
  console.log(`  - FRONTEND_URL: ${process.env.FRONTEND_URL || 'Not set (using defaults)'}`)
  console.log(`  Weather service: ${weatherService.isConfigured() ? 'Ready' : ' Missing API key'}`)
  console.log(` AI service: ${aiService.isConfigured() ? ' Ready' : ' Missing API key'}`)

  if (process.env.NODE_ENV === 'production') {
    console.log(`🔒 Production security middleware enabled`)
    console.log(`📦 Response compression enabled`)
  }
})