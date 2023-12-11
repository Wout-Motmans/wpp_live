"use client";
import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { useAuthCheck } from '../_hooks/useAuthCheck';
import { useAuth } from '../_contexts/authContext';

interface RaceInfo {
  name: string;
  nationality: string;
  year: number;
  stages: { stage_name: string; stage_url: string; rider_name: string }[];
}

interface StageInfo {
  name: string;
  date: string;
  distance: string;
  stage_type: string;
  stage_url: string;
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
  const { requireAuth } = useAuthCheck();
  const { isLoggedIn } = useAuth();
  requireAuth();

  const races = [
    "Tour de France",
    "Giro d'Italia",
    "La Vuelta Ciclista a España",
    "4 Jours de Dunkerque / Grand Prix des Hauts de France",
    "Ain Bugey Valromey Tour",
    "Albert Achterhes Profronde van Drenthe",
    "Alpes Gresivaudan Classic",
    "Alpes Isère Tour",
    "Amstel Gold Race",
    "Amstel Gold Race Ladies Edition",
    "Antwerp Port Epic Ladies",
    "Argenta Classic - 2 Districtenpijl Ekeren-Deurne",
    "Arno Wallaard Memorial",
    "Aziz Shusha",
    "Baloise Belgium Tour",
    "Baloise Ladies Tour",
    "Belgrade GP Women Tour",
    "BEMER Cyclassics",
    "Bernaudeau Junior",
    "BESTRONICS Acht van Bladel",
    "Bizkaikoloreak",
    "Boucles de l'Aulne - Châteaulin",
    "Boucles de la Mayenne - Crédit Mutuel",
    "Bredene Koksijde Classic",
    "Bretagne Classic - Ouest-France",
    "Bretagne Ladies Tour CERATIZIT",
    "Brussels Cycling Classic",
    "Bueng Si Fai International Road Race",
    "Bueng Si Fai International Women’s Road Race",
    "Cadel Evans Great Ocean Road Race",
    "Cadel Evans Great Ocean Road Race - Elite Women's Race",
    "Carpathian Couriers Race in memory of Wacław Felczak",
    "CERATIZIT Festival Elsy Jacobs à Garnich",
    "CERATIZIT Festival Elsy Jacobs à Luxembourg",
    "Cholet - Pays de la Loire",
    "CIC-Tour Féminin International des Pyrénées",
    "Circuit De Wallonie",
    "Circuit des Ardennes",
    "Circuit Franco-Belge",
    "Circuito de Getxo - Memorial Hermanos Otxoa",
    "Circuito del Porto - Trofeo Arvedi",
    "Clasica de Almeria",
    "Clasica de Almeria WE",
    "Clásica Jaén",
    "Clásica Terres de l´Ebre",
    "Classic Brugge-De Panne",
    "Classic Brugge-De Panne WE",
    "Classic Grand Besançon Doubs",
    "Classic Loire Atlantique",
    "Classic Lorient Agglomération - Trophée Ceratizit",
    "Classic Var",
    "Clàssica Comunitat Valenciana 1969 - Gran Premi València",
    "Classica da Arrabida - Cyclin'Portugal",
    "Coppa della Pace - Trofeo F.lli Anelli",
    "Côte d'Or Classic Juniors",
    "Course Cycliste de Solidarnosc et des Champions Olympiques",
    "Course de la Paix Grand Prix Jeseníky",
    "Course de la Paix Juniors",
    "Courts Mamouth Classique de l'ìle Maurice",
    "Craywinckelhof - Omloop van het Hageland",
    "Critérium du Dauphiné",
    "Cycling Tour of Albania",
    "Czech Tour",
    "Danilith Nokere Koerse",
    "Danilith Nokere Koerse MJ",
    "Danilith Nokere Koerse Women",
    "De Brabantse Pijl - La Flèche Brabançonne ME",
    "De Brabantse Pijl - La Flèche Brabançonne WE",
    "Dookoła Mazowsza",
    "Dorpenomloop Rucphen",
    "Drentse Acht van Westerveld",
    "Due Giorni Marchigiana - G.P. Santa Rita",
    "Due Giorni Marchigiana - Trofeo Città di Castelfidardo",
    "Durango - Durango Emakumeen Saria",
    "Dwars Door De Westhoek",
    "Dwars door Vlaanderen - A travers la Flandre ME",
    "Dwars Door Vlaanderen / A travers la Flandre WE",
    "Elfstedenronde Brugge",
    "Eroica Juniores - Coppa Andrea Meneghelli",
    "Eroica Juniores - Nations' Cup",
    "Eschborn-Frankfurt",
    "Eschborn-Frankfurt U23",
    "Ethias-Tour de Wallonie",
    "Etoile de Bessèges - Tour du Gard",
    "European Continental Championships - Mixed Relay TTT",
    "European Continental Championships JR - Mixed Relay TTT",
    "European Continental Championships ME - ITT",
    "European Continental Championships ME - Road Race",
    "European Continental Championships MJ - ITT",
    "European Continental Championships MJ - Road Race",
    "European Continental Championships MU - ITT",
    "European Continental Championships MU - Road Race",
    "European Continental Championships WE - ITT",
    "European Continental Championships WE - Road Race",
    "European Continental Championships WJ - ITT",
    "European Continental Championships WU - ITT",
    "European Continental Championships WU - Road Race",
    "Faun Drôme Classic",
    "Faun-Ardèche Classic",
    "Figueira Champions Classic",
    "Flèche Ardennaise",
    "Flèche du Sud",
    "Ford RideLondon Classique"
  ];

