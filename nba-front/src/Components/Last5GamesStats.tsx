import React from 'react';

interface Player {
  player_id: string;
  full_name: string;
}

interface Last5GamesStatsProps {
  players: Player[];
  last5Stats: any[]; // Adjust type as necessary
}

const Last5GamesStats: React.FC<Last5GamesStatsProps> = ({ players, last5Stats }) => {
  const player = players[0]; // Assuming only one player is passed

  const playerLast5Stats = last5Stats.filter(stat => stat.player === player.player_id);
  
  return (
    <div>
      {playerLast5Stats.length > 0 ? (
        <ul>
          {playerLast5Stats.map((stat) => (
            <li key={stat.id}>
              {`${stat.game_date}: ${stat.points} points`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No last 5 games stats available.</p>
      )}
    </div>
  );
};

export default Last5GamesStats;

