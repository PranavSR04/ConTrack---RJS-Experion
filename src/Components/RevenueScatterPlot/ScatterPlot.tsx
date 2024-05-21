import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
// import { DataItem, Props } from './types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContractRevenue } from './types';
import axiosInstance from '../../Config/AxiosConfig';
// import {  LinearScale, DeepPartial } from 'chart.js';
// import { ScatterDataPoint} from "chart.js"
import 'chart.js/auto'
import { getContractRevenue } from './api/getContractRevenue';
import { ScatterPlotHandlerPropType } from './types';


const ScatterPlot = ({fetchContractRevenue,scatterData,data}:ScatterPlotHandlerPropType) => {

    
    return(
        <div style={{transform: 'scale(1)'}}>
            <p style={{fontSize:'.7rem',textAlign:'center'}}>Contract Revenue</p>
            <Scatter
                data={data}
                options={{
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Contract Term (in months)'
                            }
                        },
        
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Revenue (USD)'
                            },
                            ticks: {
                                callback: function(value) {
                                    const numericValue = Number(value); 
                    return (numericValue / 1000000) + 'M';
                                }
                            },
                            
                        },
                    },
                    plugins: {
                        legend: {
                            display: true // Hide the legend
                        },
                        tooltip: {
                            enabled: false // Disable tooltip hover
                        }
                    }
                }}
            
            />
        </div>
    );
}

export default ScatterPlot;