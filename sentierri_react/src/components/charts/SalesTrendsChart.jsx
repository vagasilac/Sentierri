import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SalesTrendsChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [50, 30, 76, 63, 90],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options={
      plugins: {
        title: {
          display: true,
          text: "Users Gained between 2016-2020"
        },
        legend: {
          display: false
        }
      }
    };

  return (
    <>
      <div className='header'>
        <h2 className='title'>Sales Trends</h2>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default SalesTrendsChart;