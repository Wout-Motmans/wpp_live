'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import React, { useEffect, useState } from 'react';
import { UsersProvider } from '../_contexts/usersContext';
import HomogenizeGame from './_components/HomogenizeGame';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { Template } from './_components/Template';
import { InputNumber, Button, Popover } from 'antd';
import { useAuth } from '../_contexts/authContext';
import { User, Rider, RaceInfo } from '@/app/types'


export default function Home() {
    const { requireAuth } = useAuthCheck();
    const { isLoggedIn } = useAuth();
    requireAuth();

    const [chosenRace, setChosenRace] = useState<RaceInfo | null>(null)
    const [chosenUsers, setChosenUsers] = useState<User[]>([])
    const [template, setTemplate] = useState<User[]>([])
    const [startRiders, setStartRiders] = useState<Rider[]>([])

    const [activeAmount, setActiveAmount] = useState<number>(1)
    const [reserveAmount, setReserveAmount] = useState<number>(0)

    const [displayGame, setDisplayGame] = useState<boolean>(false)

    const checkContinueContent = () => {
        if (chosenRace == null) return <p>Pick a race first.</p>
        if (chosenUsers.length == 0) return <p>Pick some users first.</p>
        if (template.length == 0) return <p>Template??</p>
        const missingChosenUsersInTemplate = chosenUsers.filter(user => !template.includes(user))
        if (missingChosenUsersInTemplate.length != 0) return <p>Template missing {prettyPrint(missingChosenUsersInTemplate.map(user => user.username))}</p>
        if (new Set(template.map(elem => template.filter(e => e === elem).length)).size != 1) return <p>Your template isn not good enough.</p>
        if (chosenUsers.length * (activeAmount + reserveAmount) > startRiders.length) return <p>Too many riders per player.<br/>Only a individual amount of {Math.floor(startRiders.length / chosenUsers.length)} possible</p>
        return <Button type='primary' onClick={confirmContinue}>Confirm</Button>
    }

    useEffect(() => {
        if (chosenRace) {
            getStartRiders(chosenRace).then(res => setStartRiders(res))
        }
    }, [chosenRace])

	function prettyPrint(arr : string[]){
		if (arr.length <= 1) {
			return arr[0] + ".";
		}
		return arr.slice(0, -1).join(", ") + " and " + arr.at(-1) + ".";
	}


    const [open, setOpen] = useState(false)
    const confirmContinue = () => {
        setOpen(false)
        setDisplayGame(true)
    }
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    
    return (
        !isLoggedIn
        ?
        <h1>LOADING</h1>
        :
        <UsersProvider>
            <main className="flex items-center justify-around min-h-full pt-8 mx-2 w-full lg:mx-auto">
                {
                    !displayGame
                    ?
                    <div className='flex justify-between space-x-20'>
                        <DisplayRaces setChosenRace={setChosenRace} />
                        <div className='flex child:flex-1'>
                            <DisplayUsers setChosenUsers={setChosenUsers} />
                            <Template selectedUsers={chosenUsers} template={template} setTemplate={setTemplate} />
                        </div>
                        <div className='flex flex-col space-y-8'>
                            <div className='flex flex-col'>
                                <label>Riders:</label>
                                <InputNumber min={1} value={activeAmount} onChange={(e) => setActiveAmount(e!)} />
                                <label>Reserve:</label>
                                <InputNumber min={0} value={reserveAmount} onChange={(e) => setReserveAmount(e!)} />
                            </div>
                            <div>
                                <Popover
                                    content={checkContinueContent}
                                    trigger="click"
                                    open={open}
                                    onOpenChange={handleOpenChange}
                                >
                                    <Button type="primary">Continue</Button>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    :
                    <HomogenizeGame race={chosenRace!} startRiders={startRiders} users={chosenUsers}  template={template} activeAmount={activeAmount} totalAmount={activeAmount + reserveAmount}/>
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