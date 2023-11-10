
import {  useEffect, useState } from 'react';
import { Button, Table, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchProps } from 'antd/es/input/Search';
const { Search } = Input;


interface RaceInfo {
    key: string;
    name: string;
    year: number;
}

export default function DisplayRaces({ setChosenRace } : { setChosenRace : (value:string) => void }) {
    const [races, setRaces] = useState<RaceInfo[]>([]);

    useEffect(() => {
        const fetchRaces = async () => {
            setRaces(await getNewestRaces());
        };
        fetchRaces();
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

    function handleCreateCustomTour() {

    }

    
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {

    }

    return (
        <div className='flex flex-col space-y-2'>
            <Button onClick={handleCreateCustomTour} >Create Custom Tour</Button>
            <Search placeholder='add race' onSearch={onSearch} enterButton/>
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


const getNewestRaces = async (): Promise<RaceInfo[]> => {
    try {
        const response = await fetch('/api/popraces');
    
        if (!response.ok) throw new Error('popraces error');
        
        const data = await response.json();
        const modifiedData: RaceInfo[] = data.map((race: { url: string; name: string; year: string; }) => ({
            key: race.url,
            name: race.name,
            year: race.year,
        }));
        
        return modifiedData;

    } catch (error) {
        console.error('Popraces error:', error);
        throw error;
    }
};

const findRace = async (race : string): Promise<RaceInfo[]> => {
    try {
        const response = await fetch('/api/popraces');
    
        if (!response.ok) throw new Error('popraces error');
        
        const data = await response.json();
        const modifiedData: RaceInfo[] = data.map((race: { url: string; name: string; year: string; }) => ({
            key: race.url,
            name: race.name,
            year: race.year,
        }));
        
        return modifiedData;

    } catch (error) {
        console.error('Popraces error:', error);
        throw error;
    }
};