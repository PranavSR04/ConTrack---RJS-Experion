import React, { useEffect, useState } from 'react'
import ContractList from './ContractList'
import { useLocation, useNavigate } from 'react-router';
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
    const [actionClicked, setActionClicked] = useState<boolean>(false);
    const navigate = useNavigate();
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
                            id:contract.id,
                            contract_ref_id: contract.contract_ref_id,
                            contract_type: contract.contract_type,
                            contract_status: contract.contract_status,
                            start_date: contract.start_date,
                            end_date: contract.end_date,
                            du:contract.du,

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
            title: 'Id',
            dataIndex: 'contract_ref_id',
            key: 'contract_ref_id',
            render: (text: any, record: ContractData) => (
                <span onClick={() => rowClickHandler(record)}>{text}</span>
              ),
            // render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Type',
            dataIndex: 'contract_type',
            key: 'contract_type',
        },
        {
          title: 'Start Date',
          dataIndex: 'start_date',
          key: 'contract_type',
      },
      {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'contract_type',
    },
      {
        title: 'DU',
        dataIndex: 'du',
        key: 'du',
    },
        {
            title: 'Status',
            dataIndex: 'contract_status',
            key: 'contract_status',
            render: (text: string) => (
                <span style={{ display: 'inline-block', minWidth:'89px', borderRadius: '3px', color: 'white', backgroundColor: getStatusColor(text) , textAlign: 'center',fontSize: '14px'}}>
                    {text}
                </span>
            ),
        }
    ];
    const rowClickHandler = (record: ContractData) => {
        if (!actionClicked) {
          navigate(`/AllContracts/${record.contract_ref_id}`, {
            state: { id: record.id },
          });
        }
      };
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
