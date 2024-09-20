import React from 'react';
import PlayerSeasonStats from '../Components/PlayerSeasonStats';
import Last5GamesStats from '../Components/Last5GamesStats';

interface Player {
  player_id: string;
  full_name: string;
}

interface HomePageProps {
  players: Player[];
  seasonStats: any[]; // Adjust type as necessary
  last5Stats: any[]; // Adjust type as necessary
}

const HomePage: React.FC<HomePageProps> = ({ players, seasonStats, last5Stats }) => {
  return (
    <div>
      <h1>Player List</h1>
      {players.length > 0 ? (
        <ul>
          {players.map((player) => (
            <li key={player.player_id}>
                <div>
              <strong>{player.full_name}</strong> (ID: {player.player_id})
              </div>
              <div>
                <h2>Season Stats</h2>
                <PlayerSeasonStats players={[player]} seasonStats={seasonStats} />
              </div>
              <div>
                <h2>Last 5 Games</h2>
                <Last5GamesStats players={[player]} last5Stats={last5Stats} />
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
