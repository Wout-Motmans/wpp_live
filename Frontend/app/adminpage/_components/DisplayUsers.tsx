'use client'
import { Select, Table, Button, Modal, Form, Input  } from 'antd';
import { useUsers } from '../../_contexts/usersContext';
import { useState } from 'react';
import Cookies from 'js-cookie';
import AddUser from './AddUser';

interface User {
	id : number,
	username : string
	isAdmin : boolean
}

type FieldTypeEdit = {
	username?: string;
	password?: string;
};


export default function DisplayUsers() {
	const { users } = useUsers()
	const [displayAdd, setDisplayAdd] = useState(false)
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
	const data = users.sort((a, b) => a.id - b.id).map((user, k) => {
		return {
			...users[k],
			toggle:Toggle(user),
			delete:Delete(user),
			edit: <a onClick={() => showModalEdit(user)} className=' text-blue-600'>Edit</a>
		}
	})

	const [form] = Form.useForm()
	const [openEdit, setOpenEdit] = useState<User | null>(null);
	const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

	const showModalEdit = (user : User) => {
		setOpenEdit(user);
	};

	const handleSubmitEdit = async ({ username, password } : FieldTypeEdit) => {
		setConfirmLoadingEdit(true);
		const response = await fetch('/api/edituser', {
			method: 'POST',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken')!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id : openEdit!.id, username, password }),
		});
		if (!response.ok) {
			throw new Error("Error, couldnt edit user")
		}
		//getUsers();
		setOpenEdit(null);
	};

	const handleCancelEdit = () => {
		console.log('Clicked cancel button');
		setOpenEdit(null);
	};





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
			<Modal
				title={`Edit user`}
				open={!!openEdit}
				onOk={form.submit}
				confirmLoading={confirmLoadingEdit}
				onCancel={handleCancelEdit}
			>
				{
				<Form
					form={form}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ username: openEdit!.username }}
					onFinish={handleSubmitEdit}
					autoComplete="off"
				>
					<Form.Item<FieldTypeEdit>
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
				
					<Form.Item<FieldTypeEdit>
						label="Password"
						name="password"
						rules={[{ required: false, message: 'Please input your password!' }]}
					>
				  		<Input.Password />
					</Form.Item>
			  	</Form>
				}
			</Modal>
		}
		</>
		
	)
}


const Toggle =  ( {id, isAdmin } : User) => {
	const { getUsers } = useUsers();
	const handleChange = async (admin : string) => {
		fetch('/api/changeRole', {
			method: 'POST',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken')!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, admin })
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
			defaultValue = { isAdmin ? "admin" : "user"}
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
