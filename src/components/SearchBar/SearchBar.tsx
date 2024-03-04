// SearchBar.tsx

import React, { useState, ChangeEvent } from "react";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  ppg: number;
  apg: number;
  rpg: number;
  pie: number;
}

interface SearchBarProps {
  playerData: Player[];
  setFilteredPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ playerData, setFilteredPlayers }) => {
  const [searchFirst, setSearchFirst] = useState("");
  const [searchLast, setSearchLast] = useState("");
  const [searchID, setSearchID] = useState("");

  const filterAndSortPlayers = () => {
    let filteredPlayers = playerData.filter((player) => {
      const firstNameMatch =
        player.first_name.toLowerCase().includes(searchFirst.toLowerCase()) ||
        searchFirst === "";
      const lastNameMatch =
        player.last_name.toLowerCase().includes(searchLast.toLowerCase()) ||
        searchLast === "";
      const idMatch = player.id.toString().includes(searchID) || searchID === "";

      return firstNameMatch && lastNameMatch && idMatch;
    });

    setFilteredPlayers(filteredPlayers);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    searchBy: string
  ) => {
    const searchTerm = e.target.value;
    switch (searchBy) {
      case "first_name":
        setSearchFirst(searchTerm);
        break;
      case "last_name":
        setSearchLast(searchTerm);
        break;
      case "id":
        setSearchID(searchTerm);
        break;
      default:
        break;
    }

    filterAndSortPlayers();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by First Name"
        value={searchFirst}
        onChange={(e) => handleInputChange(e, "first_name")}
      />
      <input
        type="text"
        placeholder="Search by Last Name"
        value={searchLast}
        onChange={(e) => handleInputChange(e, "last_name")}
      />
      <input
        type="text"
        placeholder="Search by ID"
        value={searchID}
        onChange={(e) => handleInputChange(e, "id")}
      />
    </div>
  );
};

export default SearchBar;
