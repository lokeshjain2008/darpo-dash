import { Metadata } from 'next';
import LoginPage from '@/components/auth/login-page';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Login | Darpo Dashboard',
  description: 'Login to access your Darpo dashboard',
};

export default async function LoginRoute() {
  const session = await getSession();

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard');
  }

  return <LoginPage />;
}