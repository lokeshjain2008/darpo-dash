'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Building2, Users, Home } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

export default function DashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: 'Organizations',
      description: 'Manage organizations and their properties',
      icon: Building2,
      href: '/organizations',
    },
    {
      title: 'Properties',
      description: 'Manage properties and rooms',
      icon: Home,
      href: '/properties',
    },
    {
      title: 'Users',
      description: 'Manage users and their roles',
      icon: Users,
      href: '/users',
    },
  ];

  return (
    <div className="container py-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to Darpo Dashboard"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Button
              key={card.href}
              variant="outline"
              className="flex h-32 flex-col items-center justify-center space-y-2 p-4 text-center"
              onClick={() => router.push(card.href)}
            >
              <Icon className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}