import { AddMsaPropType } from "../../AddMSA/types";
import dayjs from "dayjs";

export interface MSADataType{
    name: string;
    value: string | undefined;
}
export interface MSAType {
    msa_ref_id?:string;
    client_name?:string;
    region?:string;
    start_date?:string;
    end_date?:string;
    msa_doclink?:string;
    comments?:string;

}
export interface MsaFormHandlerPropType{
    addMsa?:AddMsaPropType['addMsa'];
    msaData?: MSAType | undefined;
    msa_id?: number;
   initialValues?:{
    msa_ref_id?: string;
    client_name?:string;
    region?:string;
    start_date?:string;
    end_date?:string;
    msa_doclink?:string;
    comments?:string;
   }
   msaAdded?: Boolean;
   msaEdited?:Boolean
}
export interface MsaFormPropType{
    onFinish: (values: any) => Promise<void>;
    handleCancel: () => void;
    showModal: () => void;
    isModalOpen: boolean;
    modalTitle: string;
    handleMsaRefId: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    initialValues:MsaFormHandlerPropType['initialValues'];
    initialFields: [MSADataType] | undefined;
    handleFileUpload: (info: any) => any;
    fileName: string|undefined;
    spinning: boolean;
    fileCancel: () => void;
    showFile?: boolean
    msaData?: MSAType | undefined
    msaAdded?: Boolean | undefined
    msaEdited: Boolean | undefined
    handleFormChange: (changedValues: any, allValues: any) => void
}
export interface MSADataInitial{
    msa_ref_id?:string;
    client_name?:string;
    region?:string;
    start_date:any;
    end_date:any;
    msa_doclink?:string;
    comments?:string;
}