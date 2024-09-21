import React, { useState } from 'react';
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
  total_rebounds: number;
}

interface Last5GameStat {
  assists: number;
  blocks: number;
  game_date: string;
  player: string;
  points: number;
  total_rebounds: number;
}

interface PlayerPointsChartProps {
  player: Player;
  seasonStats: SeasonStat[];
  last5Stats: Last5GameStat[];
}

const colors: string[] = ['#FF8C00', '#1E90FF']; // Orange for season avg, Blue for last 5 avg

const PlayerPointsChart: React.FC<PlayerPointsChartProps> = ({ player, seasonStats, last5Stats }) => {
  const [selectedStats, setSelectedStats] = useState({
    points: true,
    assists: true,
    rebounds: true,
    blocks: true,
  });

  const handleCheckboxChange = (stat: keyof typeof selectedStats) => {
    setSelectedStats((prev) => ({ ...prev, [stat]: !prev[stat] }));
  };

  const playerSeasonStats = seasonStats.find((stat) => stat.player === player.player_id);
  const playerLast5GamesStats = last5Stats.filter((game) => game.player === player.player_id);

  const calculateAverage = (games: Last5GameStat[], key: 'points' | 'assists' | 'total_rebounds' | 'blocks'): number => {
    if (games.length === 0) return 0;
    const total = games.reduce((total, game) => total + game[key], 0);
    return total / games.length;
  };

  const last5AveragePoints = calculateAverage(playerLast5GamesStats, 'points');
  const last5AverageAssists = calculateAverage(playerLast5GamesStats, 'assists');
  const last5AverageRebounds = calculateAverage(playerLast5GamesStats, 'total_rebounds');
  const last5AverageBlocks = calculateAverage(playerLast5GamesStats, 'blocks');

  const seasonAveragePoints = playerSeasonStats?.points_per_game ?? 0;
  const seasonAverageAssists = playerSeasonStats?.assists ?? 0;
  const seasonAverageRebounds = playerSeasonStats?.total_rebounds ?? 0;
  const seasonAverageBlocks = playerSeasonStats?.blocks ?? 0;

  // Create a mapping of stat types to labels and their corresponding data
  const statsMapping = {
    points: {
      label: 'Points',
      season: seasonAveragePoints,
      last5: last5AveragePoints,
    },
    assists: {
      label: 'Assists',
      season: seasonAverageAssists,
      last5: last5AverageAssists,
    },
    rebounds: {
      label: 'Rebounds',
      season: seasonAverageRebounds,
      last5: last5AverageRebounds,
    },
    blocks: {
      label: 'Blocks',
      season: seasonAverageBlocks,
      last5: last5AverageBlocks,
    },
  };

  // Filter out the stats that are not selected
  const selectedLabels = Object.keys(selectedStats)
    .filter((key) => selectedStats[key as keyof typeof selectedStats])
    .map((key) => statsMapping[key as keyof typeof statsMapping].label);

  const selectedSeasonData = Object.keys(selectedStats)
    .filter((key) => selectedStats[key as keyof typeof selectedStats])
    .map((key) => statsMapping[key as keyof typeof statsMapping].season);

  const selectedLast5Data = Object.keys(selectedStats)
    .filter((key) => selectedStats[key as keyof typeof selectedStats])
    .map((key) => statsMapping[key as keyof typeof statsMapping].last5);

  return (
    <div className="player-stats">
      <h3>{player.full_name}'s Performance</h3>

      {/* Checkboxes for selecting which stats to display */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedStats.points}
            onChange={() => handleCheckboxChange('points')}
          />
          Points
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStats.assists}
            onChange={() => handleCheckboxChange('assists')}
          />
          Assists
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStats.rebounds}
            onChange={() => handleCheckboxChange('rebounds')}
          />
          Rebounds
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStats.blocks}
            onChange={() => handleCheckboxChange('blocks')}
          />
          Blocks
        </label>
      </div>

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
        })}
        xAxis={[{ scaleType: 'band', data: selectedLabels }]} // Use selected labels
        series={[
          { data: selectedSeasonData, label: 'Season Avg', id: 'season_id' },
          { data: selectedLast5Data, label: 'Last 5 Avg', id: 'last5_id' },
        ]}
        colors={colors}
        width={400}
        height={300}
      />
    </div>
  );
};

export default PlayerPointsChart;
