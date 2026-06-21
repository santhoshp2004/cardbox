/**
 * API Configuration
 * Centralizes all API endpoint management and configuration
 */

const API_URL = "https://cardbox-production-6a30.up.railway.app";

/**
 * API configuration object with all endpoints
 */
export const API_CONFIG = {
  BASE_URL: API_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: `${API_URL}/api/auth/login`,
      LOGOUT: `${API_URL}/api/auth/logout`,
      REGISTER: `${API_URL}/api/auth/register`,
      REFRESH_TOKEN: `${API_URL}/api/auth/refresh`,
    },
    CLIENTS: {
      GET_ALL: `${API_URL}/api/clients`,
      GET_ONE: (id) => `${API_URL}/api/clients/${id}`,
      CREATE: `${API_URL}/api/clients`,
      UPDATE: (id) => `${API_URL}/api/clients/${id}`,
      DELETE: (id) => `${API_URL}/api/clients/${id}`,
    },
    ORDERS: {
      GET_ALL: `${API_URL}/api/orders`,
      GET_ONE: (id) => `${API_URL}/api/orders/${id}`,
      CREATE: `${API_URL}/api/orders`,
      UPDATE: (id) => `${API_URL}/api/orders/${id}`,
      DELETE: (id) => `${API_URL}/api/orders/${id}`,
    },
    SUPPLIERS: {
      GET_ALL: `${API_URL}/api/suppliers`,
      GET_ONE: (id) => `${API_URL}/api/suppliers/${id}`,
      CREATE: `${API_URL}/api/suppliers`,
      UPDATE: (id) => `${API_URL}/api/suppliers/${id}`,
      DELETE: (id) => `${API_URL}/api/suppliers/${id}`,
    },
    USERS: {
      GET_ALL: `${API_URL}/api/users`,
      GET_ONE: (id) => `${API_URL}/api/users/${id}`,
      CREATE: `${API_URL}/api/users`,
      UPDATE: (id) => `${API_URL}/api/users/${id}`,
      DELETE: (id) => `${API_URL}/api/users/${id}`,
    },
  },
};

/**
 * Create a common request configuration with auth token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('cardbox_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

/**
 * Common error handler for API requests
 */
export const handleApiError = (error) => {
  let errorMessage = 'An error occurred. Please try again.';
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;
    
    if (status === 401) {
      errorMessage = 'Unauthorized. Please login again.';
      // Clear auth data on 401
      localStorage.removeItem('cardbox_token');
      localStorage.removeItem('cardbox_user');
      window.location.href = '/login';
    } else if (status === 403) {
      errorMessage = data?.message || 'Forbidden. You do not have permission.';
    } else if (status === 404) {
      errorMessage = 'Resource not found.';
    } else if (status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else {
      errorMessage = data?.message || errorMessage;
    }
  } else if (error.request) {
    // Request made but no response received
    errorMessage = 'No response from server. Please check your internet connection.';
  } else {
    // Error in request setup
    errorMessage = error.message || errorMessage;
  }
  
  return errorMessage;
};

export default API_CONFIG;
