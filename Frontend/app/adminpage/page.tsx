'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { UsersProvider } from '../_contexts/usersContext';
import DisplayUsers from './_components/DisplayUsers'
import { useAuth } from '../_contexts/authContext';
import DisplayDb from './_components/DisplayDb';

export default function Home() {
    const { requireAuth, requireAdmin } = useAuthCheck();
    const { isLoggedIn } = useAuth();
    requireAuth().then(requireAdmin);

  
  	return (
        !isLoggedIn
        ?
        <h1>LOADING</h1>
        :
        <UsersProvider>
            <main className="flex flex-col items-center justify-center h-full m-auto">
                <DisplayUsers />
                <DisplayDb />
	        </main>
        </UsersProvider>
  	)
}
  