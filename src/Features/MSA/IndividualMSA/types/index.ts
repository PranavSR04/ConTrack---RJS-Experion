import { AxiosError } from "axios";

export interface contractType{
    contract_ref_id:string;
    id:number;
    du:string;
    contract_type:string;
    estimated_amount:number;
    contract_status:string;
    start_date:string;
    end_date:string;
}
export interface Msa {
    id: number;
    msa_ref_id: string;
    added_by: number;
    client_name: string;
    region:string;
    start_date: string;
    end_date: string;
    comments:string;
    is_active:number;
    msa_doclink: string;
    created_at: string;
    updated_at: string;
    user_name: string;
    contracts:contractType[];
    msa_olddoclink:string[];
    total_contracts_count: number;
    active_contracts_count:number,
    closed_contracts_count:number,
    expiring_contracts_count:number,
    onprogress_contracts_count:number,
    expired_contracts_count:number,
    tm_contracts_count:number,
    ff_contracts_count:number
  }
  
  export interface MsaApiType {
    data: Msa[];
  }

  export interface LocationStateProps {
    id: string;
  }
  export interface IndividualMsaPropType{
    id: string;
    responses: MsaApiType|AxiosError<unknown, any>|undefined;
    loading: boolean;
  }