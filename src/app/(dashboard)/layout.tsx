import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav user={session.user} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}