'use client'
import { useAuth } from '../_contexts/authContext';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import React, { useState } from 'react';
import { UsersProvider } from '../_contexts/usersContext';
import HomogenizeGame from './_components/HomogenizeGame';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { TemplateSetter } from './_components/Template';
import { InputNumber } from 'antd';


interface User {
    key: number,
    username: string
}

interface Rider {
    rider_name: string,
    rider_url: string,
}



export default function Home() {
    const { requireAuth } = useAuthCheck();
    requireAuth();

    const [chosenRace, setChosenRace] = useState<string>('')
    const [chosenUsers, setChosenUsers] = useState<User[]>([])
    const [startRiders, setStartRiders] = useState<Rider[]>([])
    const [template, setTemplate] = useState<User[]>([])

    const [displayGame, setDisplayGame] = useState<boolean>(false)

    const [activeAmount, setActiveAmount] = useState<number>(1)
    const [reserveAmount, setReserveAmount] = useState<number>(0)

    const startGame = async () => {
        setStartRiders(await getStartRiders(chosenRace))
    }


    return (
        <UsersProvider>
            <main className="mx-20 flex m-12 ">
                {
                    !displayGame
                        ?
                        <div className='flex space-x-8'>
                            <DisplayRaces setChosenRace={setChosenRace} />
                            <DisplayUsers setChosenUsers={setChosenUsers} />
                            <TemplateSetter selectedUsers={chosenUsers} template={template} setTemplate={setTemplate} />
                            <div className='flex flex-col'>
                                <label>Amount of riders:</label>
                                <InputNumber min={1} value={activeAmount} onChange={(e) => setActiveAmount(e!)} />
                                <label>Amount of reserve riders:</label>
                                <InputNumber min={0} value={reserveAmount} onChange={(e) => setReserveAmount(e!)} />
                            </div>
                            <button onClick={() => { startGame(); setDisplayGame(true) }} className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black">Start Game</button>
                        </div>
                        :
                        <HomogenizeGame race={chosenRace} users={chosenUsers} riders={startRiders} template={template} activeAmount={activeAmount} totalAmount={activeAmount + reserveAmount}/>

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