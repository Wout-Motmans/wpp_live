'use client'
import { ReactNode, createContext, useContext, useState } from 'react';

interface Auth {
	user: string;
	isLoggedIn: boolean;
	isAdmin: boolean;
	login: (username: string, password: string) => Promise<boolean>;
	logout: () => Promise<boolean>;
	authenticate: () => Promise<boolean>;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children } : { children: ReactNode }) {
	const [user, setUser] = useState<string>('');
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const login = async (username: string, password: string): Promise<boolean> => {
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				return false;
			}

			const data = await response.json();
			setUser(data.username);
			setIsLoggedIn(true);
			setIsAdmin(data.isAdmin)
			return true;
		} catch (error) {
			console.error('Login error:', error);
			setIsLoggedIn(false);
			return false;
		}
	};

	const authenticate = async (): Promise<boolean> => {
		try {
			const response = await fetch('/api/authenticate');

			if (!response.ok) {
				return false;
			}

			const data = await response.json();
			setUser(data.username);
			setIsLoggedIn(true);
			setIsAdmin(data.isAdmin)
			return true;
		} catch (error) {
			console.error('Authentication error:', error);
			setIsLoggedIn(false);
			return false;
		}
	};

	const logout = async (): Promise<boolean> => {
		try {
			const response = await fetch('/api/logout');

			if (!response.ok) {
				return false;
			}

			await response.json();
			setUser('');
			setIsLoggedIn(false);
			setIsAdmin(false)
			return true;
		} catch (error) {
			console.error('Logout error:', error);
			return false;
		}
	};

	return (
		<AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout, authenticate }}>
			{children}
		</AuthContext.Provider>
	);
}


export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}