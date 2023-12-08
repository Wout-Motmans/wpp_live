/* eslint-disable react/jsx-key */
'use client'
import { List, Input, Button, Modal, Popover, message } from "antd";
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

export default function HomogenizeGame({ race, users, startRiders, template, activeAmount, totalAmount }: { race: RaceInfo, users: User[], startRiders: Rider[], template : User[], activeAmount : number, totalAmount : number }) {
	const [teams, setTeams] = useState<Team[]>(users.map(user => { return { user, riders: [] } }))
	const [filterRider, setFilterRider] = useState<string>('')
	const [changeRider, setChangeRider] = useState<Rider|null>(null)
	const [riders, setRiders] = useState<Rider[]>(startRiders)

	const fullTemplate: User[] = fullTemplateMaker(template, users, totalAmount)
	const [chosingIndex, setChosingIndex] = useState<number>(0)
	const chosingTemplateUser = () => { return fullTemplate[chosingIndex] || null }

	const undoInformation = useRef<UndoInfo[]>([])

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


	function prettyPrint(arr : string[]){
		if (arr.length <= 1) {
			return arr[0] + ".";
		}
		return arr.slice(0, -1).join(", ") + " and " + arr.at(-1) + ".";
	}


    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const handleAddGame = async () => {
        const checkError = () => {
            const missingTeams = teams.filter(team => team.riders.length < totalAmount)
            if (missingTeams.length != 0) return `Missing riders for ${prettyPrint(missingTeams.map(team => team.user.username))}`
        }
        const error = checkError()
        if (error) {
            return messageApi.open({
                type: 'error',
                content: error,
            });
        }
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        addGame(race, teams, activeAmount).then(added =>
            added ?
            messageApi.open({
                key,
                type: 'success',
                content: 'Added Succesfully!',
                duration: 1.5,
            })
            :
            messageApi.open({
                key,
                type: 'warning',
                content: 'Not Added!',
                duration: 1.5,
            })
        ).catch(_ => 
            messageApi.open({
                key,
                type: 'error',
                content: 'Error!',
                duration: 1.5,
            })
        )
    }

	return (
		<>
            {contextHolder}
			<div className='flex flex-row justify-between space-x-8 w-full h-full '>
				<div className='flex space-x-4'>
					{
						users.map(user =>
							<List
								className={` flex-1 flex-grow h-fit ${user === chosingTemplateUser() && changeRider === null ? " bg-green-100" : ""}`}
								key={user.id}
								header={<div className=" font-bold">{user.username}</div>}
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
				<div className=" space-y-3">
					<div className="flex justify-between">
						<Button type="primary" onClick={handleAddGame}>Start Game</Button>
						<Button type="link" onClick={() => undo()} >Undo</Button>
					</div>
					<Input placeholder="Filter Riders" value={filterRider} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterRider(e.target.value)}/>
					<div className="  h-[600px]">
						<List
							bordered
							dataSource={riders.sort((a, b) => a.rider_name.localeCompare(b.rider_name)).filter(rider => new RegExp(filterRider, 'i').test(rider.rider_name))}
							className=" overflow-auto h-full"
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
					</div>
				</div>
			</div>
		</>
	)
}




const addGame = async (race: RaceInfo, teams: Team[], activeAmount: number): Promise<boolean> => {
	const teamsUpdate = teams.map(team => { return { userId: team.user.id, riders: team.riders } })
	const response = await fetch('/api/addGame', {
		method: 'POST',
		headers: {
			'X-CSRFToken': Cookies.get('csrftoken')!,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ raceId : race.id, teams: teamsUpdate, activeAmount })
	})
	if (!response.ok) throw new Error("add game error")
	return await response.json()
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
