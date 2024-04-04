import React from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js'

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
)
const RadarChart = ({history}) => {
  const data = {
        labels: ['Chest', 'Back', 'Biceps', 'Triceps', 'Legs'],
        datasets: [{
          label: 'Sets',
          data: Object.values(history),
          backgroundColor: 'rgb(26, 115, 232)',
          borderColor: 'rgb(69, 141, 234)',
        }]
  }
    
  const options = {
        scales: {
          r: {
            min: 0,
            max: 80,
            ticks: {
              stepSize: 5,
              display: false,
            }
          }
        },
        elements: {
          line: {
            borderWidth: 1,
          },
          point: {
            pointRadius: 0,
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
        <Radar
          data = {data}
          options = {options}
        ></Radar>
    </div>
  )
}

export default RadarChart;

  