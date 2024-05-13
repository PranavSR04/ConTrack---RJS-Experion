import React, { useState } from "react";
import { Form, Select, Card, Input, Space, DatePicker, Button, InputNumber, Upload, Modal } from "antd";
import styles from "./ContractForm.module.css";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ContractFormPropType, MSAType, Milestone } from "./types";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { FormInstance } from "antd/lib";

const ContractForm = ({
	selectedOption, 
	handleSelectChange, 
	onFinish, 
	clients,
	onSelectClientName,
	getClientNames,
	users,
	contractDetails,
	initialValues,
	filename,
	initialFields,
	disabled,
	modalTitle,
	handleCancel,
	showModal,
	isModalOpen,
	groups
	}:ContractFormPropType) => {	


		const [form] = Form.useForm();
		const [totalPercentage, setTotalPercentage] = useState(0);

		// Validation for date of signature to be before start date and end date
		const validateDateOfSignature = (_: unknown, value: dayjs.Dayjs | null | undefined,callback: (error?: string) => void) => {
			const startDate = form.getFieldValue('start_date');
			const endDate = form.getFieldValue('end_date');
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
		const validateTotalPercentage = async (_: unknown, value: number) => {
			const totalPercentage = calculateTotalPercentage();
			console.log('total percentage mile', totalPercentage)
			if (totalPercentage !== 100) {
				return Promise.reject('Total percentage should be 100');
			} else {
				// Clear validation errors for individual percentage fields
				const milestones = form.getFieldValue('milestones');
				form.validateFields();
    			return Promise.resolve();
			}
		};
	return (
		<>
		<div className={styles.contractForm}>
			<Form encType="multipart/form-data" onFinish={onFinish} id="contractForm"
				fields={initialFields}
				initialValues={initialValues}
				form={form}
			>
				<Card className={styles.contractForm__topcard}>
					<Space>
						<Form.Item name={"msa_id"} label="Client Name" rules={[{ required: true, message: 'Please select a Client Name' }]}>
							<Select 
								showSearch	
								style={{ width: 200 }}
								onSelect={onSelectClientName}
								filterOption={false}
								onSearch={getClientNames}
								placeholder="Client Name" 
								>
									{clients && clients.map((msa: MSAType,index) => (
										<Select.Option key={index} value={msa.id}>
										{msa.client_name}
										</Select.Option>
									))}
							</Select>
						</Form.Item>

						<Form.Item name={"contract_ref_id"} label="Contract ID" rules={[{ required: true, message: 'Please input a Contract ID' }]}>
							<Input placeholder="Contract ID" />
						</Form.Item>

						<Form.Item name={"region"} label="Region">
							<Input placeholder="Region" disabled/>
						</Form.Item>

						<Form.Item name={"du"} label="DU" rules={[{ required: true, message: 'Please select a DU' }]}>
							<Select placeholder="DU">
								<Select.Option value="DU1">DU1</Select.Option>
								<Select.Option value="DU2">DU2</Select.Option>
								<Select.Option value="DU3">DU3</Select.Option>
								<Select.Option value="DU4">DU4</Select.Option>
							</Select>
						</Form.Item>
					</Space>
					<Space>
						<Form.Item name={"date_of_signature"} label="Date of Signature" rules={[{ required: true, message: 'Please select the Date of Signature' },
							{ validator: validateDateOfSignature }
						]}>
							<DatePicker placeholder="Date of Signature" />
						</Form.Item>

						<Form.Item name={"start_date"} label="Start Date" rules={[{ required: true, message: 'Please select the Start Date' }, 
							{ validator: validateStartDate }
						]}>
							<DatePicker placeholder="Start Date" />
						</Form.Item>

						<Form.Item name={"end_date"} label="End Date" rules={[{ required: true, message: 'Please select the End Date' },]}>
							<DatePicker placeholder="End Date" />
						</Form.Item>
					</Space>
					<Space style={{width:"90vw"}}>
						<Form.Item name={"contract_type"} label="Contract Type" required>
							<Select
								placeholder="Contract Type"
								style={{ width: "235px" }}
								onChange={handleSelectChange}
								disabled={disabled}
							>
								<Select.Option value="FF">Fixed Fee</Select.Option>
								<Select.Option value="TM">Time and Material</Select.Option>
							</Select>
						</Form.Item>
						
					</Space>
				</Card>
				{selectedOption ? <>
					{selectedOption === "FF" && (
						<Card className={styles.contractForm__ffcard}>
							<Space style={{width:"90vw"}}>
								<h6>Milestone Details</h6>
								<Form.Item label="Total Contract Value" name={"estimated_amount"} className={`${styles.contractForm__ffcard__contractvalue}`} rules={[{ required: true, message: 'Please input the Total Contract Value' }]}>
									<InputNumber<number> addonBefore="USD" />
								</Form.Item>
							</Space>
							<Space className={`${styles.contractForm__ffcard__main}`}>
								<Form.List key={"ff"} name={"milestones"}>{(fields,{add,remove}) => 
								<>
								<div className={`${styles.contractForm__ffcard__main__milestoneheading}`}>
									<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__desc}`}>Milestone Description</h6>
									<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__enddate}`}>Milestone End Date</h6>
									<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__percentage}`}>Percentage</h6>
									<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__amount}`}>Amount</h6>
									<Form.Item>
										<Button onClick={()=>{add()}} className={`${styles.contractForm__ffcard__addbutton}`}>Add</Button>
									</Form.Item>
								</div>
								{fields.map((field,index)=>{
									console.log("Inside Milestones Filed",field);
									return(
										<Space key={field.key} style={{width:"72vw"}}>
											<Form.Item name={[field.name,"milestone_desc"]} key={`${field.key}-ff_milestone_desc`} rules={[{required: true, message: "Please input Milestone Description"}]}>
												<Input placeholder="Milestone Description" style={{ width: "20rem" }}/>
											</Form.Item>
											<Form.Item name={[field.name,"milestone_enddate"]} key={`${field.key}-ff_milestone_enddate`}
											rules={[{required: true, message: "Please input Milestone End Date"},{validator: validateMilestoneEndDate}]}>
												<DatePicker placeholder="Milestone End Date" style={{ width: "15rem" }}/>
											</Form.Item>
											<Form.Item name={[field.name,"percentage"]} key={`${field.key}-ff_percentage`} 
												rules={[{required: true, message: "Please input Milestone Percentage"},
												// { validator: validateTotalPercentage }
											]}>
												<InputNumber<number>
													placeholder="Percentage"
													min={0}
													max={100}
													style={{ width: "10rem" }}
													// formatter={(value) => `${value}%`}
													// parser={(value) => value?.replace('%', '') as unknown as number}
												/>
											</Form.Item>
											<Form.Item name={[field.name,"amount"]} key={`${field.key}-ff_amount`} >
												<InputNumber placeholder="Amount" min={0} />
											</Form.Item>
											{fields.length > 1 ? (
											<AiOutlineMinusCircle style={{marginTop:-25,color:"red"}} size={20} onClick={()=>{remove(field.name)}}/>
											):null}
										</Space>
									);
								})}
								
								</>
								}</Form.List>
							</Space>
						</Card>
					)}
					
					{selectedOption === "TM" && (
						<Card className={styles.contractForm__tmcard}>
						<Space style={{width:"90vw"}}>
							<h6>Milestone Details</h6>
							<Form.Item label="Total Contract Value" name={"estimated_amount"} className={`${styles.contractForm__ffcard__contractvalue}`} rules={[{ required: true, message: 'Please input the Total Contract Value' }]}>
								<Input addonBefore="USD" />
							</Form.Item>
						</Space>
						<Space className={`${styles.contractForm__ffcard__main}`}>
							<Form.List key={"tm"} name={"milestones"}>{(fields,{add,remove}) => 
							<>
							<div className={`${styles.contractForm__ffcard__main__milestoneheading}`}>
								<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__tmdesc}`}>Milestone Description</h6>
								<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__tmenddate}`}>Milestone End Date</h6>
								<h6 className={`${styles.contractForm__ffcard__main__milestoneheading__tmamount}`}>Amount</h6>
							<Form.Item>
								<Button onClick={()=>{add()}} className={`${styles.contractForm__ffcard__addbutton}`}>Add</Button>
							</Form.Item>
							</div>
							{fields.map((field,index)=>{
								return(
									<Space key={field.key} style={{width:"70vw"}}> 
										<Form.Item name={[field.name,"milestone_desc"]} key={`${field.key}-tm_milestone_desc`} rules={[{required: true, message: "Please input Milestone Description"}]}>
											<Input placeholder="Milestone Description" style={{ width: "20rem" }}/>
										</Form.Item>
										<Form.Item name={[field.name,"milestone_enddate"]} key={`${field.key}-tm_milestone_enddate`}
											rules={[{required: true, message: "Please input Milestone End Date"},{validator: validateMilestoneEndDate}]}>
											<DatePicker placeholder="Milestone End Date" style={{ width: "20rem" }} />
										</Form.Item>
										<Form.Item name={[field.name,"amount"]} key={`${field.key}-tm_amount`} rules={[{required: true, message: "Please input Milestone Amount"}]}>
											<InputNumber<number> placeholder="Amount" min={0} style={{ width: "10rem" }}/>
										</Form.Item>
										{fields.length > 1 ? (
											<AiOutlineMinusCircle style={{marginTop:-25,color:"red"}} size={20} onClick={()=>{remove(field.name)}}/>
										):null}
									</Space>
								);
							})}
							
							</>
							}</Form.List>
						</Space>
						</Card>
					)}
				<Space>
					<Card className={styles.contractForm__assoccard}>
						<h6 className={styles.contractForm__assoccard__title}>Associated Members</h6>
						<Form.Item name={"associated_users"} label="Select Associated Users">
							<Select
								style={{width:"80%"}}
								mode="multiple"
								placeholder="Select Associated Users"
								filterOption={false}
								// onChange={setSelectedItems}
							>
								{users && users.map((user:any,index) => (
									<Select.Option key={index} value={user.id}>
										{user.user_name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Card>
					<Card className={styles.contractForm__assoccard}>
						<h6 className={styles.contractForm__assoccard__title}>Associated Groups</h6>
						<Form.Item name={"associated_groups"} label="Select Associated Groups">
							<Select
								style={{width:"80%"}}
								mode="multiple"
								placeholder="Select Associated Group"
								filterOption={false}
								// onChange={setSelectedItems}
							>
								{groups && groups.map((group:any,index) => (
									<Select.Option key={index} value={group.id}>
										{group.group_name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Card>
				</Space>	
				<Space style={{width:"100%"}}>
					<Card className={styles.contractForm__uploadcard}>
						{contractDetails ? <h6>Upload Addendum</h6> :<h6><span style={{color:"red"}}>*</span> Upload Work Schedule</h6>}
						<Form.Item name={filename} rules={contractDetails ? undefined : [{ required: true, message: 'Please upload a file' }]}>
							<Upload accept=".pdf" maxCount={1} >
								<div style={{ marginTop: "1rem" }} className={styles.contractForm__uploadcard__upload}>
									<p>Drag & drop or click to upload</p>
									<Button icon={<UploadOutlined />}>Select File</Button>
								</div>							
							</Upload>
						</Form.Item>
					</Card>
					<Card className={styles.contractForm__commentscard}>
						<h6>Comments and Remarks</h6>
						<Form.Item name={"comments"}>
							<Input.TextArea rows={6} style={{marginTop:"1%"}} placeholder="Comments and Remarks" maxLength={200}/>
						</Form.Item>
					</Card>
				</Space>
				</> :<></>}
				<Button disabled={!selectedOption} className={styles.contractForm__submit} onClick={showModal}>
					{contractDetails ? <>Update Contract</> : <>Add Contract</>}
				 </Button>
			</Form>
			<Modal
			title={modalTitle}
			className={styles.modal}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={(_, { CancelBtn }) => (
				<div className={styles.modalfooter}>
				  <Button form="contractForm" key="submit" htmlType="submit" className={styles.okbtn}>OK</Button>
				  <CancelBtn/>
				</div>
			)}
			>


			</Modal>
		</div>
		</>
	);
};

export default ContractForm;
