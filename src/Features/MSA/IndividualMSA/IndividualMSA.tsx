import { IndividualMsaPropType } from './types'
import MsaHeaderHandler from './Header/MsaHeaderHandler'
import styles from './IndividualMSA.module.css'
import MsaOverviewHandler from './OverView/MsaOverviewHandler'
import React from 'react'
import MsaRevenueHandler from './MsaRevenue/MsaRevenueHandler'
const IndividualMSA = (

    {
  responses,
  msa_id,
  loading,
}: IndividualMsaPropType
) => {
  return (
    <div className={`${styles.maincontainer}`}>
      <MsaHeaderHandler responses={responses} id={msa_id} />
      <MsaOverviewHandler responses={responses} loading={loading} />
      <MsaRevenueHandler msa_id={msa_id}/>
    </div>
  )
}

export default IndividualMSA
