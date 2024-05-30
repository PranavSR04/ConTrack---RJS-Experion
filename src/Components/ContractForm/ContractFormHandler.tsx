import React, { useEffect, useState } from "react";
import ContractForm from "./ContractForm";
import moment from "moment";
import { getMSA, getUserGroups, getUserList } from "./api/api";
import { ContractFormHandlerPropType, InitialFieldsType, MSAType, Milestone } from "./types";
import { useNavigate } from "react-router";
import { Form, Modal, message } from "antd";
import dayjs from "dayjs";
import { editContract } from "../../Features/Contract/EditContract/api/api";

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
	const [error,setError] = useState<string>();
	const navigate = useNavigate();
	const handleCancel = () => {setIsModalOpen(false);};
	const showModal = () => {
		if(error){
			Modal.error({
			title: 'Cannot add contract',
			content: error,
		  });
		}else{
			setIsModalOpen(true)
		}
		;
	};

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
		const { milestones, date_of_signature, start_date, end_date, comments } = values;
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
			comments: comments?comments:"s"
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
		const dateOfSignature = value;
		
		if (dayjs(startDate).isBefore(dateOfSignature) || dayjs(endDate).isBefore(dateOfSignature)) {
			return Promise.reject('Date of Signature must be before Start Date and End Date');
		}
		if(value && selectedMSA){
			if(value.isBefore(selectedMSA.start_date)){
				return Promise.reject('Date must be after MSA start date');
			}
		}
		
		return Promise.resolve(); 
	};

	// Validation for date of signature to be before start date
	const validateStartDate = (_: unknown, value: dayjs.Dayjs | null | undefined) => {
		const dateOfSignature = form.getFieldValue('date_of_signature');
		const startDate = value;
		const endDate = form.getFieldValue('end_date');
		
		if (dateOfSignature && startDate && dayjs(dateOfSignature).isAfter(startDate)) {
			return Promise.reject('Start Date must be after Date of Signature');
		}
		if (endDate && startDate && dayjs(endDate).isBefore(startDate)) {
			return Promise.reject('Start Date must be before End Date');
		}
		return Promise.resolve();
	};

	// Validation for start date to be before end date
	const validateEndDate = (_: unknown, value: dayjs.Dayjs | null | undefined) => {
		const dateOfSignature = form.getFieldValue('date_of_signature');
		const startDate = form.getFieldValue('start_date');
		const endDate = value;
		if (startDate && endDate && dayjs(startDate).isAfter(endDate)) {
			return Promise.reject('End Date must be after Start Date');
		}
		if (dateOfSignature && endDate && dayjs(dateOfSignature).isAfter(endDate)) {
			return Promise.reject('End Date must be after Date of Signature');
		}
		if(value && selectedMSA){
			if(value.isAfter(selectedMSA.end_date)){
				return Promise.reject('Date must be before MSA end date');
			}
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

	//Validator for total amount validation
	const validateTotalAmount = (_:unknown,value:any[]) =>{
		const milestones: Milestone[] = form.getFieldValue('milestones');
		let totalAmount = 0;
		milestones.forEach((field: Milestone) => {
			if (field && typeof field.amount !== 'undefined') {
				totalAmount += field.amount ? field.amount : 0 ;
			}
		  });
		if(totalAmount !== parseFloat(form.getFieldValue('estimated_amount'))){
			setError("Total amount should be equal to Total Contract Value");	
		}else{
			setError(undefined);
		}
		return Promise.resolve();
	}
	
	  // Validator function for total percentage
	const validateTotalPercentage = (_: unknown, value: number) => {
		const milestones: Milestone[] = form.getFieldValue('milestones');
		let totalPercentage = 0;
		milestones.forEach((field: Milestone) => {
			if(field && typeof field.percentage !== 'undefined'){
				totalPercentage += field.percentage? field.percentage : 0;
			}
		  
		});
		if (totalPercentage !== 100) {
			setError("Total percentage should be 100");
		} else {
			setError(undefined);
		}
		return Promise.resolve();
	};

	//Funtion to show message before file upload
	const beforeUpload = (file:File) =>{
		console.log("Fileeee",file);
		if((file.size/1024 /1024) <= 5 ){
			return Promise.resolve();
		}else{
			message.error("File size should be less than 5MB");
			return Promise.reject('File size should be less than 5MB');
		}
	}

	//Validator funtion for File
	const validateFile = (_:unknown,value:any) =>{
		// console.log("File",value.file.size);
		if(value){
			if((value.file.size/1024 /1024) <= 5 ){
				return Promise.resolve();
			}else{
				return Promise.reject('File size should be less than 5MB');
			}
		}
		return Promise.resolve();
	}


	const rules = {
		client_name : [{ required: true, message: 'Please select Client Name' }],
		contract_id : [{ required: true, message: 'Please input Contract ID' }],
		du : [{ required: true, message: 'Please select DU' }],
		date_of_signature : [{ required: true, message: 'Please select Date of Signature' },{ validator: validateDateOfSignature }],
		start_date : [{ required: true, message: 'Please select Start Date' }, { validator: validateStartDate }],
		end_date : [{ required: true, message: 'Please select End Date' }, { validator: validateEndDate}],
		estimated_amount : [{ required: true, message: 'Please input Total Contract Value' }],
		milestone_desc : [{required: true, message: "Please input Description"}],
		milestone_enddate : [{required: true, message: "Please select End Date"},{validator: validateMilestoneEndDate}],
		percentage : [{required: true, message: "Please input %"},{ validator: validateTotalPercentage }],
		amount : [{required: true, message: "Please input amount"},{ validator: validateTotalAmount }],
		file: [{ required: true, message: 'Please upload file' },{ validator: validateFile }],
		addendum_file : [{ validator: validateFile }]
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
			rules={rules}
			error={error}
			beforeUpload={beforeUpload}
		/>
	);
};

export default ContractFormHandler;
