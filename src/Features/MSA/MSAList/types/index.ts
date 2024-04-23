import { TablePaginationConfig } from "antd";
import { ReactNode } from "react";

export interface MsaData {
    id:string;
    msa_ref_id: string;
    client_name: string;
    start_date: string;
    end_date: string;
    added_by_user: string;
    msa_doclink:string;
    is_active:string;
  }
  export interface Condition {
    [field:string]: string;
  }
  export type TableColumn = {
    title: JSX.Element|string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record:MsaData) => React.ReactNode;
    
};

export interface locale {
  emptyText: string | ReactNode;
}
export  interface paginations {
    current: number;
    pageSize: number;
    total: number;
  }
export interface MsaListDataType{
    data: MsaData[];
    pagination:paginations;
    handleTableChange:(pagination:TablePaginationConfig)=> void;
    locale: locale
    columns:TableColumn[];
    msaAdded?:boolean;
    msaEdited?:boolean;
    edited?: boolean;
    renew?: boolean;
    loading:boolean
    getRowClassName: (record: any, index: number) => "even-row" | "odd-row";
    showInactiveMSA?: () => Promise<void>;
    fetchData: () => Promise<void>;
    rowClassName: (record: MsaData, index: number) => string;
    handleSegmentChange: ((value: string) => void);
    handleAddMSA: () => void;
   
  
  }