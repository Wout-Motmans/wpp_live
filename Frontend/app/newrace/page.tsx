'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useEffect, useState } from 'react';
import { UsersProvider } from '../_contexts/usersContext';
import HomogenizeGame from './_components/HomogenizeGame';
import DisplayRaces from './_components/DisplayRaces';
import DisplayUsers from './_components/DisplayUsers';
import { Template } from './_components/Template';
import { InputNumber, Button, Popover, message } from 'antd';
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


    const [messageApi, contextHolder] = message.useMessage();
    const handleContinue = async () => {
        const checkError = () => {
            if (chosenRace == null) return "Pick a race first."
            if (chosenUsers.length == 0) return "Pick some users first."
            if (template.length == 0) return "Template??"
            const missingChosenUsersInTemplate = chosenUsers.filter(user => !template.includes(user))
            if (missingChosenUsersInTemplate.length != 0) return `Template missing ${prettyPrint(missingChosenUsersInTemplate.map(user => user.username))}`
            if (new Set(template.map(elem => template.filter(e => e === elem).length)).size != 1) return "Your template isn not good enough."
            if (chosenUsers.length * (activeAmount + reserveAmount) > startRiders.length) return `Too many riders per player. Only ${Math.floor(startRiders.length / chosenUsers.length)} per player possible`
        }
        const error = checkError()
        if (error) {
            return messageApi.open({
                type: 'error',
                content: error,
              });
        }
        messageApi.open({
            type: 'success',
            content: 'succes',
            duration: 1,
        });
        setTimeout(() => {
            setDisplayGame(true)
        }, 1000);        
    }
    
    return (
        !isLoggedIn
        ?
        <h1>LOADING</h1>
        :
        <UsersProvider>
            <main className=" h-full mt-12 mx-auto max-w-7xl">
                {contextHolder}
                <div className='mx-6'>
                    {
                        !displayGame
                        ?
                        <div className='flex w-full mx-auto justify-between space-x-20'>
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
                                <Button type="primary" onClick={handleContinue}>Continue</Button>
                            </div>
                        </div>
                        :
                        <HomogenizeGame race={chosenRace!} startRiders={startRiders} users={chosenUsers}  template={template} activeAmount={activeAmount} totalAmount={activeAmount + reserveAmount}/>
                    }
                </div>
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