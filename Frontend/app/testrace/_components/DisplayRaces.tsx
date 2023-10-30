
import {  useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface RaceInfo {
    key: string;
    name: string;
    year: number;
}

export default function DisplayRaces({ setChosenRace } : { setChosenRace : (value:string) => void }) {
    const [races, setRaces] = useState<RaceInfo[]>([]);

    useEffect(() => {
        getNewestRaces()
            .then((result) => {
                setRaces(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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


    return (
        <Table
        columns={columns}
        dataSource={races}
        pagination={false}
        rowSelection={{
            type:'radio',
            onSelect:(record) => setChosenRace(record.key)
        }}
        />
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