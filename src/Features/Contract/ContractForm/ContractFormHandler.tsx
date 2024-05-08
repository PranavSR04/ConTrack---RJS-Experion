import React, { useEffect, useState } from "react";
import ContractForm from "./ContractForm";
import moment from "moment";
import { getMSA, getUserGroups, getUserList } from "./api/api";
import { ContractFormHandlerPropType, InitialFieldsType, MSAType } from "./types";
import { editContract } from "../EditContract/api/api";
import { useNavigate } from "react-router";

const ContractFormHandler = ({contractDetails,contract_id,addContract,initialValues}: ContractFormHandlerPropType) => {
	const [selectedOption, setSelectedOption] = useState<string>();
	const [modalTitle,setModalTitle] = useState<string>("Do you want to add contract?");
	const [filename,setFilename] = useState<"file" | "addendum_file">("file");
	const [clients, setClients] = useState<MSAType[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [groups, setGroups] = useState<any[]>([]);

	const [initialFields,setInitialFields] = useState<[InitialFieldsType]>();
	const [disabled,setDisabled] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const handleCancel = () => {setIsModalOpen(false);};
	const showModal = () => {setIsModalOpen(true);};

	useEffect(() => {
		if (contractDetails) {
			const contractType = contractDetails.contract_type;
			setSelectedOption(contractType);
			setFilename("addendum_file");
			setDisabled(true);
			setModalTitle("Do you want to edit this contract?")
		}
	}, [contractDetails]);

	useEffect(() => {
		getClientNames();
		getAssocUsers();
		getAssocGroups();
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
		console.log("Users",responce.data.data);
	};

	//Get User groups List
	const getAssocGroups = async () =>{
		const responce = await getUserGroups();
		console.log("Groups",responce);
		setGroups(responce);
	}

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
		console.log("Values",values);
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
			contract_added_by: localStorage.getItem("user_id"),
		};

		if (contractDetails) {
			// For adding a new contract
			console.log("Addentum", values);
			formattedValues.addendum_file = values.addendum_file?.file.originFileObj;
			formattedValues.contract_status = contractDetails.contract_status;
			formattedValues.contract_doclink = contractDetails.contract_doclink;
			
		} else {
			// For editing an existing contract
			formattedValues.file = values.file.file.originFileObj;
		}
		console.log("Formatted Form Values:", formattedValues);
		try{

		}catch(error){

		}
		if (contractDetails && contract_id) {
			try{
				await editContract(formattedValues,contract_id);
			}catch(error){
				console.log("Error in adding contract", error);
			}finally{
				navigate("/AllContracts", {
					state: { edited: true},
				  });
			}
		} else {
			try {
				addContract && await addContract(formattedValues);
			} catch (error) {
				console.log("Error in adding contract", error);
			}finally{
				navigate("/AllContracts", {
					state: { added: true},
				  });
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
			disabled={disabled}
			modalTitle={modalTitle}
			handleCancel={handleCancel}
			showModal={showModal}
			isModalOpen={isModalOpen}
			groups={groups}
		/>
	);
};

export default ContractFormHandler;
