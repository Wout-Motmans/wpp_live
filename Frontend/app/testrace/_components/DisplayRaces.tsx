
import { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface RaceInfo {
    key: string;
    name: string;
    year: number;
}

export default function DisplayRaces() {
    const [races, setRaces] = useState<RaceInfo[]>([]);
    const [selectedRace, setSelectedRace] = useState<RaceInfo>()

    
    useMemo(() => console.log('selectedRace changed:', selectedRace), [selectedRace]);

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


    return (
        <Table
        columns={columns}
        dataSource={races}
        pagination={false}
        rowSelection={{
            type:'radio',
            onSelect:(record) => setSelectedRace(record)
        }}
        />
    )
}


const getNewestRaces = async (): Promise<RaceInfo[]> => {
    try {
        const response = await fetch('/api/popraces');
    
        if (!response.ok) throw new Error('popraces error');
    
        const data = await response.json();
        const modifiedData: RaceInfo[] = data.map((race: { url: any; name: any; year: any; }) => ({
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