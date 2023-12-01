
import { useUsers } from '../../_contexts/usersContext';
import { Table } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

type User = {
	id : number;
	username : string;
}
const columns: ColumnsType<User>  = [
	{
		title: 'User',
		dataIndex: 'username',
	},
]
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

export default function DisplayUsers({ setChosenUsers } : { setChosenUsers : (value:User[]) => void }) {
	const { users } = useUsers()

	const [dataSource, setDataSource] = useState<User[]>([])
	const [selectedUsers, setSelectedUsers] = useState<User[]>([])

	useEffect(() => {
		setDataSource(users.sort((a, b) => a.id - b.id).map((user, i) => {return {key : i, ...user}}))
	}, [users])

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 1,
			},
		}),
	);
	
	useEffect(() => {
		setChosenUsers(dataSource.filter(user => selectedUsers.includes(user)))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSource, selectedUsers])

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
		  	setDataSource((prev) => {
				const activeIndex = prev.findIndex((i) => i.id === active.id);
				const overIndex = prev.findIndex((i) => i.id === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
		  	});
		}
	};


	return (
		<DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      		<SortableContext
        		// rowKey array
        		items={dataSource.map((i) => i.id)}
        		strategy={verticalListSortingStrategy}
      		>
				<Table
					components={{
					body: {
						row: Row,
					},
					}}
					rowKey="key"
					columns={columns}
					dataSource={dataSource}
					pagination = {false}
					rowSelection={{
						type:'checkbox',
						onChange:(_,records) => {setSelectedUsers(records)}
					}}
				/>
      		</SortableContext>
    	</DndContext>
	)
}