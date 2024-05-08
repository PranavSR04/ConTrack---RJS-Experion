import React from "react";
import ContractFormHandler from "../ContractForm/ContractFormHandler";
import styles from "./AddContract.module.css";
import { AddContractPropType } from "./types";

const AddContract = ({ addContract, initialValues }: AddContractPropType) => {
	return (
		<div className={styles.addcontract}>
			<h2 className={styles.addcontract__title}>ADD CONTRACT</h2>
			<ContractFormHandler addContract={addContract} initialValues={initialValues}/>
		</div>
	);
};

export default AddContract;
