'use client'
import { List, Input, Dropdown, MenuProps, message } from "antd"
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Template } from "./Template";



interface User {
	key: number,
	username: string
}

interface Rider {
	rider_name: string,
	rider_url: string,
	team_url: string,
}

interface Team {
	user: User,
	riders: Rider[],

}


export default function HomogenizeGame({ race, users, riders, template, activeAmount, totalAmount }: { race: string, users: User[], riders: Rider[], template : User[], activeAmount : number, totalAmount : number }) {
	const [teams, setTeams] = useState<Team[]>(users.map(user => { return { user, riders: [] } }))
	const [filterRider, setFilterRider] = useState<string>('')

	const handleAddGame = async () => {
		if (teams.some(team => team.riders.length < totalAmount)) return
		addGame(race, teams, activeAmount)
	}

	const [chosingNow, setChosingNow] = useState<number>(0)
	const incrementChosingNow = () => setChosingNow(p => p + 1)
	const decrementChosingNow = () => setChosingNow(p => p - 1)
	const chosingNowUser = (x: number = chosingNow) => {
		const choosingUser = template[x % template.length]
		return choosingUser
	}
	const undo = () => {
		if (chosingNow === 0) return
		decrementChosingNow()
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

	const chooseRider = (givenRider: Rider) => {
		if (chosingNowUser() == null) return
		const updatedTeams = teams.map((team, index) => {
			if (changeRider !== null) {
				const indexOfRiderToReplace = teams.findIndex(item => {
					return item.riders.some(rider => rider.rider_url === changeRider.rider_url);
				});
				if (index === indexOfRiderToReplace) {
					const riderIndex = team.riders.findIndex(rider => rider.rider_url === changeRider.rider_url);
					if (riderIndex !== -1) {
						return {
							...team,
							riders: [
								...team.riders.slice(0, riderIndex),
								givenRider,
								...team.riders.slice(riderIndex + 1)
							]
						};
					}
				}
				const indexOfRiderToReplaceOther = riders.findIndex(rider => rider.rider_url === givenRider.rider_url);
				if (indexOfRiderToReplaceOther !== -1) {
					riders[indexOfRiderToReplaceOther] = changeRider;
				}
				setChangeRider(null)
				return team;
			} else {
				if (team.user === chosingNowUser() ) {
					if (team.riders.length >= totalAmount) return team
					riders.splice(riders.findIndex((rider) => rider === rider), 1)
					incrementChosingNow()
					return {
						...team,
						riders: [...team.riders, givenRider],
					};
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
								className={user === chosingNowUser() && changeRider === null ? " bg-green-100" : ""}
								key={user.key}
								header={<div className="">{user.username}</div>}
								bordered
								dataSource={teams.find(team => team.user === user)!.riders}
								renderItem={(rider, i) => (
									<List.Item
										className={`h-20 ${changeRider === rider ? 'bg-green-200' : ''}`}
										onClick={() => handleChangeRider(rider)}
									>
										<div className={`${i >= activeAmount ? 'text-red-600' : ''}`}>{rider.rider_name}</div>
									</List.Item>
								)}
							/>
						)
					}
				</div>
				<div className="flex space-x-4">
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
					<div className="flex flex-col space-y-2">
						<button onClick={handleAddGame} className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Start Game</button>
						<button onClick={() => undo()} className=' underline underline-offset-2 text-red-500'>Undo</button>
					</div>
				</div>
			</div>
	)
}




const addGame = async (race: string, teams: Team[], activeAmount: number) => {

	const teamsUpdate = teams.map(team => { return { user: team.user.key, riders: team.riders.map(rider => rider.rider_url) } })
	fetch('/api/addgame', {
		method: 'POST',
		headers: {
			'X-CSRFToken': Cookies.get('csrftoken')!,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ race, teams: teamsUpdate, activeAmount })
	})
		.catch(error => {
			console.error('Add game error:', error);
		});
}