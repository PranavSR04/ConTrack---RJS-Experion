import React, { useEffect, useState } from 'react'
import Msa_contract_list from './Msa_contract_list'
import { useLocation } from 'react-router';
import { MsaIndividualdata } from './api/MsaIndividualdata';
import { MsaDataType } from './types';
import { Collapse } from 'antd';

const Msa_contract_listHandler = () => {
    const location = useLocation();
    const id = location.state.id;
    const [msaData, setMsaData] = useState<MsaDataType>();
    useEffect(()=>{
        MsaIndividualdata(id)
        .then(response => {
          setMsaData(response.data)
        })
        .catch(error => {
          console.error('Error fetching MSA data:', error);
        });
    }
,[])
const totalContractCount = msaData?.total_contracts_count ?? 0;
    const collapseComponents = [];
    for (let i = 1; i <= totalContractCount; i++) {
      console.log(contractRefId)
      collapseComponents.push(
        <Collapse
          style={{ width: '300px' }} 
          key={i.toString()}
          collapsible="header"
          defaultActiveKey={['1']}
          items={[
            {
              key: '1',
              label: contractRefId ,
              children: <p>Content for Panel {i}</p>,
            },
          ]}
        />
      );
    }
console.log(msaData,"is the msa data")
  return (
    <>
      {msaData && (
    <Msa_contract_list msaData={msaData} 
    collapseComponents={collapseComponents}/>
  )}
    </>
  )
}

export default Msa_contract_listHandler
