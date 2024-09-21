import React from 'react';
import Chart from 'react-apexcharts' 
import ApexCharts from 'apexcharts'

const PlayerHeatmap: React.FC = () => {
  const options = {
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 5, color: '#f77f00', name: 'Low' },
            { from: 6, to: 15, color: '#ffba08', name: 'Medium' },
            { from: 16, to: 30, color: '#00a676', name: 'High' },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['Points', 'Assists', 'Rebounds', 'Steals', 'Blocks'], // Stat categories
    },
    title: {
      text: 'NBA Players Heatmap',
      align: 'center',
    },
  };

  const series = [
    {
      name: 'Player1',
      data: [15, 7, 12, 2, 1],
    },
    {
      name: 'Player2',
      data: [25, 5, 8, 1, 3],
    },
    {
      name: 'Player3',
      data: [18, 10, 14, 4, 2],
    },
    {
      name: 'Player4',
      data: [22, 6, 9, 3, 1],
    },
    {
      name: 'Player5',
      data: [30, 5, 11, 2, 3],
    },
  ];

  return (
    <div id="chart">
      <ApexCharts
        options={options}
        series={series}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default PlayerHeatmap;
