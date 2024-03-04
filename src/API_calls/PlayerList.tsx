// PlayerList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Player {
    id: number;
    first_name: string;
    last_name: string;
    href: string;
    img_src: string;
    ppg: number;
    apg: number;
    rpg: number;
    pie: number;
  }
  
  interface PlayerListProps {
    onPlayerData: (data: Player[]) => void;
  }
  
  const PlayerList: React.FC<PlayerListProps> = ({ onPlayerData }) => {
    const [players, setPlayers] = useState<Player[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/players/');
          setPlayers(response.data);
          // Pass data back up to the parent (App)
          onPlayerData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [onPlayerData]);

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <strong>{player.first_name} {player.last_name}</strong>
            <ul>
              <li>ID: {player.id}</li>
              <li>Full Name: {player.first_name} {player.last_name}</li>
              <li>First Name: {player.first_name}</li>
              <li>Last Name: {player.last_name}</li>
              <li>PPG: {player.ppg}</li>
              <li>APG: {player.apg}</li>
              <li>RPG: {player.rpg}</li>
              <li>PIE: {player.pie}</li>
              <li>Href: {player.href}</li>
              <img src={player.img_src} alt={`Image of ${player.first_name} ${player.last_name}`} />
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
