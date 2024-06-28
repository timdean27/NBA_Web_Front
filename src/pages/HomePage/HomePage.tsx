// HomePage.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box, VStack, Text } from "@chakra-ui/react";
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
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(playerData);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>(playerData);

  useEffect(() => {
    // Update filteredPlayers and sortedPlayers when playerData changes
    setFilteredPlayers(playerData);
    setSortedPlayers(playerData);
  }, [playerData]);

  const filterAndSortPlayers = (
    searchFirst: string,
    searchLast: string,
    searchID: string,
    sortBy: string
  ) => {
    const filteredPlayers = playerData.filter((player) => {
      const firstNameMatch =
        player.first_name.toLowerCase().includes(searchFirst.toLowerCase()) ||
        searchFirst === "";
      const lastNameMatch =
        player.last_name.toLowerCase().includes(searchLast.toLowerCase()) ||
        searchLast === "";
      const idMatch = player.id.toString().includes(searchID) || searchID === "";

      return firstNameMatch && lastNameMatch && idMatch;
    });

    let sortedPlayers = [...filteredPlayers];

    switch (sortBy) {
      case 'ppg':
        sortedPlayers.sort((a, b) => b.ppg - a.ppg);
        break;
      case 'apg':
        sortedPlayers.sort((a, b) => b.apg - a.apg);
        break;
      case 'rpg':
        sortedPlayers.sort((a, b) => b.rpg - a.rpg);
        break;
      case 'pie':
        sortedPlayers.sort((a, b) => b.pie - a.pie);
        break;
      default:
        break;
    }

    setFilteredPlayers(filteredPlayers);
    setSortedPlayers(sortedPlayers);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">Welcome to the Home Page</Text>
      <Link to="/player-list">
        <Button colorScheme="teal">Full Player List</Button>
      </Link>
      <SearchBar filterAndSortPlayers={filterAndSortPlayers} />
      <SortBar playerData={filteredPlayers} setSortedPlayers={setSortedPlayers} />

      {sortedPlayers && sortedPlayers.length > 0 ? (
        sortedPlayers.map((player) => (
          <Box
            key={player.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="#E9EEE1" // Set the background color to a lighter green
          >
            <Text fontSize="xl" fontWeight="bold" color="black">
              {player.first_name} {player.last_name}
            </Text>
            <ul>
              <li>ID: {player.id}</li>
              <li>Full Name: {player.first_name} {player.last_name}</li>
              <li>First Name: {player.first_name}</li>
              <li>Last Name: {player.last_name}</li>
              <li>PPG: {player.ppg}</li>
              <li>APG: {player.apg}</li>``
              <li>RPG: {player.rpg}</li>
              <li>PIE: {player.pie}</li>
              <img src={player.img_src} alt={`Image of ${player.first_name} ${player.last_name}`} />
            </ul>
          </Box>
        ))
      ) : (
        <Text>No players available.</Text>
      )}
    </VStack>
  );
};

export default HomePage;
