/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState } from 'react';
import { Table } from 'antd';


interface User {
    key: number;
    username: string;
}

const columns = [
    {
      title: 'Template',
      dataIndex: 'username',
    }
];

export default function Template({ users, setTemplate } : { users : User[], setTemplate : (value:User[]) => void }) {
    const [dataSource, setDataSource] = useState<User[]>([]);

    const handleAddUserToTemplate = (user : User) => {
        setDataSource(prev => [...prev, user])
        setTemplate(dataSource)
    }

    return (
        <div className='flex flex-row'>
            <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            />
            <div className='flex flex-col space-y-2'>
            {
                users.map(user => 
                    <button key={user.key} className='border-2 rounded-full p-2' onClick={() => handleAddUserToTemplate(user)}>{user.username}</button>
                )
            }
            <button onClick={() => setDataSource([])}>RESET</button>
            </div>
        </div>
    );
};