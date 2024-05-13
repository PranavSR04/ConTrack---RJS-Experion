import styles from './RenewMsa.module.css'
import MSAFormHandler from '../MSAForm/MSAFormHandler'
import { RenewMsaModalPropsType } from '../../MSAOld/RenewMsa/types'
import { RenewMsaPropType } from './types'
const RenewMSA = ({
    msa_id,
    msaRenewed
}:RenewMsaPropType) => {
   
  return (
    <>
    <div className={styles.renewmsa}>
        <h2 className={styles.renewmsa__heading}>RENEW MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler
        msa_id={msa_id}
        msaRenewed={msaRenewed}/>
      </div>
    </>
  )
}

export default RenewMSA
