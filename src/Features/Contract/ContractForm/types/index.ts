import { FormInstance } from "antd";
import { AddContractPropType } from "../../AddContract/types";
import dayjs from "dayjs";

export interface ContractFormPropType {
	selectedOption: string | undefined;
	handleSelectChange: (value: string) => void;
	onFinish: (values: any) => void;
	clients: any[];
	onSelectClientName: (value: number) => void;
	getClientNames: (value: any) => Promise<void>;
	users: any[];
	groups: any[];
	contractDetails: ContractType | undefined;
	initialValues: EditContractValueType | AddContractValueType;
	filename: "file" | "addendum_file";
	initialFields: [InitialFieldsType] | undefined;
	disabled: boolean;
	modalTitle: string;
	handleCancel: () => void;
	showModal: () => void;
	isModalOpen: boolean;
	calculateAmount: (percentage: number | null, key: number) => void;
	form: FormInstance<any>;
	setTcv: React.Dispatch<React.SetStateAction<number>>;
	spinning: boolean;
	selectedMSA: MSAType | undefined;
	rules:any;
}
export interface ContractFormHandlerPropType {
	contractDetails?: ContractType;
	contract_id?: number;
	addContract?: AddContractPropType["addContract"];
	initialValues: EditContractValueType | AddContractValueType;
}
export interface MSAType {
	added_by: number;
	client_name: string;
	comments: string;
	created_at: string;
	end_date: string;
	id: number;
	is_active: number;
	msa_doclink: string;
	msa_ref_id: string;
	region: string;
	start_date: string;
	updated_at: string;
}

export interface RcFile extends File {
	uid: string;
}

export interface Milestone {
	milestone_desc: string;
	milestone_enddate: string | dayjs.Dayjs;
	percentage?: number | null;
	amount: number;
}

export interface ContractType {
	msa_id: string;
	clientName: string;
	contract_ref_id: string;
	region: string;
	du: string;
	start_date: string | dayjs.Dayjs;
	end_date: string | dayjs.Dayjs;
	date_of_signature: string | dayjs.Dayjs;
	contract_type: "FF" | "TM";
	milestones: Milestone[];
	associated_users: [{ user_id: number }] | [];
	associated_groups: [{ group_id: number }] | [];
	file: RcFile | null;
	comments: string;
	estimated_amount: number;
	contract_added_by: number;
	contract_status: string;
	contract_doclink: string;
}

export interface EditContractValueType {
	msa_id: string;
	clientName: string;
	contract_ref_id: string;
	region: string;
	du: string;
	start_date: string | dayjs.Dayjs;
	end_date: string | dayjs.Dayjs;
	date_of_signature: string | dayjs.Dayjs;
	contract_type: "FF" | "TM";
	milestones: Milestone[];
	associated_users?: number[] | [];
	associated_groups?: number[] | [];

	file: RcFile | null;
	comments: string;
	estimated_amount: number;
	contract_added_by: number;
	contract_status: string;
	contract_doclink: string;
}
export interface AddContractValueType {
	milestones: {}[];
}

export type ContractEditingInitialValueType = EditContractValueType;

export interface InitialFieldsType {
	name: string;
	value: string | undefined;
}

export interface GroupOptions {
	id: number;
	group_name: string;
}
