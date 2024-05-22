import React, { useEffect, useState } from 'react';
import { fetchDuCount } from './api/getDuCount';
import BarComponent from './BarComponent';
import { duCountType } from './types';
interface ApiResponseDuCountType {
    du: string;
    TM: string; 
    FF: string; 
}

const BarChartHandler = () => {
    const [error, setError] = useState<string>("");
    const [barData, setBarData] = useState<duCountType[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const labels = barData.map(item => item.du);
    const tmcounts = barData.map(item => item.TM);
    const ffcounts = barData.map(item => item.FF);
    const tmMax = Math.max(...tmcounts);
    const ffMax = Math.max(...ffcounts);
    const maxDataValue = Math.max(tmMax, ffMax);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                setError('');
                setIsError(false);
                const response = await fetchDuCount();
                if (!response.duCounts) {
                    throw new Error('Invalid response structure');
                }
                setBarData(response.duCounts.map((duCount: ApiResponseDuCountType) => ({
                    du: duCount.du,
                    TM: parseInt(duCount.TM, 10),
                    FF: parseInt(duCount.FF, 10)
                })));
            } catch (error) {
                console.error(error);
                setIsError(true);
                setError('An error occurred with the request.');
            }
        };

        fetchCount();
    }, []);
    
    const dataset = {
        labels: labels,
        
        datasets: [
          {
            label: 'TM Counts',
            data: tmcounts,
            backgroundColor: '#1C4E80',
            barPercentage: 0.6,

            
          },
          {
            label: 'FF Counts',
            data: ffcounts,
            backgroundColor: '#0091D5',
            barPercentage: 0.6,
          }
        ],
      };
     
    return (
        // <div style={{transform: 'scale(0.9)', marginTop:'-0.3rem', marginLeft:'1rem'}}>
            <BarComponent data={dataset} maxDataValue={maxDataValue}/>
        // </div>
    );
}

export default BarChartHandler;
