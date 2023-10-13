'use client'
import { ReactNode, createContext, useContext, useState } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username : string, email: string, password: string) => Promise<void>;
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

	const register = async (username: string, email: string, password: string) => {
    try {
      	const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});

		if (response.ok) {
			const data = await response.json();
			const { username } = data;
			setUser({ username });
		} else {
			throw new Error('Registration failed');
		}
    } catch (error) {
    	console.error('Register error:', error);
    }
  };

  const login = async (email: string, password: string) => {
	try {
	  const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	  });

	  if (response.ok) {
		const data = await response.json();
		const { username } = data;
		setUser({ username });
	  } else {
		throw new Error('Login failed');
	  }
	} catch (error) {
	  console.error('Login error:', error);
	}
  };

  const logout = () => {
	setUser(null);
  };

  return (
	<AuthContext.Provider value={{ user, login, logout, register }}>
	  {children}
	</AuthContext.Provider>
  );
}