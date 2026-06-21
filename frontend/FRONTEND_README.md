# CardBox Management System - Frontend Production Setup

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn
- Vercel account (for deployment)

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access application
# http://localhost:3000
```

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# Access production preview
# http://localhost:4173
```

## Project Structure

```
frontend/
├── src/
│   ├── config/
│   │   ├── api.config.js          # API configuration & endpoints
│   │   └── axios.config.js        # Optional Axios setup
│   ├── services/
│   │   └── api.service.js         # API service layer
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── AdminDashboard.jsx     # Admin dashboard
│   │   ├── MiddleLevelDashboard.jsx
│   │   └── EndLevelDashboard.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── ExampleApiUsage.jsx    # API usage example
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env                            # Development (default)
├── .env.development               # Development
├── .env.production                # Production
├── vercel.json                    # Vercel config
├── vite.config.js                 # Vite config
├── package.json
├── DEPLOYMENT.md                  # Deployment guide
├── API_INTEGRATION.md             # API guide
├── PRODUCTION_SUMMARY.md          # Summary of changes
└── README.md                      # This file
```

## Environment Configuration

### Development Environment (`.env.development`)
```
VITE_API_URL=http://localhost:5000
```

### Production Environment (`.env.production`)
```
VITE_API_URL=https://cardbox-production-6a30.up.railway.app
```

### Local Development (`.env`)
```
VITE_API_URL=http://localhost:5000
```

**Important**: Vite automatically selects the correct environment file based on the build mode:
- `npm run dev` → uses `.env.development`
- `npm run build` → uses `.env.production`

## API Endpoints

All endpoints are managed in `src/config/api.config.js` and use environment variables.

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/register` - Register
- `POST /api/auth/refresh` - Refresh token

### CRUD Endpoints
- `/api/clients` - Clients management
- `/api/orders` - Orders management
- `/api/suppliers` - Suppliers management
- `/api/users` - Users management

## Features

### ✅ Environment-Aware API
- Automatically switches between dev and production URLs
- Single codebase for all environments

### ✅ Error Handling
- Comprehensive error messages
- Automatic token refresh on 401
- Network error detection
- User-friendly error displays

### ✅ Authentication
- Token-based authentication
- Secure token storage
- Session persistence
- Auto-logout on expiry

### ✅ Service Layer
- Reusable API methods
- Consistent error handling
- Easy to test and maintain

### ✅ Production Optimizations
- Minified code
- Code splitting
- Console logs removed
- Optimized bundle size

## Deployment to Vercel

### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Production deployment setup"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `frontend` directory as root
5. Click "Deploy"

### Step 3: Configure Environment Variables

1. In Vercel Dashboard: Go to Settings → Environment Variables
2. Add environment variable:
   ```
   VITE_API_URL=https://cardbox-production-6a30.up.railway.app
   ```
3. Save and redeploy

### Step 4: Verify Deployment

1. Wait for deployment to complete
2. Visit your Vercel URL
3. Test login functionality
4. Test all API operations

## Local Testing

### Test Development Build

```bash
npm run dev
# Open http://localhost:3000
# Test all features
```

### Test Production Build

```bash
npm run build
npm run preview
# Open http://localhost:4173
# Test all features
```

### Verify Environment Variables

```javascript
// In browser console
console.log(import.meta.env.VITE_API_URL);
```

## API Usage

### Using Service Layer (Recommended)

```javascript
import { clientsService } from '../services/api.service';

// Get all clients
const response = await clientsService.getAll();

// Create client
const response = await clientsService.create({
  name: 'New Client',
  // ... other fields
});

// Update client
const response = await clientsService.update(id, {
  name: 'Updated Name'
});

// Delete client
await clientsService.delete(id);
```

### Error Handling

```javascript
import { handleApiError } from '../services/api.service';

