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
          backgroundColor: 'aqua',
          borderColor: 'black',
        }]
  }
    
  const options = {
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 5
            }
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

  