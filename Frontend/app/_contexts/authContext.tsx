'use client'
import { ReactNode, createContext, useContext, useState } from 'react';

interface Auth {
	user: string;
	isLoggedIn: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
	authenticate: () => void;
}

const initiaState = {
    user: '',
    isLoggedIn: false,
    login: () => undefined,
    logout: () => undefined,
    authenticate: () => undefined,
};

const AuthContext = createContext<Auth>(initiaState);

export function AuthProvider({ children } : { children: ReactNode }) {
    const [user, setUser] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = async (username: string, password: string) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Login error');
            }
            return res.json();
        })
        .then(res => {
            setUser(res.username);
            setIsLoggedIn(true);
        })
        .catch(error => {
            console.error('Login error:', error);
        });
    };

    const authenticate = async () => {
        fetch('/api/authenticate')
        .then(res => {
            if (!res.ok) {
                throw new Error('Authentication error');
            }
            return res.json();
        })
        .then(res => {
            setUser(res.username);
            setIsLoggedIn(true);
        })
        .catch(error => {
            console.error('Authentication error:', error);
        });
    };

    const logout = async () => {
        fetch('/api/logout')
        .then(res => {
            if (!res.ok) {
                throw new Error('Logout error');
            }
            return res.json();
        })
        .then(_ => {
            setUser('');
            setIsLoggedIn(false);
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, authenticate }}>
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