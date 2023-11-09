'use client'
import { useState } from 'react';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useRouter } from 'next/navigation';

function StageOverview() {
    const { requireAuth } = useAuthCheck();
    const router = useRouter();
    const [showDetails, setShowDetails] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);

    const stage_1 = [
        { Positie: 1, Naam: 'Remco Evenepoel', Punten: 100, Truien: 35, Totaal: 135, player: 'Roel' },
        { Positie: 2, Naam: 'Filippo Ganna', Punten: 80, Truien: 0, Totaal: 80, player: 'Dries' },
        { Positie: 3, Naam: 'Joao Almeida', Punten: 65, Truien: 0, Totaal: 65, player: 'Jordy' },
        { Positie: 4, Naam: 'Tao Hart', Punten: 55, Truien: 10, Totaal: 65, player: 'Bart' },
        { Positie: 5, Naam: 'Stefan Kung', Punten: 45, Truien: 0, Totaal: 45, player: 'Roel' },
        { Positie: 6, Naam: 'Primoz Roglic', Punten: 35, Truien: 0, Totaal: 35, player: 'Dries' },
        { Positie: 7, Naam: 'Jay Vine', Punten: 30, Truien: 0, Totaal: 30, player: 'Jordy' },
        { Positie: 8, Naam: 'Brandon McNulty', Punten: 25, Truien: 0, Totaal: 25, player: 'Bart' },
        { Positie: 9, Naam: 'Geraint Thomas', Punten: 20, Truien: 0, Totaal: 20, player: 'Roel' },
        { Positie: 10, Naam: 'Alexandr Vlasov', Punten: 17, Truien: 0, Totaal: 17, player: 'Dries' },
        { Positie: 11, Naam: 'Bruno Armirail', Punten: 15, Truien: 0, Totaal: 15, player: 'Jordy' },
        { Positie: 12, Naam: 'Mads Pedersen', Punten: 14, Truien: 0, Totaal: 14, player: 'Bart' },
        { Positie: 13, Naam: 'Michael Matthews', Punten: 13, Truien: 0, Totaal: 13, player: 'Roel' },
        { Positie: 14, Naam: 'Michael Hepburn', Punten: 12, Truien: 0, Totaal: 12, player: 'Dries' },
        { Positie: 15, Naam: 'William Barta', Punten: 11, Truien: 0, Totaal: 11, player: 'Jordy' },
        { Positie: 16, Naam: 'Ilan Van Wilder', Punten: 10, Truien: 0, Totaal: 10, player: 'Bart' },
        { Positie: 17, Naam: 'Stefan De Bod', Punten: 9, Truien: 0, Totaal: 9, player: 'Roel' },
        { Positie: 18, Naam: 'Daan Hoole', Punten: 8, Truien: 0, Totaal: 8, player: 'Dries' },
        { Positie: 19, Naam: 'Pavel Sivakov', Punten: 7, Truien: 0, Totaal: 7, player: 'Jordy' },
        { Positie: 20, Naam: 'Andreas Leknessund', Punten: 6, Truien: 0, Totaal: 6, player: 'Bart' },
        { Positie: 21, Naam: 'Mattia Cattaneo', Punten: 5, Truien: 0, Totaal: 5, player: 'Roel' },
        { Positie: 22, Naam: 'Lennard Kamna', Punten: 4, Truien: 0, Totaal: 4, player: 'Dries' },
        { Positie: 23, Naam: 'Nico Denz', Punten: 3, Truien: 0, Totaal: 3, player: 'Jordy' },
        { Positie: 24, Naam: 'Eddie Dunbar', Punten: 2, Truien: 0, Totaal: 2, player: 'Bart' },
        { Positie: 25, Naam: 'Edoardo Affini', Punten: 1, Truien: 0, Totaal: 1, player: 'Roel' }
    ];

    const stage_2 = [
        { Positie: 1, Naam: 'Coole Gast', Punten: 100, Truien: 35, Totaal: 135, player: 'Dries' },
        { Positie: 2, Naam: 'Gekke Gast', Punten: 80, Truien: 0, Totaal: 80, player: 'Dries' },
        { Positie: 3, Naam: 'Wacko Gast', Punten: 65, Truien: 0, Totaal: 65, player: '' },
        { Positie: 4, Naam: 'Tao Hart', Punten: 55, Truien: 10, Totaal: 65, player: 'Bart' },
        { Positie: 5, Naam: 'Stefan Kung', Punten: 45, Truien: 0, Totaal: 45, player: 'Roel' },
        { Positie: 6, Naam: 'Primoz Roglic', Punten: 35, Truien: 0, Totaal: 35, player: 'Dries' },
        { Positie: 7, Naam: 'Jay Vine', Punten: 30, Truien: 0, Totaal: 30, player: 'Jordy' },
        { Positie: 8, Naam: 'Brandon McNulty', Punten: 25, Truien: 0, Totaal: 25, player: 'Bart' },
        { Positie: 9, Naam: 'Geraint Thomas', Punten: 20, Truien: 0, Totaal: 20, player: 'Roel' },
        { Positie: 10, Naam: 'Alexandr Vlasov', Punten: 17, Truien: 0, Totaal: 17, player: 'Dries' },
        { Positie: 11, Naam: 'Bruno Armirail', Punten: 15, Truien: 0, Totaal: 15, player: 'Jordy' },
        { Positie: 12, Naam: 'Mads Pedersen', Punten: 14, Truien: 0, Totaal: 14, player: 'Bart' },
        { Positie: 13, Naam: 'Michael Matthews', Punten: 13, Truien: 0, Totaal: 13, player: 'Roel' },
        { Positie: 14, Naam: 'Michael Hepburn', Punten: 12, Truien: 0, Totaal: 12, player: 'Dries' },
        { Positie: 15, Naam: 'William Barta', Punten: 11, Truien: 0, Totaal: 11, player: 'Jordy' },
        { Positie: 16, Naam: 'Ilan Van Wilder', Punten: 10, Truien: 0, Totaal: 10, player: 'Bart' },
        { Positie: 17, Naam: 'Stefan De Bod', Punten: 9, Truien: 0, Totaal: 9, player: 'Roel' },
        { Positie: 18, Naam: 'Daan Hoole', Punten: 8, Truien: 0, Totaal: 8, player: 'Dries' },
        { Positie: 19, Naam: 'Pavel Sivakov', Punten: 7, Truien: 0, Totaal: 7, player: 'Jordy' },
        { Positie: 20, Naam: 'Andreas Leknessund', Punten: 6, Truien: 0, Totaal: 6, player: 'Bart' },
        { Positie: 21, Naam: 'Mattia Cattaneo', Punten: 5, Truien: 0, Totaal: 5, player: 'Roel' },
        { Positie: 22, Naam: 'Lennard Kamna', Punten: 4, Truien: 0, Totaal: 4, player: 'Dries' },
        { Positie: 23, Naam: 'Nico Denz', Punten: 3, Truien: 0, Totaal: 3, player: 'Jordy' },
        { Positie: 24, Naam: 'Eddie Dunbar', Punten: 2, Truien: 0, Totaal: 2, player: 'Bart' },
        { Positie: 25, Naam: 'Edoardo Affini', Punten: 1, Truien: 0, Totaal: 1, player: 'Roel' }
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
                                    <th className="py-2 px-4">Positie</th>
                                    <th className="py-2 px-4">Naam</th>
                                    <th className="py-2 px-4">Punten</th>
                                    <th className="py-2 px-4">Truien</th>
                                    <th className="py-2 px-4">Totaal</th>
                                    <th className="py-2 px-4">Player</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedStage.map((stageData) => (
                                    <tr key={stageData.Positie} className={getRowClassName(stageData.player)}>
                                        <td className="py-2 px-4">{stageData.Positie}</td>
                                        <td className="py-2 px-4">{stageData.Naam}</td>
                                        <td className="py-2 px-4">{stageData.Punten}</td>
                                        <td className="py-2 px-4">{stageData.Truien}</td>
                                        <td className="py-2 px-4">{stageData.Totaal}</td>
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

export default StageOverview;