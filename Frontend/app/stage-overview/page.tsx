'use client'
import { useState } from 'react';
import { useAuthCheck } from '../_hooks/useAuthCheck';

export default function StageOverview() {
    const { requireAuth } = useAuthCheck();
    requireAuth()
    const [showDetails, setShowDetails] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);

    const stage_1 = [
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
    ];

    const stage_2 = [
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
    ];

    const stages = [
        { id: 1, stageInfo: "Stage 1 | Brest - Landerneau", stage_contents: stage_1},
        { id: 2, stageInfo: "Stage 2 | Perros-Guirec - Mûr-de-Bretagne Guerlédan", stage_contents: stage_2},
        // Add more stages as needed
    ];

    const getRowClassName = (name) => {
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
    };
    

    const handleStageClick = (stage) => {
        if (showDetails === stage.id) {
            // Clicked on the same stage, so close it
            setShowDetails(null);
        } else {
            setSelectedStage(stage.stage_contents);
            setShowDetails(stage.id);
        }
    };

    return (
        <div className="flex">
            <div className="w-1/3 p-4">
                <h1 className="text-2xl font-bold mb-4">Stages</h1>
                <ul>
                    {stages.map((stage) => (
                        <li
                            key={stage.id}
                            className={`cursor-pointer text-blue-500 hover:underline ${
                                selectedStage === stage ? 'font-bold' : ''
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
                        <h2 className="text-xl font-bold">Stage Details</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4">Position</th>
                                    <th className="py-2 px-4">Naam</th>
                                    <th className="py-2 px-4">Team</th>
                                    <th className="py-2 px-4">Points</th>
                                    <th className="py-2 px-4">Jersey</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Player</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedStage.map((stageData) => (
                                    <tr key={stageData.Position} className={getRowClassName(stageData.player)}>
                                        <td className="py-2 px-4">{stageData.Position}</td>
                                        <td className="py-2 px-4">{stageData.Naam}</td>
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
                )}
            </div>
        </div>
    );
}
