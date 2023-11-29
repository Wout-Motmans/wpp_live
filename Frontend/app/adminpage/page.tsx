'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { UsersProvider } from '../_contexts/usersContext';
import DisplayUsers from './_components/DisplayUsers'
import { useAuth } from '../_contexts/authContext';

export default function Home() {
    const { requireAuth, requireAdmin } = useAuthCheck();
    const { isLoggedIn } = useAuth();
    requireAuth();
    requireAdmin();

  
  	return (
        !isLoggedIn
        ?
        <h1>LOADING</h1>
        :
        <UsersProvider>
            <main className="flex flex-col items-center justify-center h-full m-auto">
                <DisplayUsers />
	        </main>
        </UsersProvider>
  	)
}
  