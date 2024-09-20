import React from 'react';
import PlayerStats from '../Components/PlayerStats';
import PlayerPointsChart from '../Components/PlayerPointsChart';
import '../styles/HomePage.css';

interface Player {
  player_id: string;
  full_name: string;
  img_src: string; // Player's image URL
}

interface HomePageProps {
  players: Player[];
  seasonStats: any[]; // Adjust type as necessary
  last5Stats: any[];  // Adjust type as necessary
}

const HomePage: React.FC<HomePageProps> = ({ players, seasonStats, last5Stats }) => {
  return (
    <div>
      <h1>Player List</h1>
      {players.length > 0 ? (
        <ul className="player-list">
          {players.map((player) => (
            <li key={player.player_id} className="player-list-item">
              <img
                src={player.img_src}
                alt={player.full_name}
                className="player-image"
              />
              <div>
                <span className="player-info">{player.full_name}, {player.player_id}</span>
                <PlayerStats player={player} seasonStats={seasonStats} last5Stats={last5Stats} />
                {/* Pass season and last 5 stats for the current player */}
                <PlayerPointsChart 
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
