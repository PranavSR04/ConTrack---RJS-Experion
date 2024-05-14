import React from "react";
import ContractFormHandler from "../ContractForm/ContractFormHandler";
import styles from "./EditContract.module.css";
import { EditContractPropType } from "./types";
import BreadCrumbs from "../../../Components/BreadCrumbs/Breadcrumbs";

const EditContract = ({
	contract_id,
	contractDetails,
	initialValues,
}: EditContractPropType) => {
	return (
		<div className={styles.editContract}>
			<BreadCrumbs
            style={{
            marginLeft: "0rem",
            marginTop: "0rem",
			marginBottom:8,
            fontSize: 16,
            fontStyle: "italic",
          }}
        />
			<h2 className={styles.editContract__title}>EDIT CONTRACT</h2>
			
			{initialValues && (
				<ContractFormHandler
					contractDetails={contractDetails}
					contract_id={contract_id}
					initialValues={initialValues}
				/>
			)}
			
		</div>
		
	);
};

export default EditContract;
