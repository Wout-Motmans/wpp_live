'use client'
import { useAuth } from '../_contexts/authContext';
import { useRouter } from 'next/navigation';

export function useAuthCheck() {
	const { authenticate } = useAuth();
	const router = useRouter();

	const isAuthenticated = async () : Promise<boolean> => await authenticate();

	const requireAuth = async () => {
		if (! await isAuthenticated()) {
			router.push('/login');
		}
	};

	return { isAuthenticated, requireAuth };
}