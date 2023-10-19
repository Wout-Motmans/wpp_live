
import { useMemo, useState } from 'react';
import { useUsers } from '../../_contexts/usersContext';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface User {
	key : number,
	username : string
}

export default function DisplayUsers() {
    const { users } = useUsers()

    const [selectedUsers, setSelectedUsers] = useState<User[]>([])

    useMemo(() => console.log('selectedUsers changed:', selectedUsers), [selectedUsers]);

    const columns = [
        {
            title: 'User',
            dataIndex: 'username',
        },
    ];
    const data = users.sort((a, b) => a.id - b.id).map(user => {return {key: user.id, username: user.username}})

    return (
		<Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{
            type:'checkbox',
            onChange:(_,records) => setSelectedUsers(records)
        }}
        />
    )
}