import { RcFile } from "antd/es/upload";

export interface MsaDataType {
    msa_ref_id: string;
    client_name?: string;
    region?: string;
    start_date?: string;
    end_date?: string;
    file?: RcFile | null;
    comments?: string;
  }

  export interface LocationStateProps {
    msaAdded: boolean;
    msaEdited: boolean;
    msaRenewed: boolean;
    msa_ref_id: string;
  }
  
  export interface MSAFormProps {
    msaData:MsaDataType;
    fileName: string | undefined;
    handleFileUpload: (info: any) => void;
    beforeUpload: (file: RcFile) => boolean;
    handleMSAForm: () => void;
    isModalVisible: boolean;
    handleSubmitForm: (value: any) => Promise<void>;
    handleCancel: () => void;
    spinning: boolean;
    headingText: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStartDateChange: (dateString: string) => void;
    handleEndDateChange: (dateString: string) => void;
    validateStartDate: (value: any) => Promise<void>;
    showFile: boolean;
    fileCancel: () => void;
    msaAdded?: boolean | undefined
  }