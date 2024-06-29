// SortPalyersByStatsButtons.tsx

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

interface SortPalyersByStatsButtonsProps {
  playerData: Player[];
  setSortedPlayers: React.Dispatch<React.SetStateAction<Player[] | null>>;
}

const SortPalyersByStatsButtons: React.FC<SortPalyersByStatsButtonsProps> = ({ playerData, setSortedPlayers,}) => {
  const [sortBy, setSortBy] = useState('');
  const [ isFilteredHigh, setisFilteredHigh]= useState(false);

  const handleSort = (criteria: string) => {
    let sortedPlayers = [...playerData];
    if( isFilteredHigh == false || isFilteredHigh == ""){
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
    setisFilteredHigh(true)
  }
  if( isFilteredHigh == true){
    switch (criteria) {
      case 'ppg':
        sortedPlayers.sort((a, b) => a.ppg - b.ppg);
        break;
      case 'apg':
        sortedPlayers.sort((a, b) => a.apg - b.apg);
        break;
      case 'rpg':
        sortedPlayers.sort((a, b) => a.rpg - b.rpg);
        break;
      case 'pie':
        sortedPlayers.sort((a, b) => a.pie - b.pie);
        break;
      default:
        break;
    }
    setisFilteredHigh(false)
  }
    setSortBy(criteria);
    setSortedPlayers(sortedPlayers);
  };

  return (
    <div>
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
    </div>
  );
};

export default SortPalyersByStatsButtons;

