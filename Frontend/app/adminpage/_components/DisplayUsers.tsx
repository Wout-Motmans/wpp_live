'use client'
import { Select, Table, Button, Modal, Form, Input  } from 'antd';
import { useUsers } from '../../_contexts/usersContext';
import { useState } from 'react';
import Cookies from 'js-cookie';

interface User {
	id : number,
	username : string
	isAdmin : boolean
}

type FieldTypeUser = {
	username?: string;
	password?: string;
};


export default function DisplayUsers() {
	const { users, getUsers } = useUsers()
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
			toggle:<Select defaultValue = { user.isAdmin ? "admin" : "user"} style={{ width: 120 }} onChange={() => handleChange(user)} options={[{ value: false, label: 'user' },{ value: true, label: 'admin' }]}/>,
			delete: <a onClick={() => handleDelete(user)} className=' text-red-600'>Delete</a>,
			edit: <a onClick={() => setOpenEdit(user)} className=' text-blue-600'>Edit</a>
		}
	})

	const [form] = Form.useForm()
	const [openEdit, setOpenEdit] = useState<User | null>(null);
	const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
	const [openAdd, setOpenAdd] = useState<boolean>(false);
	const [confirmLoadingAdd, setConfirmLoadingAdd] = useState(false);

	const handleChange = async ({id, isAdmin} : User) => {
		const response = await fetch('/api/changeRole', {
			method: 'POST',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken')!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, isAdmin })
		})
		if (!response.ok) {
			throw new Error('Error, couldnt change role');
		}
		getUsers()
	}
	
	const handleDelete = async ({id} : User) => {
		const response = await fetch('/api/deleteuser', {
			method: 'DELETE',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken')!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id })
		});
		if (!response.ok) {
			throw new Error("Error, couldnt delete user")
		}
		getUsers();
	}

	const handleSubmitEdit = async ({ username, password } : FieldTypeUser) => {
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
		getUsers();
		setConfirmLoadingEdit(false);
		setOpenEdit(null);
	};

	const handleSubmitAdd = async ({username, password} : FieldTypeUser) => {
		setConfirmLoadingAdd(true);
        const response = await fetch('/api/adduser', {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
	    })
		if (!response.ok) {
			throw new Error('Error, couldnt add user');
		}
        getUsers()
		setConfirmLoadingAdd(false);
		setOpenAdd(false);
    }

	return (
		<>
		<div className='text-right'>
			<Button className='rounded-full' onClick={() => setOpenAdd(true)}>ADD</Button>
			<Table columns={columns} dataSource={data} pagination={false} />
		</div>
		<Modal
			title="Add User"
			open={openAdd}
			afterClose={() => form.resetFields()}
			onOk={form.submit}
			confirmLoading={confirmLoadingAdd}
			onCancel={() => setOpenAdd(false)}
		>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={handleSubmitAdd}
				scrollToFirstError={true}
			>
				<Form.Item<FieldTypeUser>
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldTypeUser>
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
		<Modal
			title={`Edit ${openEdit?.username}`}
			open={!!openEdit}
			afterClose={() => form.resetFields()}
			onOk={form.submit}
			confirmLoading={confirmLoadingEdit}
			onCancel={() => setOpenEdit(null)}
		>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={handleSubmitEdit}
				scrollToFirstError={true}
			>
				<Form.Item<FieldTypeUser>
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldTypeUser>
					label="Password"
					name="password"
					rules={[{ required: false, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
		</>
		
	)
}