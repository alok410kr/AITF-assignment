# SkySense – AI Weather Concierge

Calm, AI-assisted weather with voice, bilingual support, and day planning.

## Live

- Frontend: https://my-aitf.vercel.app
- Backend: https://aitf.onrender.com
- Health: https://aitf.onrender.com/api/health

## Overview

SkySense blends real-time weather with AI suggestions for outfits, activities, and travel. Voice-first, bilingual (EN/JA), responsive, and production ready.

## Key Features

- Voice input (EN/JA) with fallback to text
- Live weather and 5-day outlook
- AI day-planning suggestions (activities, clothing, travel)
- Bilingual interface with light/dark themes
- Responsive, performant UI with graceful error handling

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Web Speech API
- Backend: Node.js, Express, TypeScript, OpenWeatherMap, Google Gemini, Helmet, Compression, CORS
- Hosting: Vercel (frontend), Railway (backend)

## Prerequisites

- Node.js 18+
- npm or yarn
- API keys: OpenWeatherMap, Google Gemini

## Local Setup

1. Install

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

2. Backend env (`backend/.env`)

```env
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. Frontend env (`frontend/.env`, optional if default localhost)

```env
VITE_APP_API_URL=http://localhost:3001
VITE_APP_ENVIRONMENT=development
```

4. Run dev

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:3001

## Usage

- Voice: click mic (Chrome/Edge), allow microphone, ask “Weather in Tokyo” or “What should I wear in Osaka?”
- Text: type any city and request forecast or outfit ideas.
- Language toggle: EN / JA in the header.

## Deployment

### Complete Deployment Guide

**See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for step-by-step instructions to deploy:**
- Frontend on **Vercel**
- Backend on **Railway**

The guide includes:
- Detailed setup instructions for both platforms
- Environment variable configuration
- CORS setup
- Troubleshooting tips
- Verification steps

### Quick Reference

**Frontend (Vercel):**
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_APP_API_URL` - Your Railway backend URL
  - `VITE_APP_ENVIRONMENT=production`

**Backend (Railway):**
- Root Directory: `backend`
- Build Command: `npm run build`
- Start Command: `npm start`
- Environment Variables:
  - `NODE_ENV=production`
  - `OPENWEATHER_API_KEY` - Your OpenWeather API key
  - `GEMINI_API_KEY` - Your Google Gemini API key
  - `FRONTEND_URL` - Your Vercel frontend URL (set after frontend deployment)
  - `PORT=3001` (optional, Railway auto-sets this)

### Health and checks

- Health: https://aitf.onrender.com/api/health
- Weather sample: https://aitf.onrender.com/api/weather?location=Tokyo

## Troubleshooting

- OpenWeather key new? Wait 10–15 minutes for activation.
- Voice error: use Chrome/Edge, allow mic (lock icon), localhost or HTTPS only.
- Gemini quota errors: create a fresh key or wait for quota reset.
- CORS issues: ensure `FRONTEND_URL` matches your deployed frontend.

## Project Structure

```
frontend/  # React app
backend/   # Express API
```

## License

MIT
