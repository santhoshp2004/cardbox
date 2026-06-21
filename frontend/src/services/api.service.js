/**
 * API Service Layer
 * Provides reusable methods for making API requests with proper error handling
 */

import { getAuthHeaders, handleApiError } from './api.config';

/**
 * Generic GET request handler
 */
export const apiGet = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Generic POST request handler
 */
export const apiPost = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Generic PUT request handler
 */
export const apiPut = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Generic PATCH request handler
 */
export const apiPatch = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Generic DELETE request handler
 */
export const apiDelete = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Authentication service methods
 */
export const authService = {
  login: (email, password) => 
    apiPost('/api/auth/login', { email, password }),
  
  logout: () => 
    apiPost('/api/auth/logout'),
  
  register: (userData) => 
    apiPost('/api/auth/register', userData),
  
  refreshToken: () => 
    apiPost('/api/auth/refresh'),
};

/**
 * Clients service methods
 */
export const clientsService = {
  getAll: () => 
    apiGet('/api/clients'),
  
  getOne: (id) => 
    apiGet(`/api/clients/${id}`),
  
  create: (data) => 
    apiPost('/api/clients', data),
  
  update: (id, data) => 
    apiPut(`/api/clients/${id}`, data),
  
  delete: (id) => 
    apiDelete(`/api/clients/${id}`),
};

/**
 * Orders service methods
 */
export const ordersService = {
  getAll: () => 
    apiGet('/api/orders'),
  
  getOne: (id) => 
    apiGet(`/api/orders/${id}`),
  
  create: (data) => 
    apiPost('/api/orders', data),
  
  update: (id, data) => 
    apiPut(`/api/orders/${id}`, data),
  
  delete: (id) => 
    apiDelete(`/api/orders/${id}`),
};

/**
 * Suppliers service methods
 */
export const suppliersService = {
  getAll: () => 
    apiGet('/api/suppliers'),
  
  getOne: (id) => 
    apiGet(`/api/suppliers/${id}`),
  
  create: (data) => 
    apiPost('/api/suppliers', data),
  
  update: (id, data) => 
    apiPut(`/api/suppliers/${id}`, data),
  
  delete: (id) => 
    apiDelete(`/api/suppliers/${id}`),
};

/**
 * Users service methods
 */
export const usersService = {
  getAll: () => 
    apiGet('/api/users'),
  
  getOne: (id) => 
    apiGet(`/api/users/${id}`),
  
  create: (data) => 
    apiPost('/api/users', data),
  
  update: (id, data) => 
    apiPut(`/api/users/${id}`, data),
  
  delete: (id) => 
    apiDelete(`/api/users/${id}`),
};
