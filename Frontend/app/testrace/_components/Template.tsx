
'use client'
import React from 'react';
import { List } from 'antd';


interface User {
    key: number;
    username: string;
}

export function TemplateSetter({ users, template, setTemplate }: { users: User[], template: User[], setTemplate: (value: User[]) => void }) {

    const handleAddUser = (user: User) => {
        setTemplate([...template, user])
    }

    return (
        <div className='flex flex-row space-x-2'>
            <Template template={template}/>
            <div className='flex flex-col space-y-2'>
                {
                    users.map(user =>
                        <button key={user.key} className='border-2 rounded-full p-2' onClick={() => handleAddUser(user)}>{user.username}</button>
                    )
                }
                <button onClick={() => setTemplate([])} className=' underline underline-offset-2 text-red-500'>RESET</button>
            </div>
        </div>
    );
};



export function Template({ template } : { template: User[] }){
    return (
        <List
            header={<div>Order</div>}
            bordered
            dataSource={template}
            renderItem={(user, i) => (
                <List.Item className=" h-20" key={i}>
                    {user.username}
                </List.Item>
            )}
        />
    )
}