/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAuth } from '../_contexts/authContext';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import React, { useMemo, useState } from 'react';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { UsersProvider } from '../_contexts/usersContext';
import { List } from 'antd';
import Template from './_components/Template';
import HomogenizeGame from './_components/HomogenizeGame';


interface User {
    key: number,
    username: string
}

interface Rider {
    rider_name: string,
    rider_url: string,
    reserved: boolean
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

    const startGame = async () => {
        setStartRiders(await getStartRiders(chosenRace))
    }


    return (
        <UsersProvider>
            <main className="mx-20 flex m-12">
                {
                    !displayGame
                        ?
                        <>
                            <DisplayRaces setChosenRace={setChosenRace} />
                            <DisplayUsers setChosenUsers={setChosenUsers} />
                            <button onClick={() => { startGame(); setDisplayGame(true) }} className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Start Game</button>
                        </>
                        :
                        <HomogenizeGame race={chosenRace} users={chosenUsers} riders={startRiders} />

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

