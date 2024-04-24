import React from 'react'
import ContractFormHandler from '../ContractForm/ContractFormHandler';
import styles from './AddContract.module.css';

const AddContract = () => {
  return (
    <div className={styles.addcontract}>
        <h2 className={styles.addcontract__title}>ADD CONTRACT</h2>
        <ContractFormHandler/>
    </div>
  )
}

export default AddContract