  const [raceName, setRaceName] = useState('');
  const [raceYear, setRaceYear] = useState('');
  const [raceInfo, setRaceInfo] = useState<RaceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<StageInfo | { stage_name: string; stage_url: string; rider_name: string } | null>(null);
  const [stageInfo, setStageInfo] = useState<StageInfo | null>(null);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const [showStageInfo, setShowStageInfo] = useState(false);

  const handleShowStageInfo = (stage: StageInfo | { stage_name: string; stage_url: string; rider_name: string } | null) => {
    if (selectedStage === stage && showStageInfo) {
      // Start the closing animation
      setShowStageInfo(false);
      setTimeout(() => {
        setSelectedStage(null);
        setStageInfo(null);
      }, 500); // delay to allow animation to complete
    } else {
      // Show the new stage info with opening animation
      setSelectedStage(stage);
      setStageInfo(null);
      fetchStageInfo(stage);
      setShowStageInfo(true);
    }
  };

  const fetchNameSuggestions = (input: string) => {
    // Don't show suggestions if the name field is empty
    if (input.trim() === '') {
      setNameSuggestions([]);
      return;
    }

    // Filter race names based on input
    const inputRegex = new RegExp(`${input.toLowerCase().replace(/\s/g, '[.]*')}`);

    const matchingRaces = races.filter(race => race.toLowerCase().match(inputRegex));
    const suggestions = matchingRaces.length > 0 ? matchingRaces : [];
    setNameSuggestions(suggestions);


  };

