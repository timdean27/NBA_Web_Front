// SearchBar.tsx

import React, { useState, ChangeEvent } from "react";
import { Button, Box, Select } from "@chakra-ui/react";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

interface SearchBarProps {
  playerData: Player[];
  setSeletedPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ playerData, setSeletedPlayer }) => {
  const [searchFirst, setSearchFirst] = useState("");
  const [searchLast, setSearchLast] = useState("");
  const [searchID, setSearchID] = useState("");
  const [filteredNames, setFilteredNames] = useState(playerData);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filterNames = (searchTerm: string, searchBy: string) => {
    let result: Player[] = [];
    if (searchBy === "first_name") {
      result = playerData.filter((name) =>
        name.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchBy === "last_name") {
      result = playerData.filter((name) =>
        name.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchBy === "id") {
      result = playerData.filter((name) =>
        name.id.toString().includes(searchTerm)
      );
    }
    setFilteredNames(result);
    setIsDropdownVisible(true);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    searchBy: string
  ) => {
    const searchTerm = e.target.value;
    switch (searchBy) {
      case "first_name":
        setSearchFirst(searchTerm);
        filterNames(searchTerm, "first_name");
        break;
      case "last_name":
        setSearchLast(searchTerm);
        filterNames(searchTerm, "last_name");
        break;
      case "id":
        setSearchID(searchTerm);
        filterNames(searchTerm, "id");
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (selectedPlayer: Player) => {
    setSeletedPlayer(selectedPlayer);
    setIsDropdownVisible(false);
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
      {isDropdownVisible && (
        <Box mt={2}>
          <Select
            placeholder="Select a player"
            onChange={(e) => handleSelectChange(JSON.parse(e.target.value))}
          >
            {filteredNames.map((name, index) => (
              <option key={index} value={JSON.stringify(name)}>
                {name.first_name} {name.last_name} (ID: {name.id})
              </option>
            ))}
          </Select>
        </Box>
      )}
    </div>
  );
};

export default SearchBar;
