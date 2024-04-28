import React, { useEffect, useState } from "react";
import ContractForm from "./ContractForm";
import moment from "moment";
import { getMSA, getUserList } from "./api/api";
import { ContractFormHandlerPropType, InitialFieldsType, MSAType } from "./types";
import { editContract } from "../EditContract/api/api";

const ContractFormHandler = ({contractDetails,contract_id,addContract,initialValues}: ContractFormHandlerPropType) => {
	const [selectedOption, setSelectedOption] = useState<string>();
	const [filename,setFilename] = useState<"file" | "addendum_file">("file");
	const [clients, setClients] = useState<MSAType[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [initialFields,setInitialFields] = useState<[InitialFieldsType]>();
	useEffect(() => {
		if (contractDetails) {
			const contractType = contractDetails.contract_type;
			setSelectedOption(contractType);
			setFilename("addendum_file");
		}
	}, [contractDetails]);

	useEffect(() => {
		getClientNames();
		getAssocUsers();
	}, []);

	const handleSelectChange = (value: string) => {
		setSelectedOption(value);
	};

	//Get client names (MSA)
	const getClientNames = async (value?: string) => {
		const responce = await getMSA(value);
		setClients(responce.data);
		console.log(responce.data);
	};

	//Get Associated Users List
	const getAssocUsers = async (value?: string) => {
		const responce = await getUserList(value);
		setUsers(responce.data.data);
		console.log(responce.data.data);
	};

	//Setting the region autofill when clientname is selected
	const onSelectClientName = (value: number) => {
		const selectedClient: MSAType | undefined = clients.find(
			(msa) => msa.id === value
		);
		console.log(
			`ID:${value} , Selected Client Name: ${selectedClient?.client_name}, region: ${selectedClient?.region}`
		);
		setInitialFields([{name: "region", value: selectedClient?.region }])
	};

	//Formate the day.js object to yyyy-mm-dd formate
	const getFormatedDate = (date: any) => {
		const dateObject = new Date(date ? date.$d : "2024-11-2");
		const formattedDate = moment(dateObject).format("YYYY-MM-DD");
		return formattedDate;
	};

	//On submiting the form :- either add / edit 
	const onFinish = async (values: any) => {

		const { milestones, date_of_signature, start_date, end_date } = values;
		// Format completiondate fields in milestones array
		const formattedMilestones = milestones.map((milestone: any) => {
			const formattedDate = getFormatedDate(milestone.milestone_enddate);
			return {
				...milestone,
				milestone_enddate: formattedDate,
			};
		});

		// Construct the final object with formatted milestones
		const formattedValues = {
			...values,
			milestones: formattedMilestones,
			date_of_signature: getFormatedDate(date_of_signature),
			start_date: getFormatedDate(start_date),
			end_date: getFormatedDate(end_date),
			contract_added_by: 1,
		};

		if (contractDetails) {
			// For adding a new contract
			console.log("Addentum", values);
			formattedValues.addendum_file = values.addendum_file.file.originFileObj;
			formattedValues.contract_status = contractDetails.contract_status;
			formattedValues.contract_doclink = contractDetails.contract_doclink;
			
		} else {
			// For editing an existing contract
			formattedValues.file = values.file.file.originFileObj;
		}
		console.log("Formatted Form Values:", formattedValues);
		if (contractDetails && contract_id) {
			try{
				await editContract(formattedValues,contract_id);
			}catch(error){
				console.log("Error in adding contract", error);
			}
		} else {
			try {
				addContract && addContract(formattedValues);
			} catch (error) {
				console.log("Error in adding contract", error);
			}
		}
	};

	return (
		<ContractForm
			selectedOption={selectedOption}
			handleSelectChange={handleSelectChange}
			onFinish={onFinish}
			clients={clients}
			onSelectClientName={onSelectClientName}
			getClientNames={getClientNames}
			users={users}
			contractDetails={contractDetails}
			initialValues={initialValues}
			filename={filename}
			initialFields={initialFields}
		/>
	);
};

export default ContractFormHandler;
