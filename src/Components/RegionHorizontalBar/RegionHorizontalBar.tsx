import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from './api/contractStatus';
import { Bar } from 'react-chartjs-2';
import { apiData, data } from './types';
import { ChartOptions } from 'chart.js';

const RegionHorizontalBar = () => {
    const [regionData, setRegionData] = useState<data>();
    useEffect(() => {
        fetchTopRegionsData();
    }, []);

    const fetchTopRegionsData = async () => {
        try {
            const result = await fetchDataFromApi();
            const datas:data = {
                labels: result.data.map((item:apiData )=> item.region),
                datasets: [{
                    label: 'Contract Count',
                    data: result.data.map((item:apiData) => item.contractCount),
                    backgroundColor: '#1C4E80',
                    borderColor: '#1C4E80',
                    borderWidth: 1,
                }],
            };
            setRegionData(datas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y', // Set the index axis to y
        scales: {
          x: {
            position: 'bottom', // Position x-axis at the bottommm
            grid: {
                display: false // Disable grid lines on the x-axis
               },
               title: {
                display: true,
                text: 'Contracts Count' 
            },
          },
          y: {
            position: 'left', // Position y-axis on the left side
            grid: {
                display: false // Disable grid lines on the x-axis
               }
          },  
        },
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        }
      };

    return (
        <div style={{ width:'19.6rem',height:'10rem'}}>
            <p style={{fontSize:'.7rem',textAlign:'center'}}>  Top Contract Regions</p>
            {regionData&& <Bar data={regionData} options={options} />}
            
        </div>
    );
}
export default RegionHorizontalBar
