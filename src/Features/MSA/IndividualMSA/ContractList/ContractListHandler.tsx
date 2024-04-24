import React, { useEffect, useState } from 'react'
import ContractList from './ContractList'
import { useLocation } from 'react-router';
import { MsaApiType } from '../types';
import { getMSAData } from '../api/getMSAData';
import { AxiosError } from 'axios';
import { ContractData, ContractListHandlerPropType, MsaDataType, getContractCountHandlerType } from './types';
import { Collapse, Table } from 'antd';

const ContractListHandler = ({ responses, id }:ContractListHandlerPropType) => {
    const [error, setError] = useState<string>("");
    const [totalContracts, setTotalContracts] = useState<number>(0);
    const [contractData, setContractData] = useState<ContractData[]>([]);
    const [expiringCount, setExpiringCount] = useState(0);
    const [progressCount, setProgressCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [closedCount,setClosedCount]=useState(0);
    const [expiredCount,setExpiredCount]=useState(0);
    useEffect(() => {
        getContractCount(responses);
      }, [responses]);
      const getContractCount:getContractCountHandlerType ["getCount"]= (responses) => {
        if (responses && responses.data && responses.data.length > 0) {
         if(responses.data[0]){
            const data = responses.data[0];
            const contracts = data.contracts || [];
            setTotalContracts(contracts.length);
         } else {
            console.error("Error fetching contract data:", responses);
          }
        } else {
          setError("Failed to get response");
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                  if (responses instanceof Error) {
        console.error('An error occurred:', responses.message);
    } else if (responses && 'data' in responses && Array.isArray(responses.data)) {
        const contracts: ContractData[] = [];
        const data = responses.data;
       
                data.forEach((msa) => {
                    setExpiringCount(msa.expiring_contracts_count || 0);
                    setProgressCount(msa.onprogress_contracts_count || 0);
                    setActiveCount(msa.active_contracts_count || 0);
                    setClosedCount(msa.closed_contracts_count||0)
                    setExpiredCount(msa.expired_contracts_count||0)
                    msa.contracts.forEach((contract) => {
                        contracts.push({
                            contract_ref_id: contract.contract_ref_id,
                            contract_type: contract.contract_type,
                            contract_status: contract.contract_status,
                        });
                    });
                });
            
                setContractData(contracts);
            }
            } catch (error) {
                console.error('Error fetching contract data:', error);
                setError('Failed to fetch contract data');
            } 
        };

        fetchData();
    }, [responses]);
    const columns = [
        {
            title: 'Contract Ref Id',
            dataIndex: 'contract_ref_id',
            key: 'contract_ref_id',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Contract Type',
            dataIndex: 'contract_type',
            key: 'contract_type',
        },
        {
            title: 'Status',
            dataIndex: 'contract_status',
            key: 'contract_status',
            render: (text: string) => (
                <span style={{ display: 'inline-block', minWidth:'89px',padding: '5px', borderRadius: '3px', color: 'white', fontWeight: 'bold', backgroundColor: getStatusColor(text) , textAlign: 'center'}}>
                    {text}
                </span>
            ),
        }
    ];
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Closed':
                return '#8A8382';
            case 'Expiring':
                return '#EDE591';
            case 'On Progress':
                return '#8DD5F9';
            case 'Active':
                return '#69E09C';
            case 'Expired':
                return '#DC7567';
            default:
                return 'inherit';
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
                    '#ff4000',//Closed
                    '#29343f' //Expired
                ],
            },
        ],
    };
    const options = {
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
    <ContractList
    contractData={contractData}
    columns={columns}
    chartData={chartData}
    options={options}
    />

    </>
  )
}

export default ContractListHandler
