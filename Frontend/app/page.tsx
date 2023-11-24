'use client'
import { Button, Carousel, FloatButton, Switch } from 'antd';
import { useAuthCheck } from './_hooks/useAuthCheck';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DownloadOutlined, LeftCircleOutlined, LeftOutlined, RightCircleOutlined, RightOutlined } from '@ant-design/icons';

interface Rider {
    Position: number,
    Naam: string,
    Points: number,
    Jersey: number,
    Total: number,
    Player: string,
    Reserved: boolean
}

function Dashboard() {
    const { requireAuth } = useAuthCheck();
    const router = useRouter();

    const currentRace = 'Tour de France';
    const currentYear = '2021';

    const stages: Rider[][] = [
        [
            { Position: 1, Naam: 'Remco Evenepoel', Points: 100, Jersey: 35, Total: 135, Player: 'Roel', Reserved: false },
            { Position: 2, Naam: 'Filippo Ganna', Points: 80, Jersey: 0, Total: 80, Player: 'Dries', Reserved: false },
            { Position: 3, Naam: 'Joao Almeida', Points: 65, Jersey: 0, Total: 65, Player: 'Jordy', Reserved: false },
            { Position: 4, Naam: 'Tao Hart', Points: 55, Jersey: 10, Total: 65, Player: 'Bart', Reserved: false },
            { Position: 5, Naam: 'Stefan Kung', Points: 45, Jersey: 0, Total: 45, Player: 'Roel', Reserved: false },
            { Position: 6, Naam: 'Primoz Roglic', Points: 35, Jersey: 0, Total: 35, Player: 'Dries', Reserved: false },
            { Position: 7, Naam: 'Jay Vine', Points: 30, Jersey: 0, Total: 30, Player: 'Jordy', Reserved: false },
            { Position: 8, Naam: 'Brandon McNulty', Points: 25, Jersey: 0, Total: 25, Player: 'Bart', Reserved: false },
            { Position: 9, Naam: 'Geraint Thomas', Points: 20, Jersey: 0, Total: 20, Player: 'Roel', Reserved: true },
            { Position: 10, Naam: 'Alexandr Vlasov', Points: 17, Jersey: 0, Total: 17, Player: 'Dries', Reserved: false },
            { Position: 11, Naam: 'Bruno Armirail', Points: 15, Jersey: 0, Total: 15, Player: 'Jordy', Reserved: false },
            { Position: 12, Naam: 'Mads Pedersen', Points: 14, Jersey: 0, Total: 14, Player: 'Bart', Reserved: false },
            { Position: 13, Naam: 'Michael Matthews', Points: 113, Jersey: 0, Total: 113, Player: 'Roel', Reserved: false },
            { Position: 14, Naam: 'Michael Hepburn', Points: 12, Jersey: 0, Total: 12, Player: 'Dries', Reserved: false },
            { Position: 15, Naam: 'William Barta', Points: 11, Jersey: 0, Total: 11, Player: 'Jordy', Reserved: false },
            { Position: 16, Naam: 'Ilan Van Wilder', Points: 10, Jersey: 0, Total: 10, Player: 'Bart', Reserved: false },
            { Position: 17, Naam: 'Stefan De Bod', Points: 9, Jersey: 0, Total: 9, Player: 'Roel', Reserved: true },
            { Position: 18, Naam: 'Daan Hoole', Points: 8, Jersey: 0, Total: 8, Player: 'Dries', Reserved: false },
            { Position: 19, Naam: 'Pavel Sivakov', Points: 7, Jersey: 0, Total: 7, Player: 'Jordy', Reserved: false },
            { Position: 20, Naam: 'Andreas Leknessund', Points: 6, Jersey: 0, Total: 6, Player: 'Bart', Reserved: false },
            { Position: 21, Naam: 'Mattia Cattaneo', Points: 5, Jersey: 0, Total: 5, Player: 'Roel', Reserved: true },
            { Position: 22, Naam: 'Lennard Kamna', Points: 4, Jersey: 0, Total: 4, Player: 'Dries', Reserved: false },
            { Position: 23, Naam: 'Nico Denz', Points: 3, Jersey: 0, Total: 3, Player: 'Jordy', Reserved: false },
            { Position: 24, Naam: 'Eddie Dunbar', Points: 2, Jersey: 0, Total: 2, Player: 'Bart', Reserved: false },
            { Position: 25, Naam: 'Edoardo Affini', Points: 1, Jersey: 0, Total: 1, Player: 'Roel', Reserved: false }
        ]
        ,
        [
            { Position: 1, Naam: 'Coole Gast', Points: 100, Jersey: 35, Total: 135, Player: 'Dries', Reserved: false },
            { Position: 2, Naam: 'Gekke Gast', Points: 80, Jersey: 0, Total: 80, Player: 'Dries', Reserved: false },
            { Position: 3, Naam: 'Wacko Gast', Points: 65, Jersey: 0, Total: 65, Player: '', Reserved: false },
            { Position: 4, Naam: 'Tao Hart', Points: 55, Jersey: 10, Total: 65, Player: 'Bart', Reserved: false },
            { Position: 5, Naam: 'Stefan Kung', Points: 45, Jersey: 0, Total: 45, Player: 'Roel', Reserved: false },
            { Position: 6, Naam: 'Primoz Roglic', Points: 35, Jersey: 0, Total: 35, Player: 'Dries', Reserved: false },
            { Position: 7, Naam: 'Jay Vine', Points: 30, Jersey: 0, Total: 30, Player: 'Jordy', Reserved: false },
            { Position: 8, Naam: 'Brandon McNulty', Points: 25, Jersey: 0, Total: 25, Player: 'Bart', Reserved: false },
            { Position: 9, Naam: 'Geraint Thomas', Points: 20, Jersey: 0, Total: 20, Player: 'Roel', Reserved: true },
            { Position: 10, Naam: 'Alexandr Vlasov', Points: 17, Jersey: 0, Total: 17, Player: 'Dries', Reserved: false },
            { Position: 11, Naam: 'Bruno Armirail', Points: 15, Jersey: 0, Total: 15, Player: 'Jordy', Reserved: false },
            { Position: 12, Naam: 'Mads Pedersen', Points: 14, Jersey: 0, Total: 14, Player: 'Bart', Reserved: false },
            { Position: 13, Naam: 'Michael Matthews', Points: 13, Jersey: 0, Total: 13, Player: 'Roel', Reserved: false },
            { Position: 14, Naam: 'Michael Hepburn', Points: 12, Jersey: 0, Total: 12, Player: 'Dries', Reserved: false },
            { Position: 15, Naam: 'William Barta', Points: 11, Jersey: 0, Total: 11, Player: 'Jordy', Reserved: false },
            { Position: 16, Naam: 'Ilan Van Wilder', Points: 10, Jersey: 0, Total: 10, Player: 'Bart', Reserved: false },
            { Position: 17, Naam: 'Stefan De Bod', Points: 9, Jersey: 0, Total: 9, Player: 'Roel', Reserved: false },
            { Position: 18, Naam: 'Daan Hoole', Points: 8, Jersey: 0, Total: 8, Player: 'Dries', Reserved: false },
            { Position: 19, Naam: 'Pavel Sivakov', Points: 7, Jersey: 0, Total: 7, Player: 'Jordy', Reserved: false },
            { Position: 20, Naam: 'Andreas Leknessund', Points: 6, Jersey: 0, Total: 6, Player: 'Bart', Reserved: false },
            { Position: 21, Naam: 'Mattia Cattaneo', Points: 5, Jersey: 0, Total: 5, Player: 'Roel', Reserved: false },
            { Position: 22, Naam: 'Lennard Kamna', Points: 4, Jersey: 0, Total: 4, Player: 'Dries', Reserved: false },
            { Position: 23, Naam: 'Nico Denz', Points: 3, Jersey: 0, Total: 3, Player: 'Jordy', Reserved: false },
            { Position: 24, Naam: 'Eddie Dunbar', Points: 2, Jersey: 0, Total: 2, Player: 'Bart', Reserved: false },
            { Position: 25, Naam: 'Edoardo Affini', Points: 1, Jersey: 0, Total: 1, Player: 'Roel', Reserved: false }
        ]
        ,
        []
    ]


    const maxStage = Object.keys(stages).length;

    const [currentStage, setCurrentStage] = useState(0);

    //const myTeamSorted = [...myTeam].sort((a, b) => b.Total - a.Total);
    //const myTopPlayer = myTeamSorted[0];


    // Calculate the total points for each player across all stages
    const totalPlayerPoints = stages.flatMap(stage => stage).reduce((acc: { [key: string]: number }, { Total, Player }) => {
        if (Player) {
            acc[Player] = (acc[Player] || 0) + Total;
        }
        return acc;
    }, {});

    const playerPoints = stages[currentStage].reduce((acc: { [key: string]: number }, { Total, Player }) => {
        if (Player) {
            acc[Player] = (acc[Player] || 0) + Total;
        }
        return acc;
    }, {});


    // Convert the object to an array of players and their total points
    let totalPlayers = Object.keys(totalPlayerPoints).map(name => ({ name, points: totalPlayerPoints[name], reserved: false }));

    // Sort the array in descending order of total points
    let totalSortedPlayers = totalPlayers.sort((a, b) => b.points - a.points);



    // Convert the object to an array of players and their total points
    let players = Object.keys(playerPoints).map(name => ({ name, points: playerPoints[name] }));

    // Sort the array in descending order of total points
    let sortedPlayers = players.sort((a, b) => b.points - a.points);

    const recentStages = [
        { stageNumber: '24', nameWinner: "Roel", pointsWinner: 35 },
        { stageNumber: '23', nameWinner: "Bert", pointsWinner: 25 },
        { stageNumber: '22', nameWinner: "Jeroen", pointsWinner: 15 }]


    const cumPointsPerStage: { [key: string]: number } = {}
    for (let i = 0; i <= currentStage; i++) {
        for (let rider of stages[i]) {
            if (rider.Player === "Roel") {
                if (cumPointsPerStage[rider.Naam] === undefined) {
                    cumPointsPerStage[rider.Naam] = rider.Total;

                } else {
                    cumPointsPerStage[rider.Naam] += rider.Total;
                }
            }
        }
    }

    function convert(obj: { [key: string]: number }) {
        return Object.keys(obj).map(key => ({
            name: key,
            points: obj[key]
        }));
    }

    var sortedCumPointsPerStage = convert(cumPointsPerStage).sort((a, b) => b.points - a.points);
    var nieuwe = sortedCumPointsPerStage.slice(1)
    var topPlayerCum = sortedCumPointsPerStage[0]


    console.log(nieuwe);

    const [cumPoints, setCumPoints] = useState(false);

    const onChange = (checked: boolean) => {
        if (checked)
            setCumPoints(checked);
    };
    //router.push('/dashboard')

    //requireAuth();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);

        setCumPoints(checked);

    };

    return (
        <div className="grid grid-cols-3 gap-4 h-screen px-10 pt-5">
            {/* Left Panel */}
            <div className="col-span-2 bg-white p-4 flex flex-col">
                {/* Content for left panel */}
                {/* ... */}
                <div className="flex items-baseline">
                    <div className="text-2xl font-bold mb-4">{currentRace} {currentYear}</div>
                    <div className="flex items-center ml-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1 animate-pulse"></div> {/* Green Dot */}
                        <div className="text-green-500 font-bold">Live</div>
                    </div>
                </div>



                <Carousel afterChange={e => setCurrentStage(e)} className="bg-orange-200" arrows={true} prevArrow={<LeftCircleOutlined />} nextArrow={<RightCircleOutlined />} waitForAnimate={true} easing="easeIn" speed={1000} style={{}}>
                    {stages.map((stage, index) => (<>

                        <div className="flex justify-between text-lg font-bold mb-4 pt-8 pr-8 pl-8">
                            <div>Stage:{index + 1}</div>
                            <div>Total Points: {(cumPoints) ? sortedCumPointsPerStage.reduce((sum, rider) => sum + rider.points, 0) : stage.filter(rider => rider.Player === 'Roel').reduce((total, player) => total + player.Total, 0)}
                            </div>
                        </div>
                        <div className="text-lg font-bold mb-4 text-center pt-5">My Team</div>
                        <div className="flex flex-col items-center pt-10">
                            {/* Player with the most points (Top Player) */}
                            {stage.filter(rider => rider.Player === 'Roel').sort((a, b) => b.Total - a.Total)[0] && (
                                <div className="relative mb-4 text-lg">
                                    <img src="/img/crown.png" alt="Crown" className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-8 h-8" />
                                    <img src="/img/yellow_jersey.png" alt="Rider Shirt" className="relative left-1/2 transform -translate-x-1/2 w-20 h-20" />
                                    <div className="mt-2 font-bold">{(cumPoints) ? topPlayerCum.name : stage.filter(rider => rider.Player === 'Roel').sort((a, b) => b.Total - a.Total)[0].Naam}</div>
                                    <div className="italic font-semibold">{(cumPoints) ? topPlayerCum.points : stage.filter(rider => rider.Player === 'Roel').sort((a, b) => b.Total - a.Total)[0].Total} Points</div>
                                </div>
                            )}
                            {/* Other Players */}
                            <div className="flex flex-wrap justify-center pb-8 text-lg font-semibold" style={{ maxWidth: '55rem' }}>
                                {stage.filter(rider => rider.Player === 'Roel').filter(rider => rider.Reserved === false).sort((a, b) => b.Total - a.Total).slice(1).map((player, index) => (
                                    <div key={index} className="mx-2 my-2 text-center flex-1 p-4">
                                        <img src="/img/rider-shirt.png" alt="Rider Shirt" className="w-16 h-16 relative left-1/2 transform -translate-x-1/2 " />
                                        <div className="mt-2">{(cumPoints) ? nieuwe[index].name : player.Naam}</div>
                                        <div className=' italic '>{(cumPoints) ? nieuwe[index].points : player.Total} Points</div>
                                    </div>
                                ))}
                            </div>
                            {/* Reserved */}
                            <div className="flex flex-wrap justify-center pb-8 text-lg font-semibold" style={{ maxWidth: '55rem' }}>
                                {stage.filter(rider => rider.Player === 'Roel').filter(rider => rider.Reserved === true).map((player, index) => (
                                    <div key={index} className="mx-2 my-2 text-center flex-1 p-4">
                                        <img src="/img/sub_shirt.png" alt="Rider Shirt" className="w-16 h-16 relative left-1/2 transform -translate-x-1/2 " />
                                        <div className="mt-2">{(cumPoints) ? nieuwe[index].name : player.Naam}</div>
                                        <div className=' italic '>{(cumPoints) ? 0 : 0} Points</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Switch
                            checked={isSwitchOn}
                            onChange={handleSwitchChange}
                            checkedChildren="cumulative points"
                            unCheckedChildren="stage points"
                            className='bottom-0 absolute bg-black'
                        />
                    </>
                    ))}

                </Carousel>

            </div>

            {/* Right Panels */}
            <div className="col-span-1 grid grid-cols-1 gap-4">


                {/* Top Right Panel */}
                <div className="white p-4">
                    {/* Content for bottom right panel */}
                    {/* ... */}
                    <div className="text-2xl font-bold mb-4">Overall Leaderboard</div>
                    <table className="min-w-full table-fixed">
                        <thead>
                            <tr className="bg-[#1e1e24] text-white">
                                <th className="py-2 px-4 w-3/12">Ranking</th>
                                <th className="py-2 px-4 w-6/12">Name</th>
                                <th className="py-2 px-4 w-3/12">Points</th>
                            </tr>
                        </thead>
                        <tbody>

                            {totalSortedPlayers.map((player, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4 whitespace-nowrap">
                                        {index < 3 ? (
                                            <>
                                                {index === 0 && <img src="/img/medal-1.png" alt="Gold Medal" className="w-6 h-9 mr-2" />}
                                                {index === 1 && <img src="/img/medal-2.png" alt="Silver Medal" className="w-6 h-9 mr-2" />}
                                                {index === 2 && <img src="/img/medal-3.png" alt="Bronze Medal" className="w-6 h-9 mr-2" />}
                                            </>
                                        ) : (
                                            index + 1

                                        )}
                                    </td>
                                    <td className="py-2 px-4">{player.name}</td>
                                    <td className="py-2 px-4">{player.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <a href='/stage-overview' ><Button type="primary" shape="round" className=' bg-black'>View all stages</Button></a>


                {/* Bottom Right Panel (Leaderboard) */}
                <div className="white p-4">
                    <div className="text-2xl font-bold mb-4">Stage Leaderboard { }</div>
                    <table className="min-w-full">
                        {/*         <thead>
            <tr className="bg-[#1e1e24] col-span-3">
                <th className="py-2 px-4 whitespace-nowrap text-white">Leaderboard</th>
            </tr>
        </thead> */}
                        <thead>
                            <tr className="bg-[#1e1e24]">
                                <th className="py-2 px-4 whitespace-nowrap text-white">Ranking</th>
                                <th className="py-2 px-4 text-white">Name</th>
                                <th className="py-2 px-4 text-white">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPlayers.map((player, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4 whitespace-nowrap">
                                        {index < 3 ? (
                                            <>
                                                {index === 0 && <img src="/img/medal-1.png" alt="Gold Medal" className="w-6 h-9 mr-2" />}
                                                {index === 1 && <img src="/img/medal-2.png" alt="Silver Medal" className="w-6 h-9 mr-2" />}
                                                {index === 2 && <img src="/img/medal-3.png" alt="Bronze Medal" className="w-6 h-9 mr-2" />}
                                            </>
                                        ) : (
                                            index + 1

                                        )}
                                    </td>
                                    <td className="py-2 px-4">{player.name}</td>
                                    <td className="py-2 px-4">{player.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;