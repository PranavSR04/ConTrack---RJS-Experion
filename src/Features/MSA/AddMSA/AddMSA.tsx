
import MSAFormHandler from '../MSAForm/MSAFormHandler'
import styles from './AddMSA.module.css'
import { AddMsaPropType } from './types'
const AddMSA = ({ 
  msaAdded
}:AddMsaPropType) => {
  return (
    <>
      <div className={styles.addmsa}>
        <h2 className={styles.addmsa__heading}>ADD MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler msaAdded={msaAdded}/>
      </div>
    </>
  )
}

export default AddMSA
