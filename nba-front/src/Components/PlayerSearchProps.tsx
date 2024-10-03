import React from 'react';

interface PlayerSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by player name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default PlayerSearch;
