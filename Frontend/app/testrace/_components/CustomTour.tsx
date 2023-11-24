import { Button, List, Modal, Space, Typography } from "antd";
import Input, { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import { useState } from "react";
import Cookies from 'js-cookie';


interface RaceInfo {
    name: string;
    url: string;
}


export default function CustomTour() {
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [races, setRaces] = useState<RaceInfo[]>([])
  
    const showModal = () => {
      setOpen(true);
    };
  
    const handleOk = async () => {
      setConfirmLoading(true);
      setOpen(!await addTour(races))
      setConfirmLoading(false);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (!races.some(race => race.url.split('/')[0] === value.replaceAll(' ', '-').toLowerCase())) {
            const x = await findRace(value.toLowerCase())
            setRaces(p => [...p, x])
            
        }
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
                <List
                    header={<Input placeholder="Enter name of tour" />}
                    bordered
                    dataSource={races}
                    renderItem={race => (
                        <List.Item>{race.name}</List.Item>
                        
                    )}
                    className=" mb-8"
                />
                <p className=" mb-3">Give one day races</p>
                <Search placeholder='add race' onSearch={onSearch} enterButton/>
            </Modal>
        </>
    )
}


const findRace = async (race : string): Promise<RaceInfo> => {
    try {
        console.log(race)
        const response = await fetch(`/api/findOneDayRace?race_name=${race}`);
        console.log(response)
        if (!response.ok) throw new Error('findOneDayRace error');
        const data = await response.json();
        
        return data;

    } catch (error) {
        console.error('findOneDayRace error:', error);
        throw error;
    }
};



const addTour = async (races : RaceInfo[]): Promise<boolean> => {
    try {
        const response = await fetch('/api/addTour', {
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
        console.error('addTour error:', error);
        throw error;
    }
};