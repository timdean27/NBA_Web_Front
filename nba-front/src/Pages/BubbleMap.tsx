import React from 'react';
import ReactApexChart from 'react-apexcharts';

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

interface BubbleMapProps {
  players: Player[];
  seasonStats: SeasonStat[];
  last5Stats: Last5GameStat[];
}

interface BubbleMapState {
  options: ApexCharts.ApexOptions;
  series: Array<{
    name: string;
    data: { x: number; y: number; z: number }[];
  }>;
}

// Helper function to calculate the average for a player's last 5 games
const calculateAverage = (games: Last5GameStat[], key: 'points'): number => {
  if (games.length === 0) return 0;
  const total = games.reduce((total, game) => total + game[key], 0);
  return total / games.length;
};

class BubbleMap extends React.Component<BubbleMapProps, BubbleMapState> {
  constructor(props: BubbleMapProps) {
    super(props);

    const series = this.createBubbleData();

    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'bubble',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.8,
        },
        title: {
          text: 'NBA Players Points Per Game Bubble Chart',
        },
        xaxis: {
          title: {
            text: 'Last 5 Games Average Points',
          },
        },
        yaxis: {
          title: {
            text: 'Season Average Points',
          },
        },
      },
      series: series,
    };
  }

  // Function to create the bubble chart data for all players
  createBubbleData() {
    const { players, seasonStats, last5Stats } = this.props;

    return players
      .map((player) => {
        const playerSeasonStats = seasonStats.find((stat) => stat.player === player.player_id);
        const playerLast5GamesStats = last5Stats.filter((game) => game.player === player.player_id);

        if (!playerSeasonStats) return null; // Skip if no season stats found for player

        const seasonAveragePoints = playerSeasonStats.points_per_game ?? 0;
        const last5AveragePoints = calculateAverage(playerLast5GamesStats, 'points');

        // Calculate the bubble size based on the percentage difference between season and last 5 games
        const bubbleSize = Math.abs((last5AveragePoints - seasonAveragePoints) / seasonAveragePoints * 100);

        return {
          name: player.full_name,
          data: [
            {
              x: last5AveragePoints,  // Last 5 games average points on the X-axis
              y: seasonAveragePoints,  // Season average points on the Y-axis
              z: bubbleSize, // Bubble size representing the difference
            },
          ],
        };
      })
      .filter((data): data is { name: string; data: { x: number; y: number; z: number }[] } => data !== null); // Filter out null values
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bubble"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default BubbleMap;
