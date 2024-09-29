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
    data: { x: number; y: number; z: number }[]; // z is for bubble size
  }>;
}

// Helper function to calculate the average for a player's last 5 games
const calculateAverage = (games: Last5GameStat[], key: 'points'): number => {
  if (games.length === 0) return 0;
  const total = games.reduce((total, game) => total + game[key], 0);
  return total / games.length;
};

// Helper function to clamp values to a given range
const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);
const MIN_BUBBLE_SIZE = 10; // Adjust this value as needed

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
            offsetY: 10,
          },
          max: this.calculateMaxX(), // Set max value for x-axis
        },
        yaxis: {
          title: {
            text: 'Season Average Points',
            offsetY: 10,
          },
          max: this.calculateMaxY() + 2, // Set max value for y-axis
        },
        tooltip: {
          enabled: true, // Enable the tooltip
          custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const playerName = w.globals.seriesNames[seriesIndex]; // Player's name
            const last5AvgPoints = w.config.series[seriesIndex].data[dataPointIndex].x; // X value (Last 5 Avg Points)
            const seasonAvgPoints = w.config.series[seriesIndex].data[dataPointIndex].y; // Y value (Season Avg Points)
            const bubbleSize = w.config.series[seriesIndex].data[dataPointIndex].z; // Z value (Bubble Size)
            
            // Customize the content of the tooltip
            return `
              <div style="padding: 10px;">
                <strong>${playerName}</strong><br/>
                Last 5 Games Average: ${last5AvgPoints} Points<br/>
                Season Average Points: ${seasonAvgPoints} Points<br/>
                Bubble Size (Impact): ${bubbleSize}%
              </div>`;
          },
        },
      },
      series: series,
    };
    
    // Log the initialized state
    console.log('Initial State:', this.state);
  }

  // Function to create the bubble chart data for all players
  createBubbleData() {
    const { players, seasonStats, last5Stats } = this.props;
    console.log('Props received:', this.props);

    console.log('Players:', players);
    console.log('Season Stats:', seasonStats);
    console.log('Last 5 Stats:', last5Stats);

    return players
      .map((player) => {
        const playerSeasonStats = seasonStats.find((stat) => stat.player === player.player_id);
        const playerLast5GamesStats = last5Stats.filter((game) => game.player === player.player_id);

        if (!playerSeasonStats) {
          console.warn(`No season stats found for player: ${player.full_name}`);
          return null; // Skip if no season stats found for player
        }

        const seasonAveragePoints = playerSeasonStats.points_per_game ?? 0;
        const last5AveragePoints = calculateAverage(playerLast5GamesStats, 'points');

        console.log(`Player: ${player.full_name}, Season Average: ${seasonAveragePoints}, Last 5 Average: ${last5AveragePoints}`);

        // Calculate the percentage difference between season and last 5 games
        let percentageDifference = ((last5AveragePoints - seasonAveragePoints) / seasonAveragePoints) * 100;

        // Clamp the bubble size to a minimum size
        const bubbleSize = Math.max(MIN_BUBBLE_SIZE, clamp(percentageDifference, -35, 35));

        console.log(`Bubble Size for ${player.full_name}:`, bubbleSize);

        return {
          name: player.full_name,
          data: [
            {
              x: last5AveragePoints,  // Last 5 games average points on the X-axis
              y: seasonAveragePoints,  // Season average points on the Y-axis
              z: bubbleSize,           // Bubble size representing the clamped difference
            },
          ],
        };
      })
      .filter((data): data is { name: string; data: { x: number; y: number; z: number }[] } => data !== null); // Filter out null values
  }

  // Calculate maximum x value with a minimum of 30
  calculateMaxX() {
    const { last5Stats } = this.props;
    const maxPoints = last5Stats.reduce((max, game) => Math.max(max, game.points), 0);
    console.log('Max X (Last 5 Games Points):', maxPoints);
    return Math.max(30, Math.round(maxPoints)); // Set minimum of 30
  }

  // Calculate maximum y value with a minimum of 30
  calculateMaxY() {
    const { seasonStats } = this.props;
    const maxPoints = seasonStats.reduce((max, stat) => Math.max(max, stat.points_per_game), 0);
    console.log('Max Y (Season Points):', maxPoints);
    return Math.max(30, Math.round(maxPoints)); // Set minimum of 30
  }

  render() {
    // Log when the component renders with updated data
    console.log('Rendering BubbleMap with series:', this.state.series);

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
