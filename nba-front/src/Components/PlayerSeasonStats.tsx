import React from 'react';

interface Player {
  player_id: string;
  full_name: string;
}

interface PlayerSeasonStatsProps {
  players: Player[];
  seasonStats: any[]; // Adjust type as necessary
}

const PlayerSeasonStats: React.FC<PlayerSeasonStatsProps> = ({ players, seasonStats }) => {
  const player = players[0]; // Assuming only one player is passed

  const playerStats = seasonStats.filter(stat => stat.player === player.player_id);
  
  return (
    <div>
      {playerStats.length > 0 ? (
        <ul>
          {playerStats.map((stat) => (
            <li key={stat.id}>
              {`${stat.season_year}: ${stat.points_per_game} PPG`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No season stats available.</p>
      )}
    </div>
  );
};

export default PlayerSeasonStats;
