// HomePage.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortBar from "../../components/SearchBar/SortBars/SortBar";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  ppg: number;
  apg: number;
  rpg: number;
  pie: number;
  img_src: string;
}

const HomePage: React.FC<{ playerData: Player[] }> = ({ playerData }) => {
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Update sortedPlayers when filteredPlayers change
    setSortedPlayers(filteredPlayers);
  }, [filteredPlayers]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <Link to="/player-list">
        <Button colorScheme="teal">Full Player List</Button>
      </Link>
      <SearchBar playerData={playerData} setFilteredPlayers={setFilteredPlayers} />
      <SortBar playerData={playerData} setSortedPlayers={setSortedPlayers} />

      {sortedPlayers && sortedPlayers.length > 0 ? (
        sortedPlayers.map((player) => (
          <Box key={player.id} mt={2}>
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
              <img src={player.img_src} alt={`Image of ${player.first_name} ${player.last_name}`} />
            </ul>
          </Box>
        ))
      ) : (
        "No players available."
      )}
    </div>
  );
};

export default HomePage;

