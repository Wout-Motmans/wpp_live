'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import React, { useState } from 'react';
import { UsersProvider } from '../_contexts/usersContext';
import HomogenizeGame from './_components/HomogenizeGame';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { TemplateSetter } from './_components/Template';
import { InputNumber, Button } from 'antd';
import { useAuth } from '../_contexts/authContext';
import { User, Rider, RaceInfo } from '@/app/types'


export default function Home() {
    const { requireAuth } = useAuthCheck();
    const { isLoggedIn } = useAuth();
    requireAuth();

    const [chosenRace, setChosenRace] = useState<RaceInfo | null>(null)
    const [chosenUsers, setChosenUsers] = useState<User[]>([])
    const [startRiders, setStartRiders] = useState<Rider[]>([])
    const [template, setTemplate] = useState<User[]>([])

    const [displayGame, setDisplayGame] = useState<boolean>(false)

    const [activeAmount, setActiveAmount] = useState<number>(1)
    const [reserveAmount, setReserveAmount] = useState<number>(0)

    const startGame = async () => {
        if (chosenRace !== null) {
            setStartRiders(await getStartRiders(chosenRace))
            setDisplayGame(true)
        }
    }


    return (
        !isLoggedIn
        ?
        <h1>LOADING</h1>
        :
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
                        <div className=''>
                            <Button type='primary' onClick={() => startGame()}>Start Game</Button>
                        </div>
                    </div>
                    :
                    <HomogenizeGame race={chosenRace!} users={chosenUsers} riders={startRiders} template={template} activeAmount={activeAmount} totalAmount={activeAmount + reserveAmount}/>
                }
            </main>
        </UsersProvider>
    )
}


const getStartRiders = async (race: RaceInfo): Promise<Rider[]> => {
    try {
        const response = await fetch(`/api/getStartRiders?raceId=${race.id}`);
        if (!response.ok) throw new Error('startriders error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Startriders error:', error);
        throw error;
    }
};