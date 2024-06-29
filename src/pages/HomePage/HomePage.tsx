import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import SearchBarByName from "../../components/SearchBar/SearchBarByName";
import SortPalyersByStatsButtons from "../../components/SearchBar/SortBars/SortPalyersByStatsButtons"; // Adjust import path as necessary

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
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setFilteredPlayersByName(playerData);
  }, [playerData, sortedPlayers]);

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

    // Example of sorting by first name alphabetically
    const sortedPlayers = filteredPlayers.sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );

    setSortedPlayers(sortedPlayers);
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

      <SortPalyersByStatsButtons playerData={sortedPlayers} setSortedPlayers={setSortedPlayers} />

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