  const handleRaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setRaceName(name);
    fetchNameSuggestions(name);
  };


  const fetchStageInfo = (stage: StageInfo | { stage_name: string; stage_url: string; rider_name: string } | null) => {
    const stageUrl = (stage as StageInfo)?.stage_url;
  
    axios.get(`api/getstageinfo?stage_name=${stageUrl}`)
      .then((response) => {
        setStageInfo(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError('The stage does not exist.');
        } else {
          setError('An error occurred while fetching stage info.');
        }
        setRaceInfo(null);
      });
  };
  


  const handleRaceYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaceYear(event.target.value);
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
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        setRaceName(nameSuggestions[selectedSuggestionIndex]);
        setNameSuggestions([]);
      } else if (nameSuggestions.length === 1) {
        // If there's only one suggestion, autofill it
        setRaceName(nameSuggestions[0]);
        setNameSuggestions([]);
      }
    }
  };

  const fetchRaceInfo = () => {
    setStageInfo(null);
    // Validate race year and fetch race info
    const currentYear = new Date().getFullYear();
    const selectedYear = parseInt(raceYear);
    const formattedRaceName = raceName.toLowerCase();

    if (!raceName || !raceYear) {
      setError('Race name and year are required.');
      setRaceInfo(null);
      return;
    }

    let raceSpecificError = '';

    if (formattedRaceName === "giro d'italia") {
      if (selectedYear < 1909 || selectedYear > currentYear) {
        raceSpecificError = 'Year should be between 1909 and the current year for Giro d\'Italia.';
      }
    } else if (formattedRaceName === "la vuelta ciclista a españa") {
      if (selectedYear < 1935 || selectedYear > currentYear) {
        raceSpecificError = 'Year should be between 1935 and the current year for La Vuelta Ciclista a España.';
      }
    } else if (formattedRaceName === "tour de france" && (selectedYear < 1903 || selectedYear > currentYear)) {
      raceSpecificError = 'Year should be between 1903 and the current year for Tour de France.';
    }

    if (raceSpecificError) {
      setError(raceSpecificError);
      setRaceInfo(null);
      return;
    }

    // Convert specific race name to API call format
    let apiFormattedRaceName = formattedRaceName;
    if (formattedRaceName === "la vuelta ciclista a españa") {
      apiFormattedRaceName = "vuelta-a-espana";
    } else if (formattedRaceName === "4 jours de dunkerque / grand prix des hauts de france") {
      apiFormattedRaceName = "4-jours-de-dunkerque"
    } else if (formattedRaceName === "ain bugey valromey tour") {
      apiFormattedRaceName = "tour-du-valromey"
    } else if (formattedRaceName === "albert achterhes profronde van drenthe") {
      apiFormattedRaceName = "ronde-van-drenthe"
    } else if (formattedRaceName === "alpes isère tour") {
      apiFormattedRaceName = "rhone-alpes-isere-tour"
    } else if (formattedRaceName === "amstel gold race ladies edition") {
      apiFormattedRaceName = "amstel-gold-race-we"
    } else if (formattedRaceName === "argenta classic - 2 districtenpijl ekeren-deurne") {
      apiFormattedRaceName = "2-districtenpijl-ekeren-deurne-we"
    } else if (formattedRaceName === "arno wallaard memorial") {
      apiFormattedRaceName = "arno-wallaard-memorial2"
    } else if (formattedRaceName === "baloise belgium tour") {
      apiFormattedRaceName = "tour-of-belgium"
    } else if (formattedRaceName === "baloise ladies tour") {
      apiFormattedRaceName = "bene-ladies-tour"
    } else if (formattedRaceName === "belgrade gp women tour") {
      apiFormattedRaceName = "belgrade-gp-woman-tour"
    } else if (formattedRaceName === "bemer cyclassics") {
      apiFormattedRaceName = "cyclassics-hamburg"
    } else if (formattedRaceName === "bestronics acht van bladel") {
      apiFormattedRaceName = "hapert-acht-van-bladel"
    } else if (formattedRaceName === "boucles de l'aulne - châteaulin") {
      apiFormattedRaceName = "boucles-de-l-aulne"
    } else if (formattedRaceName === "boucles de la mayenne - crédit mutuel") {
      apiFormattedRaceName = "boucles-de-la-mayenne"
    } else if (formattedRaceName === "bretagne classic - ouest-france") {
      apiFormattedRaceName = "bretagne-classic"
    } else if (formattedRaceName === "bretagne ladies tour ceratizit") {
      apiFormattedRaceName = "tour-de-bretagne-feminin"
    } else if (formattedRaceName === "bueng si fai international road race") {
      apiFormattedRaceName = "bueng-si-fai-international-road-race2"
    } else if (formattedRaceName === "cadel evans great ocean road race") {
      apiFormattedRaceName = "great-ocean-race"
    } else if (formattedRaceName === "cadel evans great ocean road race - elite women's race") {
      apiFormattedRaceName = "cadel-evans-great-ocean-we"
    } else if (formattedRaceName === "carpathian couriers race in memory of wacław felczak") {
      apiFormattedRaceName = "carpathia-couriers-paths"
    } else if (formattedRaceName === "circuit des ardennes") {
      apiFormattedRaceName = "circuit-des-ardennes-international"
    } else if (formattedRaceName === "circuito de getxo - memorial hermanos otxoa") {
      apiFormattedRaceName = "circuito-de-getxo"
    } else if (formattedRaceName === "clásica jaén") {
      apiFormattedRaceName = "clasica-jaen-paraiso-interior"
    } else if (formattedRaceName === "classic lorient agglomération - trophée ceratizit") {
      apiFormattedRaceName = "gp-ouest-france-plouay"
    } else if (formattedRaceName === "clàssica comunitat valenciana 1969 - gran premi valència") {
      apiFormattedRaceName = "gp-de-valence"
    } else if (formattedRaceName === "coppa della pace - trofeo f.lli anelli") {
      apiFormattedRaceName = "coppa-della-pace-trofeo-flli-anelli"
    } else if (formattedRaceName === "côte d'or classic juniors") {
      apiFormattedRaceName = "cote-d-or-classic-juniors2"
    } else if (formattedRaceName === "course cycliste de solidarnosc et des champions olympiques") {
      apiFormattedRaceName = "course-cycliste-de-solidarnosc"
    } else if (formattedRaceName === "course de la paix grand prix jeseníky") {
      apiFormattedRaceName = "course-de-la-paix-u23"
    } else if (formattedRaceName === "craywinckelhof - omloop van het hageland") {
      apiFormattedRaceName = "omloop-van-het-hageland-tielt-winge"
    } else if (formattedRaceName === "critérium du dauphiné") {
      apiFormattedRaceName = "dauphine"
    } else if (formattedRaceName === "cycling tour of albania") {
      apiFormattedRaceName = "tour-of-albania"
    } else if (formattedRaceName === "danilith nokere koerse") {
      apiFormattedRaceName = "nokere-koers"
    } else if (formattedRaceName === "danilith nokere koerse mj") {
      apiFormattedRaceName = "danilith-nokere-koerse-voor-juniores"
    } else if (formattedRaceName === "danilith nokere koerse women") {
      apiFormattedRaceName = "danilith-nokere-koerse-voor-dames"
    } else if (formattedRaceName === "de brabantse pijl - la flèche brabançonne me") {
      apiFormattedRaceName = "brabantse-pijl"
    } else if (formattedRaceName === "de brabantse pijl - la flèche brabançonne we") {
      apiFormattedRaceName = "brabantse-pijl-we"
    } else if (formattedRaceName === "drentse acht van westerveld") {
      apiFormattedRaceName = "drentse-8-van-dwingeloo"
    } else if (formattedRaceName === "dwars door vlaanderen - a travers la flandre me") {
      apiFormattedRaceName = "dwars-door-vlaanderen"
    } else if (formattedRaceName === "dwars door vlaanderen / a travers la flandre we") {
      apiFormattedRaceName = "dwars-door-vlaanderen-we"
    } else if (formattedRaceName === "elfstedenronde brugge") {
      apiFormattedRaceName = "circuit-des-xi-villes"
    } else if (formattedRaceName === "ethias-tour de wallonie") {
      apiFormattedRaceName = "tour-de-wallonie"
    } else if (formattedRaceName === "etoile de bessèges - tour du gard") {
      apiFormattedRaceName = "etoile-de-besseges"
    } else if (formattedRaceName === "european continental championships jr - mixed relay ttt") {
      apiFormattedRaceName = "european-continental-championships-jr-mixed-relay-"
    } else if (formattedRaceName === "european continental championships me - itt") {
      apiFormattedRaceName = "uec-road-european-championships-itt"
    } else if (formattedRaceName === "european continental championships me - road race") {
      apiFormattedRaceName = "uec-road-european-championships"
    } else if (formattedRaceName === "european continental championships mj - itt") {
      apiFormattedRaceName = "european-championship-itt-mj"
    } else if (formattedRaceName === "european continental championships mj - road race") {
      apiFormattedRaceName = "european-championship-mj"
    } else if (formattedRaceName === "european continental championships mu - itt") {
      apiFormattedRaceName = "european-continental-championships-u23-itt"
    } else if (formattedRaceName === "european continental championships mu - road race") {
      apiFormattedRaceName = "european-championships"
    } else if (formattedRaceName === "european continental championships we - itt") {
      apiFormattedRaceName = "uec-road-european-championships-we-itt"
    } else if (formattedRaceName === "european continental championships we - road race") {
      apiFormattedRaceName = "uec-road-european-championships-we"
    } else if (formattedRaceName === "european continental championships wj - itt") {
      apiFormattedRaceName = "european-championship-wj-itt"
    } else if (formattedRaceName === "european continental championships wu - itt") {
      apiFormattedRaceName = "european-continental-championships-wu23-itt"
    } else if (formattedRaceName === "european continental championships wu - road race") {
      apiFormattedRaceName = "european-championship-we-u23"
    } else if (formattedRaceName === "faun drôme classic") {
      apiFormattedRaceName = "la-drome-classic"
    } else if (formattedRaceName === "ford ridelondon classique") {
      apiFormattedRaceName = "prudential-ride-london-gp-we"
    } else {
      // Convert other race names to API call format (replace spaces with hyphens)
      apiFormattedRaceName = apiFormattedRaceName
        // Replace non-English alphabet letters with English counterparts
        .replace(/[^\x00-\x7F]/g, (char) => {
          const englishEquivalent: { [key: string]: string } = {
            'é': 'e',
            'è': 'e',
            'ê': 'e',
            'â': 'a',
            'ł': 'l',
            'à': 'a',
            'ç': 'c',
            'ô': 'o',
            'í': 'i',
          };
          return englishEquivalent[char] || char;
        })
        // Replace hyphens with a space
        .replace(/'/g, '-').replace(/´/g, '-').replace(/-/g, ' ')
        // Replace one or more spaces with a hyphen
        .replace(/\s+/g, '-');
    }

    // Construct the full race name for the API call
    const fullRaceName = `race/${apiFormattedRaceName}/${selectedYear}`;

    axios.get(`api/getraceinfo?race_name=${fullRaceName}`)
      .then((response) => {
        console.log(response.data);
        setRaceInfo(response.data);
        setError(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError('The race does not exist. Please check the race name and year.');
        } else {
          setError('An error occurred while fetching race info.');
        }
        setRaceInfo(null);
      });

  };

  return (
    !isLoggedIn
      ?
      <h1>LOADING</h1>
      :
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <style>
          {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-20px);
            }
          }
          .slide-down {
            animation: slideDown 0.5s ease-out forwards;
          }
          .slide-up {
            animation: slideUp 0.5s ease-out forwards;
          }
        `}

        </style>
        <div className="w-full p-8 bg-white rounded-md shadow-md lg:max-w-xl relative">
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
              onChange={(e) => handleRaceYearChange(e)}
              min="1903"
              max={new Date().getFullYear().toString()}
              placeholder="Year"
              className="w-24 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="absolute left-0 w-full bg-white rounded-md shadow-lg z-10">
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
            className="w-full px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover-bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Get Race Info
          </button>
          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}


          {raceInfo && (
            <div className="mt-4 border-t-2">
              <br />
              <p className="text-lg">Name: {raceInfo.name}</p>
              <p className="text-lg">Nationality: {raceInfo.nationality}</p>
              <p className="text-lg">Year: {raceInfo.year} </p>
              <br />
              <p className="text-lg">Stages:</p>
              <ul style={{ marginTop: '10px' }}>
                {raceInfo.stages.map((stage, index) => (
                  <li key={index} className="mb-2" style={{ marginBottom: '20px' }}>
                    <div>
                      <button
                        className="w-full px-15 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover-bg-gray-600 focus:outline-none focus-bg-gray-600"
                        onClick={() => handleShowStageInfo(stage)}
                      >
                        <div className="ml-4 mr-4 flex justify-between items-center">
                          <p>{stage.stage_name}</p>
                          <p className={`transition-transform duration-200 transform ${selectedStage === stage ? 'rotate-0' : 'rotate-180'}`}>▲</p>
                        </div>
                      </button>
                      {selectedStage === stage && showStageInfo && stageInfo && (
                        <div className={`mt-4 p-4 bg-gray-800 rounded-md border border-gray-700 slide-down`}>
                          <p className="text-lg text-white">Stage Info:</p>
                          <br />
                          <p className="text-md text-white">Date: {stageInfo.date}</p>
                          <p className="text-md text-white">Distance: {stageInfo.distance}</p>
                          <p className="text-md text-white">Stage Type: {stageInfo.stage_type}</p>
                          <p className="text-md text-white">Departure: {stageInfo.depart}</p>
                          <p className="text-md text-white">Arrival: {stageInfo.arrival}</p>
                          <br />
                          {stageInfo.results && (
                            <table className="w-full text-white mt-2" style={{ borderCollapse: 'collapse' }}>
                              <thead>
                                <tr className="bg-gray-700">
                                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rider Name</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rider Number</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>UCI Points</th>
                                </tr>
                              </thead>
                              <tbody>
                                {stageInfo.results
                                  .sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
                                  .slice(0, 25)
                                  .map((result, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.rider_name}</td>
                                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.rider_number}</td>
                                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.uci_points}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      )}
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