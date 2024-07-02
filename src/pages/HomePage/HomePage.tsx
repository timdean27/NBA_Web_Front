import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import SearchBarByName from "../../components/SearchBar/SearchBarByName";
import SortByPlayerStatsButtons from "../../components/SearchBar/SortBars/SortPalyersByStatsButtons";

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
  const [filteredPlayersByName, setFilteredPlayersByName] = useState<Player[]>([]);
  const [filteredPlayersByStatsParameters, setFilteredPlayersByStatsParameters] = useState<string[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setFilteredPlayersByName(playerData);
  }, [playerData]);

  useEffect(() => {
    // Apply sorting based on filteredPlayersByStatsParameters
    let updatedPlayers = [...filteredPlayersByName];

    // Sort by each selected parameter in filteredPlayersByStatsParameters
    filteredPlayersByStatsParameters.forEach(criteria => {
      switch (criteria) {
        case 'ppg':
          updatedPlayers.sort((a, b) => b.ppg - a.ppg);
          break;
        case 'apg':
          updatedPlayers.sort((a, b) => b.apg - a.apg);
          break;
        case 'rpg':
          updatedPlayers.sort((a, b) => b.rpg - a.rpg);
          break;
        case 'pie':
          updatedPlayers.sort((a, b) => b.pie - a.pie);
          break;
        default:
          break;
      }
    });

    setSortedPlayers(updatedPlayers);
  }, [filteredPlayersByStatsParameters, filteredPlayersByName]);

  const filterAndSortPlayersByName = (
    searchFirst: string,
    searchLast: string,
    searchID: string,
  ) => {
    const filteredPlayers = playerData.filter((player) => {
      const firstNameMatch =
        player.first_name.toLowerCase().startsWith(searchFirst.toLowerCase()) ||
        searchFirst === "";
      const lastNameMatch =
        player.last_name.toLowerCase().startsWith(searchLast.toLowerCase()) ||
        searchLast === "";
      const idMatch = player.id.toString().startsWith(searchID) || searchID === "";

      return firstNameMatch && lastNameMatch && idMatch;
    });

    // Sort alphabetically by first name
    const sortedPlayersUsingName = filteredPlayers.sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );

    setFilteredPlayersByName(sortedPlayersUsingName);
  };

  const clearAllFilters = () => {
    setFilteredPlayersByName(playerData); // Reset to the original playerData or empty array if necessary
    setFilteredPlayersByStatsParameters([]); // Clear sorting criteria
    setSortedPlayers([]); // Clear sorted players array
    filterAndSortPlayersByName("", "", ""); // Reset search criteria
  };
  
  const cardStyles = {
    border: "1px solid #000",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    flex: "1 0 30%",
    margin: "8px 8px",
    minWidth: "300px",
    maxWidth: "350px",
  };

  const contentStyles = {
    paddingLeft: "16px",
    paddingRight: "16px",
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Text fontSize="2xl" fontWeight="bold">Welcome to the Home Page</Text>
      <Link to="/player-list">
        <Button colorScheme="teal">Full Player List</Button>
      </Link>
      <SearchBarByName filterAndSortPlayersByName={filterAndSortPlayersByName} />
      <SortByPlayerStatsButtons setFilteredPlayersByStatsParameters={setFilteredPlayersByStatsParameters} />
      <Button mt={4} onClick={clearAllFilters}>Clear All Filters</Button>
      <Flex wrap="wrap" justify="center" align="flex-start" mt={4}>
        {sortedPlayers.length > 0 ? (
          sortedPlayers.map((player) => (
            <Box key={player.id} style={cardStyles} mb={4}>
              <Text fontSize="xl" fontWeight="bold" color="black" mt={2} mb={2}>
                {player.first_name} {player.last_name}
              </Text>
              <img src={player.img_src} alt={`Image of ${player.first_name} ${player.last_name}`} />
              <ul style={contentStyles}>
                <li>ID: {player.id}</li>
                <li>First Name: {player.first_name}</li>
                <li>Last Name: {player.last_name}</li>
                <li>PPG: {player.ppg}</li>
                <li>APG: {player.apg}</li>
                <li>RPG: {player.rpg}</li>
                <li>PIE: {player.pie}</li>
              </ul>
            </Box>
          ))
        ) : (
          <Text>No players available.</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default HomePage;
