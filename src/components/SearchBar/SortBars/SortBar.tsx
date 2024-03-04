// SortBar.tsx

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

interface SortBarProps {
  playerData: Player[];
  setSortedPlayers: React.Dispatch<React.SetStateAction<Player[] | null>>;
}

const SortBar: React.FC<SortBarProps> = ({ playerData, setSortedPlayers }) => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (criteria: string) => {
    let sortedPlayers = [...playerData];

    switch (criteria) {
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

    setSortBy(criteria);
    setSortedPlayers(sortedPlayers);
  };

  return (
    <ButtonGroup>
      <Button onClick={() => handleSort('ppg')} variant={sortBy === 'ppg' ? 'solid' : 'outline'}>
        PPG
      </Button>
      <Button onClick={() => handleSort('apg')} variant={sortBy === 'apg' ? 'solid' : 'outline'}>
        APG
      </Button>
      <Button onClick={() => handleSort('rpg')} variant={sortBy === 'rpg' ? 'solid' : 'outline'}>
        RPG
      </Button>
      <Button onClick={() => handleSort('pie')} variant={sortBy === 'pie' ? 'solid' : 'outline'}>
        PIE
      </Button>
    </ButtonGroup>
  );
};

export default SortBar;

