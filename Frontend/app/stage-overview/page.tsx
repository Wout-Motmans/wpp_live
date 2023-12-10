'use client'
import { useState } from 'react';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useAuth } from '../_contexts/authContext';

interface StageData {
    Position: number;
    Naam: string;
    Team: string;
    Points: number;
    Jersey: number;
    Total: number;
    player: string;
}

interface Stage {
    id: number;
    stageInfo: string;
    stage_contents: StageData[] | null;
}

export default function StageOverview() {
    const { requireAuth } = useAuthCheck();
    const { isLoggedIn } = useAuth();
    requireAuth();
    const [showDetails, setShowDetails] = useState(-1);
    const [selectedStage, setSelectedStage] = useState<StageData[] | null>(null);
    const stage_1: StageData[] = [
        { Position: 1, Naam: 'Remco Evenepoel',Team:"Soudal-Quick Step", Points: 100, Jersey: 35, Total: 135, player: 'Roel' },
        { Position: 2, Naam: 'Filippo Ganna', Team:"", Points: 80, Jersey: 0, Total: 80, player: 'Dries' },
        { Position: 3, Naam: 'Joao Almeida', Team:"", Points: 65, Jersey: 0, Total: 65, player: 'Jordy' },
        { Position: 4, Naam: 'Tao Hart', Team:"", Points: 55, Jersey: 10, Total: 65, player: 'Bart' },
        { Position: 5, Naam: 'Stefan Kung', Team:"", Points: 45, Jersey: 0, Total: 45, player: 'Roel' },
        { Position: 6, Naam: 'Primoz Roglic', Team:"", Points: 35, Jersey: 0, Total: 35, player: 'Dries' },
        { Position: 7, Naam: 'Jay Vine', Team:"", Points: 30, Jersey: 0, Total: 30, player: 'Jordy' },
        { Position: 8, Naam: 'Brandon McNulty', Team:"", Points: 25, Jersey: 0, Total: 25, player: 'Bart' },
        { Position: 9, Naam: 'Geraint Thomas', Team:"", Points: 20, Jersey: 0, Total: 20, player: 'Roel' },
        { Position: 10, Naam: 'Alexandr Vlasov', Team:"", Points: 17, Jersey: 0, Total: 17, player: 'Dries' },
        { Position: 11, Naam: 'Bruno Armirail', Team:"", Points: 15, Jersey: 0, Total: 15, player: 'Jordy' },
        { Position: 12, Naam: 'Mads Pedersen', Team:"", Points: 14, Jersey: 0, Total: 14, player: 'Bart' },
        { Position: 13, Naam: 'Michael Matthews', Team:"", Points: 13, Jersey: 0, Total: 13, player: 'Roel' },
        { Position: 14, Naam: 'Michael Hepburn', Team:"", Points: 12, Jersey: 0, Total: 12, player: 'Dries' },
        { Position: 15, Naam: 'William Barta', Team:"", Points: 11, Jersey: 0, Total: 11, player: 'Jordy' },
        { Position: 16, Naam: 'Ilan Van Wilder', Team:"", Points: 10, Jersey: 0, Total: 10, player: 'Bart' },
        { Position: 17, Naam: 'Stefan De Bod', Team:"", Points: 9, Jersey: 0, Total: 9, player: 'Roel' },
        { Position: 18, Naam: 'Daan Hoole', Team:"", Points: 8, Jersey: 0, Total: 8, player: 'Dries' },
        { Position: 19, Naam: 'Pavel Sivakov', Team:"", Points: 7, Jersey: 0, Total: 7, player: 'Jordy' },
        { Position: 20, Naam: 'Andreas Leknessund', Team:"", Points: 6, Jersey: 0, Total: 6, player: 'Bart' },
        { Position: 21, Naam: 'Mattia Cattaneo', Team:"", Points: 5, Jersey: 0, Total: 5, player: 'Roel' },
        { Position: 22, Naam: 'Lennard Kamna', Team:"", Points: 4, Jersey: 0, Total: 4, player: 'Dries' },
        { Position: 23, Naam: 'Nico Denz', Team:"", Points: 3, Jersey: 0, Total: 3, player: 'Jordy' },
        { Position: 24, Naam: 'Eddie Dunbar', Team:"", Points: 2, Jersey: 0, Total: 2, player: 'Bart' },
        { Position: 25, Naam: 'Edoardo Affini', Team:"", Points: 1, Jersey: 0, Total: 1, player: 'Roel' }
    ];

    const stage_2: StageData[] = [
        { Position: 1, Naam: 'Coole Gast', Team:"", Points: 100, Jersey: 35, Total: 135, player: 'Dries' },
        { Position: 2, Naam: 'Gekke Gast', Team:"", Points: 80, Jersey: 0, Total: 80, player: 'Dries' },
        { Position: 3, Naam: 'Wacko Gast', Team:"", Points: 65, Jersey: 0, Total: 65, player: '' },
        { Position: 4, Naam: 'Tao Hart', Team:"", Points: 55, Jersey: 10, Total: 65, player: 'Bart' },
        { Position: 5, Naam: 'Stefan Kung', Team:"", Points: 45, Jersey: 0, Total: 45, player: 'Roel' },
        { Position: 6, Naam: 'Primoz Roglic', Team:"", Points: 35, Jersey: 0, Total: 35, player: 'Dries' },
        { Position: 7, Naam: 'Jay Vine', Team:"", Points: 30, Jersey: 0, Total: 30, player: 'Jordy' },
        { Position: 8, Naam: 'Brandon McNulty', Team:"", Points: 25, Jersey: 0, Total: 25, player: 'Bart' },
        { Position: 9, Naam: 'Geraint Thomas', Team:"", Points: 20, Jersey: 0, Total: 20, player: 'Roel' },
        { Position: 10, Naam: 'Alexandr Vlasov', Team:"", Points: 17, Jersey: 0, Total: 17, player: 'Dries' },
        { Position: 11, Naam: 'Bruno Armirail', Team:"", Points: 15, Jersey: 0, Total: 15, player: 'Jordy' },
        { Position: 12, Naam: 'Mads Pedersen', Team:"", Points: 14, Jersey: 0, Total: 14, player: 'Bart' },
        { Position: 13, Naam: 'Michael Matthews', Team:"", Points: 13, Jersey: 0, Total: 13, player: 'Roel' },
        { Position: 14, Naam: 'Michael Hepburn', Team:"", Points: 12, Jersey: 0, Total: 12, player: 'Dries' },
        { Position: 15, Naam: 'William Barta', Team:"", Points: 11, Jersey: 0, Total: 11, player: 'Jordy' },
        { Position: 16, Naam: 'Ilan Van Wilder', Team:"", Points: 10, Jersey: 0, Total: 10, player: 'Bart' },
        { Position: 17, Naam: 'Stefan De Bod', Team:"", Points: 9, Jersey: 0, Total: 9, player: 'Roel' },
        { Position: 18, Naam: 'Daan Hoole', Team:"", Points: 8, Jersey: 0, Total: 8, player: 'Dries' },
        { Position: 19, Naam: 'Pavel Sivakov', Team:"", Points: 7, Jersey: 0, Total: 7, player: 'Jordy' },
        { Position: 20, Naam: 'Andreas Leknessund', Team:"", Points: 6, Jersey: 0, Total: 6, player: 'Bart' },
        { Position: 21, Naam: 'Mattia Cattaneo', Team:"", Points: 5, Jersey: 0, Total: 5, player: 'Roel' },
        { Position: 22, Naam: 'Lennard Kamna', Team:"", Points: 4, Jersey: 0, Total: 4, player: 'Dries' },
        { Position: 23, Naam: 'Nico Denz', Team:"", Points: 3, Jersey: 0, Total: 3, player: 'Jordy' },
        { Position: 24, Naam: 'Eddie Dunbar', Team:"", Points: 2, Jersey: 0, Total: 2, player: 'Bart' },
        { Position: 25, Naam: 'Edoardo Affini', Team:"", Points: 1, Jersey: 0, Total: 1, player: 'Roel' }
    ];

    const stages: Stage[] = [
        { id: 1, stageInfo: "Stage 1 | Brest - Landerneau", stage_contents: stage_1 },
        { id: 2, stageInfo: "Stage 2 | Perros-Guirec - Mûr-de-Bretagne Guerlédan", stage_contents: stage_2 },
        // Add more stages as needed
    ];

    const getRowClassName = (name: string, column: string) => {
        if (column === 'Position' || column === 'Naam') {
            switch (name) {
                case 'Roel':
                    return 'bg-green-100'; // Replace with the desired class for Roel.
                case 'Dries':
                    return 'bg-blue-100'; // Replace with the desired class for Dries.
                case 'Jordy':
                    return 'bg-red-100'; // Replace with the desired class for Jordy.
                case 'Bart':
                    return 'bg-yellow-100'; // Replace with the desired class for Bart.
                default:
                    return '';
            }
        }
        return '';
    };

    const handleStageClick = (stage: Stage) => {
        if (showDetails === stage.id) {
            setShowDetails(-1); // Clicked on the same stage, so close it
        } else {
            setSelectedStage(stage.stage_contents);
            setShowDetails(stage.id);
        }
    };

    return (
        !isLoggedIn
        ?
        <h1>LOADING</h1>
        :
        <div className="flex">
            <div className="w-1/3 p-4 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Stages</h1>
                <ul>
                    {stages.map((stage) => (
                        <li
                            key={stage.id}
                            className={`cursor-pointer text-blue-500 hover:underline ${
                                showDetails === stage.id ? 'font-bold' : ''
                            }`}
                            onClick={() => handleStageClick(stage)}
                        >
                            {stage.stageInfo}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 p-4">
                {showDetails && selectedStage && (
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-4">Stage Details</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                <tr>
                                    <th className="py-2 px-4 text-left">Position</th>
                                    <th className="py-2 px-4 text-left">Naam</th>
                                    <th className="py-2 px-4 text-left">Team</th>
                                    <th className="py-2 px-4 text-left">Points</th>
                                    <th className="py-2 px-4 text-left">Jersey</th>
                                    <th className="py-2 px-4 text-left">Total</th>
                                    <th className="py-2 px-4 text-left">Player</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedStage.map((stageData, index) => (
                                    <tr key={index}>
                                        <td className={`py-2 px-4 ${getRowClassName(stageData.player, 'Position')}`}>
                                            {stageData.Position}
                                        </td>
                                        <td className={`py-2 px-4 ${getRowClassName(stageData.player, 'Naam')}`}>
                                            {stageData.Naam}
                                        </td>
                                        <td className="py-2 px-4">{stageData.Team}</td>
                                        <td className="py-2 px-4">{stageData.Points}</td>
                                        <td className="py-2 px-4">{stageData.Jersey}</td>
                                        <td className="py-2 px-4">{stageData.Total}</td>
                                        <td className="py-2 px-4">{stageData.player}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



const getStageInfo = async (): Promise<any[]> => {
    try {
        const response = await fetch(`/api/getUnfinishedGames`);
        if (!response.ok) throw new Error('getUnfinishedGames error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getUnfinishedGames error:', error);
        throw error;
    }
};