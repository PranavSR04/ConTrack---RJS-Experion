import React from "react";
import AddContract from "./AddContract";
import { postContract } from "./api/postContract";
import { ContractType } from "../ContractForm/types";

const AddContractHandler = () => {
	const initialValues = { milestones: [{}] } ;
	const addContract = async (contractData: ContractType) => {
		try {
			await postContract(contractData);
		} catch (error) {
			console.log("Error - Adding Contract ", error);
		}
	};
	return <AddContract addContract={addContract} initialValues={initialValues}/>;
};

export default AddContractHandler;
