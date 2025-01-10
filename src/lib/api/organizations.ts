import type { Organization } from '@/types/models';
import { apiClient } from './client';

export const organizationApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await apiClient.get('/organizations', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/organizations/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Organization>) => {
    const response = await apiClient.post('/organizations', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Organization>) => {
    const response = await apiClient.patch(`/organizations/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    await apiClient.delete(`/organizations/${id}`);
  },
};