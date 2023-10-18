/* eslint-disable react-hooks/exhaustive-deps */
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
            <main className="flex flex-col items-center justify-center h-full m-auto">
                <DisplayUsers />
	        </main>
        </UsersProvider>
  	)
}
  