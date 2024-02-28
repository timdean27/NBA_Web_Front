// HomePage.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Select } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar/SearchBar";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  href: string; // assuming href is part of Player interface
  img_src: string; // assuming img_src is part of Player interface
}

const HomePage: React.FC<{ playerData: Player[] }> = ({ playerData }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <Link to="/player-list">
        <Button colorScheme="teal">Full Player List</Button>
      </Link>
      <SearchBar playerData={playerData} setSeletedPlayer={setSelectedPlayer} />
      
      {selectedPlayer ? (
        <Box mt={2}>
          <strong>{selectedPlayer.first_name} {selectedPlayer.last_name}</strong>
          <ul>
            <li>ID: {selectedPlayer.id}</li>
            <li>Full Name: {selectedPlayer.first_name} {selectedPlayer.last_name}</li>
            <li>First Name: {selectedPlayer.first_name}</li>
            <li>Last Name: {selectedPlayer.last_name}</li>
            <li>Href: {selectedPlayer.href}</li>
            <img src={selectedPlayer.img_src} alt={`Image of ${selectedPlayer.first_name} ${selectedPlayer.last_name}`} />
          </ul>
        </Box>
      ) : (
        "Player not selected"
      )}
    </div>
  );
};

export default HomePage;
