import { EditMsaPropType } from './types'
import styles from './EditMSA.module.css'
import MSAFormHandler from '../MSAForm/MSAFormHandler'
const EditMSA = ({
    msa_id,
    msaEdited
}:EditMsaPropType) => {
   
  return (
    <>
    <div className={styles.editmsa}>
        <h2 className={styles.editmsa__heading}>EDIT MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler
        msa_id={msa_id}
        msaEdited={msaEdited}/>
      </div>
    </>
  )
}

export default EditMSA
