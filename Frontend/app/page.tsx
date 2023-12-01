'use client'
import { Button, Carousel, FloatButton, Switch } from 'antd';
import { useAuthCheck } from './_hooks/useAuthCheck';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DownloadOutlined, LeftCircleOutlined, LeftOutlined, RightCircleOutlined, RightOutlined } from '@ant-design/icons';

interface Rider {
    Position: number,
    Naam: string,
    Team: string,
    Points: number,
    Jersey: number,
    Total: number,
    Player: string,
    Reserved: boolean
}

interface RiderData {
    naam: string;
    total: number;
    team: string;
    reserved: boolean;
    player: string;
}

function Dashboard() {
    const { requireAuth } = useAuthCheck();
    const router = useRouter();



    const currentRace = 'Tour de France';
    const currentYear = '2021';

    const stages: Rider[][] = [
        [
            { Position: 1, Naam: 'Remco Evenepoel', Team: "Soudal-Quick Step", Points: 100, Jersey: 35, Total: 135, Player: 'Roel', Reserved: false },
            { Position: 2, Naam: 'Filippo Ganna', Team: "Soudal-Quick Step", Points: 80, Jersey: 0, Total: 80, Player: 'Dries', Reserved: false },
            { Position: 3, Naam: 'Joao Almeida', Team: "Soudal-Quick Step", Points: 65, Jersey: 0, Total: 65, Player: 'Jordy', Reserved: false },
            { Position: 4, Naam: 'Tao Hart', Team: "Soudal-Quick Step", Points: 55, Jersey: 10, Total: 65, Player: 'Bart', Reserved: false },
            { Position: 5, Naam: 'Stefan Kung', Team: "Soudal-Quick Step", Points: 45, Jersey: 0, Total: 45, Player: 'Roel', Reserved: false },
            { Position: 6, Naam: 'Primoz Roglic', Team: "Soudal-Quick Step", Points: 35, Jersey: 0, Total: 35, Player: 'Dries', Reserved: false },
            { Position: 7, Naam: 'Jay Vine', Team: "Soudal-Quick Step", Points: 30, Jersey: 0, Total: 30, Player: 'Jordy', Reserved: false },
            { Position: 8, Naam: 'Brandon McNulty', Team: "Soudal-Quick Step", Points: 25, Jersey: 0, Total: 25, Player: 'Bart', Reserved: false },
            { Position: 9, Naam: 'Geraint Thomas', Team: "Soudal-Quick Step", Points: 20, Jersey: 0, Total: 20, Player: 'Roel', Reserved: true },
            { Position: 10, Naam: 'Alexandr Vlasov', Team: "Soudal-Quick Step", Points: 17, Jersey: 0, Total: 17, Player: 'Dries', Reserved: true },
            { Position: 11, Naam: 'Bruno Armirail', Team: "Soudal-Quick Step", Points: 15, Jersey: 0, Total: 15, Player: 'Jordy', Reserved: false },
            { Position: 12, Naam: 'Mads Pedersen', Team: "Soudal-Quick Step", Points: 14, Jersey: 0, Total: 14, Player: 'Bart', Reserved: false },
            { Position: 13, Naam: 'Michael Matthews', Team: "Soudal-Quick Step", Points: 113, Jersey: 0, Total: 113, Player: 'Roel', Reserved: false },
            { Position: 14, Naam: 'Michael Hepburn', Team: "Soudal-Quick Step", Points: 12, Jersey: 0, Total: 12, Player: 'Dries', Reserved: false },
            { Position: 15, Naam: 'William Barta', Team: "Soudal-Quick Step", Points: 11, Jersey: 0, Total: 11, Player: 'Jordy', Reserved: false },
            { Position: 16, Naam: 'Ilan Van Wilder', Team: "Soudal-Quick Step", Points: 10, Jersey: 0, Total: 10, Player: 'Bart', Reserved: false },
            { Position: 17, Naam: 'Stefan De Bod', Team: "Soudal-Quick Step", Points: 9, Jersey: 0, Total: 9, Player: 'Roel', Reserved: false },
            { Position: 18, Naam: 'Daan Hoole', Team: "Soudal-Quick Step", Points: 8, Jersey: 0, Total: 8, Player: 'Dries', Reserved: true },
            { Position: 19, Naam: 'Pavel Sivakov', Team: "Soudal-Quick Step", Points: 7, Jersey: 0, Total: 7, Player: 'Jordy', Reserved: false },
            { Position: 20, Naam: 'Andreas Leknessund', Team: "Soudal-Quick Step", Points: 6, Jersey: 0, Total: 6, Player: 'Bart', Reserved: false },
            { Position: 21, Naam: 'Mattia Cattaneo', Team: "Soudal-Quick Step", Points: 5, Jersey: 0, Total: 5, Player: 'Roel', Reserved: true },
            { Position: 22, Naam: 'Lennard Kamna', Team: "Soudal-Quick Step", Points: 4, Jersey: 0, Total: 4, Player: 'Dries', Reserved: false },
            { Position: 23, Naam: 'Nico Denz', Team: "Soudal-Quick Step", Points: 3, Jersey: 0, Total: 3, Player: 'Jordy', Reserved: false },
            { Position: 24, Naam: 'Eddie Dunbar', Team: "Soudal-Quick Step", Points: 2, Jersey: 0, Total: 2, Player: 'Bart', Reserved: false },
            { Position: 25, Naam: 'Edoardo Affini', Team: "Soudal-Quick Step", Points: 1, Jersey: 0, Total: 1, Player: 'Roel', Reserved: false }
        ]
        ,
        [
            { Position: 1, Naam: 'Remco Evenepoel', Team: "Soudal-Quick Step", Points: 10, Jersey: 0, Total: 10, Player: 'Roel', Reserved: false },
            { Position: 2, Naam: 'Filippo Ganna', Team: "Soudal-Quick Step", Points: 80, Jersey: 35, Total: 115, Player: 'Dries', Reserved: false },
            { Position: 3, Naam: 'Joao Almeida', Team: "Soudal-Quick Step", Points: 65, Jersey: 0, Total: 65, Player: 'Jordy', Reserved: false },
            { Position: 4, Naam: 'Tao Hart', Team: "Soudal-Quick Step", Points: 55, Jersey: 10, Total: 65, Player: 'Bart', Reserved: false },
            { Position: 5, Naam: 'Stefan Kung', Team: "Soudal-Quick Step", Points: 45, Jersey: 0, Total: 45, Player: 'Roel', Reserved: false },
            { Position: 6, Naam: 'Primoz Roglic', Team: "Soudal-Quick Step", Points: 35, Jersey: 0, Total: 35, Player: 'Dries', Reserved: false },
            { Position: 7, Naam: 'Jay Vine', Team: "Soudal-Quick Step", Points: 30, Jersey: 0, Total: 30, Player: 'Jordy', Reserved: false },
            { Position: 8, Naam: 'Brandon McNulty', Team: "Soudal-Quick Step", Points: 25, Jersey: 0, Total: 25, Player: 'Bart', Reserved: false },
            { Position: 9, Naam: 'Geraint Thomas', Team: "Soudal-Quick Step", Points: 20, Jersey: 0, Total: 20, Player: 'Roel', Reserved: true },
            { Position: 10, Naam: 'Alexandr Vlasov', Team: "Soudal-Quick Step", Points: 200, Jersey: 0, Total: 200, Player: 'Dries', Reserved: true },
            { Position: 11, Naam: 'Bruno Armirail', Team: "Soudal-Quick Step", Points: 15, Jersey: 0, Total: 15, Player: 'Jordy', Reserved: false },
            { Position: 12, Naam: 'Mads Pedersen', Team: "Soudal-Quick Step", Points: 14, Jersey: 0, Total: 14, Player: 'Bart', Reserved: false },
            { Position: 13, Naam: 'Michael Matthews', Team: "Soudal-Quick Step", Points: 113, Jersey: 0, Total: 113, Player: 'Roel', Reserved: false },
            { Position: 14, Naam: 'Michael Hepburn', Team: "Soudal-Quick Step", Points: 12, Jersey: 0, Total: 12, Player: 'Dries', Reserved: false },
            { Position: 15, Naam: 'William Barta', Team: "Soudal-Quick Step", Points: 11, Jersey: 0, Total: 11, Player: 'Jordy', Reserved: false },
            { Position: 16, Naam: 'Ilan Van Wilder', Team: "Soudal-Quick Step", Points: 10, Jersey: 0, Total: 10, Player: 'Bart', Reserved: false },
            { Position: 17, Naam: 'Stefan De Bod', Team: "Soudal-Quick Step", Points: 9, Jersey: 0, Total: 9, Player: 'Roel', Reserved: false },
            { Position: 18, Naam: 'Daan Hoole', Team: "Soudal-Quick Step", Points: 8, Jersey: 0, Total: 8, Player: 'Dries', Reserved: true },
            { Position: 19, Naam: 'Pavel Sivakov', Team: "Soudal-Quick Step", Points: 7, Jersey: 0, Total: 7, Player: 'Jordy', Reserved: false },
            { Position: 20, Naam: 'Andreas Leknessund', Team: "Soudal-Quick Step", Points: 6, Jersey: 0, Total: 6, Player: 'Bart', Reserved: false },
            { Position: 21, Naam: 'Mattia Cattaneo', Team: "Soudal-Quick Step", Points: 5, Jersey: 0, Total: 5, Player: 'Roel', Reserved: true },
            { Position: 22, Naam: 'Lennard Kamna', Team: "Soudal-Quick Step", Points: 304, Jersey: 0, Total: 304, Player: 'Dries', Reserved: false },
            { Position: 23, Naam: 'Nico Denz', Team: "Soudal-Quick Step", Points: 3, Jersey: 0, Total: 3, Player: 'Jordy', Reserved: false },
            { Position: 24, Naam: 'Eddie Dunbar', Team: "Soudal-Quick Step", Points: 2, Jersey: 0, Total: 2, Player: 'Bart', Reserved: false },
            { Position: 25, Naam: 'Edoardo Affini', Team: "Soudal-Quick Step", Points: 1, Jersey: 0, Total: 1, Player: 'Roel', Reserved: false }
        ]
        ,
        []
    ]


    // handle click on player table row
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

    const handlePlayerClick = (playerName: string) => {
        setSelectedPlayer(playerName);
    };

    // handle hover over player table row
    const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

    const handlePlayerHover = (playerName: string | null) => {
        setHoveredPlayer(playerName);
    };


    const maxStage = Object.keys(stages).length;

    const [currentStage, setCurrentStage] = useState(0);

    //const myTeamSorted = [...myTeam].sort((a, b) => b.Total - a.Total);
    //const myTopPlayer = myTeamSorted[0];


    // Calculate the total points for each player across all stages
    const totalPlayerPoints = stages.flatMap(stage => stage).filter(rider => !rider.Reserved).reduce((acc: { [key: string]: number }, { Total, Player }) => {
        if (Player) {
            acc[Player] = (acc[Player] || 0) + Total;
        }
        return acc;
    }, {});

    const playerPoints = stages[currentStage].filter(rider => !rider.Reserved).reduce((acc: { [key: string]: number }, { Total, Player }) => {
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

    const cumPointsPerStage: RiderData[] = [];
    let cumPointsPerPlayer: RiderData[] = [];
    function calcCumPointsPerPlayer() {
        cumPointsPerPlayer = [];
        for (let i = 0; i <= currentStage; i++) {
            for (let rider of stages[i]) {
                const existingRiderIndex = cumPointsPerPlayer.findIndex(item => item.naam === rider.Naam);

                if (existingRiderIndex === -1) {
                    cumPointsPerPlayer.push({
                        naam: rider.Naam,
                        total: rider.Total,
                        team: rider.Team,
                        reserved: rider.Reserved,
                        player: rider.Player
                    });
                } else {
                    cumPointsPerPlayer[existingRiderIndex].total += rider.Total;
                }
            }
        }
        return cumPointsPerPlayer;
    }

    //Calculate the total points for current selected player
    for (let i = 0; i <= currentStage; i++) {
        for (let rider of stages[i]) {
            if (rider.Player === selectedPlayer) {
                const existingRiderIndex = cumPointsPerStage.findIndex(item => item.naam === rider.Naam);

                if (existingRiderIndex === -1) {
                    cumPointsPerStage.push({
                        naam: rider.Naam,
                        total: rider.Total,
                        team: rider.Team,
                        reserved: rider.Reserved,
                        player: rider.Player
                    });
                } else {
                    cumPointsPerStage[existingRiderIndex].total += rider.Total;
                }
            }
        }
    }



    function checkScore(currentStageRank: number, previousStageRank: number) {

        if (currentStageRank > previousStageRank) {
            return 'redarrow.png';
        } else if (currentStageRank < previousStageRank) {
            return 'greenarrow.png';
        }
        return 'dash.png'
    }

    function getTotalForPlayer(stage2: string, playerName: string) {

        let total2 = 0;

        stages[stage2].forEach((player: { player: string; Total: number; }) => {
            if (player.player === playerName) {


                total2 += player.Total;

            }
        });


        return total2;
    }

    const getSortedPointsPerPlayerTillStage = () => {
        sortedPlayers.map(player => {
            const totalPoints = cumPointsPerStage
                .filter(rider => rider.player === player.name)
                .reduce((sum, rider) => sum + rider.total, 0);

            return { playerName: player.name, totalPoints };
        });
    };

    const [displayedStage, setDisplayedStage] = useState('1');
    const incrementStage = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setDisplayedStage(prevStage => (parseInt(prevStage) + 1).toString());
    };

    const decrementStage = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (parseInt(displayedStage) > 1) {
            setDisplayedStage(prevStage => (parseInt(prevStage) - 1).toString());
        }
    };
    // Loop through each stage from 1 to the current stage
    for (let stage = 1; stage <= parseInt(displayedStage); stage++) {
        // Calculate the total points for each player in the current stage
        let stagePoints = stages[stage].reduce((points, rider) => {
            points[rider.Player] = (points[rider.Player] || 0) + rider.Total;
            return points;
        }, {});

        // Add the stage points to the total points for each player
        for (let player in stagePoints) {
            playerPoints[player] += stagePoints[player];
        }
    }

    function getPlayerDifference(playerName: string): number {
        const stage1Total = getTotalForPlayer(stages['1'], playerName);
        const stage2Total = getTotalForPlayer(stages['2'], playerName);
        console.log(stage1Total, stage2Total)
        return stage2Total - stage1Total;
    }


    function convert(arr: RiderData[]) {
        return arr.map(item => ({
            name: item.naam,
            team: item.team,
            points: item.total,
            reserved: item.reserved,
            player: item.player
        }));
    }

    const [prevSortedPlayers, setPrevSortedPlayers] = useState<{ name: string; points: number; }[]>([]);

    var sortedCumPointsPerStage = convert(cumPointsPerStage).sort((a, b) => b.points - a.points);
    var sortedCumPointsPerStageWithoutTop = sortedCumPointsPerStage.slice(1)
    var topPlayerCum = sortedCumPointsPerStage[0]


    console.log(calcCumPointsPerPlayer());

    const [cumPoints, setCumPoints] = useState(false);

    const onChange = (checked: boolean) => {
        if (checked)
            setCumPoints(checked);

    };

    //requireAuth();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);

        setCumPoints(checked);

    };


    return (
        <div className="grid grid-cols-3 gap-4 h-screen px-10 pt-5">
            {isSwitchOn ?
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

                    <Carousel afterChange={e => { setPrevSortedPlayers(sortedPlayers), setCurrentStage(e) }} className="bg-orange-200" arrows={true} prevArrow={<LeftCircleOutlined />} nextArrow={<RightCircleOutlined />} waitForAnimate={true} easing="easeIn" speed={1000} style={{}}>
                        {stages.map((stage, index) => (<>

                            <div className="flex justify-between text-lg font-bold mb-4 pt-8 pr-8 pl-8">
                                <div>Stage:{index + 1}</div>
                                <div>Total Points: {sortedCumPointsPerStage.filter(rider => !rider.reserved).reduce((sum, rider) => sum + rider.points, 0)}
                                </div>
                            </div>
                            <div className="text-lg font-bold mb-4 text-center pt-5">My Team</div>
                            <div className="flex flex-col items-center pt-10">
                                {/* Player with the most points (Top Player) */}
                                {stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0] && (
                                    <div className="relative mb-4 text-lg">
                                        <img src="/img/crown.png" alt="Crown" className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-8 h-8" />
                                        <img src="/img/yellow_jersey.png" alt="Rider Shirt" className="relative left-1/2 transform -translate-x-1/2 w-20 h-20" />
                                        <div className="mt-2 font-bold">{(cumPoints) ? topPlayerCum.name : stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0].Naam}</div>
                                        <div style={{ fontSize: '0.85em' }}>({(cumPoints) ? topPlayerCum.team : stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0].Team})</div>
                                        <div className="italic font-semibold">{(cumPoints) ? topPlayerCum.points : stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0].Total} Points</div>
                                    </div>
                                )}
                                {/* Other Players */}
                                <div className="flex flex-wrap justify-center pb-8 text-lg font-semibold" style={{ maxWidth: '55rem' }}>
                                    {stage
                                        .filter(rider => rider.Player === selectedPlayer)
                                        .sort((a, b) => b.Total - a.Total)
                                        .slice(1)
                                        .map((player, index) => (
                                            <div
                                                key={index}
                                                className={`mx-2 my-2 text-center flex-1 p-4 ${sortedCumPointsPerStageWithoutTop[index].reserved ? 'opacity-50' : ''
                                                    }`}
                                            >
                                                {sortedCumPointsPerStageWithoutTop[index].reserved ?
                                                    <img src="/img/sub_shirt.png" alt="Rider Shirt" className="w-16 h-16 relative left-1/2 transform -translate-x-1/2 " />
                                                    :
                                                    <img src="/img/rider-shirt.png" alt="Rider Shirt" className="w-16 h-16 relative left-1/2 transform -translate-x-1/2 " />}
                                                <div className="mt-2">{sortedCumPointsPerStageWithoutTop[index].name}</div>
                                                <div style={{ fontSize: '0.7em' }}>({sortedCumPointsPerStageWithoutTop[index].team})</div>
                                                <div className='italic'>{sortedCumPointsPerStageWithoutTop[index].points} Points</div>
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


                :

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
                                <div>Total Points: {(cumPoints) ? sortedCumPointsPerStage.reduce((sum, rider) => sum + rider.points, 0) : stage.filter(rider => rider.Player === selectedPlayer).filter(rider => !rider.Reserved).reduce((total, player) => total + player.Total, 0)}
                                </div>
                            </div>
                            <div className="text-lg font-bold mb-4 text-center pt-5">{selectedPlayer}</div>
                            <div className="flex flex-col items-center pt-10">
                                {/* Player with the most points (Top Player) */}
                                {stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0] && (
                                    <div className="relative mb-4 text-lg">
                                        <img src="/img/crown.png" alt="Crown" className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-8 h-8" />
                                        <img src="/img/yellow_jersey.png" alt="Rider Shirt" className="relative left-1/2 transform -translate-x-1/2 w-20 h-20" />
                                        <div className="mt-2 font-bold">{(cumPoints) ? topPlayerCum.name : stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0].Naam}</div>
                                        <div style={{ fontSize: '0.85em' }}>({(cumPoints) ? topPlayerCum.team : stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0].Team})</div>
                                        <div className="italic font-semibold">{(cumPoints) ? topPlayerCum.points : stage.filter(rider => rider.Player === selectedPlayer).sort((a, b) => b.Total - a.Total)[0].Total} Points</div>
                                    </div>
                                )}
                                {/* Other Players */}
                                <div className="flex flex-wrap justify-center pb-8 text-lg font-semibold" style={{ maxWidth: '55rem' }}>
                                    {stage.filter(rider => rider.Player === selectedPlayer).filter(rider => rider.Reserved === false).sort((a, b) => b.Total - a.Total).slice(1).map((player, index) => (
                                        <div key={index} className="mx-2 my-2 text-center flex-1 p-4">
                                            <img src="/img/rider-shirt.png" alt="Rider Shirt" className="w-16 h-16 relative left-1/2 transform -translate-x-1/2 " />
                                            <div className="mt-2">{(cumPoints) ? sortedCumPointsPerStageWithoutTop[index].name : player.Naam}</div>
                                            <div style={{ fontSize: '0.7em' }}>({(cumPoints) ? sortedCumPointsPerStageWithoutTop[index].team : player.Team})</div>
                                            <div className=' italic '>{(cumPoints) ? sortedCumPointsPerStage[index].points : player.Total} Points</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Reserved */}
                                <div className="flex flex-wrap justify-center pb-8 text-lg font-semibold" style={{ maxWidth: '55rem' }}>
                                    {stage.filter(rider => rider.Player === selectedPlayer).filter(rider => rider.Reserved === true).map((player, index) => (
                                        <div key={index} className="mx-2 my-2 text-center flex-1 p-4 opacity-50">
                                            <img src="/img/sub_shirt.png" alt="Rider Shirt" className="w-16 h-16 relative left-1/2 transform -translate-x-1/2 " />
                                            <div className="mt-2">{(cumPoints) ? sortedCumPointsPerStageWithoutTop[index].name : player.Naam}</div>
                                            <div style={{ fontSize: '0.7em' }}>({(cumPoints) ? sortedCumPointsPerStageWithoutTop[index].team : player.Team})</div>
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

                </div>}
            {/* Left Panel */}


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
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                    onMouseEnter={() => handlePlayerHover(player.name)}
                                    onMouseLeave={() => handlePlayerHover(null)}
                                    onClick={() => handlePlayerClick(player.name)}
                                    style={{ transition: 'ease-in-out 0.1s', cursor: 'pointer', backgroundColor: hoveredPlayer === player.name ? '#e9dbff' : '' }}>
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
                {isSwitchOn ?
                    <div className="white p-4">
                        <div className="text-2xl font-bold mb-4">Cummulative Leaderboard { }</div>
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#1e1e24]">
                                    <th className="py-2 px-4 whitespace-nowrap text-white">Ranking</th>
                                    <th className="py-2 px-4 text-white">Name</th>
                                    <th className="py-2 px-4 text-white">Points</th>
                                    <th className="py-2 px-4 text-white"></th>
                                    <th className="py-2 px-4 text-white"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPlayers.map((player, index, array) => {
                                    const previousIndex = prevSortedPlayers.findIndex(item => item.name === player.name);
                                    const arrowImage = checkScore(index, previousIndex);

                                    const stageDifference = getTotalForPlayer(displayedStage, player.name);

                                    return (
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
                                            <td className="py-2 px-4">
                                                <img src={`/img/${arrowImage}`} alt="Arrow" className="w-6 h-6 mr-2" />
                                            </td>
                                            <td className="py-2 px-4">{calcCumPointsPerPlayer().filter(rider => rider.player === player.name).filter(rider => !rider.reserved).reduce((sum, rider) => sum + rider.total, 0)}
                                            </td>
                                            <td className="py-2 px-4" style={{ color: 'lightGreen' }}>
                                                {'+' + player.points}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    :

                    <div className="white p-4">
                        <div className="text-2xl font-bold mb-4">Stage Leaderboard { }</div>
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#1e1e24]">
                                    <th className="py-2 px-4 whitespace-nowrap text-white">Ranking</th>
                                    <th className="py-2 px-4 text-white">Name</th>
                                    <th className="py-2 px-4 text-white">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPlayers.map((player, index) => (
                                    <tr
                                        key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                        onMouseEnter={() => handlePlayerHover(player.name)}
                                        onMouseLeave={() => handlePlayerHover(null)}
                                        onClick={() => handlePlayerClick(player.name)}
                                        style={{ transition: 'ease-in-out 0.1s', cursor: 'pointer', backgroundColor: hoveredPlayer === player.name ? '#e9dbff' : '' }}>
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
                }
            </div>
        </div >
    )
}

export default Dashboard;