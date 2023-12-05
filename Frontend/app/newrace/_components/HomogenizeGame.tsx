/* eslint-disable react/jsx-key */
'use client'
import { List, Input, Button } from "antd";
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { User, Rider, Team, RaceInfo } from '@/app/types'


interface UndoInfo {
	changeRider: Rider|null,
	chosingIndex: number,
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

	const fullTemplate: User[] = fullTemplateMaker(template, users, totalAmount)
	const [chosingIndex, setChosingIndex] = useState<number>(0)
	const chosingTemplateUser = () => { return fullTemplate[chosingIndex] || null }

	const undoInformation = useRef<UndoInfo[]>([{
		changeRider,
		chosingIndex,
		teams,
		riders
	}])

	const undo = () => {
		const  copy = [...undoInformation.current]
		const lastItem = copy.pop()
		undoInformation.current = copy
		if (lastItem != null) {
			setChangeRider(lastItem.changeRider)
			setChosingIndex(lastItem.chosingIndex)
			setTeams(lastItem.teams)
			setRiders(lastItem.riders)
		}
	}

	const chooseRider = (givenRider: Rider) => {
		if (changeRider !== null) {
			const teamIndexWithChangeRider = teams.findIndex(team => team.riders.includes(changeRider))
			if (teamIndexWithChangeRider != -1) {
				if (teams[teamIndexWithChangeRider].riders.reduce((acc, rider) => (rider.team_url === givenRider.team_url ? acc + 1 : acc), 1) > 2) return
				const givenRiderIndex = riders.findIndex(rider => rider === givenRider)
				setRiders(prev => [...prev.slice(0, givenRiderIndex), changeRider, ...prev.slice(givenRiderIndex+1)])
				const ridersChanged = teams[teamIndexWithChangeRider].riders.map(rider => rider === changeRider ? givenRider : rider)
				setTeams(prev => prev.map((team, i) => i === teamIndexWithChangeRider? {...team, riders : ridersChanged} : team))
				setChangeRider(null)
			}
		} else if (chosingTemplateUser() != null) {
			if (teams.find(team => team.user === chosingTemplateUser())!.riders.reduce((acc, rider) => (rider.team_url === givenRider.team_url ? acc + 1 : acc), 1) > 2) return
			const givenRiderIndex = riders.findIndex(rider => rider === givenRider)
			setRiders(prev => [ ...prev.slice(0, givenRiderIndex), ...prev.slice(givenRiderIndex+1)])
			setTeams(prev => prev.map(team => team.user === chosingTemplateUser()? {...team, riders : [...team.riders, givenRider]} : team))
			setChosingIndex(p => p + 1)
		} else {
			return
		}
		undoInformation.current.push({changeRider, chosingIndex, riders, teams})

	}

	const handleChangeRider = (rider : Rider) => {
		if (changeRider === rider) {
			setChangeRider(null)
		} else {
			setChangeRider(rider)
		}
	}

	useEffect(() => {setFilterRider('')}, [teams])

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
		if (fullTemplate.reduce((acc, val) => (val.id === nextUser.id ? acc + 1 : acc), 0) < amount) {
			fullTemplate.push(nextUser);
		}
		count++;
	}
	return fullTemplate;
}
	 
	 


//setTeams(prev => prev.map(team => {
//	if (changeRider !== null) {
//		if (team.riders.includes(changeRider)) {
//			const givenRiderIndex = riders.findIndex(rider => rider === givenRider)
//			setRiders(prev => [...prev.slice(0, givenRiderIndex), changeRider, ...prev.slice(givenRiderIndex+1)])
//			setChangeRider(null)
//			const changeRiderIndex = team.riders.findIndex(rider => rider === changeRider)
//			return {...team, riders : [...team.riders.slice(0, changeRiderIndex), givenRider, ...team.riders.slice(changeRiderIndex+1)]}
//		};
//	} else {
//		console.log(team.user, chosingTemplateUser())
//		if (team.user === chosingTemplateUser() ) {
//			const riderIndex = riders.findIndex(rider => rider === givenRider)
//			setRiders(prev => [ ...prev.slice(0, riderIndex), ...prev.slice(riderIndex+1)])
//			setChosingIndex(p => p + 1)
//			return {...team, riders : [...team.riders, givenRider]}
//		}
//	}
//	return team
//}));