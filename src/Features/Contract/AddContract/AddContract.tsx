import React from "react";
import ContractFormHandler from "../ContractForm/ContractFormHandler";
import styles from "./AddContract.module.css";
import { AddContractPropType } from "./types";
import BreadCrumbs from "../../../Components/BreadCrumbs/Breadcrumbs";

const AddContract = ({ addContract, initialValues }: AddContractPropType) => {
	return (
		<div className={styles.addcontract}>
			<h2 className={styles.addcontract__title}>ADD CONTRACT</h2>
		    <BreadCrumbs
            style={{
            marginLeft: "1rem",
            marginTop: "0.7rem",
            fontSize: 16,
            fontStyle: "italic",
          }}
        />
			<ContractFormHandler addContract={addContract} initialValues={initialValues}/>
		</div>
	);
};

export default AddContract;
