import React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface Player {
  player_id: string;
  full_name: string;
}

interface SeasonStat {
  player: string;
  points_per_game: number;
}

interface Last5GameStat {
  game_date: string;
  player: string;
  points: number;
}

interface PlayerPointsChartProps {
  player: Player;
  seasonStats: SeasonStat[];
  last5Stats: Last5GameStat[];
}

const colors: string[] = ['#FF8C00', '#1E90FF']; // Orange for season avg, Blue for last 5 avg

const PlayerPointsChart: React.FC<PlayerPointsChartProps> = ({ player, seasonStats, last5Stats }) => {
  // Find the season stats for the current player
  const playerSeasonStats = seasonStats.find((stat) => stat.player === player.player_id);

  // Find the last 5 games stats for the current player
  const playerLast5GamesStats = last5Stats.filter((game) => game.player === player.player_id);

  // Function to calculate the average points over the last 5 games
  const calculateAveragePoints = (games: Last5GameStat[]): number => {
    if (games.length === 0) return 0;
    const totalPoints = games.reduce((total, game) => total + game.points, 0);
    return totalPoints / games.length;
  };

  const last5AveragePoints = calculateAveragePoints(playerLast5GamesStats);

  // Set default value in case playerSeasonStats is undefined
  const seasonAveragePoints = playerSeasonStats?.points_per_game ?? 0;

  return (
    <div className="player-stats">
      <h3>{player.full_name}'s Performance</h3>

      {/* Bar Chart */}
      <BarChart
        sx={(theme) => ({
          [`.${barElementClasses.root}`]: {
            fill: theme.palette.background.paper,
            strokeWidth: 3,
          },
          [`.MuiBarElement-series-season_id`]: {
            stroke: colors[0],
          },
          [`.MuiBarElement-series-last5_id`]: {
            stroke: colors[1],
          },
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: '#FF8C00', // Orange stroke for axis
              strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: '#FF8C00', // Orange text for axis labels
            },
          },
          border: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '20px 20px',
          ...theme.applyStyles('dark', {
            borderColor: 'rgba(255,255,255, 0.1)',
            backgroundImage:
              'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
          }),
        })}
        xAxis={[{ scaleType: 'band', data: ['PPG'] }]}
        series={[
          { data: [seasonAveragePoints], label: 'Season Average', id: 'season_id' },
          { data: [last5AveragePoints], label: 'Last 5 Games Average', id: 'last5_id' },
        ]}
        colors={colors}
        width={200}
        height={300}
      />
    </div>
  );
};

export default PlayerPointsChart;
