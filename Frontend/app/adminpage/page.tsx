'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { UsersProvider } from '../_contexts/usersContext';
import DisplayUsers from './_components/DisplayUsers'

export default function Home() {
    const { requireAuth, requireAdmin } = useAuthCheck();
    requireAuth();
    requireAdmin();

  
  	return (
        <UsersProvider>
            <main className="flex flex-col items-center justify-center h-full m-auto">
                <DisplayUsers />
	        </main>
        </UsersProvider>
  	)
}
  