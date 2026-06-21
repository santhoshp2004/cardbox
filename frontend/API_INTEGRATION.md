# API Integration Guide

## Overview
This guide explains how to use the centralized API configuration and service layer for making API requests throughout the CardBox application.

## File Structure

```
src/
├── config/
│   └── api.config.js          # API configuration and error handling
├── services/
│   └── api.service.js          # API service methods and helpers
├── context/
│   └── AuthContext.jsx         # Authentication context
└── pages/
    └── Login.jsx               # Login implementation example
```

## Configuration Files

### 1. `.env` - Local Development
```
VITE_API_URL=http://localhost:5000
```

### 2. `.env.development` - Development Build
```
VITE_API_URL=http://localhost:5000
```

### 3. `.env.production` - Production Build
```
VITE_API_URL=https://cardbox-production-6a30.up.railway.app
```

### 4. `src/config/api.config.js` - API Configuration
Provides:
- `API_CONFIG.BASE_URL` - Base API URL
- `API_CONFIG.ENDPOINTS` - All API endpoints
- `getAuthHeaders()` - Headers with auth token
- `handleApiError()` - Error handling and messages

### 5. `src/services/api.service.js` - API Service Layer
Provides:
- Generic request handlers: `apiGet()`, `apiPost()`, `apiPut()`, `apiPatch()`, `apiDelete()`
- Service objects: `authService`, `clientsService`, `ordersService`, etc.

## Usage Patterns

### Pattern 1: Using Service Methods (Recommended)

```javascript
import { clientsService } from '../services/api.service';

const handleFetch = async () => {
  try {
    const response = await clientsService.getAll();
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};
```

### Pattern 2: Using Generic API Methods

```javascript
import { apiGet, apiPost, handleApiError } from '../services/api.service';

const handleFetch = async () => {
  try {
    const response = await apiGet('/api/clients');
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};
```

### Pattern 3: Using Direct Endpoints

```javascript
import { API_CONFIG } from '../config/api.config';
import fetch from 'node-fetch';

const handleFetch = async () => {
  const response = await fetch(API_CONFIG.ENDPOINTS.CLIENTS.GET_ALL);
  const data = await response.json();
  console.log(data);
};
```

## Complete Component Example

```javascript
import React, { useState, useEffect } from 'react';
import { clientsService, handleApiError } from '../services/api.service';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all clients on mount
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await clientsService.getAll();
        setClients(response.data || response);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Create new client
  const handleCreateClient = async (clientData) => {
    setIsLoading(true);
    try {
      const response = await clientsService.create(clientData);
      setClients([...clients, response.data]);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Update client
  const handleUpdateClient = async (id, clientData) => {
    setIsLoading(true);
    try {
      const response = await clientsService.update(id, clientData);
      setClients(clients.map(c => c.id === id ? response.data : c));
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Delete client
  const handleDeleteClient = async (id) => {
    setIsLoading(true);
    try {
      await clientsService.delete(id);
      setClients(clients.filter(c => c.id !== id));
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && clients.length === 0) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      {clients.map(client => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <button onClick={() => handleDeleteClient(client.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ClientsList;
```

## Available Services

### Auth Service
```javascript
import { authService } from '../services/api.service';

// Login
await authService.login(email, password);

// Logout
await authService.logout();

// Register
await authService.register(userData);

// Refresh token
await authService.refreshToken();
```

### Clients Service
```javascript
import { clientsService } from '../services/api.service';

// Get all clients
await clientsService.getAll();

// Get one client
await clientsService.getOne(id);

// Create client
await clientsService.create(data);

// Update client
await clientsService.update(id, data);

// Delete client
await clientsService.delete(id);
```

### Orders Service
```javascript
import { ordersService } from '../services/api.service';

// All CRUD operations follow same pattern as Clients
await ordersService.getAll();
await ordersService.getOne(id);
await ordersService.create(data);
await ordersService.update(id, data);
await ordersService.delete(id);
```

### Suppliers Service
```javascript
import { suppliersService } from '../services/api.service';

// All CRUD operations follow same pattern as Clients
```

### Users Service
```javascript
import { usersService } from '../services/api.service';

// All CRUD operations follow same pattern as Clients
```

## Error Handling

### Automatic Error Handling
```javascript
import { handleApiError } from '../services/api.service';

try {
  const response = await clientsService.getAll();
} catch (error) {
  const message = handleApiError(error);
  // Shows user-friendly error messages for:
  // - 401 Unauthorized (redirects to login)
  // - 403 Forbidden
  // - 404 Not Found
  // - 500 Server Error
  // - Network errors
  // - Request errors
}
```

### Custom Error Handling
```javascript
try {
  const response = await clientsService.getAll();
} catch (error) {
  if (error.message.includes('Unauthorized')) {
    // Handle auth error
  } else if (error.message.includes('Network')) {
    // Handle network error
  } else {
    // Handle other errors
  }
}
```

## Authentication

### With Authorization Header
All service methods automatically include the auth token from localStorage:

```javascript
// Token is automatically added to headers
const response = await clientsService.getAll();
```

### Manual Header Access
```javascript
import { getAuthHeaders } from '../services/api.service';

const headers = getAuthHeaders();
console.log(headers);
// Output: { 'Content-Type': 'application/json', 'Authorization': 'Bearer TOKEN' }
```

## Environment Variables

Access environment variables in components:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);
// Development: http://localhost:5000
// Production: https://cardbox-production-6a30.up.railway.app
```

## Best Practices

1. **Always use service methods** when available
2. **Handle loading states** for better UX
3. **Implement error boundaries** in main components
4. **Log errors for debugging** in development
5. **Use try-catch blocks** for proper error handling
6. **Clear errors** before new requests
7. **Disable buttons** during loading
8. **Validate data** before sending to API
9. **Use proper HTTP methods** (GET, POST, PUT, DELETE)
10. **Keep API logic separate** from UI logic

## Testing

### Test Environment Variables
```javascript
// Check if using correct API URL
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Test API Calls
```javascript
// In browser console
import { clientsService } from './services/api.service';
clientsService.getAll().then(r => console.log(r)).catch(e => console.error(e));
```

### Test Authentication
```javascript
// Check stored token
console.log(localStorage.getItem('cardbox_token'));

// Check stored user
console.log(JSON.parse(localStorage.getItem('cardbox_user')));
```

## Troubleshooting

### Issue: "VITE_API_URL is undefined"
- Check `.env` file exists
- Ensure variable name is exactly `VITE_API_URL`
- Variables must start with `VITE_`
- Restart dev server after changing .env

### Issue: "404 API endpoint not found"
- Verify endpoint exists on backend
- Check URL construction in `api.config.js`
- Review backend API documentation

### Issue: "401 Unauthorized"
- Check token is stored in localStorage
- Verify token is not expired
- Try logging out and logging in again

### Issue: "CORS errors"
- Check backend CORS configuration
- Verify correct API URL
- Ensure credentials are included if needed

## Migration Guide

### From Hardcoded URLs to Service Layer

**Before:**
```javascript
const response = await fetch('http://localhost:5000/api/clients');
```

**After:**
```javascript
const response = await clientsService.getAll();
```

## Security Considerations

✅ Environment variables are not exposed to browser
✅ Tokens are stored securely (localStorage)
✅ All requests include authentication headers
✅ HTTPS enforced in production
✅ Error messages don't leak sensitive data

---

**Last Updated**: 2024
**Version**: 1.0
