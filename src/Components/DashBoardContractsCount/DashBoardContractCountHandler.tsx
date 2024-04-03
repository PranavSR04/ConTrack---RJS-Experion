import React, { useEffect, useState } from 'react'
import { fetchDuCount } from '../../Features/DashBoardBarChart/api/getDuCount';
import DashBoardCount from './DashBoardCount';

const DashBoardContractCountHandler = () => {
    const [error, setError] = useState<string>("");
    const [contractCount, setContractCount] = useState<number>(1);
    const [isError, setIsError] = useState<boolean>(false);
    const Contract='Contracts'
    useEffect(() => {
         // Function to fetch contract count
        const fetchCount = async () => {
            try {
                setError('');
                setIsError(false);
                // Fetch contract count from API
                const response = await fetchDuCount();
                if (response.totalContractsCount !== undefined) {
                    setContractCount(response.totalContractsCount);
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                console.error(error);
                setIsError(true);
                setError('An error occurred with the request.');
            }
        };

        fetchCount();
    }, []);
    console.log("total contract count",{contractCount})
  return (
   <DashBoardCount contractCount={contractCount} Contract={Contract}/>
  )
}

export default DashBoardContractCountHandler
