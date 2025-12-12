# Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] All tests pass locally
- [ ] You have OpenWeatherMap API key
- [ ] You have Google Gemini API key
- [ ] Vercel account created (https://vercel.com)
- [ ] Railway account created (https://railway.app)

## Backend Deployment (Railway)

- [ ] Railway project created
- [ ] Backend service configured with root directory: `backend`
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `OPENWEATHER_API_KEY` (your key)
  - [ ] `GEMINI_API_KEY` (your key)
  - [ ] `PORT=3001`
- [ ] Backend deployed successfully
- [ ] Backend URL copied (e.g., `https://xxx.up.railway.app`)
- [ ] Health check works: `https://xxx.up.railway.app/api/health`

## Frontend Deployment (Vercel)

- [ ] Vercel project created
- [ ] Repository connected
- [ ] Root directory set to: `frontend`
- [ ] Environment variables set:
  - [ ] `VITE_APP_API_URL` (your Railway backend URL)
  - [ ] `VITE_APP_ENVIRONMENT=production`
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied (e.g., `https://xxx.vercel.app`)

## Post-Deployment

- [ ] Update Railway `FRONTEND_URL` with Vercel URL
- [ ] Railway redeployed with new CORS settings
- [ ] Frontend loads without errors
- [ ] Weather API test works
- [ ] AI chat test works
- [ ] Voice input works (if testing)
- [ ] No CORS errors in browser console
- [ ] Health endpoint shows all services operational

## Verification Tests

- [ ] Visit frontend URL - page loads
- [ ] Ask "Weather in Tokyo" - weather data appears
- [ ] Ask "What should I wear?" - AI suggestions appear
- [ ] Check browser console - no errors
- [ ] Test language toggle (EN/JA)
- [ ] Test theme toggle (light/dark)

## Troubleshooting

If something doesn't work:

1. [ ] Check Railway logs for backend errors
2. [ ] Check Vercel logs for frontend build errors
3. [ ] Verify all environment variables are set correctly
4. [ ] Test backend health endpoint directly
5. [ ] Clear browser cache and try again
6. [ ] Check CORS settings match frontend URL exactly

---

**Need help?** Refer to [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for detailed instructions.

