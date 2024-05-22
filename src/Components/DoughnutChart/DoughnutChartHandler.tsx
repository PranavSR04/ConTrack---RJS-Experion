import { useEffect, useState } from 'react';
import { fetchDataFromApi } from './api/contractStatus';
import DoughnutChart from './DoughnutChart';
import { apiData } from './types';

const DoughnutChartHandler = () => {
    const [contractData, setContractData] = useState<apiData>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetchData(); //fetch data uplon loading
    }, []);
    const fetchData = async () => {
        try {
            const result = await fetchDataFromApi();
            setContractData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: ['Expiring', 'Progress', 'Active'],
        datasets: [
            {
                data: [
                    contractData?.expiring || 0,
                    contractData?.progress || 0,
                    contractData?.active || 0,
                ],
                backgroundColor: [
                    '#89CFF0', // Expiring
                    '#0091D5', // Progress
                    '#1C4E80', // Active
                ],
            },
        ],
    };
    const options = {
      aspectRatio: 1.4,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 11  // Font size
            },
            boxWidth: 12  // Color block width
          }
        }
      }
    };  
  return (
    <>
      <DoughnutChart
      chartData={chartData}
      loading={loading}
      options={options} />
    </>
  )
}

export default DoughnutChartHandler;
