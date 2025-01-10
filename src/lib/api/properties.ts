import type { Property } from '@/types/models';
import { apiClient } from './client';

export const propertyApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; organizationId?: string }) => {
    const response = await apiClient.get('/properties', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Property>) => {
    const response = await apiClient.post('/properties', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Property>) => {
    const response = await apiClient.patch(`/properties/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    await apiClient.delete(`/properties/${id}`);
  },
};