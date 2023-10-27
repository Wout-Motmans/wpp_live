'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const { requireAuth } = useAuthCheck();
    const router = useRouter();

    const currentRace = 'Tour de France';
    const currentYear = '2021';

    const myTeam = [
        { riderName: 'Klaas', totalPoints: 0 },
        { riderName: 'Hans', totalPoints: 25 },
        { riderName: 'Pieter', totalPoints: 50 },
        { riderName: 'Dirk', totalPoints: 75 },
        { riderName: 'Jasper', totalPoints: 200 },
        { riderName: 'Joris', totalPoints: 100 },
        { riderName: 'Jeroen', totalPoints: 150 },
        { riderName: 'Bert', totalPoints: 125 },
        { riderName: 'Roel', totalPoints: 175 }]

    const myTeamSorted = [...myTeam].sort((a, b) => b.totalPoints - a.totalPoints);
    const myTopPlayer = myTeamSorted[0];
    const totalPointsMyTeam = myTeam.reduce((total, player) => total + player.totalPoints, 0);

    const players = [
        { name: 'Roel', points: 0 },
        { name: 'Bert', points: 25 },
        { name: 'Jeroen', points: 50 },
        { name: 'Joris', points: 75 }]

    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

    const recentStages = [
        { stageNumber: '24', nameWinner: "Roel", pointsWinner: 35 },
        { stageNumber: '23', nameWinner: "Bert", pointsWinner: 25 },
        { stageNumber: '22', nameWinner: "Jeroen", pointsWinner: 15 }]

    router.push('/dashboard')


    //requireAuth();

    return (
        <div className="grid grid-cols-3 gap-4 h-screen px-10 pt-5">
            {/* Left Panel */}
            <div className="col-span-2 bg-white p-4 flex flex-col">
                {/* Content for left panel */}
                {/* ... */}
                <div className="flex items-baseline">
                    <div className="text-2xl font-bold mb-4">{currentRace} {currentYear}</div>
                    <div className="flex items-center ml-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div> {/* Green Dot */}
                        <div className="text-green-500 font-bold">Live</div>
                    </div>
                </div>
                <div className="bg-orange-200 rounded-md">
                    {/* Display total points of all riders in your team */}
                    <div className="text-lg font-bold mb-4 text-right pt-8 pr-8">
                        Total Points: {totalPointsMyTeam}
                    </div>
                    <div className="text-lg font-bold mb-4 text-center pt-5">My Team</div>
                    <div className="flex flex-col items-center pt-10">
                        {/* Player with the most points (Top Player) */}
                        {myTopPlayer && (
                            <div className="relative mb-4">
                                <img src="/img/crown.png" alt="Crown" className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-8 h-8" />
                                <img src="/img/rider-shirt.png" alt="Rider Shirt" className="w-20 h-20" />
                                <div className="mt-2 font-bold">{myTopPlayer.riderName}</div>
                                <div>{myTopPlayer.totalPoints} Points</div>
                            </div>
                        )}
                        {/* Other Players */}
                        <div className="flex flex-wrap justify-center pb-8" style={{ maxWidth: '375px' }}>
                            {myTeamSorted.slice(1).map((player, index) => (
                                <div key={index} className="mx-2 my-2 text-center">
                                    <img src="/img/rider-shirt.png" alt="Rider Shirt" className="w-16 h-16" />
                                    <div className="mt-2">{player.riderName}</div>
                                    <div>{player.totalPoints} Points</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panels */}
            <div className="col-span-1 grid grid-cols-1 gap-4">
                {/* Top Right Panel (Leaderboard) */}
                <div className="white p-4">
                    <div className="text-2xl font-bold mb-4">Leaderboard</div>
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
                        </tbody>
                        <tfoot className="items-center">
                            <a href="" className="">See All Stages</a>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
