import { Button, List, Modal, Space, Table, Typography } from "antd";
import Input, { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { ColumnsType } from "antd/es/table";


interface RaceInfo {
    name: string;
    url: string;
}

const columns: ColumnsType<RaceInfo>  = [
	{
		title: 'Klassieker',
		dataIndex: 'name',
	},
]


export default function CustomTour() {
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [races, setRaces] = useState<RaceInfo[]>([])
    const [allRaces, setAllRaces] = useState<RaceInfo[]>([])
  

    useEffect(() => {
        getAllRaces().then(res => setAllRaces(res))
    }, [])


    const showModal = () => {
      setOpen(true);
    };
  
    const handleOk = async () => {
      setConfirmLoading(true);
      setOpen(!await addTourWithKlassiekers(races))
      setConfirmLoading(false);

    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        await findRace(value.toLowerCase())
        getAllRaces().then(res => setAllRaces(res))
    }


    return (
        <>
        <Button onClick={showModal} >Create Custom Tour</Button>

        <Modal
            title="Create Custom Tour"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Table
                rowKey="url"
                columns={columns}
                dataSource={allRaces}
                pagination = {false}
                rowSelection={{
                    type:'checkbox',
                    onChange:(_,records) => {setRaces(records)}
                }}
			/>
            <p className=" mb-3">Give klassieker</p>
            <Search placeholder='add race' onSearch={onSearch} enterButton/>
        </Modal>
        </>
    )
}


const findRace = async (race : string): Promise<RaceInfo> => {
    try {
        const response = await fetch(`/api/addOneDayRace?race_name=${race}`);
        if (!response.ok) throw new Error('addOneDayRace error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('addOneDayRace error:', error);
        throw error;
    }
};


const getAllRaces = async (): Promise<RaceInfo[]> => {
    try {
        const response = await fetch(`/api/getAllKlassiekers`);
        if (!response.ok) throw new Error('getAllKlassiekers error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getAllKlassiekers error:', error);
        throw error;
    }
};

const addTourWithKlassiekers = async (races : RaceInfo[]): Promise<boolean> => {
    try {
        const response = await fetch('/api/addTourWithKlassiekers', {
            method: 'POST',
            headers: {
				'X-CSRFToken': Cookies.get('csrftoken')!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ races }),
        });
        if (!response.ok) return false;
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('addTourWithKlassiekers error:', error);
        throw error;
    }
};