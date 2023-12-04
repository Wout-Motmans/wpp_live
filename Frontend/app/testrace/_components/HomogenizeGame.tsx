/* eslint-disable react/jsx-key */
'use client'
import { List, Input, Button } from "antd";
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';



interface User {
	id: number;
	username: string;
}

interface Rider {
    rider_name: string;
    rider_url: string;
    team_url: string;
	team_name: string;
}

interface Team {
	user: User;
	riders: Rider[];

}

interface RaceInfo {
    id: number;
    name: string;
    year: number;
}

interface UndoInfo {
	changeRider: Rider|null,
	chosingTemplateIndex : number,
	teams: Team[],
	riders: Rider[],
}

export default function HomogenizeGame({ race, users, riders : inputRiders, template, activeAmount, totalAmount }: { race: RaceInfo, users: User[], riders: Rider[], template : User[], activeAmount : number, totalAmount : number }) {
	const [teams, setTeams] = useState<Team[]>(users.map(user => { return { user, riders: [] } }))
	const [filterRider, setFilterRider] = useState<string>('')
	const [changeRider, setChangeRider] = useState<Rider|null>(null)
	const [riders, setRiders] = useState<Rider[]>(inputRiders)

	const handleAddGame = async () => {
		if (teams.some(team => team.riders.length < totalAmount)) return
		addGame(race, teams, activeAmount)
	}

	const fullTemplate : User[] = fullTemplateMaker(template, users, totalAmount)
	const [chosingTemplateIndex, setChosingTemplateIndex] = useState<number>(0)
	const chosingTemplateUser = () => { return fullTemplate[chosingTemplateIndex] || null }

	const undoInformation = useRef<UndoInfo[]>([{
		changeRider,
		chosingTemplateIndex,
		teams,
		riders
	}])

	const undo = () => {
		const  copy = [...undoInformation.current]
		const lastItem = copy.pop()
		undoInformation.current = copy
		if (lastItem != null) {
			setChangeRider(lastItem.changeRider)
			setChosingTemplateIndex(lastItem.chosingTemplateIndex)
			setTeams(lastItem.teams)
			setRiders(lastItem.riders)
			console.log("SOMETHING should have HAPPENED by now")
		}
	}

	const chooseRider = (givenRider: Rider) => {
		undoInformation.current.push({changeRider, chosingTemplateIndex, riders, teams})
		setTeams(prev => prev.map(team => {
			if (changeRider !== null) {
				if (team.riders.includes(changeRider)) {
					setRiders(prev => [...prev.slice(0, prev.findIndex(rider => rider == givenRider)), changeRider, ...prev.slice(prev.findIndex(rider => rider == givenRider)+1)])
					setChangeRider(null)
					return {...team, riders : [...team.riders.slice(0, team.riders.findIndex(rider => rider == changeRider)), givenRider, ...team.riders.slice(team.riders.findIndex(rider => rider == changeRider)+1)]}
				};
			} else {
				if (team.user === chosingTemplateUser() ) {
					setRiders(prev => [...prev.slice(0, prev.findIndex(rider => rider == givenRider)), ...prev.slice(prev.findIndex(rider => rider == givenRider)+1)])
					setChosingTemplateIndex(p => p + 1)
					return {...team, riders : [...team.riders, givenRider]}

				}
			}
			return team
		}));
	}

	const handleChangeRider = (rider : Rider) => {
		if (changeRider === rider) {
			setChangeRider(null)
		} else {
			setChangeRider(rider)
		}
	}


	return (
		<>
			<div className='flex flex-row justify-between space-x-8 w-full'>
				<div className='flex space-x-4'>
					{
						users.map(user =>
							<List
								className={user === chosingTemplateUser() && changeRider === null ? " bg-green-100" : ""}
								key={user.id}
								header={<div className="">{user.username}</div>}
								bordered
								dataSource={teams.find(team => team.user === user)!.riders}
								renderItem={(rider, i) => (
									<List.Item
										className={`h-20 ${changeRider === rider ? 'bg-green-200' : ''}`}
										onClick={() => handleChangeRider(rider)}
									>
										<div className={`${i >= activeAmount ? 'text-red-600' : ''}`}>
											<div className="flex flex-col">
												<div className=" text-base">{rider.rider_name}</div>
												<div className=" text-xs text-gray-400">{rider.team_name}</div>
											</div>
										</div>
									</List.Item>
								)}
							/>
						)
					}
				</div>
				<div className="flex space-x-4">
					{
						<List
							header={<Input placeholder="Filter Riders" value={filterRider} onChange={(e) => setFilterRider(e.target.value)}/>}
							bordered
							dataSource={riders.sort((a, b) => a.rider_name.localeCompare(b.rider_name)).filter(rider => new RegExp(filterRider, 'i').test(rider.rider_name))}
							renderItem={rider => (
								<List.Item className=" justify-between ">
									<div className="flex flex-col">
										<div className=" text-base">{rider.rider_name}</div>
										<div className=" text-xs text-gray-400">{rider.team_name}</div>
									</div>
									<PlusCircleOutlined onClick={() => chooseRider(rider)} />
								</List.Item>
							)}
						/>
					}
					<div className="flex flex-col space-y-2">
						<Button type="primary" onClick={handleAddGame}>Start Game</Button>
						<Button type="link" onClick={() => undo()} >Undo</Button>
					</div>
				</div>
			</div>
		</>
	)
}




const addGame = async (race: RaceInfo, teams: Team[], activeAmount: number) => {
	const teamsUpdate = teams.map(team => { return { userId: team.user.id, riders: team.riders.map(rider => rider.rider_url) } })
	fetch('/api/addGame', {
		method: 'POST',
		headers: {
			'X-CSRFToken': Cookies.get('csrftoken')!,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ raceId : race.id, teams: teamsUpdate, activeAmount })
	})
		.catch(error => {
			console.error('Add game error:', error);
		});
}


const fullTemplateMaker = (template: User[], users: User[], amount: number) => {
	const fullTemplate: User[] = [];
	let count = 0;
	while (fullTemplate.length < users.length * amount) {
		const nextUser = template[count % template.length];
		if (fullTemplate.reduce((acc, val) => (val.id === nextUser.id ? acc + 1 : acc), 0) <= amount) {
			fullTemplate.push(nextUser);
		}
		count++;
	}
	return fullTemplate;
}
	 
	 