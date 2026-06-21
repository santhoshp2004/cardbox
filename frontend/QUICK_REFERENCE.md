# Quick Reference Guide

## Environment Variables

### Development
```bash
VITE_API_URL=http://localhost:5000
```

### Production
```bash
VITE_API_URL=https://cardbox-production-6a30.up.railway.app
```

## Commands

```bash
# Install dependencies
npm install

# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build           # Create production build
npm run preview         # Preview production build (port 4173)

# Code quality
npm run lint            # Lint code
```

## API Configuration Files

| File | Purpose |
|------|---------|
| `src/config/api.config.js` | All endpoints & error handling |
| `src/services/api.service.js` | Generic API methods & services |
| `src/config/axios.config.js` | Optional Axios setup |

## Common API Usage

```javascript
// Import service
import { clientsService } from '../services/api.service';

// GET all
const response = await clientsService.getAll();

// GET one
const response = await clientsService.getOne(id);

// CREATE
const response = await clientsService.create(data);

// UPDATE
const response = await clientsService.update(id, data);

// DELETE
await clientsService.delete(id);

// Error handling
try {
  const response = await clientsService.getAll();
} catch (error) {
  console.error(error.message);
}
```

## Available Services

- `authService` - Authentication
- `clientsService` - Clients CRUD
- `ordersService` - Orders CRUD
- `suppliersService` - Suppliers CRUD
- `usersService` - Users CRUD

## Deployment Checklist

1. [ ] All code committed and pushed to GitHub
2. [ ] Repository connected to Vercel
3. [ ] `frontend` directory selected as root
4. [ ] Environment variable set in Vercel Dashboard:
   ```
   VITE_API_URL=https://cardbox-production-6a30.up.railway.app
   ```
5. [ ] Build succeeds on Vercel
6. [ ] Test production URL
7. [ ] Verify API calls to Railway

## Key Files

- `Login.jsx` - Updated to use API_CONFIG
- `AuthContext.jsx` - Enhanced with error handling
- `vite.config.js` - Production optimizations
- `.env.production` - Production API URL
- `vercel.json` - Vercel configuration

## Documentation

- `DEPLOYMENT.md` - Full deployment guide
- `API_INTEGRATION.md` - API integration guide
- `PRODUCTION_SUMMARY.md` - Summary of all changes
- `FRONTEND_README.md` - Complete frontend docs
- `VERIFICATION_CHECKLIST.md` - Deployment checklist

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Environment variable not loaded | Restart dev server |
| Cannot connect to backend | Check VITE_API_URL, verify backend running |
| 401 Unauthorized | Clear localStorage, login again |
| Build fails on Vercel | Check Node version (16+), check logs |
| CORS errors | Verify backend CORS config |

## Direct Links

- **Development**: http://localhost:3000
- **Preview**: http://localhost:4173
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
- **Production**: Your Vercel URL

## File Structure

```
frontend/
├── .env*                           # Environment files
├── src/
│   ├── config/
│   │   ├── api.config.js          # ✅ API config
│   │   └── axios.config.js        # ✅ Axios (optional)
│   ├── services/
│   │   └── api.service.js         # ✅ API services
│   ├── context/
│   │   └── AuthContext.jsx        # ✅ Auth context
│   └── pages/
│       └── Login.jsx              # ✅ Login with API
├── vite.config.js                 # ✅ Vite config
└── vercel.json                    # ✅ Vercel config
```

## Important Notes

1. **Environment Variables**: Start with `VITE_` to be accessible in browser
2. **Build Mode**: Automatically selects correct `.env` file
3. **API URL**: Changes automatically based on environment
4. **Token**: Automatically included in all API requests
5. **Errors**: Comprehensive error handling with user messages

## Testing

```javascript
// In browser console
console.log(import.meta.env.VITE_API_URL);  // Check API URL
console.log(localStorage.getItem('cardbox_token'));  // Check token
```

## Next Steps

1. ✅ Configuration complete
2. Run `npm install && npm run dev`
3. Test login at http://localhost:3000
4. Run `npm run build` to create production build
5. Deploy to Vercel
6. Set environment variables
7. Test production deployment

---

**Status**: ✅ Production Ready
**Last Updated**: 2024
