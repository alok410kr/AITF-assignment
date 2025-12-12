# Deployment Guide: Vercel (Frontend) + Railway (Backend)

This guide will help you deploy the SkySense application with the frontend on Vercel and backend on Railway.

## Prerequisites

- GitHub account (code should be pushed to GitHub)
- Vercel account (sign up at https://vercel.com)
- Railway account (sign up at https://railway.app)
- OpenWeatherMap API key (get from https://openweathermap.org/api)
- Google Gemini API key (get from https://makersuite.google.com/app/apikey)

---

## Step 1: Deploy Backend to Railway

### 1.1 Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `alok410kr/AITF-assignment`
5. Railway will detect the project structure

### 1.2 Configure Backend Service

1. Railway should auto-detect the `backend` folder
2. If not, click **"New Service"** → **"GitHub Repo"** → Select your repo
3. In service settings, set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Start Command**: `npm start` (auto-detected)

### 1.3 Set Environment Variables

In Railway, go to your backend service → **Variables** tab, and add:

```env
NODE_ENV=production
OPENWEATHER_API_KEY=your_openweather_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

**Note:** `FRONTEND_URL` will be set after deploying the frontend.

### 1.4 Deploy

1. Railway will automatically start building and deploying
2. Wait for deployment to complete
3. Once deployed, Railway will provide a URL like: `https://your-app-name.up.railway.app`
4. **Copy this URL** - you'll need it for the frontend configuration
5. Test the backend: Visit `https://your-app-name.up.railway.app/api/health`

### 1.5 Get Custom Domain (Optional)

1. In Railway service settings → **Settings** → **Networking**
2. Click **"Generate Domain"** to get a custom domain
3. Or add your own custom domain

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `alok410kr/AITF-assignment`
4. Vercel will detect the project

### 2.2 Configure Frontend Settings

In the project configuration:

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `frontend` (click "Edit" and set to `frontend`)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 2.3 Set Environment Variables

Before deploying, add environment variables in Vercel:

1. In project settings → **Environment Variables**
2. Add the following:

```env
VITE_APP_API_URL=https://your-railway-backend-url.up.railway.app
VITE_APP_ENVIRONMENT=production
```

**Important:** Replace `https://your-railway-backend-url.up.railway.app` with your actual Railway backend URL from Step 1.4.

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Vercel will provide a URL like: `https://your-app-name.vercel.app`
4. **Copy this URL** - you'll need it to update the backend CORS

---

## Step 3: Update Backend CORS

Now that you have the frontend URL, update the backend to allow requests from your Vercel domain.

### 3.1 Update Railway Environment Variables

1. Go back to Railway → Your backend service → **Variables**
2. Add or update:

```env
FRONTEND_URL=https://your-app-name.vercel.app
```

Replace with your actual Vercel frontend URL.

3. Railway will automatically redeploy with the new environment variable

---

## Step 4: Verify Deployment

### 4.1 Test Backend

Visit your Railway backend health endpoint:

```
https://your-railway-backend-url.up.railway.app/api/health
```

You should see a JSON response with service status.

### 4.2 Test Frontend

1. Visit your Vercel frontend URL: `https://your-app-name.vercel.app`
2. Try asking for weather: "Weather in Tokyo"
3. Check browser console for any errors
4. Verify API calls are going to your Railway backend

### 4.3 Test Full Flow

1. Open the frontend in your browser
2. Click the microphone icon (or type a message)
3. Ask: "What's the weather in New York?"
4. Verify you get weather data and AI suggestions

---

## Troubleshooting

### Backend Issues

**Problem:** Backend health check shows "misconfigured"

- **Solution:** Verify `OPENWEATHER_API_KEY` and `GEMINI_API_KEY` are set correctly in Railway

**Problem:** CORS errors in browser console

- **Solution:**
  1. Ensure `FRONTEND_URL` in Railway matches your exact Vercel URL (including `https://`)
  2. Wait for Railway to redeploy after adding the variable
  3. Clear browser cache and try again

**Problem:** Backend not starting

- **Solution:**
  1. Check Railway logs for errors
  2. Verify `PORT` is set (Railway auto-sets this, but you can set it manually)
  3. Ensure `npm run build` completes successfully

### Frontend Issues

**Problem:** Frontend shows "Failed to fetch" or network errors

- **Solution:**
  1. Verify `VITE_APP_API_URL` in Vercel matches your Railway backend URL exactly
  2. Check that Railway backend is running (visit health endpoint)
  3. Ensure no trailing slash in the API URL

**Problem:** Frontend builds but shows blank page

- **Solution:**
  1. Check browser console for errors
  2. Verify `dist` folder is set as output directory in Vercel
  3. Check Vercel build logs for errors

**Problem:** Environment variables not working

- **Solution:**
  1. Vite requires `VITE_` prefix for environment variables
  2. After adding env vars in Vercel, trigger a new deployment
  3. Environment variables are injected at build time, not runtime

### General Issues

**Problem:** API keys not working

- **Solution:**
  - OpenWeatherMap: New keys may take 10-15 minutes to activate
  - Gemini: Check quota limits and ensure key is valid

**Problem:** Voice input not working

- **Solution:**
  - Voice API requires HTTPS in production
  - Use Chrome or Edge browser
  - Allow microphone permissions when prompted

---

## Environment Variables Summary

### Railway (Backend)

```env
NODE_ENV=production
OPENWEATHER_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3001
```

### Vercel (Frontend)

```env
VITE_APP_API_URL=https://your-backend.up.railway.app
VITE_APP_ENVIRONMENT=production
```

---

## Quick Reference URLs

After deployment, you'll have:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app-name.up.railway.app`
- **Health Check**: `https://your-app-name.up.railway.app/api/health`

---

## Next Steps

- Set up custom domains (optional)
- Configure monitoring and alerts
- Set up CI/CD for automatic deployments
- Add error tracking (Sentry, etc.)

---

## Support

If you encounter issues:

1. Check Railway logs: Service → **Deployments** → Click on deployment → **View Logs**
2. Check Vercel logs: Project → **Deployments** → Click on deployment → **View Function Logs**
3. Verify all environment variables are set correctly
4. Test backend health endpoint independently
5. Check browser console for frontend errors
