import { List } from "antd"
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Template from "./Template";


interface User {
	key : number,
	username : string
}

interface Rider {
    rider_name: string,
}

interface Team {
    user: User,
    riders: Rider[]
}


export default function HomogenizeGame({ race, users, riders }: { race: string, users: User[], riders: Rider[] }){
    const [teams, setTeams] = useState<Team[]>(users.map(user => {return {user, riders: []}}))
    const [template, setTemplate] = useState<User[]>([])
    
    const handleAddGame = async () => {
        addGame(race, users, teams)
    }
    
    const [chosingNow, setChosingNow] = useState<number>(0)
    const incrementChosingNow = () => setChosingNow(p => p+1)
    const chosingNowUser = () => {
        const choosingUser = template[chosingNow % template.length]
        return choosingUser
    }

    const chooseRider = (rider : Rider) => {
        const updatedTeams = teams.map((team) => {
            if (team.user === chosingNowUser()) {
              return {
                ...team,
                riders: [...team.riders, rider],
              };
            }
            return team;
        });
        setTeams(updatedTeams)
        riders.splice(riders.findIndex((rider) => rider === rider), 1)
        incrementChosingNow()
    }

    return (
        
        <div className="flex flex-col">
            <div>
                <button onClick={handleAddGame}  className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Start Game</button>
            </div>
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
                        <List.Item className=" h-20">
                            {rider.rider_name}
                        </List.Item>
                    )}
                    />
                )
            }
            </div>
            {
                <List
                header={<div>Start Riders</div>}
                bordered
                dataSource={riders}
                renderItem={rider => (
                    <List.Item className=" justify-between ">
                        <div>{rider.rider_name}</div>
                        <button className="border p-1" onClick={() => chooseRider(rider)}>ADD</button>
                    </List.Item>
                )}
                />
            }
            <Template users={users} template={template} setTemplate={setTemplate}/>
            <div>
            </div>
        </div>
        </div>
    )
}




const addGame = async (race:string , users: User[], teams: Team[]) => {
    const usersUpdate = users.map(user => user.key)
    const teamsUpdate = teams.map(team => {return { user_key: team.user.key }})
    fetch('/api/addgame', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ race, usersUpdate, teamsUpdate })
    })
    .catch(error => {
        console.error('Add game error:', error);
    });
}

