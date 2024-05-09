import { useEffect, useState } from "react";
import { contractType } from "../types";
import MsaOverview from "./MsaOverview";
import { HandlerPropType, OverviewHandlerType } from "./types";

const MsaOverviewHandler = ({ responses, loading}: HandlerPropType) => {
    const [error, setError] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [msaTerm, setMsaTerm] = useState<number>(0);
    const [ffContractCount, setFFContractCount] = useState<number>(0);
    const [tmContractCount, setTMContractCount] = useState<number>(0);
    const [totalContractCount,setTotalContractCount]= useState<number>(0);
    const [totalEstimate, setTotalEstimate] = useState<number>(0);
    const [ffTotalEstimate, setFFTotalEstimate] = useState<number>(0);
    const [tmTotalEstimate, setTMTotalEstimate] = useState<number>(0);
    const [expiringCount, setExpiringCount] = useState(0);
    const [progressCount, setProgressCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [closedCount,setClosedCount]=useState(0);
    const [expiredCount,setExpiredCount]=useState(0);
   const [noContracts,setNoContracts]=useState<boolean>(false)
    useEffect(() => {
      console.log("response in Header Handler", responses);
      if (responses) {
        getOverview(responses);
      } 
    }, [responses]);
    useEffect(() => {
      const fetchData = async () => {
          try {
                if (responses instanceof Error) {
      console.error('An error occurred:', responses.message);
  } else if (responses && 'data' in responses && Array.isArray(responses.data)) {
      const data = responses.data;
              data.forEach((msa) => {
                  setExpiringCount(msa.expiring_contracts_count || 0);
                  setProgressCount(msa.onprogress_contracts_count || 0);
                  setActiveCount(msa.active_contracts_count || 0);
                  setClosedCount(msa.closed_contracts_count||0)
                  setExpiredCount(msa.expired_contracts_count||0)
              });
              if(data[0].contracts.length==0){
                setNoContracts(true)
              }
          }
          } catch (error) {
              console.error('Error fetching contract data:', error);
              setError('Failed to fetch contract data');
          } 
      };

      fetchData();
  }, [responses]);
    const getOverview: OverviewHandlerType["getOverview"] = (responses) => {
      if (responses.data && responses.data.length > 0) {
        const data = responses.data[0];
        setRegion(data.region);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        const contracts = data.contracts || [];
        const term = new Date(data.end_date).getFullYear() - new Date(data.start_date).getFullYear();
        setMsaTerm(term);
  
       
        const calculateTotalEstimatedAmount = (contracts: contractType) => {
            let totalAmount = 0;
            let totalCount=0;
            data.contracts.forEach((contract:contractType) => {
              totalCount++;
              totalAmount += contract.estimated_amount;
            });
            setTotalContractCount(totalCount)
            return totalAmount;
          };
          const calculateFFEstimatedAmount = (contracts: contractType) => {
            let fftotalAmount = 0;
            let ffCount=0;
            data.contracts.forEach((contract:contractType) => {
              if(contract.contract_type=="FF"){
                ffCount++;
                fftotalAmount += contract.estimated_amount;
              }
            });
            setFFContractCount(ffCount);
            return fftotalAmount;
          };
          const calculateTMEstimatedAmount = (contracts: contractType) => {
            let tmtotalAmount = 0;
            let tmCount=0;
            data.contracts.forEach((contract:contractType) => {
              if(contract.contract_type=="TM"){
                tmCount++;
                tmtotalAmount += contract.estimated_amount;
              }
            });
            setTMContractCount(tmCount)
            return tmtotalAmount;
          };
          setTMTotalEstimate(calculateTMEstimatedAmount(contracts));
          setFFTotalEstimate(calculateFFEstimatedAmount(contracts));
          setTotalEstimate(calculateTotalEstimatedAmount(contracts));

      } else {
        setError("Failed to get response");
      }
    };
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
  console.log(chartData,"for the chart")

    return (
      <div>
        {error && <p>Error: {error}</p>}
        <MsaOverview
          startDate={startDate}
          endDate={endDate}
          totalEstimate={totalEstimate}
          ffTotalEstimate={ffTotalEstimate}
          tmTotalEstimate={tmTotalEstimate}
          totalContractCount={totalContractCount}
          tmContractCount={tmContractCount}
          ffContractCount={ffContractCount}
          loading={loading}
          region={region}
          msaTerm={msaTerm}
          chartData={chartData}
          options={options}
          responses={responses}
          noContracts={noContracts}
          />
      </div>
    );
  };
export default MsaOverviewHandler;
  