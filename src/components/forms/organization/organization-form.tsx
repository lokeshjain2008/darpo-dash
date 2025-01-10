import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { organizationSchema, type OrganizationFormValues } from '@/lib/validations/organization';
import { useCreateOrganization, useUpdateOrganization } from '@/hooks/api/useOrganizations';

interface OrganizationFormProps {
  initialData?: OrganizationFormValues;
  organizationId?: string;
}

export function OrganizationForm({ initialData, organizationId }: OrganizationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: createOrganization } = useCreateOrganization();
  const { mutateAsync: updateOrganization } = useUpdateOrganization();

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
    },
  });

  async function onSubmit(data: OrganizationFormValues) {
    try {
      setIsLoading(true);
      if (organizationId) {
        await updateOrganization({ id: organizationId, data });
        toast({ title: 'Organization updated successfully' });
      } else {
        const newOrg = await createOrganization(data);
        toast({ title: 'Organization created successfully' });
        router.push(`/organizations/${newOrg.id}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter organization description"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : organizationId ? 'Update' : 'Create'} Organization
        </Button>
      </form>
    </Form>
  );
}