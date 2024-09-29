import React from 'react';
import PlayerStats from '../Components/PlayerStats';
import Individual_Player_BarGraph from '../Components/Individual_Player_BarGraph';
import BubbleMap from '../Components/BubbleMap'
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
  console.log('HomePage Players:', players);
  console.log('HomePage Season Stats:', seasonStats);
  console.log('HomePage Last 5 Stats:', last5Stats);


    // Check if data is available before rendering the child component
    const isDataAvailable = players.length > 0 && seasonStats.length > 0 && last5Stats.length > 0;


  return (
    <div>
      <h1>Player List</h1>
      
      {isDataAvailable ? (
        <BubbleMap players={players} seasonStats={seasonStats} last5Stats={last5Stats} />
      ) : (
        <p>Loading...</p> // You can replace this with a loading spinner if desired
      )}


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
                <Individual_Player_BarGraph 
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

export default HomePage