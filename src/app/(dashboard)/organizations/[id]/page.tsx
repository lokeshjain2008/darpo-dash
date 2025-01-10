'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrganization } from '@/hooks/api/useOrganizations';
import { PageHeader } from '@/components/page-header';
import { OrganizationForm } from '@/components/forms/organization/organization-form';
import { Spinner } from '@/components/ui/spinner';

export default function OrganizationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const organizationId = params.id as string;

  const {
    data: organization,
    isLoading,
    isError,
  } = useOrganization(organizationId);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error loading organization',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      router.push('/organizations');
    }
  }, [isError, router, toast]);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (!organization) {
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        title={organization.name}
        description="Manage organization details, properties, and users."
        action={
          <Button variant="outline" onClick={() => router.push('/organizations')}>
            Back to Organizations
          </Button>
        }
      />

      <Tabs defaultValue="details" className="mt-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="mx-auto max-w-2xl">
            <OrganizationForm
              initialData={organization}
              organizationId={organizationId}
            />
          </div>
        </TabsContent>

        <TabsContent value="properties" className="mt-6">
          <div className="text-center text-muted-foreground">
            Property management coming soon...
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="text-center text-muted-foreground">
            User management coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}