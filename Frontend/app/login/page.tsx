'use client'
import { useAuth } from '../_contexts/authContext';
import { useState } from 'react';

export default function Home() {
	const { login } = useAuth();

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
  

	return (
		<main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
		<div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='email'
				className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='password'
				className="block w-full px-4 py-2 mt-8 mb-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
			/>
			<button onClick={() => login(email, password)} className="w-full px-4 py-2 mt-6 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
				Login
			</button>
		</div>
		</main>
  	)
}
  