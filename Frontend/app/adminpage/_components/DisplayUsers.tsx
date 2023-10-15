'use client'
import { Select, Table, Button } from 'antd';
import { useUsers } from '../../_contexts/usersContext';
import { useAuth } from '../../_contexts/authContext';
import { useState } from 'react';
import EditUser from './EditUser';

interface User {
	id : number,
	username : string
	isStaff : boolean
}


export default function DisplayUsers() {
    const { users } = useUsers()
	const [displayAdd, setDisplayAdd] = useState(false)
	const closeDisplayAdd = () => setDisplayAdd(false)
	const [displayEdit, setDisplayEdit] = useState(false)
	const [userToEdit, setUserToEdit] = useState<User | null>(null)
	const openUserToEdit = (user:User) => {setUserToEdit(user),setDisplayEdit(true)}
	const closeDisplayEdit = () => setDisplayEdit(false)
    const columns = [
        {
            title: 'User',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'toggle',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        },
    ];

    const data = users.map((user, k) => { return { ...users[k], toggle:Toggle(user), delete:Delete(user), edit:Edit(user, openUserToEdit) }})

    return (
		<>
		<div className=' right-0'>
			<Button className=' rounded-full' onClick={() => setDisplayAdd(true)}>ADD</Button>
			<Table columns={columns} dataSource={data} pagination={false} />
		</div>
		{
			displayAdd && <Add close={closeDisplayAdd}/>
		}
		{
			displayEdit && userToEdit &&
			<EditUser user={userToEdit} close={closeDisplayEdit}/>
		}
		</>
        
    )
}


const Toggle =  ( {id, isStaff } : User) => {
    const { auth } = useAuth()
	const { getUsers } = useUsers();
	const handleChange = async (staff : string) => {
        const response = await fetch('/api/changeRole', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${auth?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, staff }),
	    });
        if (!response.ok) {
            throw new Error("Error, couldnt change role")
        }
		getUsers()
    }

    return (
        <Select
            defaultValue = { isStaff ? "admin" : "user"}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
                { value: false, label: 'user' },
                { value: true, label: 'admin' },
            ]}
        />
    )
}

const Delete = ( { id } : { id : number } ) => {
	const { auth } = useAuth()
	const { getUsers } = useUsers();
	const handleDelete = async () => {
		const response = await fetch('/api/deleteuser', {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${auth?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
	    });
        if (!response.ok) {
            throw new Error("Error, couldnt delete user")
        }
		getUsers()
    }

	return <a onClick={handleDelete} className=' text-red-600'>Delete</a>
}

function Add({close} : {close: () => void}) {
	const { auth } = useAuth()
	const { getUsers } = useUsers();
	
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleAdd = async () => {
		const response = await fetch('/api/adduser', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${auth?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
	    });
        if (!response.ok) {
            throw new Error("Error, couldnt add user")
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
				<button onClick={handleAdd} className="w-full px-4 py-2 mt-6 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
					ADD USER
				</button>
			</div>
		</div>
	)
}

const Edit = (user : User, openUserToEdit : (user : User) => void ) => {
	return <a onClick={() => openUserToEdit(user)} className=' text-blue-600'>Edit</a>
}