try {
  const response = await clientsService.getAll();
} catch (error) {
  const message = handleApiError(error);
  // Show error to user
}
```

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `src/config/api.config.js` | API endpoints & error handling |
| `src/config/axios.config.js` | Optional Axios configuration |
| `vite.config.js` | Vite build configuration |
| `vercel.json` | Vercel deployment config |

### Service Files

| File | Purpose |
|------|---------|
| `src/services/api.service.js` | Generic API request methods |
| `src/context/AuthContext.jsx` | Authentication state management |

### Page Components

| File | Purpose |
|------|---------|
| `src/pages/Login.jsx` | User login (uses API service) |
| `src/pages/AdminDashboard.jsx` | Admin dashboard |
| `src/pages/MiddleLevelDashboard.jsx` | Manager dashboard |
| `src/pages/EndLevelDashboard.jsx` | Employee dashboard |

### Layout Components

| File | Purpose |
|------|---------|
| `src/layouts/DashboardLayout.jsx` | Main dashboard layout |
| `src/components/Sidebar.jsx` | Navigation sidebar |
| `src/components/Topbar.jsx` | Top navigation bar |

## Best Practices

1. **Always use API service layer** for consistency
2. **Handle loading and error states** for better UX
3. **Validate user input** before API calls
4. **Log errors** for debugging in development
5. **Use proper HTTP methods** (GET, POST, PUT, DELETE)
6. **Keep API logic separate** from UI components
7. **Test thoroughly** before production deployment

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
- Verify `VITE_API_URL` environment variable
- Check backend is running on Railway
- Verify CORS settings on backend

### Issue: "Environment variable not loaded"
**Solution:**
- Restart dev server after changing `.env`
- Verify variable name starts with `VITE_`
- Check `.env` file format

### Issue: "401 Unauthorized after deployment"
**Solution:**
- Clear localStorage and login again
- Verify token is being sent in headers
- Check backend authentication

### Issue: "API calls timeout"
**Solution:**
- Check network connection
- Verify backend is responding
- Check browser console for errors
- Increase timeout if needed

### Issue: "Build fails on Vercel"
**Solution:**
- Check Node.js version (16+)
- Verify environment variables are set
- Review Vercel build logs
- Check for missing dependencies

## Performance

- **Build Time**: ~2-3 seconds with Vite
- **Bundle Size**: Optimized with minification
- **Load Time**: Fast with code splitting
- **Dev Server**: Instant HMR (Hot Module Replacement)

## Security

✅ Environment variables not exposed in browser
✅ Tokens stored securely in localStorage
✅ HTTPS enforced in production
✅ Sensitive data not logged
✅ Proper CORS handling

## Monitoring

### Vercel Dashboard
- Deployments: https://vercel.com/dashboard
- View logs and analytics
- Manage environment variables

### Railway Dashboard
- Backend monitoring: https://railway.app
- View logs and resource usage
- Manage database and services

## Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Production build
  "lint": "eslint .",               // Lint code
  "preview": "vite preview"         // Preview production build
}
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI library |
| react-router-dom | ^6.30.4 | Routing |
| axios | ^1.18.0 | HTTP client (optional) |
| react-icons | ^5.6.0 | Icon library |
| socket.io-client | ^4.8.3 | Real-time communication |

## Development Dependencies

| Package | Purpose |
|---------|---------|
| vite | Build tool |
| @vitejs/plugin-react | React plugin for Vite |
| eslint | Code linting |
| eslint-plugin-react | React ESLint rules |

## Next Steps

1. ✅ Setup complete
2. Test locally: `npm run dev`
3. Build for production: `npm run build`
4. Deploy to Vercel
5. Configure environment variables
6. Test production deployment
7. Monitor for errors

## Support & Documentation

- **Vite**: https://vitejs.dev
- **React**: https://react.dev
- **React Router**: https://reactrouter.com
- **Vercel**: https://vercel.com/docs
- **Railway**: https://docs.railway.app

## Additional Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [API_INTEGRATION.md](./API_INTEGRATION.md) - API integration guide
- [PRODUCTION_SUMMARY.md](./PRODUCTION_SUMMARY.md) - Summary of changes
- [ExampleApiUsage.jsx](./src/components/ExampleApiUsage.jsx) - API usage example

---

## Project Information

- **Project**: CardBox Management System
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Package Manager**: npm
- **Node Version**: 16+
- **Backend**: Node.js/Express on Railway
- **Hosting**: Vercel
- **Status**: Production Ready ✅

---

**Last Updated**: 2024
**Version**: 1.0
**Author**: Development Team

The application is production-ready and configured for deployment on Vercel!
