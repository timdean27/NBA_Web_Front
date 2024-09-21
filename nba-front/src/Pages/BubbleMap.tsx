import React from 'react';
import ReactApexChart from 'react-apexcharts';


// y will be season average 
// x will be last 5 games
// size will be diffrince between season and last 5 larger means postive last 5 




// Example generateData function
const generateData = (timestamp: number, count: number, { min, max }: { min: number; max: number }) => {
  return Array.from({ length: count }, (_, i) => {
    return {
      x: `Bubble ${i + 1}`,
      y: Math.floor(Math.random() * (max - min + 1)) + min,
      z: Math.random() * (max - min + 1), // Random size for the bubble
    };
  });
};

// Define the interface for the props
interface BubbleMapProps {
  players?: Array<{
    name: string;
    pointsPerGameSeason: number;
    pointsPerGameLast5: number;
  }>;
  seasonStats?: any[];
  last5Stats?: any[];
}

// Define the interface for the state
interface BubbleMapState {
  options: ApexCharts.ApexOptions;
  series: Array<{
    name: string;
    data: { x: string; y: number; z: number }[];
  }>;
}

class BubbleMap extends React.Component<BubbleMapProps, BubbleMapState> {
  constructor(props: BubbleMapProps) {
    super(props);

    const series = [
      {
        name: 'Bubble1',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 }),
      },
      {
        name: 'Bubble2',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 }),
      },
      {
        name: 'Bubble3',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 }),
      },
      {
        name: 'Bubble4',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 }),
      },
    ];

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
          text: 'Simple Bubble Chart',
        },
        xaxis: {
          tickAmount: 12,
          type: 'category',
        },
        yaxis: {
          max: 70,
        },
      },
      series: series,
    };
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
