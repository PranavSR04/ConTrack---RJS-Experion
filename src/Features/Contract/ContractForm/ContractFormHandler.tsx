import React, { useEffect, useState } from "react";
import ContractForm from "./ContractForm";
import moment from "moment";
import { getMSA, getUserList, postContract } from "./api/api";
import { MSAType } from "./types";
// import { RcFile } from "antd/es/upload";

const ContractFormHandler = () => {
	const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
	const [clients, setClients] = useState<MSAType[]>([]);
	const [clientRegion, setClientRegion] = useState<string>();
	const [users, setUsers] = useState<any[]>([]);
	const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const assocFilteredOptions = OPTIONS.filter(
		(o) => !selectedItems.includes(o)
	);
	useEffect(()=>{
		getClientNames();
		getAssocUsers();
	},[])

	const handleSelectChange = (value: string) => {
		setSelectedOption(value);
	};

	//Get client names (MSA)
	const getClientNames = async(value?:string) =>{
		const responce = await getMSA(value);
		setClients(responce.data);
		console.log(responce.data);
	}

	//Get Associated Users List
	const getAssocUsers = async(value?:string) =>{
		const responce = await getUserList(value);
		setUsers(responce.data.data);
		console.log(responce.data.data)
	}

	//Setting the region autofill when clientname is selected
	const onSelectClientName = (value: number) =>{
		const selectedClient : MSAType | undefined = clients.find((msa) => msa.id === value);
		console.log(`ID:${value} , Selected Client Name: ${selectedClient?.client_name}, region: ${selectedClient?.region}`);
		setClientRegion(selectedClient?.region);
	}

	//Formate the day.js object to yyyy-mm-dd formate
	const getFormatedDate = (date: any) => {
		const dateObject = new Date(date ? date.$d : "2024-11-2");
		const formattedDate = moment(dateObject).format("YYYY-MM-DD");
		return formattedDate;
	};

	const onFinish = async (values: any) => {
		console.log(values);
		const { milestones, date_of_signature, start_date, end_date } = values;

		// Format completiondate fields in milestones array
		const formattedMilestones = milestones.map((milestone: any) => {
			const formattedDate = getFormatedDate(milestone.completiondate);
			return {
				...milestone,
				completiondate: formattedDate,
			};
		});

		// Construct the final object with formatted milestones
		const formattedValues = {
			...values,
			milestones: formattedMilestones,
			date_of_signature: getFormatedDate(date_of_signature),
			start_date: getFormatedDate(start_date),
			end_date: getFormatedDate(end_date),
			file: values.file.file.originFileObj,
			contract_added_by:1,
		};
		console.log(values);
		console.log("File ", values.file.file.originFileObj);
		console.log("Formatted Form Values:", formattedValues);

		try{
			await postContract(formattedValues);
		}catch(error){
			console.log("Error in adding contract" ,error)
		}


	};
	return (
		<ContractForm
			selectedOption={selectedOption}
			handleSelectChange={handleSelectChange}
			onFinish={onFinish}
			selectedItems={selectedItems}
			setSelectedItems={setSelectedItems}
			assocFilteredOptions={assocFilteredOptions}
			clients={clients}
			clientRegion={clientRegion}
			onSelectClientName={onSelectClientName}
			getClientNames={getClientNames}
			users={users}
		/>
	);
};

export default ContractFormHandler;
