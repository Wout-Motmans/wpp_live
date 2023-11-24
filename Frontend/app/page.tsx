'use client'
import { useAuthCheck } from './_hooks/useAuthCheck';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Dashboard() {
    const { requireAuth } = useAuthCheck();
    requireAuth();
    const router = useRouter();

    const currentRace = 'Tour de France';
    const currentYear = '2021';


    const [displayedStage, setDisplayedStage] = useState('1');

    const incrementStage = (event) => {
        event.preventDefault();
        setDisplayedStage(prevStage => (parseInt(prevStage) + 1).toString());
    };
      
    const decrementStage = (event) => {
        event.preventDefault();
        if (parseInt(displayedStage) > 1) {
          setDisplayedStage(prevStage => (parseInt(prevStage) - 1).toString());
        }
    };

    const stages = {
        '1':
        [
            { Position: 1, Naam: 'Remco Evenepoel',Team:"Soudal-Quick Step", Points: 100, Jersey: 35, Total: 135, player: 'Roel' },
            { Position: 2, Naam: 'Filippo Ganna', Team:"**TEAMNAME**", Points: 80, Jersey: 0, Total: 80, player: 'Dries' },
            { Position: 3, Naam: 'Joao Almeida', Team:"**TEAMNAME**", Points: 65, Jersey: 0, Total: 65, player: 'Jordy' },
            { Position: 4, Naam: 'Tao Hart', Team:"**TEAMNAME**", Points: 55, Jersey: 10, Total: 65, player: 'Bart' },
            { Position: 5, Naam: 'Stefan Kung', Team:"**TEAMNAME**", Points: 45, Jersey: 0, Total: 45, player: 'Roel' },
            { Position: 6, Naam: 'Primoz Roglic', Team:"**TEAMNAME**", Points: 35, Jersey: 0, Total: 35, player: 'Dries' },
            { Position: 7, Naam: 'Jay Vine', Team:"**TEAMNAME**", Points: 30, Jersey: 0, Total: 30, player: 'Jordy' },
            { Position: 8, Naam: 'Brandon McNulty', Team:"**TEAMNAME**", Points: 25, Jersey: 0, Total: 25, player: 'Bart' },
            { Position: 9, Naam: 'Geraint Thomas', Team:"**TEAMNAME**", Points: 20, Jersey: 0, Total: 20, player: 'Roel' },
            { Position: 10, Naam: 'Alexandr Vlasov', Team:"**TEAMNAME**", Points: 17, Jersey: 0, Total: 17, player: 'Dries' },
            { Position: 11, Naam: 'Bruno Armirail', Team:"**TEAMNAME**", Points: 15, Jersey: 0, Total: 15, player: 'Jordy' },
            { Position: 12, Naam: 'Mads Pedersen', Team:"**TEAMNAME**", Points: 14, Jersey: 0, Total: 14, player: 'Bart' },
            { Position: 13, Naam: 'Michael Matthews', Team:"**TEAMNAME**", Points: 13, Jersey: 0, Total: 13, player: 'Roel' },
            { Position: 14, Naam: 'Michael Hepburn', Team:"**TEAMNAME**", Points: 12, Jersey: 0, Total: 12, player: 'Dries' },
            { Position: 15, Naam: 'William Barta', Team:"**TEAMNAME**", Points: 11, Jersey: 0, Total: 11, player: 'Jordy' },
            { Position: 16, Naam: 'Ilan Van Wilder', Team:"**TEAMNAME**", Points: 10, Jersey: 0, Total: 10, player: 'Bart' },
            { Position: 17, Naam: 'Stefan De Bod', Team:"**TEAMNAME**", Points: 9, Jersey: 0, Total: 9, player: 'Roel' },
            { Position: 18, Naam: 'Daan Hoole', Team:"**TEAMNAME**", Points: 8, Jersey: 0, Total: 8, player: 'Dries' },
            { Position: 19, Naam: 'Pavel Sivakov', Team:"**TEAMNAME**", Points: 7, Jersey: 0, Total: 7, player: 'Jordy' },
            { Position: 20, Naam: 'Andreas Leknessund', Team:"**TEAMNAME**", Points: 6, Jersey: 0, Total: 6, player: 'Bart' },
            { Position: 21, Naam: 'Mattia Cattaneo', Team:"**TEAMNAME**", Points: 5, Jersey: 0, Total: 5, player: 'Roel' },
            { Position: 22, Naam: 'Lennard Kamna', Team:"**TEAMNAME**", Points: 4, Jersey: 0, Total: 4, player: 'Dries' },
            { Position: 23, Naam: 'Nico Denz', Team:"**TEAMNAME**", Points: 3, Jersey: 0, Total: 3, player: 'Jordy' },
            { Position: 24, Naam: 'Eddie Dunbar', Team:"**TEAMNAME**", Points: 2, Jersey: 0, Total: 2, player: 'Bart' },
            { Position: 25, Naam: 'Edoardo Affini', Team:"**TEAMNAME**", Points: 1, Jersey: 0, Total: 1, player: 'Roel' }
        ],
        '2' : [
            { Position: 1, Naam: 'Coole Gast', Team:"**TEAMNAME**", Points: 100, Jersey: 35, Total: 135, player: 'Dries' },
            { Position: 2, Naam: 'Gekke Gast', Team:"**TEAMNAME**", Points: 80, Jersey: 0, Total: 80, player: 'Dries' },
            { Position: 3, Naam: 'Wacko Gast', Team:"**TEAMNAME**", Points: 65, Jersey: 0, Total: 65, player: '' },
            { Position: 4, Naam: 'Tao Hart', Team:"**TEAMNAME**", Points: 55, Jersey: 10, Total: 65, player: 'Bart' },
            { Position: 5, Naam: 'Stefan Kung', Team:"**TEAMNAME**", Points: 45, Jersey: 0, Total: 45, player: 'Roel' },
            { Position: 6, Naam: 'Primoz Roglic', Team:"**TEAMNAME**", Points: 35, Jersey: 0, Total: 35, player: 'Dries' },
            { Position: 7, Naam: 'Jay Vine', Team:"**TEAMNAME**", Points: 30, Jersey: 0, Total: 30, player: 'Jordy' },
            { Position: 8, Naam: 'Brandon McNulty', Team:"**TEAMNAME**", Points: 25, Jersey: 0, Total: 25, player: 'Bart' },
            { Position: 9, Naam: 'Geraint Thomas', Team:"**TEAMNAME**", Points: 20, Jersey: 0, Total: 20, player: 'Roel' },
            { Position: 10, Naam: 'Alexandr Vlasov', Team:"**TEAMNAME**", Points: 17, Jersey: 0, Total: 17, player: 'Dries' },
            { Position: 11, Naam: 'Bruno Armirail', Team:"**TEAMNAME**", Points: 15, Jersey: 0, Total: 15, player: 'Jordy' },
            { Position: 12, Naam: 'Mads Pedersen', Team:"**TEAMNAME**", Points: 14, Jersey: 0, Total: 14, player: 'Bart' },
            { Position: 13, Naam: 'Michael Matthews', Team:"**TEAMNAME**", Points: 13, Jersey: 0, Total: 13, player: 'Roel' },
            { Position: 14, Naam: 'Michael Hepburn', Team:"**TEAMNAME**", Points: 12, Jersey: 0, Total: 12, player: 'Dries' },
            { Position: 15, Naam: 'William Barta', Team:"**TEAMNAME**", Points: 11, Jersey: 0, Total: 11, player: 'Jordy' },
            { Position: 16, Naam: 'Ilan Van Wilder', Team:"**TEAMNAME**", Points: 10, Jersey: 0, Total: 10, player: 'Bart' },
            { Position: 17, Naam: 'Stefan De Bod', Team:"**TEAMNAME**", Points: 9, Jersey: 0, Total: 9, player: 'Roel' },
            { Position: 18, Naam: 'Daan Hoole', Team:"**TEAMNAME**", Points: 8, Jersey: 0, Total: 8, player: 'Dries' },
            { Position: 19, Naam: 'Pavel Sivakov', Team:"**TEAMNAME**", Points: 7, Jersey: 0, Total: 7, player: 'Jordy' },
            { Position: 20, Naam: 'Andreas Leknessund', Team:"**TEAMNAME**", Points: 6, Jersey: 0, Total: 6, player: 'Bart' },
            { Position: 21, Naam: 'Mattia Cattaneo', Team:"**TEAMNAME**", Points: 5, Jersey: 0, Total: 5, player: 'Roel' },
            { Position: 22, Naam: 'Lennard Kamna', Team:"**TEAMNAME**", Points: 4, Jersey: 0, Total: 4, player: 'Dries' },
            { Position: 23, Naam: 'Nico Denz', Team:"**TEAMNAME**", Points: 3, Jersey: 0, Total: 3, player: 'Jordy' },
            { Position: 24, Naam: 'Eddie Dunbar', Team:"**TEAMNAME**", Points: 2, Jersey: 0, Total: 2, player: 'Bart' },
            { Position: 25, Naam: 'Edoardo Affini', Team:"**TEAMNAME**", Points: 1, Jersey: 0, Total: 1, player: 'Roel' }
        ]
    }

    const maxStage = Object.keys(stages).length;


    const myTeam = stages[displayedStage].filter(rider => rider.player === 'Roel');

    const myTeamSorted = [...myTeam].sort((a, b) => b.Total - a.Total);
    const myTopPlayer = myTeamSorted[0];
    const totalPointsMyTeam = myTeam.reduce((total, player) => total + player.Total, 0);

    // Initialize an object to hold the total points for each player
    let playerPoints = {
        'Roel': 0,
        'Dries': 0,
        'Jordy': 0,
        'Bart': 0
    };

    // Loop through each stage from 1 to the current stage
    for (let stage = 1; stage <= parseInt(displayedStage); stage++) {
        // Calculate the total points for each player in the current stage
        let stagePoints = stages[stage].reduce((points, rider) => {
        points[rider.player] = (points[rider.player] || 0) + rider.Total;
        return points;
        }, {});
    
        // Add the stage points to the total points for each player
        for (let player in stagePoints) {
        playerPoints[player] += stagePoints[player];
        }
    }
    

    // Convert the object to an array of players and their total points
    let players = Object.keys(playerPoints).map(name => ({ name, points: playerPoints[name] }));

    // Sort the array in descending order of total points
    let sortedPlayers = players.sort((a, b) => b.points - a.points);

    const recentStages = [
        { stageNumber: '24', nameWinner: "Roel", pointsWinner: 35 },
        { stageNumber: '23', nameWinner: "Bert", pointsWinner: 25 },
        { stageNumber: '22', nameWinner: "Jeroen", pointsWinner: 15 }]

    //router.push('/dashboard')


    

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
                <div className="bg-orange-200 rounded-md relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    {parseInt(displayedStage) > 1 && <button className="hover:opacity-75 hover:scale-110" onClick={(event) => decrementStage(event)}>
                            <img src="/img/decrement.png" alt="Decrement arrow" className="w-20 h-20" />
                        </button>}
                </div>

                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    {parseInt(displayedStage) < maxStage && <button className="hover:opacity-75 hover:scale-110" onClick={(event) => incrementStage(event)}>
                            <img src="/img/increment.png" alt="Increment arrow" className="w-20 h-20" />
                        </button>}
                </div>
                    
                <div className="flex justify-between text-lg font-bold mb-4 pt-8 pr-8 pl-8">
                    <div>Stage: {displayedStage}</div>
                    <div>Total Points: {totalPointsMyTeam}</div>
                </div>
                    <div className="text-lg font-bold mb-4 text-center pt-5">My Team</div>
                    <div className="flex flex-col items-center pt-10">
                        {/* Player with the most points (Top Player) */}
                        {myTopPlayer && (
                            <div className="relative mb-4">
                                <img src="/img/crown.png" alt="Crown" className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-8 h-8" />
                                <img src="/img/white_jersey.jpg" alt="Rider Shirt" className="w-20 h-20" />
                                <div className="mt-2 font-bold">{myTopPlayer.Naam}</div>
                                <div className='mt-2'>({myTopPlayer.Team})</div>
                                <div>{myTopPlayer.Total} Points</div>
                            </div>
                        )}
                        {/* Other Players */}
                        <div className="flex flex-wrap justify-center pb-8" style={{ maxWidth: '375px' }}>
                            {myTeamSorted.slice(1).map((player, index) => (
                                <div key={index} className="mx-2 my-2 text-center">
                                    <img src="/img/rider-shirt.png" alt="Rider Shirt" className="w-16 h-16" />
                                    <div className="mt-2">{player.Naam}</div>
                                    <div className='mt-2'>({player.Team})</div>
                                    <div>{player.Total} Points</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panels */}
            <div className="col-span-1 grid grid-cols-1 gap-4">
                

                {/* Bottom Right Panel */}
                <div className="white p-4">
                    {/* Content for bottom right panel */}
                    {/* ... */}
                    <div className="text-2xl font-bold mb-4">Recent Stages</div>
                    <table className="min-w-full table-fixed">
                        <thead>
                            <tr className="bg-[#1e1e24] text-white">
                                <th className="py-2 px-4 w-3/12">Stage Number</th>
                                <th className="py-2 px-4 w-6/12">Winner</th>
                                <th className="py-2 px-4 w-3/12">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentStages.map((stage, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-4 px-4">{stage.stageNumber}</td>
                                    <td className="py-4 px-4 flex">
                                        <img src="/img/medal-1.png" alt="Gold Medal" className="w-6 h-9 mr-2" />
                                        {stage.nameWinner}
                                    </td>
                                    <td className="py-4 px-4">{stage.pointsWinner}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="py-4 px-4 text-center" colSpan={3}>
                                    <a href="/stage-overview">See all stages</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Top Right Panel (Leaderboard) */}
                <div className="white p-4">
                    <div className="text-2xl font-bold mb-4">Intermediate leaderboard { }</div>
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
        </div>
    )
}

export default Dashboard;