import styles from './RenewMsa.module.css'
import MSAFormHandler from '../MSAForm/MSAFormHandler'
import { RenewMsaModalPropsType } from '../../MSAOld/RenewMsa/types'
import { RenewMsaPropType } from './types'
import BreadCrumbs from '../../../Components/BreadCrumbs/Breadcrumbs'
const RenewMSA = ({
    msa_id,
    msaRenewed
}:RenewMsaPropType) => {
   
  return (
    <>
    <div className={styles.renewmsa}>
    <BreadCrumbs
            style={{
            marginBottom:8,
            fontSize: 16,
            fontStyle: "italic",
          }}
        />
        <h2 className={styles.renewmsa__heading}>RENEW MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler
        msa_id={msa_id}
        msaRenewed={msaRenewed}/>
      </div>
    </>
  )
}

export default RenewMSA
