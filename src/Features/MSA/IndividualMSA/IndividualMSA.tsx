import { IndividualMsaPropType } from './types'
import MsaHeaderHandler from './Header/MsaHeaderHandler'
import styles from './IndividualMSA.module.css'
import MsaOverviewHandler from './OverView/MsaOverviewHandler'
import ContractList from './ContractList/ContractList'
import ContractListHandler from './ContractList/ContractListHandler'
import MsaRevenueHandler from './MsaRevenue/MsaRevenueHandler'
import MsaDocHandler from './MsaDoc/MsaDocHAndler';

const IndividualMSA = (
    {
  responses,
  msa_id,
  loading,
}: IndividualMsaPropType
) => {
  return (
    <div className={`${styles.maincontainer}`}>
      <MsaHeaderHandler responses={responses} id={msa_id && msa_id} />
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
      <ContractListHandler responses={responses} id={msa_id} />
      <MsaRevenueHandler msa_id={msa_id}/>
      <MsaDocHandler response={responses?responses:undefined}  />
    </div>
  )
}

export default IndividualMSA
