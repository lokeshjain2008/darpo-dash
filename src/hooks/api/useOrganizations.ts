import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationApi } from '@/lib/api';
import type { Organization } from '@/types/models';

export const useOrganizations = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['organizations', params],
    queryFn: () => organizationApi.getAll(params),
  });
};

export const useOrganization = (id: string) => {
  return useQuery({
    queryKey: ['organizations', id],
    queryFn: () => organizationApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: organizationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organization> }) =>
      organizationApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations', id] });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: organizationApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};