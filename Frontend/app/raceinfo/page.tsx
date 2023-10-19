"use client"
import React, { useState } from 'react';
import axios from 'axios';

interface RaceInfo {
  name: string;
  nationality: string;
  year: number;
  stages: { stage_name: string, stage_url: string, rider_name: string }[];
}

interface StageInfo {
  name: string;
  date: string;
  distance: string;
  stage_type: string;
  depart: string;
  arrival: string;
  results: {
    rider_name: string;
    rider_number: string;
    rank: string;
    uci_points: string;
  }[];
}

function RaceInfoPage() {
  const [raceName, setRaceName] = useState('');
  const [raceYear, setRaceYear] = useState('');
  const [raceInfo, setRaceInfo] = useState<RaceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [stageInfo, setStageInfo] = useState(null);

  const handleShowStageInfo = (stage) => {
    setSelectedStage(stage);
    setStageInfo(null);
    fetchStageInfo(stage);
  };

  const fetchStageInfo = (stage) => {
    axios.get(`api/getstageinfo?stage_name=${stage.stage_url}`)
      .then((response) => {
        setStageInfo(response.data);
      })
      .catch((error) => {
        // Voeg hier een error toe
      });
  };

  const handleRaceNameChange = (event) => {
    setRaceName(event.target.value);
  };

  const handleRaceYearChange = (event) => {
    setRaceYear(event.target.value);
  };

  const fetchRaceInfo = () => {
    if (!raceName || !raceYear) {
      setError('Race name and year are required.');
      setRaceInfo(null);
    } else {
      const formattedRaceName = raceName.replace(/ /g, '-');
      const fullRaceName = `race/${formattedRaceName}/${raceYear}`;
      axios.get(`api/getraceinfo?race_name=${fullRaceName}`)
        .then((response) => {
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
        <div className="flex flex-row">
          <input
            type="text"
            value={raceName}
            onChange={handleRaceNameChange}
            placeholder="Enter race name"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
          />
          <input
            type="text"
            value={raceYear}
            onChange={handleRaceYearChange}
            placeholder="Enter race year"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <button
          onClick={fetchRaceInfo}
          className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Get Race Info
        </button>
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
        {selectedStage && stageInfo && (
        <div>
          <p className="text-lg">Stage Info:</p>
          <p className="text-lg">Name: {stageInfo.name}</p>
          <p className="text-lg">Date: {stageInfo.date}</p>
          <p className="text-lg">Distance: {stageInfo.distance}</p>
          <p className="text-lg">Stage Type: {stageInfo.stage_type}</p>
          <p className="text-lg">Departure: {stageInfo.depart}</p>
          <p className="text-lg">Arrival: {stageInfo.arrival}</p>
          {stageInfo.results && (
            <ul>
              {stageInfo.results.map((result, index) => (
                <li key={index}>
                  <p>Rider Name: {result.rider_name}</p>
                  <p>Rider Number: {result.rider_number}</p>
                  <p>Rank: {result.rank}</p>
                  <p>UCI Points: {result.uci_points}</p>
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setSelectedStage(null)}>Back to Race Info</button>
        </div>
      )}


        {raceInfo && (
          <div className="mt-4">
            <p className="text-lg">Name: {raceInfo.name}</p>
            <p className="text-lg">Nationality: {raceInfo.nationality}</p>
            <p className="text-lg">Year: {raceInfo.year} </p>
            <p className="text-lg">Stages:</p>
            <ul style={{ marginTop: '10px' }}>
              {raceInfo.stages.map((stage, index) => (
                <li key={index} className="mb-2" style={{ marginBottom: '40px' }}>
                  <p>Stage Name: {stage.stage_name}</p>
                  <p>Stage Winner: {stage.rider_name}</p>
                  <div>
                    <button
                      className="w-full px-15 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      onClick={() => handleShowStageInfo(stage)}
                    >
                      Show Stage Info
                    </button>
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RaceInfoPage;
