import { IndividualMsaPropType } from './types'
import MsaHeaderHandler from './Header/MsaHeaderHandler'
import styles from './IndividualMSA.module.css'
import MsaOverviewHandler from './OverView/MsaOverviewHandler'
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
      <MsaRevenueHandler msa_id={msa_id}/>
      <MsaDocHandler response={responses?responses:undefined}  />
      <MsaCommentsHandler responses={responses} loading={loading} />
    </div>
  )
}

export default IndividualMSA
