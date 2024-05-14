
import BreadCrumbs from '../../../Components/BreadCrumbs/Breadcrumbs'
import MSAFormHandler from '../MSAForm/MSAFormHandler'
import styles from './AddMSA.module.css'
import { AddMsaPropType } from './types'
const AddMSA = ({ 
  msaAdded
}:AddMsaPropType) => {
  return (
    <>
      <div className={styles.addmsa}>
      <BreadCrumbs

            style={{
            marginLeft: "0rem",
           
            marginBottom:8,
            fontSize: 16,
            fontStyle: "italic",
          }}
        />
        <h2 className={styles.addmsa__heading}>ADD MASTER SERVICE AGREEMENT</h2>
        
        <MSAFormHandler msaAdded={msaAdded}/>
      </div>
    </>
  )
}

export default AddMSA
