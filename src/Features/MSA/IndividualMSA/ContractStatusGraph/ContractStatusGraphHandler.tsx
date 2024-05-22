import React, { useEffect, useState } from "react";
import { HandlerPropType } from "../OverView/types";
import ContractStatusGraph from "./ContractStatusGraph";

const ContractStatusGraphHandler = ({ responses, loading}: HandlerPropType) => {
  const [error, setError] = useState<string>("");
  const [expiringCount, setExpiringCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [noContracts, setNoContracts] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (responses instanceof Error) {
          console.error("An error occurred:", responses.message);
        } else if (
          responses &&
          "data" in responses &&
          Array.isArray(responses.data)
        ) {
          const data = responses.data;
          data.forEach((msa) => {
            setExpiringCount(msa.expiring_contracts_count || 0);
            setProgressCount(msa.onprogress_contracts_count || 0);
            setActiveCount(msa.active_contracts_count || 0);
            setClosedCount(msa.closed_contracts_count || 0);
            setExpiredCount(msa.expired_contracts_count || 0);
          });
          if (data[0].contracts.length == 0) {
            setNoContracts(true);
          }
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
        setError("Failed to fetch contract data");
      }
    };

    fetchData();
  }, [responses]);

  const chartData = {
    labels: ['Expiring', 'Progress', 'Active','Closed','Expired'],
    datasets: [
        {
            data: [
                expiringCount,
                progressCount,
                activeCount,
                closedCount,
                expiredCount
            ],
            backgroundColor: [
                '#89CFF0', // Expiring
                '#0091D5', // Progress
                '#1C4E80', // Active
                '#29343f', //Expired
                '#F26C60',//Closed
            ],
        },
    ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,  // Allows the chart to fill the container
  cutout: '40%',
  plugins: {
    legend: {
      labels: {
        font: {
          size: 11 // Font size
        },
        boxWidth: 12  // Color block width
      }
    }
  }
};
  return (
    <>
        <ContractStatusGraph chartData={chartData}
          options={options}
          responses={responses}
          noContracts={noContracts}
          loading={loading} 
          startDate={""} endDate={""} totalEstimate={0} ffTotalEstimate={0} tmTotalEstimate={0} totalContractCount={0} tmContractCount={0} ffContractCount={0} region={""} msaTerm={0}/>
    </>
  );
};

export default ContractStatusGraphHandler;
