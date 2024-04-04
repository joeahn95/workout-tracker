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
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Days',
          data: [1,2,3,4,5, 6, 7],
          backgroundColor: 'rgb(26, 115, 232)',
          borderColor: 'rgb(69, 141, 234)',
          borerWidth: 1,
        }]
  }
    
  const options = {
        scales: {
          y: {
            min: 0,
            max: 20,
            ticks: {
              stepSize: 1,
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