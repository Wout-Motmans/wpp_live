'use client'
import { useAuth } from '../_contexts/authContext';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { UsersProvider } from '../_contexts/usersContext';
import DisplayUsers from './_components/DisplayUsers'
import { useEffect } from 'react';

export default function Home() {
    const { authenticate } = useAuth();
    const { requireAuth } = useAuthCheck();
    requireAuth();

    useEffect(() => {authenticate()}, [])
  
  	return (
        <UsersProvider>
            <main className="relative flex flex-col items-center justify-center h-full overflow-hidden flex-grow">
                <DisplayUsers />
	        </main>
        </UsersProvider>
  	)
}
  