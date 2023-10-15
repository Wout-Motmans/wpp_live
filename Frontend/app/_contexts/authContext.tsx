'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

interface User {
  username: string;
}

interface Auth {
	token : string
}

interface AuthContextType {
	user: User | null;
	auth: Auth | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}



export function AuthProvider({ children } : { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  const login = async (username: string, password: string) => {
	try {
	  const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	  });

	  if (response.ok) {
		const data = await response.json();
		const { token } = data;
		setUser({ username });
		setAuth({ token });
	  } else {
		throw new Error('Login failed');
	  }
	} catch (error) {
	  console.error('Login error:', error);
	}
  };

  const logout = () => {
	setUser(null);
	setAuth(null);
  };

  return (
	<AuthContext.Provider value={{ user, auth, login, logout }}>
	  {children}
	</AuthContext.Provider>
  );
}