import React from "react";
import { Form, Select, Card, Input, Space, DatePicker, Button, InputNumber, Upload } from "antd";
import styles from "./ContractForm.module.css";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ContractFormPropType, MSAType } from "./types";
import { UploadOutlined } from "@ant-design/icons";

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
	initialFields
	}:ContractFormPropType) => {		
	return (
		<div className={styles.contractForm}>
			<Form encType="multipart/form-data" onFinish={onFinish} 
				fields={initialFields}
				initialValues={initialValues}
			>
				<Card className={styles.contractForm__topcard}>
					<Space>
						<Form.Item name={"msa_id"} label="Client Name">
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

						<Form.Item name={"contract_ref_id"} label="Contract ID">
							<Input placeholder="Contract ID" />
						</Form.Item>

						<Form.Item name={"region"} label="Region">
							<Input placeholder="Region" disabled/>
						</Form.Item>

						<Form.Item name={"du"} label="DU">
							<Select placeholder="DU">
								<Select.Option value="DU1">DU1</Select.Option>
								<Select.Option value="DU2">DU2</Select.Option>
								<Select.Option value="DU3">DU3</Select.Option>
								<Select.Option value="DU4">DU4</Select.Option>
							</Select>
						</Form.Item>
					</Space>
					<Space>
						<Form.Item name={"date_of_signature"} label="Date of Signature">
							<DatePicker placeholder="Date of Signature" />
						</Form.Item>

						<Form.Item name={"start_date"} label="Start Date">
							<DatePicker placeholder="Start Date" />
						</Form.Item>

						<Form.Item name={"end_date"} label="End Date">
							<DatePicker placeholder="End Date" />
						</Form.Item>
					</Space>
					<Space style={{width:"90vw"}}>
						<Form.Item name={"contract_type"} label="Contract Type">
							<Select
								placeholder="Contract Type"
								style={{ width: "235px" }}
								onChange={handleSelectChange}
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
								<Form.Item label="Total Contract Value" name={"estimated_amount"}>
									<Input addonBefore="USD" />
								</Form.Item>
							</Space>
							<Space>
								<Form.List key={"ff"} name={"milestones"}>{(fields,{add,remove}) => 
								<>
								<Form.Item>
									<Button onClick={()=>{add()}}>Add</Button>
								</Form.Item>
								{fields.map((field,index)=>{
									return(
										<Space key={field.key}> 
											<Form.Item name={[field.name,"milestone_desc"]} key={`${field.key}-ff_milestone_desc`}>
												<Input placeholder="milestone_desc"/>
											</Form.Item>
											<Form.Item name={[field.name,"milestone_enddate"]} key={`${field.key}-ff_milestone_enddate`}>
												<DatePicker placeholder="milestone_enddate" />
											</Form.Item>
											<Form.Item name={[field.name,"percentage"]} key={`${field.key}-ff_percentage`}>
												<InputNumber<number>
													placeholder="%"
													min={0}
													max={100}
													// formatter={(value) => `${value}%`}
													// parser={(value) => value?.replace('%', '') as unknown as number}
												/>
											</Form.Item>
											<Form.Item name={[field.name,"amount"]} key={`${field.key}-ff_amount`}>
												<InputNumber<number> placeholder="amount" min={0}/>
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
							<Form.Item label="Total Contract Value" name={"estimated_amount"}>
								<Input addonBefore="USD" />
							</Form.Item>
						</Space>
						<Space style={{width:"90vw"}}>
							<Form.List key={"tm"} name={"milestones"}>{(fields,{add,remove}) => 
							<>
							<Form.Item>
								<Button onClick={()=>{add()}}>Add</Button>
							</Form.Item>
							{fields.map((field,index)=>{
								return(
									<Space key={field.key} style={{width:"90vw"}}> 
										<Form.Item name={[field.name,"milestone_desc"]} key={`${field.key}-tm_milestone_desc`}>
											<Input placeholder="milestone_desc"/>
										</Form.Item>
										<Form.Item name={[field.name,"milestone_enddate"]} key={`${field.key}-tm_milestone_enddate`}>
											<DatePicker placeholder="milestone_enddate" />
										</Form.Item>
										<Form.Item name={[field.name,"amount"]} key={`${field.key}-tm_amount`}>
											<InputNumber<number> placeholder="amount" min={0}/>
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
				<Space style={{width:"100%"}}>
					<Card className={styles.contractForm__uploadcard}>
						{contractDetails ? <h6>Upload Addendum</h6> :<h6>Upload Work Schedule</h6>}
						<Form.Item name={filename}>
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
							<Input.TextArea rows={6} style={{marginTop:"2%"}} placeholder="Comments and Remarks"/>
						</Form.Item>
					</Card>
				</Space>
				</> :<></>}
				<Button htmlType="submit" type="primary" disabled={!selectedOption} className={styles.contractForm__submit}>
					{contractDetails ? <>Update Contract</> : <>Add Contract</>}
				 </Button>
			</Form>
		</div>
	);
};

export default ContractForm;
