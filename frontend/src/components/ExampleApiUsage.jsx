/**
 * Example API Usage Component
 * This file demonstrates how to use the API service layer with proper error handling
 * and loading states. Copy this pattern for creating new features.
 */

import React, { useState, useEffect } from 'react';
import { clientsService, handleApiError } from '../services/api.service';

export const ExampleApiUsage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example: Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Using clientsService as example - follow same pattern for other services
        const result = await clientsService.getAll();
        setData(result.data || result);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Example: Create new item
  const handleCreate = async (itemData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await clientsService.create(itemData);
      setData([...data, result.data]);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error('Create error:', err);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Example: Update item
  const handleUpdate = async (id, itemData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await clientsService.update(id, itemData);
      setData(data.map(item => item.id === id ? result.data : item));
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error('Update error:', err);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Example: Delete item
  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await clientsService.delete(id);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error('Delete error:', err);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {/* Your component JSX here */}
    </div>
  );
};

export default ExampleApiUsage;
