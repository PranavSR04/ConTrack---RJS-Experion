import React from 'react'
import { IndividualMsaPropType } from './types'
import MsaHeaderHandler from './Header/MsaHeaderHandler'
import styles from './IndividualMSA.module.css'
import MsaOverviewHandler from './OverView/MsaOverviewHandler'
import ContractListHandler from './../../Contract/ContractListing/ContractListHandler';
const IndividualMSA = (
    {
  responses,
  id,
  loading,
}: IndividualMsaPropType
) => {
  console.log(responses);
  return (
    <div className={`${styles.maincontainer}`}>
      <MsaHeaderHandler responses={responses} id={id} />
      <MsaOverviewHandler responses={responses} loading={loading} />
       {/* <div className={`${styles.maincontainer__revenue}`}>
        <div className={styles.maincontainer__chart}>
          <RevenueProjectionHandler id={revenueid} />
        </div>
      </div> */}
      {/* <div className={`${styles.maincontainer__milestones}`}>
        <MilestonesHandler responses={responses} loading={loading} />
      </div> */}
      {/* <DocumentsUsersCommentsHandler responses={responses} loading={loading} /> */}
      {/* <CloseContractHandler responses={responses} id={id} />  */}
    </div>
  )
}

export default IndividualMSA
