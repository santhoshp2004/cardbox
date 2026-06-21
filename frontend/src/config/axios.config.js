/**
 * Axios Instance Configuration (Optional)
 * If you want to use Axios instead of fetch, uncomment imports in components
 * and use these pre-configured instances.
 */

import axios from 'axios';
import { API_CONFIG, handleApiError } from './api.config';

/**
 * Create Axios instance with base configuration
 */
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add auth token to requests
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('cardbox_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handle errors globally
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Clear auth data on 401
        localStorage.removeItem('cardbox_token');
        localStorage.removeItem('cardbox_user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();

/**
 * Usage Example:
 * 
 * import { axiosInstance } from '../config/axios.config';
 * 
 * // GET request
 * const response = await axiosInstance.get('/clients');
 * 
 * // POST request
 * const response = await axiosInstance.post('/clients', { name: 'New Client' });
 * 
 * // PUT request
 * const response = await axiosInstance.put('/clients/1', { name: 'Updated' });
 * 
 * // DELETE request
 * const response = await axiosInstance.delete('/clients/1');
 */

export default axiosInstance;
