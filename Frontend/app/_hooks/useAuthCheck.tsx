'use client'
import { useAuth } from '../_contexts/authContext';
import { useRouter } from 'next/navigation';

export function useAuthCheck() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    

    const isAuthenticated = () => isLoggedIn;

    const requireAuth = () => {
        if (!isAuthenticated()) {
        router.push('/login');
        }
    };

    return { isAuthenticated, requireAuth };
}