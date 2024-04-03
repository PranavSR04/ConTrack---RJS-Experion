import React, { useEffect, useState } from 'react'
import DashBoardCount from './DashBoardCount';
import { fetchMsaCount } from './api/getMsaCount';

const DashBoardMsaCountHandler = () => {
    const [error, setError] = useState<string>("");
    const [msaCount, setMsaCount] = useState<number>(1);
    const [isError, setIsError] = useState<boolean>(false);
    const Msa="MSA's"
    useEffect(() => {
         // Function to fetch contract count
        const fetchCount = async () => {
            try {
                setError('');
                setIsError(false);
                // Fetch contract count from API
                const response = await fetchMsaCount();
                if (response.active_msa_count !== undefined) {
                    setMsaCount(response.active_msa_count);
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
    console.log("total contract count",{msaCount})
  return (
   <DashBoardCount contractCount={msaCount} Contract={Msa}/>
  )
}

export default DashBoardMsaCountHandler
