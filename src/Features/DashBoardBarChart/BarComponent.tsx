import React from 'react'
import { BarChartPropType } from './types'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const BarComponent = ({data,maxDataValue}:BarChartPropType) => {  
  return (
  <Bar data={data}  options = {{
        scales: {
          x:{
            title: {
              display: true,
              text: ' '
          }},
          y: {
            grid: {
              display:false
              
            },
            title: {
              display: true,
              text: 'Contract Count'
          },
            min: 0,
            max: Math.ceil(maxDataValue * 1.1)
            
          },
        }
        
      }}/>
  );
}

export default BarComponent
