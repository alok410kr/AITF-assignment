# SkySense – AI Weather Concierge

Calm, AI-assisted weather with voice, bilingual support, and day planning.

## Live

- Frontend: https://aitf-assignment-azure.vercel.app
- Backend: https://aitf-assignment-production.up.railway.app
- Health: https://aitf-assignment-production.up.railway.app/api/health

## Overview

SkySense blends real-time weather with AI suggestions for outfits, activities, and travel. It offers voice-first interaction, bilingual EN/JA support, responsive UI, and production-ready hardening (helmet, compression, CORS).

## Key Features

- Voice input (EN/JA) with text fallback
- Current conditions plus 5-day outlook
- AI day-planning suggestions (activities, clothing, travel)
- Bilingual interface with light/dark themes
- Error handling and loading states for a smooth UX

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Web Speech API
- Backend: Node.js, Express, TypeScript, OpenWeatherMap, Google Gemini, Helmet, Compression, CORS
- Hosting: Vercel (frontend), Railway (backend)

## Prerequisites

- Node.js 18+
- npm or yarn
- API keys: OpenWeatherMap, Google Gemini

## Local Setup

1) Install
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

2) Backend env (`backend/.env`)
```env
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3) Frontend env (`frontend/.env`)
```env
VITE_APP_API_URL=http://localhost:3001
VITE_APP_ENVIRONMENT=development
```

4) Run dev
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:3001

## Usage

- Voice: click the mic (Chrome/Edge), allow microphone, ask “Weather in Tokyo” or “What should I wear in Osaka?”
- Text: type any city and request forecast or outfit ideas.
- Language toggle: EN / JA in the header.

## Deployment

### Complete Deployment Guide
See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for step-by-step instructions to deploy to Vercel (frontend) and Railway (backend), including env vars, CORS, and verification.

### Quick Reference

**Frontend (Vercel)**
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env:
  - `VITE_APP_API_URL=https://aitf-assignment-production.up.railway.app`
  - `VITE_APP_ENVIRONMENT=production`

**Backend (Railway)**
- Root Directory: `backend`
- Build Command: `npm run build`
- Start Command: `npm start`
- Env:
  - `NODE_ENV=production`
  - `OPENWEATHER_API_KEY` (your OpenWeather key)
  - `GEMINI_API_KEY` (your Gemini key)
  - `FRONTEND_URL=https://aitf-assignment-azure.vercel.app`
  - `PORT=3001` (or Railway’s provided PORT)

### Health and checks

- Health: https://aitf-assignment-production.up.railway.app/api/health
- Weather sample: https://aitf-assignment-production.up.railway.app/api/weather?location=Tokyo

## Troubleshooting

- OpenWeather key new? Wait 10–15 minutes for activation.
- Voice issues: use Chrome/Edge, allow mic, HTTPS required in production.
- Gemini quota errors: rotate or wait for quota reset.
- CORS errors: confirm `FRONTEND_URL` exactly matches your Vercel domain.

## Project Structure

```
frontend/  # React app
backend/   # Express API
```

## License

MIT
