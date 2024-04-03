import { TablePaginationConfig } from "antd";

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
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record:MsaData) => React.ReactNode;
    
};
export  interface paginations {
    current: number;
    pageSize: number;
    total: number;
  }
export interface MsaListDataType{
    data: MsaData[];
    pagination:paginations;
    handleTableChange:(pagination:TablePaginationConfig)=> void;
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