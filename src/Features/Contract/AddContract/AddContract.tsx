import React from "react";
import styles from "./AddContract.module.css";
import { AddContractPropType } from "./types";
import BreadCrumbs from "../../../Components/BreadCrumbs/Breadcrumbs";
import ContractFormHandler from "../../../Components/ContractForm/ContractFormHandler";

const AddContract = ({ addContract, initialValues }: AddContractPropType) => {
	return (
		<div className={styles.addcontract}>
      <BreadCrumbs
            style={{
            marginLeft: "1rem",
            marginBottom: "0.5rem",
            fontSize: 13,
            fontStyle: "italic",
          }}
        />
			<h2 className={styles.addcontract__title}>ADD CONTRACT</h2>
			<ContractFormHandler addContract={addContract} initialValues={initialValues}/>
		</div>
	);
};

export default AddContract;
