import * as z from 'zod';

export const organizationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;

export const propertySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  address: z.string({
    required_error: 'Address is required',
  }).min(5, 'Address must be at least 5 characters'),
  organizationId: z.string({
    required_error: 'Organization ID is required',
  }),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;