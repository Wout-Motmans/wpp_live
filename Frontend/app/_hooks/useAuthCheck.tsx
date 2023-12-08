'use client'
import { useAuth } from '../_contexts/authContext';
import { useRouter } from 'next/navigation';

export function useAuthCheck() {
	const { authenticate, isAdmin, isLoggedIn } = useAuth();
	const router = useRouter();

	const isAuthenticated = async () : Promise<boolean> => await authenticate();

	const requireAuth = async () => {
		if (! await isAuthenticated()) {
			router.push('/login');
		}
	};

    const requireAdmin = async () => {
        if (isLoggedIn && !isAdmin) {
            router.push('/');
        }
    }

	return { isAuthenticated, requireAuth, requireAdmin };
}