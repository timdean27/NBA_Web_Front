import React from 'react';

interface Player {
  player_id: string;
  full_name: string;
}

interface SeasonStat {
  player_id: string;
  seasonAvgPoints: number;
}

interface Last5Stat {
  player_id: string;
  last5GamesPoints: number[]; // Assuming this holds the points from the last 5 games
}

interface PlayerPointsChartProps {
  player: Player;
  seasonStats: SeasonStat[];
  last5Stats: Last5Stat[];
}

const calculateLast5Average = (last5Points: number[]): number => {
  const totalPoints = last5Points.reduce((total, points) => total + points, 0);
  return last5Points.length > 0 ? totalPoints / last5Points.length : 0;
};

const PlayerPointsChart: React.FC<PlayerPointsChartProps> = ({ player, seasonStats, last5Stats }) => {
  const seasonData = seasonStats.find(stat => stat.player_id === player.player_id);
  const last5Data = last5Stats.find(stat => stat.player_id === player.player_id);

  const seasonAverage = seasonData?.seasonAvgPoints ?? 0;
  const last5Average = last5Data ? calculateLast5Average(last5Data.last5GamesPoints) : 0;

  const chartData = [
    { type: 'Season Average', value: seasonAverage },
    { type: 'Last 5 Games Average', value: last5Average },
  ];

  return (
    <div>
      <h3>{player.full_name}'s Points Comparison</h3>
      <ul>
        {chartData.map(item => (
          <li key={item.type}>{item.type}: {item.value.toFixed(2)}</li> // Optional: Format to 2 decimal places
        ))}
      </ul>
    </div>
  );
};

export default PlayerPointsChart;
