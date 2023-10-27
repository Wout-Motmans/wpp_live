'use client'
import { List, InputNumber, Input } from "antd"
import Cookies from 'js-cookie';
import React, { use, useEffect, useState } from 'react';
import Template from "./Template";



interface User {
    key: number,
    username: string
}

interface Rider {
    rider_name: string,
    rider_url: string,
    reserved: boolean
}

interface Team {
    user: User,
    riders: Rider[],

}


export default function HomogenizeGame({ race, users, riders }: { race: string, users: User[], riders: Rider[] }) {
    const [teams, setTeams] = useState<Team[]>(users.map(user => { return { user, riders: [] } }))
    const [template, setTemplate] = useState<User[]>([])
    const [riderAmount, setRiderAmount] = useState<number>(1)
    const [reserveAmount, setReserveAmount] = useState<number>(0)
    const [filterRider, setFilterRider] = useState<string>('')

    const handleAddGame = async () => {
        if (teams.some(team => team.riders.length < riderAmount + reserveAmount)) return
        addGame(race, teams)
    }

    useEffect(() => {
        setChosingNow(teams.map(team => team.riders.length).reduce((a, b) => a + b, 0)) 
    }, [template])

    const [chosingNow, setChosingNow] = useState<number>(0)
    const incrementChosingNow = () => setChosingNow(p => p + 1)
    const chosingNowUser = (x: number = chosingNow) => {
        const choosingUser = template[x % template.length]
        return choosingUser
    }
    const undo = () => {
        if (chosingNow === 0) return
        setChosingNow(p => p - 1);
        const updatedTeams = teams.map((team) => {
            if (team.user === chosingNowUser(chosingNow - 1)) {
                riders.push(team.riders[team.riders.length - 1])
                return {
                    ...team,
                    riders: team.riders.slice(0, -1),
                };
            }
            return team;
        });

        setTeams(updatedTeams);
    }


    const chooseRider = (rider: Rider) => {
        if (chosingNowUser() == null) return
        const updatedTeams = teams.map((team) => {

            if (team.user === chosingNowUser() ) {
                if(team.riders.length >= riderAmount){
                    if (team.riders.length < riderAmount + reserveAmount) {
                        rider.reserved = true
                    } else {
                        return team
                    }
                }
                riders.splice(riders.findIndex((rider) => rider === rider), 1)
                incrementChosingNow()
                return {
                    ...team,
                    riders: [...team.riders, rider],
                };
            }
            return team;
        });
        setTeams(updatedTeams)
        


    }

    return (

        <div className="flex flex-col">


            <div className='flex flex-row justify-between space-x-8 w-full'>
                <div className='flex space-x-4'>
                    {
                        users.map(user =>
                            <List
                                className={user === chosingNowUser() ? " bg-green-100" : ""}
                                key={user.key}
                                header={<div className="">{user.username}</div>}
                                bordered
                                dataSource={teams.find(team => team.user === user)!.riders}
                                renderItem={rider => (
                                    <List.Item className="h-20">
                                        <div  className={`${rider.reserved ? 'text-red-600' : ''}`}>{rider.rider_name}</div>
                                    </List.Item>
                                )}
                            />
                        )
                    }
                </div>
                {
                    <List
                        header={<Input placeholder="Start Riders" value={filterRider} onChange={(e) => setFilterRider(e.target.value)}/>}
                        bordered
                        dataSource={riders.sort((a, b) => a.rider_name.localeCompare(b.rider_name)).filter(rider => new RegExp(filterRider, 'i').test(rider.rider_name))}
                        renderItem={rider => (
                            <List.Item className=" justify-between ">
                                <div>{rider.rider_name}</div>
                                <button className="border p-1" onClick={() => chooseRider(rider)}>ADD</button>
                            </List.Item>
                        )}
                    />
                }
                <Template users={users} template={template} setTemplate={setTemplate} />
                <div className="flex flex-col space-y-2">
                    <label>Amount of riders:</label>
                    <InputNumber min={1} value={riderAmount} onChange={(e) => setRiderAmount(e!)} />
                    <label>Amount of reserve riders:</label>
                    <InputNumber min={0} value={reserveAmount} onChange={(e) => setReserveAmount(e!)} />
                    <button onClick={handleAddGame} className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Start Game</button>
                    <button onClick={() => undo()} className=' underline underline-offset-2 text-red-500'>Undo</button>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}




const addGame = async (race: string, teams: Team[]) => {

    const teamsUpdate = teams.map(team => { return { user: team.user.key, riders: team.riders.map(rider => rider.rider_url) } })
    fetch('/api/addgame', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ race, teams: teamsUpdate })
    })
        .catch(error => {
            console.error('Add game error:', error);
        });
}

