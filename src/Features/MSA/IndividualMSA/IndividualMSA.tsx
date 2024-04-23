import { Card } from 'antd'
import React from 'react'
import MsaRevenueHandler from './MsaRevenue/MsaRevenueHandler'
import { useLocation } from 'react-router';

const IndividualMSA = () => {
  const location = useLocation();
  const { state } = location;
  const msa_id = state?.msa_id;
  return (
  
      <>  
   <MsaRevenueHandler msa_id={msa_id}/>
      </>
  
  )
}

export default IndividualMSA
