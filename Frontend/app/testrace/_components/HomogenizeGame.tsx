'use client'
import { List, Input, Button } from "antd";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
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

export default function HomogenizeGame({ race, users, riders, template, activeAmount, totalAmount }: { race: RaceInfo, users: User[], riders: Rider[], template : User[], activeAmount : number, totalAmount : number }) {
	const [teams, setTeams] = useState<Team[]>(users.map(user => { return { user, riders: [] } }))
	const [filterRider, setFilterRider] = useState<string>('')

	const handleAddGame = async () => {
		if (teams.some(team => team.riders.length < totalAmount)) return
		addGame(race, teams, activeAmount)
	}

	const fullTemplate = Array.from({ length: totalAmount * users.length }, (_, i) => template[i % template.length])

	const [chosingTemplateIndex, setChosingTemplateIndex] = useState<number>(0)
	const incrementChosingNow = () => setChosingTemplateIndex(p => p + 1)
	const decrementChosingNow = () => setChosingTemplateIndex(p => p - 1)
	const chosingTemplateUser = (x : number = chosingTemplateIndex) => { return fullTemplate[x] || null }

	const undo = () => {
		decrementChosingNow()
		const updatedTeams = teams.map((team) => {
			if (team.user === chosingTemplateUser(chosingTemplateIndex - 1)) {
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

	const chooseRider = (givenRider: Rider) => {
		const updatedTeams = teams.map(team => {
			if (changeRider !== null) {
				if (team.riders.includes(changeRider)) {
					const teamRiderIndex = team.riders.findIndex(rider => rider == changeRider)
					team.riders[teamRiderIndex] = givenRider
					const allRiderIndex = riders.findIndex(rider => rider == givenRider);
					riders[allRiderIndex] = changeRider;
					setChangeRider(null)
				};
			} else {
				if (team.user === chosingTemplateUser() ) {
					riders.splice(riders.findIndex(rider => rider === rider), 1)
					incrementChosingNow()
					team.riders.push(givenRider)
				}
			}
			return team;
		});

		// Count the occurrences of each team_url
		const teamUrlCounter: Record<string, number> = {};

		// Use forEach and object destructuring for brevity
		updatedTeams.forEach(({ riders }) => {
			riders.forEach(({ team_url }) => {
				teamUrlCounter[team_url] = (teamUrlCounter[team_url] || 0) + 1;
			});
		});

		if (Object.values(teamUrlCounter).some(count => count > 2)) {
			message.error('You cannot have more than 2 riders from the same team')
			return
		}else{
			setTeams(updatedTeams)
		}
	}

	const handleChangeRider = (rider : Rider) => {
		if (changeRider === rider) { 
			setChangeRider(null)
		} else {
			setChangeRider(rider)
		}
	}


	const [changeRider, setChangeRider] = useState<Rider|null>(null)



	useEffect(() => {setFilterRider('')}, [teams])


	return (

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