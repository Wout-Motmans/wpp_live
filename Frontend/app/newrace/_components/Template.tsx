
'use client'
import React, { useEffect, useState } from 'react';
import { List, Switch } from 'antd';
import { User } from '@/app/types'


export function Template({ selectedUsers, template, setTemplate }: { selectedUsers: User[], template: User[], setTemplate: (value: User[]) => void }) {

    const [templateType, setTemplateType] = useState('none')

    const handleAddUser = (user: User) => {
        setTemplate([...template, user])
    }

    useEffect(() => {
        if (templateType === 'none') {
            setTemplate([])
        }
        if (templateType === 'slang') {
            setTemplate([...selectedUsers, ...[...selectedUsers].reverse()])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedUsers, templateType])


    const onChangeSlang = (checked : boolean) => {
        if (checked) setTemplateType('slang')
        if (!checked) setTemplateType('none')
    }


    return (
        <div className='flex flex-row space-x-2'>
            <List
                header={<div>Order</div>}
                rowKey='key'
                bordered
                dataSource={template.map((user, i) => {return { ...user, key : i}})}
                renderItem={user => (
                    <List.Item className=" h-20">
                        {user.username}
                    </List.Item>
                )}
            />
            <div className='flex flex-col space-y-2'>
                <Switch className='border-4' checked={templateType=='slang'} onChange={onChangeSlang} checkedChildren="Slang" unCheckedChildren="None"/>
                {
                    selectedUsers.map(user =>
                        <button key={user.id} className='border-2 rounded-full p-2' onClick={() => handleAddUser(user)}>{user.username}</button>
                    )
                }
                <button onClick={() => setTemplateType('none')} className=' underline underline-offset-2 text-red-500'>RESET</button>
            </div>
        </div>
    );
};
