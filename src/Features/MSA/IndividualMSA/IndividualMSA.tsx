import { IndividualMsaPropType } from './types'
import MsaHeaderHandler from './Header/MsaHeaderHandler'
import styles from './IndividualMSA.module.css'
import MsaOverviewHandler from './OverView/MsaOverviewHandler'
import ContractList from './ContractList/ContractList'
import ContractListHandler from './ContractList/ContractListHandler'
import MsaRevenueHandler from './MsaRevenue/MsaRevenueHandler'
import MsaDocHandler from './MsaDoc/MsaDocHAndler';
import MsaComments from './Comments/MsaComments'
import MsaCommentsHandler from './Comments/MsaCommentsHandler'

const IndividualMSA = (
    {
  responses,
  msa_id,
  loading,
}: IndividualMsaPropType
) => {
  return (
    <div className={styles.maincontainer}>
      <MsaHeaderHandler responses={responses} id={msa_id && msa_id} />
      <MsaOverviewHandler responses={responses} loading={loading} />
      <div className={styles.maincontainer__revenue}>
      <MsaRevenueHandler msa_id={msa_id}/>
      </div>
      <div className={styles.maincontainer__doclist}>
      <MsaDocHandler response={responses?responses:undefined}  />

       </div>
       <div className={styles.maincontainer__comments}>
      <MsaCommentsHandler  responses={responses} loading={loading}/>
       </div>
       <div className={styles.maincontainer__contractlist}>
       <ContractListHandler responses={responses} id={msa_id} />
       </div>
    </div>
  )
}

export default IndividualMSA
