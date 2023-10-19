'use client'
import { Select, Table, Button } from 'antd';
import { useUsers } from '../../_contexts/usersContext';
import { useState } from 'react';
import EditUser from './EditUser';
import Cookies from 'js-cookie';
import AddUser from './AddUser';

interface User {
	id : number,
	username : string
	isStaff : boolean
}


export default function DisplayUsers() {
    const { users } = useUsers()
	const [displayAdd, setDisplayAdd] = useState(false)
	const [displayEdit, setDisplayEdit] = useState(false)
	const [userToEdit, setUserToEdit] = useState<User | null>(null)
	const openUserToEdit = (user:User) => {setUserToEdit(user),setDisplayEdit(true)}
	const closeDisplayEdit = () => setDisplayEdit(false)
	const closeDisplayAdd = () => setDisplayAdd(false)
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
    const data = users.sort((a, b) => a.id - b.id).map((user, k) => { return { ...users[k], toggle:Toggle(user), delete:Delete(user), edit:Edit(user, openUserToEdit) }})

    return (
		<>
		<div className='text-right'>
			<Button className='rounded-full' onClick={() => setDisplayAdd(true)}>ADD</Button>
			<Table columns={columns} dataSource={data} pagination={false} />
		</div>
		{
			displayAdd && <AddUser close={closeDisplayAdd}/>
		}
		{
			displayEdit && userToEdit &&
			<EditUser user={userToEdit} close={closeDisplayEdit}/>
		}
		</>
        
    )
}


const Toggle =  ( {id, isStaff } : User) => {
	const { getUsers } = useUsers();
	const handleChange = async (staff : string) => {
        fetch('/api/changeRole', {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, staff })
	    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error, couldnt change role');
            }
            return res.json();
        })
        .then(_ =>
            getUsers()
        )
        .catch(error => {
            console.error('Change role error:', error);
        });
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
	const { getUsers } = useUsers();
	const handleDelete = async () => {
        fetch('/api/deleteuser', {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
	    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error, couldnt delete user');
            }
            return res.json();
        })
        .then(_ =>
            getUsers()
        )
        .catch(error => {
            console.error('delete user error:', error);
        });
    }

	return <a onClick={handleDelete} className=' text-red-600'>Delete</a>
}



const Edit = (user : User, openUserToEdit : (user : User) => void ) => {
	return <a onClick={() => openUserToEdit(user)} className=' text-blue-600'>Edit</a>
}