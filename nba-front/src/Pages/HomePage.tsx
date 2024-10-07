import React, { useState } from 'react';
import PlayerStats from '../Components/PlayerStats';
import Individual_Player_BarGraph from '../Components/Individual_Player_BarGraph';
import BubbleMap from '../Components/BubbleMap';
import PlayerSearch from '../Components/PlayerSearchProps';
import { Player, SeasonStat, Last5GameStat } from '../types/interfaces'; // Importing interfaces
import '../styles/HomePage.css';

interface HomePageProps {
  players: Player[];
  seasonStats: SeasonStat[]; 
  last5Stats: Last5GameStat[]; // Use the specific Last5GameStat type
}

const HomePage: React.FC<HomePageProps> = ({ players, seasonStats, last5Stats }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Check if data is available before rendering the child components
  const isDataAvailable = players.length > 0 && seasonStats.length > 0 && last5Stats.length > 0;

  // Filter players by search term and check if player_id is found in seasonStats
  const filteredPlayers = players.filter(player => 
    player.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    seasonStats.some(stat => stat.player === player.player_id) // Ensure the player_id exists in seasonStats
  );

  return (
    <div>
      <h1>Player List</h1>
      <PlayerSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Bubble Map */}
      {isDataAvailable ? (
        <BubbleMap players={filteredPlayers} seasonStats={seasonStats} last5Stats={last5Stats} />
      ) : (
        <p>Loading...</p> // You can replace this with a loading spinner if desired
      )}

      {filteredPlayers.length > 0 ? (
        <ul className="player-list">
          {filteredPlayers.map((player) => (
            <li key={player.player_id} className="player-list-item">
              <img
                src={player.img_src}
                alt={player.full_name}
                className="player-image"
              />
              <div>
                <span className="player-info">
                  {player.full_name}, {player.player_id}
                </span>
                <Individual_Player_BarGraph 
                  player={player} 
                  seasonStats={seasonStats} 
                  last5Stats={last5Stats} 
                />
                <PlayerStats 
                  player={player} 
                  seasonStats={seasonStats} 
                  last5Stats={last5Stats} 
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players available.</p>
      )}
    </div>
  );
};

export default HomePage;
