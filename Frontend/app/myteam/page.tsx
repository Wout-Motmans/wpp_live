'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useEffect, useState } from 'react';
import { useAuth } from '../_contexts/authContext';
import Cookies from 'js-cookie';
import type { MenuProps } from 'antd';
import { RightCircleOutlined, RightCircleFilled } from '@ant-design/icons';
import { List, Menu } from 'antd';
import Loading from '../loading';

interface Game {
    id: number,
    tour__url: string,
}
interface Rider {
    id: number,
    status: 'active'|'sub'|'non_active',
    rider_id : number,
    rider_full_name : string,
}

export default function Home() {
    const { requireAuth } = useAuthCheck();
    const { isLoggedIn } = useAuth();
    requireAuth();
    const [unfinishedGames, setUnfinishedGames] = useState<Game[]>([])
    const [currentGame, setCurrentGame] = useState<string | null>(null);
    const items: MenuProps['items'] = unfinishedGames.map(game => {return {key: game.id.toString(), label:game.tour__url.replaceAll('-',' ').replaceAll('/',' ')}})
    const onClick: MenuProps['onClick'] = (e) => {setCurrentGame(e.key)};
    useEffect(() => {
        getUnfinishedGames().then(res => {setUnfinishedGames(res); setCurrentGame(res[0].id.toString())})
    },[])
    useEffect(() => {
        if (currentGame) {
            getGameMyRiders(currentGame).then(res => {
                setDataSource(res.reduce((acc, rider) => ({ ...acc, [rider.status]: [...acc[rider.status], rider] }), { active: [], sub: [], non_active: [] }));
            })
        }
    }, [currentGame])

    const [dataSource, setDataSource] = useState<{active: Rider[], sub: Rider[], non_active: Rider[]}>({
        active : [],
        sub : [],
        non_active : [],
    });

    const [toSwitch, setToSwitch] = useState<Rider|null>(null)

    return (
        !isLoggedIn
        ?
        <Loading/>
        :
        !currentGame
        ?
        <h1>NO GAMES YET</h1>
        :
        <main className="flex h-full mt-12 mx-auto max-w-7xl">
            <div className=' w-fit'>
                <Menu
                    onClick={onClick}
                    selectedKeys={[currentGame]}
                    mode="vertical"
                    items={items}
                />
            </div>
            <div className='flex flex-row w-full justify-around h-full'>
                
                <List
                header={<div className=' font-bold'>Active</div>}
                rowKey='id'
                bordered
                dataSource={dataSource.active}
                className='flex-1 h-full'
                pagination={false}
                renderItem={rider => 
                    <List.Item className=' flex justify-between w-full'>
                        {rider.rider_full_name}
                    </List.Item>
                }
                />
                <List
                header={<div className=' font-bold'>Sub</div>}
                rowKey='id'
                dataSource={dataSource.sub}
                className='flex-1 h-full'
                bordered
                pagination={false}
                renderItem={rider => 
                    <List.Item>
                        <div>{rider.rider_full_name}</div>
                        {
                            !toSwitch && <RightCircleOutlined style={{fontSize: '20px'}} onClick={() => setToSwitch(rider)} />
                        }
                        {
                            //toSwitch == rider && <RightCircleFilled style={{fontSize: '20px'}} onClick={() => setToSwitch(null)}/>
                        }
                    </List.Item>
                }
                />
                <List
                header={<div className='font-bold'>Non Active</div>}
                rowKey='id'
                dataSource={dataSource.non_active}
                className='flex-1 h-full'
                bordered
                pagination={false}
                renderItem={rider => 
                    <List.Item>
                        {rider.rider_full_name}
                    </List.Item>
                }
                />
            </div>
        </main>
    )

}
    

const getUnfinishedGames = async (): Promise<Game[]> => {
    try {
        const response = await fetch(`/api/getUnfinishedGames`);
        if (!response.ok) throw new Error('getUnfinishedGames error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getUnfinishedGames error:', error);
        throw error;
    }
};


const getGameMyRiders = async (game_id : string): Promise<Rider[]> => {
    try {
        const response = await fetch(`/api/getGameMyRiders?game_id=${game_id}`);
        if (!response.ok) throw new Error('getGameMyRiders error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getGameMyRiders error:', error);
        throw error;
    }
};


const handleChangeStatus = async (game_id: string, id: number, status: 'active'|'subs'|'non_active'): Promise<Rider[]> => {
    const response = await fetch('/api/changeStatus', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_id, id, status })
    })
    if (!response.ok) {
        throw new Error('Error, couldnt change role');
    }
    return await response.json()
}