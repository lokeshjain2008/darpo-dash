'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { OrganizationTable } from '@/components/tables/organization-table';
import { useOrganizations } from '@/hooks/api/useOrganizations';
import { Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Spinner } from '@/components/ui/spinner';

export default function OrganizationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    data: organizationsData,
    isLoading,
    isError,
    refetch
  } = useOrganizations({
    page: 1,
    limit: 10,
    search: searchQuery
  });

  if (isError) {
    toast({
      title: 'Error loading organizations',
      description: 'Please try again later.',
      variant: 'destructive',
    });
  }

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        title="Organizations"
        description="Manage your organizations and their properties."
        action={
          <Button onClick={() => router.push('/organizations/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        }
      />

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : organizationsData?.items?.length ? (
          <OrganizationTable
            organizations={organizationsData.items}
            onDelete={refetch}
          />
        ) : (
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No organizations found.
          </div>
        )}
      </div>
    </div>
  );
}