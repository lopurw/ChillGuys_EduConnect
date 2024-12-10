import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {

  const data = {
    labels: ['Completed', 'Remaining'], 
    datasets: [
      {
        data: [70, 30], 
        backgroundColor: ['#36A2EB', '#FF6384'], 
        hoverBackgroundColor: ['#36A2EB', '#FF6384'], 
      },
    ],
  };


  const options = {
    responsive: true,
    cutout: '70%', 
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; 
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <h3>Статистика выполнения курсов</h3>
      <Doughnut data={data} options={options} />
      <div>
        Статистика участия в проектах
        <p>78</p>
        </div>
    </div>
   
  
  );
};

export default StatisticsChart;
