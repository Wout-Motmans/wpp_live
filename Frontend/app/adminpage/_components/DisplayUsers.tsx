import { Select, Table } from 'antd';
import { useUsers } from '../../_contexts/usersContext';
import { useAuth } from '../../_contexts/authContext';


export default function DisplayUsers() {
    const { users } = useUsers()

    const columns = [
        {
            title: 'User',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'toggle',
        }
    ];

    const data = users.map((user, k) => { return { ...users[k], toggle:Toggle(user) }})

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    )
}


const Toggle =  ( {id, superuser } : {id : number, superuser: boolean}) => {
    const { auth } = useAuth()
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
    } 

    return (
        <Select
            defaultValue = { superuser ? "admin" : "user"}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
                { value: false, label: 'user' },
                { value: true, label: 'admin' },
            ]}
        />
    )
}