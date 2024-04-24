export interface ContractFormPropType {
	selectedOption: string | undefined;
	handleSelectChange: (value: string) => void;
	onFinish: (values: any) => void;
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	assocFilteredOptions: string[];
	clients: any[];
	clientRegion: string | undefined;
	onSelectClientName: (value: number) => void;
	getClientNames: (value: any) => Promise<void>;
	users: any[];
	contractDetails: ContractType | undefined;
}
export interface ContractFormHandlerPropType {
	contractDetails?: ContractType;
	contract_id?: number;
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
	milestones: string | null;
	expectedCompletionDate: string;
	percentage?: number | null;
	amount: number | null;
}

export interface ContractType {
	msa_id: string;
	clientName: string;
	contract_ref_id: string;
	region: string;
	du: string;
	start_date: string;
	end_date: string;
	date_of_signature: string;
	contract_type: "FF" | "TM";
	milestones: Milestone[];
	associated_users: [{ user_id: number }] | [];
	file: RcFile | null;
	comments: string;
	estimated_amount: number;
	contract_added_by: number;
	contract_status:string;
	contract_doclink:string;
}
