
import { RcFile } from "antd/es/upload";
import { MsaApiType } from "../../types";
import { AxiosError } from "axios";
export interface Contract {
    contract_ref_id?: string;
    contract_status?: string;
    contract_type?: string;
    du?: string;
    end_date?: string;
    estimated_amount?: number;
    id?: number;
    start_date?: string;
}
export interface MsaData {
    msa_ref_id: string;
    client_name?: string;
    region?: string;
    start_date?: string;
    end_date?: string;
    file?: RcFile | null;
    comments?: string;
    contracts?: Contract[]; 
}
export interface MsaDataType {
    active_contracts_count?: number;
    closed_contracts_count?: number;
    expiring_contracts_count?: number;
    onprogress_contracts_count?: number;
    total_contracts_count: number;
    ff_contracts_count?: number;
    tm_contracts_count?: number;
    combined_msa_doclink?: string;
    msa_data: MsaData;
}

export interface MsaIndividualPage{
    msaData:MsaDataType;
    }
export interface ContractListHandlerPropType {
    responses: MsaApiType | AxiosError<unknown, any> | undefined;
    id: string;
  }
  export interface getContractCountHandlerType {
    getCount: (responses: any) => void;
  }
  export interface ContractData {
    contract_ref_id: string;
    contract_status: string;
    contract_type: string;
}
  export interface ContractListPropType{
    columns: ({
      title: string;
      dataIndex: string;
      key: string;
      render: (text: string) => JSX.Element;
  } | {
      title: string;
      dataIndex: string;
      key: string;
      render?: undefined;
  })[]
  contractData:ContractData[];
  chartData: {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
    }[];
}
options: {
  plugins: {
      legend: {
          labels: {
              font: {
                  size: number;
              };
              boxWidth: number;
          };
      };
  };
}
  }
