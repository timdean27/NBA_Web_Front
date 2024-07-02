import React, { useState, ChangeEvent, useEffect } from "react";
import { Input, Stack } from "@chakra-ui/react";

interface SearchBarByNameProps {
  filterAndSortPlayersByName: (
    searchFirst: string,
    searchLast: string,
    searchID: string
  ) => void;
}

const SearchBarByName: React.FC<SearchBarByNameProps> = ({
  filterAndSortPlayersByName,
}) => {
  const [searchFirst, setSearchFirst] = useState<string>("");
  const [searchLast, setSearchLast] = useState<string>("");
  const [searchID, setSearchID] = useState<string>("");

  // Function to handle input change for first name
  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFirst(e.target.value.trim());
  };

  // Function to handle input change for last name
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchLast(e.target.value.trim());
  };

  // Function to handle input change for ID
  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchID(e.target.value.trim());
  };

  useEffect(() => {
    filterAndSortPlayersByName(searchFirst, searchLast, searchID);
  }, [searchFirst, searchLast, searchID, filterAndSortPlayersByName]);

  return (
    <Stack direction="row" spacing={4} align="center">
      <Input
        type="text"
        placeholder="Search by First Name"
        value={searchFirst}
        onChange={handleFirstNameChange}
      />
      <Input
        type="text"
        placeholder="Search by Last Name"
        value={searchLast}
        onChange={handleLastNameChange}
      />
      <Input
        type="text"
        placeholder="Search by ID"
        value={searchID}
        onChange={handleIDChange}
      />
    </Stack>
  );
};

export default SearchBarByName;
