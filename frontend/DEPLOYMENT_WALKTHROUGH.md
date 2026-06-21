# Step-by-Step Deployment Walkthrough

## Phase 1: Local Testing (Before Deployment)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```
✅ Verifies all packages are installed correctly

### Step 2: Start Development Server
```bash
npm run dev
```
Expected output:
```
VITE v5.4.10  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

✅ Verifies development environment works

### Step 3: Test Login Functionality
1. Open http://localhost:3000
2. You should see the login page with CardBox branding
3. Try logging in with test credentials
4. Check browser console: `console.log(import.meta.env.VITE_API_URL)`
   - Should show: `http://localhost:5000`
5. Open Network tab and monitor API calls
6. All calls should go to `http://localhost:5000`

✅ Verifies API calls use correct development URL

### Step 4: Build for Production
```bash
npm run build
```
Expected output:
```
✓ 1234 modules transformed.
dist/index.html                0.45 kB │ gzip:   0.30 kB
dist/assets/index-XXX.js      245.67 kB │ gzip:  68.45 kB

✓ built in 2.45s
```

✅ Verifies production build succeeds

### Step 5: Preview Production Build
```bash
npm run preview
```
Expected output:
```
➜  Local:   http://localhost:4173/
```

1. Open http://localhost:4173
2. Test login again
3. Check console: `console.log(import.meta.env.VITE_API_URL)`
   - Should still show: `http://localhost:5000` (because we used .env for dev)
4. Verify everything works

✅ Verifies production build works locally

---

## Phase 2: Prepare for Vercel Deployment

### Step 1: Commit Code to Git
```bash
git add .
git commit -m "Production deployment setup - API configuration"
git push origin main
```

Ensure all these files are committed:
- ✅ `.env`
- ✅ `.env.development`
- ✅ `.env.production`
- ✅ `src/config/api.config.js`
- ✅ `src/services/api.service.js`
- ✅ `src/pages/Login.jsx` (updated)
- ✅ `src/context/AuthContext.jsx` (updated)
- ✅ `vite.config.js` (updated)
- ✅ `vercel.json`
- ✅ All documentation files

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel access to repositories

✅ Vercel account ready

---

## Phase 3: Vercel Deployment

### Step 1: Import Project
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your CardBox repository
4. Click "Import"

### Step 2: Configure Project Settings
1. **Framework**: Vercel should auto-detect "Vite"
2. **Root Directory**: Select `frontend` folder
3. **Build Command**: `npm run build` (should be auto-filled)
4. **Output Directory**: `dist` (should be auto-filled)
5. **Install Command**: `npm install` (should be auto-filled)

✅ Configuration complete

### Step 3: Set Environment Variables
**CRITICAL STEP**:
1. Scroll down to "Environment Variables"
2. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://cardbox-production-6a30.up.railway.app`
   - **Environments**: Select "Production"
3. Click "Add"

✅ Environment variable configured

### Step 4: Deploy
1. Click "Deploy" button
2. Wait for build to complete (usually 1-2 minutes)
3. You'll see: "Congratulations! Your project has been successfully deployed"

✅ Project deployed!

---

## Phase 4: Verify Production Deployment

### Step 1: Open Production URL
1. Vercel will show your production URL (e.g., `cardbox-frontend.vercel.app`)
2. Click the link or copy it

### Step 2: Test Login Page
1. Page should load correctly
2. Check console: `console.log(import.meta.env.VITE_API_URL)`
   - Should show: `https://cardbox-production-6a30.up.railway.app`
3. Try login with test credentials

### Step 3: Monitor API Calls
1. Open DevTools → Network tab
2. Try login
3. Look for API call to `/api/auth/login`
4. Verify request URL is: `https://cardbox-production-6a30.up.railway.app/api/auth/login`
5. Check response status (should be 200 for success)

✅ API calls using production URL

### Step 4: Test Dashboard
1. After successful login, dashboard should load
2. Verify you can see:
   - Sidebar with navigation
   - Dashboard content
   - User information
3. Test navigation to different pages

✅ Dashboard functioning correctly

### Step 5: Test Error Handling
1. Login with invalid credentials
2. Should see error message
3. Logout button should work
4. Try accessing dashboard without login - should redirect to login

✅ Error handling working

---

## Phase 5: Monitoring & Maintenance

### Step 1: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Check:
   - Deployments tab - see deployment history
   - Analytics tab - monitor traffic
   - Settings tab - manage environment variables

