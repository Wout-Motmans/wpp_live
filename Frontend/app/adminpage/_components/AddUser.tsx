'use client'
import { useUsers } from "@/app/_contexts/usersContext";
import { useState } from "react";
import Cookies from 'js-cookie';



export default function AddUser({close} : {close: () => void}) {
	const { getUsers } = useUsers();
	
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleAdd = async () => {
        fetch('/api/adduser', {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
	    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error, couldnt add user');
            }
            return res.json();
        })
        .then(_ =>{
            getUsers()
            close()
        })
        .catch(error => {
            console.error('Add user error:', error);
        });
    }


	return (
        <div className='absolute h-full w-full top-0 left-0'>
            <div className=' flex flex-col items-center justify-center h-full'>
                <div className="w-full p-6 bg-white rounded-md shadow-md sm:max-w-md">
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='username'
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        className="block w-full px-4 py-2 mt-8 mb-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <button onClick={handleAdd} className="w-full px-4 py-2 mt-6 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                        ADD USER
                    </button>
                </div>
            </div>
        </div>
	)
}