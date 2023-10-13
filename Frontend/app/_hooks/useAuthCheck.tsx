'use client'
import { useAuth } from '../_contexts/authContext';
import { useRouter } from 'next/navigation';

export function useAuthCheck() {
  const { user } = useAuth();
  const router = useRouter();

  const isAuthenticated = () => !!user;

  const requireAuth = () => {
    if (!isAuthenticated()) {
      router.push('/login'); // Redirect to the login page
    }
  };

  return { isAuthenticated, requireAuth };
}