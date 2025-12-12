# Railway Build Fix

## The Problem

Railway was failing with `npm ci` errors because:

1. The `package-lock.json` files were out of sync with `package.json`
2. Railway might be building from the wrong directory

## What I Fixed

1. ✅ Regenerated `package-lock.json` files in both `backend/` and `frontend/`
2. ✅ Updated `backend/Dockerfile` to properly use `npm ci` with lock file
3. ✅ Updated `backend/nixpacks.toml` to use `npm install` (more forgiving)

## Railway Configuration Steps

### Option 1: Use Dockerfile (Recommended)

1. In Railway dashboard → Your backend service
2. Go to **Settings** → **Build**
3. Set **Build Command**: Leave empty (Dockerfile handles it)
4. Set **Start Command**: Leave empty (Dockerfile handles it)
5. **Important**: Set **Root Directory** to: `backend`
6. In **Settings** → **Deploy**, ensure **Builder** is set to `Dockerfile`

### Option 2: Use Nixpacks

1. In Railway dashboard → Your backend service
2. Go to **Settings** → **Build**
3. Set **Root Directory** to: `backend`
4. Railway will auto-detect and use `backend/nixpacks.toml`

## Verify Configuration

After updating Railway settings:

1. Trigger a new deployment
2. Check the build logs
3. The build should now succeed

## If Still Failing

If you still see errors:

1. **Check Root Directory**: Make absolutely sure it's set to `backend` (not root)
2. **Clear Build Cache**: In Railway → Settings → Danger Zone → Clear Build Cache
3. **Force Rebuild**: Trigger a new deployment

## Environment Variables

Make sure these are set in Railway:

- `NODE_ENV=production`
- `OPENWEATHER_API_KEY=your_key`
- `GEMINI_API_KEY=your_key`
- `PORT=3001` (optional, Railway auto-sets)
- `FRONTEND_URL=https://your-frontend.vercel.app` (set after frontend deployment)

---

**The updated files have been pushed to GitHub. Railway should automatically pick up the changes and redeploy.**
