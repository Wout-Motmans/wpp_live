"use client";
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';

interface RaceInfo {
  name: string;
  nationality: string;
  year: number;
  stages: {
    stage_name: string;
    rider_name: string;
  }[];
}

function RaceInfoPage() {
  const races = ["Tour de France", "Giro d'Italia", "La Vuelta Ciclista a España"];
  const [raceName, setRaceName] = useState('');
  const [raceYear, setRaceYear] = useState('');
  const [raceInfo, setRaceInfo] = useState<RaceInfo | null>(null);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const [error, setError] = useState<string>('');

  const fetchNameSuggestions = (input: string) => {
    // Filter race names based on input
    const suggestions = races
      .filter(race => race.toLowerCase().startsWith(input.toLowerCase()))
      .map(race => race);
    setNameSuggestions(suggestions);
  };

  const handleRaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setRaceName(name);
    fetchNameSuggestions(name);
  };

  const handleRaceYearChange = (value: string) => {
    setRaceYear(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setRaceName(suggestion);
    setNameSuggestions([]); // Clear suggestions after selecting one
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedSuggestionIndex(prevIndex => Math.min(prevIndex + 1, nameSuggestions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedSuggestionIndex(prevIndex => Math.max(prevIndex - 1, -1));
    } else if (event.key === 'Enter' && selectedSuggestionIndex !== -1) {
      event.preventDefault();
      setRaceName(nameSuggestions[selectedSuggestionIndex]);
      setNameSuggestions([]);
    }
  };

  const fetchRaceInfo = () => {
    // Validate race year and fetch race info
    const currentYear = new Date().getFullYear();
    const selectedYear = parseInt(raceYear);
  
    if (!raceName) {
      setError('Race name is required.');
      return;
    }
  
    if (!selectedYear || selectedYear < 1903 || selectedYear > currentYear) {
      setError('Please enter a valid race year between 1903 and the current year.');
      return;
    }
  
    // Convert specific race name to API call format
    let formattedRaceName = raceName.toLowerCase();
    if (formattedRaceName === "la vuelta ciclista a españa") {
      formattedRaceName = "vuelta-a-espana";
    } else {
      // Convert other race names to API call format (replace spaces with hyphens)
      formattedRaceName = formattedRaceName.replace(/ /g, '-').replace(/'/g, '-').replace(/á/g, 'a').replace(/é/g, 'e');
    }
  
    // Construct the full race name for the API call
    const fullRaceName = `race/${formattedRaceName}/${selectedYear}`;
  
    axios
      .get(`api/getraceinfo?race_name=${fullRaceName}`)
      .then((response) => {
        setRaceInfo(response.data);
        setError('');
      })
      .catch(() => {
        setError('Error fetching race information.');
      });
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl relative">
        <div className="flex flex-row mb-4">
          <input
            type="text"
            value={raceName}
            onChange={handleRaceNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter race name"
            className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
          />
          <input
            type="number"
            value={raceYear}
            onChange={(e) => handleRaceYearChange(e.target.value)}
            min="1903"
            max={new Date().getFullYear().toString()}
            placeholder="Year"
            className="w-20 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="absolute left-0 w-full bg-white border rounded-md shadow-lg z-10">
          {nameSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`cursor-pointer py-2 px-4 hover:bg-gray-200 ${selectedSuggestionIndex === index ? 'bg-gray-200' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
        <button
          onClick={fetchRaceInfo}
          className="w-full px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Get Race Info
        </button>
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
        {/* Race Info */}
        {raceInfo && (
          <div className="mt-4">
            <p className="text-lg">Name: {raceInfo.name}</p>
            <p className="text-lg">Nationality: {raceInfo.nationality}</p>
            <p className="text-lg">Year: {raceInfo.year}</p>
            <p className="text-lg">Stages:</p>
            <ul style={{ marginTop: '10px' }}>
              {raceInfo.stages.map((stage, index) => (
                <li key={index} className="mb-2" style={{ marginBottom: '40px' }}>
                  <p>Stage Name: {stage.stage_name}</p>
                  <p>Stage Winner: {stage.rider_name}</p>
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
