/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAuth } from '../_contexts/authContext';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useEffect } from 'react';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { UsersProvider } from '../_contexts/usersContext';



export default function Home() {
    const { authenticate } = useAuth();
    const { requireAuth } = useAuthCheck();
    useEffect(() => {authenticate()}, [])
    requireAuth();



	return (
		<main className=" flex m-12 child:pl-10">
            <DisplayRaces/>
            <UsersProvider>
                <DisplayUsers/>
            </UsersProvider>
		</main>
  	)
}
  



