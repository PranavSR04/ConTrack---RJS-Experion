import { RcFile } from "antd/es/upload";
import { Moment } from "moment";

export interface MsaDataType {
    msa_ref_id: string;
    client_name?: string;
    region?: string;
    start_date?: string ;
    end_date?: string;
    file?: RcFile | null;
    comments?: string;
  }

  export interface LocationStateProps {
    msaAdded: boolean;
    msaEdited: boolean;
    msaRenewed: boolean;
    id: string;
  }
  
  export interface MSAFormProps {
    msaData:MsaDataType;
    fileName: string | undefined;
    handleFileUpload: (info: any) => void;
    beforeUpload: (file: RcFile) => boolean;
    handleSubmit: () => void;
    isModalVisible: boolean;
    handleSubmitForm: (value: any) => Promise<void>;
    handleCancel: () => void;
    spinning: boolean;
    headingText: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStartDateChange: (date: Moment | null, dateString: string | string[]) => void;
    handleEndDateChange: (date: Moment | null, dateString: string | string[]) => void
    validateStartDate: (value: any) => Promise<void>;
    showFile: boolean;
    fileCancel: () => void;
    msaAdded?: Boolean
    hideMsarefid?: boolean;
    msaRenewed: Boolean | undefined
    msaEdited: Boolean | undefined
    startDate: string | undefined;
    modalTitle: string;
    formFields?: FormField[]
  }

  export interface FormField {
    name: string;
    value: any;
  }
  export interface MSAFormHandlerPropType{
    msaAdded?:Boolean;
    msa_id?:string;
    msaEdited?:Boolean;
    msaRenewed?:Boolean
  }
  export interface MsaData {
    msa_ref_id: string;
    client_name: string;
    region: string;
    start_date: string;
    end_date: string;
  }