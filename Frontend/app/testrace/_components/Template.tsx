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

export default function Template({ users, template, setTemplate } : { users : User[], template : User[], setTemplate : (value:User[]) => void }) {

    const handleAddUser = (user : User) => {
        setTemplate([...template, user])
    }

    return (
        <div className='flex flex-row'>
            <Table
            columns={columns}
            dataSource={template}
            pagination={false}
            />
            <div className='flex flex-col space-y-2'>
            {
                users.map(user => 
                    <button key={user.key} className='border-2 rounded-full p-2' onClick={() => handleAddUser(user)}>{user.username}</button>
                )
            }
            <button onClick={() => setTemplate([])}>RESET</button>
            </div>
        </div>
    );
};