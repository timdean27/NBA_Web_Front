// SearchBar.tsx

import React, { useState, ChangeEvent } from "react";
import { Button, Box, Select } from "@chakra-ui/react";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

interface SearchBarProps {
  filterAndSortPlayers: (searchFirst: string, searchLast: string, searchID: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filterAndSortPlayers }) => {
  const [searchFirst, setSearchFirst] = useState("");
  const [searchLast, setSearchLast] = useState("");
  const [searchID, setSearchID] = useState("");

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

    filterAndSortPlayers(searchFirst, searchLast, searchID);
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
