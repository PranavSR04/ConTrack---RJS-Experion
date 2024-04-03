import { AxiosError } from "axios";

export interface Milestone {
    id: number;
    contract_id: number;
    milestone_desc: string;
    milestone_enddate: string;
    percentage: string;
    amount: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Addendum {
    id: number;
    contract_id: number;
    file_id: string;
    created_at: string;
    updated_at: string;
    addendum_doclink: string | null;
  }
  
  export interface AssociatedUsers {
    id: number;
    contract_id: number;
    user_name: string;
    user_mail: string;
  }
  
  export interface Contract {
    id: number;
    msa_id: number;
    contract_added_by: number;
    contract_ref_id: string;
    contract_type: string;
    date_of_signature: string;
    comments: string;
    start_date: string;
    end_date: string;
    du: string;
    contract_doclink: string;
    estimated_amount: number;
    contract_status: string;
    created_at: string;
    updated_at: string;
    client_name: string;
    user_name: string;
    milestones: Milestone[];
    addendum: Addendum[];
    associated_users: AssociatedUsers[];
  }
  
  export interface ContractApiType {
    data: Contract[];
  }
  
  export interface LocationStateProps {
    id: string;
  }

  export interface IndividualContractPropType{
    id: string;
    responses: ContractApiType|AxiosError<unknown, any>|undefined;
    loading: boolean;
  }