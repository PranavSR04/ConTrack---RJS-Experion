import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ContractFormHandler from "../ContractForm/ContractFormHandler";
import { getContract } from "./api/api";
import { ContractType } from "../ContractForm/types";
import styles from './EditContract.module.css';

const EditContractHandler = () => {
	const [contractDetails, setContractDetails] = useState<ContractType>();
	const location = useLocation();
	let { id } = location.state;
	const contract_id = parseInt(id);

	const getContractData = async () => {
		const responce = await getContract(contract_id);
		setContractDetails(responce.data.data[0]);
		console.log("Contract Details: ", responce.data.data[0]);
	};
	useEffect(() => {
		getContractData();
	}, []);

	return (
		<div className={styles.editContract}>
			<h2 className={styles.editContract__title}>EDIT CONTRACT</h2>
			{contractDetails && <ContractFormHandler contractDetails={contractDetails} contract_id={contract_id}/>}
		</div>
	);
};

export default EditContractHandler;
