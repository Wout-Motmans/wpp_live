/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAuth } from '../_contexts/authContext';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useEffect, useState } from 'react';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { UsersProvider } from '../_contexts/usersContext';
import { Divider, List, Typography } from 'antd';

type User = {
	key : number,
	username : string
}

type Rider = {
    rider_name: string,
    rider_url: string,
    team_name: string,
    team_url: string,
}

type chosenRider = {
    user: User,
    rider: Rider
}


export default function Home() {
    //const { authenticate } = useAuth();
    //const { requireAuth } = useAuthCheck();
    //useEffect(() => {authenticate()}, [])
    //requireAuth();

    const [chosenRace, setChosenRace] = useState<string>('')
    const [chosenUsers, setChosenUsers] = useState<User[]>([])
    const [startRiders, setStartRiders] = useState<Rider[]>([])
    const [displayGame, setDisplayGame] = useState<boolean>(false)
    const [chosenRiders, setChosenRiders] = useState<chosenRider[]>([])

    const startGame = async () => {
        setStartRiders(await getStartRiders(chosenRace))
    }

    useEffect(() => {
        for (let i = 0; i < 60; i++) {
            const user = chosenUsers[i % chosenUsers.length];
            const rider = startRiders[i];
            setChosenRiders(prev => [...prev, {user, rider}])
          }
    }, [startRiders])


	return (
        <UsersProvider>
            <main className="mx-20 flex m-12">
                {
                    !displayGame
                    ?
                    <>
                    <DisplayRaces setChosenRace={setChosenRace}/>
                    <DisplayUsers setChosenUsers={setChosenUsers}/>
                    <button onClick={() => {startGame(); setDisplayGame(true)}}  className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Start Game</button>
                    </>
                    :
                    <div className='flex flex-row justify-between space-x-8 w-full'>
                        <div className='flex space-x-4'>
                        {
                            chosenUsers.map(user =>
                                <List
                                key={user.key}
                                header={<div>{user.username}</div>}
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
                                </List.Item>
                            )}
                            />
                        }
                        </div>
                    </div>
                }
            </main>
        </UsersProvider>
  	)
}


const getStartRiders = async (race: string): Promise<Rider[]> => {
    try {
        const response = await fetch(`/api/startriders/${'race/tour-de-france/2023'.replace(/\//g, "_")}`);
        if (!response.ok) throw new Error('startriders error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Startriders error:', error);
        throw error;
    }
};
