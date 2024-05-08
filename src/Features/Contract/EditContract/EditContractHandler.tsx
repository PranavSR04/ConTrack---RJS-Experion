import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getContract } from "./api/api";
import {
	ContractEditingInitialValueType,
	ContractType,
	EditContractValueType,
	Milestone,
} from "../ContractForm/types";
import EditContract from "./EditContract";
import dayjs from "dayjs";

const EditContractHandler = () => {
	const [contractDetails, setContractDetails] = useState<ContractType>();
	const [initialValues, setInitialValues] = useState<ContractEditingInitialValueType>();

	const location = useLocation();
	let { id } = location.state;
	const contract_id = parseInt(id);

	//Funtion to get the details of the selected contract
	const getContractData = async () => {
		const responce = await getContract(contract_id);
		setContractDetails(responce.data.data[0]);
		console.log("Contract Details: ", responce.data.data[0]);
	};

	useEffect(() => {
		getContractData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Setting the initial values to autopopulate the contract form
	useEffect(() => {
		if (contractDetails) {
			const initialDateUpdatedMilestones =
				contractDetails &&
				contractDetails.milestones?.map((milestone: Milestone) => {
					return {
						...milestone,
						milestone_enddate: dayjs(milestone.milestone_enddate),
					};
				});

			const initaiValuesData: EditContractValueType = {
				...contractDetails,
				date_of_signature: dayjs(contractDetails?.date_of_signature),
				start_date: dayjs(contractDetails?.start_date),
				end_date: dayjs(contractDetails?.end_date),
				milestones: initialDateUpdatedMilestones,
				associated_users: [],
			};

			if (contractDetails.associated_users) {
				const initialAssociated_users_id = contractDetails.associated_users.map(
					(user) => user.user_id
				);
				initaiValuesData.associated_users = initialAssociated_users_id;
			}
			setInitialValues(initaiValuesData);
		}
	}, [contractDetails]);

	return initialValues ? (
		<EditContract
			contract_id={contract_id}
			contractDetails={contractDetails}
			initialValues={initialValues}
		/>
	) : null;
};

export default EditContractHandler;
