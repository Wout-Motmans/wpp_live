import { useState } from "react"
import { useUsers } from "@/app/_contexts/usersContext";
import Cookies from 'js-cookie';

interface User {
	id : number,
	username : string
	isStaff : boolean
}


export default function EditUser({user, close} : { user : User, close : () => void }) {
	const { getUsers } = useUsers();

	const [username, setUsername] = useState(user.username)
	const [password, setPassword] = useState("")
    
    const handleEdit = async () => {
		const response = await fetch('/api/edituser', {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id : user.id, username, password }),
	    });
        if (!response.ok) {
            throw new Error("Error, couldnt edit user")
        }
		getUsers()
        close()
    }

    return (
        <div className='absolute'>
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
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
                <button onClick={handleEdit} className="w-full px-4 py-2 mt-6 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    EDIT USER
                </button>
            </div>
        </div>
        )
}