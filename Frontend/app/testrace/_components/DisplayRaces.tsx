
import {  useEffect, useState } from 'react';
import { Button, Table, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchProps } from 'antd/es/input/Search';
import CustomTour from './CustomTour';
const { Search } = Input;


interface RaceInfo {
    key: number;
    name: string;
    year: number;
}


export default function DisplayRaces({ setChosenRace } : { setChosenRace : (value:number) => void }) {
    const [races, setRaces] = useState<RaceInfo[]>([]);

    useEffect(() => {
        getPossibleRaces().then(res => setRaces(res))
    }, []);

    const columns: ColumnsType<RaceInfo> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Year',
            dataIndex: 'year',
        },
    ];

    const [searchLoading, setSearchLoading] = useState(false);
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        setSearchLoading(true)
        await addTour(value.toLowerCase())
        setSearchLoading(false)
        getPossibleRaces().then(res => setRaces(res))
    }

    return (
        <div className='flex flex-col space-y-2'>
            <CustomTour/>
            <Search placeholder='add tour' onSearch={onSearch} enterButton loading={searchLoading}/>
            <Table
                columns={columns}
                bordered
                dataSource={races}
                pagination={false}
                rowSelection={{
                    type:'radio',
                    onSelect:(record) => setChosenRace(record.key)
                }}
            />
        </div>
    )
}


const getPossibleRaces = async (): Promise<RaceInfo[]> => {
    try {
        const response = await fetch('/api/getPossibleRaces');
        console.log(response)
        if (!response.ok) throw new Error('possible races error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('possible races error:', error);
        throw error;
    }
};


const addTour = async (tour : string): Promise<RaceInfo> => {
    try {
        const response = await fetch(`/api/addTour?tour_name=${tour}`);
        if (!response.ok) throw new Error('addTour error');
        const data = await response.json();
        
        return data;

    } catch (error) {
        console.error('addTour error:', error);
        throw error;
    }
};
