import React, { useEffect } from 'react'
import { EditMsaPropType } from './types'
import { initial } from 'lodash'
import styles from './EditMSA.module.css'
import MSAFormHandler from '../MSA/MSAFormHandler'
const EditMSA = ({
    msa_id,
    initialValues,
    msaData,
    msaEdited
}:EditMsaPropType) => {
   
  return (
    <>
    <div className={styles.editmsa}>
        <h2 className={styles.editmsa__heading}>EDIT MASTER SERVICE AGREEMENT</h2>
        <MSAFormHandler
        msaData={msaData}
        msa_id={msa_id}
        initialValues={initialValues}
        msaEdited={msaEdited}/>
      </div>
    </>
  )
}

export default EditMSA
