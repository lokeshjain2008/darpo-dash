import axios from 'axios';
import { getSession } from 'next-auth/react';
import type { ApiError } from '@/types/api';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.darpo.in';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An error occurred',
      statusCode: error.response?.status || 500,
      error: error.response?.data?.error,
    };

    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);