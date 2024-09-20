import React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface Player {
  player_id: string;
  full_name: string;
}

interface SeasonStat {
  assists: number;
  blocks: number;
  player: string;
  points_per_game: number;
  total_rebounds: number; // Add rebounds
}

interface Last5GameStat {
  assists: number;
  blocks: number;
  game_date: string;
  player: string;
  points: number;
  total_rebounds: number; // Add rebounds
}

interface PlayerPointsChartProps {
  player: Player;
  seasonStats: SeasonStat[];
  last5Stats: Last5GameStat[];
}

const colors: string[] = ['#FF8C00', '#1E90FF']; // Orange for season avg, Blue for last 5 avg

const PlayerPointsChart: React.FC<PlayerPointsChartProps> = ({ player, seasonStats, last5Stats }) => {
  const playerSeasonStats = seasonStats.find((stat) => stat.player === player.player_id);
  const playerLast5GamesStats = last5Stats.filter((game) => game.player === player.player_id);

  const calculateAverage = (games: Last5GameStat[], key: 'points' | 'assists' | 'total_rebounds' | 'blocks' ): number => {
    if (games.length === 0) return 0;
    const total = games.reduce((total, game) => total + game[key], 0);
    return total / games.length;
  };

  const last5AveragePoints = calculateAverage(playerLast5GamesStats, 'points');
  const last5AverageAssists = calculateAverage(playerLast5GamesStats, 'assists');
  const last5AverageRebounds = calculateAverage(playerLast5GamesStats, 'total_rebounds'); // Calculate rebounds
  const last5AverageBlocks = calculateAverage(playerLast5GamesStats, 'blocks');


  const seasonAveragePoints = playerSeasonStats?.points_per_game ?? 0;
  const seasonAverageAssists = playerSeasonStats?.assists ?? 0;
  const seasonAverageRebounds = playerSeasonStats?.total_rebounds ?? 0; // Get rebounds
  const seasonAverageBlocks = playerSeasonStats?.blocks ?? 0;

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
          backgroundSize: '50px 50px',
          backgroundPosition: '20px 20px',
          ...theme.applyStyles('dark', {
            borderColor: 'rgba(255,255,255, 0.1)',
            backgroundImage:
              'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
          }),
        })}
        xAxis={[{ scaleType: 'band', data: ['PPG', 'APG','RPG', 'BPG'] }]} // Points per game, Assists per game, Blocks per game
        series={[
          { data: [seasonAveragePoints, seasonAverageAssists, last5AverageRebounds, seasonAverageBlocks], label: 'Season Avg', id: 'season_id' },
          { data: [last5AveragePoints, last5AverageAssists,seasonAverageRebounds , last5AverageBlocks], label: 'Last 5 Avg', id: 'last5_id' },
        ]}
        colors={colors}
        width={400}
        height={300}
      />
    </div>
  );
};

export default PlayerPointsChart;
