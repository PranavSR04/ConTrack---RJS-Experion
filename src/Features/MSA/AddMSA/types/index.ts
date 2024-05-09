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
export interface AddMsaPropType{
	addMsa: (msaData: MSAType) => Promise<void>;
	initialValues:{};
	msaAdded: Boolean
}