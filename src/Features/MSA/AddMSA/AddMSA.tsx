
import styles from './AddMSA.module.css'
import { AddMsaPropType } from './types'
import MSAFormHandler from '../MSA/MSAFormHandler'
const AddMSA = ({
  addMsa,
  initialValues,
  msaAdded
}:AddMsaPropType) => {
  return (
    <>
      <div className={styles.addmsa}>
        <h2 className={styles.addmsa__heading}>ADD MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler addMsa={addMsa} initialValues={initialValues} msaAdded={msaAdded}/>
      </div>
    </>
  )
}

export default AddMSA
