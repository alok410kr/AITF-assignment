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
- Hosting: Vercel (frontend), Render (backend)

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

### Quick Start

See `QUICK_DEPLOY.md` for a fast 10-minute deployment guide.

### Detailed Guide

See `DEPLOYMENT.md` for complete step-by-step instructions.

### Frontend (Vercel)

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Install: `npm install`
- Root Directory: `frontend`
- Env:
  - `VITE_APP_API_URL=https://your-backend.onrender.com`
  - `VITE_APP_ENVIRONMENT=production`

### Backend (Render/Railway)

- Start: `npm start`
- Build: `npm run build`
- Root Directory: `backend`
- Env:

```env
NODE_ENV=production
OPENWEATHER_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3001
```

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
