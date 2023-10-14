'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { UsersProvider } from '../_contexts/usersContext';
import DisplayUsers from './_components/DisplayUsers'

export default function Home() {
    const { requireAuth } = useAuthCheck();
    requireAuth();

  
  	return (
        <UsersProvider>
            <main className="relative flex flex-col items-center justify-center h-full overflow-hidden flex-grow">
                <DisplayUsers />
	        </main>
        </UsersProvider>
  	)
}
  