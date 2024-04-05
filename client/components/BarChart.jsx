import React from "react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

const BarChart = ({history}) => {
  const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Days',
          data: history,
          backgroundColor: 'rgb(26, 115, 232)',
          borderColor: 'rgb(69, 141, 234)',
          borderWidth: 1,
        }]
  }
    
  const options = {
        scales: {
          y: {
            min: 0,
            max: 80,
            ticks: {
              stepSize: 5,
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
  }

  return (
    <div id='radar'>
        <Bar
          data = {data}
          options = {options}
        ></Bar>
    </div>
  )
}

export default BarChart;