### Step 2: View Deployment Logs
1. Click on latest deployment
2. View build logs
3. Monitor for any warnings or errors

### Step 3: Railway Backend
1. Go to https://railway.app/dashboard
2. Select your CardBox app
3. Check:
   - Deployment status
   - Logs
   - Resource usage
   - Database status

### Step 4: Set Up Error Monitoring (Optional)
1. Consider adding Sentry for error tracking
2. Or use Vercel's built-in error reporting

✅ Deployment monitored

---

## Testing Checklist

### Basic Functionality
- [ ] Login page loads
- [ ] Can login with valid credentials
- [ ] Invalid credentials show error
- [ ] Dashboard displays after login
- [ ] User name shows in sidebar
- [ ] Can logout

### API Integration
- [ ] API calls use production URL
- [ ] Login API works
- [ ] Authorization header includes token
- [ ] 401 error redirects to login
- [ ] All CRUD endpoints work

### Performance
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Network requests complete
- [ ] No broken images or styles
- [ ] Responsive on mobile

### Error Handling
- [ ] Network errors show messages
- [ ] Server errors handled gracefully
- [ ] Invalid input rejected
- [ ] Timeouts handled
- [ ] Logout clears data

---

## Rollback Procedure

If something goes wrong:

### Immediate Actions
1. Check Vercel dashboard for errors
2. Review deployment logs
3. Check Railway backend status

### Rollback Steps
1. Go to Vercel dashboard
2. Click on project
3. Go to Deployments
4. Find previous successful deployment
5. Click "..." menu
6. Select "Redeploy"
7. Previous version will be deployed

### Investigate Issues
1. Check environment variables are correct
2. Verify backend URL is reachable
3. Check CORS settings on backend
4. Review browser console for errors
5. Review Vercel build logs

---

## Troubleshooting Guide

### Issue: Build fails on Vercel

**Check**:
1. Node version (should be 16+)
2. All dependencies in package.json
3. Environment variable `VITE_API_URL` is set
4. No syntax errors in code

**Solution**:
```bash
# Locally verify build works
npm run build
npm run preview
```

### Issue: Login redirects to Railway URL

**Check**:
1. `VITE_API_URL` environment variable in Vercel
2. Ensure it's set to production Railway URL
3. No local `.env` overrides

**Solution**:
1. Go to Vercel project settings
2. Verify `VITE_API_URL` is correct
3. Redeploy

### Issue: "Cannot connect to backend"

**Check**:
1. Railway app is running
2. Production URL is correct
3. No firewall blocking connections

**Solution**:
1. Verify Railway app status
2. Test connection: `curl https://cardbox-production-6a30.up.railway.app/api/auth/login`
3. Check CORS settings on backend

### Issue: "401 Unauthorized" stuck in loop

**Check**:
1. Backend token validation
2. Token format in headers
3. localStorage is working

**Solution**:
1. Clear browser cache/localStorage
2. Login again
3. Check backend token validation logic

---

## Post-Deployment Checklist

- [ ] Production URL works
- [ ] Login functionality verified
- [ ] API calls to Railway working
- [ ] Dashboard displays correctly
- [ ] All error handling working
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Monitoring in place
- [ ] Team notified of deployment

---

## Important URLs

| Service | URL |
|---------|-----|
| Production Frontend | Your Vercel URL |
| Backend API | https://cardbox-production-6a30.up.railway.app |
| Vercel Dashboard | https://vercel.com/dashboard |
| Railway Dashboard | https://railway.app/dashboard |
| Git Repository | Your GitHub URL |

---

## Success Criteria

✅ **Deployment is successful when**:
1. Production URL is accessible
2. Login page loads without errors
3. Login with valid credentials works
4. Dashboard displays user-specific content
5. API calls use production Railway URL
6. Logout works and clears session
7. Error messages display correctly
8. No console errors
9. Responsive on mobile devices
10. Performance is acceptable

---

## Next Steps After Deployment

1. **Announce Deployment**: Notify team/users
2. **Monitor**: Watch for errors in first 24 hours
3. **Get Feedback**: Collect user feedback
4. **Plan Updates**: Identify improvements
5. **Iterate**: Deploy updates as needed

---

**Status**: Ready for Deployment 🚀

Your CardBox Management System frontend is configured and ready to be deployed to Vercel!

For questions, refer to:
- `DEPLOYMENT.md` - Detailed deployment guide
- `API_INTEGRATION.md` - API integration reference
- `QUICK_REFERENCE.md` - Quick commands and tips
