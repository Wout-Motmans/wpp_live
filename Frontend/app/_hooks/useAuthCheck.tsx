'use client'
import { useEffect } from 'react';
import { useAuth } from '../_contexts/authContext';
import { useRouter } from 'next/navigation';

export function useAuthCheck() {
    const { isLoggedIn, authenticate } = useAuth();
    const router = useRouter();

    

    const isAuthenticated = () => isLoggedIn;

    const requireAuth = () => {
        authenticate()
        if (!isAuthenticated()) {
            router.push('/login');
        }
    };

    return { isAuthenticated, requireAuth };
}