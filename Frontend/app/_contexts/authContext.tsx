'use client'
import { ReactNode, createContext, useContext, useState } from 'react';

interface Auth {
	user: string;
	isLoggedIn: boolean;
	login: (username: string, password: string) => Promise<boolean>;
	logout: () => Promise<boolean>;
	authenticate: () => Promise<boolean>;
	error: string | null;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children } : { children: ReactNode }) {
	const [user, setUser] = useState<string>('');
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

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
				setError('Login failed');
				return false;
			}

			const data = await response.json();
			setUser(data.username);
			setIsLoggedIn(true);
			setError(null);
			return true;
		} catch (error) {
			console.error('Login error:', error);
			setError('Login error');
			setIsLoggedIn(false);
			return false;
		}
	};

	const authenticate = async (): Promise<boolean> => {
		try {
			const response = await fetch('/api/authenticate');

			if (!response.ok) {
				setError('Authentication failed');
				return false;
			}

			const data = await response.json();
			setUser(data.username);
			setIsLoggedIn(true);
			setError(null);
			return true;
		} catch (error) {
			console.error('Authentication error:', error);
			setError('Authentication error');
			setIsLoggedIn(false);
			return false;
		}
	};

	const logout = async (): Promise<boolean> => {
		try {
			const response = await fetch('/api/logout');

			if (!response.ok) {
				setError('Logout failed');
				return false;
			}

			await response.json();
			setUser('');
			setIsLoggedIn(false);
			setError(null);
			return true;
		} catch (error) {
			console.error('Logout error:', error);
			setError('Logout error');
			return false;
		}
	};

	return (
		<AuthContext.Provider value={{ user, isLoggedIn, login, logout, authenticate, error }}>
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