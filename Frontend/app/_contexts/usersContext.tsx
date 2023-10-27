/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';


interface User {
    id : number,
    username: string,
    isStaff: boolean
}

interface UsersContextType {
	users: User[];
    getUsers: () => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function useUsers() {
	const context = useContext(UsersContext);
	if (context === undefined) {
		throw new Error('useUsers must be used within an UsersProvider');
	}
	return context;
}



export function UsersProvider({ children } : { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = async () => {
	    const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers( data );
	}

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, getUsers }}>
            {children}
        </UsersContext.Provider>
  );
}