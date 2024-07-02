import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  href: string;
  img_src: string;
  ppg: number;
  apg: number;
  rpg: number;
  pie: number;
}

interface SortPlayersByStatsButtonsProps {
  playerData: Player[];
  setFilteredPlayersByStatsParameters: React.Dispatch<React.SetStateAction<string[]>>;
}

const SortPlayersByStatsButtons: React.FC<SortPlayersByStatsButtonsProps> = ({ setFilteredPlayersByStatsParameters }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSort = (criteria: string) => {
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(criteria)) {
      updatedFilters = updatedFilters.filter(filter => filter !== criteria);
    } else {
      updatedFilters.push(criteria);
    }
    setSelectedFilters(updatedFilters);
    setFilteredPlayersByStatsParameters(updatedFilters);
  };

  return (
    <div>
      <ButtonGroup>
        <Button onClick={() => handleSort('ppg')} variant={selectedFilters.includes('ppg') ? 'solid' : 'outline'}>
          PPG
        </Button>
        <Button onClick={() => handleSort('apg')} variant={selectedFilters.includes('apg') ? 'solid' : 'outline'}>
          APG
        </Button>
        <Button onClick={() => handleSort('rpg')} variant={selectedFilters.includes('rpg') ? 'solid' : 'outline'}>
          RPG
        </Button>
        <Button onClick={() => handleSort('pie')} variant={selectedFilters.includes('pie') ? 'solid' : 'outline'}>
          PIE
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SortPlayersByStatsButtons;
