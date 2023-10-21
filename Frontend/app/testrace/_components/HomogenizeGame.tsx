import { List } from "antd"
import Cookies from 'js-cookie';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface User {
	key : number,
	username : string
}

interface Rider {
    rider_name: string,
}

interface ChosenRider {
    user: User,
    rider: Rider
}

const columns: ColumnsType<Rider> = [
    {
      title: 'Riders',
      dataIndex: 'rider_name',
    },
];
  
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}
  
const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        cursor: 'move',
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};


export default function HomogenizeGame({ chosenRace, users, startRiders } : { chosenRace : string, users : User[], startRiders : Rider[] }){
    const [chosenRiders, setChosenRiders] = useState<ChosenRider[]>([])
    
    const handleAddGame = async () => {
        addGame(chosenRace, users, chosenRiders)
    }

    return (
        
        <div className="flex flex-col">
            <div>
                <button onClick={handleAddGame}  className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Start Game</button>
            </div>
        <div className='flex flex-row justify-between space-x-8 w-full'>
            <div className='flex space-x-4'>
            {
                users.map(user =>
                    <List
                    key={user.key}
                    header={<div>{user.username}{user.key}</div>}
                    bordered
                    dataSource={chosenRiders}
                    renderItem={(chose) => chose.user === user &&(
                        <List.Item>
                            {chose.rider.rider_name}
                        </List.Item>
                    )}
                    />
                )
            }
            </div>
            <div>
            {
                <List
                header={<div>Start Riders</div>}
                bordered
                dataSource={startRiders}
                renderItem={(rider) => (
                    <List.Item>
                        {rider.rider_name}
                        <button onClick={}>ADD</button>
                    </List.Item>
                )}
                />
            }
            </div>
        </div>
        </div>
    )
}




const addGame = async (chosenRace:string , chosenUsers: User[], chosenRiders: ChosenRider[]) => {
    const chosenUsersUpdate = chosenUsers.map(user => user.key)
    const chosenRidersUpdate = chosenRiders.map(chosenRider => {return { user_key: chosenRider.user.key }})
    fetch('/api/addgame', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chosenRace, chosenUsersUpdate, chosenRidersUpdate })
    })
    .catch(error => {
        console.error('Add game error:', error);
    });
}

