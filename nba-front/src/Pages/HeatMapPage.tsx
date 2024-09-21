import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Outlet, Link } from "react-router-dom";

// Define the interface for the props
interface HeatMapPageProps {
  players: any[]; // Replace `any` with the actual type of your players
  seasonStats: any; // Replace `any` with the actual type of season stats
  last5Stats: any; // Replace `any` with the actual type of last 5 stats
}

// Define the interface for the state
interface HeatMapPageState {
  options: ApexCharts.ApexOptions;
  series: Array<{
    name: string;
    data: { x: number | string; y: number }[];
  }>;
}

// Helper function to generate random data (if needed)
function generateData(count: number, yrange: { min: number; max: number }) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const x = `w${i + 1}`;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    data.push({ x, y });
  }
  return data;
}

class HeatMapPage extends React.Component<HeatMapPageProps, HeatMapPageState> {
  constructor(props: HeatMapPageProps) {
    super(props);
    // Initializing the state with options and series
    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
        title: {
          text: 'HeatMap Chart (Single color)',
        },
      },
      series: [
        {
          name: 'Metric1',
          data: generateData(18, { min: 0, max: 90 }),
        },
        {
          name: 'Metric2',
          data: generateData(18, { min: 0, max: 90 }),
        },
      ],
    };
  }

  render() {
    return (
      <div>
              <Link to="/">Home Page</Link>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="heatmap"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default HeatMapPage;
