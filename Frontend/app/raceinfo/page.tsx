'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface RaceInfo {
  name: string;
  nationality: string;
  year: number;
  stages: { stage_name: string, stage_url: string, rider_name: string }[];
}

export default function RaceInfoPage() {
  const [raceName, setRaceName] = useState('');
  const [raceInfo, setRaceInfo] = useState<RaceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRaceNameChange = (event) => {
    setRaceName(event.target.value);
  };

  const fetchRaceInfo = () => {
    if (!raceName) {
      setError('Race name is required.');
      setRaceInfo(null);
    } else {
      axios.get(`api/getraceinfo?race_name=${raceName}`)
        .then((response) => {
          console.log(response.data);
          setRaceInfo(response.data);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          setRaceInfo(null);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <input
          type="text"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
          placeholder="Enter race name"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <button
          onClick={fetchRaceInfo}
          className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Get Race Info
        </button>
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
        {raceInfo && (
          <div className="mt-4">
            <p className="text-lg">Name: {raceInfo.name}</p>
            <p className="text-lg">Nationality: {raceInfo.nationality}</p>
            <p className="text-lg">Year: {raceInfo.year} </p>
            <p className="text-lg">Stages:</p>
            <ul className=' divide-y-4'>
              {raceInfo.stages.map((stage, index) => (
                <li key={index}>
                  <p>Stage Name: {stage.stage_name}</p>
                  <p>Stage Winner: {stage.rider_name}</p>
                  <p>Stage URL: {stage.stage_url}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}