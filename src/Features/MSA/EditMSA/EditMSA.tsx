import { EditMsaPropType } from './types'
import styles from './EditMSA.module.css'
import MSAFormHandler from '../MSAForm/MSAFormHandler'
import BreadCrumbs from '../../../Components/BreadCrumbs/Breadcrumbs'
const EditMSA = ({
    msa_id,
    msaEdited
}:EditMsaPropType) => {
   
  return (
    <>
    <div className={styles.editmsa}>
    <BreadCrumbs
            style={{
            marginBottom:8,
            fontSize: 16,
            fontStyle: "italic",
          }}
        />
        <h2 className={styles.editmsa__heading}>EDIT MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler
        msa_id={msa_id}
        msaEdited={msaEdited}/>
      </div>
    </>
  )
}

export default EditMSA
