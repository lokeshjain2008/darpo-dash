import type { User } from '@/types/models';
import { apiClient } from './client';

export const userApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; organizationId?: string }) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<User>) => {
    const response = await apiClient.post('/users', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<User>) => {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    await apiClient.delete(`/users/${id}`);
  },
};