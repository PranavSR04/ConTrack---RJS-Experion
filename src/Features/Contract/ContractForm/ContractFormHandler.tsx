import React, { useEffect, useState } from "react";
import ContractForm from "./ContractForm";
import moment from "moment";
import { getMSA, getUserGroups, getUserList } from "./api/api";
import { ContractFormHandlerPropType, InitialFieldsType, MSAType, Milestone } from "./types";
import { editContract } from "../EditContract/api/api";
import { useNavigate } from "react-router";
import { Form } from "antd";
import dayjs from "dayjs";

const ContractFormHandler = ({contractDetails,contract_id,addContract,initialValues}: ContractFormHandlerPropType) => {
	const [selectedOption, setSelectedOption] = useState<string>();
	const [modalTitle,setModalTitle] = useState<string>("Do you want to add contract?");
	const [filename,setFilename] = useState<"file" | "addendum_file">("file");
	const [clients, setClients] = useState<MSAType[]>([]);
	const [selectedMSA, setSelectedMSA] = useState<MSAType>();
	const [users, setUsers] = useState<any[]>([]);
	const [groups, setGroups] = useState<any[]>([]);
	const [form] = Form.useForm();
	const [tcv,setTcv] = useState<number>(0);
	const [spinning,setSpinning] = useState<boolean>(false);
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
			setModalTitle("Do you want to edit this contract?");
			setTcv(contractDetails.estimated_amount);
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

	//Auto calculating the amount for fixedfee contracts
	const calculateAmount = (percentage: number | null, key : number) =>{
		const amount = percentage && (percentage/100) * tcv;
			const fields = form.getFieldsValue();
			console.log("Fields",fields);
			const {milestones} = fields;
			Object.assign(milestones[key], {amount: amount});
			form.setFieldsValue({milestones});
	}

	//Get User groups List
	const getAssocGroups = async () =>{
		const responce = await getUserGroups();
		console.log("Groups",responce);
		setGroups(responce);
	}

	//Setting the region autofill when clientname is selected
	const onSelectClientName = (value: number) => {
		const selectedClient: MSAType | undefined = clients.find((msa) => msa.id === value);
		console.log(
			`ID:${value} , Selected Client Name: ${selectedClient?.client_name}, region: ${selectedClient?.region}`
		);
		setSelectedMSA(selectedClient);
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
		setSpinning(true);
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
				setSpinning(false);
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
				setSpinning(false);
				navigate("/AllContracts", {
					state: { added: true},
				  });
			}
		}
	};

	//Form Validations 

	// Validation for date of signature to be before start date and end date
	const validateDateOfSignature = (_: unknown, value: dayjs.Dayjs | null | undefined,callback: (error?: string) => void) => {
		const startDate = form.getFieldValue('start_date');
		const endDate = form.getFieldValue('end_date');
		console.log("StartDate ",startDate);
		if (value && startDate && endDate) {
			if (value.isBefore(startDate) && value.isBefore(endDate)) {
				callback(); // Validation passed
				return;
			}
		callback('Date of Signature must be before Start Date and End Date');
		} else {
			callback() // Validation passed if fields are empty
		}
	};
	// Validation for start date to be before end date
	const validateStartDate = (_: unknown, value: dayjs.Dayjs | null | undefined) => {
		const startDate = value;
		const endDate = form.getFieldValue('end_date');
		if (startDate && endDate && dayjs(startDate).isAfter(endDate)) {
			return Promise.reject('Start Date must be before End Date');
		}
		return Promise.resolve();
	};

	// Validation for milestone enddate to be between start date and end date
	const validateMilestoneEndDate = (_: unknown, value: dayjs.Dayjs | null | undefined) => {
		const startDate = form.getFieldValue('start_date');
		const endDate = form.getFieldValue('end_date');
		if (startDate && endDate && value && (dayjs(value).isBefore(startDate) || dayjs(value).isAfter(endDate))) {
			return Promise.reject('Milestone End Date must be between Contract Period');
		}
		return Promise.resolve();
	};

	// Function to calculate total percentage
	const calculateTotalPercentage = () => {
		const milestones: Milestone[] = form.getFieldValue('milestones');
		let totalPercentage = 0;
		milestones.forEach((field: Milestone) => {
		  totalPercentage += field.percentage || 0;
		});
		return totalPercentage;
	};
	
	  // Validator function for total percentage
	const validateTotalPercentage = (_: unknown, value: number) => {
		const totalPercentage = calculateTotalPercentage();
		if (totalPercentage !== 100) {
			return Promise.reject(new Error('Total percentage should be 100'));
		} else {
			// Clear validation errors for individual percentage fields
			const milestones = form.getFieldValue('milestones');
			milestones.forEach((_:unknown, index: number) => {
				const fieldName = `milestones[${index}].percentage`;
				form.setFields([{ name: fieldName, errors: [] }]);
			});
			return Promise.resolve();
		}
	};


	const rules = {
		client_name : [{ required: true, message: 'Please select a Client Name' }],
		contract_id : [{ required: true, message: 'Please input a Contract ID' }],
		du : [{ required: true, message: 'Please select a DU' }],
		date_of_signature : [{ required: true, message: 'Please select the Date of Signature' },{ validator: validateDateOfSignature }],
		start_date : [{ required: true, message: 'Please select the Start Date' }, { validator: validateStartDate }],
		end_date : [{ required: true, message: 'Please select the End Date' },],
		milestone_enddate : [{required: true, message: "Please input Milestone End Date"},{validator: validateMilestoneEndDate}],
		percentage : [{required: true, message: "Please input Milestone Percentage"},
		// { validator: validateTotalPercentage }
	],
	}


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
			calculateAmount={calculateAmount}
			form={form}
			setTcv={setTcv}
			spinning={spinning}
			selectedMSA={selectedMSA}
			rules={rules}
		/>
	);
};

export default ContractFormHandler;
