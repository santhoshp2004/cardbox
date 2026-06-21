# Production Deployment Guide

## Overview
This React + Vite frontend is configured for production deployment on Vercel with a Railway backend API.

## Environment Configuration

### Development Environment (.env.development)
```
VITE_API_URL=http://localhost:5000
```

### Production Environment (.env.production)
```
VITE_API_URL=https://cardbox-production-6a30.up.railway.app
```

### Local Development (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Configuration

All API calls use environment variables defined in `src/config/api.config.js`:

- **Development**: Uses `http://localhost:5000`
- **Production**: Uses `https://cardbox-production-6a30.up.railway.app`

## Deployment Steps

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Vercel account
- Railway account (for backend)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env.local file**
   ```bash
   VITE_API_URL=http://localhost:5000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:3000`

4. **Build for testing**
   ```bash
   npm run build
   npm run preview
   ```

### Deploy to Vercel

#### Option 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure environment variables in Vercel Dashboard**
   - Navigate to Settings → Environment Variables
   - Add: `VITE_API_URL=https://cardbox-production-6a30.up.railway.app`

#### Option 2: Using GitHub (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Production deployment configuration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `frontend` directory as root
   - Click "Deploy"

3. **Configure Environment Variables**
   - In Vercel Dashboard: Settings → Environment Variables
   - Add environment variable:
     ```
     VITE_API_URL=https://cardbox-production-6a30.up.railway.app
     ```

### Vercel Configuration

The project includes `vercel.json` with recommended settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Build Configuration

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist` directory with:
- Minified code
- Source maps disabled
- Console statements removed
- Optimized bundle size

### Preview Build
```bash
npm run preview
```

Tests the production build locally on `http://localhost:4173`

## Features

### ✅ Environment-aware API URLs
- Automatically uses correct API URL based on environment
- Development: `http://localhost:5000`
- Production: `https://cardbox-production-6a30.up.railway.app`

### ✅ Error Handling
- Comprehensive error handling for failed API requests
- User-friendly error messages
- Automatic redirect on 401 (Unauthorized)
- Proper loading states

### ✅ Authentication
- Token-based authentication
- Secure token storage in localStorage
- Automatic token inclusion in API headers
- Session persistence

### ✅ Verified Endpoints
- **Login**: `/api/auth/login`
- **Clients**: `/api/clients` (GET, POST)
- **Orders**: `/api/orders` (GET, POST)
- **Suppliers**: `/api/suppliers` (GET, POST)
- **Users**: `/api/users` (GET, POST)

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
1. Verify `VITE_API_URL` is set correctly
2. Check that Railway app is running
3. Verify CORS settings on backend

### Issue: "401 Unauthorized"
**Solution:**
1. Clear localStorage and login again
2. Verify token is not expired
3. Check backend authentication service

### Issue: "Build fails on Vercel"
**Solution:**
1. Check Node.js version (recommend 16+)
2. Verify environment variables are set
3. Check build logs in Vercel Dashboard

### Issue: "CORS errors"
**Solution:**
1. Ensure backend includes CORS headers
2. Check if backend is running on correct URL
3. Verify Railway app URL is correct

## Development Workflow

### Creating New API Endpoints

1. **Add to API Config** (`src/config/api.config.js`)
   ```javascript
   ENDPOINTS: {
     MY_NEW_ENDPOINT: `${API_URL}/api/my-endpoint`,
   }
   ```

2. **Add Service Method** (`src/services/api.service.js`)
   ```javascript
   export const myService = {
     getAll: () => apiGet('/api/my-endpoint'),
     getOne: (id) => apiGet(`/api/my-endpoint/${id}`),
   }
   ```

3. **Use in Component**
   ```javascript
   import { myService } from '../services/api.service';
   
   const data = await myService.getAll();
   ```

## Performance Optimization

- Vite provides fast build and dev server
- Code splitting for efficient bundle loading
- Minification and source map removal in production
- React optimizations enabled

## Security

- Environment variables are properly isolated
- Tokens stored securely in localStorage
- HTTPS enforced in production
- Sensitive console logs removed in production

## Monitoring

Monitor your deployment at:
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard

Check logs and metrics to ensure everything is running smoothly.

## Next Steps

1. Deploy backend to Railway (already done)
2. Deploy frontend to Vercel
3. Test all authentication flows
4. Verify API connectivity
5. Monitor for any errors
6. Set up analytics and monitoring

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Review Railway backend logs
3. Use browser DevTools console for frontend errors
4. Check network tab for API calls

---

**Last Updated**: 2024
**Frontend**: React 18 + Vite 5
**Backend**: Node.js/Express on Railway
**Hosting**: Vercel
