
import { useUsers } from '../../_contexts/usersContext';
import { Table } from 'antd';


type User = {
	key : number,
	username : string
}

export default function DisplayUsers({ setChosenUsers } : { setChosenUsers : (value:User[]) => void }) {
    const { users } = useUsers()

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
        bordered
        dataSource={data}
        pagination={false}
        rowSelection={{
            type:'checkbox',
            onChange:(_,records) => setChosenUsers(records)
        }}
        />
    )
}